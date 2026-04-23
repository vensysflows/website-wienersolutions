import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { usePixelTracking } from '@/hooks/usePixelTracking.js';
import useSectionTracking from '@/hooks/useSectionTracking.js';

const ContactSection = () => {
  const { trackLead } = usePixelTracking();
  const sectionRef = useSectionTracking('Contact');

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Listen for Calendly events to track leads
    const handleCalendlyEvent = (e) => {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        trackLead();
      }
    };

    window.addEventListener('message', handleCalendlyEvent);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, [trackLead]);

  const benefits = [
    "Ehrliche Einschätzung, was automatisierbar ist",
    "Komplett unverbindlich",
    "Erste Automatisierung danach kostenlos und unverbindlich"
  ];

  return (
    <section ref={sectionRef} id="contact" className="section-spacing relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-primary/5 blur-[150px] pointer-events-none rounded-full"></div>
      
      <div className="container mx-auto container-padding relative z-10">
        <div className="max-w-6xl mx-auto glass-panel rounded-3xl p-6 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content (Left on Desktop, Top on Mobile) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Erzähl mir von deinem größten 
                  <span className="text-primary"> Zeitfresser.</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Im kostenlosen Erstgespräch schauen wir gemeinsam, welcher Prozess in deinem Unternehmen den größten Engpass verursacht. Du bekommst sofort konkrete Ideen – unabhängig davon, ob wir danach zusammenarbeiten.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-xl font-semibold mb-4">Was dich erwartet:</h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                      <span className="text-foreground/90">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Calendly Widget (Right on Desktop, Bottom on Mobile) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full bg-background/50 rounded-2xl overflow-hidden border border-white/5"
            >
              <div 
                className="calendly-inline-widget w-full" 
                data-url="https://calendly.com/icloud-surferlasse/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=3b82f6" 
                style={{ minWidth: '320px', height: '700px' }}
              ></div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;