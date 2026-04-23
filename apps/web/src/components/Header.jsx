import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && !e.target.closest('header')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 relative">
        <div className="glass-panel rounded-2xl px-6 py-3 flex items-center justify-between max-w-7xl mx-auto relative z-50 bg-background/80">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={handleNavClick}>
            <img 
              src="https://horizons-cdn.hostinger.com/2314c244-5eaf-486e-830c-fb369cb94cbd/9b776087f4651abede74466a004a3ddd.png" 
              alt="Wiener Solutions Logo" 
              className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isHomePage ? (
              <>
                <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group">
                  Über mich
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#solutions" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group">
                  Lösungen
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#process" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group">
                  Mein Ansatz
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#faq" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group">
                  FAQ
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </>
            ) : (
              <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group">
                Zurück zur Startseite
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            {isHomePage ? (
              <a href="#contact" className="hidden md:block">
                <Button className="rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-300">
                  Kostenloses Erstgespräch buchen
                </Button>
              </a>
            ) : (
              <Link to="/#contact" className="hidden md:block">
                <Button className="rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-300">
                  Kostenloses Erstgespräch buchen
                </Button>
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-4 right-4 mt-2 bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-40 md:hidden"
            >
              <div className="flex flex-col p-6 space-y-6">
                <nav className="flex flex-col space-y-4">
                  {isHomePage ? (
                    <>
                      <a 
                        href="#about" 
                        onClick={handleNavClick}
                        className="text-lg font-semibold text-foreground/90 hover:text-primary transition-colors"
                      >
                        Über mich
                      </a>
                      <a 
                        href="#solutions" 
                        onClick={handleNavClick}
                        className="text-lg font-semibold text-foreground/90 hover:text-primary transition-colors"
                      >
                        Lösungen
                      </a>
                      <a 
                        href="#process" 
                        onClick={handleNavClick}
                        className="text-lg font-semibold text-foreground/90 hover:text-primary transition-colors"
                      >
                        Mein Ansatz
                      </a>
                      <a 
                        href="#faq" 
                        onClick={handleNavClick}
                        className="text-lg font-semibold text-foreground/90 hover:text-primary transition-colors"
                      >
                        FAQ
                      </a>
                    </>
                  ) : (
                    <Link 
                      to="/" 
                      onClick={handleNavClick}
                      className="text-lg font-semibold text-foreground/90 hover:text-primary transition-colors"
                    >
                      Zurück zur Startseite
                    </Link>
                  )}
                </nav>
                
                <div className="pt-6 border-t border-white/10">
                  {isHomePage ? (
                    <a href="#contact" onClick={handleNavClick}>
                      <Button className="w-full rounded-xl py-6 text-base">
                        Erstgespräch buchen
                      </Button>
                    </a>
                  ) : (
                    <Link to="/#contact" onClick={handleNavClick}>
                      <Button className="w-full rounded-xl py-6 text-base">
                        Erstgespräch buchen
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;