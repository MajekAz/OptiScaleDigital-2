import React from 'react';
import { SCHEMA_ORG_JSON } from '../constants';

export const SchemaMarkup: React.FC = () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://optiscaledigital.co.uk';
  
  // Deep copy and replace hardcoded URLs
  const dynamicSchema = JSON.parse(
    JSON.stringify(SCHEMA_ORG_JSON).replace(/https:\/\/optiscaledigital\.co\.uk/g, baseUrl)
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dynamicSchema) }}
    />
  );
};
