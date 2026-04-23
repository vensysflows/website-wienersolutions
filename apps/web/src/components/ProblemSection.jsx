import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Unplug, Inbox, Activity } from 'lucide-react';
import ProblemCard from './ProblemCard.jsx';
import useSectionTracking from '@/hooks/useSectionTracking.js';

const problems = [
  {
    icon: Clock,
    title: 'Wertvolle Zeit geht verloren',
    description: 'Deine besten Mitarbeiter verbringen Stunden damit, Daten zwischen Systemen zu kopieren – statt sich um das zu kümmern, wofür du sie wirklich brauchst.'
  },
  {
    icon: Unplug,
    title: 'Tools reden nicht miteinander',
    description: 'CRM, Buchhaltung, Shop, Tabellen – alle arbeiten isoliert. Doppelte Datenpflege, Fehler und veraltete Zahlen sind der Alltag.'
  },
  {
    icon: Inbox,
    title: 'Anfragen gehen unter',
    description: 'Leads kommen per Mail, Formular und DM rein – und verschwinden in irgendwelchen Postfächern. Kein System, kein Follow-up, kein Umsatz.'
  },
  {
    icon: Activity,
    title: 'Kein Überblick',
    description: 'Du weißt nicht in Echtzeit, was in deinem Unternehmen gerade passiert. Reports werden manuell zusammengestellt – zu spät für gute Entscheidungen.'
  }
];

const ProblemSection = () => {
  const sectionRef = useSectionTracking('Problems');

  return (
    <section ref={sectionRef} id="problems" className="section-spacing relative z-10 overflow-hidden">
      {/* Subtle background element */}
      <div className="absolute top-0 right-0 w-full max-w-2xl h-full bg-primary/5 blur-[150px] pointer-events-none rounded-full translate-x-1/2"></div>

      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-3xl md:text-5xl font-bold mb-8"
          >
            Kommt dir das bekannt vor?
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProblemCard 
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;