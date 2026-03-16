import React, { useState, useRef } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Send, 
  Sparkles,
  Info,
  X
} from 'lucide-react';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { CRM_ENDPOINT } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

type FormData = {
  // Step 1: The Basics
  contactName: string;
  contactRole: string;
  companyName: string;
  website: string;
  selectedPackage: string;
  
  // Step 2: The Project Scope
  specificAssets: string;
  primaryGoal: string;
  copyStatus: 'ready' | 'placeholder';
  copyText: string;
  dimensions: string;
  
  // Step 3: The Brand DNA
  brandAdjectives: string;
  avoidColors: string;
  
  // Step 4: The Audience & Inspiration
  targetAudience: string;
  inspirationLinks: string;
  competitorVisuals: string;
};

const INITIAL_DATA: FormData = {
  contactName: '',
  contactRole: '',
  companyName: '',
  website: '',
  selectedPackage: '',
  specificAssets: '',
  primaryGoal: '',
  copyStatus: 'ready',
  copyText: '',
  dimensions: '',
  brandAdjectives: '',
  avoidColors: '',
  targetAudience: '',
  inspirationLinks: '',
  competitorVisuals: '',
};

export const DesignBrief: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Gather all form data into a JSON object
      const submissionData = {
        ...formData,
        filesCount: files.length,
        fileNames: files.map(f => f.name).join(', '),
        submittedAt: new Date().toLocaleString('en-GB'),
        source: 'Design Brief Form',
        formType: 'design-brief'
      };

      await fetch(CRM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(submissionData),
      });

      // Redirect to success state
      setIsSuccess(true);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-white text-gray-900 py-24 lg:py-32 selection:bg-brand-primary/10">
      <SEO 
        title="Design Brief | Start Your Project | OptiScale Digital"
        description="Tell us about your project. Our high-completion design brief helps us align with your brand DNA and goals."
      />

      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6 border border-brand-primary/20">
            <Sparkles size={14} /> Step {step} of 4
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4 tracking-tighter text-gray-900">The OptiScale Project Brief</h1>
          <p className="text-gray-600 font-light">Structured for high-impact results and 2x faster delivery.</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-100 rounded-full mb-16 overflow-hidden">
          <motion.div 
            className="h-full bg-brand-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "circOut" }}
          />
        </div>
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                      <span className="w-8 h-8 rounded-lg bg-brand-primary/20 text-brand-primary flex items-center justify-center text-sm">1</span>
                      The Basics (Getting Aligned)
                    </h2>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Primary Contact Name & Role</label>
                        <input 
                          type="text" 
                          name="contactName"
                          placeholder="e.g. Jane Doe, CMO"
                          required
                          value={formData.contactName}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-gray-900 placeholder:text-gray-400"
                        />
                        <p className="text-[10px] text-gray-500 italic">Who has the final say on approvals?</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Company Name & Website</label>
                        <input 
                          type="text" 
                          name="companyName"
                          placeholder="e.g. OptiScale, optiscale.digital"
                          required
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Selected Service</label>
                      <select 
                        name="selectedPackage"
                        required
                        value={formData.selectedPackage}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all appearance-none text-gray-900"
                      >
                        <option value="" disabled className="bg-white">Select an option...</option>
                        <optgroup label="Creative Services" className="bg-white font-bold">
                          <option value="flyer" className="bg-white">High-Impact Flyer & Print Design</option>
                          <option value="social-banners" className="bg-white">Facebook & LinkedIn Header Strategy</option>
                          <option value="instagram" className="bg-white">Strategic Instagram & Social Assets</option>
                          <option value="logo" className="bg-white">Signature Logo & Brand Identity</option>
                          <option value="ads" className="bg-white">Performance Ad Creative (Meta/Google)</option>
                          <option value="decks" className="bg-white">Investor-Ready Pitch Decks</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                      <span className="w-8 h-8 rounded-lg bg-brand-primary/20 text-brand-primary flex items-center justify-center text-sm">2</span>
                      The Project Scope (What are we building?)
                    </h2>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Specific Assets Needed</label>
                      <textarea 
                        name="specificAssets"
                        placeholder="e.g. 2 Meta Ads, 1 Flyer, Logo Refresh"
                        required
                        value={formData.specificAssets}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all h-24 resize-none text-gray-900 placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Primary Goal</label>
                      <input 
                        type="text" 
                        name="primaryGoal"
                        placeholder="e.g. Drive event sign-ups, lower ad CPA"
                        required
                        value={formData.primaryGoal}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-gray-900 placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-bold text-gray-600 uppercase tracking-widest block">Content Status</label>
                      <div className="flex gap-4">
                        <button 
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, copyStatus: 'ready' }))}
                          className={`flex-1 p-4 rounded-xl border transition-all text-sm font-bold ${formData.copyStatus === 'ready' ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 bg-white text-gray-600'}`}
                        >
                          Copy is Ready
                        </button>
                        <button 
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, copyStatus: 'placeholder' }))}
                          className={`flex-1 p-4 rounded-xl border transition-all text-sm font-bold ${formData.copyStatus === 'placeholder' ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-gray-200 bg-white text-gray-600'}`}
                        >
                          Use Placeholder
                        </button>
                      </div>
                    </div>

                    {formData.copyStatus === 'ready' && (
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Paste Your Copy Here</label>
                        <textarea 
                          name="copyText"
                          placeholder="Paste headlines, body text, and CTAs here..."
                          value={formData.copyText}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all h-32 resize-none text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Dimensions & Formats</label>
                      <input 
                        type="text" 
                        name="dimensions"
                        placeholder="e.g. 1080x1080px for Instagram, Print-ready PDF"
                        value={formData.dimensions}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                      <span className="w-8 h-8 rounded-lg bg-brand-primary/20 text-brand-primary flex items-center justify-center text-sm">3</span>
                      The Brand DNA (Nailing the Aesthetic)
                    </h2>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Brand Vibe (3 Adjectives)</label>
                      <input 
                        type="text" 
                        name="brandAdjectives"
                        placeholder="e.g. Minimalist, Authoritative, Edgy"
                        required
                        value={formData.brandAdjectives}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-gray-900 placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-bold text-gray-600 uppercase tracking-widest block">Brand Guidelines & Assets</label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center hover:border-brand-primary/50 transition-all cursor-pointer bg-gray-50 group"
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          multiple
                          className="hidden" 
                        />
                        <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <Upload size={24} />
                        </div>
                        <p className="font-bold mb-1 text-gray-900">Click to upload assets</p>
                        <p className="text-xs text-gray-500">Logos, fonts, or color hex codes (Max 10MB)</p>
                      </div>

                      {files.length > 0 && (
                        <div className="grid grid-cols-2 gap-3">
                          {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
                              <span className="text-xs truncate max-w-[150px] text-gray-900">{file.name}</span>
                              <button type="button" onClick={() => removeFile(index)} className="text-gray-400 hover:text-red-500">
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Colors to Avoid</label>
                      <input 
                        type="text" 
                        name="avoidColors"
                        placeholder="e.g. No yellow, avoid neon green"
                        value={formData.avoidColors}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-gray-900 placeholder:text-gray-400"
                      />
                      <div className="flex items-center gap-2 text-[10px] text-brand-accent italic">
                        <Info size={10} /> This question saves hours of revision time.
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                      <span className="w-8 h-8 rounded-lg bg-brand-primary/20 text-brand-primary flex items-center justify-center text-sm">4</span>
                      The Audience & Inspiration
                    </h2>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Target Audience</label>
                      <textarea 
                        name="targetAudience"
                        placeholder="e.g. B2B SaaS founders, Gen Z shoppers"
                        required
                        value={formData.targetAudience}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all h-24 resize-none text-gray-900 placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Inspiration Links (2-3)</label>
                      <textarea 
                        name="inspirationLinks"
                        placeholder="Links to designs or competitors you love..."
                        required
                        value={formData.inspirationLinks}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all h-24 resize-none text-gray-900 placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Competitor Visual Gaps</label>
                      <textarea 
                        name="competitorVisuals"
                        placeholder="What do your competitors get wrong visually that you want to get right?"
                        value={formData.competitorVisuals}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all h-32 resize-none text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                  <button 
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1}
                    className={`flex items-center gap-2 text-sm font-bold transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    <ChevronLeft size={18} /> Previous Step
                  </button>
                  
                  {step < 4 ? (
                    <Button 
                      type="button"
                      onClick={nextStep}
                      variant="primary" 
                      className="rounded-full px-8 py-3 gap-2 group"
                    >
                      Next Step <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit"
                      variant="primary" 
                      disabled={isSubmitting}
                      className="rounded-full px-10 py-3 gap-2 shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                    >
                      {isSubmitting ? 'Syncing with CRM...' : 'Submit Brief'} <Send size={18} />
                    </Button>
                  )}
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 rounded-[2rem] bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto mb-8 border border-brand-primary/20">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-black mb-4 tracking-tighter text-gray-900">Brief Received!</h2>
                <p className="text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
                  Your project card has been automatically created in our system. A creative lead will review your brand DNA and reach out within 24 hours.
                </p>
                <Button 
                  variant="ghost" 
                  onClick={() => window.location.href = '/'}
                  className="text-gray-600 hover:text-brand-primary"
                >
                  Return to Dashboard
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
  );
};
