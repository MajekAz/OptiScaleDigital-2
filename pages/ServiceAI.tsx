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
        title="AI Automation Solutions | OptiScale Digital LTD"
        description="Streamline your business with intelligent AI automation and Google Workspace solutions. Eliminate repetitive tasks and scale faster without expensive software."
      />

      {/* HERO SECTION */}
      <section className="relative py-24 lg:py-32 bg-brand-secondary text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src={IMAGES.services.aiHero} 
            alt="AI Automation Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary via-brand-secondary/80 to-transparent"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-h1 mb-6 leading-tight">
              AI Automation Solutions That <span className="text-brand-accent">Streamline Your Business</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-white/90 mb-8">
              We design intelligent automation systems using AI and Google Workspace to eliminate repetitive tasks, improve efficiency, and help your business scale faster.
            </p>
            <p className="text-lg text-brand-textGrey mb-12 max-w-3xl leading-relaxed">
              At OptiScale Digital LTD, we build powerful automation systems using tools such as Google Sheets, Google Forms, Google Docs, Google Drive, Gmail automation, and AI integrations. Our solutions help businesses manage leads, automate workflows, improve communication, and operate more efficiently without relying on expensive monthly software subscriptions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button variant="primary" className="px-8 py-4 text-lg bg-brand-accent hover:bg-emerald-600 text-brand-secondary border-none shadow-lg">
                  Book a Free Automation Consultation
                </Button>
              </Link>
              <a href="#services">
                <Button variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white/10">
                  Explore Automation Services
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION SECTION */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 text-brand-secondary mb-8">Smart Automation Powered by Google Workspace</h2>
            <div className="space-y-6 text-lg text-brand-textGrey leading-relaxed text-left">
              <p>
                Many businesses waste valuable time on manual tasks such as managing leads, sending follow-up emails, tracking projects, creating reports, and organising data. These repetitive activities slow down productivity and increase operational costs.
              </p>
              <p>
                OptiScale Digital LTD solves this problem by building custom AI-powered automation systems using Google Workspace, including Google Sheets, Forms, Docs, Drive, Gmail, and Apps Script.
              </p>
              <p className="font-bold text-brand-secondary">
                This approach allows businesses to run powerful automation systems without paying for expensive CRM software or complex enterprise platforms.
              </p>
              <p>
                Our automation solutions connect your tools, streamline your processes, and give you a simple but powerful system to manage your business operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI AUTOMATION SERVICES */}
      <section id="services" className="py-20 bg-brand-lightGrey">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-brand-secondary">Our AI Automation Services</h2>
            <p className="text-brand-textGrey mt-4 max-w-2xl mx-auto">Custom-built solutions designed to save you time and money.</p>
          </div>

          <div className="grid gap-12">
            {/* SERVICE 1 */}
            <ServiceCard 
              icon={<Database size={48} />}
              title="Custom Google Workspace CRM Systems"
              subheading="A fully customised CRM built using Google Workspace."
              description="We design custom CRM systems using Google Sheets, Google Forms, Google Docs, and Google Drive to help businesses manage leads, track clients, organise projects, and monitor their sales pipeline. This solution gives businesses a powerful CRM without paying expensive monthly subscription fees."
              workspaceUsage={[
                "Google Sheets serves as the CRM database",
                "Google Forms captures leads and automatically updates the CRM",
                "Google Docs generates contracts, invoices, and reports",
                "Google Drive stores client files and documents",
                "Google Apps Script automates workflows and notifications"
              ]}
              features={[
                "Lead database dashboard",
                "Sales pipeline tracking",
                "Automated document generation",
                "Client activity tracking",
                "Integrated reporting system"
              ]}
              benefits={[
                "No expensive CRM subscriptions",
                "Fully customisable for each business",
                "Cloud-based and secure",
                "Easy team collaboration",
                "Scalable system for business growth"
              ]}
              ctaText="Build My Custom CRM"
            />

            {/* SERVICE 2 */}
            <ServiceCard 
              icon={<Workflow size={48} />}
              title="Business Workflow Automation"
              subheading="Automate repetitive tasks across your operations."
              description="We design automation workflows that eliminate repetitive tasks such as data entry, notifications, reporting, and task management. Our systems ensure that information flows automatically between different parts of your business."
              workspaceUsage={[
                "Google Sheets tracks workflow stages",
                "Google Apps Script automates processes and triggers",
                "Gmail sends automated notifications and alerts",
                "Google Drive manages file organisation",
                "Google Calendar schedules automated tasks"
              ]}
              features={[
                "Task automation workflows",
                "Automated notifications and alerts",
                "Data processing automation",
                "Workflow dashboards",
                "Automated reporting"
              ]}
              benefits={[
                "Save hours of manual work",
                "Reduce human error",
                "Improve team productivity",
                "Faster business operations",
                "Streamlined internal processes"
              ]}
              ctaText="Automate My Workflow"
              reverse
            />

            {/* SERVICE 3 */}
            <ServiceCard 
              icon={<Zap size={48} />}
              title="Lead Generation & Marketing Automation"
              subheading="Capture and nurture leads automatically."
              description="We create automated lead generation systems that capture prospects from your website and automatically follow up with them through email and CRM workflows."
              workspaceUsage={[
                "Google Forms captures website leads",
                "Google Sheets tracks leads and customer journeys",
                "Gmail automation sends follow-up sequences",
                "Google Apps Script triggers automated lead actions",
                "Google Drive stores marketing assets"
              ]}
              features={[
                "Automated lead capture forms",
                "CRM lead tracking dashboard",
                "Email follow-up automation",
                "Lead scoring system",
                "Marketing campaign tracking"
              ]}
              benefits={[
                "Capture more leads from your website",
                "Improve customer follow-up",
                "Increase conversion rates",
                "Better lead organisation",
                "More efficient marketing"
              ]}
              ctaText="Automate My Lead Generation"
            />

            {/* SERVICE 4 */}
            <ServiceCard 
              icon={<MessageSquare size={48} />}
              title="AI Customer Support & Chatbots"
              subheading="Provide instant customer support with AI assistants."
              description="We deploy AI-powered chatbots that answer customer questions, qualify leads, and provide instant responses on your website or messaging platforms."
              workspaceUsage={[
                "Google Sheets stores chatbot knowledge base data",
                "Google Docs manages FAQ content",
                "Google Apps Script connects chatbot responses to databases",
                "Gmail sends automated support responses",
                "Google Drive stores support resources"
              ]}
              features={[
                "AI chatbot implementation",
                "FAQ automation system",
                "Lead qualification chat flows",
                "Customer support automation",
                "Integration with CRM data"
              ]}
              benefits={[
                "24/7 customer assistance",
                "Faster responses to inquiries",
                "Reduced support workload",
                "Better customer experience",
                "Increased lead capture"
              ]}
              ctaText="Add AI Chat Support"
              reverse
            />

            {/* SERVICE 5 */}
            <ServiceCard 
              icon={<Cpu size={48} />}
              title="Make.com & API Automation Integrations"
              subheading="Connect all your business apps into one intelligent workflow."
              description="We integrate business tools using automation platforms like Make.com and APIs to ensure that your data flows seamlessly between different systems."
              workspaceUsage={[
                "Google Sheets acts as the central automation database",
                "Google Apps Script connects APIs and automation tools",
                "Google Drive stores synced files and reports",
                "Gmail sends automated alerts and updates",
                "Google Docs generates automated reports"
              ]}
              features={[
                "Cross-platform automation",
                "API data integrations",
                "Automated data synchronisation",
                "App-to-app workflows",
                "Reporting automation"
              ]}
              benefits={[
                "Eliminate manual data transfers",
                "Connect all your business tools",
                "Improve data accuracy",
                "Faster operations",
                "Scalable automation infrastructure"
              ]}
              ctaText="Integrate My Tools"
            />

            {/* SERVICE 6 */}
            <ServiceCard 
              icon={<Bot size={48} />}
              title="AI Content & Social Media Automation"
              subheading="Automate content creation and publishing."
              description="We implement AI-assisted tools that help businesses create content, manage social media, and schedule posts automatically."
              workspaceUsage={[
                "Google Sheets manages content calendars",
                "Google Docs stores content drafts",
                "Google Drive stores media assets",
                "Google Apps Script triggers publishing workflows",
                "Gmail sends approval notifications"
              ]}
              features={[
                "AI content generation workflows",
                "Social media scheduling systems",
                "Content calendar dashboards",
                "Automated publishing workflows",
                "Performance tracking"
              ]}
              benefits={[
                "Save time on content creation",
                "Maintain consistent online presence",
                "Increase brand visibility",
                "Improve audience engagement",
                "Simplify marketing management"
              ]}
              ctaText="Automate My Content Marketing"
              reverse
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE OPTISCALE */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-brand-secondary">Why Businesses Choose OptiScale for AI Automation</h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            <WhyPoint title="Custom Built" desc="Automation built specifically for your business needs." />
            <WhyPoint title="Lower Costs" desc="Google Workspace-based systems with lower software costs." />
            <WhyPoint title="Scalable" desc="Infrastructure that grows alongside your business." />
            <WhyPoint title="Seamless" desc="Integration with your existing tools and workflows." />
            <WhyPoint title="Expert Support" desc="Professional implementation and ongoing support." />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-brand-accent text-brand-secondary text-center">
        <div className="container">
          <h2 className="text-h2 mb-6">Ready to Automate Your Business?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Stop wasting hours on repetitive tasks. Let OptiScale build intelligent automation systems powered by AI and Google Workspace so you can focus on growing your business.
          </p>
          <Link to="/contact">
            <Button variant="secondary" className="px-12 py-5 text-lg font-bold">
              Book Your Free Automation Strategy Call
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ 
  icon, title, subheading, description, workspaceUsage, features, benefits, ctaText, reverse = false 
}: any) => (
  <div className={`flex flex-col lg:flex-row gap-12 items-start p-8 md:p-12 bg-white rounded-[2.5rem] border border-brand-borderGrey shadow-sm hover:shadow-md transition-shadow ${reverse ? 'lg:flex-row-reverse' : ''}`}>
    <div className="w-full lg:w-1/2">
      <div className="text-brand-accent mb-6">{icon}</div>
      <h3 className="text-h3 text-brand-secondary mb-2">{title}</h3>
      <p className="text-lg font-bold text-brand-primary mb-4">{subheading}</p>
      <p className="text-brand-textGrey mb-8 leading-relaxed">{description}</p>
      
      <div className="mb-8 p-6 bg-brand-lightGrey rounded-2xl border border-brand-accent/10">
        <h4 className="font-bold text-brand-secondary mb-4 flex items-center gap-2">
          <CheckCircle2 className="text-brand-accent" size={20} />
          How Google Workspace Powers This
        </h4>
        <ul className="space-y-2">
          {workspaceUsage.map((item: string, i: number) => (
            <li key={i} className="text-sm text-brand-textGrey flex items-start gap-2">
              <span className="text-brand-accent mt-1">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Link to="/contact">
        <Button variant="primary" className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-emerald-600 text-brand-secondary border-none">
          {ctaText}
        </Button>
      </Link>
    </div>

    <div className="w-full lg:w-1/2 grid sm:grid-cols-2 gap-8">
      <div>
        <h4 className="font-bold text-brand-secondary mb-4 uppercase tracking-wider text-xs">Key Features</h4>
        <ul className="space-y-3">
          {features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-sm text-brand-textGrey">
              <Check className="text-brand-accent shrink-0 mt-0.5" size={16} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-brand-secondary mb-4 uppercase tracking-wider text-xs">Core Benefits</h4>
        <ul className="space-y-3">
          {benefits.map((benefit: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-sm text-brand-textGrey">
              <Zap className="text-brand-accent shrink-0 mt-0.5" size={16} />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const WhyPoint = ({ title, desc }: any) => (
  <div className="text-center p-6 bg-brand-lightGrey rounded-2xl border border-brand-borderGrey hover:border-brand-accent/30 transition-colors">
    <h4 className="text-lg font-bold text-brand-secondary mb-3">{title}</h4>
    <p className="text-sm text-brand-textGrey leading-relaxed">{desc}</p>
  </div>
);

const Check = ({ className, size }: any) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

