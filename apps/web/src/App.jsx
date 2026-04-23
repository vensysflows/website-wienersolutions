import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import RechnungenPage from './pages/RechnungenPage.jsx';
import ImpressumPage from './pages/ImpressumPage.jsx';
import DatenschutzPage from './pages/DatenschutzPage.jsx';
import AGBPage from './pages/AGBPage.jsx';
import { Toaster } from '@/components/ui/toaster';
import { usePixelTracking } from '@/hooks/usePixelTracking.js';
import { initializePageViewTracking } from '@/lib/pixelTracking.js';

// Wrapper component to use hooks that require Router context
const TrackingWrapper = () => {
  const location = useLocation();
  
  // Initialize pixel tracking hooks
  usePixelTracking();

  // Fire PageView on every route change
  useEffect(() => {
    initializePageViewTracking();
  }, [location.pathname, location.search]);

  return null;
};

function App() {
  return (
    <Router>
      <TrackingWrapper />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <main className="flex-grow">
              <HomePage />
            </main>
            <Footer />
          </>
        } />
        <Route path="/rechnungen" element={<RechnungenPage />} />
        <Route path="/impressum" element={
          <>
            <Header />
            <main className="flex-grow">
              <ImpressumPage />
            </main>
            <Footer />
          </>
        } />
        <Route path="/datenschutz" element={
          <>
            <Header />
            <main className="flex-grow">
              <DatenschutzPage />
            </main>
            <Footer />
          </>
        } />
        <Route path="/agb" element={
          <>
            <Header />
            <main className="flex-grow">
              <AGBPage />
            </main>
            <Footer />
          </>
        } />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;