import React from 'react';
import { COMPANY_EMAIL } from '../constants';
import { SEO } from '../components/SEO';

export const CookiePolicy: React.FC = () => {
  return (
    <div className="w-full bg-brand-light min-h-screen py-12">
      <SEO 
        title="Cookie Policy | OptiScale Digital"
        description="Learn how OptiScale Digital uses cookies to improve your website experience and manage your preferences."
      />

      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">Cookie Policy</h1>
          <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>

          <div className="prose prose-slate max-w-none text-gray-600">
            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">1. What Are Cookies?</h2>
            <p className="mb-4">
              Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
            </p>

            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">
              We use cookies to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Make our website work as you'd expect.</li>
              <li>Improve the speed/security of the site.</li>
              <li>Continuously improve our website for you.</li>
              <li>Make our marketing more efficient (ultimately helping us offer the service we do at the price we do).</li>
            </ul>

            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">3. Types of Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm whitespace-nowrap mb-6 border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="p-4 font-bold text-brand-navy">Type</th>
                    <th className="p-4 font-bold text-brand-navy">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-semibold">Strictly Necessary</td>
                    <td className="p-4">Essential for the website to function correctly. These cannot be disabled.</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-semibold">Performance/Analytics</td>
                    <td className="p-4">Help us understand how visitors interact with our website by collecting anonymous information.</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-semibold">Functionality</td>
                    <td className="p-4">Allow the website to remember choices you make (such as your user name, language or the region you are in).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">4. Managing Cookies</h2>
            <p className="mb-4">
              You can change your cookie preferences at any time by changing your browser settings. You can block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our site.
            </p>

            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">5. More Information</h2>
            <p className="mb-4">
              Hopefully that has clarified things for you. If there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
            </p>
            <p>
              For more information about cookies, please contact us at <a href={`mailto:${COMPANY_EMAIL}`} className="text-brand-blue hover:underline">{COMPANY_EMAIL}</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};