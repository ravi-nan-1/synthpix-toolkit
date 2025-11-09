import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSpace from "@/components/AdSpace";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackgroundRemover from "@/components/tools/BackgroundRemover";
import ImageResizer from "@/components/tools/ImageResizer";
import ImageConverter from "@/components/tools/ImageConverter";
import ImageCompressor from "@/components/tools/ImageCompressor";
import ImageFilters from "@/components/tools/ImageFilters";
import ImageTextTranslator from "@/components/tools/ImageTextTranslator";
import { Sparkles, Maximize2, RefreshCw, Minimize2, Wand2, Languages } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("bg-remover");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16 md:py-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center space-y-6"
            >
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Image Tools
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Professional Image Editing
                <br />
                <span className="text-primary-glow">Free & Private</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Remove backgrounds, resize, convert, compress, and enhance images with AI. 
                All processing happens in your browser - your images never leave your device.
              </p>

              <div className="flex flex-wrap gap-4 justify-center text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  No signup required
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  100% private & secure
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  Free forever
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AdSpace after hero */}
        <div className="container px-4 md:px-6 py-8">
          <AdSpace slot="hero" className="max-w-4xl mx-auto min-h-[120px]" />
        </div>

        {/* Tools Section */}
        <section className="container px-4 md:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto gap-2 bg-muted p-2 rounded-2xl">
                <TabsTrigger value="bg-remover" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground rounded-xl py-3">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Remove BG</span>
                  <span className="sm:hidden">BG</span>
                </TabsTrigger>
                <TabsTrigger value="resizer" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground rounded-xl py-3">
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Resize</span>
                  <span className="sm:hidden">Size</span>
                </TabsTrigger>
                <TabsTrigger value="converter" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground rounded-xl py-3">
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Convert</span>
                  <span className="sm:hidden">Conv</span>
                </TabsTrigger>
                <TabsTrigger value="compressor" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground rounded-xl py-3">
                  <Minimize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Compress</span>
                  <span className="sm:hidden">Comp</span>
                </TabsTrigger>
                <TabsTrigger value="filters" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground rounded-xl py-3">
                  <Wand2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                  <span className="sm:hidden">FX</span>
                </TabsTrigger>
                <TabsTrigger value="translator" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground rounded-xl py-3">
                  <Languages className="w-4 h-4" />
                  <span className="hidden sm:inline">Translate</span>
                  <span className="sm:hidden">OCR</span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-8 bg-card rounded-3xl p-6 md:p-8 border border-border shadow-xl">
                <TabsContent value="bg-remover" className="mt-0">
                  <BackgroundRemover />
                </TabsContent>
                <TabsContent value="resizer" className="mt-0">
                  <ImageResizer />
                </TabsContent>
                <TabsContent value="converter" className="mt-0">
                  <ImageConverter />
                </TabsContent>
                <TabsContent value="compressor" className="mt-0">
                  <ImageCompressor />
                </TabsContent>
                <TabsContent value="filters" className="mt-0">
                  <ImageFilters />
                </TabsContent>
                <TabsContent value="translator" className="mt-0">
                  <ImageTextTranslator />
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </section>

        {/* AdSpace before footer */}
        <div className="container px-4 md:px-6 py-8">
          <AdSpace slot="footer" className="max-w-4xl mx-auto min-h-[120px]" />
        </div>

        {/* Features Section */}
        <section className="bg-muted/30 py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AI Image Studio?</h2>
                <p className="text-muted-foreground text-lg">
                  Professional image tools that respect your privacy
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl p-6 border border-border shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">AI-Powered Processing</h3>
                  <p className="text-muted-foreground">
                    Advanced machine learning models deliver professional-quality results instantly.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card rounded-2xl p-6 border border-border shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
                    <span className="text-xl font-bold text-primary-foreground">🔒</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-2">100% Private</h3>
                  <p className="text-muted-foreground">
                    All processing happens in your browser. Your images never touch our servers.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-2xl p-6 border border-border shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
                    <span className="text-xl font-bold text-primary-foreground">⚡</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Lightning Fast</h3>
                  <p className="text-muted-foreground">
                    No uploads, no waiting. Process images instantly right in your browser.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
