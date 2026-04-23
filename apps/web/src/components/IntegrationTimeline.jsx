import React from 'react';
import { PhoneCall, Search, Wrench, Presentation, Server } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Anruf',
    description: 'Erstes Kennenlernen und Besprechung Ihrer Anforderungen.',
    icon: PhoneCall,
    detail: null,
  },
  {
    id: 2,
    title: 'Prozessanalyse',
    description: 'Detaillierte Analyse Ihrer bestehenden Abläufe.',
    icon: Search,
    detail: 'online oder auf Anfrage durch physischen Besuch für eine Gebühr',
  },
  {
    id: 3,
    title: 'Prozesse bauen',
    description: 'Entwicklung und Implementierung der automatisierten Prozesse.',
    icon: Wrench,
    detail: null,
  },
  {
    id: 4,
    title: 'Abschluss-Briefing',
    description: 'Präsentation der Ergebnisse und Schulung Ihres Teams.',
    icon: Presentation,
    detail: null,
  },
  {
    id: 5,
    title: 'Hosting & Support',
    description: 'Laufender Betrieb und Wartung Ihrer Systeme.',
    icon: Server,
    detail: 'monatliche Gebühr / Garantie für Support',
  },
];

const IntegrationTimeline = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Unser Integrationsprozess</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            In 5 einfachen Schritten zur erfolgreichen Prozessautomation
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="relative flex flex-col items-center text-center group">
                  {/* Connecting Line for Mobile/Tablet */}
                  {index !== steps.length - 1 && (
                    <div className="lg:hidden absolute top-full left-1/2 w-0.5 h-8 bg-border -translate-x-1/2 my-4"></div>
                  )}

                  <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 z-10">
                    <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  
                  <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 w-full h-full flex flex-col">
                    <div className="text-sm font-bold text-primary mb-2">Schritt {step.id}</div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm flex-grow">
                      {step.description}
                    </p>
                    {step.detail && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <p className="text-xs font-medium text-muted-foreground italic">
                          {step.detail}
                        </p>
                      </div>
                    )}
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

export default IntegrationTimeline;