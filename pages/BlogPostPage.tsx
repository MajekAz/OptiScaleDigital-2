
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Loader2, Share2, Clock, CheckCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { BlogPost } from '../types';
import { Button } from '../components/Button';
import { NewsletterForm } from '../components/NewsletterForm';
import { IMAGES } from '../assets';

export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch('./api/blog.php');
        const data: BlogPost[] = await response.json();
        const foundPost = Array.isArray(data) ? data.find(p => String(p.id) === id) : null;
        if (foundPost) { 
          setPost(foundPost); 
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        console.warn("Using fallback post data");
        setPost({
          id: id,
          title: 'The Future of AI in UK Small Business',
          excerpt: 'How local SMEs are leveraging automation to compete with industry giants in 2024.',
          content: `
            <p>Artificial Intelligence is no longer just a buzzword for Silicon Valley giants. In the heart of London and throughout the UK, small businesses are finding innovative ways to integrate AI into their daily operations.</p>
            <h2>The Efficiency Gap</h2>
            <p>For many years, smaller enterprises struggled to keep up with the technical capabilities of multinational corporations. The cost of entry was simply too high. However, the democratisation of AI through platforms like OpenAI and Google Cloud has changed the playing field.</p>
            <h3>Bespoke Workflows</h3>
            <p>We are seeing UK SMEs automate everything from customer service inquiries to complex data entry in their CRM systems. This isn't about replacing humans; it's about augmenting them. By removing the repetitive "drudge work," teams can focus on creative strategy and high-value client interactions.</p>
            <p>At OptiScale Digital, we've helped numerous local businesses reduce their manual overhead by up to 40% using simple yet powerful AI agents.</p>
          `,
          date: '15 October 2023',
          author: 'David Thorne',
          category: 'AI Automation'
        });
      } finally { 
        setIsLoading(false); 
      }
    };
    if (id) { fetchPost(); }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-light flex justify-center items-center">
        <Loader2 className="animate-spin text-brand-blue" size={48} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-h2 mb-4">Post Not Found</h1>
        <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen pb-20">
      <SEO title={`${post.title} | OptiScale Insights`} description={post.excerpt} />

      <section className="relative w-full overflow-hidden bg-brand-navy pt-16 lg:pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image || IMAGES.blog.heroBg}
            alt={post.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/60 to-brand-navy"></div>
        </div>
        
        <div className="container relative z-10 py-20 lg:py-32">
          <div className="article-width text-center">
            <Link to="/blog" className="inline-flex items-center text-brand-cyan hover:text-white mb-12 transition-colors font-semibold group">
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Insights
            </Link>

            <div className="space-y-6">
              <span className="text-small font-bold uppercase tracking-[0.3em] text-brand-cyan block">
                {post.category}
              </span>
              <h1 className="text-h1 text-white leading-tight mx-auto text-balance">{post.title}</h1>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-gray-300 text-body pt-8 mt-8 border-t border-white/10 max-w-xl mx-auto">
                <div className="flex items-center gap-2"><User size={18} className="text-brand-cyan" /> <span className="font-semibold text-white">{post.author}</span></div>
                <div className="flex items-center gap-2"><Calendar size={18} className="text-brand-cyan" /> <span>{post.date}</span></div>
                <div className="flex items-center gap-2"><Clock size={18} className="text-brand-cyan" /> <span>5 min read</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 lg:mt-24">
        <div className="container article-width">
          <article className="prose-custom">
             <div dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }} />
          </article>

          <div className="mt-20">
            <NewsletterForm 
              title="Enjoyed this insight?"
              description="Subscribe to our newsletter for the latest UK tech trends and automation strategies delivered directly to your inbox."
            />
          </div>
        </div>
      </section>

      <style>{`
        .prose-custom { color: #334155; line-height: 1.8; font-size: 1.125rem; }
        .prose-custom p { margin-bottom: 2rem; }
        .prose-custom h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.4rem; font-weight: 700; margin-top: 3.5rem; margin-bottom: 1.5rem; color: #0f172a; line-height: 1.2; }
        .prose-custom h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.9rem; font-weight: 600; margin-top: 2.5rem; margin-bottom: 1.25rem; color: #0f172a; line-height: 1.2; }
        @media (max-width: 767px) { .prose-custom h2 { font-size: 1.75rem; } .prose-custom h3 { font-size: 1.5rem; } .prose-custom { font-size: 1rem; } }
      `}</style>
    </div>
  );
};
