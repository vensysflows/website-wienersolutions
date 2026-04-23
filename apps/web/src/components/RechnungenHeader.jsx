import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RechnungenHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 relative">
        <div className="bg-white/90 backdrop-blur-md border border-gray-200/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] rounded-2xl px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
          
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="https://horizons-cdn.hostinger.com/2314c244-5eaf-486e-830c-fb369cb94cbd/5b1c62046892e4b5334a4b96ef80afb8.png" 
              alt="Wiener Solutions Logo" 
              className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          
          {/* CTA Button */}
          <a 
            href="https://calendly.com/icloud-surferlasse/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              data-cta-button="Header Termin buchen"
              className="rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-300 text-sm md:text-base px-4 md:px-6 bg-primary text-white hover:bg-primary/90"
            >
              Kostenlosen Termin buchen
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default RechnungenHeader;