import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Sparkles } from 'lucide-react';
import { removeBackgroundFromFile } from '@/lib/backgroundRemoval';
import { downloadBlob } from '@/lib/imageProcessing';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '../ImageUploader';
import { motion } from 'framer-motion';

const BackgroundRemover = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<string>('');
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    setOriginalImage(URL.createObjectURL(file));
    setProcessedImage(null);
    setProcessing(true);
    setProgress('Starting...');

    try {
      const blob = await removeBackgroundFromFile(file, (status) => {
        setProgress(status);
      });
      
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
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

  const handleDownload = () => {
    if (processedBlob) {
      downloadBlob(processedBlob, 'background-removed.png');
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
              <div className="rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-muted/30 to-muted/10 aspect-video flex items-center justify-center relative">
                {processing ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">{progress}</p>
                  </div>
                ) : processedImage ? (
                  <img src={processedImage} alt="Processed" className="max-w-full max-h-full object-contain" />
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => {
                setOriginalImage(null);
                setProcessedImage(null);
                setProcessedBlob(null);
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
