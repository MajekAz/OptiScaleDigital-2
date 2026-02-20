import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { 
  Bot, MessageSquare, Workflow, Cpu, Database, 
  ShieldCheck, Zap, ArrowRight, CheckCircle2, 
  BarChart, Users, Clock 
} from 'lucide-react';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';

export const ServiceAI: React.FC = () => {
  return (
    <div className="w-full">
      <SEO 
        title="AI Automation UK | Intelligent Business Workflows"
        description="Reduce operational overheads with custom AI agents and intelligent business automation."
      />

      {/* 1. Hero with Service Promise */}
      <section className="relative py-24 lg:py-40 bg-brand-secondary text-white overflow-hidden">
        <div className="container relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold uppercase tracking-widest mb-8">
            The Digital Workforce
          </div>
          <h1 className="text-h1 mb-6 max-w-3xl mx-auto">
            Work Less. <span className="text-brand-accent">Earn More.</span>
          </h1>
          <p className="text-xl text-brand-textGrey mb-12 max-w-[65ch] mx-auto">
            We deploy "Digital Employees" that handle your repetitive tasks 24/7 with 100% precision and zero burnout.
          </p>
          <div className="flex justify-center">
            <Link to="/contact">
              <Button variant="primary" className="px-12 py-5 text-lg bg-brand-accent hover:bg-emerald-600 text-brand-secondary border-none">Request Live Demo</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Problem → Solution Narrative */}
      <section className="py-section bg-white">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-brand-primary font-bold uppercase tracking-widest text-xs">The Problem</span>
              <h2 className="text-h3 text-brand-secondary mt-2 mb-6 max-w-md">Manual Labor is Stifling Your Growth.</h2>
              <p className="text-brand-textGrey mb-6 leading-relaxed max-w-[65ch]">
                Your best team members are losing 40% of their day to data entry, lead follow-ups, and repetitive support queries. This "operational drag" costs UK businesses billions annually.
              </p>
            </div>
            <div className="bg-brand-lightGrey p-12 rounded-[2.5rem] border border-brand-accent/20 shadow-xl">
              <span className="text-brand-accent font-bold uppercase tracking-widest text-xs">The Intelligent Solution</span>
              <h2 className="text-h3 text-brand-secondary mt-2 mb-6 max-w-md">Custom Intelligent Workflows.</h2>
              <p className="text-brand-textGrey mb-8 leading-relaxed max-w-[65ch]">
                We implement AI agents that integrate directly with your CRM, Slack, and Email to automate lead nurture, documentation, and reporting.
              </p>
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent">
                   <Clock size={24} />
                </div>
                <div>
                   <p className="font-bold text-brand-secondary">Reclaim 20+ Hours</p>
                   <p className="text-xs text-brand-textGrey uppercase font-bold">Per Team Member Weekly</p>
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
            <h2 className="text-h2 text-brand-secondary">The AI Suite</h2>
            <p className="text-brand-textGrey mt-6 max-w-[65ch] mx-auto">Enterprise-grade tools for SME scalability.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Deliverable icon={<MessageSquare />} title="Smart Lead Agents" desc="AI-powered chatbots that qualify leads and book calls on your calendar 24/7." />
            <Deliverable icon={<Workflow />} title="Zero-Touch Syncing" desc="Seamless data flow between HubSpot, Salesforce, and internal spreadsheets." />
            <Deliverable icon={<Database />} title="Document Intel" desc="Agents that read, categorize, and extract data from invoices and contracts." />
            <Deliverable icon={<BarChart />} title="Auto-Reporting" desc="Real-time dashboard generation fueled by automated data harvesting." />
            <Deliverable icon={<Users />} title="HR Automation" desc="Automated onboarding and internal query handling for growing teams." />
            <Deliverable icon={<ShieldCheck />} title="Privacy-First AI" desc="On-premise or secure cloud models that never share your trade secrets." />
          </div>
          <div className="mt-20 text-center">
            <Link to="/contact">
              <Button variant="primary" className="px-10 py-5 bg-brand-accent hover:bg-emerald-600 text-brand-secondary border-none">
                Request a Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Process Steps */}
      <section className="py-section bg-brand-secondary text-white">
        <div className="container text-center">
          <h2 className="text-h2 mb-24 max-w-3xl mx-auto">The Road to 100% Efficiency</h2>
          <div className="grid md:grid-cols-4 gap-12">
            <Step n="1" t="Audit" d="Mapping every manual step in your sales and ops cycles." />
            <Step n="2" t="Architect" d="Designing the logic and API integration pathways." />
            <Step n="3" t="Train" d="Feeding the AI your specific business logic and data." />
            <Step n="4" t="Deploy" d="Full rollout with 14 days of live technical hyper-care." />
          </div>
        </div>
      </section>

      {/* 5. Benefits */}
      <section className="py-section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <Benefit icon={<Zap />} title="Hyper-Scalability" desc="Increase your capacity 10x without increasing headcount costs." />
            <Benefit icon={<ShieldCheck />} title="Zero Error Rate" desc="AI doesn't get tired. It processes data perfectly, every single time." />
            <Benefit icon={<Clock />} title="90-Second Response" desc="Close leads while they're hot, not 12 hours later." />
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 bg-brand-accent text-brand-secondary text-center">
        <div className="container">
          <h2 className="text-h2 mb-8 max-w-2xl mx-auto">Ready to Automate Your ROI?</h2>
          <p className="text-xl text-brand-secondary/80 mb-12 max-w-[65ch] mx-auto">Schedule a strategy session to see how AI fits your specific business model.</p>
          <Link to="/contact">
            <Button variant="secondary" className="px-12 py-5 text-lg">Book Strategy Session</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const Deliverable = ({ icon, title, desc }: any) => (
  <div className="p-10 bg-white rounded-3xl border border-brand-borderGrey hover:border-brand-accent transition-all shadow-sm hover:shadow-xl group">
    <div className="text-brand-accent mb-6 transition-transform group-hover:scale-110">{React.cloneElement(icon, { size: 36 })}</div>
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
    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-brand-accent shadow-md">
      {React.cloneElement(icon, { size: 36 })}
    </div>
    <h4 className="text-2xl font-bold mb-3 text-brand-secondary">{title}</h4>
    <p className="text-brand-textGrey leading-relaxed max-w-[65ch]">{desc}</p>
  </div>
);
