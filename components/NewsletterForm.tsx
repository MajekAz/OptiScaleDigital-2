
import React, { useState } from 'react';
import { Loader2, CheckCircle, Send } from 'lucide-react';
import { Button } from './Button';
import { CRM_ENDPOINT } from '../constants';

interface NewsletterFormProps {
  className?: string;
  title?: string;
  description?: string;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ 
  className = '', 
  title = "Join the OptiScale Inner Circle",
  description = "Get exclusive UK digital growth insights, AI automation strategies, and high-performance design tips delivered to your inbox."
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Using text/plain to avoid CORS preflight issues with no-cors mode
      await fetch(CRM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          name,
          email,
          formType: 'newsletter',
          source: 'Newsletter Opt-in Form',
          timestamp: new Date().toISOString()
        }),
      });

      // Since no-cors doesn't allow reading the response, we assume success
      setIsSuccess(true);
      setName('');
      setEmail('');
    } catch (err) {
      console.error('Newsletter submission error:', err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`bg-brand-navy p-10 rounded-[2.5rem] text-center border border-brand-primary/20 shadow-2xl animate-fade-in ${className}`}>
        <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-brand-accent" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">You're In!</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Welcome to the circle. We'll be in touch soon with high-performance insights.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-8 text-brand-cyan text-sm font-bold uppercase tracking-widest hover:text-white transition-colors"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-brand-navy p-10 lg:p-16 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{title}</h2>
        <p className="text-lg text-gray-400 mb-10 leading-relaxed">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto">
          <input type="hidden" name="formType" value="newsletter" />
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex-1 relative">
              <input 
                type="text" 
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              />
            </div>
            <div className="flex-1 relative">
              <input 
                type="email" 
                required
                placeholder="Work Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              />
            </div>
          </div>
          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-4 whitespace-nowrap group self-center"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Get Insights <Send size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </Button>
        </form>
        
        {error && <p className="text-rose-500 text-sm mt-4">{error}</p>}
        
        <p className="text-[10px] text-gray-500 mt-6 uppercase tracking-widest font-bold">
          No spam. Just engineering-grade growth strategies.
        </p>
      </div>
    </div>
  );
};
