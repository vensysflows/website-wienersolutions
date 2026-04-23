
import React from 'react';
import { Helmet } from 'react-helmet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import HeroSection from '@/components/HeroSection.jsx';
import ProblemSection from '@/components/ProblemSection.jsx';
import SolutionsSection from '@/components/SolutionsSection.jsx';
import AboutMeSection from '@/components/AboutMeSection.jsx';
import TimelineSection from '@/components/TimelineSection.jsx';
import TestimonialsSection from '@/components/TestimonialsSection.jsx';
import ContactSection from '@/components/ContactSection.jsx';
import { usePixelTracking } from '@/hooks/usePixelTracking.js';

const HomePage = () => {
  usePixelTracking();

  const faqs = [
    {
      question: 'Was passiert beim kostenlosen Erstgespräch?',
      answer: 'Wir sprechen 30-45 Minuten über dein Unternehmen, deine Prozesse und wo Automatisierung am meisten Sinn macht. Ich zeige dir konkrete Beispiele und Möglichkeiten – ohne Verkaufsdruck. Du entscheidest danach in Ruhe, ob du weitermachen möchtest.'
    },
    {
      question: 'Was kostet mich die erste Automatisierung?',
      answer: 'Nichts. Die erste Automatisierung ist komplett kostenlos und unverbindlich. Ich baue dir in der ersten Woche eine kleine Automatisierung, damit du siehst, wie es funktioniert. Wenn es dir nicht gefällt, können wir alles rückgängig machen – ohne Kosten.'
    },
    {
      question: 'Wie sicher sind meine Daten?',
      answer: 'Alle Lösungen laufen auf europäischen Servern und sind 100% DSGVO-konform. Bei sensiblen Prozessen setze ich auf Human-in-the-Loop – wichtige Entscheidungen werden immer von Menschen überprüft.'
    },
    {
      question: 'Was passiert nach der Zusammenarbeit?',
      answer: 'Du hast zwei Optionen: Entweder übernimmst du die Automatisierungen selbst (mit detailliertem Report und 3 Monaten Garantie) oder ich übernehme das Hosting und die Wartung. Du entscheidest, was besser zu dir passt.'
    },
    {
      question: 'Ich habe keine IT-Abteilung – ist das ein Problem?',
      answer: 'Überhaupt nicht. Ich erkläre alles verständlich und erstelle einen Abschluss-Report, der sowohl für dich als auch für externe IT-Dienstleister verständlich ist. Die meisten meiner Kunden haben keine eigene IT-Abteilung.'
    },
    {
      question: 'Wie lange dauert ein typisches Projekt?',
      answer: 'Das hängt vom Umfang ab. Die erste Automatisierung ist in einer Woche fertig. Ein komplettes Automatisierungsprojekt dauert meist 2-6 Wochen. Ich arbeite bewusst nur mit maximal 5 Kunden gleichzeitig, damit jede Lösung wirklich sitzt.'
    }
  ];

  return (
    <div className="bg-background min-h-screen selection:bg-primary/30 selection:text-primary-foreground">
      <Helmet>
        <title>Wiener Solutions - Automatisierungen, die du kontrollierst</title>
        <meta name="description" content="Mein Name ist Lasse Wiener. Seid über zwei Jahren baue ich bereits Automatisierungen für verschiedenste Unternehmen. Ich liebe die Herausforderung, vor einem neuen Problem, neuen complexen Prozessen zu stehen und einen Plan zu entwickeln wie ich diese, auch mit der Anwendung von KI, automatisieren kann und dir Zeit sparen kann." />
      </Helmet>

      <HeroSection />
      <ProblemSection />
      <SolutionsSection />
      <AboutMeSection />
      <TimelineSection />
      <TestimonialsSection />
      <ContactSection />

      {/* FAQ Section */}
      <section id="faq" className="section-spacing relative">
        <div className="container mx-auto container-padding max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Häufige Fragen</h2>
            <p className="text-xl text-muted-foreground">
              Alles, was du wissen musst
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-2 md:p-6 mb-12">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/10 px-4 bg-white/5 rounded-xl data-[state=open]:bg-white/10 transition-colors">
                  <AccordionTrigger 
                    data-faq-question={faq.question} 
                    className="text-left font-semibold hover:no-underline py-4 text-foreground/90"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center">
            <a href="#contact">
              <Button 
                data-cta-button="Noch Fragen? Gespräch buchen" 
                size="lg" 
                className="rounded-xl group transition-all duration-300 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 text-base px-8 py-6"
              >
                Noch Fragen? Gespräch buchen
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
