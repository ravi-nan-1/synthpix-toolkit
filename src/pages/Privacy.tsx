import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6 md:py-20">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: January 2025</p>
            </div>

            <div className="prose prose-slate max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">Your Privacy Matters</h2>
                <p className="text-muted-foreground">
                  At AI Image Studio, we take your privacy seriously. This policy explains how we handle your data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Image Processing</h2>
                <p className="text-muted-foreground mb-2">
                  <strong>All image processing happens entirely in your browser.</strong> We use client-side JavaScript 
                  and WebAssembly to process your images. This means:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Your images never leave your device</li>
                  <li>We never upload your images to our servers</li>
                  <li>We never store or have access to your images</li>
                  <li>Processing is completely private and secure</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Data We Collect</h2>
                <p className="text-muted-foreground">
                  We use Google Analytics to understand how visitors use our site. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Page views and navigation patterns</li>
                  <li>Device type and browser information</li>
                  <li>Geographic location (country/city level)</li>
                  <li>Referral sources</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  This data is anonymized and used solely to improve our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Cookies</h2>
                <p className="text-muted-foreground">
                  We use essential cookies to remember your preferences and improve your experience. 
                  We also use analytics cookies (Google Analytics) to understand site usage. 
                  You can disable cookies in your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
                <p className="text-muted-foreground">
                  We use the following third-party services:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Google Analytics:</strong> For website analytics</li>
                  <li><strong>Google AdSense:</strong> For displaying advertisements</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  These services have their own privacy policies governing data collection.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us through our website.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
