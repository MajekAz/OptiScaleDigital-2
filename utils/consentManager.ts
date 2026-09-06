/**
 * ==============================================================================
 * OptiScale Digital - Privacy & Cookie Consent Architecture
 * ==============================================================================
 * 
 * Compliance:
 * - UK General Data Protection Regulation (UK GDPR)
 * - Data Protection Act 2018
 * - Privacy and Electronic Communications Regulations (PECR)
 * - Google Consent Mode v2 (analytics_storage, ad_storage, ad_user_data, ad_personalization)
 * - Meta (Facebook) Pixel Consent API (grant / revoke)
 * 
 * Cookie Categories:
 * 1. Necessary:
 *    - Always active; strictly required for site navigation, security, and consent persistence.
 * 2. Analytics:
 *    - Optional. Powered by Google Analytics 4 (G-V4SM3069P2).
 *    - Follows Google Consent Mode v2.
 * 3. Marketing:
 *    - Optional. Powered by Meta/Facebook Pixel (1627665848697345).
 *    - Script is NOT loaded before marketing consent is explicitly granted.
 * ==============================================================================
 */

export interface CookieConsentPreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

export const CONSENT_STORAGE_KEY = 'optiscale_consent_preferences';
export const LEGACY_STORAGE_KEY = 'optiscale_gdpr_consent';
export const CONSENT_VERSION = '1.0';

export const GA_MEASUREMENT_ID = 'G-V4SM3069P2';
export const META_PIXEL_ID = '1627665848697345';

// Event names for reactive UI communication
export const EVENT_CONSENT_CHANGED = 'optiscale-consent-changed';
export const EVENT_OPEN_PREFERENCES = 'optiscale-open-consent-preferences';

/**
 * Reads stored consent from localStorage safely
 */
export const getStoredConsent = (): CookieConsentPreferences | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.analytics === 'boolean' && typeof parsed.marketing === 'boolean') {
      return {
        necessary: true,
        analytics: Boolean(parsed.analytics),
        marketing: Boolean(parsed.marketing),
        timestamp: parsed.timestamp || new Date().toISOString(),
        version: parsed.version || CONSENT_VERSION,
      };
    }
  } catch (e) {
    console.error('[Consent] Error reading stored consent:', e);
  }
  return null;
};

/**
 * Checks whether the user has already made an explicit consent choice
 */
export const hasUserConsented = (): boolean => {
  return getStoredConsent() !== null;
};

/**
 * Checks if Analytics cookies are permitted
 */
export const isAnalyticsGranted = (): boolean => {
  const consent = getStoredConsent();
  return consent ? consent.analytics : false;
};

/**
 * Checks if Marketing cookies are permitted
 */
export const isMarketingGranted = (): boolean => {
  const consent = getStoredConsent();
  return consent ? consent.marketing : false;
};

/**
 * Updates Google Consent Mode v2 via gtag
 */
export const updateGoogleConsentMode = (analytics: boolean, marketing: boolean): void => {
  if (typeof window === 'undefined') return;

  const consentConfig = {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    personalization_storage: 'granted',
  };

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', consentConfig);
    if (process.env.NODE_ENV === 'development') {
      console.log('[Consent] Google Consent Mode v2 updated:', consentConfig);
    }
  } else {
    // Fallback: queue in dataLayer if gtag is not yet ready
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(['consent', 'update', consentConfig]);
  }
};

/**
 * Meta Pixel test event code helper (supports testing in Events Manager)
 */
export const getActiveMetaTestCode = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('test_event_code') || urlParams.get('fb_test_event_code');
    if (code) {
      sessionStorage.setItem('meta_test_event_code', code);
      return code;
    }
    const stored = sessionStorage.getItem('meta_test_event_code');
    if (stored) return stored;
  } catch (e) {}
  return null;
};

/**
 * Dynamically loads and initializes the Meta Pixel script ONLY after marketing consent is granted
 */
export const loadMetaPixel = (): void => {
  if (typeof window === 'undefined') return;

  // Prevent duplicate script tag injection
  if (window.fbq && document.getElementById('optiscale-meta-pixel-script')) {
    try {
      window.fbq('consent', 'grant');
    } catch (e) {}
    return;
  }

  try {
    // Initialize standard Meta Pixel queue stub
    if (!window.fbq) {
      const fbqStub: any = function () {
        if (fbqStub.callMethod) {
          fbqStub.callMethod.apply(fbqStub, arguments);
        } else {
          fbqStub.queue.push(arguments);
        }
      };
      fbqStub.push = fbqStub;
      fbqStub.loaded = true;
      fbqStub.version = '2.0';
      fbqStub.queue = [];
      window.fbq = fbqStub;
      window._fbq = fbqStub;
    }

    // Grant consent and initialize
    window.fbq('consent', 'grant');
    window.fbq('init', META_PIXEL_ID);

    // Inject external fbevents.js script
    const script = document.createElement('script');
    script.id = 'optiscale-meta-pixel-script';
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);

    // Fire initial PageView (with test code if present)
    const testCode = getActiveMetaTestCode();
    if (testCode) {
      window.fbq('track', 'PageView', { test_event_code: testCode }, { test_event_code: testCode });
    } else {
      window.fbq('track', 'PageView');
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Consent] Meta Pixel loaded and initialized with ID:', META_PIXEL_ID);
    }
  } catch (err) {
    console.error('[Consent] Failed to load Meta Pixel:', err);
  }
};

/**
 * Revokes Meta Pixel consent if marketing is turned off
 */
export const revokeMetaPixel = (): void => {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq === 'function') {
    try {
      window.fbq('consent', 'revoke');
      if (process.env.NODE_ENV === 'development') {
        console.log('[Consent] Meta Pixel consent revoked.');
      }
    } catch (e) {}
  }
};

/**
 * Applies consent rules to third-party tools based on user choices
 */
export const applyConsentRules = (preferences: CookieConsentPreferences): void => {
  // 1. Google Consent Mode v2
  updateGoogleConsentMode(preferences.analytics, preferences.marketing);

  // 2. Meta Pixel handling
  if (preferences.marketing) {
    loadMetaPixel();
  } else {
    revokeMetaPixel();
  }

  // 3. Dispatch change event to all reactive listeners
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(EVENT_CONSENT_CHANGED, {
        detail: preferences,
      })
    );
  }
};

/**
 * Saves user consent preferences to localStorage and applies tracking rules immediately
 */
export const saveConsentPreferences = (
  choices: { analytics: boolean; marketing: boolean }
): CookieConsentPreferences => {
  const preferences: CookieConsentPreferences = {
    necessary: true,
    analytics: choices.analytics,
    marketing: choices.marketing,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
    // Set legacy key for backwards compatibility
    const legacyStatus = choices.analytics && choices.marketing
      ? 'accepted'
      : choices.analytics || choices.marketing
      ? 'custom'
      : 'declined';
    localStorage.setItem(LEGACY_STORAGE_KEY, legacyStatus);
  } catch (e) {
    console.error('[Consent] Error saving preferences to localStorage:', e);
  }

  applyConsentRules(preferences);
  return preferences;
};

/**
 * Accept All Non-Essential Cookies
 */
export const acceptAllCookies = (): CookieConsentPreferences => {
  return saveConsentPreferences({ analytics: true, marketing: true });
};

/**
 * Reject All Non-Essential Cookies (only Necessary enabled)
 */
export const rejectNonEssentialCookies = (): CookieConsentPreferences => {
  return saveConsentPreferences({ analytics: false, marketing: false });
};

/**
 * Triggers the consent preferences modal to open from anywhere (Footer, Cookie Policy, etc.)
 */
export const openCookiePreferences = (): void => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_OPEN_PREFERENCES));
  }
};
