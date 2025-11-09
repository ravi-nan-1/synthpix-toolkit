import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3">AI Image Studio</h3>
            <p className="text-sm text-muted-foreground">
              Free AI-powered image tools. Process images securely in your browser with no uploads to servers.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-3">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Background Remover</li>
              <li>Image Resizer</li>
              <li>Format Converter</li>
              <li>Image Compressor</li>
              <li>Filters & Effects</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 AI Image Studio. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> for creators
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
