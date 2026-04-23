import { useState, useEffect } from 'react';
import { ACTIVE_VARIANTS, CONTROL_VARIANT, COOKIE_KEY, COOKIE_DAYS } from '@/lib/variantConfig.js';

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
};

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Resolves the active variant for the current visitor.
 *
 * Priority:
 * 1. utm_content from URL (also writes to sessionStorage + cookie)
 * 2. Existing cookie (returning visitor)
 * 3. Random assignment from ACTIVE_VARIANTS (new visitor without UTM)
 *
 * Returns: { variant: 'v1' | 'v2' | 'v3' }
 */
export const useVariant = () => {
  const [variant, setVariant] = useState(CONTROL_VARIANT);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmContent = params.get('utm_content');

    if (utmContent && ACTIVE_VARIANTS.includes(utmContent)) {
      setCookie(COOKIE_KEY, utmContent, COOKIE_DAYS);
      setVariant(utmContent);
      return;
    }

    const cookieVariant = getCookie(COOKIE_KEY);
    if (cookieVariant && ACTIVE_VARIANTS.includes(cookieVariant)) {
      setVariant(cookieVariant);
      return;
    }

    const assigned = pickRandom(ACTIVE_VARIANTS);
    setCookie(COOKIE_KEY, assigned, COOKIE_DAYS);
    setVariant(assigned);
  }, []);

  return { variant };
};
