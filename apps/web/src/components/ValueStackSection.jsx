
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Send, 
  UploadCloud, 
  AlertCircle, 
  RefreshCw, 
  BookOpen, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Vollautomatische Rechnungserstellung',
    description: 'Aus Verkauf wird Rechnung, ohne dass du etwas tust'
  },
  {
    icon: Send,
    title: 'Automatischer Versand an deine Kunden',
    description: 'Per E-Mail, sofort nach Abschluss'
  },
  {
    icon: UploadCloud,
    title: 'Buchhaltungs-Upload (DATEV / Lexoffice)',
    description: 'Dein Steuerberater bekommt alles automatisch'
  },
  {
    icon: AlertCircle,
    title: 'Automatisches Mahnwesen',
    description: 'Offene Rechnungen werden nicht mehr vergessen'
  },
  {
    icon: RefreshCw,
    title: 'Zahlungseingang-Sync',
    description: 'Wird automatisch als bezahlt markiert'
  },
  {
    icon: BookOpen,
    title: 'Dokumentation auf Deutsch',
    description: 'Alles verständlich erklärt, du behältst die Kontrolle'
  }
];

const ValueStackSection = () => {
  return (
    <section data-section-id="value-stack-section" className="section-spacing relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full max-w-2xl h-96 bg-primary/5 blur-[120px] pointer-events-none -translate-y-1/2 rounded-full"></div>
      
      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900"
          >
            Wir automatisieren deine Rechnungen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Kosten: 0 € Setup und 1 € pro Rechnung
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 p-6 rounded-2xl flex flex-col h-full"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mt-auto">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Pricing Callout Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Wie funktioniert die Bezahlung?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
              Das Setup ist komplett kostenlos. Du zahlst nur 1 € pro automatisch erstellter Rechnung — und nichts, solange keine Rechnungen erstellt werden. Es gibt keine Grundgebühr oder monatliche Kosten.
            </p>
            
            <div className="inline-block bg-white border border-gray-200 shadow-sm rounded-xl px-6 py-4 mb-8">
              <p className="text-gray-800 font-medium">
                🛡️ 7-Tage-Garantie: Deine Automatisierung läuft in 7 Tagen — oder ich arbeite kostenlos weiter, bis sie es tut.
              </p>
            </div>

            <div>
              <a 
                href="https://calendly.com/icloud-surferlasse/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="rounded-xl group bg-primary text-white hover:bg-primary/90 shadow-lg text-lg px-8 py-6 mb-4"
                >
                  Jetzt kostenlosen Termin buchen
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Keine Kosten</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Keine Bindung</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Kein Verkaufsdruck</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueStackSection;
