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
          <div className="max-w-5xl mx-auto text-center mb-16">
            <h1 className="text-6xl lg:text-8xl font-bold leading-tight mb-8 tracking-tight">
              Future-Proof Your Business with <span className="gradient-text">AI & Design</span>
            </h1>
            <p className="text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              OptiScale Digital is a premier UK agency specializing in bespoke Website Design, AI Automation, and result-driven Digital Marketing. We build digital ecosystems that scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact">
                <Button variant="primary" className="px-12 py-5 text-xl flex items-center justify-center gap-2 shadow-blue-500/50">
                  Start Your Project <ArrowRight size={24} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12 animate-fade-in-up">
            <HeroNavCard 
              to="/about" 
              icon={<Users size={28} />} 
              title="About Us" 
              desc="Meet the team & mission" 
            />
            <HeroNavCard 
              to="/services" 
              icon={<Code size={28} />} 
              title="Our Services" 
              desc="Web, AI, & Marketing" 
            />
            <HeroNavCard 
              to="/blog" 
              icon={<FileText size={28} />} 
              title="Insights Blog" 
              desc="Latest tech trends" 
            />
            <HeroNavCard 
              to="/contact" 
              icon={<Mail size={28} />} 
              title="Contact Us" 
              desc="Get a free quote today" 
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: Trusted By (Social Proof) */}
      <section className="py-12 bg-brand-light dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
           <p className="text-center text-gray-400 text-sm font-bold uppercase tracking-widest mb-8">Trusted by innovative UK companies</p>
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-2xl font-black text-gray-500 dark:text-gray-400">NexTech</span>
              <span className="text-2xl font-black text-gray-500 dark:text-gray-400">LondonFin</span>
              <span className="text-2xl font-black text-gray-500 dark:text-gray-400">GrowthAI</span>
              <span className="text-2xl font-black text-gray-500 dark:text-gray-400">UrbanDesign</span>
              <span className="text-2xl font-black text-gray-500 dark:text-gray-400">EcoSystems</span>
           </div>
        </div>
      </section>

      {/* SECTION 3: Services Snippet */}
      <section className="py-24 bg-white dark:bg-brand-dark transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy dark:text-white mb-6">Our Expertise</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We combine creative innovation with data-driven strategies to deliver comprehensive digital solutions for UK businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <ServiceCard 
              icon={<Code size={40} className="text-brand-blue" />}
              title="Website Design"
              description="High-performance, SEO-optimized websites built for conversion and aesthetic excellence."
              link="/services/web-design"
            />
            <ServiceCard 
              icon={<Bot size={40} className="text-brand-cyan" />}
              title="AI Automation"
              description="Streamline operations and reduce costs with custom AI chatbots and workflow automation."
              link="/services/ai-automation"
            />
            <ServiceCard 
              icon={<TrendingUp size={40} className="text-purple-500" />}
              title="Digital Marketing"
              description="Targeted SEO, PPC, and social strategies to grow your presence in the UK market."
              link="/services/digital-marketing"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: Why Choose Us */}
      <section className="py-24 bg-brand-light dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src={IMAGES.home.feature}
                alt="Team working in London office" 
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-brand-navy dark:text-white">Why Partner With OptiScale?</h2>
              <div className="space-y-8">
                <FeatureItem 
                  icon={<ShieldCheck className="text-brand-blue" size={32} />}
                  title="UK-Based & GDPR Compliant"
                  description="We understand the local market and legal landscape, ensuring your digital assets are fully compliant."
                />
                <FeatureItem 
                  icon={<Zap className="text-brand-cyan" size={32} />}
                  title="Tech-Forward Approach"
                  description="We leverage the latest stack (React, AI, Cloud) to keep you ahead of competitors."
                />
                <FeatureItem 
                  icon={<Users className="text-purple-500" size={32} />}
                  title="Dedicated Support"
                  description="Real humans, real expertise. Our London-based team is always just a call away."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Testimonials */}
      <section className="py-24 bg-white dark:bg-brand-dark transition-colors duration-300">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-center text-brand-navy dark:text-white mb-16">Client Success Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
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
      <section className="py-24 bg-brand-navy text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">Ready to Scale Your Business?</h2>
          <p className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of UK businesses transforming their digital presence with OptiScale.
          </p>
          <Link to="/contact">
            <Button variant="primary" className="px-12 py-5 text-xl">
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
  <Link to={to} className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 flex items-center gap-5 text-left shadow-lg hover:shadow-brand-blue/20">
    <div className="bg-brand-blue/20 p-4 rounded-xl text-brand-cyan group-hover:text-white group-hover:bg-brand-blue transition-colors shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-white text-xl">{title}</h3>
      <p className="text-gray-300 text-base group-hover:text-gray-100 transition-colors">{desc}</p>
    </div>
  </Link>
);

const ServiceCard: React.FC<{icon: React.ReactNode, title: string, description: string, link: string}> = ({ icon, title, description, link }) => (
  <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all group">
    <div className="bg-brand-light dark:bg-slate-700 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-brand-navy dark:text-white">{title}</h3>
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{description}</p>
    <Link to={link} className="text-brand-blue dark:text-brand-cyan text-lg font-bold flex items-center gap-1 hover:gap-3 transition-all">
      Learn More <ArrowRight size={20} />
    </Link>
  </div>
);

const FeatureItem: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="flex gap-6">
    <div className="mt-1 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-md h-fit shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-2xl font-bold mb-2 text-brand-navy dark:text-white">{title}</h4>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  </div>
);

const TestimonialCard: React.FC<{quote: string, author: string, role: string}> = ({ quote, author, role }) => (
  <div className="bg-brand-light dark:bg-slate-800 p-10 rounded-3xl relative transition-colors duration-300 shadow-sm border border-gray-50 dark:border-gray-700">
    <Quote className="text-brand-blue/10 dark:text-brand-cyan/10 absolute top-8 left-8" size={60} />
    <div className="flex gap-1 mb-6 text-yellow-400 relative z-10">
      {[1, 2, 3, 4, 5].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
    </div>
    <p className="text-xl text-gray-700 dark:text-gray-300 italic mb-8 relative z-10 leading-relaxed">"{quote}"</p>
    <div>
      <p className="font-bold text-xl text-brand-navy dark:text-white">{author}</p>
      <p className="text-base text-gray-500 dark:text-gray-400">{role}</p>
    </div>
  </div>
);