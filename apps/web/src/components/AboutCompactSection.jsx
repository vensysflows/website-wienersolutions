
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Zap, Users, FileText } from 'lucide-react';

const usps = [
  {
    icon: Lock,
    title: 'DSGVO-konform',
    description: 'Europäische Server'
  },
  {
    icon: Zap,
    title: 'Schneller Start',
    description: 'Erster Mehrwert in 7 Tagen'
  },
  {
    icon: Users,
    title: 'Max. 5 Kunden',
    description: 'Fokus auf Qualität'
  },
  {
    icon: FileText,
    title: 'Dokumentation',
    description: 'Alles verständlich übergeben'
  }
];

const AboutCompactSection = () => {
  return (
    <section data-section-id="about-compact-section" className="section-spacing relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-full max-w-2xl h-96 bg-primary/5 blur-[120px] pointer-events-none -translate-y-1/2 rounded-full"></div>
      
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Über mich
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Mein Name ist Lasse Wiener. Seit über 2 Jahren automatisiere ich Rechnungs- und Buchhaltungsprozesse für kleine und mittlere Unternehmen — mit n8n und maßgeschneiderten Lösungen, die du selbst verstehst und kontrollierst.
            </p>

            {/* USP Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {usps.map((usp, index) => {
                const Icon = usp.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-md hover:shadow-lg hover:border-primary/40 transition-all duration-300 p-6 rounded-xl flex items-start gap-4"
                  >
                    <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1 text-gray-900">{usp.title}</h4>
                      <p className="text-xs text-gray-600 leading-snug">
                        {usp.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            className="relative order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-2xl transform rotate-6 scale-105"></div>
            <div className="relative rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md border border-gray-200/60 shadow-lg p-2">
              <img 
                src="https://horizons-cdn.hostinger.com/2314c244-5eaf-486e-830c-fb369cb94cbd/4a847ec8e1e652e7d982faae55ac0f1f.webp" 
                alt="Lasse Wiener - Gründer von Wiener Solutions" 
                className="w-full h-auto rounded-2xl object-cover aspect-[4/5]" 
              />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl border border-gray-200/60 p-5 rounded-xl shadow-lg"
              >
                <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  <span className="text-xs font-medium text-amber-700">Verfügbare Plätze: 2 (Stand April)</span>
                </div>
                <p className="font-semibold text-lg text-gray-900">Dein Experte auf Abruf</p>
                <p className="text-sm text-gray-600 mt-1">Persönlich, direkt und transparent.</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutCompactSection;
