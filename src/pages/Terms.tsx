import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6 md:py-20">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: January 2025</p>
            </div>

            <div className="prose prose-slate max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using AI Image Studio, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Use of Service</h2>
                <p className="text-muted-foreground">
                  AI Image Studio provides free image processing tools for personal and commercial use. 
                  You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Use the service responsibly and legally</li>
                  <li>Not attempt to reverse engineer or exploit the service</li>
                  <li>Not use the service for illegal or harmful purposes</li>
                  <li>Respect the intellectual property rights of others</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground">
                  You retain all rights to images you process through our service. We claim no ownership 
                  over your content. The AI Image Studio website design, code, and branding are protected 
                  by copyright and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Disclaimer of Warranties</h2>
                <p className="text-muted-foreground">
                  AI Image Studio is provided "as is" without warranties of any kind. We do not guarantee:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Uninterrupted or error-free service</li>
                  <li>Perfect results from image processing</li>
                  <li>Compatibility with all devices and browsers</li>
                  <li>Data preservation in case of technical issues</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  AI Image Studio and its operators shall not be liable for any damages arising from 
                  the use or inability to use the service, including but not limited to data loss, 
                  business interruption, or any other commercial damages.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Continued use of the service 
                  after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms of Service, please contact us through our website.
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

export default Terms;
