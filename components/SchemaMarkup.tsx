import React from 'react';
import { SCHEMA_ORG_JSON } from '../constants';

export const SchemaMarkup: React.FC = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG_JSON) }}
    />
  );
};