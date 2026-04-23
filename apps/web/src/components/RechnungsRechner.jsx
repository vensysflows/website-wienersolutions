
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ArrowRight, ArrowLeft, CheckCircle2, ChevronDown } from 'lucide-react';
import { trackRechnerStarted, trackRechnerCompleted, trackRechnerCTAClick, trackRechnerScrollDown } from '@/lib/facebookPixelEvents.js';

const RechnungsRechner = ({ variantConfig = {} }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [invoices, setInvoices] = useState(20);
  const [reminders, setReminders] = useState(5);
  const [software, setSoftware] = useState('');
  const [stb, setStb] = useState('');
  const [hourlyRate, setHourlyRate] = useState(35);
  const containerRef = useRef(null);

  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const softwareOptions = [
    'DATEV',
    'Lexoffice',
    'sevDesk',
    'FastBill',
    'Excel / Manuell',
    'Keine'
  ];

  const handleNext = () => {
    if (currentStep === 0 && !hasStarted) {
      trackRechnerStarted();
      setHasStarted(true);
    }
    
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult();
      setCurrentStep(totalSteps);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateResult = () => {
    const minsPerInvoice = 12;
    const minsUpload = (software.toLowerCase() !== 'keine') ? 5 : 0;
    const minsPerReminder = 8;
    const minsStb = (stb === 'ja') ? 120 : 0;
    
    const totalMinsPerMonth = (invoices * (minsPerInvoice + minsUpload)) + (reminders * minsPerReminder) + minsStb;
    const hoursPerWeek = (totalMinsPerMonth / 60) / 4.33;
    const hoursPerYear = (totalMinsPerMonth / 60) * 12;
    const euroPerYear = Math.round(hoursPerYear * hourlyRate);

    trackRechnerCompleted(parseFloat(hoursPerWeek.toFixed(1)), euroPerYear, software);
  };

  const getResult = () => {
    const minsPerInvoice = 12;
    const minsUpload = (software.toLowerCase() !== 'keine') ? 5 : 0;
    const minsPerReminder = 8;
    const minsStb = (stb === 'ja') ? 120 : 0;
    
    const totalMinsPerMonth = (invoices * (minsPerInvoice + minsUpload)) + (reminders * minsPerReminder) + minsStb;
    const hoursPerWeek = (totalMinsPerMonth / 60) / 4.33;
    const hoursPerYear = (totalMinsPerMonth / 60) * 12;
    const euroPerYear = Math.round(hoursPerYear * hourlyRate);

    return {
      hoursPerWeek: parseFloat(hoursPerWeek.toFixed(1)),
      hoursPerYear: Math.round(hoursPerYear),
      euroPerYear: euroPerYear,
      invoices: invoices,
      reminders: reminders
    };
  };

  const handleResultCTA = () => {
    const result = getResult();
    trackRechnerCTAClick(result.hoursPerWeek, result.euroPerYear);
  };

  const handleScrollDown = (e) => {
    e.preventDefault();
    trackRechnerScrollDown();
    const problemsSection = document.getElementById('problems');
    if (problemsSection) {
      problemsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const canProceed = () => {
    if (currentStep === 2) return software !== '';
    if (currentStep === 3) return stb !== '';
    return true;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 calculator-step-name">Wie viele Rechnungen versendet ihr pro Monat?</h3>
              <p className="text-gray-600">Durchschnittlich über das Jahr gerechnet</p>
            </div>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">{invoices}</div>
                <div className="text-sm text-gray-600">Rechnungen / Monat</div>
              </div>
              <Slider
                value={[invoices]}
                onValueChange={(value) => setInvoices(value[0])}
                min={1}
                max={200}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>1</span>
                <span>200</span>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 calculator-step-name">Wie viele Mahnungen schreibt ihr durchschnittlich im Monat?</h3>
              <p className="text-gray-600">Erste und zweite Mahnung zusammen</p>
            </div>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">{reminders}</div>
                <div className="text-sm text-gray-600">Mahnungen / Monat</div>
              </div>
              <Slider
                value={[reminders]}
                onValueChange={(value) => setReminders(value[0])}
                min={0}
                max={50}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>0</span>
                <span>50</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 calculator-step-name">Welche Buchhaltungssoftware nutzt ihr?</h3>
              <p className="text-gray-600">Wähle die Software, die ihr aktuell verwendet</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {softwareOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSoftware(option)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    software === option
                      ? 'border-primary bg-primary text-white font-semibold'
                      : 'border-gray-300 bg-white hover:border-primary/50 text-gray-900'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 calculator-step-name">Arbeitet ihr mit einem Steuerberater?</h3>
              <p className="text-gray-600">Bereitet ihr monatlich Belege für den Steuerberater vor?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setStb('ja')}
                className={`p-8 rounded-2xl border-2 transition-all duration-200 ${
                  stb === 'ja'
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 bg-white hover:border-primary/50 text-gray-900'
                }`}
              >
                <div className="text-4xl mb-3">✓</div>
                <div className="text-xl font-bold">Ja</div>
                <div className={`text-sm mt-2 ${stb === 'ja' ? 'text-white/90' : 'text-gray-600'}`}>Wir arbeiten mit einem Steuerberater</div>
              </button>
              <button
                onClick={() => setStb('nein')}
                className={`p-8 rounded-2xl border-2 transition-all duration-200 ${
                  stb === 'nein'
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 bg-white hover:border-primary/50 text-gray-900'
                }`}
              >
                <div className="text-4xl mb-3">✗</div>
                <div className="text-xl font-bold">Nein</div>
                <div className={`text-sm mt-2 ${stb === 'nein' ? 'text-white/90' : 'text-gray-600'}`}>Wir machen alles selbst</div>
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 calculator-step-name">Was kostet die Person, die das aktuell macht?</h3>
              <p className="text-gray-600">Stundensatz oder geschätzter interner Kostensatz</p>
            </div>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">{hourlyRate}€</div>
                <div className="text-sm text-gray-600">pro Stunde</div>
              </div>
              <Slider
                value={[hourlyRate]}
                onValueChange={(value) => setHourlyRate(value[0])}
                min={15}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>15€</span>
                <span>100€</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const result = currentStep === totalSteps ? getResult() : null;

  return (
    <section data-section-id="rechnungs-rechner" className="section-spacing relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-primary/5 blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto container-padding relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{variantConfig.rechnerBadgeText ?? 'Ø Kunde spart 8 Stunden pro Woche'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {variantConfig.rechnerHeadline ?? 'Wie viel Zeit verschwendest du gerade für Rechnungen?'}
            </h1>
            <p className="text-xl text-gray-600">
              {variantConfig.rechnerSubline ?? 'Berechne deine Zeitersparnis in 60 Sekunden.'}
            </p>
          </motion.div>

          {/* Calculator Card */}
          <div className="calculator-container bg-white/90 backdrop-blur-md border border-gray-200/60 shadow-lg rounded-3xl p-8 md:p-12" ref={containerRef}>
            
            {currentStep < totalSteps && (
              <>
                {/* Progress Bar */}
                <div className="mb-12">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-600 calculator-step-number">
                      Schritt {currentStep + 1} von {totalSteps}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-12">
                  {currentStep > 0 && (
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="calc-prev-btn rounded-xl border-gray-300 text-gray-900 hover:bg-gray-100"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Zurück
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="calc-next-btn rounded-xl ml-auto group bg-primary text-white hover:bg-primary/90"
                  >
                    {currentStep === totalSteps - 1 ? 'Ergebnis anzeigen' : 'Weiter'}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </>
            )}

            {/* Result Screen */}
            {currentStep === totalSteps && result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                    Dein Ergebnis
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    So viel Zeit verschwendest du aktuell für Rechnungen
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center">
                    <div className="text-5xl md:text-6xl font-bold text-primary mb-2 result-hours-week">
                      {result.hoursPerWeek}
                    </div>
                    <div className="text-sm text-gray-600">Stunden pro Woche</div>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center">
                    <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                      {result.hoursPerYear}
                    </div>
                    <div className="text-sm text-gray-600">Stunden pro Jahr</div>
                  </div>
                </div>

                {/* Euro Value */}
                <div className="bg-gray-100 border border-gray-200 rounded-2xl p-8 text-center">
                  <div className="text-sm text-gray-600 mb-2">Das kostet dich jährlich</div>
                  <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2 result-cost-year">
                    {result.euroPerYear.toLocaleString('de-DE')}€
                  </div>
                  <div className="text-sm text-gray-600">
                    bei {result.invoices} Rechnungen und {result.reminders} Mahnungen pro Monat
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>{variantConfig.rechnerTrustSignal1 ?? 'Kostenloses Setup in 7 Tagen'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>{variantConfig.rechnerTrustSignal2 ?? 'Zeitersparnis-Garantie'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>{variantConfig.rechnerTrustSignal3 ?? 'DSGVO-konform'}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6">
                  <a 
                    href="https://calendly.com/icloud-surferlasse/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleResultCTA}
                  >
                    <Button
                      data-cta-button="Rechner Ergebnis CTA"
                      size="lg"
                      className="w-full rounded-xl group text-lg py-6 bg-primary text-white hover:bg-primary/90"
                    >
                      {variantConfig.rechnerResultCTAText ?? 'Jetzt kostenlos automatisieren lassen'}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </div>

                {/* Scroll Down Link */}
                <div className="text-center pt-6">
                  <a
                    href="#problems"
                    onClick={handleScrollDown}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors group"
                  >
                    Mehr erfahren
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RechnungsRechner;
