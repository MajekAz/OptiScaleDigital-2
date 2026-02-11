import React from 'react';
import { COMPANY_NAME, COMPANY_EMAIL, COMPANY_ADDRESS } from '../constants';
import { SEO } from '../components/SEO';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="w-full bg-brand-light min-h-screen py-12">
      <SEO 
        title="Privacy Policy | OptiScale Digital"
        description="Read our Privacy Policy to understand how OptiScale Digital collects, uses, and protects your personal data in compliance with UK GDPR."
      />
      
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>

          <div className="prose prose-slate max-w-none text-gray-600">
            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">
              {COMPANY_NAME} ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>
            <p className="mb-4">
              This policy is compliant with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>

            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">2. The Data We Collect</h2>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform on the devices you use to access this website.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
            </ul>

            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">3. How We Use Your Personal Data</h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>

            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">4. Your Legal Rights (GDPR)</h2>
            <p className="mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data ("the right to be forgotten").</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>
            <p className="mb-4">
              If you wish to exercise any of the rights set out above, please contact us at <a href={`mailto:${COMPANY_EMAIL}`} className="text-brand-blue hover:underline">{COMPANY_EMAIL}</a>.
            </p>

            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">5. Data Security</h2>
            <p className="mb-4">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
            <p className="mb-4">
              Please refer to our <a href="/data-security" className="text-brand-blue hover:underline">Data Security Policy</a> for more detailed information.
            </p>

            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">6. Contact Details</h2>
            <p className="mb-4">
              Our full details are:
            </p>
            <address className="not-italic mb-4 bg-gray-50 p-4 rounded-lg border-l-4 border-brand-blue">
              <strong>Full name of legal entity:</strong> {COMPANY_NAME}<br />
              <strong>Email address:</strong> {COMPANY_EMAIL}<br />
              <strong>Postal address:</strong> {COMPANY_ADDRESS}
            </address>
            <p>
              You have the right to make a complaint at any time to the Information Commissioner's Office (ICO), the UK supervisory authority for data protection issues (www.ico.org.uk). We would, however, appreciate the chance to deal with your concerns before you approach the ICO so please contact us in the first instance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};