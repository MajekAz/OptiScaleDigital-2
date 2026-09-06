import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck, Sliders, X, Check, ExternalLink } from 'lucide-react';
import {
  getStoredConsent,
  hasUserConsented,
  acceptAllCookies,
  rejectNonEssentialCookies,
  saveConsentPreferences,
  applyConsentRules,
  EVENT_OPEN_PREFERENCES,
  EVENT_CONSENT_CHANGED,
  CookieConsentPreferences,
} from '../utils/consentManager';

export const GDPRBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [hasDecided, setHasDecided] = useState(false);

  // Preference toggles
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    try {
      const isReset = 
        window.location.href.includes('reset_gdpr=true') || 
        window.location.href.includes('reset_cookies=true');
      
      const stored = getStoredConsent();

      if (isReset || !stored) {
        setShowBanner(true);
        setHasDecided(false);
        setAnalyticsEnabled(false);
        setMarketingEnabled(false);
      } else {
        setShowBanner(false);
        setHasDecided(true);
        setAnalyticsEnabled(stored.analytics);
        setMarketingEnabled(stored.marketing);
        // Ensure consent rules are actively enforced
        applyConsentRules(stored);
      }
    } catch (e) {
      setShowBanner(true);
    }

    // Listen for custom event to open preferences from Footer or Cookie Policy
    const handleOpenPref = () => {
      const current = getStoredConsent();
      if (current) {
        setAnalyticsEnabled(current.analytics);
        setMarketingEnabled(current.marketing);
      }
      setShowPreferences(true);
    };

    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent<CookieConsentPreferences>;
      if (customEvent.detail) {
        setAnalyticsEnabled(customEvent.detail.analytics);
        setMarketingEnabled(customEvent.detail.marketing);
        setHasDecided(true);
      }
    };

    window.addEventListener(EVENT_OPEN_PREFERENCES, handleOpenPref);
    window.addEventListener(EVENT_CONSENT_CHANGED, handleConsentChange);

    return () => {
      window.removeEventListener(EVENT_OPEN_PREFERENCES, handleOpenPref);
      window.removeEventListener(EVENT_CONSENT_CHANGED, handleConsentChange);
    };
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setAnalyticsEnabled(true);
    setMarketingEnabled(true);
    setShowBanner(false);
    setShowPreferences(false);
    setHasDecided(true);
  };

  const handleRejectNonEssential = () => {
    rejectNonEssentialCookies();
    setAnalyticsEnabled(false);
    setMarketingEnabled(false);
    setShowBanner(false);
    setShowPreferences(false);
    setHasDecided(true);
  };

  const handleSavePreferences = () => {
    saveConsentPreferences({
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
    });
    setShowBanner(false);
    setShowPreferences(false);
    setHasDecided(true);
  };

  return (
    <>
      {/* 1. Main Bottom Cookie Consent Banner */}
      {showBanner && !showPreferences && (
        <aside 
          id="optiscale-cookie-banner"
          aria-label="Cookie consent management"
          role="region"
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-[999999] bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl shadow-2xl p-5 md:p-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-brand-blue/20 rounded-xl text-brand-cyan shrink-0 mt-0.5">
              <Cookie className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  Cookie & Privacy Choices
                </h3>
                <span className="text-[11px] font-semibold text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-full border border-brand-cyan/20">
                  UK GDPR & PECR
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
                We use cookies to secure essential features, understand audience trends with Google Analytics, and tailor marketing on Meta. You can accept all, reject non-essential cookies, or customise your settings anytime.
              </p>
              
              <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1 mb-5">
                <span>Learn more:</span>
                <Link 
                  to="/cookie-policy" 
                  className="text-brand-cyan underline hover:text-cyan-300 transition-colors inline-flex items-center gap-0.5"
                >
                  Cookie Policy <ExternalLink className="w-3 h-3" />
                </Link>
                <span>•</span>
                <Link 
                  to="/privacy-policy" 
                  className="text-brand-cyan underline hover:text-cyan-300 transition-colors inline-flex items-center gap-0.5"
                >
                  Privacy Policy <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  id="cookie-btn-accept-all"
                  onClick={handleAcceptAll}
                  className="px-5 py-2.5 text-xs md:text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white hover:opacity-95 shadow-md shadow-brand-blue/20 transition-all cursor-pointer text-center"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  id="cookie-btn-reject-non-essential"
                  onClick={handleRejectNonEssential}
                  className="px-4 py-2.5 text-xs md:text-sm font-medium rounded-xl border border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700/80 transition-colors cursor-pointer text-center"
                >
                  Reject Non-Essential
                </button>
                <button
                  type="button"
                  id="cookie-btn-manage-preferences"
                  onClick={() => setShowPreferences(true)}
                  className="px-3 py-2.5 text-xs md:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  Preferences
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* 2. Preferences Modal (Manage Preferences) */}
      {showPreferences && (
        <div 
          id="optiscale-cookie-preferences-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          className="fixed inset-0 z-[1000000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div 
            className="bg-slate-900 text-white border border-slate-700/80 rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 md:p-6 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-brand-blue/20 text-brand-cyan rounded-2xl">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h2 id="cookie-preferences-title" className="text-lg md:text-xl font-bold text-white">
                    Manage Cookie Preferences
                  </h2>
                  <p className="text-xs text-slate-400">
                    OptiScale Digital LTD • UK GDPR Compliant
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                aria-label="Close preferences"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Categories */}
            <div className="p-5 md:p-6 overflow-y-auto space-y-4 flex-1 text-sm text-slate-300">
              <p className="text-xs text-slate-400">
                You have full control over non-essential cookies. Essential cookies are required to operate this site safely. Review each category below:
              </p>

              {/* Category 1: Necessary */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">1. Strictly Necessary</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    Always Active
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  Essential for basic navigation, security, fraud prevention, and storing your consent preferences. These cookies do not store any personally identifiable information.
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Cookies: optiscale_consent_preferences, optiscale_theme, session identifiers
                </p>
              </div>

              {/* Category 2: Analytics */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <span className="font-semibold text-white">2. Analytics & Performance</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="cookie-toggle-analytics"
                      role="switch"
                      aria-checked={analyticsEnabled}
                      checked={analyticsEnabled}
                      onChange={e => setAnalyticsEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-cyan rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                  </label>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  Allows OptiScale Digital to measure visitor traffic, popular pages, and referral sources using Google Analytics 4 with Google Consent Mode v2. All insights are aggregated anonymously to optimize our agency services.
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Provider: Google LLC (_ga, _ga_*, G-V4SM3069P2)
                </p>
              </div>

              {/* Category 3: Marketing */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <span className="font-semibold text-white">3. Marketing & Advertising</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="cookie-toggle-marketing"
                      role="switch"
                      aria-checked={marketingEnabled}
                      checked={marketingEnabled}
                      onChange={e => setMarketingEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-cyan rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                  </label>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  Allows measurement of digital marketing campaigns and provides relevant advertising on Meta/Facebook. Marketing scripts are completely blocked until this consent is granted.
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Provider: Meta Platforms, Inc. (_fbp, fr, Pixel 1627665848697345)
                </p>
              </div>

              {/* Policy References */}
              <div className="pt-2 text-xs text-slate-400 flex items-center justify-between">
                <span>Questions regarding data protection?</span>
                <div className="flex gap-3">
                  <Link to="/cookie-policy" className="text-brand-cyan hover:underline">
                    Cookie Policy
                  </Link>
                  <Link to="/privacy-policy" className="text-brand-cyan hover:underline">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 md:p-5 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer text-center"
              >
                Reject All Non-Essential
              </button>
              
              <div className="w-full sm:w-auto flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-medium rounded-xl border border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan/20 transition-colors cursor-pointer text-center"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  id="cookie-btn-save-preferences"
                  onClick={handleSavePreferences}
                  className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold rounded-xl bg-brand-blue hover:bg-brand-cyan text-white shadow-md shadow-brand-blue/20 transition-colors cursor-pointer flex items-center justify-center gap-1.5 text-center"
                >
                  <Check className="w-3.5 h-3.5" />
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Floating Reopen Trigger (Available anytime after consent is decided) */}
      {hasDecided && !showBanner && !showPreferences && (
        <button
          type="button"
          id="cookie-floating-trigger"
          onClick={() => setShowPreferences(true)}
          aria-label="Open Cookie Preferences"
          title="Cookie & Privacy Preferences"
          className="fixed bottom-5 left-5 z-40 bg-slate-900 text-brand-cyan border border-slate-700/80 hover:border-brand-cyan/50 hover:bg-slate-800 p-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group flex items-center gap-2 text-xs font-medium cursor-pointer"
        >
          <Cookie className="w-4 h-4 text-brand-cyan group-hover:rotate-12 transition-transform duration-300" />
          <span className="hidden md:inline text-slate-300 group-hover:text-white pr-1">
            Cookies
          </span>
        </button>
      )}
    </>
  );
};
