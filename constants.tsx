import { NavLink } from './types';
import { IMAGES } from './assets';

export const COMPANY_NAME = "OptiScale Digital LTD";
export const COMPANY_ADDRESS = "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom";
export const COMPANY_EMAIL = "info@optiscaledigital.co.uk";
export const COMPANY_PHONE = "+447440323065";
export const COMPANY_LINKEDIN = "https://www.linkedin.com/company/optiscale-digital/";
export const CRM_ENDPOINT = "https://script.google.com/macros/s/AKfycbx4TWt0eQ6myK6sC7cjU0e067qUSNFNT-a2HBQqgZ6oXT2zL2yCQgg4mGGGlP-xV-Hw/exec";

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { 
    label: 'Services', 
    path: '/services',
    subLinks: [
      { label: 'Web Design', path: '/services/web-design' },
      { label: 'Digital Marketing', path: '/services/digital-marketing' },
      { label: 'AI Automation', path: '/services/ai-automation' },
      { label: 'Creative Services', path: '/services/creative' },
    ]
  },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export const SCHEMA_ORG_JSON = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "OptiScale Digital",
  "url": "https://optiscaledigital.co.uk/",
  "logo": "https://optiscaledigital.co.uk/images/logo/company-logo.png",
  "image": "https://optiscaledigital.co.uk/images/logo/company-logo.png",
  "description": "UK's leading agency for modern web design, strategic digital marketing, and AI automation for startups and SMEs.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "71-75 Shelton Street, Covent Garden",
    "addressLocality": "London",
    "postalCode": "WC2H 9JQ",
    "addressCountry": "UK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.5148,
    "longitude": -0.1235
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Design"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Search Engine Optimisation (SEO)"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Automation"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Paid Advertising (PPC)"
        }
      }
    ]
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/optiscale-digital/",
    "https://twitter.com/optiscale",
    "https://www.facebook.com/optiscale"
  ],
  "priceRange": "££",
  "telephone": "+447440323065"
};