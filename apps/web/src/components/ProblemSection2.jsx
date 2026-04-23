
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, XCircle, FolderOpen } from 'lucide-react';
import useSectionTracking from '@/hooks/useSectionTracking.js';

const problems = [
  {
    icon: Clock,
    title: 'Einen Arbeitstag pro Woche für Buchhaltung.',
    description: 'Erstellen, versenden, nachverfolgen. Alles manuelle Arbeit für die Mitarbeiter gebraucht werden.'
  },
  {
    icon: XCircle,
    title: 'Mahnungen werden vergessen.',
    description: 'Wer verfolgt, welche Rechnung seit 30 Tagen offen ist? Meistens niemand.'
  },
  {
    icon: FolderOpen,
    title: 'Der Steuerberater wartet wieder auf Belege.',
    description: 'Monatliche Belegvorbereitung ist unsichtbare Arbeit — die immer Freitagabend passiert.'
  }
];

const ProblemSection2 = () => {
  const sectionRef = useSectionTracking('Problems_Rechnungen');

  return (
    <section ref={sectionRef} id="problems" data-section-id="problem-section-2" className="section-spacing relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-full max-w-2xl h-96 bg-red-100/20 blur-[120px] pointer-events-none -translate-y-1/2 rounded-full"></div>
      
      <div className="container mx-auto container-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-md hover:shadow-lg hover:border-primary/40 transition-all duration-300 p-8 rounded-2xl"
              >
                <div className="bg-red-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 leading-snug text-gray-900">
                  {problem.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection2;
