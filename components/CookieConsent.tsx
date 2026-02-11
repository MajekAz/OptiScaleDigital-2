import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('optiscale_cookie_consent');
    if (!consent) {
      // Small delay to make the entrance smoother
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('optiscale_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('optiscale_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-brand-navy/95 backdrop-blur-md border-t border-white/10 shadow-2xl animate-fade-in-up">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2">
            🍪 We value your privacy
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
            For more information, please visit our <Link to="/privacy-policy" className="text-brand-cyan hover:text-white transition-colors underline decoration-brand-cyan/30 underline-offset-4">Privacy Policy</Link> and <Link to="/cookie-policy" className="text-brand-cyan hover:text-white transition-colors underline decoration-brand-cyan/30 underline-offset-4">Cookie Policy</Link>.
          </p>
        </div>
        <div className="flex gap-4 shrink-0 w-full md:w-auto">
          <button 
            onClick={handleDecline}
            className="flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold text-gray-300 hover:text-white transition-colors border border-gray-600 rounded-lg hover:border-gray-400 hover:bg-white/5"
          >
            Decline
          </button>
          <Button 
            variant="primary" 
            onClick={handleAccept}
            className="flex-1 md:flex-none px-8 py-2.5 text-sm font-bold shadow-lg shadow-brand-blue/20"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
};