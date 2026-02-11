import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Search, Share2, Target, Mail, PenTool, BarChart, TrendingUp, Globe } from 'lucide-react';
import { SEO } from '../components/SEO';
import { IMAGES } from '../assets';

export const ServiceMarketing: React.FC = () => {
  return (
    <div className="w-full">
      <SEO 
        title="Digital Marketing Agency UK | SEO & PPC Experts"
        description="Grow your online presence with data-driven SEO, PPC, and content marketing strategies designed to dominate the UK market."
        keywords="Digital Marketing Agency UK, SEO Services London, PPC Advertising, Content Marketing UK, Social Media Growth"
      />

      {/* SECTION 1: Hero */}
      <section className="relative py-24 lg:py-32 bg-brand-navy overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.services.digitalMarketing} 
            alt="Digital Marketing Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/80 to-brand-light/5 dark:to-brand-dark/5"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Data-Driven <span className="text-purple-400">Digital Marketing</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Dominate UK search results and convert traffic into revenue. We combine creative storytelling with technical precision to grow your brand.
            </p>
            <Link to="/contact">
              <Button className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 shadow-purple-500/30">Get a Free Audit</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: Comprehensive Marketing Grid */}
      <section className="py-20 bg-white dark:bg-brand-dark transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy dark:text-white mb-4">360° Marketing Strategies</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We don't just "do marketing." We build comprehensive funnels that nurture leads from awareness to conversion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MarketingCard 
              icon={<Search className="text-purple-600" size={32} />}
              title="SEO Optimization"
              description="Technical on-page and off-page SEO to rank your business on Page 1 of Google for local and national keywords."
            />
            <MarketingCard 
              icon={<Target className="text-purple-600" size={32} />}
              title="PPC Advertising"
              description="High-ROI campaigns on Google Ads and Facebook Ads. We target your ideal customer with laser precision."
            />
            <MarketingCard 
              icon={<PenTool className="text-purple-600" size={32} />}
              title="Content Marketing"
              description="Blog posts, whitepapers, and case studies that establish your authority and drive organic traffic."
            />
            <MarketingCard 
              icon={<Mail className="text-purple-600" size={32} />}
              title="Email Marketing"
              description="Automated email flows (Newsletters, Abandoned Cart, Welcome Series) that nurture leads into loyal customers."
            />
            <MarketingCard 
              icon={<Share2 className="text-purple-600" size={32} />}
              title="Social Media Growth"
              description="Strategic management of your LinkedIn, Instagram, and Twitter profiles to build community and engagement."
            />
            <MarketingCard 
              icon={<BarChart className="text-purple-600" size={32} />}
              title="Analytics & Reporting"
              description="Transparent monthly reports. We track every click and conversion so you know exactly where your money goes."
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: The Growth Framework */}
      <section className="py-20 bg-brand-light dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-4">The OptiScale Growth Engine</h2>
            <p className="text-gray-600 dark:text-gray-300">Our four-step framework for sustainable digital growth.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <StepCard number="01" title="Audit" text="We analyze your current presence and identify gaps." />
            <StepCard number="02" title="Strategy" text="We build a custom roadmap tailored to your KPIs." />
            <StepCard number="03" title="Execute" text="We launch campaigns across selected channels." />
            <StepCard number="04" title="Optimize" text="We A/B test and refine to maximize ROI." />
          </div>
        </div>
      </section>

      {/* SECTION 4: Why It Works */}
      <section className="py-20 bg-white dark:bg-brand-dark transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="relative">
               <div className="absolute -inset-4 bg-purple-100 dark:bg-purple-900/30 rounded-full blur-3xl opacity-50"></div>
               <Globe className="text-purple-600 dark:text-purple-400 w-full h-64 relative z-10 opacity-80" strokeWidth={0.5} />
             </div>
             <div>
               <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-6">Marketing That Pays for Itself</h2>
               <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                 Many agencies focus on "vanity metrics" like likes and impressions. At OptiScale, we focus on revenue. If our marketing doesn't grow your bottom line, we haven't done our job.
               </p>
               <div className="grid grid-cols-2 gap-6">
                 <div className="border-l-4 border-purple-500 pl-4">
                   <div className="text-2xl font-bold text-brand-navy dark:text-white">300%</div>
                   <div className="text-sm text-gray-500 dark:text-gray-400">Avg. Traffic Increase</div>
                 </div>
                 <div className="border-l-4 border-purple-500 pl-4">
                   <div className="text-2xl font-bold text-brand-navy dark:text-white">50+</div>
                   <div className="text-sm text-gray-500 dark:text-gray-400">Industries Served</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section className="py-24 bg-brand-navy text-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <TrendingUp className="text-purple-400 mx-auto mb-6" size={64} />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Scale Your Revenue?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Stop guessing and start growing. Claim your free 30-minute strategy session and website audit.
            </p>
            <Link to="/contact">
              <Button className="bg-white text-brand-navy hover:bg-gray-100 font-bold px-8 py-4 text-lg">
                Boost Your Traffic
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const MarketingCard: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="p-8 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition-all bg-white dark:bg-slate-800 group">
    <div className="mb-4 bg-purple-50 dark:bg-purple-900/20 w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-brand-navy dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{description}</p>
  </div>
);

const StepCard: React.FC<{number: string, title: string, text: string}> = ({ number, title, text }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border-t-4 border-purple-500 text-center">
    <div className="text-4xl font-bold text-gray-200 dark:text-gray-700 mb-2">{number}</div>
    <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{text}</p>
  </div>
);