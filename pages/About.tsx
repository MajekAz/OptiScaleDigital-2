import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Heart, Users, Lightbulb, Target, Eye, ChevronDown, ChevronUp } from 'lucide-react';
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
      <section className="relative py-28 lg:py-40 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.about.heroBg} 
            alt="About OptiScale Team" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/80 to-brand-light/10 dark:to-brand-dark/10"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
            About <span className="text-brand-cyan">OptiScale Digital</span>
          </h1>
          <p className="text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            We are a team of strategists, designers, and engineers passionate about helping UK businesses thrive in the digital age.
          </p>
        </div>
      </section>

      {/* SECTION 2: From Vision to Impact */}
      <section className="py-24 dark:bg-brand-dark">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-brand-navy dark:text-white">From Vision to Impact</h2>
              <div className="space-y-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  OptiScale Digital was founded to close the gap between enterprise-level digital capability and growing businesses across the UK.
                </p>
                <p>
                  From our early beginnings, we have evolved into a strategic digital agency supporting over 150 clients, delivering measurable outcomes through technology-driven marketing and operational optimisation—resulting in average revenue growth of 250%.
                </p>
                <p>
                  Today, we serve as trusted advisors to organisations focused on long-term growth, leveraging advanced digital platforms, AI automation, and data-led strategies to drive consistent success.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-3xl transform rotate-3"></div>
              <img 
                src={IMAGES.about.mission}
                alt="Meeting in a modern office" 
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Mission & Vision */}
      <section className="py-24 bg-brand-light dark:bg-slate-900 transition-colors duration-300">
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-10">
               {/* Mission */}
               <div className="bg-white dark:bg-brand-dark p-10 rounded-3xl shadow-xl border-l-8 border-brand-blue">
                  <div className="flex items-center gap-5 mb-6">
                     <div className="p-4 bg-brand-blue/10 rounded-2xl text-brand-blue shrink-0">
                        <Target size={48} />
                     </div>
                     <h2 className="text-3xl font-bold text-brand-navy dark:text-white">Our Mission</h2>
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    To partner with UK organisations to deliver data-driven digital strategies that accelerate growth, optimise customer journeys, and strengthen market position through technology and innovation.
                  </p>
               </div>
               
               {/* Vision */}
               <div className="bg-white dark:bg-brand-dark p-10 rounded-3xl shadow-xl border-l-8 border-brand-cyan">
                  <div className="flex items-center gap-5 mb-6">
                     <div className="p-4 bg-brand-cyan/10 rounded-2xl text-brand-cyan shrink-0">
                        <Eye size={48} />
                     </div>
                     <h2 className="text-3xl font-bold text-brand-navy dark:text-white">Our Vision</h2>
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                     To lead digital transformation in the UK by setting the benchmark for performance, trust, and innovation while building enduring partnerships that drive long-term business value.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 4: Values That Drive Us */}
      <section className="py-24 bg-brand-navy text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Values That Drive Us</h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">Our culture is built on transparency, innovation, and client success.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
             <ValueCard 
                number="01"
                icon={<Users size={32} />} 
                title="Radical Transparency" 
                desc="No hidden fees, no jargon. Just clear communication at every stage." 
             />
             <ValueCard 
                number="02"
                icon={<Lightbulb size={32} />} 
                title="Relentless Innovation" 
                desc="We stay ahead of the curve, testing new AI tools and marketing techniques." 
             />
             <ValueCard 
                number="03"
                icon={<Heart size={32} />} 
                title="Deep Partnership" 
                desc="We work with you as an extension of your own team, sharing your goals." 
             />
          </div>
        </div>
      </section>

      {/* SECTION 5: Scaling Framework */}
      <section className="py-24 bg-white dark:bg-brand-dark transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy dark:text-white mb-6">Our Scaling Framework</h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A structured approach to transforming your digital presence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <FrameworkStep 
              number="01"
              title="Audit & Strategy"
              desc="We analyze your current digital footprint and market potential."
            />
            <FrameworkStep 
              number="02"
              title="Blueprint Design"
              desc="We design conversion-focused UI/UX and marketing funnels."
            />
            <FrameworkStep 
              number="03"
              title="Implementation"
              desc="Development and launch of high-performance digital assets."
            />
            <FrameworkStep 
              number="04"
              title="Optimization"
              desc="Constant data-led refinement to squeeze out more growth."
            />
          </div>
        </div>
      </section>

      {/* SECTION 6: Stats */}
      <section className="py-20 bg-brand-blue text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <Stat number="150+" label="Clients Served" />
            <Stat number="250%" label="Avg Revenue Growth" />
            <Stat number="3x" label="Average ROI" />
            <Stat number="24/7" label="Support" />
          </div>
        </div>
      </section>

      {/* SECTION 7: Meet the Team */}
      <section className="py-24 bg-brand-light dark:bg-brand-dark transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy dark:text-white mb-6">Meet the Leadership</h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">The minds behind the strategy.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
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

      {/* SECTION 8: FAQ */}
      <section className="py-24 bg-white dark:bg-brand-dark transition-colors duration-300 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-6 max-w-5xl">
           <div className="text-center mb-20">
             <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy dark:text-white mb-6">Frequently Asked Questions</h2>
             <p className="text-2xl text-gray-600 dark:text-gray-300">Common questions about partnering with OptiScale.</p>
           </div>
           
           <div className="space-y-6">
             <FAQItem 
               question="What industries do you work with?"
               answer="We work with a diverse range of industries including FinTech, Real Estate, E-commerce, and Healthcare. Our frameworks are adaptable to any sector looking to scale digitally."
             />
             <FAQItem 
               question="Are you strictly a UK-based agency?"
               answer="Yes, our HQ is in Covent Garden, London. However, we support clients globally, provided they align with our communication hours."
             />
             <FAQItem 
               question="How does your pricing work?"
               answer="We operate on a project-based or retainer model depending on the service. We believe in transparency, so we provide detailed quotes after our initial discovery call."
             />
             <FAQItem 
               question="What is the typical timeline for a web project?"
               answer="A standard bespoke website takes 4-8 weeks from discovery to launch. Complex platforms or AI integrations may take longer."
             />
           </div>
        </div>
      </section>

      {/* SECTION 9: CTA */}
      <section className="py-24 bg-brand-light dark:bg-slate-900 text-center border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy dark:text-white mb-8">Let's Build Something Great Together</h2>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Whether you need a new website, better SEO, or custom AI solutions, our team is ready to help you win.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/contact">
              <Button className="px-10 py-5">Get in Touch</Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="px-10 py-5">View Services</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const Stat: React.FC<{number: string, label: string}> = ({ number, label }) => (
  <div>
    <div className="text-5xl lg:text-6xl font-bold text-white mb-3">{number}</div>
    <div className="text-blue-100 text-lg font-bold uppercase tracking-wide">{label}</div>
  </div>
);

const ValueCard: React.FC<{number: string, icon: React.ReactNode, title: string, desc: string}> = ({ number, icon, title, desc }) => (
  <div className="bg-white/10 p-10 rounded-3xl backdrop-blur-sm border border-white/10 text-center relative overflow-hidden group hover:bg-white/20 transition-all duration-300">
    <div className="absolute top-0 right-0 p-6 text-7xl font-black text-white/5 group-hover:text-white/10 transition-colors select-none">
        {number}
    </div>
    <div className="text-brand-cyan mb-8 flex justify-center scale-[1.75] relative z-10">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{title}</h3>
    <p className="text-lg text-gray-300 leading-relaxed relative z-10">{desc}</p>
  </div>
);

const FrameworkStep: React.FC<{number: string, title: string, desc: string}> = ({ number, title, desc }) => (
  <div className="bg-brand-light dark:bg-slate-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-8 border-brand-blue">
    <div className="text-6xl font-black text-brand-blue/10 dark:text-white/10 mb-6">{number}</div>
    <h3 className="text-2xl font-bold text-brand-navy dark:text-white mb-4">{title}</h3>
    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{desc}</p>
  </div>
);

const TeamMember: React.FC<{image: string, name: string, role: string}> = ({ image, name, role }) => (
  <div className="group text-center">
    <div className="relative overflow-hidden rounded-3xl mb-6 shadow-xl w-full aspect-[4/5]">
      <img src={image} alt={name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-10">
        <span className="text-white font-bold text-lg tracking-wide border-b-2 border-brand-cyan pb-1">Connect on LinkedIn</span>
      </div>
    </div>
    <h3 className="text-2xl font-bold text-brand-navy dark:text-white mb-1">{name}</h3>
    <p className="text-xl text-brand-blue dark:text-brand-cyan font-bold">{role}</p>
  </div>
);

const FAQItem: React.FC<{question: string, answer: string}> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-2 border-gray-100 dark:border-gray-700 rounded-2xl bg-brand-light dark:bg-slate-800 overflow-hidden shadow-sm">
      <button 
        className="w-full flex items-center justify-between p-8 text-left focus:outline-none hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-xl md:text-2xl text-brand-navy dark:text-white pr-4">{question}</span>
        {isOpen ? <ChevronUp className="text-brand-blue shrink-0" size={28} /> : <ChevronDown className="text-gray-400 shrink-0" size={28} />}
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-8 pt-0 text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-t-2 border-gray-50 dark:border-gray-700/50">
          <div className="mt-6">{answer}</div>
        </div>
      </div>
    </div>
  );
};