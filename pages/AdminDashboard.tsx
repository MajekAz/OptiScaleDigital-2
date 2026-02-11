import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { Button } from '../components/Button';
import { Trash2, Edit, Plus, Save, X, Loader2, Lock, LogOut } from 'lucide-react';
import { SEO } from '../components/SEO';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState('');
  
  // Data State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Edit/Create State
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost>({
    title: '',
    excerpt: '',
    content: '',
    author: 'OptiScale Team',
    category: 'General',
    date: new Date().toISOString().split('T')[0]
  });

  const checkAuth = () => {
    // Simple check - in production you'd verify against server
    if (apiKey === 'secret123') { // Matches the hardcoded key in your PHP files
      setIsAuthenticated(true);
      fetchPosts();
    } else {
      alert('Invalid Key');
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('./api/blog.php');
      if (!response.ok) throw new Error("API not found");
      const data = await response.json();
      if (Array.isArray(data)) setPosts(data);
    } catch (e) {
      console.warn("API unavailable, using fallback data for demo");
      setPosts([
        {
          id: '1',
          title: 'The Future of AI in UK Small Business',
          excerpt: 'How local SMEs are leveraging automation to compete with industry giants in 2024.',
          content: 'Full content...',
          date: 'Oct 15, 2023',
          author: 'OptiScale',
          category: 'AI Automation'
        },
        {
          id: '2',
          title: 'Mastering GDPR for Digital Marketing',
          excerpt: 'A comprehensive guide to staying compliant while maximizing your outreach in the UK market.',
          content: 'Full content...',
          date: 'Nov 02, 2023',
          author: 'Sarah Collins',
          category: 'Digital Marketing'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`./api/blog.php?key=${apiKey}&id=${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error("API fail");
      const res = await response.json();
      if (res.success) {
        fetchPosts();
      } else {
        alert("Failed to delete: " + res.message);
      }
    } catch (e) {
      // Mock delete for demo
      setPosts(posts.filter(p => p.id !== id));
      alert("Demo Mode: Post deleted locally");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = currentPost.id ? 'PUT' : 'POST';
      const response = await fetch(`./api/blog.php?key=${apiKey}`, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentPost)
      });
      
      if (!response.ok) throw new Error("API fail");

      const res = await response.json();
      
      if (res.success) {
        setIsEditing(false);
        fetchPosts();
        // Reset form
        setCurrentPost({
          title: '',
          excerpt: '',
          content: '',
          author: 'OptiScale Team',
          category: 'General',
          date: new Date().toISOString().split('T')[0]
        });
      } else {
        alert("Error saving: " + res.message);
      }
    } catch (e) {
      // Mock Save for demo
      if (currentPost.id) {
          setPosts(posts.map(p => p.id === currentPost.id ? currentPost : p));
      } else {
          setPosts([...posts, { ...currentPost, id: Date.now().toString() }]);
      }
      setIsEditing(false);
      setCurrentPost({
          title: '',
          excerpt: '',
          content: '',
          author: 'OptiScale Team',
          category: 'General',
          date: new Date().toISOString().split('T')[0]
      });
      alert("Demo Mode: Post saved locally");
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const startNew = () => {
    setCurrentPost({
      title: '',
      excerpt: '',
      content: '',
      author: 'OptiScale Team',
      category: 'General',
      date: new Date().toISOString().split('T')[0]
    });
    setIsEditing(true);
  };

  // ----------------------------------------------------------------------
  // Login View
  // ----------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-light dark:bg-brand-dark flex items-center justify-center p-6">
        <SEO title="Admin Login" description="Restricted access" />
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700">
          <div className="flex justify-center mb-6 text-brand-blue dark:text-brand-cyan">
            <Lock size={48} />
          </div>
          <h1 className="text-2xl font-bold text-center text-brand-navy dark:text-white mb-6">Admin Dashboard</h1>
          <input 
            type="password"
            placeholder="Enter Access Key"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 mb-4 bg-white dark:bg-slate-700 text-brand-navy dark:text-white"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Button onClick={checkAuth} fullWidth>Access Dashboard</Button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // Dashboard View
  // ----------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark pb-20">
      <SEO title="Admin Dashboard" description="Manage content" />
      
      {/* Admin Header */}
      <div className="bg-brand-navy text-white py-4 px-6 shadow-md sticky top-16 z-30 flex justify-between items-center">
        <h2 className="font-bold text-lg">Content Manager</h2>
        <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-sm hover:text-brand-cyan">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="container mx-auto px-6 py-8">
        
        {/* EDIT/CREATE FORM */}
        {isEditing && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
              <h3 className="text-xl font-bold text-brand-navy dark:text-white">
                {currentPost.id ? 'Edit Post' : 'Create New Post'}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-red-500">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Title</label>
                  <input 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent dark:text-white"
                    value={currentPost.title}
                    onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select 
                     className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent dark:text-white"
                     value={currentPost.category}
                     onChange={e => setCurrentPost({...currentPost, category: e.target.value})}
                  >
                    <option>Web Design</option>
                    <option>AI Automation</option>
                    <option>Digital Marketing</option>
                    <option>Tech News</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Short Excerpt (Displayed on Blog Home)</label>
                <textarea 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-24"
                  value={currentPost.excerpt}
                  onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Content (HTML Supported)</label>
                <textarea 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent dark:text-white h-64 font-mono text-sm"
                  value={currentPost.content || ''}
                  onChange={e => setCurrentPost({...currentPost, content: e.target.value})}
                  placeholder="<p>Write your article content here...</p>"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Author</label>
                    <input 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent dark:text-white"
                      value={currentPost.author}
                      onChange={e => setCurrentPost({...currentPost, author: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Date</label>
                    <input 
                      type="date"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent dark:text-white"
                      value={currentPost.date}
                      onChange={e => setCurrentPost({...currentPost, date: e.target.value})}
                    />
                 </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isLoading}>
                   {isLoading ? <Loader2 className="animate-spin" /> : <><Save size={18} className="mr-2" /> Save Post</>}
                </Button>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 rounded-md font-semibold text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* LIST VIEW */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-brand-navy dark:text-white">Existing Posts</h1>
          <Button onClick={startNew} className="flex items-center gap-2">
            <Plus size={20} /> Create New
          </Button>
        </div>

        {isLoading && !isEditing ? (
           <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand-blue" size={40} /></div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-200">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4 hidden md:table-cell">Category</th>
                  <th className="p-4 hidden md:table-cell">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-brand-light dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 font-semibold text-brand-navy dark:text-white">{post.title}</td>
                    <td className="p-4 hidden md:table-cell text-gray-600 dark:text-gray-300">{post.category}</td>
                    <td className="p-4 hidden md:table-cell text-gray-500 dark:text-gray-400">{post.date}</td>
                    <td className="p-4 flex justify-end gap-3">
                      <button 
                        onClick={() => startEdit(post)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:hover:bg-blue-900/30 transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id!)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:hover:bg-red-900/30 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">No posts found. Create one to get started.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};