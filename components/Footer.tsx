import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE } from '../constants';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
import { IMAGES } from '../assets';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="text-2xl font-bold mb-4 flex items-center gap-3">
               <img 
                 src={IMAGES.logo}
                 alt="OptiScale Logo" 
                 className="h-10 w-auto rounded-lg bg-white"
               />
               {COMPANY_NAME}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Transforming UK businesses through intelligent design, AI automation, and data-driven marketing strategies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors" aria-label="Facebook"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-brand-cyan">Services</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/services/web-design" className="hover:text-white transition-colors">Website Design</Link></li>
              <li><Link to="/services/ai-automation" className="hover:text-white transition-colors">AI Automation</Link></li>
              <li><Link to="/services/digital-marketing" className="hover:text-white transition-colors">Digital Marketing</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">All Services</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-brand-cyan">Company</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Insights Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-brand-cyan">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>{COMPANY_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-white">{COMPANY_EMAIL}</a>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href={`tel:${COMPANY_PHONE.replace(/\s/g, '')}`} className="hover:text-white">{COMPANY_PHONE}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 mt-4 md:mt-0 justify-center md:justify-end">
            <Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link>
            <Link to="/cookie-policy" className="hover:text-gray-300">Cookie Policy</Link>
            <Link to="/terms" className="hover:text-gray-300">Terms of Service</Link>
            <Link to="/data-security" className="hover:text-gray-300">Data Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};