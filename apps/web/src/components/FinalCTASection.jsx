
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const FinalCTASection = () => {
  return (
    <section id="final-cta" data-section-id="final-cta-section" className="section-spacing relative overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-90"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-white/5 blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto container-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Deine Rechnungen schreiben sich nicht von selbst.
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Lass uns in 30 Minuten herausfinden, was bei dir möglich ist.
          </p>

          <a 
            href="https://calendly.com/icloud-surferlasse/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              data-cta-button="Final CTA Rechnungen"
              size="lg"
              className="rounded-xl group bg-white text-primary hover:bg-white/90 shadow-2xl text-lg px-10 py-7 mb-6"
            >
              Kostenlosen Termin buchen
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Keine Kosten</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Keine Bindung</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Kein Verkaufsdruck</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
