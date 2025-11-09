import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sparkles, Shield, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6 md:py-20">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                About AI Image Studio
              </h1>
              <p className="text-xl text-muted-foreground">
                Professional image tools powered by AI, right in your browser
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced machine learning models process your images with professional-grade quality.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">100% Private</h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens in your browser. Your images never leave your device.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  No uploads, no waiting. Process images instantly with cutting-edge web technology.
                </p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none mt-12">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                AI Image Studio was created to make professional image editing accessible to everyone. 
                We believe powerful tools shouldn't require expensive software or compromising your privacy.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Why Choose Us?</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>✨ <strong>Free Forever:</strong> No hidden costs, no subscriptions</li>
                <li>🔒 <strong>Privacy First:</strong> Your images stay on your device</li>
                <li>⚡ <strong>No Registration:</strong> Start editing immediately</li>
                <li>🎨 <strong>Professional Quality:</strong> AI-powered processing</li>
                <li>📱 <strong>Works Everywhere:</strong> Any device with a modern browser</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
