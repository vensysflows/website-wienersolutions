import React from 'react';
import { Mail, Instagram, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-32 bg-primary/5 blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/">
              <img 
                src="https://horizons-cdn.hostinger.com/2314c244-5eaf-486e-830c-fb369cb94cbd/9b776087f4651abede74466a004a3ddd.png" 
                alt="Wiener Solutions Logo" 
                className="h-10 md:h-12 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Dein KI- und Automatisierungsexperte auf Zeit. Ich helfe Unternehmen, ihre Prozesse zu automatisieren – ohne Agentur-Overhead und mit voller Transparenz.
            </p>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Kontakt & Info</h4>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground text-base">Wiener Solutions</p>
                <p>Inh. Lasse Wiener</p>
              </div>
              
              <div className="flex items-start space-x-3 pt-2">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <p>Cuvrystraße 39<br />10997 Berlin</p>
              </div>

              <div className="pt-2 space-y-3">
                <a href="mailto:kontakt@wienersolutions.com" className="flex items-center space-x-3 hover:text-primary transition-colors group">
                  <div className="bg-white/5 p-2 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>kontakt@wienersolutions.com</span>
                </a>
                <a 
                  href="https://instagram.com/wienersolutions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:text-primary transition-colors group"
                >
                  <div className="bg-white/5 p-2 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <Instagram className="h-4 w-4" />
                  </div>
                  <span>@wienersolutions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Rechtliches</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/impressum" data-impressum="true" className="text-muted-foreground hover:text-primary transition-colors">Impressum</Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-muted-foreground hover:text-primary transition-colors">Datenschutz</Link>
              </li>
              <li>
                <Link to="/agb" className="text-muted-foreground hover:text-primary transition-colors">AGB</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Wiener Solutions. Alle Rechte vorbehalten.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Made with <span className="text-primary mx-1">♥</span> in Berlin
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;