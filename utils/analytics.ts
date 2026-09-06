/**
 * ==============================================================================
 * OptiScale Digital - Analytics & Tracking Dispatcher
 * ==============================================================================
 * Strictly obeys user consent choices from ConsentManager.
 * - Google Analytics 4 tracks events when Analytics consent is granted.
 * - Meta Pixel tracks events when Marketing consent is granted.
 * ==============================================================================
 */

import {
  isAnalyticsGranted,
  isMarketingGranted,
  getActiveMetaTestCode,
  GA_MEASUREMENT_ID,
  META_PIXEL_ID,
  openCookiePreferences,
  acceptAllCookies,
  rejectNonEssentialCookies,
  saveConsentPreferences,
  getStoredConsent,
  hasUserConsented,
} from './consentManager';

export {
  openCookiePreferences,
  acceptAllCookies,
  rejectNonEssentialCookies,
  saveConsentPreferences,
  getStoredConsent,
  hasUserConsented,
  isAnalyticsGranted,
  isMarketingGranted,
  GA_MEASUREMENT_ID,
  META_PIXEL_ID,
};

interface TrackEventParams {
  button_text?: string;
  location?: string;
  page_path?: string;
  [key: string]: any;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: any;
    _fbq?: any;
  }
}

/**
 * Safely triggers a GA4 event IF Analytics consent is granted
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}): void => {
  if (typeof window === 'undefined') return;

  // Respect Analytics consent
  if (isAnalyticsGranted() && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Event] "${eventName}":`, params, `(Consented: ${isAnalyticsGranted()})`);
  }
};

/**
 * Tracks a route/virtual pageview across GA4 and Meta Pixel according to consent
 */
export const trackPageView = (pagePath: string, pageTitle?: string): void => {
  if (typeof window === 'undefined') return;
  const title = pageTitle || document.title || 'OptiScale Digital';
  const url = window.location.href;

  // 1. Google Analytics 4 Virtual Pageview
  if (isAnalyticsGranted() && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: title,
      page_location: url,
    });
  }

  // 2. Meta Pixel PageView
  if (isMarketingGranted() && typeof window.fbq === 'function') {
    const testCode = getActiveMetaTestCode();
    if (testCode) {
      window.fbq('track', 'PageView', { test_event_code: testCode }, { test_event_code: testCode });
    } else {
      window.fbq('track', 'PageView');
    }
  }
};

/**
 * Macro lead generation tracking helper
 */
export const trackLeadGeneration = (buttonText: string, location: string, details: Record<string, any> = {}): void => {
  // GA4 event
  trackEvent('generate_lead', {
    button_text: buttonText,
    location: location,
    currency: 'GBP',
    ...details,
  });

  // Meta Pixel Lead event (only if marketing consent granted)
  if (isMarketingGranted() && typeof window.fbq === 'function') {
    const testCode = getActiveMetaTestCode();
    const payload = {
      content_name: buttonText,
      content_category: location,
      currency: 'GBP',
      ...(testCode ? { test_event_code: testCode } : {}),
      ...details,
    };
    if (testCode) {
      window.fbq('track', 'Lead', payload, { test_event_code: testCode });
    } else {
      window.fbq('track', 'Lead', payload);
    }
  }
};

