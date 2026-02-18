
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, AlertCircle, ImageIcon } from 'lucide-react';
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
        const contentType = response.headers.get("content-type");
        if (!response.ok || (contentType && !contentType.includes("application/json"))) {
           throw new Error('API unavailable');
        }
        const data = await response.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.warn("Blog API unavailable, loading fallback data."); 
        const fallbackPosts: BlogPost[] = [
          {
            id: '1',
            title: 'The Future of AI in UK Small Business',
            excerpt: 'How local SMEs are leveraging automation to compete with industry giants in 2024.',
            content: '<p>Full content would go here...</p>',
            date: 'Oct 15, 2023',
            author: 'OptiScale',
            category: 'AI Automation',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop'
          },
          {
            id: '2',
            title: 'Mastering GDPR for Digital Marketing',
            excerpt: 'A comprehensive guide to staying compliant while maximizing your outreach in the UK market.',
            content: '<p>Full content...</p>',
            date: 'Nov 02, 2023',
            author: 'Sarah Collins',
            category: 'Digital Marketing',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop'
          },
          {
            id: '3',
            title: 'Web Design Trends to Watch in 2024',
            excerpt: 'From bento grids to neo-brutalism, here is what is defining the London design aesthetic this year.',
            content: '<p>Full content...</p>',
            date: 'Dec 10, 2023',
            author: 'David Thorne',
            category: 'Web Design',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop'
          }
        ];
        setPosts(fallbackPosts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full bg-brand-light dark:bg-brand-dark min-h-screen">
      <SEO 
        title="Insights & Tech News | UK Digital Business Blog"
        description="Latest trends in web design, AI, and marketing for the UK market."
      />

      <section className="relative py-24 lg:py-32 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={IMAGES.blog.heroBg} alt="Blog Background" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-h1 text-white mb-6">Insights & <span className="text-brand-cyan">News</span></h1>
          <p className="text-lead text-gray-200 max-w-3xl mx-auto">Latest thoughts on technology, design, and business growth.</p>
        </div>
      </section>

      <section className="py-section">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-brand-blue" size={48} />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link to={`/post/${post.id}`} key={post.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
                     {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                     ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-navy/10 to-brand-blue/10 flex items-center justify-center opacity-40 group-hover:scale-105 transition-transform duration-500">
                          <ImageIcon className="text-brand-navy/20" size={48} />
                        </div>
                     )}
                  </div>
                  <div className="p-8 flex-grow">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue py-1 px-2 bg-brand-blue/5 rounded">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{post.date}</span>
                    </div>
                    <h2 className="text-h4 mb-4 text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-body text-gray-600 line-clamp-3 mb-6 text-sm">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-brand-blue font-bold text-xs tracking-widest uppercase">
                      READ ARTICLE <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
