import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Info, CheckCircle, HelpCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { IMAGES } from '../assets';
import { COMPANY_EMAIL, COMPANY_PHONE } from '../constants';

export const ClientOnboarding: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <SEO 
        title="Client Onboarding Form | OptiScale Digital"
        description="Complete the OptiScale Digital client onboarding form to provide your business details, project requirements, goals, and technical information before your project begins."
      />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.about.heroBg} 
            alt="Onboarding Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/80 to-slate-50/10 dark:to-slate-900/10"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 rounded-full">
              Client Portal
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight max-w-4xl mx-auto">
              Client Onboarding <span className="text-brand-cyan">Form</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 max-w-[70ch] mx-auto leading-relaxed mb-6 font-medium">
              Welcome to OptiScale Digital. Please complete the onboarding form below so we can understand your business, project requirements, goals, and technical details before we begin.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm max-w-2xl mx-auto">
              <span className="text-brand-cyan">✨</span>
              <p className="text-xs lg:text-sm text-gray-300">
                This form helps us prepare your project properly, avoid delays, and deliver a more accurate service.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-[950px] mx-auto">
            
            {/* Instruction Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/60 p-6 md:p-8 rounded-2xl shadow-md mb-12"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-cyan/10 text-brand-blue dark:text-brand-cyan rounded-xl shrink-0 mt-0.5">
                  <Info size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-brand-navy dark:text-white mb-4">
                    Before you start:
                  </h2>
                  <ul className="space-y-3.5 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    <li className="flex items-start gap-3">
                      <span className="text-brand-blue dark:text-brand-cyan mt-1 select-none">•</span>
                      <span>Please provide accurate business and contact details.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-blue dark:text-brand-cyan mt-1 select-none">•</span>
                      <span>Include your website, social media, login/access notes, and project goals where required.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-blue dark:text-brand-cyan mt-1 select-none">•</span>
                      <span>If a question does not apply to your project, write <strong className="text-brand-navy dark:text-white font-semibold">“N/A”</strong>.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-blue dark:text-brand-cyan mt-1 select-none">•</span>
                      <span>After submission, our team will review your response and contact you with the next steps.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Embedded Form Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full overflow-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-2 sm:p-4 mb-12 flex flex-col items-center"
            >
              {/* Decorative Header Bar */}
              <div className="w-full py-3 px-4 bg-slate-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700/60 rounded-t-xl text-center mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                </div>
                <span className="text-xs text-gray-400 font-mono select-none">secure-onboarding-gateway.html</span>
                <span className="w-4"></span>
              </div>

              {/* Loader Placeholder */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center bg-slate-50 dark:bg-slate-800">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-500 font-medium font-sans">Loading Secure Onboarding Form...</span>
                </div>
              </div>

              {/* The Iframe */}
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSeIIZZOi1U2RDg8bzOOuseo26nchCXw-zEDPPDTcjKtmujBkg/viewform?embedded=true" 
                width="100%" 
                height="3200" 
                style={{
                  width: '100%',
                  maxWidth: '900px',
                  height: '3200px',
                  border: 'none',
                  borderRadius: '12px',
                  background: '#ffffff'
                }}
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
                title="OptiScale Digital Client Onboarding Form"
              >
                Loading…
              </iframe>
            </motion.div>

            {/* Help Section below the form */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-brand-navy border border-white/10 p-8 rounded-2xl shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-brand-cyan/5 w-64 h-64 select-none pointer-events-none">
                <HelpCircle size={256} className="transform translate-x-12 -translate-y-12" />
              </div>

              <div className="relative z-10 text-center md:text-left md:flex items-center justify-between gap-8 h-full">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
                    <span className="text-brand-cyan">💡</span> Need help completing the form?
                  </h3>
                  <p className="text-gray-300 text-sm max-w-lg leading-relaxed">
                    Our team is always on standby. If you have any questions or experience issues filling out the onboarding form, please reach out to us.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-4 shrink-0 justify-center">
                  <a 
                    href={`mailto:${COMPANY_EMAIL}`} 
                    className="flex items-center justify-center gap-2.5 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/15 transition-all text-sm shrink-0"
                  >
                    <Mail size={16} className="text-brand-cyan" />
                    <span>info@optiscaledigital.co.uk</span>
                  </a>
                  <a 
                    href={`tel:${COMPANY_PHONE.replace(/\s/g, '')}`} 
                    className="flex items-center justify-center gap-2.5 px-6 py-3 bg-brand-cyan text-brand-navy hover:bg-white hover:text-brand-navy font-bold rounded-xl transition-all text-sm shrink-0"
                  >
                    <Phone size={16} />
                    <span>+44 7440 323065</span>
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};
