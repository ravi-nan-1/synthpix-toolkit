import { AutoModel, AutoProcessor, RawImage, env } from '@huggingface/transformers';
import { loadImage } from './imageProcessing';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

function resizeImageIfNeeded(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement
) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
}

export const removeBackground = async (
  imageElement: HTMLImageElement,
  onProgress?: (status: string) => void
): Promise<Blob> => {
  try {
    onProgress?.('Loading AI model...');
    
    // Load model and processor using MODNet for better background removal
    const model = await AutoModel.from_pretrained('Xenova/modnet', {
      device: 'webgpu',
    });
    
    const processor = await AutoProcessor.from_pretrained('Xenova/modnet');

    onProgress?.('Processing image...');
    
    // Resize image if needed
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    const wasResized = resizeImageIfNeeded(canvas, ctx, imageElement);
    console.log(
      `Image ${wasResized ? 'was' : 'was not'} resized. Final dimensions: ${canvas.width}x${canvas.height}`
    );

    // Convert to RawImage
    const rawImage = await RawImage.fromURL(canvas.toDataURL());

    onProgress?.('Removing background...');
    
    // Pre-process image
    const { pixel_values } = await processor(rawImage);
    
    // Predict alpha matte
    const { output } = await model({ input: pixel_values });
    
    onProgress?.('Applying mask...');
    
    // Convert output to mask
    const maskTensor = output[0].mul(255).to('uint8');
    const mask = await RawImage.fromTensor(maskTensor);
    const resizedMask = await mask.resize(rawImage.width, rawImage.height);

    // Create output canvas
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = rawImage.width;
    outputCanvas.height = rawImage.height;
    const outputCtx = outputCanvas.getContext('2d');

    if (!outputCtx) throw new Error('Could not get output canvas context');

    // Draw original image
    outputCtx.drawImage(imageElement, 0, 0, outputCanvas.width, outputCanvas.height);

    // Apply mask to alpha channel
    const outputImageData = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const data = outputImageData.data;
    const maskData = (resizedMask as any).data;

    for (let i = 0; i < maskData.length; i++) {
      data[i * 4 + 3] = maskData[i];
    }

    outputCtx.putImageData(outputImageData, 0, 0);
    onProgress?.('Finalizing...');

    return new Promise((resolve, reject) => {
      outputCanvas.toBlob(
        (blob) => {
          if (blob) {
            onProgress?.('Complete!');
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/png',
        1.0
      );
    });
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

export const removeBackgroundFromFile = async (
  file: File,
  onProgress?: (status: string) => void
): Promise<Blob> => {
  const img = await loadImage(file);
  return removeBackground(img, onProgress);
};
