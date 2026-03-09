
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
        const fallbackPosts: BlogPost[] = [
          {
            id: '4',
            title: 'AI Automation for Businesses: A Personal Guide to Getting Started',
            excerpt: 'When I first encountered AI automation, I felt both excitement and anxiety. Could this technology replace my role, or would I need advanced technical skills to keep up?',
            content: `
              <p>When I first encountered AI automation, I felt both excitement and anxiety. Could this technology replace my role, or would I need advanced technical skills to keep up?</p>
              <h2>Understanding AI Automation: What Does It Really Mean?</h2>
              <p>AI automation uses technology to handle repetitive or time-consuming tasks. Think about your daily routine at work: hours sorting emails, updating spreadsheets, or sending reminders. With AI, these chores get done quickly and with fewer mistakes. It is not about replacing people, but about freeing your time for what matters.</p>
              <h2>How AI Changed My Workday</h2>
              <p>At my last job, we had to answer the same customer service questions repeatedly. After we set up an AI chatbot, things improved. The chatbot answered simple questions at any time, freeing my team to address complex problems that needed a human touch. We also made fewer mistakes because the chatbot always gave the correct answer. At first, I worried that people wouldn't want to talk to a robot, but most customers liked getting immediate help.</p>
              <h2>Practical Ways to Use AI in Your Business</h2>
              <p>If you are considering AI automation for your business, start small. Here are some practical ways I have seen AI make a real difference:</p>
              <ul>
                <li><strong>Customer Support:</strong> AI chatbots answer common questions at any time of day.</li>
                <li><strong>Data Entry:</strong> AI tools help fill in forms and update records without errors.</li>
                <li><strong>Scheduling:</strong> AI assistants can schedule meetings and send reminders so you do not miss important dates.</li>
                <li><strong>Marketing:</strong> AI can help you write social media posts or send emails to the right people at the right time.</li>
              </ul>
              <p>These changes do not need a big budget or a team of experts. Many companies start with a few AI tools and grow from there.</p>
              <h2>Lessons Learned: What to Watch Out For</h2>
              <p>I have learned that not every task is suited to AI. Some need a personal touch. For example, upset customers want to speak with a real person. Also, watch your privacy. Understand how your AI tools handle sensitive data.</p>
              <h2>Actionable Tips for Getting Started</h2>
              <ol>
                <li><strong>Start small.</strong> Pick a time-consuming task and find an AI tool to help with it.</li>
                <li><strong>Test the tool</strong> in a focused pilot project to evaluate its effectiveness.</li>
                <li><strong>Ask for feedback.</strong> Talk to your team and customers to ensure the tool is helpful and easy to use.</li>
                <li><strong>Commit to ongoing learning.</strong> AI is evolving rapidly; stay curious and adaptable.</li>
              </ol>
              <h2>Embracing AI, One Step at a Time</h2>
              <p>AI automation made my work easier and more enjoyable. I have more time for what I do best. You do not need to be a tech expert. With small steps and curiosity, you can use AI in your business and get real results. I hope my experience helps you feel confident trying AI yourself.</p>
            `,
            date: 'Mar 09, 2026',
            author: 'OptiScale',
            category: 'AI Automation',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop'
          },
          {
            id: '1',
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
            category: 'AI Automation',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop'
          }
        ];
        const foundFallback = fallbackPosts.find(p => String(p.id) === id);
        setPost(foundFallback || fallbackPosts[0]);
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
