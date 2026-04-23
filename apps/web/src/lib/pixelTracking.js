export const initializeUTMTracking = () => {
  if (typeof window === 'undefined') return;
  
  const params = new URLSearchParams(window.location.search);
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  
  utmParams.forEach(param => {
    if (params.has(param)) {
      sessionStorage.setItem(param, params.get(param));
    }
  });
};

export const getUTMParameter = (paramName) => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(paramName);
};

export const trackPixelEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    // Only pass eventData if it has keys to avoid sending empty objects
    if (Object.keys(eventData).length > 0) {
      window.fbq('track', eventName, eventData);
    } else {
      window.fbq('track', eventName);
    }
  }
};

export const initializePageViewTracking = () => {
  if (typeof window === 'undefined') return;

  // If fbq is already available, fire PageView immediately
  if (window.fbq) {
    window.fbq('track', 'PageView');
    return;
  }

  // If fbq is not yet loaded, retry with exponential backoff
  let attempts = 0;
  const maxAttempts = 20; // 20 attempts * 100ms = 2 seconds max wait
  
  const checkAndTrack = () => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
      return;
    }
    
    attempts++;
    if (attempts < maxAttempts) {
      setTimeout(checkAndTrack, 100);
    }
  };
  
  checkAndTrack();
};