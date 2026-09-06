import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { 
  Monitor, Smartphone, Zap, Search, Layers, RefreshCw, 
  PenTool, ShoppingCart, ArrowRight, ShieldCheck, CheckCircle2,
  Code, Globe, ChevronDown, Database, Sparkles
} from 'lucide-react';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';
import { trackLeadGeneration, trackServicePageView } from '../utils/analytics';

export const ServiceWebDesign: React.FC = () => {
  useEffect(() => {
    trackServicePageView('Web Design', '/services/web-design');
  }, []);
  return (
    <div className="w-full">
      <SEO 
        title="Web Design London | High-Performance Business Websites"
        description="Conversion-focused website design and development services built for the UK market."
      />

      {/* 1. Hero with Service Promise */}
      <section className="relative py-24 lg:py-48 bg-brand-secondary text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.services.webDesign} 
            alt="Web Design Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-secondary/90 via-brand-secondary/70 to-brand-secondary"></div>
        </div>

        <div className="container relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-8">
            The Digital Flagship Store
          </div>
          <h1 className="text-h1 mb-6 max-w-4xl mx-auto leading-tight">
            Engineering <span className="text-brand-primary">Digital Dominance.</span>
          </h1>
          <p className="text-2xl font-medium text-white/90 mb-6 max-w-3xl mx-auto">
            High-Performance Websites for High-Growth Brands.
          </p>
          <p className="text-lg text-brand-textGrey mb-12 max-w-[65ch] mx-auto leading-relaxed">
            We don't just build websites; we engineer scalable digital assets that capture market share, secure your data, and turn browsers into lifelong clients.
          </p>
          <div className="flex justify-center">
            <Link to="/booking">
              <Button variant="primary" className="px-12 py-5 text-lg shadow-2xl shadow-brand-primary/20 hover:shadow-brand-primary/40 transition-all">
                Start Your Digital Evolution
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Problem → Solution Narrative */}
      <section className="py-section bg-white">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-brand-primary font-bold uppercase tracking-widest text-xs">The Friction</span>
              <h2 className="text-h3 text-brand-secondary mt-2 mb-6 max-w-md">Your Website is Leaking Revenue.</h2>
              <p className="text-brand-textGrey mb-6 leading-relaxed max-w-[65ch]">
                Most business sites are slow, cluttered, and fail to guide visitors toward a conversion. In the UK market, a 1-second delay in page load equals a 7% drop in conversions.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-2 text-brand-secondary font-medium">
                   <ArrowRight size={16} className="text-brand-primary" /> High Bounce Rates
                </li>
                <li className="flex items-center gap-2 text-brand-secondary font-medium">
                   <ArrowRight size={16} className="text-brand-primary" /> Poor Mobile Experience
                </li>
                <li className="flex items-center gap-2 text-brand-secondary font-medium">
                   <ArrowRight size={16} className="text-brand-primary" /> Zero Lead Generation
                </li>
              </ul>
            </div>
            <div className="bg-brand-lightGrey p-12 rounded-[2.5rem] border border-brand-primary/20 shadow-xl">
              <span className="text-brand-accent font-bold uppercase tracking-widest text-xs">The Growth Engine</span>
              <h2 className="text-h3 text-brand-secondary mt-2 mb-6 max-w-md">OptiScale Performance Architecture.</h2>
              <p className="text-brand-textGrey mb-8 leading-relaxed max-w-[65ch]">
                We rebuild your presence using performance-first React technology and psychology-driven layouts to guide users toward your primary goals.
              </p>
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-brand-borderGrey">
                <div className="w-12 h-12 bg-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent">
                   <CheckCircle2 size={24} />
                </div>
                <div>
                   <p className="font-bold text-brand-secondary">Avg. 38% Increase</p>
                   <p className="text-xs text-brand-textGrey uppercase">In Lead Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deliverables List */}
      <section className="py-section bg-brand-lightGrey">
        <div className="container">
          <div className="text-center mb-24">
            <h2 className="text-h2 text-brand-secondary">Scale & Security: Our Core Standards</h2>
            <p className="text-brand-textGrey mt-6 max-w-[65ch] mx-auto">
              We engineer high-performance digital infrastructure designed for enterprise-grade reliability and rapid business scaling.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Deliverable 
              icon={<Layers />} 
              title="WordPress Design & Development" 
              desc="Custom-built, block-based themes without heavy page builders. A beautiful, easy-to-edit site that remains stable through every update." 
            />
            <Deliverable 
              icon={<Code />} 
              title="Enterprise Web Development" 
              desc="Custom React/Next.js applications for complex business logic. Infinite scalability and lightning-fast speeds that outpace your competition." 
            />
            <Deliverable 
              icon={<ShieldCheck />} 
              title="Proactive Website Management" 
              desc="24/7 uptime monitoring, daily backups, and security patching. Total peace of mind knowing your digital storefront is safe while you sleep." 
            />
            <Deliverable 
              icon={<Database />} 
              title="Headless CMS Deployment" 
              desc="Decoupled architecture using Sanity or Contentful. Unmatched security and the ability to push content to apps, web, and IoT from one central hub." 
            />
            <Deliverable 
              icon={<Sparkles />} 
              title="AI-Driven User Personalization" 
              desc="Dynamic content blocks that adapt to visitor behavior. Show the right offer to the right person, increasing conversion rates by up to 40%." 
            />
            <Deliverable 
              icon={<Zap />} 
              title="Core Web Vitals & Speed Optimization" 
              desc="Advanced edge-caching and next-gen compression. Google-friendly 'Green' scores that improve your SEO rankings and user retention." 
            />
          </div>
        </div>
      </section>

      {/* New: Comparison Section */}
      <section className="py-section bg-white">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-h2 text-brand-secondary mb-6">Choose Your Growth Engine</h2>
            <p className="text-lg text-brand-textGrey max-w-[65ch] mx-auto">
              Whether you need a high-converting marketing site or a complex digital product, we have the technical stack to deliver.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* WordPress Card */}
            <div className="p-10 bg-brand-lightGrey rounded-[2.5rem] border border-brand-borderGrey hover:border-brand-primary hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm mb-8">
                <Globe size={32} />
              </div>
              <h3 className="text-3xl font-bold text-brand-secondary mb-4">High-Performance WordPress</h3>
              <p className="text-brand-textGrey mb-8 leading-relaxed">
                Perfect for marketing sites and SMEs who need a powerful, scalable presence with a familiar interface.
              </p>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-brand-secondary font-medium">
                  <CheckCircle2 size={20} className="text-brand-accent" /> Easy Content Management
                </li>
                <li className="flex items-center gap-3 text-brand-secondary font-medium">
                  <CheckCircle2 size={20} className="text-brand-accent" /> SEO-Optimized Architecture
                </li>
                <li className="flex items-center gap-3 text-brand-secondary font-medium">
                  <CheckCircle2 size={20} className="text-brand-accent" /> Custom-Coded (No Bloated Themes)
                </li>
                <li className="flex items-center gap-3 text-brand-secondary font-medium">
                  <CheckCircle2 size={20} className="text-brand-accent" /> Rapid Launch Timelines
                </li>
              </ul>
              <Link to="/booking" onClick={() => trackLeadGeneration('Discuss Your Project', 'WordPress Card')}>
                <Button variant="primary" fullWidth className="py-4">Discuss Your Project</Button>
              </Link>
            </div>

            {/* React Card */}
            <div className="p-10 bg-brand-secondary text-white rounded-[2.5rem] border border-white/5 hover:border-brand-primary hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm mb-8">
                <Code size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Custom Web Apps (React)</h3>
              <p className="text-brand-textGrey mb-8 leading-relaxed">
                For businesses requiring bespoke functionality, extreme performance, and a unique competitive edge.
              </p>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-white/90 font-medium">
                  <CheckCircle2 size={20} className="text-brand-primary" /> Blazing Fast Speed (Next.js)
                </li>
                <li className="flex items-center gap-3 text-white/90 font-medium">
                  <CheckCircle2 size={20} className="text-brand-primary" /> Complex Custom Functionality
                </li>
                <li className="flex items-center gap-3 text-white/90 font-medium">
                  <CheckCircle2 size={20} className="text-brand-primary" /> Infinite Scalability
                </li>
                <li className="flex items-center gap-3 text-white/90 font-medium">
                  <CheckCircle2 size={20} className="text-brand-primary" /> Bespoke UI/UX Components
                </li>
              </ul>
              <Link to="/booking" onClick={() => trackLeadGeneration('Discuss Your Project', 'React Card')}>
                <Button variant="primary" fullWidth className="py-4">Discuss Your Project</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New: WordPress Standard Section */}
      <section className="py-section bg-brand-primary/5 border-y border-brand-primary/10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-brand-primary font-bold uppercase tracking-widest text-xs">Technical Excellence</span>
              <h2 className="text-h2 text-brand-secondary mt-2 mb-6">The OptiScale WordPress Standard</h2>
              <p className="text-lg text-brand-textGrey">
                We don't build "typical" WordPress sites. We engineer high-performance digital assets that overcome the common limitations of the platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-6 p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-brand-borderGrey hover:border-brand-primary transition-colors group">
                <div className="shrink-0 w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-secondary dark:text-white mb-2">Lightning Fast</h4>
                  <p className="text-sm text-brand-textGrey leading-relaxed">
                    We eliminate "WordPress bloat" by avoiding heavy page builders and unnecessary plugins. Our sites are engineered for perfect Core Web Vitals scores and sub-second load times.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-brand-borderGrey hover:border-brand-primary transition-colors group">
                <div className="shrink-0 w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-secondary dark:text-white mb-2">Bank-Grade Security</h4>
                  <p className="text-sm text-brand-textGrey leading-relaxed">
                    We deploy a multi-layered security stack, including server-side hardening, custom login paths, and automated threat detection to keep your business data safe.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-brand-borderGrey hover:border-brand-primary transition-colors group">
                <div className="shrink-0 w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <Search size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-secondary dark:text-white mb-2">SEO Ready</h4>
                  <p className="text-sm text-brand-textGrey leading-relaxed">
                    Built from the ground up to rank. Every site includes semantic HTML5 markup and JSON-LD schema to ensure Google understands your content from day one.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-brand-borderGrey hover:border-brand-primary transition-colors group">
                <div className="shrink-0 w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <Layers size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-secondary dark:text-white mb-2">Bespoke Scalability</h4>
                  <p className="text-sm text-brand-textGrey leading-relaxed">
                    Our WordPress builds are modular. As your business grows, your site can evolve with custom post types and API integrations without needing a total rebuild.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process Steps */}
      <section className="py-section bg-brand-secondary text-white">
        <div className="container">
          <div className="text-center mb-24">
            <h2 className="text-h2 max-w-3xl mx-auto">Building Your Digital Asset</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-12">
            <Step n="1" t="Audit" d="Mapping competitors and current SEO performance." />
            <Step n="2" t="Blueprint" d="Designing the logic and conversion pathways." />
            <Step n="3" t="Develop" d="Clean, modular coding with zero technical debt." />
            <Step n="4" t="Scale" d="Launch, training, and conversion tracking." />
          </div>
        </div>
      </section>

      {/* 5. Benefits */}
      <section className="py-section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <Benefit icon={<Zap />} title="Blazing Speed" desc="Pages load in under 1 second for higher search ranking." />
            <Benefit icon={<ShieldCheck />} title="Enterprise Security" desc="Bank-grade protection and SSL certificates for peace of mind." />
            <Benefit icon={<CheckCircle2 />} title="Built to Sell" desc="Every pixel and paragraph is optimized for business growth." />
          </div>
        </div>
      </section>

      {/* New: FAQ Section */}
      <section className="py-section bg-brand-lightGrey">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-brand-secondary mb-4">Frequently Asked Questions</h2>
            <p className="text-brand-textGrey">Everything you need to know about our web design process.</p>
          </div>
          
          <div className="space-y-4">
            <FAQItem 
              question="How long does a website project take?" 
              answer="A typical high-performance website project takes between 4 to 8 weeks from discovery to launch. This timeline depends on the complexity of the functionality and the speed of feedback during the design phase."
            />
            <FAQItem 
              question="Will I be able to edit the website myself after launch?" 
              answer="Yes, we provide full training on the WordPress dashboard. We build our sites using a modular 'block' system that makes it incredibly easy for your team to update text, images, and blog posts without touching a single line of code."
            />
            <FAQItem 
              question="Do you also provide website hosting and maintenance?" 
              answer="Absolutely. We offer premium, managed hosting on UK-based servers optimized for speed. Our maintenance packages include 24/7 security monitoring, daily backups, and monthly performance reports to keep your site running at peak efficiency."
            />
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 bg-brand-primary text-center">
        <div className="container">
          <h2 className="text-h2 text-white mb-8 max-w-2xl mx-auto">Stop Settling for "Just a Website".</h2>
          <p className="text-xl text-white/80 mb-12 max-w-[65ch] mx-auto">Build a performance engine that works for you 24/7.</p>
          <Link to="/contact">
            <Button variant="secondary" className="px-12 py-5 text-lg">Start Your Rebuild</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const Deliverable = ({ icon, title, desc }: any) => (
  <div className="p-10 bg-white rounded-3xl border border-brand-borderGrey hover:border-brand-primary transition-all shadow-sm hover:shadow-xl group">
    <div className="text-brand-primary mb-6 transition-transform group-hover:scale-110">{React.cloneElement(icon, { size: 36 })}</div>
    <h4 className="text-xl font-bold mb-3 text-brand-secondary">{title}</h4>
    <p className="text-brand-textGrey text-sm leading-relaxed max-w-[65ch]">{desc}</p>
  </div>
);

const Step = ({ n, t, d }: any) => (
  <div className="text-center">
    <div className="text-5xl font-black text-white/10 mb-6">{n}</div>
    <h4 className="text-xl font-bold mb-3">{t}</h4>
    <p className="text-sm text-gray-400 leading-relaxed">{d}</p>
  </div>
);

const Benefit = ({ icon, title, desc }: any) => (
  <div className="text-center p-8 bg-brand-lightGrey rounded-3xl border border-brand-borderGrey">
    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-brand-primary shadow-md">
      {React.cloneElement(icon, { size: 36 })}
    </div>
    <h4 className="text-2xl font-bold mb-3 text-brand-secondary">{title}</h4>
    <p className="text-brand-textGrey leading-relaxed max-w-[65ch]">{desc}</p>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-brand-borderGrey overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-brand-lightGrey/50 transition-colors"
      >
        <span className="text-lg font-bold text-brand-secondary">{question}</span>
        <ChevronDown 
          className={`text-brand-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={24} 
        />
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-8 pb-6 text-brand-textGrey leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};
