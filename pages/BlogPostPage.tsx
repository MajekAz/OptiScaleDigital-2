
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Loader2, Share2, Clock, CheckCircle, Facebook, Linkedin, Twitter, Link2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { BlogPost } from '../types';
import { Button } from '../components/Button';
import { NewsletterForm } from '../components/NewsletterForm';
import { IMAGES } from '../assets';

import { BLOG_POSTS } from '../data/blogPosts';

export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-[#1877F2] hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-[#0A66C2] hover:text-white'
    },
    {
      name: 'X',
      icon: <Twitter size={20} />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || '')}`,
      color: 'hover:bg-black hover:text-white'
    }
  ];

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
        const foundFallback = BLOG_POSTS.find(p => String(p.id) === id);
        setPost(foundFallback || BLOG_POSTS[0]);
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
                <button 
                  onClick={() => {
                    const shareSection = document.getElementById('share-section');
                    if (shareSection) shareSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 text-brand-cyan hover:text-white transition-colors cursor-pointer"
                >
                  <Share2 size={18} /> <span>Share</span>
                </button>
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

          <div id="share-section" className="mt-16 pt-10 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="text-brand-navy font-bold mb-2">Share this article</h4>
                <p className="text-gray-500 text-sm">Spread the knowledge with your network.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {shareLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-brand-navy transition-all duration-300 ${link.color} shadow-sm`}
                    title={`Share on ${link.name}`}
                  >
                    {link.icon}
                  </a>
                ))}
                <button
                  onClick={handleCopyLink}
                  className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-brand-navy transition-all duration-300 hover:bg-brand-blue hover:text-white shadow-sm relative`}
                  title="Copy link"
                >
                  {copySuccess ? <CheckCircle size={20} className="text-emerald-500" /> : <Link2 size={20} />}
                  {copySuccess && (
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">
                      Link copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

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
