import React from 'react';
import { Logo } from '../components/Logo';
import { SEO } from '../components/SEO';
import { Button } from '../components/Button';
import { ArrowLeft, Download, Share2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BrandAssets: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <SEO 
        title="Brand Assets & OG Previews | OptiScale Digital"
        description="Premium social media preview layouts and brand assets for OptiScale Digital."
      />
      
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <Link to="/" className="inline-flex items-center text-brand-primary hover:underline mb-4">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-black text-brand-secondary tracking-tight">Brand Identity & Social Previews</h1>
            <p className="text-lg text-gray-600 mt-2">Senior Designer curated Open Graph (OG) layouts for LinkedIn, Facebook, and X.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={18} />
              Download All
            </Button>
          </div>
        </div>

        <div className="space-y-20">
          {/* Variation 1: The Signature (Dark) */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-secondary">Variation 1: The Signature (Dark)</h2>
              <span className="text-sm font-mono text-gray-400">1200 x 630 px</span>
            </div>
            <div className="relative w-full aspect-[1200/630] bg-brand-navy rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              {/* Background Accents */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-primary/10 to-transparent" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center">
                <Logo light className="h-32 w-auto mb-10" />
                <div className="h-px w-24 bg-brand-primary/30 mb-8" />
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight max-w-[20ch]">
                  Intelligent Design. <br />
                  <span className="text-brand-primary">AI Automation.</span> <br />
                  Data-Driven Growth.
                </h3>
                <p className="mt-8 text-white/50 font-medium tracking-[0.3em] uppercase text-sm">
                  www.optiscale.com
                </p>
              </div>
            </div>
          </section>

          {/* Variation 2: The Accelerator (Split) */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-secondary">Variation 2: The Accelerator (Split)</h2>
              <span className="text-sm font-mono text-gray-400">1200 x 630 px</span>
            </div>
            <div className="relative w-full aspect-[1200/630] bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100 flex">
              <div className="w-1/2 p-16 flex flex-col justify-between relative z-10">
                <Logo className="h-20 w-auto" />
                <div>
                  <h3 className="text-5xl font-black text-brand-secondary tracking-tighter leading-[0.9] mb-6">
                    SCALE YOUR <br />
                    BUSINESS <br />
                    <span className="text-brand-primary">WITH AI.</span>
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-brand-secondary text-white text-xs font-bold rounded-full uppercase tracking-widest">
                      Web Design
                    </div>
                    <div className="px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-full uppercase tracking-widest">
                      Automation
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 relative">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop" 
                  alt="Tech Background"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-secondary/40 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
              </div>
            </div>
          </section>

          {/* Variation 3: The Minimalist (Light) */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-secondary">Variation 3: The Minimalist (Light)</h2>
              <span className="text-sm font-mono text-gray-400">1200 x 630 px</span>
            </div>
            <div className="relative w-full aspect-[1200/630] bg-gray-50 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 flex items-center justify-center">
              {/* Subtle Grid Pattern */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              
              <div className="relative z-10 text-center">
                <div className="mb-12 transform scale-150">
                  <Logo className="h-24 w-auto" />
                </div>
                <p className="text-brand-secondary font-bold text-2xl tracking-widest uppercase opacity-80">
                  Engineering Digital Dominance
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-brand-primary/20" />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-20 p-10 bg-brand-secondary rounded-[2rem] text-white text-center">
          <h2 className="text-3xl font-black mb-4">Designer's Implementation Note</h2>
          <p className="text-white/70 max-w-[700px] mx-auto leading-relaxed">
            These Open Graph previews have been engineered using the exact vector-based Logo component to ensure 100% brand fidelity. 
            Unlike AI-generated images which often hallucinate or distort typography, these layouts maintain the precise geometry 
            and weight of the OptiScale identity. 
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-sm font-bold text-brand-primary">
              <ExternalLink size={16} />
              LinkedIn Optimized
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-brand-primary">
              <ExternalLink size={16} />
              Facebook Ready
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-brand-primary">
              <ExternalLink size={16} />
              X (Twitter) Large Card
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
