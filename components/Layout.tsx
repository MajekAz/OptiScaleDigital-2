import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SchemaMarkup } from './SchemaMarkup';
import { CookieConsent } from './CookieConsent';
import { WhatsAppButton } from './WhatsAppButton';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-light dark:bg-brand-dark font-sans text-brand-navy dark:text-gray-100 transition-colors duration-300">
      <SchemaMarkup />
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </div>
  );
};