import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Mail, Phone, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS } from '../constants';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';

export const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Design',
    message: '',
    gdpr: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send data to PHP backend
      const response = await fetch('./api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      // Success
      navigate('/thank-you');
    } catch (err) {
      console.error(err);
      // Fallback for demo purposes if backend isn't set up yet
      if (process.env.NODE_ENV === 'development') {
        alert("Dev Mode: Backend not found. Redirecting anyway.");
        navigate('/thank-you');
      } else {
        setError("Failed to send message. Please try again or email us directly.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <SEO 
        title="Contact Us | OptiScale Digital London"
        description="Get in touch with OptiScale Digital. Based in Covent Garden, London. Call us for a quote on web design or AI automation projects."
        keywords="Contact OptiScale, London Web Agency Contact, Hire Developers UK, Digital Agency Phone Number"
      />

      {/* SECTION 1: Hero */}
      <section className="relative py-24 lg:py-32 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.contact.heroBg} 
            alt="Contact Us Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/80 to-brand-light/10 dark:to-brand-dark/10"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight max-w-4xl mx-auto">
            Get in <span className="text-brand-cyan">Touch</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-[65ch] mx-auto leading-relaxed">
            Ready to start your project? Let's discuss how we can help your business grow.
          </p>
        </div>
      </section>

      <section className="py-20 bg-brand-light dark:bg-brand-dark transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm text-brand-blue dark:text-brand-cyan">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Our Office</h3>
                    <p className="text-gray-600 dark:text-gray-300">{COMPANY_ADDRESS}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm text-brand-blue dark:text-brand-cyan">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Email Us</h3>
                    <a href={`mailto:${COMPANY_EMAIL}`} className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-cyan">{COMPANY_EMAIL}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm text-brand-blue dark:text-brand-cyan">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Call Us</h3>
                    <a href={`tel:${COMPANY_PHONE.replace(/\s/g, '')}`} className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-cyan">{COMPANY_PHONE}</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg transition-colors duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue dark:focus:ring-brand-cyan focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue dark:focus:ring-brand-cyan focus:border-transparent outline-none transition-all"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Interested In</label>
                  <select 
                    id="service"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue dark:focus:ring-brand-cyan focus:border-transparent outline-none transition-all"
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                  >
                    <option>Web Design</option>
                    <option>AI Automation</option>
                    <option>Digital Marketing</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea 
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue dark:focus:ring-brand-cyan focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <div className="flex items-start gap-2">
                  <input 
                    type="checkbox" 
                    id="gdpr" 
                    required
                    className="mt-1 w-4 h-4 text-brand-blue rounded border-gray-300 focus:ring-brand-blue"
                    checked={formData.gdpr}
                    onChange={e => setFormData({...formData, gdpr: e.target.checked})}
                  />
                  <label htmlFor="gdpr" className="text-xs text-gray-500 dark:text-gray-400">
                    I agree to OptiScale Digital storing my data for the purpose of this enquiry. See our Privacy Policy for more details.
                  </label>
                </div>

                <Button type="submit" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={20}/> Sending...</span> : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};