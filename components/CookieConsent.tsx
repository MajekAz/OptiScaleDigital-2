import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure the component is fully mounted
    const timer = setTimeout(() => {
      try {
        const consent = localStorage.getItem('optiscale_cookie_consent');
        const reset = window.location.href.includes('reset_consent=true');
        
        if (reset) {
          localStorage.removeItem('optiscale_cookie_consent');
          setIsVisible(true);
        } else if (!consent) {
          setIsVisible(true);
        }
      } catch (e) {
        // Fallback for restricted storage
        setIsVisible(true);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('optiscale_cookie_consent', 'accepted');
    } catch (e) {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('optiscale_cookie_consent', 'declined');
    } catch (e) {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 md:bottom-8 md:right-8 md:left-auto md:max-w-md z-[9999] p-4 md:p-0 animate-fade-in-up">
      <div className="bg-[#0F172A] border border-white/10 rounded-[24px] shadow-2xl p-6 md:p-8 relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></svg>
            </div>
            <h3 className="text-white font-bold text-lg tracking-tight">
              Privacy & Cookies
            </h3>
          </div>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            We use cookies to engineer a better experience and analyze our growth. By clicking "Accept All", you consent to our high-performance data strategy. 
            Read our <Link to="/privacy-policy" className="text-blue-400 hover:text-white transition-colors font-semibold">Privacy Policy</Link>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="primary" 
              onClick={handleAccept}
              className="flex-1 py-3 text-sm font-bold shadow-lg shadow-blue-600/20"
            >
              Accept All
            </Button>
            <button 
              onClick={handleDecline}
              className="flex-1 px-6 py-3 text-sm font-semibold text-slate-400 hover:text-white transition-colors border border-white/10 rounded-xl hover:bg-white/5"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};