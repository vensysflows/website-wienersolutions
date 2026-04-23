import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, BrainCircuit, FileText, Zap, Rocket } from 'lucide-react';
import useSectionTracking from '@/hooks/useSectionTracking.js';

const usps = [{
  icon: Shield,
  title: '100% DSGVO-konform',
  description: 'Alle Lösungen auf europäischen Servern.'
}, {
  icon: Users,
  title: 'Max. 5 Kunden',
  description: 'Fokus auf Qualität statt Quantität.'
}, {
  icon: BrainCircuit,
  title: 'Human-in-the-Loop',
  description: 'Du hältst die Kontrolle über alle Prozesse.'
}, {
  icon: FileText,
  title: 'Transparenz',
  description: 'Verständliche Reports für dich und deine IT.'
}, {
  icon: Zap,
  title: 'Kein Overhead',
  description: 'Direkte Kommunikation, schnelle Umsetzung.'
}, {
  icon: Rocket,
  title: 'Schneller ROI',
  description: 'Erster Mehrwert bereits in einer Woche.'
}];

const AboutMeSection = () => {
  const sectionRef = useSectionTracking('Benefits');

  return (
    <section ref={sectionRef} id="about" className="section-spacing relative overflow-hidden">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.7 }} 
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-2xl transform -rotate-6 scale-105"></div>
            <div className="relative rounded-3xl overflow-hidden glass-panel p-2">
              <img src="https://horizons-cdn.hostinger.com/2314c244-5eaf-486e-830c-fb369cb94cbd/4a847ec8e1e652e7d982faae55ac0f1f.webp" alt="Gründer von Wiener Solutions" className="w-full h-auto rounded-2xl object-cover aspect-[4/5]" />
              <div className="absolute bottom-6 left-6 right-6 bg-black/70 backdrop-blur-xl border border-white/10 p-5 rounded-xl shadow-2xl">
                <div className="inline-flex items-center space-x-2 bg-primary/20 border border-primary/30 px-3 py-1.5 rounded-full mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-xs font-medium text-primary-foreground/90">Verfügbar für neue Projekte</span>
                </div>
                <p className="font-semibold text-lg text-white">Dein Experte auf Abruf</p>
                <p className="text-sm text-gray-300 mt-1">Persönlich, direkt und transparent.</p>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.7 }} 
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Warum ich der richtige Partner für deine Automatisierung bin
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Mein Name ist Lasse Wiener. Seit über zwei Jahren baue ich bereits Automatisierungen für verschiedenste Unternehmen. Ich liebe die Herausforderung, vor einem neuen Problem, neuen komplexen Prozessen zu stehen und einen Plan zu entwickeln wie ich diese, auch mit der Anwendung von KI, automatisieren kann und dir Zeit sparen kann.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mein Ziel ist es, mich selbst überflüssig zu machen – indem ich dir Prozesse baue, die du verstehst und selbst kontrollieren kannst.
              </p>
            </div>

            {/* USPs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
              {usps.map((usp, index) => {
                const Icon = usp.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl glass-card">
                    <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{usp.title}</h4>
                      <p className="text-xs text-muted-foreground leading-snug">{usp.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;