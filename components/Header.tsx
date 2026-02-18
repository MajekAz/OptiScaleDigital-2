import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Ensure dark mode is removed if previously set by user
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b ${
        isOpen 
          ? 'bg-brand-navy border-transparent' 
          : 'bg-white/95 backdrop-blur-md shadow-sm border-gray-100'
      } py-3`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <nav className="flex items-center justify-between h-12 md:h-14">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group relative z-[110]"
            onClick={() => setIsOpen(false)}
          >
            <Logo 
              light={isOpen} 
              className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <div key={link.path} className="relative group">
                {link.subLinks ? (
                  <div 
                    className="flex items-center gap-1 text-gray-600 hover:text-brand-blue cursor-pointer py-2 transition-colors font-medium"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link to={link.path}>{link.label}</Link>
                    <ChevronDown size={14} />
                    
                    {/* Dropdown */}
                    <div className={`absolute top-full left-0 w-48 pt-2 transition-all duration-200 ${dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                      <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-brand-light hover:text-brand-blue transition-colors border-b last:border-0 border-gray-50"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link 
                    to={link.path} 
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === link.path ? 'text-brand-blue font-bold underline underline-offset-8 decoration-2' : 'text-gray-600 hover:text-brand-blue'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            
            <Link to="/booking">
              <button className="px-5 py-2 text-sm font-semibold bg-brand-blue text-white rounded-md hover:bg-blue-600 transition-colors shadow-lg shadow-brand-blue/20">
                Book Consultation
              </button>
            </Link>
          </div>

          {/* Mobile Actions Button Group */}
          <div className="flex items-center gap-1 md:hidden relative z-[110]">
            <button 
              className={`p-3 focus:outline-none rounded-full transition-colors ${
                isOpen 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Full-Width Centered Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-brand-navy z-[90] transition-all duration-500 ease-in-out md:hidden flex flex-col items-center justify-center ${
          isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="w-full max-w-lg px-10 py-20 flex flex-col h-full items-center text-center overflow-y-auto">
          <div className="flex flex-col space-y-2 w-full mt-10">
            {NAV_LINKS.map((link, idx) => (
              <div 
                key={link.path} 
                className={`flex flex-col transition-all duration-500 ease-out ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 75}ms` }}
              >
                <Link 
                  to={link.path} 
                  className={`text-4xl md:text-5xl font-black py-4 transition-all hover:scale-105 active:scale-95 ${
                    location.pathname === link.path ? 'text-brand-cyan' : 'text-white'
                  }`}
                  onClick={() => !link.subLinks && setIsOpen(false)}
                >
                  {link.label}
                </Link>
                {link.subLinks && (
                  <div className="flex flex-col space-y-3 pb-4">
                    {link.subLinks.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`text-xl md:text-2xl font-semibold py-1 transition-colors ${
                          location.pathname === sub.path ? 'text-brand-cyan' : 'text-white/60 hover:text-white'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div 
            className={`mt-12 w-full transition-all duration-700 ease-out delay-300 ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Link to="/booking" onClick={() => setIsOpen(false)}>
              <button className="w-full py-6 text-2xl font-black bg-brand-cyan text-brand-navy rounded-2xl shadow-2xl shadow-brand-cyan/20 hover:bg-white active:scale-95 transition-all uppercase tracking-widest">
                Get Started
              </button>
            </Link>
            
            <div className="mt-12 flex justify-center gap-8">
              <a href="#" className="text-white/40 hover:text-brand-cyan transition-colors font-bold uppercase tracking-widest text-sm">LinkedIn</a>
              <a href="#" className="text-white/40 hover:text-brand-cyan transition-colors font-bold uppercase tracking-widest text-sm">Twitter</a>
              <a href="#" className="text-white/40 hover:text-brand-cyan transition-colors font-bold uppercase tracking-widest text-sm">Instagram</a>
            </div>
            
            <p className="mt-8 text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} OptiScale Digital LTD • London, UK
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};