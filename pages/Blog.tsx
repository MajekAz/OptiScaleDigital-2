import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';
import { BlogPost } from '../types';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('./api/blog.php');
        
        // Check content type to ensure we got JSON (avoids syntax error if HTML is returned)
        const contentType = response.headers.get("content-type");
        if (!response.ok || (contentType && !contentType.includes("application/json"))) {
           throw new Error('API unavailable or not returning JSON');
        }

        const data = await response.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        // Use console.warn instead of console.error to avoid alarming logs in dev mode
        console.warn("Blog API unavailable, loading fallback data."); 
        
        // Fallback data
        const fallbackPosts: BlogPost[] = [
          {
            id: '1',
            title: 'The Future of AI in UK Small Business',
            excerpt: 'How local SMEs are leveraging automation to compete with industry giants in 2024.',
            content: '<p>Full content would go here...</p>',
            date: 'Oct 15, 2023',
            author: 'OptiScale',
            category: 'AI Automation'
          },
          {
            id: '2',
            title: 'Mastering GDPR for Digital Marketing',
            excerpt: 'A comprehensive guide to staying compliant while maximizing your outreach in the UK market.',
            content: '<p>Full content...</p>',
            date: 'Nov 02, 2023',
            author: 'Sarah Collins',
            category: 'Digital Marketing'
          },
          {
            id: '3',
            title: 'Web Design Trends to Watch in 2024',
            excerpt: 'From bento grids to neo-brutalism, here is what is defining the London design aesthetic this year.',
            content: '<p>Full content...</p>',
            date: 'Dec 10, 2023',
            author: 'David Thorne',
            category: 'Web Design'
          }
        ];
        
        setPosts(fallbackPosts);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-brand-blue" size={48} />
            </div>
          ) : error ? (
             <div className="text-center py-20 text-gray-500">
                <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
                <p>{error}</p>
             </div>
          ) : posts.length === 0 ? (
             <div className="text-center py-20 text-gray-500">
                <p className="text-xl">No articles found yet. Check back soon!</p>
             </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col">
                  <div className="h-48 bg-gray-200 dark:bg-slate-700 w-full relative">
                    {/* Placeholder for post image or fallback pattern */}
                    <div className="w-full h-full bg-gradient-to-br from-brand-navy/10 to-brand-blue/10 flex items-center justify-center text-gray-400">
                        {/* If image exists, use it, otherwise show category */}
                        <span className="text-4xl opacity-20">OptiScale</span>
                    </div>
                    <div className="absolute top-4 left-4 bg-brand-blue text-white text-xs px-2 py-1 rounded">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</div>
                    <Link to={`/blog/${post.id}`}>
                      <h2 className="text-xl font-bold mb-3 text-brand-navy dark:text-white hover:text-brand-blue dark:hover:text-brand-cyan transition-colors cursor-pointer line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Link to={`/blog/${post.id}`} className="text-brand-blue dark:text-brand-cyan font-semibold text-sm flex items-center gap-1 mt-auto hover:underline">
                      Read Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};