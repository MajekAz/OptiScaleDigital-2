import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Code, Bot, TrendingUp, ShieldCheck, Zap, 
  Star, CheckCircle2, Search, FileText, Rocket, BarChart3, 
  Target 
} from 'lucide-react';
import { Button } from '../components/Button';
import { NewsletterForm } from '../components/NewsletterForm';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  return (
    <div className="w-full">
      <SEO 
        title="OptiScale Digital | UK Web Design & AI Automation Agency"
        description="Scale your UK business with high-performance web design and custom AI automation. We build the infrastructure for your success."
      />

      {/* 1. Hero Section */}
      <section className="relative min-h-[95vh] flex items-center bg-brand-secondary text-white py-section overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.home.heroBg} 
            alt="Growth background" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-brand-secondary/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary via-brand-secondary/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-transparent to-transparent"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-[1000px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-8">
              <Star size={14} className="fill-brand-primary" /> UK's Data-Driven Growth Agency
            </div>
            <h1 className="text-h1 mb-8 max-w-4xl mx-auto">
              Scale Smarter. <br />
              <span className="gradient-text">Outpace the Competition.</span>
            </h1>
            <p className="text-xl text-brand-textGrey mb-12 max-w-[65ch] mx-auto">
              We blend high-performance Web Design, AI Automation, and Digital Marketing to turn your digital presence into a 24/7 growth engine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button variant="primary" className="px-10 py-5 text-lg gap-2">
                  Book a Free Consultation <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="ghost" className="px-10 py-5 text-lg text-white hover:text-brand-accent">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services Overview */}
      <section className="py-section bg-white">
        <div className="container">
          <div className="text-center mb-24">
            <h2 className="text-h2 text-brand-secondary mb-6">Our Core Services</h2>
            <p className="text-lg text-brand-textGrey max-w-[65ch] mx-auto">
              Integrated technical solutions built to scale operations and maximize revenue.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Code size={32} />}
              title="Web Design"
              description="High-performance, bespoke React and WordPress architectures designed for speed and conversion."
              link="/services/web-design"
            />
            <ServiceCard 
              icon={<Bot size={32} />}
              title="AI Automation"
              description="Custom AI agents and workflows that reclaim 20+ hours of team time every single week."
              link="/services/ai-automation"
            />
            <ServiceCard 
              icon={<TrendingUp size={32} />}
              title="Digital Marketing"
              description="Data-led SEO and PPC campaigns built to deliver measurable ROI, not just traffic."
              link="/services/digital-marketing"
            />
          </div>
        </div>
      </section>

      {/* 3. Why OptiScale */}
      <section className="py-section bg-brand-lightGrey">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <img 
                src={IMAGES.home.feature}
                alt="OptiScale strategic team" 
                className="rounded-[2.5rem] shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-accent p-8 rounded-3xl shadow-xl hidden md:block">
                <p className="text-brand-secondary font-black text-4xl">100%</p>
                <p className="text-brand-secondary/80 text-xs uppercase font-bold tracking-widest">UK-Based Team</p>
              </div>
            </div>
            <div>
              <h2 className="text-h2 mb-8 text-brand-secondary">Trust and Differentiation</h2>
              <div className="space-y-12">
                <WhyItem 
                  icon={<ShieldCheck className="text-brand-primary" />}
                  title="Compliance as Standard"
                  description="We prioritize UK GDPR compliance and bank-grade data security in every line of code we write."
                />
                <WhyItem 
                  icon={<Zap className="text-brand-accent" />}
                  title="Blazing Fast Execution"
                  description="Our lean engineering stack ensures your site loads in milliseconds and your AI responds in real-time."
                />
                <WhyItem 
                  icon={<Target className="text-brand-primary" />}
                  title="Revenue-First Mindset"
                  description="We don't focus on vanity metrics. Every project is measured by its impact on your bottom line."
                />
              </div>
              <div className="mt-16">
                <Link to="/booking">
                  <Button variant="primary" className="px-8 py-4">
                    Book Your Audit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process Overview */}
      <section className="py-section bg-brand-secondary text-white">
        <div className="container">
          <div className="text-center mb-24">
            <h2 className="text-h2 max-w-3xl mx-auto">The OptiScale Growth Framework</h2>
            <p className="text-brand-textGrey mt-6 max-w-[65ch] mx-auto">A proven 4-step roadmap to digital maturity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProcessStep num="01" title="Discover" desc="Deep audit of your current digital infrastructure and bottlenecks." icon={<Search />} />
            <ProcessStep num="02" title="Strategise" desc="Bespoke engineering roadmap with projected ROI and timelines." icon={<FileText />} />
            <ProcessStep num="03" title="Implement" desc="Rapid development and seamless integration into your operations." icon={<Rocket />} />
            <ProcessStep num="04" title="Optimise" desc="Continuous performance monitoring and data-driven scaling." icon={<BarChart3 />} />
          </div>
        </div>
      </section>

      {/* 5. Features & Benefits Section */}
      <section className="py-section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-brand-secondary mb-6">Why Choose OptiScale?</h2>
            <p className="text-lg text-brand-textGrey max-w-[65ch] mx-auto">
              We combine cutting-edge technology with strategic insight to deliver measurable business growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="AI-Driven Efficiency"
              subtitle="Automate the Mundane"
              description="Reclaim your team's time by automating repetitive tasks with custom AI solutions tailored to your business needs."
              benefits={[
                "24/7 Lead Qualification",
                "Automated Data Entry",
                "Smart Customer Support"
              ]}
            />
            <FeatureCard 
              title="High-Performance Design"
              subtitle="Built for Conversion"
              description="We don't just build websites; we engineer digital storefronts that load instantly and turn visitors into loyal customers."
              benefits={[
                "React-Powered Speed",
                "SEO-Optimized Structure",
                "Mobile-First Architecture"
              ]}
            />
            <FeatureCard 
              title="Strategic Growth"
              subtitle="Data-Backed Results"
              description="Leverage our expertise in digital marketing to scale your reach and maximize your return on investment through precision targeting."
              benefits={[
                "Advanced SEO Strategies",
                "PPC Performance Tracking",
                "Conversion Rate Optimization"
              ]}
            />
          </div>
        </div>
      </section>

      {/* 6. AI Powered Consultation Section */}
      <section className="py-section bg-brand-lightGrey">
        <div className="container">
          <NewsletterForm 
            title="AI Powered Consultation" 
            description="Enter your details below to receive an AI-generated growth roadmap for your UK business."
          />
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-24 bg-brand-primary relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <h2 className="text-h2 text-white mb-8 max-w-2xl mx-auto">Ready to Scale Your Business?</h2>
          <p className="text-xl text-white/80 mb-12 max-w-[65ch] mx-auto">
            Book your free digital growth audit today and let's discuss how we can transform your operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button variant="secondary" className="px-12 py-5 text-lg">Book Free Audit</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className="px-12 py-5 text-lg text-white hover:text-brand-navy">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Sub-components
const ServiceCard: React.FC<{icon: any, title: string, description: string, link: string}> = ({ icon, title, description, link }) => (
  <Link to={link} className="group p-8 bg-white rounded-2xl border border-brand-borderGrey hover:border-brand-primary hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
    <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-8 transition-transform group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-brand-secondary">{title}</h3>
    <p className="text-brand-textGrey mb-8 leading-relaxed">{description}</p>
    <div className="flex items-center gap-2 text-brand-primary font-bold text-sm tracking-widest uppercase group-hover:underline underline-offset-4">
      Learn More <ArrowRight size={16} />
    </div>
  </Link>
);

const FeatureCard: React.FC<{title: string, subtitle: string, description: string, benefits: string[]}> = ({ title, subtitle, description, benefits }) => (
  <div className="p-8 bg-brand-lightGrey rounded-2xl border border-brand-borderGrey hover:border-brand-primary hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
    <div className="mb-6">
      <h3 className="text-2xl font-bold text-brand-secondary mb-1">{title}</h3>
      <p className="text-brand-primary font-semibold text-sm uppercase tracking-wider">{subtitle}</p>
    </div>
    <p className="text-brand-textGrey mb-6 leading-relaxed text-sm">{description}</p>
    <ul className="space-y-3">
      {benefits.map((benefit, idx) => (
        <li key={idx} className="flex items-start gap-3 text-sm text-brand-secondary">
          <CheckCircle2 size={18} className="text-brand-accent shrink-0 mt-0.5" />
          <span>{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

const WhyItem: React.FC<{icon: any, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="flex gap-6">
    <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center shrink-0">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <h4 className="text-xl font-bold mb-2 text-brand-secondary">{title}</h4>
      <p className="text-brand-textGrey leading-relaxed max-w-[65ch]">{description}</p>
    </div>
  </div>
);

const ProcessStep: React.FC<{num: string, title: string, desc: string, icon: any}> = ({ num, title, desc, icon }) => (
  <div className="relative text-center p-6 group">
    <div className="text-6xl font-black text-white/5 absolute -top-4 left-1/2 -translate-x-1/2 group-hover:text-brand-primary/10 transition-colors">{num}</div>
    <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl mx-auto mb-6 flex items-center justify-center text-brand-primary relative z-10">
      {React.cloneElement(icon, { size: 30 })}
    </div>
    <h4 className="text-xl font-bold mb-2 relative z-10">{title}</h4>
    <p className="text-sm text-gray-400 leading-relaxed relative z-10">{desc}</p>
  </div>
);
