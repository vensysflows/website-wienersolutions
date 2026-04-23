import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Zap, BarChart3, Wrench, Server } from 'lucide-react';
import useSectionTracking from '@/hooks/useSectionTracking.js';

const steps = [
  {
    id: 1,
    title: 'Kostenloses Erstgespräch',
    description: 'Wir sprechen über dein Unternehmen, du erklärst mir deine Prozesse & Ideen und ich gebe dir direkt Besipiele, wie ich dir helfen kann',
    details: '30-45 min',
    icon: PhoneCall,
    badge: 'Unverbindlich'
  },
  {
    id: 2,
    title: 'Erste Automatisierung in einer Woche einsatzbereit',
    description: 'Ich analysiere die Prozesse in deiner Firma und lerne die Mitarbeiter genauer kennen. Anschließend automatisiere ich für dich kostenlos den ersten Prozess.',
    details: '1-2 Wochen',
    icon: Zap,
    badge: 'Reversibel'
  },
  {
    id: 3,
    title: 'Bewertung',
    description: 'Wir schauen uns gemeinsam die Ergebnisse an und entscheiden, ob und wie es weitergeht.',
    details: 'Gemeinsame Analyse',
    icon: BarChart3
  },
  {
    id: 4,
    title: 'Projektphase',
    description: 'Wir definieren weitere Prozesse, ich erstelle ein transparentes Angebot und werde für die Zeit des Projekts Teil deines Teams.',
    details: 'Projektbasiert, transparentes Angebot',
    icon: Wrench
  },
  {
    id: 5,
    title: 'Übergabe oder Managed Hosting',
    description: 'Wir schließen das Projekt gemeinsam ab, indem ich deinen Mitarbeiter einfach erkläre, welche Automationen gebaut wurden und wie sie genutzt werden. Zusätzlich gebe ich einen detallierten Report in Fachsprache ab.',
    details: 'Managed Hosting ab 149€/Monat mit Garantie',
    icon: Server
  }
];

const TimelineSection = () => {
  const sectionRef = useSectionTracking('Timeline');

  return (
    <section ref={sectionRef} id="process" className="section-spacing relative overflow-hidden">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Mein Ansatz
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            In 5 klaren Schritten zur erfolgreichen Automatisierung – ohne Risiko für dich.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:-translate-x-1/2"></div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0; // true for index 0, 2, 4 (Steps 1, 3, 5) -> Left side
              const Icon = step.icon;
              
              return (
                <div key={step.id} className="relative flex flex-col md:flex-row items-start md:items-center w-full">
                  
                  {/* Mobile Icon (Left aligned) */}
                  <div className="md:hidden absolute left-8 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-primary z-10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Desktop Layout: Alternating Left/Right */}
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-16' : 'md:pl-16 md:ml-auto'}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="glass-card p-6 md:p-8 rounded-2xl w-full relative group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-primary font-bold text-sm tracking-wider uppercase">
                          Schritt {step.id}
                        </div>
                        {step.badge && (
                          <div className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                            {step.badge}
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="inline-block bg-white/5 text-foreground/80 px-3 py-1.5 rounded-md text-sm font-medium border border-white/10">
                        {step.details}
                      </div>
                    </motion.div>
                  </div>

                  {/* Desktop Center Icon */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-background shadow-[0_0_0_2px_rgba(59,130,246,0.5)] z-10">
                    <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;