
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Zap, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Kostenloses Gespräch',
    description: 'Wir schauen uns deinen Prozess an.',
    icon: PhoneCall
  },
  {
    id: 2,
    title: 'Deine Automatisierung steht in 7 Tagen. Garantiert.',
    description: 'Du beantwortest ein paar Fragen — wir bauen alles für dich.',
    icon: Zap
  },
  {
    id: 3,
    title: 'Automation läuft.',
    description: 'Du sparst dauerhaft Zeit und zahlst nur, wenn es läuft. Garantiert.',
    icon: CheckCircle
  }
];

const ProcessSection = () => {
  return (
    <section data-section-id="process-section" className="section-spacing relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-primary/5 blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 text-gray-900"
          >
            So funktioniert es
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Wir automatisieren deine Rechnungen.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Step Number Circle */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-primary/10 border-4 border-white flex items-center justify-center relative z-10">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary mb-3 tracking-wider uppercase">
                      Schritt {step.id}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 leading-snug text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
