
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RechnungenHeader from '@/components/RechnungenHeader.jsx';
import RechnungsRechner from '@/components/RechnungsRechner.jsx';
import ProblemSection2 from '@/components/ProblemSection2.jsx';
import ValueStackSection from '@/components/ValueStackSection.jsx';
import ProcessSection from '@/components/ProcessSection.jsx';
import SocialProofSection from '@/components/SocialProofSection.jsx';
import AboutCompactSection from '@/components/AboutCompactSection.jsx';
import FinalCTASection from '@/components/FinalCTASection.jsx';
import Footer from '@/components/Footer.jsx';
import { usePixelTracking } from '@/hooks/usePixelTracking.js';
import { useVariant } from '@/hooks/useVariant.js';
import useSectionTracking from '@/hooks/useSectionTracking.js';
import { VARIANTS } from '@/lib/variantConfig.js';

const DirectHeroSection = ({ variantConfig }) => {
  const sectionRef = useSectionTracking('rechnungs-rechner');
  return (
    <section
      ref={sectionRef}
      data-section-id="rechnungs-rechner"
      className="section-spacing relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-primary/5 blur-[150px] pointer-events-none" />
      <div className="container mx-auto container-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {variantConfig.rechnerBadgeText ?? 'Ø Kunde spart 8 Stunden pro Woche'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {variantConfig.rechnerHeadline ?? 'Wie viel Zeit verschwendest du gerade für Rechnungen?'}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            {variantConfig.rechnerSubline ?? 'Berechne deine Zeitersparnis in 60 Sekunden.'}
          </p>

          <div className="pt-2">
            <a
              href="https://calendly.com/icloud-surferlasse/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                data-cta-button="Hero Direct CTA"
                size="lg"
                className="rounded-xl group text-lg px-10 py-7 bg-primary text-white hover:bg-primary/90 shadow-lg"
              >
                {variantConfig.rechnerResultCTAText ?? 'Jetzt kostenlos automatisieren lassen'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {[
              variantConfig.rechnerTrustSignal1 ?? 'Kostenloses Setup in 7 Tagen',
              variantConfig.rechnerTrustSignal2 ?? 'Zeitersparnis-Garantie',
              variantConfig.rechnerTrustSignal3 ?? 'DSGVO-konform',
            ].map((signal) => (
              <div key={signal} className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{signal}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const RechnungenPage = () => {
  usePixelTracking();
  const { variant } = useVariant();
  const variantConfig = VARIANTS[variant] ?? VARIANTS['v1'];

  const showCalculator = variantConfig.showCalculator !== false;
  const showValueStack = variantConfig.showValueStack !== false;
  const socialProofFirst = variantConfig.socialProofFirst === true;

  return (
    <div className="light-mode min-h-screen selection:bg-primary/30 selection:text-primary-foreground">
      <Helmet>
        <title>Rechnungsautomatisierung — Wiener Solutions</title>
        <meta name="description" content="Berechne in 60 Sekunden, wie viel Zeit du mit automatischer Rechnungserstellung sparst. Setup in 7 Tagen. Kostenlos starten." />
      </Helmet>

      <div className="bg-header-gray relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/50 to-transparent pointer-events-none" />
        <RechnungenHeader variant={variant} variantConfig={variantConfig} />
        {showCalculator ? (
          <RechnungsRechner variant={variant} variantConfig={variantConfig} />
        ) : (
          <DirectHeroSection variantConfig={variantConfig} />
        )}
      </div>

      <div className="light-mode-container">
        {socialProofFirst && (
          <SocialProofSection variant={variant} variantConfig={variantConfig} />
        )}
        <ProblemSection2 variant={variant} variantConfig={variantConfig} />
        {showValueStack && (
          <ValueStackSection variant={variant} variantConfig={variantConfig} />
        )}
        <ProcessSection variant={variant} variantConfig={variantConfig} />
        {!socialProofFirst && (
          <SocialProofSection variant={variant} variantConfig={variantConfig} />
        )}
        <AboutCompactSection variant={variant} variantConfig={variantConfig} />
        <FinalCTASection variant={variant} variantConfig={variantConfig} />
        <Footer />
      </div>
    </div>
  );
};

export default RechnungenPage;
