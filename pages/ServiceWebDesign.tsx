import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Monitor, Smartphone, Zap, Search, Layers, RefreshCw, PenTool, ShoppingCart } from 'lucide-react';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';

export const ServiceWebDesign: React.FC = () => {
  return (
    <div className="w-full">
      <SEO 
        title="Web Design Agency London | Custom Websites & E-Commerce"
        description="High-performance website design and development services in the UK. React, WordPress, and Shopify solutions tailored for British businesses."
        keywords="Web Design London, Custom Web Development UK, Shopify Experts, WordPress Agency, UI/UX Design"
      />

      {/* SECTION 1: Hero */}
      <section className="relative py-24 lg:py-32 bg-brand-navy overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.services.webDesign} 
            alt="Web Design Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/80 to-brand-light/5 dark:to-brand-dark/5"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Bespoke Website Design & <span className="text-brand-cyan">Development</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              We craft high-performance, aesthetically stunning websites tailored for the UK market. From custom coding to WordPress mastery, we build your digital foundation.
            </p>
            <Link to="/contact">
              <Button>Start Your Project</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: Comprehensive Services Grid */}
      <section className="py-20 bg-white dark:bg-brand-dark transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy dark:text-white mb-4">Our Web Solutions</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Whether you need a simple brochure site or a complex web application, our team delivers pixel-perfect results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceDetailCard 
              icon={<Monitor className="text-brand-blue" size={32} />}
              title="Custom Web Development"
              description="Tailor-made websites built with React and modern frameworks for unmatched speed and scalability."
            />
            <ServiceDetailCard 
              icon={<Layers className="text-brand-blue" size={32} />}
              title="WordPress Development"
              description="Professional WordPress themes and plugins customized to give you full control over your content."
            />
            <ServiceDetailCard 
              icon={<ShoppingCart className="text-brand-blue" size={32} />}
              title="E-Commerce Stores"
              description="High-converting Shopify and WooCommerce stores designed to maximize sales and simplify management."
            />
            <ServiceDetailCard 
              icon={<RefreshCw className="text-brand-blue" size={32} />}
              title="Website Maintenance"
              description="Ongoing support, security updates, and backups to keep your business online and secure 24/7."
            />
            <ServiceDetailCard 
              icon={<Search className="text-brand-blue" size={32} />}
              title="Technical Website Auditing"
              description="Deep-dive analysis of your site's performance, SEO structure, and code quality with actionable insights."
            />
            <ServiceDetailCard 
              icon={<PenTool className="text-brand-blue" size={32} />}
              title="UI/UX Design"
              description="User-centric design prototypes and wireframes that ensure an intuitive and engaging user experience."
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: The Process */}
      <section className="py-20 bg-brand-light dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy dark:text-white mb-6">How We Build</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                We don't just guess; we follow a proven methodology to ensure your project launches on time and exceeds expectations.
              </p>
              <div className="space-y-6">
                <ProcessStep number="01" title="Discovery & Strategy" desc="We analyze your competitors and define your target audience." />
                <ProcessStep number="02" title="Design & Wireframing" desc="We create visual prototypes to map out the user journey." />
                <ProcessStep number="03" title="Development" desc="Our engineers write clean, semantic code optimized for SEO." />
                <ProcessStep number="04" title="Launch & Grow" desc="We deploy your site and help you scale with ongoing support." />
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-brand-blue rounded-2xl transform rotate-3 opacity-20"></div>
              <img 
                src={IMAGES.services.webProcess}
                alt="Web development code on screen" 
                className="relative rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Tech Stack & Performance */}
      <section className="py-20 bg-brand-navy text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Built for Performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <Zap className="text-brand-cyan mx-auto mb-4" size={40} />
              <h3 className="text-xl font-bold">Blazing Fast</h3>
              <p className="text-gray-400 text-sm mt-2">Core Web Vitals optimized</p>
            </div>
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <Smartphone className="text-brand-cyan mx-auto mb-4" size={40} />
              <h3 className="text-xl font-bold">Mobile First</h3>
              <p className="text-gray-400 text-sm mt-2">Responsive across all devices</p>
            </div>
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <Search className="text-brand-cyan mx-auto mb-4" size={40} />
              <h3 className="text-xl font-bold">SEO Ready</h3>
              <p className="text-gray-400 text-sm mt-2">Semantic HTML5 structure</p>
            </div>
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <Layers className="text-brand-cyan mx-auto mb-4" size={40} />
              <h3 className="text-xl font-bold">Scalable</h3>
              <p className="text-gray-400 text-sm mt-2">Built to grow with you</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section className="py-24 bg-white dark:bg-brand-dark text-center transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-brand-light dark:bg-slate-800 p-10 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg">
            <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-4">Ready to upgrade your online presence?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Get a free consultation and website audit. Let's discuss how we can improve your conversion rates.
            </p>
            <Link to="/contact">
              <Button className="px-8 py-4 text-lg shadow-xl shadow-blue-500/20">Request a Quote</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceDetailCard: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="p-8 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-800 group">
    <div className="mb-4 bg-brand-light dark:bg-slate-700 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-brand-blue/10 dark:group-hover:bg-brand-blue/20 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-brand-navy dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{description}</p>
  </div>
);

const ProcessStep: React.FC<{number: string, title: string, desc: string}> = ({ number, title, desc }) => (
  <div className="flex gap-4">
    <div className="text-3xl font-bold text-brand-blue/30">{number}</div>
    <div>
      <h4 className="text-xl font-bold text-brand-navy dark:text-white">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
    </div>
  </div>
);