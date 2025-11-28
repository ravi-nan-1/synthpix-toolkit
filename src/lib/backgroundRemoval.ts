import { loadImage } from './imageProcessing';

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
    onProgress?.('Preparing image...');

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Could not get canvas context');

    const wasResized = resizeImageIfNeeded(canvas, ctx, imageElement);
    console.log(
      `Image ${wasResized ? 'was' : 'was not'} resized. Final dimensions: ${canvas.width}x${canvas.height}`
    );

    onProgress?.('Analyzing background...');

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Sample background color from the four corners
    const samplePoints = [
      0,
      (canvas.width - 1) * 4,
      (canvas.width * (canvas.height - 1)) * 4,
      ((canvas.width * canvas.height) - 1) * 4,
    ];

    let rSum = 0, gSum = 0, bSum = 0;
    for (const idx of samplePoints) {
      rSum += data[idx];
      gSum += data[idx + 1];
      bSum += data[idx + 2];
    }

    const bgR = rSum / samplePoints.length;
    const bgG = gSum / samplePoints.length;
    const bgB = bSum / samplePoints.length;

    onProgress?.('Removing background...');

    // Threshold for how close a pixel needs to be to be considered background
    const threshold = 40; // smaller = stricter, larger = more aggressive

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const distance = Math.sqrt(
        (r - bgR) * (r - bgR) +
        (g - bgG) * (g - bgG) +
        (b - bgB) * (b - bgB)
      );

      if (distance < threshold) {
        // Make background pixel transparent
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    onProgress?.('Finalizing...');

    return new Promise((resolve, reject) => {
      canvas.toBlob(
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
