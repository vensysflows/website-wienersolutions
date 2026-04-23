import { getUTMParameter } from './pixelTracking.js';

export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export const trackFAQClick = (questionText) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'FAQClick', { faq_question: questionText });
  }
};

export const trackImpressumClick = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'ImpressumClick');
  }
};

export const trackCTAClick = (buttonText) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'CTAClick', { button_text: buttonText });
  }
};

export const trackProblemToggle = (toggleState) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'ProblemToggle', { toggle_state: toggleState });
  }
};

export const trackSectionView = (sectionName) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', `SectionView_${sectionName}`, { section_name: sectionName });
  }
};

export const trackRechnerStarted = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'RechnerStarted', {
      utm_source: getUTMParameter('utm_source'),
      utm_medium: getUTMParameter('utm_medium'),
      utm_campaign: getUTMParameter('utm_campaign')
    });
  }
};

export const trackRechnerCompleted = (hoursPerWeek, euroPerYear, software) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'RechnerCompleted', {
      hours_per_week: hoursPerWeek,
      euro_per_year: euroPerYear,
      software: software,
      utm_source: getUTMParameter('utm_source'),
      utm_medium: getUTMParameter('utm_medium'),
      utm_campaign: getUTMParameter('utm_campaign')
    });
  }
};

export const trackRechnerCTAClick = (hoursPerWeek, euroPerYear) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'RechnerCTAClick', {
      hours_per_week: hoursPerWeek,
      euro_per_year: euroPerYear,
      utm_source: getUTMParameter('utm_source'),
      utm_medium: getUTMParameter('utm_medium'),
      utm_campaign: getUTMParameter('utm_campaign')
    });
  }
};

export const trackRechnerScrollDown = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'RechnerScrollDown');
  }
};

export const debouncedTrackFAQClick = debounce(trackFAQClick);
export const debouncedTrackImpressumClick = debounce(trackImpressumClick);
export const debouncedTrackCTAClick = debounce(trackCTAClick);
export const debouncedTrackProblemToggle = debounce(trackProblemToggle);

let isInitialized = false;

export const initializePixelEventTracking = () => {
  if (typeof document === 'undefined' || isInitialized) return;
  isInitialized = true;

  document.addEventListener('click', (e) => {
    // Track FAQ clicks
    const faqEl = e.target.closest('[data-faq-question]');
    if (faqEl) {
      debouncedTrackFAQClick(faqEl.getAttribute('data-faq-question'));
    }

    // Track Impressum clicks
    const impressumEl = e.target.closest('[data-impressum]');
    if (impressumEl) {
      debouncedTrackImpressumClick();
    }

    // Track CTA button clicks
    const ctaEl = e.target.closest('[data-cta-button]');
    if (ctaEl) {
      debouncedTrackCTAClick(ctaEl.getAttribute('data-cta-button'));
    }

    // Track Problem Toggle clicks via event delegation
    const toggleEl = e.target.closest('[data-problem-toggle]');
    if (toggleEl && toggleEl.tagName.toLowerCase() !== 'input') {
      const state = toggleEl.getAttribute('data-problem-state');
      if (state) {
        debouncedTrackProblemToggle(state);
      }
    }
  });

  document.addEventListener('change', (e) => {
    // Fallback for native switch/checkbox toggles
    const toggleEl = e.target.closest('input[data-problem-toggle]');
    if (toggleEl) {
      const state = toggleEl.checked ? 'automated' : 'problem';
      debouncedTrackProblemToggle(state);
    }
  });
};