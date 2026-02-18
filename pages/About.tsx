import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Users, ShieldCheck, Zap } from 'lucide-react';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';

export const About: React.FC = () => {
  return (
    <div className="w-full bg-white transition-colors duration-300">
      <SEO 
        title="About Us | OptiScale Digital"
        description="London-based tech agency transforming UK businesses with AI and web technology."
      />

      {/* Hero */}
      <section className="bg-brand-navy py-24 text-white">
        <div className="container text-center">
          <h1 className="text-h1 mb-6">About <span className="text-brand-cyan">OptiScale</span></h1>
          <p className="text-lead text-gray-300 max-w-2xl mx-auto">We are strategists and engineers passionate about helping UK businesses thrive.</p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-h2 mb-6">Vision to Impact</h2>
              <p className="text-body text-gray-600 leading-relaxed mb-6">
                OptiScale Digital was founded to close the gap between enterprise-level digital capability and growing businesses across the UK.
              </p>
              <p className="text-body text-gray-600 leading-relaxed">
                Today, we serve as trusted advisors to organisations focused on long-term growth, leveraging advanced platforms and AI automation.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img src={IMAGES.about.mission} alt="Our Mission" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div className="text-h2 mb-1">150+</div><div className="text-small opacity-80 uppercase font-bold tracking-widest">Clients</div></div>
            <div><div className="text-h2 mb-1">250%</div><div className="text-small opacity-80 uppercase font-bold tracking-widest">Growth</div></div>
            <div><div className="text-h2 mb-1">3x</div><div className="text-small opacity-80 uppercase font-bold tracking-widest">Avg ROI</div></div>
            <div><div className="text-h2 mb-1">24/7</div><div className="text-small opacity-80 uppercase font-bold tracking-widest">Support</div></div>
          </div>
        </div>
      </section>

      {/* Team/Leadership */}
      <section className="py-section bg-brand-light">
        <div className="container">
          <h2 className="text-h2 text-center mb-16">Meet the Minds</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TeamCard name="David Thorne" role="CEO" />
            <TeamCard name="Sarah Collins" role="Head of Marketing" />
            <TeamCard name="Michael Chang" role="Lead Architect" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section">
        <div className="container text-center">
          <h2 className="text-h2 mb-8">Ready to Scale Your Business?</h2>
          <Link to="/contact"><Button>Get in Touch</Button></Link>
        </div>
      </section>
    </div>
  );
};

const TeamCard: React.FC<{name: string, role: string}> = ({ name, role }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
    <div className="w-24 h-24 bg-brand-blue/10 rounded-full mx-auto mb-6 flex items-center justify-center text-brand-blue font-bold text-h3">{name.charAt(0)}</div>
    <h3 className="text-h4 mb-1">{name}</h3>
    <p className="text-brand-blue font-bold text-small uppercase tracking-widest">{role}</p>
  </div>
);