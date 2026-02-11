import React from 'react';
import { COMPANY_NAME, COMPANY_EMAIL } from '../constants';
import { SEO } from '../components/SEO';

export const Terms: React.FC = () => {
  return (
    <div className="w-full bg-brand-light min-h-screen py-12">
      <SEO 
        title="Terms and Conditions | OptiScale Digital"
        description="Review the terms and conditions for using OptiScale Digital's website and services. Governed by UK law."
      />

      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">Terms and Conditions</h1>
          <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>

          <div className="prose prose-slate max-w-none text-gray-600">
            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and {COMPANY_NAME} ("we," "us," or "our"), concerning your access to and use of our website and services.
            </p>
            <p className="mb-4">
              By accessing the Site, you confirm that you have read, understood, and agreed to be bound by all of these Terms and Conditions. If you do not agree with all of these terms, then you are expressly prohibited from using the Site and must discontinue use immediately.
            </p>

            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">2. Intellectual Property Rights</h2>
            <p className="mb-4">
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>

            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">3. User Representations</h2>
            <p className="mb-4">
              By using the Site, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
              <li>You are not a minor in the jurisdiction in which you reside.</li>
              <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
              <li>You will not use the Site for any illegal or unauthorized purpose.</li>
            </ul>

            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">4. Limitations of Liability</h2>
            <p className="mb-4">
              In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
            </p>

            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">5. Governing Law</h2>
            <p className="mb-4">
              These terms shall be governed by and defined following the laws of the United Kingdom. {COMPANY_NAME} and yourself irrevocably consent that the courts of the United Kingdom shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>

            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">6. Contact Us</h2>
            <p className="mb-4">
              In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            </p>
            <p className="font-semibold text-brand-navy">
              Email: <a href={`mailto:${COMPANY_EMAIL}`} className="text-brand-blue hover:underline">{COMPANY_EMAIL}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};