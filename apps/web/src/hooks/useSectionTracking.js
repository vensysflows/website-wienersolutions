import { useEffect, useRef } from 'react';
import { trackSectionView } from '@/lib/facebookPixelEvents.js';

const STORAGE_KEY = 'viewedSections';
const DEBOUNCE_DELAY = 300;

const useSectionTracking = (sectionName) => {
  const sectionRef = useRef(null);
  const timeoutRef = useRef(null);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || typeof window === 'undefined') return;

    // Check if section was already viewed in this session
    const getViewedSections = () => {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch (error) {
        console.error('Error reading viewedSections from sessionStorage:', error);
        return [];
      }
    };

    const markSectionAsViewed = () => {
      try {
        const viewedSections = getViewedSections();
        if (!viewedSections.includes(sectionName)) {
          viewedSections.push(sectionName);
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(viewedSections));
        }
      } catch (error) {
        console.error('Error writing viewedSections to sessionStorage:', error);
      }
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasTrackedRef.current) {
          // Clear any existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          // Debounce the tracking call
          timeoutRef.current = setTimeout(() => {
            const viewedSections = getViewedSections();
            
            // Only track if not already viewed in this session
            if (!viewedSections.includes(sectionName)) {
              trackSectionView(sectionName);
              markSectionAsViewed();
              hasTrackedRef.current = true;
            }
          }, DEBOUNCE_DELAY);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
      rootMargin: '0px'
    });

    observer.observe(sectionRef.current);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, [sectionName]);

  return sectionRef;
};

export default useSectionTracking;