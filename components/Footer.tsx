
import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE, COMPANY_LINKEDIN } from '../constants';
import { Linkedin, Twitter, Facebook, ExternalLink, Lock } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="mb-6 flex items-center">
               <Logo light={true} className="h-12 md:h-14 w-auto" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Transforming UK businesses through intelligent design, AI automation, and data-driven marketing strategies.
            </p>
            <div className="flex gap-4">
              <a 
                href={COMPANY_LINKEDIN} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-brand-cyan transition-colors" 
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors" aria-label="Facebook"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-brand-cyan">Services</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/services/web-design" className="hover:text-white transition-colors">Website Design</Link></li>
              <li><Link to="/services/digital-marketing" className="hover:text-white transition-colors">Digital Marketing</Link></li>
              <li><Link to="/services/ai-automation" className="hover:text-white transition-colors">AI Automation</Link></li>
              <li><Link to="/services/creative" className="hover:text-white transition-colors">Creative Services</Link></li>
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
              <li>
                <a 
                  href="https://lookerstudio.google.com/reporting/50782672-741f-4283-a62f-923200aa6b44"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  Client Portal <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100">
                  <Lock size={12} /> Admin Dashboard
                </Link>
              </li>
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
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
            <p className="mt-1">Registration No. Registered in England & Wales: 16937899</p>
          </div>
          <div className="flex flex-wrap gap-6 justify-center md:justify-end">
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
