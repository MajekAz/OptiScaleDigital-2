import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { trackBlogCta } from '../utils/analytics';

export const ThankYou: React.FC = () => {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-brand-light dark:bg-brand-dark transition-colors duration-300">
      <SEO 
        title="Thank You | OptiScale Digital"
        description="Thank you for contacting OptiScale Digital. We have received your enquiry and will be in touch shortly."
      />

      <div className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600 dark:text-green-400" size={40} />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy dark:text-white mb-4">
            Message Received!
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
            Thank you for contacting OptiScale Digital. We have received your enquiry and a member of our team will get back to you within 24 hours.
          </p>

          <div className="bg-brand-light dark:bg-slate-700/50 p-6 rounded-xl mb-8 text-left">
            <h3 className="font-semibold text-brand-navy dark:text-white mb-2">What happens next?</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="bg-brand-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">1</span>
                <span>We will review your project requirements.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-brand-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">2</span>
                <span>We'll schedule a brief discovery call to discuss your goals.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-brand-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">3</span>
                <span>We'll provide a tailored proposal and roadmap.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <Home size={18} /> Return Home
              </Button>
            </Link>
            <Link 
              to="/blog"
              onClick={() => trackBlogCta('Read Our Blog', 'Thank You Page')}
            >
              <Button className="flex items-center gap-2">
                Read Our Blog <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};