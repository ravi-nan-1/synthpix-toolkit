import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, Languages, Copy, Loader2 } from "lucide-react";
import Tesseract from "tesseract.js";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "nl", name: "Dutch" },
  { code: "pl", name: "Polish" },
  { code: "tr", name: "Turkish" },
];

const ImageTextTranslator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setImage(dataUrl);
      setExtractedText("");
      setTranslatedText("");
      
      // Automatically start OCR
      await extractText(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
  });

  const extractText = async (imageData: string) => {
    setIsExtracting(true);
    try {
      const result = await Tesseract.recognize(imageData, sourceLang === 'zh' ? 'chi_sim' : sourceLang, {
        logger: (m) => console.log(m),
      });
      
      const text = result.data.text.trim();
      if (text) {
        setExtractedText(text);
        toast({
          title: "Text Extracted",
          description: `Extracted ${text.length} characters successfully.`,
        });
      } else {
        toast({
          title: "No Text Found",
          description: "Could not detect any text in the image. Try a clearer image.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('OCR Error:', error);
      toast({
        title: "Extraction Failed",
        description: "Failed to extract text. Please try a different image.",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const translateText = async () => {
    if (!extractedText) return;

    setIsTranslating(true);
    try {
      // Split long text into chunks if needed (API has limits)
      const maxLength = 500;
      const chunks = extractedText.match(new RegExp(`.{1,${maxLength}}`, 'g')) || [extractedText];
      const translatedChunks = [];

      for (const chunk of chunks) {
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            chunk
          )}&langpair=${sourceLang}|${targetLang}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.responseStatus === 200 && data.responseData.translatedText) {
          translatedChunks.push(data.responseData.translatedText);
        } else {
          throw new Error(data.responseDetails || "Translation failed");
        }
      }

      const finalTranslation = translatedChunks.join(' ');
      setTranslatedText(finalTranslation);
      toast({
        title: "Translation Complete",
        description: `Successfully translated to ${LANGUAGES.find(l => l.code === targetLang)?.name}.`,
      });
    } catch (error) {
      console.error('Translation Error:', error);
      toast({
        title: "Translation Failed",
        description: error instanceof Error ? error.message : "Could not translate the text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard.",
    });
  };

  const reset = () => {
    setImage(null);
    setExtractedText("");
    setTranslatedText("");
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Languages className="w-6 h-6 text-primary" />
          OCR & Translate
        </h2>
        <p className="text-muted-foreground">
          Extract text from images and translate to any language
        </p>
      </div>

      {!image ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">
            {isDragActive ? "Drop image here" : "Drag & drop image"}
          </p>
          <p className="text-sm text-muted-foreground">
            or click to select from your device
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="p-4">
            <img
              src={image}
              alt="Uploaded"
              className="max-h-64 mx-auto rounded-lg"
            />
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Source Language</label>
              <Select value={sourceLang} onValueChange={setSourceLang}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Target Language</label>
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isExtracting && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground py-4">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Extracting text from image...</span>
            </div>
          )}

          {extractedText && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Extracted Text</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(extractedText)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                className="min-h-32"
                placeholder="Extracted text will appear here..."
              />
            </div>
          )}

          {extractedText && (
            <Button
              onClick={translateText}
              disabled={isTranslating || !extractedText}
              className="w-full"
            >
              {isTranslating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  <Languages className="w-4 h-4 mr-2" />
                  Translate Text
                </>
              )}
            </Button>
          )}

          {translatedText && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Translated Text</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(translatedText)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={translatedText}
                readOnly
                className="min-h-32 bg-muted"
              />
            </div>
          )}

          <Button variant="outline" onClick={reset} className="w-full">
            Upload New Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageTextTranslator;
