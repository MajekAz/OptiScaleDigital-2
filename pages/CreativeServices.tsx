import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Palette, 
  Facebook, 
  Instagram, 
  PenTool, 
  Presentation, 
  Zap,
  Quote,
  Sparkles,
  BarChart3,
  Globe
} from 'lucide-react';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { IMAGES } from '../assets';
import { trackServicePageView, trackPricingCta } from '../utils/analytics';

const services = [
  {
    id: 'flyer',
    title: 'High-Impact Flyer & Print Design',
    hook: 'Stop the scroll in the physical world.',
    description: "We design tactile marketing assets that command attention. From high-end corporate brochures to event flyers, we balance white space with bold typography to ensure your message isn't just seen—it’s remembered. Perfect for trade shows, mailers, and local activations.",
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=2070&auto=format&fit=crop',
    icon: <Palette size={24} />
  },
  {
    id: 'social-banners',
    title: 'Facebook & LinkedIn Header Strategy',
    hook: 'Your digital billboard, optimized.',
    description: "Your header is the first thing a lead sees. We design high-conversion banners for Facebook and LinkedIn that establish instant authority. We align your value proposition with professional imagery to turn profile visitors into warm leads within 3 seconds.",
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2074&auto=format&fit=crop',
    icon: <Facebook size={24} />
  },
  {
    id: 'instagram',
    title: 'Strategic Instagram & Social Assets',
    hook: 'Cohesive storytelling for every grid.',
    description: "Don't just post; perform. We create bespoke static posts and high-retention carousels designed to stop the thumb-scroll. Every asset is engineered using color psychology and layout patterns proven to increase engagement and save your brand from \"grid-clutter.\"",
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2074&auto=format&fit=crop',
    icon: <Instagram size={24} />
  },
  {
    id: 'logo',
    title: 'Signature Logo & Brand Identity',
    hook: 'Build a legacy, not just a label.',
    description: "A logo is the heartbeat of your business. Our identity kits include scalable vector logos, custom color palettes, and typography systems that work across every medium. We build the visual foundation that allows your brand to scale from startup to industry leader.",
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
    icon: <PenTool size={24} />
  },
  {
    id: 'ads',
    title: 'Performance Ad Creative (Meta/Google)',
    hook: 'Design that lowers your CPA.',
    description: "We bridge the gap between \"pretty\" and \"profitable.\" Our ad creatives are built on A/B testing data, focusing on clear hierarchies and \"Pattern Interrupt\" visuals. Whether it’s Retargeting display ads or Top-of-Funnel Meta creative, we design to drive the click.",
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    icon: <Zap size={24} />
  },
  {
    id: 'decks',
    title: 'Investor-Ready Pitch Decks',
    hook: 'Win the room before you finish the presentation.',
    description: "We transform data-heavy spreadsheets into compelling visual narratives. Our presentation design service covers PowerPoint, Keynote, and Canva, ensuring your pitch is clear, persuasive, and professionally polished. High-stakes design for high-stakes meetings.",
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop',
    icon: <Presentation size={24} />
  }
];

export const CreativeServices: React.FC = () => {
  useEffect(() => {
    trackServicePageView('Creative Services', '/services/creative');
  }, []);

  return (
    <div className="w-full bg-white text-gray-900 selection:bg-brand-primary/10">
      <SEO 
        title="Creative Services | High-Impact Design | OptiScale Digital"
        description="Professional graphic design services for a digital-first world. From logos to ad creatives, we build visuals that drive revenue."
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-brand-secondary text-white py-section overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.services.heroBg}
            alt="Design Studio Background"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-secondary/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary via-brand-secondary/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-transparent to-transparent"></div>
        </div>
        
        <div className="container relative z-10 text-center">
          <div className="max-w-[1000px] mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-8">
              <Sparkles size={14} className="fill-brand-primary" /> New: Professional Creative Suite
            </div>
            <h1 className="text-h1 mb-8 max-w-4xl mx-auto leading-tight">
              High-Impact Design for a <br />
              <span className="gradient-text">Digital-First World.</span>
            </h1>
            <p className="text-xl text-brand-textGrey mb-12 max-w-[65ch] mx-auto leading-relaxed">
              Where AI-driven strategy meets world-class creative. We build the visuals that stop the scroll and drive the click.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/design-brief" className="w-full sm:w-auto">
                <Button variant="primary" className="px-10 py-5 text-lg gap-2 w-full">
                  Start Your Design Brief <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="ghost" className="px-10 py-5 text-lg text-white hover:text-brand-accent w-full">
                  Get a Custom Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Service Grid */}
      <section className="py-section relative">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {services.map((service) => (
              <div 
                key={service.id}
                className="group relative bg-gray-50 rounded-[2rem] border border-gray-100 overflow-hidden transition-all duration-500 hover:bg-white hover:border-brand-primary/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-10">
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center border border-brand-primary/20">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-primary transition-colors tracking-tight text-gray-900">{service.title}</h3>
                  <p className="text-brand-accent font-bold text-sm mb-4 italic">"{service.hook}"</p>
                  <p className="text-gray-600 leading-relaxed font-light text-sm lg:text-base">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The OptiScale Advantage Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tighter text-gray-900">The OptiScale Advantage</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:border-brand-primary/50 transition-all duration-300 group shadow-sm hover:shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">AI-Accelerated Workflows</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">We use cutting-edge generative tools to provide 2x faster turnaround times without sacrificing quality.</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:border-brand-primary/50 transition-all duration-300 group shadow-sm hover:shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Data-Backed Design</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">Our visuals aren't just art; they are engineered for conversion based on UI/UX best practices.</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:border-brand-primary/50 transition-all duration-300 group shadow-sm hover:shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Global Standards</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">High-resolution, print-ready, and mobile-optimized assets delivered in every format you need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-section relative overflow-hidden">
        <div className="container">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter text-gray-900">Our Creative Workflow</h2>
            <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">Streamlined delivery without compromising on world-class quality.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 lg:gap-20 relative">
            <ProcessCard 
              step="01"
              title="Briefing"
              description="We dive deep into your brand goals, target audience, and specific design requirements."
              icon={<Quote size={32} />}
            />
            <ProcessCard 
              step="02"
              title="Design"
              description="Our world-class creatives build your assets, blending AI efficiency with human artistry."
              icon={<Palette size={32} />}
            />
            <ProcessCard 
              step="03"
              title="Delivery"
              description="Final revisions are polished and high-resolution files are delivered ready for launch."
              icon={<Zap size={32} />}
            />
          </div>
        </div>
      </section>

      {/* Sticky Footer Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-brand-primary py-5 px-8 z-50 shadow-[0_-10px_40px_rgba(37,99,235,0.2)]">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <p className="text-white font-bold text-lg lg:text-xl tracking-tight">Ready to start your creative project?</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Link 
              to="/booking" 
              onClick={() => trackPricingCta('Book a Call', 'Creative Services Sticky Bar')}
              className="flex-1 sm:flex-none"
            >
              <Button variant="secondary" className="w-full sm:w-auto px-8 py-3 rounded-full !bg-white !text-brand-primary hover:!bg-gray-100 shadow-none border-none">Book a Call</Button>
            </Link>
            <Link 
              to="/contact" 
              onClick={() => trackPricingCta('Get a Quote', 'Creative Services Sticky Bar')}
              className="flex-1 sm:flex-none"
            >
              <Button variant="ghost" className="w-full sm:w-auto px-8 py-3 rounded-full text-white hover:bg-white/10 border border-white/30">Get a Quote</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProcessCard: React.FC<{step: string, title: string, description: string, icon: any}> = ({ step, title, description, icon }) => (
  <div className="relative z-10 bg-gray-50 p-12 rounded-[3rem] border border-gray-100 text-center hover:border-brand-primary/50 transition-all duration-500 group">
    <div className="text-9xl font-black text-gray-100 absolute -top-10 left-1/2 -translate-x-1/2 group-hover:text-brand-primary/10 transition-colors duration-700">{step}</div>
    <div className="w-24 h-24 bg-brand-primary/10 rounded-[2rem] mx-auto mb-10 flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-brand-primary/20">
      {icon}
    </div>
    <h3 className="text-3xl font-bold mb-6 tracking-tight text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed font-light text-lg">{description}</p>
  </div>
);
