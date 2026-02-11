import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';

const BLOG_POSTS = [
  {
    id: '1',
    title: 'The Future of AI in UK Small Business',
    excerpt: 'How local SMEs are leveraging automation to compete with industry giants in 2024.',
    date: 'Oct 15, 2023',
    category: 'AI Automation'
  },
  {
    id: '2',
    title: 'Top Web Design Trends for London Agencies',
    excerpt: 'Minimalism, dark mode, and brutalism: What is trending in the capital\'s design scene.',
    date: 'Sep 28, 2023',
    category: 'Web Design'
  },
  {
    id: '3',
    title: 'GDPR Compliance: A Guide for Digital Marketing',
    excerpt: 'Ensure your marketing funnels are fully compliant with UK data protection laws.',
    date: 'Sep 10, 2023',
    category: 'Legal'
  },
  {
    id: '4',
    title: 'Why SEO Matters More Than Ever',
    excerpt: 'With AI-generated content flooding the web, technical SEO is your competitive advantage.',
    date: 'Aug 22, 2023',
    category: 'SEO'
  }
];

export const Blog: React.FC = () => {
  return (
    <div className="w-full bg-brand-light dark:bg-brand-dark min-h-screen transition-colors duration-300">
      <SEO 
        title="Insights & Tech News | UK Digital Business Blog"
        description="Latest trends in web design, artificial intelligence, and digital marketing for the UK market. Read expert insights from OptiScale Digital."
        keywords="Digital Business Blog, Tech News UK, AI Trends 2024, Web Design Insights, GDPR Guide"
      />

      {/* SECTION 1: Hero */}
      <section className="relative py-24 lg:py-32 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.blog.heroBg} 
            alt="Blog Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/80 to-brand-light/10 dark:to-brand-dark/10"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Insights & <span className="text-brand-cyan">News</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Latest thoughts on technology, design, and business growth. Stay ahead of the curve with our expert analysis.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article key={post.id} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col">
                <div className="h-48 bg-gray-200 dark:bg-slate-700 w-full relative">
                  <div className="absolute top-4 left-4 bg-brand-blue text-white text-xs px-2 py-1 rounded">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</div>
                  <h2 className="text-xl font-bold mb-3 text-brand-navy dark:text-white hover:text-brand-blue dark:hover:text-brand-cyan transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <Link to={`/blog`} className="text-brand-blue dark:text-brand-cyan font-semibold text-sm flex items-center gap-1 mt-auto">
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};