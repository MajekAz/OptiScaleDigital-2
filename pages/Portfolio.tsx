import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { PORTFOLIO_ITEMS } from '../data/portfolio';
import { trackPortfolioView } from '../utils/analytics';

export const Portfolio: React.FC = () => {
  useEffect(() => {
    trackPortfolioView('Portfolio Directory', 'all_projects');
  }, []);
  return (
    <div className="w-full">
      <SEO 
        title="Our Portfolio | OptiScale Digital - Expert Web & AI Solutions"
        description="Explore the high-performance digital projects we've engineered for UK businesses. From consulting platforms to logistics systems."
      />

      {/* 1. Hero Section */}
      <section className="relative py-24 lg:py-40 bg-brand-secondary text-white overflow-hidden">
        <div className="absolute inset-0 z-0 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/20 via-transparent to-transparent opacity-50 text-white"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-secondary via-brand-secondary/90 to-brand-secondary"></div>
        </div>
        <div className="container relative z-10 text-center text-white">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-8 text-white">
            <Star size={14} className="inline mr-2 fill-brand-primary text-white" /> Performance-Driven UK Engineering
          </div>
          <h1 className="text-h1 mb-6 max-w-4xl mx-auto">
            Our Work Speaks <br /><span className="text-brand-primary">For Itself.</span>
          </h1>
          <p className="text-xl text-brand-textGrey mb-12 max-w-[65ch] mx-auto text-white">
            We don't just build sites; we engineer revenue-generating digital infrastructure. Explore our recent collaborations across Web Design, Strategy, and global logistics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button variant="primary" className="px-10 py-5 text-lg">Start Your Project</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="px-10 py-5 text-lg border-white/20 text-white hover:bg-white/10 hover:border-white">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Portfolio Grid */}
      <section className="py-section bg-brand-lightGrey">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PORTFOLIO_ITEMS.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Synergy Section (Brief mention) */}
      <section className="py-24 bg-white border-t border-brand-borderGrey">
        <div className="container text-center">
          <h2 className="text-h2 text-brand-secondary mb-8">Want to Join the Portfolio?</h2>
          <p className="text-lg text-brand-textGrey mb-12 max-w-[65ch] mx-auto">
            We are currently accepting new projects for Q3 and Q4. Let's discuss how we can build your next growth engine.
          </p>
          <div className="flex justify-center flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-2 text-brand-secondary font-bold">
              <span className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">1</span>
              <span>Discovery Session</span>
            </div>
            <div className="flex items-center gap-2 text-brand-secondary font-bold">
              <span className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">2</span>
              <span>Engineering Audit</span>
            </div>
            <div className="flex items-center gap-2 text-brand-secondary font-bold">
              <span className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">3</span>
              <span>Full-Scale Implementation</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="py-24 bg-brand-primary relative overflow-hidden">
        <div className="container relative z-10 text-center text-white">
          <h2 className="text-h2 text-white mb-8 max-w-2xl mx-auto">Ready to Scale Your Business?</h2>
          <p className="text-xl text-white/80 mb-12 max-w-[65ch] mx-auto text-white">
            Book your free digital growth audit today and let's discuss how we can transform your operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button variant="secondary" className="px-12 py-5 text-lg">Book Free Audit</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className="px-12 py-5 text-lg text-white hover:text-brand-navy">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const PortfolioCard: React.FC<{ item: any }> = ({ item }) => (
  <div className="group bg-brand-secondary rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2">
    {/* Image Container */}
    <div className="relative h-72 overflow-hidden">
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-transparent to-transparent opacity-60"></div>
    </div>

    {/* Content */}
    <div className="p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
        <p className="text-brand-accent font-semibold text-sm uppercase tracking-wider">{item.subtitle}</p>
        <div className="mt-2 text-white">
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brand-textGrey/60 text-sm hover:text-brand-primary transition-colors flex items-center gap-1 underline underline-offset-4 text-white"
          >
            {item.displayLink}
          </a>
        </div>
      </div>

      <p className="text-brand-textGrey text-sm mb-8 leading-relaxed line-clamp-3 text-white">
        {item.description}
      </p>

      <a 
        href={item.link} 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={() => trackPortfolioView(item.title, item.id)}
        className="block"
      >
        <Button variant="outline" className="w-full py-4 rounded-xl border-white/10 text-white hover:bg-white/5 gap-3 group/btn justify-center text-white">
          <ExternalLink size={18} className="group-hover/btn:text-brand-primary transition-colors text-white" />
          View Full Site
        </Button>
      </a>
    </div>
  </div>
);
