import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, ShieldCheck, Zap, Target, Lightbulb, 
  TrendingUp, Search, Rocket, BarChart3, CheckCircle2, 
  ArrowRight, Award, Globe, HeartHandshake, Bot
} from 'lucide-react';
import { Button } from '../components/Button';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';

export const About: React.FC = () => {
  return (
    <div className="w-full bg-brand-white">
      <SEO 
        title="About Us | OptiScale Digital - UK Growth & AI Agency"
        description="Learn about OptiScale Digital's mission to transform UK businesses through performance-driven web design and AI automation. Meet our founder and explore our proven process."
        keywords="About OptiScale, UK Web Agency Mission, AI Automation Strategy, Business Growth London"
      />

      {/* 1. Hero Section */}
      <section className="relative py-24 lg:py-40 bg-brand-secondary text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.about.heroBg} 
            alt="London Office Architecture" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary via-brand-secondary/80 to-transparent"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
              Our Identity
            </span>
            <h1 className="text-h1 mb-6 max-w-2xl mx-auto">
              Engineering the <br /><span className="text-brand-primary">Growth Engines</span> of Tomorrow.
            </h1>
            <p className="text-xl text-brand-textGrey mb-10 leading-relaxed max-w-[65ch] mx-auto">
              OptiScale Digital helps ambitious UK businesses bridge the gap between manual operations and automated, high-performance scale. We don't just build websites; we build digital assets that yield measurable returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button variant="primary" className="px-10 py-5">Book a Strategy Call</Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="px-10 py-5 border-white/20 text-white hover:bg-white/10 hover:border-white">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="py-section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src={IMAGES.about.mission} 
                alt="Strategic planning session" 
                className="rounded-[2.5rem] shadow-2xl relative z-10"
              />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl"></div>
            </div>
            <div>
              <span className="text-brand-primary font-bold uppercase tracking-widest text-xs">The Origin</span>
              <h2 className="text-h2 text-brand-secondary mt-2 mb-6">Born from a Need for Precision.</h2>
              <div className="space-y-6 text-brand-textGrey text-lg leading-relaxed max-w-[65ch]">
                <p>
                  OptiScale Digital was founded in London with a single conviction: most digital agencies focus on aesthetics while ignoring the underlying systems that actually drive business growth.
                </p>
                <p>
                  We saw too many UK businesses struggling with manual processes, outdated lead-capture systems, and "silent" digital footprints. We were created to fix that—combining high-end design with deep AI integration to reclaim thousands of hours for our clients.
                </p>
                <p className="font-semibold text-brand-secondary italic max-w-[65ch]">
                  "Our mission isn't just to be another vendor. We aim to be the technical foundation upon which your next decade of growth is built."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-section bg-brand-lightGrey">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-12 rounded-[2rem] border border-brand-borderGrey shadow-sm">
              <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-8">
                <Target size={32} />
              </div>
              <h3 className="text-h3 text-brand-secondary mb-4">Our Mission</h3>
              <p className="text-brand-textGrey leading-relaxed max-w-[65ch]">
                To empower 500+ UK businesses by 2030 with autonomous systems and conversion-focused design, effectively doubling their operational capacity without increasing overhead.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[2rem] border border-brand-borderGrey shadow-sm">
              <div className="w-14 h-14 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mb-8">
                <Globe size={32} />
              </div>
              <h3 className="text-h3 text-brand-secondary mb-4">Our Vision</h3>
              <p className="text-brand-textGrey leading-relaxed max-w-[65ch]">
                To become the premier UK partner for digital transformation—where "OptiScale" becomes synonymous with precision engineering and ethical AI business scaling.
              </p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <Link to="/booking">
              <Button variant="primary" className="px-10 py-5">
                Start Your Transformation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-brand-secondary mb-4">The Values We Live By</h2>
            <p className="text-brand-textGrey max-w-[65ch] mx-auto">These four pillars guide every decision, every line of code, and every client interaction.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard 
              icon={<ShieldCheck />} 
              title="Radical Transparency" 
              desc="No black-box metrics. We show you exactly what we're building and how it's performing in real-time."
            />
            <ValueCard 
              icon={<Zap />} 
              title="Precision Scale" 
              desc="We don't just grow; we scale. Every system is built to handle 10x your current volume without breaking."
            />
            <ValueCard 
              icon={<Lightbulb />} 
              title="Ethical Innovation" 
              desc="AI should augment human talent, not replace it. We deploy tech that empowers your existing team."
            />
            <ValueCard 
              icon={<TrendingUp />} 
              title="Outcome Obsession" 
              desc="We aren't happy with a 'nice site'. We are only satisfied when we see your revenue and efficiency rise."
            />
          </div>
        </div>
      </section>

      {/* 5. Why Choose OptiScale */}
      <section className="py-section bg-brand-secondary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl"></div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-h2 mb-8 max-w-xl">The Strategic Advantage.</h2>
              <p className="text-lg text-brand-textGrey mb-10 max-w-[65ch]">
                Most agencies stop at the frontend. We go deep into your operations. By integrating **Systems Thinking** with **AI Intelligence**, we create a compounding effect of growth.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 bg-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Integrated Systems</h4>
                    <p className="text-sm text-brand-textGrey">Your website, CRM, and AI agents work as one cohesive unit.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 bg-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">UK Domain Expertise</h4>
                    <p className="text-sm text-brand-textGrey">We understand the UK legal, compliance, and market nuances perfectly.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 backdrop-blur-sm">
               <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                 <HeartHandshake className="text-brand-primary" /> Our Commitment to You
               </h3>
               <p className="text-brand-textGrey mb-8 leading-relaxed max-w-[65ch]">
                 When you partner with us, you aren't just hiring a service provider. You are investing in a technical partner committed to your long-term success. We treat your data with bank-grade security and your growth as our own.
               </p>
               <div className="flex items-center gap-4 py-4 border-t border-white/10">
                 <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center text-brand-primary">
                    <Award size={24} />
                 </div>
                 <p className="font-bold">Award-Nominated Technical Team</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Process Overview */}
      <section className="py-section bg-brand-lightGrey">
        <div className="container">
          <div className="text-center mb-24">
            <h2 className="text-h2 text-brand-secondary mb-4">Structured & Repeatable Success</h2>
            <p className="text-brand-textGrey max-w-[65ch] mx-auto">Our 4-step framework for taking you from static to scalable.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProcessCard num="01" title="Discovery" desc="Identifying bottlenecks and growth levers through a 360° digital audit." icon={<Search />} />
            <ProcessCard num="02" title="Strategy" desc="Architecting a bespoke roadmap focused on your unique KPIs." icon={<FileText />} />
            <ProcessStep num="03" title="Execution" desc="Rapid, clean development and integration of AI agents." icon={<Rocket />} />
            <ProcessStep num="04" title="Optimisation" desc="Data-driven refinement to maximize ROI month-over-month." icon={<BarChart3 />} />
          </div>
          <div className="mt-20 text-center">
            <Link to="/contact">
              <Button variant="outline" className="px-10 py-5 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white">
                Discuss Your Roadmap
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Why Choose OptiScale Section */}
      <section className="py-section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-brand-secondary mb-4">Why Choose OptiScale?</h2>
            <p className="text-brand-textGrey max-w-[65ch] mx-auto">We deliver high-performance digital infrastructure that outpaces the competition.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 bg-brand-lightGrey rounded-[2.5rem] border border-brand-borderGrey hover:border-brand-primary transition-all group shadow-sm hover:shadow-xl">
              <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-8 group-hover:bg-brand-primary group-hover:text-white transition-all">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-bold text-brand-secondary mb-4">Speed & Performance</h3>
              <p className="text-brand-textGrey leading-relaxed mb-6">Our React-based architectures ensure your site loads in milliseconds, providing a superior user experience and boosting SEO rankings.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm font-medium text-brand-secondary">
                  <CheckCircle2 size={18} className="text-brand-accent" /> Blazing Fast Load Times
                </li>
                <li className="flex items-center gap-2 text-sm font-medium text-brand-secondary">
                  <CheckCircle2 size={18} className="text-brand-accent" /> Optimized for Core Web Vitals
                </li>
              </ul>
            </div>
            <div className="p-10 bg-brand-lightGrey rounded-[2.5rem] border border-brand-borderGrey hover:border-brand-primary transition-all group shadow-sm hover:shadow-xl">
              <div className="w-14 h-14 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mb-8 group-hover:bg-brand-accent group-hover:text-white transition-all">
                <Bot size={32} />
              </div>
              <h3 className="text-2xl font-bold text-brand-secondary mb-4">AI-First Strategy</h3>
              <p className="text-brand-textGrey leading-relaxed mb-6">We don't just add AI; we build it into your core operations to automate lead capture, qualification, and customer engagement.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm font-medium text-brand-secondary">
                  <CheckCircle2 size={18} className="text-brand-accent" /> Custom AI Agents
                </li>
                <li className="flex items-center gap-2 text-sm font-medium text-brand-secondary">
                  <CheckCircle2 size={18} className="text-brand-accent" /> Automated Workflows
                </li>
              </ul>
            </div>
            <div className="p-10 bg-brand-lightGrey rounded-[2.5rem] border border-brand-borderGrey hover:border-brand-primary transition-all group shadow-sm hover:shadow-xl">
              <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-8 group-hover:bg-brand-primary group-hover:text-white transition-all">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-2xl font-bold text-brand-secondary mb-4">ROI-Driven Results</h3>
              <p className="text-brand-textGrey leading-relaxed mb-6">Every project is measured by its impact on your bottom line. We focus on conversion rates and revenue growth, not vanity metrics.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm font-medium text-brand-secondary">
                  <CheckCircle2 size={18} className="text-brand-accent" /> Conversion Optimization
                </li>
                <li className="flex items-center gap-2 text-sm font-medium text-brand-secondary">
                  <CheckCircle2 size={18} className="text-brand-accent" /> Measurable Growth
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section className="py-24 bg-brand-primary relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <h2 className="text-h2 text-white mb-8 max-w-2xl mx-auto">Ready to Scale Your Success?</h2>
          <p className="text-xl text-white/80 mb-12 max-w-[65ch] mx-auto">
            Our discovery calls aren't sales pitches. They are deep-dives into your current systems to find hidden revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button variant="secondary" className="px-12 py-5 text-lg">Book Discovery Call</Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="px-12 py-5 text-lg border-white text-white hover:bg-white hover:text-brand-primary">Explore Solutions</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Internal Sub-components
const ValueCard = ({ icon, title, desc }: any) => (
  <div className="p-8 bg-brand-lightGrey rounded-3xl border border-brand-borderGrey hover:border-brand-primary transition-all group">
    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-primary mb-6 shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <h4 className="text-xl font-bold mb-3 text-brand-secondary">{title}</h4>
    <p className="text-sm text-brand-textGrey leading-relaxed max-w-[65ch]">{desc}</p>
  </div>
);

const ProcessCard = ({ num, title, desc, icon }: any) => (
  <div className="relative text-center p-6 group">
    <div className="text-6xl font-black text-brand-secondary/5 absolute -top-4 left-1/2 -translate-x-1/2 group-hover:text-brand-primary/10 transition-colors">{num}</div>
    <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center text-brand-primary shadow-sm relative z-10 border border-brand-borderGrey">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h4 className="text-xl font-bold mb-2 relative z-10 text-brand-secondary">{title}</h4>
    <p className="text-sm text-brand-textGrey leading-relaxed relative z-10 max-w-[65ch]">{desc}</p>
  </div>
);

const ProcessStep = ProcessCard;

const FileText = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
);
