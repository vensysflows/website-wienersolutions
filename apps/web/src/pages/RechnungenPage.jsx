
import React from 'react';
import { Helmet } from 'react-helmet';
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

const RechnungenPage = () => {
  usePixelTracking();

  return (
    <div className="light-mode min-h-screen selection:bg-primary/30 selection:text-primary-foreground">
      <Helmet>
        <title>Rechnungsautomatisierung — Wiener Solutions</title>
        <meta name="description" content="Berechne in 60 Sekunden, wie viel Zeit du mit automatischer Rechnungserstellung sparst. Setup in 7 Tagen. Kostenlos starten." />
      </Helmet>

      {/* Gray background wrapper for header + calculator */}
      <div className="bg-header-gray relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/50 to-transparent pointer-events-none"></div>
        <RechnungenHeader />
        <RechnungsRechner />
      </div>

      {/* Gradient background for remaining sections */}
      <div className="light-mode-container">
        <ProblemSection2 />
        <ValueStackSection />
        <ProcessSection />
        <SocialProofSection />
        <AboutCompactSection />
        <FinalCTASection />
        <Footer />
      </div>
    </div>
  );
};

export default RechnungenPage;
