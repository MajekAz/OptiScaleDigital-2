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

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-brand-navy text-white py-section overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
                src={IMAGES.home.heroBg} 
                alt="Digital Background" 
                className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/95 via-brand-navy/80 to-brand-light"></div>
        </div>

        <div className="container relative z-10 pt-12">
          <div className="max-w-[1000px] mx-auto text-center mb-16">
            <h1 className="text-h1 mb-8">
              Future-Proof Your Business with <span className="gradient-text">AI & Design</span>
            </h1>
            <p className="text-lead text-gray-200 mb-12 max-w-2xl mx-auto">
              OptiScale Digital is a premier UK agency specializing in bespoke Website Design, AI Automation, and result-driven Digital Marketing.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact">
                <Button variant="primary" className="px-12 py-5 text-lead flex items-center justify-center gap-2 shadow-blue-500/50">
                  Start Your Project <ArrowRight size={24} />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <HeroNavCard 
              to="/about" 
              icon={<Users size={24} />} 
              title="About Us" 
              desc="Meet the team" 
            />
            <HeroNavCard 
              to="/services" 
              icon={<Code size={24} />} 
              title="Services" 
              desc="Web, AI & Marketing" 
            />
            <HeroNavCard 
              to="/blog" 
              icon={<FileText size={24} />} 
              title="Blog" 
              desc="Latest trends" 
            />
            <HeroNavCard 
              to="/contact" 
              icon={<Mail size={24} />} 
              title="Contact" 
              desc="Free quote" 
            />
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container">
           <p className="text-center text-gray-400 text-small font-bold uppercase tracking-widest mb-8">Trusted by innovative UK companies</p>
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
              <span className="text-h4 font-black text-gray-500">NexTech</span>
              <span className="text-h4 font-black text-gray-500">LondonFin</span>
              <span className="text-h4 font-black text-gray-500">GrowthAI</span>
              <span className="text-h4 font-black text-gray-500">UrbanDesign</span>
           </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-brand-navy mb-6">Our Expertise</h2>
            <p className="text-lead text-gray-600 max-w-2xl mx-auto">
              We combine creative innovation with data-driven strategies for UK businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Code size={32} className="text-brand-blue" />}
              title="Website Design"
              description="High-performance, SEO-optimized websites built for conversion."
              link="/services/web-design"
            />
            <ServiceCard 
              icon={<Bot size={32} className="text-brand-cyan" />}
              title="AI Automation"
              description="Streamline operations and reduce costs with custom AI workflows."
              link="/services/ai-automation"
            />
            <ServiceCard 
              icon={<TrendingUp size={32} className="text-purple-500" />}
              title="Digital Marketing"
              description="Targeted SEO and PPC strategies to grow your presence."
              link="/services/digital-marketing"
            />
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-section bg-brand-light">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={IMAGES.home.feature}
                alt="Team working" 
                className="rounded-3xl shadow-xl w-full grayscale-[0.2]"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-h2 mb-8 text-brand-navy">Why Partner With Us?</h2>
              <div className="space-y-8">
                <FeatureItem 
                  icon={<ShieldCheck className="text-brand-blue" size={28} />}
                  title="UK-Based & Compliant"
                  description="We understand the local market and legal landscape (GDPR)."
                />
                <FeatureItem 
                  icon={<Zap className="text-brand-cyan" size={28} />}
                  title="Tech-Forward"
                  description="Leveraging the latest stack to keep you ahead of competitors."
                />
                <FeatureItem 
                  icon={<Users className="text-purple-500" size={28} />}
                  title="Dedicated Support"
                  description="Real humans, real expertise. London-based team."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-section bg-white">
        <div className="container">
          <h2 className="text-h2 text-center text-brand-navy mb-16 text-balance">Real Results for Real Businesses</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="OptiScale transformed our outdated site into a lead generation machine."
              author="Sarah Jenkins"
              role="Marketing Director"
            />
            <TestimonialCard 
              quote="The AI automation tools they implemented saved our support team 20 hours a week."
              author="James Sterling"
              role="Founder"
            />
            <TestimonialCard 
              quote="Professional, responsive, and truly expert in SEO. We finally rank #1."
              author="Elena Rossi"
              role="CEO"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-brand-navy text-center">
        <div className="container">
          <h2 className="text-h2 text-white mb-8">Ready to Scale?</h2>
          <p className="text-lead text-gray-300 mb-10 max-w-2xl mx-auto">
            Join hundreds of UK businesses transforming their digital presence.
          </p>
          <Link to="/contact">
            <Button variant="primary" className="px-12 py-5 text-lead">
              Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const HeroNavCard: React.FC<{to: string, icon: React.ReactNode, title: string, desc: string}> = ({ to, icon, title, desc }) => (
  <Link to={to} className="group bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all text-left">
    <div className="bg-brand-blue/20 p-3 rounded-lg text-brand-cyan group-hover:bg-brand-blue group-hover:text-white mb-4 w-fit">
      {icon}
    </div>
    <h3 className="font-bold text-white text-body mb-1">{title}</h3>
    <p className="text-gray-400 text-small group-hover:text-gray-200">{desc}</p>
  </Link>
);

const ServiceCard: React.FC<{icon: React.ReactNode, title: string, description: string, link: string}> = ({ icon, title, description, link }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
    <div className="bg-brand-light w-16 h-16 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-h4 mb-3 text-brand-navy">{title}</h3>
    <p className="text-body text-gray-600 mb-6">{description}</p>
    <Link to={link} className="text-brand-blue font-bold text-body flex items-center gap-1 hover:gap-2 transition-all">
      Learn More <ArrowRight size={18} />
    </Link>
  </div>
);

const FeatureItem: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="flex gap-4">
    <div className="bg-white p-2 rounded-lg shadow-sm h-fit">
      {icon}
    </div>
    <div>
      <h4 className="text-h4 mb-1 text-brand-navy">{title}</h4>
      <p className="text-body text-gray-600">{description}</p>
    </div>
  </div>
);

const TestimonialCard: React.FC<{quote: string, author: string, role: string}> = ({ quote, author, role }) => (
  <div className="bg-brand-light p-8 rounded-2xl shadow-sm border border-gray-50">
    <Quote className="text-brand-blue/10 mb-4" size={32} />
    <p className="text-body text-gray-700 italic mb-6">"{quote}"</p>
    <div>
      <p className="font-bold text-body text-brand-navy">{author}</p>
      <p className="text-small text-gray-500 uppercase tracking-wider">{role}</p>
    </div>
  </div>
);