import React from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard.jsx';
import useSectionTracking from '@/hooks/useSectionTracking.js';

const testimonials = [
  {
    name: 'Markus T.',
    company: 'Geschäftsführer, E-Commerce Unternehmen',
    quote: 'Anfangs hat Lasse nur kleinere Automatisierungen für Daten-Automatiserungen gebaut. Als diese Automationen liefen, sind wir den nächsten Schritt gegangen und haben zusammen mit Lasse unseren Kundensupport zu 90% automatisieren können. Früher haben wir immer neue Mitarbeiter gesucht, aber in Wirklichkeit mussten wir unsere Mitarbeiter nur effizienter machen und ihnen unnötige Last abnehmen!',
    stars: 5,
    image: 'https://images.unsplash.com/photo-1603991414220-51b87b89a371'
  },
  {
    name: 'Pascal K.',
    company: 'Inhaber, Großhandel für Sportschuhe',
    quote: 'Wir sind ohne eine Idee zu Lasse gekommen; unsere Prozesse im Unternehmen waren ineffizient, da unsere Programme nicht synchronisiert waren und zwei bis drei Mitarbeiter immer damit beschöftigt waren Daten zu synchronisieren. Lasse konnte das Chaos komplett sortieren, automatisieren und uns anschließend alles verständlich erklären. Jetzt habe ich wirklch den Überblick - Danke!',
    stars: 5,
    image: 'https://images.unsplash.com/photo-1590769620285-6926a01c2a58'
  }
];

const TestimonialsSection = () => {
  const sectionRef = useSectionTracking('Testimonials');

  return (
    <section ref={sectionRef} id="testimonials" className="section-spacing relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 right-0 w-full max-w-lg h-96 bg-accent/5 blur-[120px] pointer-events-none -translate-y-1/2 rounded-full"></div>
      
      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Was Kunden sagen
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;