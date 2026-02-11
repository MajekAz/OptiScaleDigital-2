import { NavLink } from './types';
import { IMAGES } from './assets';

export const COMPANY_NAME = "OptiScale Digital LTD";
export const COMPANY_ADDRESS = "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom";
export const COMPANY_EMAIL = "info@optiscaledigital.co.uk";
export const COMPANY_PHONE = "+44 20 7946 0000";

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { 
    label: 'Services', 
    path: '/services',
    subLinks: [
      { label: 'Web Design', path: '/services/web-design' },
      { label: 'AI Automation', path: '/services/ai-automation' },
      { label: 'Digital Marketing', path: '/services/digital-marketing' },
    ]
  },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export const SCHEMA_ORG_JSON = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": COMPANY_NAME,
  "image": IMAGES.logo,
  "description": "OptiScale Digital LTD is a UK-based agency specializing in Website Design, AI Automation, and Digital Marketing. We help businesses scale with tech-forward solutions.",
  "@id": "https://www.optiscaledigital.co.uk",
  "url": "https://www.optiscaledigital.co.uk",
  "telephone": COMPANY_PHONE,
  "email": COMPANY_EMAIL,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "71-75 Shelton Street",
    "addressLocality": "Covent Garden, London",
    "postalCode": "WC2H 9JQ",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.5148,
    "longitude": -0.1235
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
    "https://www.linkedin.com/company/optiscale-digital",
    "https://twitter.com/optiscale",
    "https://www.facebook.com/optiscale"
  ],
  "priceRange": "££",
  "areaServed": [
    {
      "@type": "City",
      "name": "London"
    },
    {
      "@type": "Country",
      "name": "United Kingdom"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": COMPANY_PHONE,
    "contactType": "customer service",
    "areaServed": "GB",
    "availableLanguage": "English"
  }
};