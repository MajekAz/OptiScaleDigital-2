import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { MessageSquare, Settings, BarChart, Database, Users, Workflow, Cpu, ShieldCheck } from 'lucide-react';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';

export const ServiceAI: React.FC = () => {
  return (
    <div className="w-full">
      <SEO 
        title="AI Automation Services UK | Chatbots & Workflow Efficiency"
        description="Reduce operational costs with custom AI automation. We build intelligent chatbots, CRM integrations, and predictive analytics models for UK SMEs."
        keywords="AI Automation UK, Chatbots London, Workflow Automation, CRM Integration, Predictive Analytics, Business Efficiency"
      />

      {/* SECTION 1: Hero */}
      <section className="bg-brand-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url('${IMAGES.services.aiHero}')` }}></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              AI Automation & <span className="text-brand-cyan">Operational Efficiency</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Harness the power of Artificial Intelligence to streamline your operations, reduce overheads, and boost ROI. We build intelligent systems that work while you sleep.
            </p>
            <Link to="/contact">
              <Button>Book a Free Demo</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: Intelligent Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">Intelligent Automation Suite</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From managing customer relationships to predicting market trends, our AI solutions cover every aspect of modern business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceDetailCard 
              icon={<Users className="text-brand-cyan" size={32} />}
              title="CRM Automation"
              description="Seamlessly integrate HubSpot, Salesforce, or Zoho. Automate lead entry, follow-ups, and pipeline management."
            />
            <ServiceDetailCard 
              icon={<MessageSquare className="text-brand-cyan" size={32} />}
              title="Intelligent Chatbots"
              description="Deploy 24/7 AI agents trained on your data to handle customer support inquiries instantly."
            />
            <ServiceDetailCard 
              icon={<Workflow className="text-brand-cyan" size={32} />}
              title="Workflow Automation"
              description="Connect your apps (Slack, Gmail, Asana) using Make or Zapier to eliminate manual data entry tasks."
            />
            <ServiceDetailCard 
              icon={<BarChart className="text-brand-cyan" size={32} />}
              title="Predictive Analytics"
              description="Use machine learning to forecast sales trends, inventory needs, and customer behavior patterns."
            />
            <ServiceDetailCard 
              icon={<Cpu className="text-brand-cyan" size={32} />}
              title="Custom AI Agents"
              description="Bespoke AI models designed for specific internal tasks, from document processing to code generation."
            />
            <ServiceDetailCard 
              icon={<Database className="text-brand-cyan" size={32} />}
              title="Data Extraction"
              description="Automate the scraping and processing of web data or PDF documents into structured formats."
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: The Impact Stats */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">Why Automate?</h2>
               <p className="text-gray-600 mb-6 text-lg">
                 Manual processes are the bottleneck of growth. By implementing AI automation, our UK clients typically see:
               </p>
               <ul className="space-y-4">
                 <ImpactItem label="Reduction in manual data entry time" value="80%" />
                 <ImpactItem label="Increase in lead response speed" value="10x" />
                 <ImpactItem label="Savings on operational costs" value="40%" />
               </ul>
             </div>
             <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
               <h3 className="text-xl font-bold text-brand-navy mb-4">Real World Example</h3>
               <p className="text-gray-600 mb-4">
                 <span className="font-semibold text-brand-blue">Client:</span> UK Recruitment Agency
               </p>
               <p className="text-gray-600 mb-4">
                 <span className="font-semibold text-brand-blue">Challenge:</span> Recruiters spending 4 hours/day manually screening CVs.
               </p>
               <p className="text-gray-600">
                 <span className="font-semibold text-brand-blue">Solution:</span> We built an AI parser that scores CVs against job descriptions and auto-schedules interviews with top candidates.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Integration Ecosystem */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-brand-navy mb-12">We Connect Your Favorite Tools</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text representations for logos for simplicity, in a real app these would be SVGs */}
            <span className="text-2xl font-bold text-gray-400">HubSpot</span>
            <span className="text-2xl font-bold text-gray-400">Salesforce</span>
            <span className="text-2xl font-bold text-gray-400">OpenAI</span>
            <span className="text-2xl font-bold text-gray-400">Zapier</span>
            <span className="text-2xl font-bold text-gray-400">Shopify</span>
            <span className="text-2xl font-bold text-gray-400">Slack</span>
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section className="py-24 bg-brand-navy text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-blue/5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <ShieldCheck className="text-brand-cyan mx-auto mb-6" size={64} />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Future-Proof Your Business Today</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Don't get left behind. Schedule a discovery call to identify high-impact automation opportunities in your business.
            </p>
            <Link to="/contact">
              <Button variant="primary" className="bg-brand-cyan hover:bg-cyan-600 text-brand-navy font-bold">
                Automate Your Success
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceDetailCard: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white hover:-translate-y-1 transform duration-300">
    <div className="mb-4 bg-brand-light w-14 h-14 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-brand-navy">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
  </div>
);

const ImpactItem: React.FC<{label: string, value: string}> = ({ label, value }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
    <span className="text-gray-700 font-medium">{label}</span>
    <span className="text-2xl font-bold text-brand-cyan">{value}</span>
  </div>
);