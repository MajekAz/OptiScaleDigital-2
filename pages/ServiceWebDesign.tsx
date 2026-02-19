import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { 
  Monitor, Smartphone, Zap, Search, Layers, RefreshCw, 
  PenTool, ShoppingCart, ArrowRight, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';

export const ServiceWebDesign: React.FC = () => {
  return (
    <div className="w-full">
      <SEO 
        title="Web Design London | High-Performance Business Websites"
        description="Conversion-focused website design and development services built for the UK market."
      />

      {/* 1. Hero with Service Promise */}
      <section className="relative py-24 lg:py-40 bg-brand-secondary text-white overflow-hidden">
        <div className="container relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-8">
            The Digital Flagship Store
          </div>
          <h1 className="text-h1 mb-6">
            Websites That <span className="text-brand-primary">Convert.</span>
          </h1>
          <p className="text-xl text-brand-textGrey mb-12 max-w-2xl mx-auto">
            We build high-performance digital infrastructure designed to capture leads and outshine competitors in the crowded UK market.
          </p>
          <div className="flex justify-center">
            <Link to="/booking">
              <Button variant="primary" className="px-12 py-5 text-lg">Claim Your Free Design Audit</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Problem → Solution Narrative */}
      <section className="py-section bg-white">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-rose-500 font-bold uppercase tracking-widest text-xs">The Friction</span>
              <h2 className="text-h3 text-brand-secondary mt-2 mb-6">Your Website is Leaking Revenue.</h2>
              <p className="text-brand-textGrey mb-6 leading-relaxed">
                Most business sites are slow, cluttered, and fail to guide visitors toward a conversion. In the UK market, a 1-second delay in page load equals a 7% drop in conversions.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-2 text-rose-500 font-medium">
                   <ArrowRight size={16} /> High Bounce Rates
                </li>
                <li className="flex items-center gap-2 text-rose-500 font-medium">
                   <ArrowRight size={16} /> Poor Mobile Experience
                </li>
                <li className="flex items-center gap-2 text-rose-500 font-medium">
                   <ArrowRight size={16} /> Zero Lead Generation
                </li>
              </ul>
            </div>
            <div className="bg-brand-lightGrey p-12 rounded-[2.5rem] border border-brand-primary/20 shadow-xl">
              <span className="text-brand-accent font-bold uppercase tracking-widest text-xs">The Growth Engine</span>
              <h2 className="text-h3 text-brand-secondary mt-2 mb-6">OptiScale Performance Architecture.</h2>
              <p className="text-brand-textGrey mb-8 leading-relaxed">
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
          <div className="text-center mb-16">
            <h2 className="text-h2 text-brand-secondary">What You Get</h2>
            <p className="text-brand-textGrey mt-4">Complete end-to-end digital deliverables.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Deliverable icon={<Monitor />} title="Custom React Frontends" desc="Blazing fast navigation with no page refreshes for superior UX." />
            <Deliverable icon={<Smartphone />} title="Mobile-First UI" desc="Seamless experiences for the 60%+ of UK mobile-based traffic." />
            <Deliverable icon={<Search />} title="SEO Core Setup" desc="Semantic markup and technical SEO built-in from the first line of code." />
            <Deliverable icon={<Layers />} title="UX Prototyping" desc="Interactive blueprints focused on heatmaps and user flow analysis." />
            <Deliverable icon={<RefreshCw />} title="Continuous Care" desc="24/7 security updates and performance optimization to stay competitive." />
            <Deliverable icon={<PenTool />} title="Brand Visuals" desc="High-end, bespoke design that builds instant trust and authority." />
          </div>
        </div>
      </section>

      {/* 4. Process Steps */}
      <section className="py-section bg-brand-secondary text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-h2">Building Your Digital Asset</h2>
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

      {/* 6. CTA */}
      <section className="py-24 bg-brand-primary text-center">
        <div className="container">
          <h2 className="text-h2 text-white mb-8">Stop Settling for "Just a Website".</h2>
          <p className="text-xl text-white/80 mb-12 max-w-xl mx-auto">Build a performance engine that works for you 24/7.</p>
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
