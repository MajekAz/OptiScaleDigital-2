import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Bot, TrendingUp, ShieldCheck, Zap, Users, Star, Quote, FileText, Mail } from 'lucide-react';
import { Button } from '../components/Button';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  return (
    <div className="w-full">
      <SEO 
        title="OptiScale Digital | UK Web Design & AI Automation Agency"
        description="Premier UK agency for Website Design, AI Automation, and Digital Marketing. Transforming British businesses with tech-forward solutions. Based in London."
        keywords="Web Design London, AI Automation UK, Digital Marketing Agency, SEO Experts UK, Business Automation, OptiScale Digital"
      />

      {/* SECTION 1: Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-brand-navy text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img 
                src={IMAGES.home.heroBg} 
                alt="Digital Background" 
                className="w-full h-full object-cover opacity-40"
            />
            {/* Gradient Overlay for text contrast and seamless transition */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/95 via-brand-navy/80 to-brand-light dark:to-brand-dark transition-colors duration-300"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-12">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
              Future-Proof Your Business with <span className="gradient-text">AI & Design</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              OptiScale Digital is a premier UK agency specializing in bespoke Website Design, AI Automation, and result-driven Digital Marketing. We build digital ecosystems that scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="primary" className="px-10 py-4 text-lg flex items-center justify-center gap-2 shadow-blue-500/50">
                  Start Your Project <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-8 animate-fade-in-up">
            <HeroNavCard 
              to="/about" 
              icon={<Users size={24} />} 
              title="About Us" 
              desc="Meet the team & mission" 
            />
            <HeroNavCard 
              to="/services" 
              icon={<Code size={24} />} 
              title="Our Services" 
              desc="Web, AI, & Marketing" 
            />
            <HeroNavCard 
              to="/blog" 
              icon={<FileText size={24} />} 
              title="Insights Blog" 
              desc="Latest tech trends" 
            />
            <HeroNavCard 
              to="/contact" 
              icon={<Mail size={24} />} 
              title="Contact Us" 
              desc="Get a free quote today" 
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: Trusted By (Social Proof) */}
      <section className="py-10 bg-brand-light dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
           <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Trusted by innovative UK companies</p>
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-xl font-black text-gray-500 dark:text-gray-400">NexTech</span>
              <span className="text-xl font-black text-gray-500 dark:text-gray-400">LondonFin</span>
              <span className="text-xl font-black text-gray-500 dark:text-gray-400">GrowthAI</span>
              <span className="text-xl font-black text-gray-500 dark:text-gray-400">UrbanDesign</span>
              <span className="text-xl font-black text-gray-500 dark:text-gray-400">EcoSystems</span>
           </div>
        </div>
      </section>

      {/* SECTION 3: Services Snippet */}
      <section className="py-20 bg-white dark:bg-brand-dark transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy dark:text-white mb-4">Our Expertise</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We combine creative innovation with data-driven strategies to deliver comprehensive digital solutions for UK businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Code size={32} className="text-brand-blue" />}
              title="Website Design"
              description="High-performance, SEO-optimized websites built for conversion and aesthetic excellence."
              link="/services/web-design"
            />
            <ServiceCard 
              icon={<Bot size={32} className="text-brand-cyan" />}
              title="AI Automation"
              description="Streamline operations and reduce costs with custom AI chatbots and workflow automation."
              link="/services/ai-automation"
            />
            <ServiceCard 
              icon={<TrendingUp size={32} className="text-purple-500" />}
              title="Digital Marketing"
              description="Targeted SEO, PPC, and social strategies to grow your presence in the UK market."
              link="/services/digital-marketing"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: Why Choose Us */}
      <section className="py-20 bg-brand-light dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={IMAGES.home.feature}
                alt="Team working in London office" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-brand-navy dark:text-white">Why Partner With OptiScale?</h2>
              <div className="space-y-6">
                <FeatureItem 
                  icon={<ShieldCheck className="text-brand-blue" />}
                  title="UK-Based & GDPR Compliant"
                  description="We understand the local market and legal landscape, ensuring your digital assets are fully compliant."
                />
                <FeatureItem 
                  icon={<Zap className="text-brand-cyan" />}
                  title="Tech-Forward Approach"
                  description="We leverage the latest stack (React, AI, Cloud) to keep you ahead of competitors."
                />
                <FeatureItem 
                  icon={<Users className="text-purple-500" />}
                  title="Dedicated Support"
                  description="Real humans, real expertise. Our London-based team is always just a call away."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Testimonials */}
      <section className="py-20 bg-white dark:bg-brand-dark transition-colors duration-300">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-brand-navy dark:text-white mb-12">Client Success Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="OptiScale transformed our outdated site into a lead generation machine. Our conversion rate doubled in 3 months."
              author="Sarah Jenkins"
              role="Marketing Director, FinTech UK"
            />
            <TestimonialCard 
              quote="The AI automation tools they implemented saved our support team 20 hours a week. Incredible ROI."
              author="James Sterling"
              role="Founder, Sterling Properties"
            />
            <TestimonialCard 
              quote="Professional, responsive, and truly expert in SEO. We finally rank #1 for our main keywords in London."
              author="Elena Rossi"
              role="CEO, Bella Designs"
            />
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA Section */}
      <section className="py-20 bg-brand-navy text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Scale Your Business?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of UK businesses transforming their digital presence with OptiScale.
          </p>
          <Link to="/contact">
            <Button variant="primary" className="px-10 py-4 text-lg">
              Get Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

interface HeroNavCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const HeroNavCard: React.FC<HeroNavCardProps> = ({ to, icon, title, desc }) => (
  <Link to={to} className="group bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 flex items-center gap-4 text-left shadow-lg hover:shadow-brand-blue/20">
    <div className="bg-brand-blue/20 p-3 rounded-lg text-brand-cyan group-hover:text-white group-hover:bg-brand-blue transition-colors">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-white text-lg">{title}</h3>
      <p className="text-gray-300 text-sm group-hover:text-gray-100 transition-colors">{desc}</p>
    </div>
  </Link>
);

const ServiceCard: React.FC<{icon: React.ReactNode, title: string, description: string, link: string}> = ({ icon, title, description, link }) => (
  <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group">
    <div className="bg-brand-light dark:bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-brand-navy dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{description}</p>
    <Link to={link} className="text-brand-blue dark:text-brand-cyan font-semibold flex items-center gap-1 hover:gap-2 transition-all">
      Learn More <ArrowRight size={16} />
    </Link>
  </div>
);

const FeatureItem: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="flex gap-4">
    <div className="mt-1 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm h-fit">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-bold mb-1 text-brand-navy dark:text-white">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const TestimonialCard: React.FC<{quote: string, author: string, role: string}> = ({ quote, author, role }) => (
  <div className="bg-brand-light dark:bg-slate-800 p-8 rounded-2xl relative transition-colors duration-300">
    <Quote className="text-brand-blue/20 dark:text-brand-cyan/20 absolute top-6 left-6" size={40} />
    <div className="flex gap-1 mb-4 text-yellow-400 relative z-10">
      {[1, 2, 3, 4, 5].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
    </div>
    <p className="text-gray-700 dark:text-gray-300 italic mb-6 relative z-10">"{quote}"</p>
    <div>
      <p className="font-bold text-brand-navy dark:text-white">{author}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
    </div>
  </div>
);