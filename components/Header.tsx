import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Moon, Sun } from 'lucide-react';
import { NAV_LINKS, COMPANY_NAME } from '../constants';
import { IMAGES } from '../assets';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Theme toggle logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <header 
      className="fixed w-full z-50 bg-brand-blue shadow-lg py-3 transition-all duration-300 dark:bg-brand-navy/95 dark:backdrop-blur-sm border-b dark:border-white/10"
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-white tracking-tight flex items-center gap-3"
          >
            <img 
              src={IMAGES.logo} 
              alt="OptiScale Logo" 
              className="h-10 w-auto rounded-lg object-contain bg-white"
            />
            {COMPANY_NAME}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <div key={link.path} className="relative group">
                {link.subLinks ? (
                  <div 
                    className="flex items-center gap-1 text-blue-100 hover:text-white cursor-pointer py-2 transition-colors"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link to={link.path}>{link.label}</Link>
                    <ChevronDown size={14} />
                    
                    {/* Dropdown */}
                    <div className={`absolute top-full left-0 w-48 pt-2 transition-all duration-200 ${dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-brand-light dark:hover:bg-slate-700 hover:text-brand-blue dark:hover:text-brand-cyan transition-colors border-b last:border-0 border-gray-50 dark:border-gray-700"
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
                      location.pathname === link.path ? 'text-white font-bold' : 'text-blue-100 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Theme Toggle Desktop */}
            <button
              onClick={toggleTheme}
              className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/booking">
              <button className="px-5 py-2 text-sm font-semibold bg-white text-brand-blue rounded-md hover:bg-gray-100 transition-colors shadow-sm dark:bg-brand-cyan dark:text-brand-navy dark:hover:bg-cyan-400">
                Book Consultation
              </button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden">
             {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-brand-navy z-40 transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '0', paddingTop: '64px' }}
      >
        <div className="flex flex-col p-6 gap-6 bg-brand-navy dark:bg-slate-900 h-full">
          {NAV_LINKS.map((link) => (
            <div key={link.path} className="flex flex-col">
              <Link 
                to={link.path} 
                className="text-xl font-semibold text-white border-b border-white/10 pb-2"
                onClick={() => !link.subLinks && setIsOpen(false)}
              >
                {link.label}
              </Link>
              {link.subLinks && (
                <div className="pl-4 mt-2 flex flex-col gap-3">
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className="text-gray-400 hover:text-brand-cyan"
                      onClick={() => setIsOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to="/booking" onClick={() => setIsOpen(false)} className="mt-4">
            <button className="w-full py-4 text-center font-bold bg-brand-blue text-white rounded-lg border border-white/20 dark:bg-brand-cyan dark:text-brand-navy">
              Book Consultation
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};