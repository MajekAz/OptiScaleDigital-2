import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { 
  Search, Target, Mail, BarChart, TrendingUp, Zap, 
  ArrowRight, CheckCircle2, Globe, MousePointer2, ShieldCheck
} from 'lucide-react';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';

export const ServiceMarketing: React.FC = () => {
  return (
    <div className="w-full">
      <SEO 
        title="Digital Marketing UK | SEO & Performance Marketing"
        description="Data-driven marketing strategies built to deliver measurable revenue growth for UK businesses."
      />

      {/* 1. Hero with Service Promise */}
      <section className="relative py-24 lg:py-40 bg-brand-secondary text-white overflow-hidden">
        <div className="container relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-8">
            The Performance Growth Engine
          </div>
          <h1 className="text-h1 mb-6">
            Marketing That <br /><span className="text-brand-primary">Pays For Itself.</span>
          </h1>
          <p className="text-xl text-brand-textGrey mb-12 max-w-2xl mx-auto">
            We don't focus on "likes" or impressions. We focus on leads and sales. Data-driven growth for businesses ready to lead.
          </p>
          <div className="flex justify-center">
            <Link to="/booking">
              <Button variant="primary" className="px-12 py-5 text-lg">Get My Growth Strategy</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Problem → Solution Narrative */}
      <section className="py-section bg-white">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-rose-500 font-bold uppercase tracking-widest text-xs">The Problem</span>
              <h2 className="text-h3 text-brand-secondary mt-2 mb-6">Invisible to Your Ideal Customers.</h2>
              <p className="text-brand-textGrey mb-6 leading-relaxed">
                Your brand is high-quality, but your digital footprint is silent. You're spending money on ads that generate "clicks" but zero measurable revenue. In the UK market, being second is being last.
              </p>
            </div>
            <div className="bg-brand-lightGrey p-12 rounded-[2.5rem] border border-brand-primary/20 shadow-xl">
              <span className="text-brand-primary font-bold uppercase tracking-widest text-xs">The Scalable Solution</span>
              <h2 className="text-h3 text-brand-secondary mt-2 mb-6">Data-Backed Growth Frameworks.</h2>
              <p className="text-brand-textGrey mb-8 leading-relaxed">
                We combine technical SEO precision with aggressive PPC targeting to place your brand in front of customers exactly when they are ready to purchase.
              </p>
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-brand-borderGrey">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                   <TrendingUp size={24} />
                </div>
                <div>
                   <p className="font-bold text-brand-secondary">Targeted Intent</p>
                   <p className="text-xs text-brand-textGrey uppercase font-bold">Higher Quality Leads Only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deliverables List */}
      <section className="py-section bg-brand-lightGrey">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-brand-secondary">Growth Deliverables</h2>
            <p className="text-brand-textGrey mt-4">Full-funnel marketing architecture for high-growth firms.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Deliverable icon={<Search />} title="Technical SEO" desc="Climb to Page 1 with rigorous on-page, off-page, and technical audits." />
            <Deliverable icon={<Target />} title="High-ROI PPC" desc="Laser-targeted Google and Meta ads that focus on conversion, not clicks." />
            <Deliverable icon={<Mail />} title="Lead Nurture" desc="Automated email and SMS sequences that turn cold browsers into loyal buyers." />
            <Deliverable icon={<Globe />} title="Content Authority" desc="Strategy-led articles and whitepapers that build brand trust and SEO weight." />
            <Deliverable icon={<BarChart />} title="Live ROI Dashboards" desc="Transparent, real-time reporting showing exactly where your budget goes." />
            <Deliverable icon={<MousePointer2 />} title="CPA Optimization" desc="Continuous A/B testing to lower your cost-per-acquisition month over month." />
          </div>
        </div>
      </section>

      {/* 4. Process Steps */}
      <section className="py-section bg-brand-secondary text-white">
        <div className="container text-center">
          <h2 className="text-h2 mb-16">The Road to Market Dominance</h2>
          <div className="grid md:grid-cols-4 gap-12">
            <Step n="1" t="Audit" d="Mapping competitors and current conversion leaks." />
            <Step n="2" t="Blueprint" d="Building a bespoke growth roadmap focused on your KPIs." />
            <Step n="3" t="Execute" d="Launching data-backed campaigns across key channels." />
            <Step n="4" t="Optimise" d="Continuous refinement to maximize your monthly ROI." />
          </div>
        </div>
      </section>

      {/* 5. Benefits */}
      <section className="py-section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <Benefit icon={<MousePointer2 />} title="High Intent" desc="We focus on customers ready to buy, minimizing wasted spend." />
            <Benefit icon={<ShieldCheck />} title="Full Transparency" desc="No hidden costs. You see the same metrics we do, in real-time." />
            <Benefit icon={<TrendingUp />} title="Compounding Value" desc="SEO and brand authority that builds momentum every single month." />
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 bg-brand-primary text-center">
        <div className="container">
          <h2 className="text-h2 text-white mb-8">Ready to Own Your Market?</h2>
          <p className="text-xl text-white/80 mb-12 max-w-xl mx-auto">Get a free digital footprint analysis today and see where you're losing to competitors.</p>
          <Link to="/contact">
            <Button variant="secondary" className="px-12 py-5 text-lg">Claim Free Strategy</Button>
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
    <p className="text-brand-textGrey text-sm leading-relaxed">{desc}</p>
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
    <p className="text-brand-textGrey leading-relaxed">{desc}</p>
  </div>
);
