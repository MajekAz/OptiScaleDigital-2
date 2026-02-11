import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Bot, TrendingUp } from 'lucide-react';
import { Button } from '../components/Button';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';

export const Services: React.FC = () => {
  return (
    <div className="w-full">
      <SEO 
        title="Our Services | Web Design, AI & Marketing UK"
        description="Comprehensive digital services for UK companies: Custom Web Development, AI Process Automation, and Data-Driven Digital Marketing solutions."
        keywords="Web Development Services, AI Solutions UK, Digital Marketing Packages, Business Growth Services"
      />

      {/* SECTION 1: Hero */}
      <section className="relative py-24 lg:py-32 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.services.heroBg} 
            alt="Services Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/80 to-brand-light/10 dark:to-brand-dark/10"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Our <span className="text-brand-cyan">Services</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions tailored for growth, efficiency, and performance. We build the infrastructure for your success.
          </p>
        </div>
      </section>

      <section className="py-20 bg-brand-light dark:bg-brand-dark transition-colors duration-300">
        <div className="container mx-auto px-6 space-y-24">
          <ServiceRow 
            title="Website Design & Development"
            description="We build fast, responsive, and SEO-friendly websites that look stunning and convert visitors into loyal customers. Focusing on UX/UI and modern frameworks."
            icon={<Code size={40} className="text-white" />}
            image={IMAGES.services.webDesign}
            link="/services/web-design"
            color="bg-brand-blue"
          />
          <ServiceRow 
            title="AI Automation Solutions"
            description="Leverage the power of Artificial Intelligence to automate repetitive tasks, enhance customer support with chatbots, and gain data-driven insights."
            icon={<Bot size={40} className="text-white" />}
            image={IMAGES.services.aiAutomation}
            link="/services/ai-automation"
            color="bg-brand-cyan"
            reverse
          />
          <ServiceRow 
            title="Digital Marketing & SEO"
            description="Increase your visibility in UK search results. We offer comprehensive SEO audits, PPC management, and content strategy to drive organic traffic."
            icon={<TrendingUp size={40} className="text-white" />}
            image={IMAGES.services.digitalMarketing}
            link="/services/digital-marketing"
            color="bg-purple-600"
          />
        </div>
      </section>
    </div>
  );
};

interface ServiceRowProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  link: string;
  color: string;
  reverse?: boolean;
}

const ServiceRow: React.FC<ServiceRowProps> = ({ title, description, icon, image, link, color, reverse }) => (
  <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
    <div className="lg:w-1/2">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-6 ${color}`}>
        {icon}
      </div>
      <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-4">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
        {description}
      </p>
      <Link to={link}>
        <Button variant="outline">Learn More</Button>
      </Link>
    </div>
    <div className="lg:w-1/2 w-full">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
        <div className={`absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity ${color}`}></div>
        <img src={image} alt={title} className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500" />
      </div>
    </div>
  </div>
);