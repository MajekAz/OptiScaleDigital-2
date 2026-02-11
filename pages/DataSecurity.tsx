import React from 'react';
import { ShieldCheck, Lock, Server, FileCheck } from 'lucide-react';
import { COMPANY_NAME } from '../constants';
import { SEO } from '../components/SEO';

export const DataSecurity: React.FC = () => {
  return (
    <div className="w-full bg-brand-light min-h-screen py-12">
      <SEO 
        title="Data Security | OptiScale Digital"
        description="Learn about the industry-standard security measures OptiScale Digital employs to protect your data."
      />

      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-navy">Data Security</h1>
          </div>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            At {COMPANY_NAME}, we take the security of your data seriously. We employ industry-standard security measures to ensure your information is protected at all times.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <SecurityCard 
              icon={<Lock size={24} />}
              title="Encryption"
              description="All data transmitted between your browser and our servers is encrypted using TLS 1.2+ protocols. Data at rest is encrypted using AES-256 standards."
            />
            <SecurityCard 
              icon={<Server size={24} />}
              title="Secure Infrastructure"
              description="Our servers are hosted in secure, ISO 27001 certified data centers within the UK, ensuring physical and digital protection."
            />
            <SecurityCard 
              icon={<FileCheck size={24} />}
              title="Access Control"
              description="We enforce strict role-based access controls (RBAC). Only authorized personnel with a legitimate business need can access personal data."
            />
            <SecurityCard 
              icon={<ShieldCheck size={24} />}
              title="Regular Audits"
              description="We conduct regular security audits and penetration testing to identify and remediate potential vulnerabilities in our systems."
            />
          </div>

          <div className="prose prose-slate max-w-none text-gray-600 border-t border-gray-100 pt-8">
            <h2 className="text-xl font-bold text-brand-navy mb-4">Incident Response</h2>
            <p className="mb-4">
              We have a comprehensive incident response plan in place. In the unlikely event of a data breach, we will notify the Information Commissioner's Office (ICO) within 72 hours of becoming aware of the breach, where feasible, and will notify affected individuals without undue delay where there is a high risk to their rights and freedoms.
            </p>

            <h2 className="text-xl font-bold text-brand-navy mt-8 mb-4">Third-Party Security</h2>
            <p className="mb-4">
              We carefully vet all third-party service providers and processors to ensure they meet our high standards for data security and GDPR compliance. We have Data Processing Agreements (DPAs) in place with all vendors who handle personal data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecurityCard: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
    <div className="text-brand-blue mb-3">{icon}</div>
    <h3 className="text-lg font-bold text-brand-navy mb-2">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);