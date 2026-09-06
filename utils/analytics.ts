/**
 * ==============================================================================
 * OptiScale Digital - Central Conversion & Analytics Tracking Engine
 * ==============================================================================
 * 
 * Provides an authoritative, centralized abstraction for all conversion events
 * across Google Analytics 4 (GA4) and Meta (Facebook) Pixel.
 * 
 * Guarantees:
 * 1. Strictly respects user privacy and consent (via ConsentManager).
 * 2. Deduplicates events against React Strict Mode double-mounts, route transitions,
 *    rapid button double-clicks, and re-renders.
 * 3. Only fires conversion events when actions genuinely succeed (never on validation failure).
 * 4. Adheres to Google's and Meta's official recommended event names.
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

// Global TypeScript declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: any;
    _fbq?: any;
  }
}

// ==============================================================================
// In-Memory & Session Deduplication Engine
// ==============================================================================

const recentEventsMap = new Map<string, number>();
const firedConversions = new Set<string>();

/**
 * Generates a unique event ID for deduplication
 */
export const generateEventId = (prefix: string = 'evt'): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `${prefix}_${timestamp}_${randomStr}`;
};

/**
 * Checks whether an event with the given key was dispatched within the cooldown window (default 1500ms)
 */
const isThrottled = (eventKey: string, cooldownMs: number = 1500): boolean => {
  const now = Date.now();
  const lastTime = recentEventsMap.get(eventKey);
  if (lastTime && now - lastTime < cooldownMs) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Analytics Deduplication] Throttled duplicate event key: "${eventKey}"`);
    }
    return true;
  }
  recentEventsMap.set(eventKey, now);

  // Periodic cleanup
  if (recentEventsMap.size > 100) {
    for (const [k, time] of recentEventsMap.entries()) {
      if (now - time > 10000) {
        recentEventsMap.delete(k);
      }
    }
  }

  return false;
};

/**
 * Checks whether a persistent conversion has already fired in the current session
 */
const hasAlreadyFiredInSession = (uniqueConversionId: string): boolean => {
  if (firedConversions.has(uniqueConversionId)) return true;
  try {
    const sessionKey = `optiscale_conv_${uniqueConversionId}`;
    if (sessionStorage.getItem(sessionKey)) return true;
    sessionStorage.setItem(sessionKey, '1');
    firedConversions.add(uniqueConversionId);
    return false;
  } catch (e) {
    firedConversions.add(uniqueConversionId);
    return false;
  }
};

// ==============================================================================
// Core Dispatcher
// ==============================================================================

export interface TrackingOptions {
  eventId?: string;
  dedupKey?: string;
  cooldownMs?: number;
  oncePerSessionId?: string;
}

/**
 * Central event tracking dispatcher.
 * Maps high-level events to GA4 and Meta Pixel based on user consent.
 */
export const trackEvent = (
  gaEventName: string,
  gaParams: Record<string, any> = {},
  metaEventName?: string,
  metaParams: Record<string, any> = {},
  options: TrackingOptions = {}
): void => {
  if (typeof window === 'undefined') return;

  // Session deduplication check
  if (options.oncePerSessionId && hasAlreadyFiredInSession(options.oncePerSessionId)) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Suppressed repeat session conversion: ${options.oncePerSessionId}`);
    }
    return;
  }

  // Throttle deduplication check
  const dedupKey = options.dedupKey || `${gaEventName}_${JSON.stringify(gaParams)}`;
  if (isThrottled(dedupKey, options.cooldownMs ?? 1200)) {
    return;
  }

  const eventId = options.eventId || generateEventId(gaEventName);

  // 1. Google Analytics 4 (if Analytics consent granted)
  if (isAnalyticsGranted() && typeof window.gtag === 'function') {
    const enrichedGaParams = {
      ...gaParams,
      event_id: eventId,
      send_to: GA_MEASUREMENT_ID,
    };
    window.gtag('event', gaEventName, enrichedGaParams);
  }

  // 2. Meta Pixel (if Marketing consent granted)
  if (metaEventName && isMarketingGranted() && typeof window.fbq === 'function') {
    const testCode = getActiveMetaTestCode();
    const enrichedMetaParams = {
      ...metaParams,
      currency: metaParams.currency || 'GBP',
      ...(testCode ? { test_event_code: testCode } : {}),
    };

    const eventOptions: Record<string, any> = { eventID: eventId };
    if (testCode) {
      eventOptions.test_event_code = testCode;
    }

    window.fbq('track', metaEventName, enrichedMetaParams, eventOptions);
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Dispatched] GA4: "${gaEventName}", Meta: "${metaEventName || 'none'}"`, {
      gaParams,
      metaParams,
      eventId,
      analyticsConsent: isAnalyticsGranted(),
      marketingConsent: isMarketingGranted(),
    });
  }
};

// ==============================================================================
// PRIMARY CONVERSIONS (Business Outcomes 1 - 7)
// ==============================================================================

/**
 * 1. Contact Form Successfully Submitted
 * Fired strictly after the server confirms receipt of the contact message.
 */
export const trackContactFormSubmitted = (details: {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  submissionId?: string;
}): void => {
  const subId = details.submissionId || generateEventId('contact');

  trackEvent(
    'generate_lead',
    {
      form_name: 'contact_form',
      method: 'online_form',
      lead_type: 'contact_enquiry',
      service: details.service || 'General',
      currency: 'GBP',
    },
    'Lead',
    {
      content_name: 'Contact Form Submission',
      content_category: details.service || 'General',
      lead_type: 'contact_enquiry',
    },
    {
      eventId: subId,
      oncePerSessionId: `contact_submit_${subId}`,
    }
  );

  // Also send GA4 recommended 'contact' event
  trackEvent(
    'contact',
    {
      method: 'contact_form',
      service: details.service || 'General',
    },
    undefined,
    {},
    {
      dedupKey: `contact_event_${subId}`,
    }
  );
};

/**
 * 2. Free Consultation Request Successfully Submitted
 * Fired strictly after the free discovery/consultation form is accepted.
 */
export const trackFreeConsultationRequest = (details: {
  service?: string;
  source?: string;
  submissionId?: string;
}): void => {
  const subId = details.submissionId || generateEventId('consultation');

  trackEvent(
    'generate_lead',
    {
      lead_type: 'free_consultation',
      form_name: 'consultation_request',
      service: details.service || 'General',
      source: details.source || 'Discovery Call',
      currency: 'GBP',
    },
    'Lead',
    {
      content_name: 'Free Consultation Request',
      content_category: details.service || 'Consultation',
      lead_type: 'free_consultation',
    },
    {
      eventId: subId,
      oncePerSessionId: `consultation_req_${subId}`,
    }
  );
};

/**
 * 3. Quote Request Successfully Submitted
 * Fired strictly after the Design Brief or project quote form submission succeeds.
 */
export const trackQuoteRequest = (details: {
  projectType?: string;
  budget?: string;
  submissionId?: string;
}): void => {
  const subId = details.submissionId || generateEventId('quote');

  trackEvent(
    'generate_lead',
    {
      lead_type: 'quote_request',
      form_name: 'design_brief_quote',
      project_type: details.projectType || 'Custom Project',
      budget: details.budget || 'Unspecified',
      currency: 'GBP',
    },
    'Lead',
    {
      content_name: 'Quote Request',
      content_category: details.projectType || 'Project Brief',
      lead_type: 'quote_request',
    },
    {
      eventId: subId,
      oncePerSessionId: `quote_submit_${subId}`,
    }
  );
};

/**
 * 4. Consultation Successfully Booked
 * Fired strictly when a booking slot is confirmed.
 */
export const trackBooking = (details: {
  date: string;
  time: string;
  service?: string;
  bookingId?: string;
}): void => {
  const bId = details.bookingId || generateEventId('booking');

  trackEvent(
    'schedule',
    {
      appointment_date: details.date,
      appointment_time: details.time,
      service: details.service || 'Consultation',
      currency: 'GBP',
    },
    'Schedule',
    {
      content_name: 'Consultation Appointment',
      content_category: details.service || 'Consultation',
      appointment_date: details.date,
      appointment_time: details.time,
    },
    {
      eventId: bId,
      oncePerSessionId: `booking_confirmed_${bId}`,
    }
  );

  // Also record as a qualified lead in GA4 & Meta
  trackEvent(
    'generate_lead',
    {
      lead_type: 'booked_consultation',
      service: details.service || 'Consultation',
    },
    'Lead',
    {
      content_name: 'Booked Consultation Lead',
      content_category: details.service || 'Consultation',
    },
    {
      eventId: `lead_${bId}`,
      dedupKey: `lead_booking_${bId}`,
    }
  );
};

/**
 * 5. WhatsApp Enquiry Initiated
 * Fired when a user clicks a WhatsApp chat link or floating button.
 */
export const trackWhatsApp = (location: string = 'Floating Button'): void => {
  trackEvent(
    'contact',
    {
      method: 'whatsapp',
      location: location,
      channel: 'WhatsApp',
    },
    'Contact',
    {
      content_name: 'WhatsApp Enquiry',
      content_category: 'Direct Messaging',
      channel: 'WhatsApp',
      location: location,
    },
    {
      dedupKey: `whatsapp_click_${location}`,
      cooldownMs: 2000,
    }
  );
};

/**
 * 6. Phone Enquiry Initiated
 * Fired when a user clicks on a tel: phone number link.
 */
export const trackPhone = (phoneNumber: string, location: string = 'Website'): void => {
  trackEvent(
    'contact',
    {
      method: 'phone',
      phone_number: phoneNumber,
      location: location,
      channel: 'Phone',
    },
    'Contact',
    {
      content_name: 'Phone Enquiry',
      content_category: 'Telephone Call',
      channel: 'Phone',
      location: location,
    },
    {
      dedupKey: `phone_click_${phoneNumber}_${location}`,
      cooldownMs: 2000,
    }
  );
};

/**
 * 7. Email Enquiry Initiated
 * Fired when a user clicks on a mailto: email link.
 */
export const trackEmail = (emailAddress: string, location: string = 'Website'): void => {
  trackEvent(
    'contact',
    {
      method: 'email',
      email_address: emailAddress,
      location: location,
      channel: 'Email',
    },
    'Contact',
    {
      content_name: 'Email Enquiry',
      content_category: 'Direct Email',
      channel: 'Email',
      location: location,
    },
    {
      dedupKey: `email_click_${emailAddress}_${location}`,
      cooldownMs: 2000,
    }
  );
};

/**
 * General Lead Helper for existing callers
 */
export const trackLead = (buttonText: string, location: string, extra: Record<string, any> = {}): void => {
  trackEvent(
    'generate_lead',
    {
      button_text: buttonText,
      location: location,
      currency: 'GBP',
      ...extra,
    },
    'Lead',
    {
      content_name: buttonText,
      content_category: location,
      ...extra,
    },
    {
      dedupKey: `lead_${buttonText}_${location}`,
      cooldownMs: 1500,
    }
  );
};

export const trackLeadGeneration = trackLead;

// ==============================================================================
// SECONDARY ENGAGEMENT (Business Outcomes 8 - 12)
// ==============================================================================

/**
 * 8. Service Page Viewed
 * Fired on route mount of service pages, deduplicated against React Strict Mode.
 */
export const trackServicePageView = (serviceName: string, servicePath: string): void => {
  trackEvent(
    'view_item',
    {
      item_category: 'Service',
      item_name: serviceName,
      item_id: servicePath,
    },
    'ViewContent',
    {
      content_type: 'service',
      content_name: serviceName,
      content_category: 'Services',
    },
    {
      dedupKey: `view_service_${servicePath}`,
      cooldownMs: 4000, // Suppresses Strict Mode and rapid re-renders
    }
  );
};

/**
 * 9. Pricing CTA Clicked
 * Fired when a user clicks on a package or pricing tier CTA button.
 */
export const trackPricingCta = (planName: string, location: string): void => {
  trackEvent(
    'select_content',
    {
      content_type: 'pricing_tier',
      item_id: planName,
      location: location,
    },
    'ViewContent',
    {
      content_name: `Pricing CTA: ${planName}`,
      content_category: 'Pricing',
      location: location,
    },
    {
      dedupKey: `pricing_cta_${planName}_${location}`,
      cooldownMs: 1500,
    }
  );
};

/**
 * 10. Portfolio / Project Viewed
 * Fired when a user views the portfolio directory or an individual project case study.
 */
export const trackPortfolioView = (projectName: string, projectId: string): void => {
  trackEvent(
    'view_item',
    {
      item_category: 'Portfolio',
      item_name: projectName,
      item_id: projectId,
    },
    'ViewContent',
    {
      content_type: 'portfolio_project',
      content_name: projectName,
      content_category: 'Case Study',
    },
    {
      dedupKey: `view_portfolio_${projectId}`,
      cooldownMs: 4000,
    }
  );
};

/**
 * 11. Blog CTA Clicked
 * Fired when a user interacts with a call to action within a blog post or blog section.
 */
export const trackBlogCta = (ctaText: string, articleTitle: string): void => {
  trackEvent(
    'select_content',
    {
      content_type: 'blog_cta',
      item_name: ctaText,
      item_id: articleTitle,
    },
    'ViewContent',
    {
      content_name: `Blog CTA: ${ctaText}`,
      content_category: 'Blog Article CTA',
      article_title: articleTitle,
    },
    {
      dedupKey: `blog_cta_${ctaText}_${articleTitle}`,
      cooldownMs: 1500,
    }
  );
};

/**
 * 12. Newsletter Signup
 * Fired strictly after the newsletter subscription successfully completes.
 */
export const trackNewsletterSignup = (location: string = 'Newsletter Form'): void => {
  const signupId = generateEventId('newsletter');

  trackEvent(
    'sign_up',
    {
      method: 'newsletter_form',
      location: location,
    },
    'Lead',
    {
      content_name: 'Newsletter Subscription',
      content_category: 'Newsletter',
      lead_type: 'newsletter_subscriber',
      location: location,
    },
    {
      eventId: signupId,
      oncePerSessionId: `newsletter_signup_${signupId}`,
    }
  );
};

/**
 * Virtual Page View across SPA transitions
 */
export const trackPageView = (pagePath: string, pageTitle?: string): void => {
  if (typeof window === 'undefined') return;
  const title = pageTitle || document.title || 'OptiScale Digital';
  const url = window.location.href;

  const dedupKey = `pageview_${pagePath}`;
  if (isThrottled(dedupKey, 1000)) return;

  // 1. Google Analytics 4 Virtual Pageview
  if (isAnalyticsGranted() && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: title,
      page_location: url,
      send_to: GA_MEASUREMENT_ID,
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
