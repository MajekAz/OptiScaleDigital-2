import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { CheckCircle, Heart, Award, Zap, Users, Lightbulb } from 'lucide-react';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';

export const About: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-brand-dark transition-colors duration-300">
      <SEO 
        title="About Us | OptiScale Digital - London Tech Agency"
        description="Meet OptiScale Digital, a London-based team of developers and strategists dedicated to transforming UK businesses with AI and modern web technology."
        keywords="About OptiScale, Digital Agency Team, UK Tech Agency, London Web Developers, Our Mission"
      />

      {/* SECTION 1: Hero */}
      <section className="relative py-24 lg:py-32 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.about.heroBg} 
            alt="About OptiScale Team" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/80 to-brand-light/10 dark:to-brand-dark/10"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            About <span className="text-brand-cyan">OptiScale Digital</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            We are a team of strategists, designers, and engineers passionate about helping UK businesses thrive in the digital age.
          </p>
        </div>
      </section>

      {/* SECTION 2: Mission */}
      <section className="py-20 dark:bg-brand-dark">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-brand-navy dark:text-white">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Founded in London, OptiScale Digital was born from a desire to bridge the gap between complex technology and practical business growth. We believe that AI and advanced web technologies shouldn't be reserved for tech giants.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Our mission is to democratize access to high-end digital tools, enabling SMEs across the UK to compete on a global scale while maintaining local relevance and compliance.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {['UK Based', 'GDPR Compliant', 'Results Driven', 'Tech Forward'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-brand-navy dark:text-gray-200 font-medium">
                    <CheckCircle size={20} className="text-brand-cyan" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-2xl transform rotate-3"></div>
              <img 
                src={IMAGES.about.mission}
                alt="Meeting in a modern office" 
                className="relative rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Core Values */}
      <section className="py-20 bg-brand-navy text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">The principles that guide every pixel we design and every line of code we write.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
             <ValueCard icon={<Heart />} title="Client First" desc="We measure our success by your growth." />
             <ValueCard icon={<Lightbulb />} title="Innovation" desc="We constantly explore emerging tech." />
             <ValueCard icon={<Award />} title="Excellence" desc="Good enough is not in our vocabulary." />
             <ValueCard icon={<Users />} title="Transparency" desc="No jargon, no hidden fees. Just results." />
          </div>
        </div>
      </section>

      {/* SECTION 4: Stats */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <Stat number="150+" label="Clients Served" />
            <Stat number="98%" label="Retention Rate" />
            <Stat number="3x" label="Average ROI" />
            <Stat number="24/7" label="Support" />
          </div>
        </div>
      </section>

      {/* SECTION 5: Meet the Team */}
      <section className="py-20 bg-white dark:bg-brand-dark transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-4">Meet the Leadership</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">The minds behind the strategy.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TeamMember 
              image={IMAGES.about.team.david}
              name="David Thorne"
              role="Founder & CEO"
            />
            <TeamMember 
              image={IMAGES.about.team.sarah}
              name="Sarah Collins"
              role="Head of Digital Marketing"
            />
            <TeamMember 
              image={IMAGES.about.team.michael}
              name="Michael Chang"
              role="Lead AI Architect"
            />
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA */}
      <section className="py-20 bg-brand-light dark:bg-slate-900 text-center border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-6">Let's Build Something Great Together</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you need a new website, better SEO, or custom AI solutions, our team is ready to help you win.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/contact">
              <Button>Get in Touch</Button>
            </Link>
            <Link to="/services">
              <Button variant="outline">View Services</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const Stat: React.FC<{number: string, label: string}> = ({ number, label }) => (
  <div>
    <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{number}</div>
    <div className="text-blue-100 font-medium">{label}</div>
  </div>
);

const ValueCard: React.FC<{icon: React.ReactNode, title: string, desc: string}> = ({ icon, title, desc }) => (
  <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10 text-center">
    <div className="text-brand-cyan mb-4 flex justify-center scale-150">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{desc}</p>
  </div>
);

const TeamMember: React.FC<{image: string, name: string, role: string}> = ({ image, name, role }) => (
  <div className="group text-center">
    <div className="relative overflow-hidden rounded-2xl mb-4 shadow-lg w-full aspect-[4/5]">
      <img src={image} alt={name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
        <span className="text-white font-medium">Connect on LinkedIn</span>
      </div>
    </div>
    <h3 className="text-xl font-bold text-brand-navy dark:text-white">{name}</h3>
    <p className="text-brand-blue dark:text-brand-cyan font-medium">{role}</p>
  </div>
);