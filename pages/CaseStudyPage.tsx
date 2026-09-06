import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, TrendingUp, Target, Zap } from 'lucide-react';
import { CASE_STUDIES } from '../data/caseStudies';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { trackPortfolioView } from '../utils/analytics';

export const CaseStudyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const study = CASE_STUDIES.find(s => s.id === id);

  useEffect(() => {
    if (study) {
      trackPortfolioView(study.title, study.id);
    }
  }, [study?.id, study?.title]);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <SEO 
        title={`${study.title} | Case Study | OptiScale Digital`}
        description={`Read how we helped ${study.client} achieve ${study.results[0]} through ${study.category}.`}
      />

      {/* Hero Section */}
      <section className="relative py-24 bg-brand-secondary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={study.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-secondary"></div>
        </div>
        <div className="container relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-brand-primary hover:text-white transition-colors mb-8">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <div className="max-w-3xl">
            <p className="text-brand-primary font-bold uppercase tracking-widest mb-4">{study.category}</p>
            <h1 className="text-h2 mb-6">{study.title}</h1>
            <p className="text-xl text-brand-textGrey leading-relaxed">
              Client: <span className="text-white font-semibold">{study.client}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Left Column: Results & Stats */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="p-8 bg-brand-lightGrey rounded-3xl border border-brand-borderGrey">
                  <h3 className="text-2xl font-bold text-brand-secondary mb-6 flex items-center gap-2">
                    <TrendingUp className="text-brand-primary" /> Key Results
                  </h3>
                  <ul className="space-y-6">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0 mt-1">
                          <CheckCircle2 size={18} className="text-brand-accent" />
                        </div>
                        <span className="text-lg font-bold text-brand-secondary">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-8 bg-brand-primary text-white rounded-3xl shadow-xl shadow-brand-primary/20">
                  <h4 className="text-xl font-bold mb-4">Ready for similar results?</h4>
                  <p className="text-white/80 mb-8">Book a free strategy call to discuss your growth infrastructure.</p>
                  <Link to="/booking">
                    <Button variant="secondary" className="w-full">Book Free Audit</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: The Story */}
            <div className="lg:col-span-2 space-y-16">
              <div className="prose prose-lg max-w-none">
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-brand-secondary mb-6 flex items-center gap-3">
                    <Target className="text-brand-primary" /> The Challenge
                  </h2>
                  <p className="text-lg text-brand-textGrey leading-relaxed">
                    {study.challenge}
                  </p>
                </div>

                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-brand-secondary mb-6 flex items-center gap-3">
                    <Zap className="text-brand-accent" /> Our Solution
                  </h2>
                  <p className="text-lg text-brand-textGrey leading-relaxed">
                    {study.solution}
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-brand-secondary mb-6">The Full Story</h2>
                  <p className="text-lg text-brand-textGrey leading-relaxed whitespace-pre-line">
                    {study.fullStory}
                  </p>
                </div>
              </div>

              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img src={study.image} alt={study.title} className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-lightGrey">
        <div className="container text-center">
          <h2 className="text-h2 text-brand-secondary mb-8">Want to be our next success story?</h2>
          <Link to="/booking">
            <Button variant="primary" className="px-12 py-5 text-lg">Start Your Journey</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
