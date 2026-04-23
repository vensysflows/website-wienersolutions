import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroFloatingElements from './HeroFloatingElements.jsx';
import { usePixelTracking } from '@/hooks/usePixelTracking.js';
import useSectionTracking from '@/hooks/useSectionTracking.js';

const HeroSection = () => {
  const { trackLead } = usePixelTracking();
  const sectionRef = useSectionTracking('Hero');

  const handleCtaClick = () => {
    trackLead();
  };

  return (
    <section ref={sectionRef} id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-[150px] pointer-events-none"></div>

      <HeroFloatingElements />

      <div className="container mx-auto px-4 relative z-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className="max-w-4xl mx-auto pt-40 pb-32 md:pt-0 md:pb-0 px-4 sm:px-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold mb-6 leading-tight text-balance">
            Dein Team verschwendet täglich Stunden mit Aufgaben, die <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">kein Mensch</span> mehr machen sollte.
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl mb-10 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ich automatisiere die Kernprozesse deines Unternehmens – damit deine Mitarbeiter sich auf echte Arbeit konzentrieren können.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <a href="#contact" onClick={handleCtaClick}>
              <Button size="lg" className="rounded-xl group transition-all duration-300 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 text-base px-8 py-6">
                Kostenloses Gespräch buchen
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex justify-center z-20" 
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <a href="#problems" className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center justify-center gap-2">
          <span className="text-xs sm:text-sm font-medium tracking-widest uppercase">Scrollen</span>
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;