import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
  const location = useLocation();
  const baseUrl = "https://optiscaledigital.co.uk"; 
  // Ensure no trailing slash for consistency
  const canonicalUrl = `${baseUrl}${location.pathname === '/' ? '' : location.pathname.replace(/\/$/, '')}`;

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 2b. Update Meta Title (for consistency with prompt)
    let metaTitle = document.querySelector('meta[name="title"]');
    if (!metaTitle) {
      metaTitle = document.createElement('meta');
      metaTitle.setAttribute('name', 'title');
      document.head.appendChild(metaTitle);
    }
    metaTitle.setAttribute('content', title);

    // 3. Update Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // 4. Update Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 5. Update Open Graph Tags (Facebook/LinkedIn)
    const updateMeta = (property: string, content: string) => {
       let el = document.querySelector(`meta[property="${property}"]`);
       if (!el) {
         el = document.createElement('meta');
         el.setAttribute('property', property);
         document.head.appendChild(el);
       }
       el.setAttribute('content', content);
    };

    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:url', canonicalUrl);
    updateMeta('og:image', "https://optiscaledigital.co.uk/images/logo/company-logo.png");
    updateMeta('og:image:secure_url', "https://optiscaledigital.co.uk/images/logo/company-logo.png");
    updateMeta('og:image:type', "image/png");
    updateMeta('og:image:width', "1200");
    updateMeta('og:image:height', "630");
    updateMeta('og:type', 'website');
    updateMeta('og:locale', 'en_GB');

    // 6. Update Twitter Tags
    const updateTwitter = (name: string, content: string) => {
       let el = document.querySelector(`meta[name="${name}"]`);
       if (!el) {
         el = document.createElement('meta');
         el.setAttribute('name', name);
         document.head.appendChild(el);
       }
       el.setAttribute('content', content);
    };

    updateTwitter('twitter:card', 'summary_large_image');
    updateTwitter('twitter:title', title);
    updateTwitter('twitter:description', description);
    updateTwitter('twitter:image', "https://optiscaledigital.co.uk/images/logo/company-logo.png");

  }, [title, description, keywords, canonicalUrl]);

  return null;
};