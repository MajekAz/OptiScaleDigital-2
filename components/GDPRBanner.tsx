import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const GDPRBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check consent status
    try {
      const consent = localStorage.getItem('optiscale_gdpr_consent');
      const forceReset = window.location.href.includes('reset_gdpr=true');
      
      if (forceReset || !consent) {
        setShow(true);
      }
    } catch (e) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('optiscale_gdpr_consent', 'accepted');
    } catch (e) {}
    setShow(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('optiscale_gdpr_consent', 'declined');
    } catch (e) {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div 
      id="gdpr-banner-root"
      className="fixed top-0 left-0 right-0 z-[999999] bg-blue-600 text-white p-4 shadow-2xl flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left"
    >
      <div className="flex-1 max-w-5xl">
        <p className="text-sm md:text-base font-medium">
          <span className="mr-2">🍪</span> We use cookies to improve your experience. By continuing, you agree to our 
          <Link to="/privacy-policy" className="underline ml-1 font-bold hover:text-blue-100">Privacy Policy</Link>.
        </p>
      </div>
      <div className="flex gap-3 shrink-0">
        <button 
          onClick={handleDecline}
          className="px-6 py-2 text-sm font-bold border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
        >
          Decline
        </button>
        <button 
          onClick={handleAccept}
          className="px-8 py-2 text-sm font-bold bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
        >
          Accept All
        </button>
      </div>
    </div>
  );
};
