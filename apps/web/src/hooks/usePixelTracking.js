import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initializeUTMTracking, getUTMParameter, trackPixelEvent } from '@/lib/pixelTracking.js';
import { initializePixelEventTracking } from '@/lib/facebookPixelEvents.js';

export const usePixelTracking = () => {
  const location = useLocation();

  // Initialize UTM tracking and custom event delegation on mount
  useEffect(() => {
    initializeUTMTracking();
    initializePixelEventTracking();
  }, []);

  // Track ViewContent on route changes (PageView is now handled in App.jsx)
  useEffect(() => {
    // Small delay to ensure document.title is updated by react-helmet
    const timeoutId = setTimeout(() => {
      trackPixelEvent('ViewContent', {
        content_name: document.title,
        campaign: getUTMParameter('utm_campaign'),
        ad: getUTMParameter('utm_content')
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.search]);

  const trackLead = () => {
    trackPixelEvent('Lead', {
      campaign: getUTMParameter('utm_campaign'),
      ad: getUTMParameter('utm_content')
    });
  };

  return { trackLead };
};

export default usePixelTracking;