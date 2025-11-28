import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Loader2, Sparkles, Upload, Palette } from 'lucide-react';
import { removeBackgroundFromFile } from '@/lib/backgroundRemoval';
import { downloadBlob } from '@/lib/imageProcessing';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '../ImageUploader';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BackgroundRemover = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<string>('');
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    setOriginalImage(URL.createObjectURL(file));
    setProcessedImage(null);
    setFinalImage(null);
    setBackgroundImage(null);
    setProcessing(true);
    setProgress('Starting...');

    try {
      const blob = await removeBackgroundFromFile(file, (status) => {
        setProgress(status);
      });
      
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
      setFinalImage(url);
      setProcessedBlob(blob);
      
      toast({
        title: "Success!",
        description: "Background removed successfully",
      });
    } catch (error) {
      console.error('Error removing background:', error);
      toast({
        title: "Error",
        description: "Failed to remove background. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
      setProgress('');
    }
  };

  const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBackgroundImage(url);
      applyBackground(url, 'image');
    }
  };

  const applyBackground = async (bgValue: string, type: 'color' | 'image') => {
    if (!processedImage) return;

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = processedImage;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      // Draw background
      if (type === 'color') {
        ctx.fillStyle = bgValue;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        const bgImg = new Image();
        bgImg.crossOrigin = 'anonymous';
        bgImg.src = bgValue;
        
        await new Promise((resolve, reject) => {
          bgImg.onload = resolve;
          bgImg.onerror = reject;
        });

        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
      }

      // Draw foreground (transparent image on top)
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setFinalImage(url);
          setProcessedBlob(blob);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error applying background:', error);
      toast({
        title: "Error",
        description: "Failed to apply background",
        variant: "destructive",
      });
    }
  };

  const handleColorChange = (color: string) => {
    setBackgroundColor(color);
    setBackgroundImage(null);
    applyBackground(color, 'color');
  };

  const handleRemoveBackground = () => {
    if (processedImage) {
      setFinalImage(processedImage);
      setBackgroundColor('#ffffff');
      setBackgroundImage(null);
    }
  };

  const handleDownload = () => {
    if (processedBlob) {
      const filename = backgroundImage || backgroundColor !== '#ffffff' 
        ? 'image-with-background.png' 
        : 'background-removed.png';
      downloadBlob(processedBlob, filename);
      toast({
        title: "Downloaded!",
        description: "Image saved to your downloads folder",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">AI Background Remover</h2>
        </div>
        <p className="text-muted-foreground">
          Remove image backgrounds instantly with AI. 100% browser-based, no uploads.
        </p>
      </div>

      {!originalImage ? (
        <ImageUploader onImageUpload={handleImageUpload} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Original</p>
              <div className="rounded-2xl overflow-hidden border border-border bg-muted/30 aspect-video flex items-center justify-center">
                <img src={originalImage} alt="Original" className="max-w-full max-h-full object-contain" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Processed</p>
              <div className="rounded-2xl overflow-hidden border border-border bg-[length:20px_20px] aspect-video flex items-center justify-center relative"
                   style={{
                     backgroundImage: finalImage && !processing
                       ? 'repeating-conic-gradient(hsl(var(--muted)) 0% 25%, hsl(var(--background)) 0% 50%)'
                       : 'none',
                     backgroundColor: !finalImage || processing ? 'hsl(var(--muted) / 0.3)' : 'transparent'
                   }}>
                {processing ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">{progress}</p>
                  </div>
                ) : finalImage ? (
                  <img src={finalImage} alt="Processed" className="max-w-full max-h-full object-contain" />
                ) : null}
              </div>
            </div>
          </div>

          {processedImage && !processing && (
            <div className="space-y-4 p-6 border border-border rounded-2xl bg-card">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Add Background</h3>
              </div>
              
              <Tabs defaultValue="transparent" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="transparent" onClick={handleRemoveBackground}>
                    Transparent
                  </TabsTrigger>
                  <TabsTrigger value="color">Solid Color</TabsTrigger>
                  <TabsTrigger value="image">Custom Image</TabsTrigger>
                </TabsList>

                <TabsContent value="transparent" className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Background removed with transparency
                  </p>
                </TabsContent>

                <TabsContent value="color" className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="bg-color">Background Color</Label>
                    <div className="flex gap-3 items-center">
                      <Input
                        id="bg-color"
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="h-12 w-24 cursor-pointer"
                      />
                      <span className="text-sm text-muted-foreground">{backgroundColor}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'].map((color) => (
                        <button
                          key={color}
                          onClick={() => handleColorChange(color)}
                          className="w-10 h-10 rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ backgroundColor: color }}
                          aria-label={`Select ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="image" className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="bg-image">Upload Background Image</Label>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Image
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleBackgroundImageUpload}
                        className="hidden"
                        id="bg-image"
                      />
                    </div>
                    {backgroundImage && (
                      <p className="text-sm text-green-600">Background image applied!</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => {
                setOriginalImage(null);
                setProcessedImage(null);
                setFinalImage(null);
                setProcessedBlob(null);
                setBackgroundImage(null);
                setBackgroundColor('#ffffff');
              }}
              variant="outline"
              size="lg"
            >
              Upload New Image
            </Button>
            
            {processedImage && (
              <Button
                onClick={handleDownload}
                size="lg"
                className="bg-gradient-primary text-primary-foreground hover:opacity-90"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BackgroundRemover;
