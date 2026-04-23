
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const SocialProofSection = () => {
  return (
    <section data-section-id="social-proof-section" className="section-spacing relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-primary/5 blur-[150px] pointer-events-none rounded-full"></div>
      
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-md hover:shadow-lg hover:border-primary/40 transition-all duration-300 p-8 md:p-12 rounded-2xl relative group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
            
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-8 text-center">
                "Anfangs hat Lasse nur kleinere Automatisierungen für Daten-Automatiserungen gebaut. Als diese Automationen liefen, sind wir den nächsten Schritt gegangen und haben zusammen mit Lasse unseren Kundensupport zu 90% automatisieren können. Früher haben wir immer neue Mitarbeiter gesucht, aber in Wirklichkeit mussten wir unsere Mitarbeiter nur effizienter machen und ihnen unnötige Last abnehmen!"
              </blockquote>

              {/* Author Info */}
              <div className="text-center pt-6 border-t border-gray-200">
                <div className="font-bold text-gray-900 mb-1">Markus T.</div>
                <div className="text-sm text-gray-600 mb-4">Geschäftsführer, E-Commerce Unternehmen</div>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary">
                    Spart 12 Std/Woche
                  </div>
                  <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary">
                    Setup in 5 Tagen
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
