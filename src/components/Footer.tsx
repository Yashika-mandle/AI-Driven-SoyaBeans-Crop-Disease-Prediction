import { Sprout, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <Sprout className="h-6 w-6 text-primary" />
              <span>AI CropHealth</span>
            </Link>
            <p className="text-sm text-background/70">
              Revolutionizing agriculture with AI-powered disease detection for sustainable farming.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#about" className="hover:text-primary transition-smooth">About Project</a>
              </li>
              <li>
                <a href="#tech" className="hover:text-primary transition-smooth">Technology</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-primary transition-smooth">How It Works</a>
              </li>
              <li>
                <a href="#demo" className="hover:text-primary transition-smooth">Demo</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#team" className="hover:text-primary transition-smooth">Team</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-smooth">Contact</a>
              </li>
              <li>
                <Link to="/auth" className="hover:text-primary transition-smooth">Login</Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">Documentation</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@aicrophealth.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>CA 94000, USA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/70">
            <p>© 2025 AI CropHealth. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-smooth">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-smooth">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-smooth">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
