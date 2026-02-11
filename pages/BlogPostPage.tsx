import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Loader2, AlertCircle, Share2 } from 'lucide-react';
import { IMAGES } from '../assets';
import { SEO } from '../components/SEO';
import { BlogPost } from '../types';
import { Button } from '../components/Button';

export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Since the current PHP implementation returns all posts, we fetch all and filter by ID.
        // In a larger app, you would modify the PHP to accept ?id=X parameter.
        const response = await fetch('./api/blog.php');
        
        const contentType = response.headers.get("content-type");
        if (!response.ok || (contentType && !contentType.includes("application/json"))) {
           throw new Error('API unavailable');
        }

        const data: BlogPost[] = await response.json();
        
        // Loose comparison (==) matches string ID from URL with potentially number ID from DB
        // eslint-disable-next-line eqeqeq
        const foundPost = Array.isArray(data) ? data.find(p => p.id == id) : null;
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        console.warn("Could not fetch specific post, checking fallbacks.");
        
        // Fallback data for Demo/Dev mode
        const fallbackPosts: BlogPost[] = [
          {
            id: '1',
            title: 'The Future of AI in UK Small Business',
            excerpt: 'How local SMEs are leveraging automation to compete with industry giants in 2024.',
            content: `
              <p>Artificial Intelligence is no longer just a buzzword; it is a fundamental shift in how businesses operate. For UK SMEs, the adoption of AI tools offers a unique opportunity to level the playing field against larger competitors.</p>
              <h3>Why AI Matters Now</h3>
              <p>In the current economic climate, efficiency is key. AI automation tools allow small teams to handle workloads that previously required significantly more staff. From automated customer support chatbots to predictive inventory management, the applications are endless.</p>
              <h3>Key Benefits</h3>
              <ul>
                <li><strong>Cost Reduction:</strong> Automating repetitive tasks saves hours of paid labor.</li>
                <li><strong>24/7 Availability:</strong> AI agents don't sleep, ensuring your customers are always attended to.</li>
                <li><strong>Data-Driven Decisions:</strong> AI can analyze vast amounts of data to spot trends you might miss.</li>
              </ul>
              <p>At OptiScale Digital, we help businesses implement these solutions seamlessly. The future is automated, and the time to adapt is now.</p>
            `,
            date: 'Oct 15, 2023',
            author: 'OptiScale',
            category: 'AI Automation'
          },
          {
            id: '2',
            title: 'Mastering GDPR for Digital Marketing',
            excerpt: 'A comprehensive guide to staying compliant while maximizing your outreach in the UK market.',
            content: `<p>Data privacy is paramount in the UK market. This post explores the intricacies of GDPR compliance...</p>`,
            date: 'Nov 02, 2023',
            author: 'Sarah Collins',
            category: 'Digital Marketing'
          },
          {
            id: '3',
            title: 'Web Design Trends to Watch in 2024',
            excerpt: 'From bento grids to neo-brutalism, here is what is defining the London design aesthetic this year.',
            content: `<p>Design is ever-evolving. In 2024, we are seeing a shift towards more bold, expressive typography...</p>`,
            date: 'Dec 10, 2023',
            author: 'David Thorne',
            category: 'Web Design'
          }
        ];

        // eslint-disable-next-line eqeqeq
        const fallback = fallbackPosts.find(p => p.id == id);
        
        if (fallback) {
          setPost(fallback);
          setError(null);
        } else {
          setError("Post not found.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-light dark:bg-brand-dark flex justify-center items-center">
        <Loader2 className="animate-spin text-brand-blue" size={48} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-brand-light dark:bg-brand-dark flex flex-col justify-center items-center p-6 text-center">
        <SEO title="Post Not Found" description="The requested article could not be found." />
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <h1 className="text-2xl font-bold text-brand-navy dark:text-white mb-2">Article Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{error || "The post you are looking for doesn't exist."}</p>
        <Button onClick={() => navigate('/blog')} variant="primary" className="flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-brand-dark min-h-screen transition-colors duration-300">
      <SEO 
        title={`${post.title} | OptiScale Digital Blog`}
        description={post.excerpt}
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
        <div className="container mx-auto px-6 relative z-10">
          <Link to="/blog" className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Insights
          </Link>
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-brand-blue text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <User size={18} className="text-brand-cyan" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-brand-cyan" />
                <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Article Content */}
            <div className="lg:w-2/3">
              <article className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                {/* 
                  Render HTML content safely. 
                  Note: In a production environment with user-generated content, 
                  sanitize this using a library like DOMPurify.
                */}
                <div dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }} />
              </article>

              {/* Share / Footer of Article */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-brand-navy dark:text-white font-bold mb-4 flex items-center gap-2">
                  <Share2 size={20} /> Share this article
                </h4>
                <div className="flex gap-4">
                  <button className="text-gray-500 hover:text-brand-blue transition-colors">Twitter</button>
                  <button className="text-gray-500 hover:text-brand-blue transition-colors">LinkedIn</button>
                  <button className="text-gray-500 hover:text-brand-blue transition-colors">Facebook</button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-8">
                {/* Author Card */}
                <div className="bg-brand-light dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-brand-navy dark:text-white mb-4">About the Author</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-brand-navy dark:text-white">{post.author}</div>
                      <div className="text-xs text-gray-500">Content Creator</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Expert in digital transformation and tech trends at OptiScale Digital.
                  </p>
                </div>

                {/* Call to Action */}
                <div className="bg-brand-navy text-white p-8 rounded-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4">Need help with {post.category}?</h3>
                    <p className="text-gray-300 text-sm mb-6">
                      Our team specializes in {post.category.toLowerCase()} solutions tailored for UK businesses.
                    </p>
                    <Link to="/contact">
                      <Button className="w-full bg-brand-cyan text-brand-navy hover:bg-white border-none">
                        Get a Free Quote
                      </Button>
                    </Link>
                  </div>
                  {/* Decorative Circle */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-blue rounded-full opacity-20"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
