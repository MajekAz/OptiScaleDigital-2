import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Code, Bot, TrendingUp, Monitor, Smartphone, 
  Zap, Search, Layers, RefreshCw, PenTool, ShoppingCart, 
  ShieldCheck, CheckCircle2, Clock, Workflow, Database, 
  Target, BarChart3, MousePointer2, Globe
} from 'lucide-react';
import { Button } from '../components/Button';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';

export const Services: React.FC = () => {
  return (
    <div className="w-full">
      <SEO 
        title="Our Services | OptiScale Digital - Web, AI & Marketing UK"
        description="Comprehensive digital infrastructure for UK businesses. High-performance Web Design, custom AI Automation, and data-driven Digital Marketing."
      />

      {/* 1. Hero Section */}
      <section className="relative py-24 lg:py-40 bg-brand-secondary text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.services.heroBg} 
            alt="Strategic Technology" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-secondary via-brand-secondary/90 to-brand-secondary"></div>
        </div>
        <div className="container relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-8">
            Growth Infrastructure for UK Firms
          </div>
          <h1 className="text-h1 mb-6">
            Strategic Solutions. <br /><span className="text-brand-primary">Measurable Growth.</span>
          </h1>
          <p className="text-xl text-brand-textGrey mb-12 max-w-2xl mx-auto">
            We engineer high-performance digital assets that solve operational bottlenecks and maximize revenue. Our services are built to work in synergy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="primary" className="px-10 py-5 text-lg">Get a Proposal</Button>
            </Link>
            <Link to="/booking">
              <Button variant="outline" className="px-10 py-5 text-lg border-white/20 text-white hover:bg-white/10 hover:border-white">
                Book a Discovery Call
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Services Grid */}
      <section className="py-section bg-white border-b border-brand-borderGrey">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <ServiceOverviewCard 
              icon={<Code size={32} />}
              title="Web Design"
              description="High-performance, bespoke React and WordPress sites built for UK speed and conversion."
              link="#web-design"
            />
            <ServiceOverviewCard 
              icon={<Bot size={32} />}
              title="AI Automation"
              description="Custom agents and workflows that reclaim 20+ hours of team time every single week."
              link="#ai-automation"
            />
            <ServiceOverviewCard 
              icon={<TrendingUp size={32} />}
              title="Digital Marketing"
              description="Data-led SEO and PPC campaigns that prioritise revenue over vanity metrics."
              link="#digital-marketing"
            />
          </div>
        </div>
      </section>

      {/* 3. Website Design Section */}
      <section id="web-design" className="py-section bg-brand-lightGrey">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-rose-500 font-bold uppercase tracking-widest text-xs">The Friction</span>
              <h2 className="text-h2 text-brand-secondary mt-2 mb-6">Your Website is Leaking Revenue.</h2>
              <p className="text-lg text-brand-textGrey mb-8">
                Most business sites are slow, cluttered, and fail to guide visitors toward a conversion. In the UK market, a 1-second delay in page load equals a 7% drop in conversions.
              </p>
              <div className="space-y-4 mb-10">
                <DeliverableItem text="Custom React & Next.js Development" />
                <DeliverableItem text="Conversion Rate Optimisation (CRO)" />
                <DeliverableItem text="Technical SEO Core Architecture" />
                <DeliverableItem text="Bank-Grade Security & SSL" />
              </div>
              <Link to="/services/web-design">
                <Button variant="outline">Learn More About Web Design</Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <DeliverableCard icon={<Monitor />} title="Blazing Speed" desc="Pages load in <1s." />
              <DeliverableCard icon={<Smartphone />} title="Mobile-First" desc="Native-like UX." />
              <DeliverableCard icon={<Search />} title="Search Ready" desc="Rank higher by default." />
              <DeliverableCard icon={<Layers />} title="UX Focused" desc="Guided user paths." />
            </div>
          </div>
        </div>
      </section>

      {/* 4. AI Automation Section */}
      <section id="ai-automation" className="py-section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center flex-row-reverse">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-1 gap-6">
                <OpportunityCard 
                  title="Lead Nurture Bots" 
                  desc="Qualify leads and book calls on your calendar 24/7 without human intervention."
                />
                <OpportunityCard 
                  title="Zero-Touch CRM Sync" 
                  desc="Automatically sync data between your email, Slack, and HubSpot/Salesforce."
                />
                <OpportunityCard 
                  title="Document Intelligence" 
                  desc="AI that reads, extracts, and categorises data from invoices and contracts."
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-brand-accent font-bold uppercase tracking-widest text-xs">The Intelligent Solution</span>
              <h2 className="text-h2 text-brand-secondary mt-2 mb-6">Operational Drag is Optional.</h2>
              <p className="text-lg text-brand-textGrey mb-8">
                Your team is likely losing 40% of their day to manual data entry and repetitive support queries. We implement "Digital Employees" that handle the drudgery with perfect precision.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <h4 className="font-bold text-brand-secondary text-2xl">24/7</h4>
                  <p className="text-sm text-brand-textGrey">Availability</p>
                </div>
                <div>
                  <h4 className="font-bold text-brand-secondary text-2xl">0%</h4>
                  <p className="text-sm text-brand-textGrey">Error Rate</p>
                </div>
              </div>
              <Link to="/services/ai-automation">
                <Button variant="outline">Explore AI Solutions</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Digital Marketing Section */}
      <section id="digital-marketing" className="py-section bg-brand-lightGrey">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-primary font-bold uppercase tracking-widest text-xs">Growth Positioning</span>
            <h2 className="text-h2 text-brand-secondary mt-2 mb-6">Marketing That Pays for Itself.</h2>
            <p className="text-lg text-brand-textGrey">
              We don't focus on "likes" or impressions. We build a predictable funnel that converts high-intent traffic into qualified sales opportunities.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <MarketingFunnelStep 
              icon={<Search />} 
              step="Traffic" 
              desc="Technical SEO & Performance PPC to capture high-intent users." 
            />
            <MarketingFunnelStep 
              icon={<MousePointer2 />} 
              step="Leads" 
              desc="Optimized landing pages and AI qualifiers that capture data." 
            />
            <MarketingFunnelStep 
              icon={<TrendingUp />} 
              step="Revenue" 
              desc="Closed-loop reporting showing exactly where your ROI comes from." 
            />
          </div>
          <div className="flex justify-center">
            <Link to="/services/digital-marketing">
              <Button variant="outline">View Marketing Packages</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Synergy Section */}
      <section className="py-section bg-brand-secondary text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-h2 mb-6">The OptiScale Growth Loop</h2>
              <p className="text-lg text-brand-textGrey mb-10">
                True scale happens when your services work in synergy. Our "system-based" growth model ensures your infrastructure supports your marketing, and your AI handles the volume.
              </p>
              <div className="space-y-6">
                <SynergyBox 
                  title="Web + Marketing" 
                  desc="SEO-first architecture means your marketing budget goes 2x further with higher quality scores." 
                />
                <SynergyBox 
                  title="Marketing + AI" 
                  desc="AI agents close the gap between a click and a consultation, ensuring zero leads go cold." 
                />
                <SynergyBox 
                  title="AI + Web" 
                  desc="Smart websites that adapt to user behavior to increase conversion rates in real-time." 
                />
              </div>
            </div>
            <div className="relative">
              <div className="bg-brand-primary/10 border border-brand-primary/20 p-12 rounded-[3rem] text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center shadow-xl">
                    <Target size={40} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Unified Strategy</h3>
                <p className="text-brand-textGrey leading-relaxed">
                  Most businesses hire 3 different agencies for these tasks. We provide one unified technical strategy, reducing friction and maximizing ROI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA Section */}
      <section className="py-24 bg-brand-primary relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <h2 className="text-h2 text-white mb-8">Stop Leaving Revenue on the Table.</h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Our discovery calls aren't sales pitches—they're technical audits. Let's find the bottlenecks in your business today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="secondary" className="px-12 py-5 text-lg">Claim Your Free Audit</Button>
            </Link>
            <Link to="/booking">
              <Button variant="outline" className="px-12 py-5 text-lg border-white text-white hover:bg-white hover:text-brand-primary">Schedule Call</Button>
            </Link>
          </div>
          <p className="mt-8 text-white/60 text-sm font-medium">
            Join 150+ UK businesses scaling with OptiScale.
          </p>
        </div>
      </section>
    </div>
  );
};

// Sub-components
const ServiceOverviewCard: React.FC<{icon: any, title: string, description: string, link: string}> = ({ icon, title, description, link }) => (
  <a href={link} className="group p-8 bg-brand-lightGrey rounded-3xl border border-brand-borderGrey hover:border-brand-primary transition-all shadow-sm hover:shadow-xl">
    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-brand-secondary">{title}</h3>
    <p className="text-brand-textGrey text-sm mb-6 leading-relaxed">{description}</p>
    <div className="flex items-center gap-2 text-brand-primary font-bold text-xs tracking-widest uppercase">
      Learn More <ArrowRight size={14} />
    </div>
  </a>
);

const DeliverableItem: React.FC<{text: string}> = ({ text }) => (
  <div className="flex items-center gap-3 text-brand-secondary font-medium">
    <CheckCircle2 size={20} className="text-brand-primary" /> {text}
  </div>
);

const DeliverableCard: React.FC<{icon: any, title: string, desc: string}> = ({ icon, title, desc }) => (
  <div className="p-6 bg-white rounded-2xl border border-brand-borderGrey shadow-sm">
    <div className="text-brand-primary mb-4">{React.cloneElement(icon, { size: 28 })}</div>
    <h4 className="font-bold text-brand-secondary text-sm mb-1">{title}</h4>
    <p className="text-xs text-brand-textGrey">{desc}</p>
  </div>
);

const OpportunityCard: React.FC<{title: string, desc: string}> = ({ title, desc }) => (
  <div className="p-8 bg-brand-lightGrey rounded-3xl border border-brand-borderGrey">
    <h4 className="text-lg font-bold text-brand-secondary mb-3">{title}</h4>
    <p className="text-brand-textGrey text-sm leading-relaxed">{desc}</p>
  </div>
);

const MarketingFunnelStep: React.FC<{icon: any, step: string, desc: string}> = ({ icon, step, desc }) => (
  <div className="text-center">
    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-primary shadow-md border border-brand-borderGrey">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h4 className="text-xl font-bold mb-2 text-brand-secondary">{step}</h4>
    <p className="text-brand-textGrey text-sm leading-relaxed px-4">{desc}</p>
  </div>
);

const SynergyBox: React.FC<{title: string, desc: string}> = ({ title, desc }) => (
  <div className="flex gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
    <div className="shrink-0 pt-1">
      <Zap size={20} className="text-brand-primary" />
    </div>
    <div>
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-sm text-brand-textGrey leading-relaxed">{desc}</p>
    </div>
  </div>
);
