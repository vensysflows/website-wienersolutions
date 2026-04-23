import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SolutionCard from './SolutionCard.jsx';
import useSectionTracking from '@/hooks/useSectionTracking.js';

const solutionsData = [
  {
    title: 'Systeme verbinden',
    beforeContent: [
      'Daten werden manuell zwischen CRM, Buchhaltung und Shop übertragen',
      'Unterschiedliche Tools kennen sich nicht – Infos existieren doppelt oder dreifach',
      'Tippfehler und vergessene Einträge sind unvermeidlich',
      'Dein Team verliert Stunden pro Woche mit Datenabgleich',
      'Entscheidungen basieren auf veralteten Zahlen'
    ],
    afterContent: [
      'Daten fließen automatisch zwischen allen deinen Systemen',
      'CRM, Buchhaltung, Shop und Tabellen sind dauerhaft synchron',
      'Keine doppelten Einträge, keine Tippfehler mehr',
      'Dein Team arbeitet immer mit aktuellen, korrekten Daten',
      'Du siehst auf einen Blick, was in deinem Unternehmen passiert'
    ]
  },
  {
    title: 'Rechnungen automatisieren',
    beforeContent: [
      'Jede Rechnung wird manuell erstellt, kontrolliert und verschickt',
      'Eingehende Belege werden händisch in die Buchhaltung übertragen',
      'Rechnungsstatus (bezahlt / offen) wird manuell nachverfolgt',
      'Mahnungen werden vergessen oder zu spät verschickt',
      'Deine Buchhalterin verbringt Freitagnachmittage mit Excel-Tabellen'
    ],
    afterContent: [
      'Neue Bestellung → Rechnung wird automatisch erstellt und versendet',
      'Eingehende Belege werden automatisch erkannt und zugeordnet',
      'Offene Rechnungen werden automatisch nachverfolgt',
      'Mahnungen gehen zum richtigen Zeitpunkt raus – ohne manuellen Aufwand',
      'Deine Buchhalterin konzentriert sich auf Dinge, die wirklich Wert haben'
    ]
  },
  {
    title: 'Kein Lead mehr verlieren',
    beforeContent: [
      'Anfragen kommen per Mail, Instagram, Formular – und landen nirgendwo zentral',
      'Jede Anfrage wird manuell gelesen, kategorisiert und weitergeleitet',
      'Follow-ups werden vergessen, weil niemand den Überblick hat',
      'Standard-Fragen binden Mitarbeiterzeit, die anderswo gebraucht wird',
      'Kein Überblick, welche Leads offen, warm oder verloren sind'
    ],
    afterContent: [
      'Alle Anfragen landen automatisch in einem zentralen System',
      'Leads werden sofort kategorisiert und der richtigen Person zugewiesen',
      'Follow-up-Erinnerungen laufen automatisch – kein Lead geht verloren',
      'Standard-Fragen beantwortet ein KI-Assistent rund um die Uhr',
      'Dein Team sieht in Echtzeit: Was ist offen, was läuft, wo gibt es Engpässe'
    ]
  }
];

const SolutionsSection = () => {
  const sectionRef = useSectionTracking('Solutions');

  return (
    <section ref={sectionRef} id="solutions" className="section-spacing relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-full max-w-lg h-96 bg-primary/5 blur-[120px] pointer-events-none -translate-y-1/2 rounded-full"></div>
      
      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Lösungen
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }} 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Entdecke Beispiele, wie deine Prozesse automatisiert werden können
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {solutionsData.map((solution, index) => (
            <SolutionCard 
              key={index} 
              title={solution.title} 
              beforeContent={solution.beforeContent} 
              afterContent={solution.afterContent} 
              delay={index * 0.15} 
            />
          ))}
        </div>

        {/* Full-width CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 glass-card rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

          <div className="relative z-10 flex-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Eigene Ideen?
            </h3>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              Lass uns reden und ich überlege mir, wie wir deine Idee umsetzen.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <a href="#contact" className="block w-full">
              <Button 
                size="lg"
                className="w-full md:w-auto rounded-xl group transition-all duration-300 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 text-base px-8 py-6"
              >
                Kostenloses Gespräch buchen
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;