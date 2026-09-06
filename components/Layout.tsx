
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SchemaMarkup } from './SchemaMarkup';
import { GDPRBanner } from './GDPRBanner';
import { WhatsAppButton } from './WhatsAppButton';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname, search } = useLocation();

  // Scroll to top and record virtual pageview if consented
  React.useEffect(() => {
    window.scrollTo(0, 0);

    // Give SEO component time to apply document.title
    const timer = setTimeout(() => {
      const fullPath = pathname + (search || '');
      trackPageView(fullPath, document.title || 'OptiScale Digital');
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, search]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-light dark:bg-brand-dark font-sans text-brand-navy dark:text-gray-100 transition-colors duration-300">
      <SchemaMarkup />
      <Header />
      {/* 
        On very large screens, the main container will be boxed (1200px) 
        and centered. We keep the layout wrapper full-width to allow 
        full-width backgrounds, but page content will respect the 1200px limit.
      */}
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <GDPRBanner />
    </div>
  );
};
