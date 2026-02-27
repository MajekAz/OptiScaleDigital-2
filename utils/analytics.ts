/**
 * Google Analytics 4 Tracking Utilities
 */

interface TrackEventParams {
  button_text: string;
  location: string;
  [key: string]: any;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Safely triggers a GA4 event
 * @param eventName The name of the event (e.g., 'generate_lead')
 * @param params Event parameters
 */
export const trackEvent = (eventName: string, params: TrackEventParams) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else {
    // Fallback or debug logging if needed
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Event: ${eventName}`, params);
    }
  }
};

/**
 * Specific helper for lead generation events
 */
export const trackLeadGeneration = (buttonText: string, location: string) => {
  trackEvent('generate_lead', {
    button_text: buttonText,
    location: location,
  });
};
