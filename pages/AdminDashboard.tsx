
import React, { useState, useEffect, useRef } from 'react';
import { BlogPost } from '../types';
import { Button } from '../components/Button';
import { 
  Trash2, Edit, Plus, Save, X, Loader2, Lock, LogOut, 
  LayoutDashboard, FileText, Image as ImageIcon, ExternalLink, 
  CheckCircle2, Clock, MoreVertical, Search, MessageSquare, 
  Calendar as CalendarIcon, TrendingUp, Users, Upload, ImagePlus,
  Send, CalendarDays, AlertTriangle, Database, Info, Mail
} from 'lucide-react';
import { SEO } from '../components/SEO';

type AdminView = 'dashboard' | 'all-posts' | 'create' | 'leads' | 'media';

interface Lead {
  id: string | number;
  name: string;
  email: string;
  message?: string;
  service?: string;
  booking_date?: string;
  booking_time?: string;
  created_at: string;
  type: 'contact' | 'booking' | 'subscriber';
}

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scheduleInputRef = useRef<HTMLInputElement>(null);
  
  // Data State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScheduleHint, setShowScheduleHint] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  // Edit/Create State
  const [currentPost, setCurrentPost] = useState<BlogPost>({
    title: '',
    excerpt: '',
    content: '',
    author: 'OptiScale Team',
    category: 'Web Design',
    image: '',
    status: 'published',
    scheduled_at: '',
    date: new Date().toISOString().split('T')[0]
  });

  const checkAuth = () => {
    if (apiKey === 'secret123') {
      setIsAuthenticated(true);
      fetchAllData();
    } else {
      alert('Invalid Key');
    }
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    setIsDemoMode(false);
    try {
      // 1. Fetch Posts
      const postRes = await fetch(`./api/blog.php?key=${apiKey}`);
      if (!postRes.ok) throw new Error();
      const postData = await postRes.json();
      if (Array.isArray(postData)) setPosts(postData);

      // 2. Fetch All Leads (Contacts, Bookings, Subscribers)
      const leadRes = await fetch(`./api/admin_data.php?key=${apiKey}`);
      if (!leadRes.ok) throw new Error();
      const leadData = await leadRes.json();
      if (leadData.success) {
        setLeads(leadData.data);
      }
    } catch (e) {
      console.warn("Using demo data due to API error or missing connection.");
      setIsDemoMode(true);
      setPosts([
        { id: '1', title: 'The Future of AI in UK Small Business', excerpt: 'Leveraging automation in 2024.', date: '2023-10-15', author: 'OptiScale', category: 'AI Automation', status: 'published', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop' },
        { id: '2', title: 'Mastering GDPR for Digital Marketing', excerpt: 'Stay compliant in the UK market.', date: '2023-11-02', author: 'Sarah Collins', category: 'Digital Marketing', status: 'scheduled', scheduled_at: '2025-12-01T12:00', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop' }
      ]);
      setLeads([
        { id: 1, name: 'John Smith', email: 'john@example.com', message: 'Interested in a new website.', created_at: '2023-11-20', type: 'contact' },
        { id: 2, name: 'Alice Cooper', email: 'alice@tech.uk', service: 'AI Automation', booking_date: '2023-12-05', booking_time: '14:30', created_at: '2023-11-21', type: 'booking' },
        { id: 3, name: 'Newsletter Subscriber', email: 'marketing@startup.co', service: 'Newsletter', created_at: '2023-11-22', type: 'subscriber' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCurrentPost({ ...currentPost, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const onScheduleClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPost.status !== 'scheduled') {
      setCurrentPost({ ...currentPost, status: 'scheduled' });
      setShowScheduleHint(true);
      setTimeout(() => scheduleInputRef.current?.focus(), 100);
      return;
    }
    if (!currentPost.scheduled_at) {
      setShowScheduleHint(true);
      scheduleInputRef.current?.focus();
      return;
    }
    handleSave(e, 'scheduled');
  };

  const handleSave = async (e: React.FormEvent, overrideStatus?: 'published' | 'scheduled' | 'draft') => {
    e.preventDefault();
    const finalStatus = overrideStatus || currentPost.status;
    if (finalStatus === 'scheduled' && !currentPost.scheduled_at) {
      setShowScheduleHint(true);
      scheduleInputRef.current?.focus();
      return;
    }
    setIsLoading(true);
    const postToSave = { ...currentPost, status: finalStatus };
    try {
      const method = postToSave.id ? 'PUT' : 'POST';
      const res = await fetch(`./api/blog.php?key=${apiKey}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postToSave)
      });
      const data = await res.json();
      if (data.success) {
        fetchAllData();
        setActiveView('all-posts');
      } else {
        throw new Error(data.error || 'Failed to save');
      }
    } catch (e) {
      alert("Save failed. Ensure database tables are ready via api/setup.php");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (type: 'post' | 'lead', id: any) => {
    if (!window.confirm("Confirm deletion?")) return;
    if (type === 'post') {
      fetch(`./api/blog.php?key=${apiKey}&id=${id}`, { method: 'DELETE' }).then(() => fetchAllData());
    } else {
      setLeads(leads.filter(l => l.id !== id));
      alert("Lead entry hidden (demo). In a live environment, this would delete from DB.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 font-sans">
        <SEO title="Admin Login" description="Restricted access" />
        <div className="bg-brand-navy p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-800 text-center">
          <div className="flex justify-center mb-6 text-brand-cyan">
            <div className="p-4 bg-brand-cyan/10 rounded-2xl"><Lock size={40} /></div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400 text-sm mb-8">Enter your security key to manage content.</p>
          <input 
            type="password"
            placeholder="Security Key"
            className="w-full px-5 py-4 rounded-xl border border-slate-700 mb-6 bg-slate-900/50 text-white focus:border-brand-cyan outline-none transition-all"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAuth()}
          />
          <Button onClick={checkAuth} fullWidth variant="primary" className="bg-brand-cyan text-brand-navy">Verify Access</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200 flex font-sans">
      <SEO title="Admin Dashboard" description="OptiScale Content Management" />
      
      <aside className="w-64 bg-brand-navy border-r border-slate-800 flex flex-col hidden lg:flex sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white font-black">O</div>
            <span className="font-bold text-white tracking-tight">Admin Console</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <SidebarLink active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} icon={<LayoutDashboard size={20} />} label="Overview" />
          <SidebarLink active={activeView === 'leads'} onClick={() => setActiveView('leads')} icon={<Users size={20} />} label="Inquiries & Leads" />
          <SidebarLink active={activeView === 'all-posts'} onClick={() => setActiveView('all-posts')} icon={<FileText size={20} />} label="All Posts" />
          <SidebarLink active={activeView === 'create'} onClick={() => { setCurrentPost({ title: '', excerpt: '', content: '', author: 'OptiScale Team', category: 'Web Design', image: '', status: 'published', scheduled_at: '', date: new Date().toISOString().split('T')[0] }); setActiveView('create'); }} icon={<Plus size={20} />} label="Create New" />
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all font-medium">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-auto">
        <header className="h-16 border-b border-slate-800 bg-brand-navy/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-white capitalize">{activeView.replace('-', ' ')}</h2>
            {isDemoMode && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest rounded-full">
                <Info size={12} /> Demo Mode
              </span>
            )}
            {!isDemoMode && !isLoading && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest rounded-full">
                <Database size={12} /> Connected
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
             <div className="relative hidden md:block">
               <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
               <input type="text" placeholder="Search data..." className="bg-slate-900/50 border border-slate-700 rounded-full pl-10 pr-4 py-1.5 text-sm focus:border-brand-cyan outline-none transition-all w-64" />
             </div>
             <button onClick={fetchAllData} className="p-2 text-slate-400 hover:text-white transition-colors">
               <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
             </button>
             <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan text-xs font-bold border border-brand-cyan/30">AD</div>
          </div>
        </header>

        <div className="p-8 max-w-[1200px] mx-auto">
          {activeView === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={<FileText className="text-blue-400" />} label="Total Posts" value={posts.length} change="Live on blog" />
                <StatCard icon={<Users className="text-emerald-400" />} label="Total Leads" value={leads.length} change="Combined data" />
                <StatCard icon={<MessageSquare className="text-brand-cyan" />} label="Contacts" value={leads.filter(l => l.type === 'contact').length} change="Direct inquiries" />
                <StatCard icon={<CalendarIcon className="text-purple-400" />} label="Bookings" value={leads.filter(l => l.type === 'booking').length} change="Scheduled calls" />
              </div>
              <div className="bg-brand-navy p-6 rounded-2xl border border-slate-800 shadow-xl">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2"><TrendingUp size={20} className="text-brand-cyan" /> Recent Activity</h3>
                  <div className="space-y-4">
                    {leads.length > 0 ? leads.slice(0, 5).map(lead => (
                      <div key={`${lead.type}-${lead.id}`} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            lead.type === 'booking' ? 'bg-purple-500/10 text-purple-400' : 
                            lead.type === 'subscriber' ? 'bg-emerald-500/10 text-emerald-400' :
                            'bg-brand-cyan/10 text-brand-cyan'
                          }`}>
                            {lead.type === 'booking' ? <CalendarIcon size={18} /> : 
                             lead.type === 'subscriber' ? <Mail size={18} /> : 
                             <MessageSquare size={18} />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{lead.name}</p>
                            <p className="text-xs text-slate-500 capitalize">{lead.type}</p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-500">{new Date(lead.created_at).toLocaleDateString()}</span>
                      </div>
                    )) : (
                      <div className="py-10 text-center text-slate-500">No activity yet. Your form submissions will appear here.</div>
                    )}
                  </div>
              </div>
            </div>
          )}

          {activeView === 'leads' && (
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-2xl font-bold text-white">Inquiries & Leads</h1>
              <div className="bg-brand-navy rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                {leads.length > 0 ? (
                  <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-800">
                      <tr><th className="px-6 py-4">Lead Source</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Details</th><th className="px-6 py-4">Date</th><th className="px-6 py-4 text-right">Actions</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {leads.map((lead) => (
                        <tr key={`${lead.type}-${lead.id}`} className="hover:bg-slate-900/30 transition-colors">
                          <td className="px-6 py-5">
                            <p className="font-bold text-white">{lead.name}</p>
                            <p className="text-xs text-slate-500">{lead.email}</p>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                              lead.type === 'booking' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                              lead.type === 'subscriber' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20'
                            }`}>
                              {lead.type}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-sm text-slate-400">
                            {lead.type === 'booking' ? `${lead.service} @ ${lead.booking_time} on ${lead.booking_date}` : 
                             lead.type === 'subscriber' ? 'Newsletter Opt-in' : 
                             lead.message?.substring(0, 50) + (lead.message && lead.message.length > 50 ? '...' : '')}
                          </td>
                          <td className="px-6 py-5 text-sm text-slate-500">{new Date(lead.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-5 text-right flex justify-end gap-2">
                            <button onClick={() => handleDelete('lead', lead.id)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg"><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center text-center px-6">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-600 mb-4">
                       <Users size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Inquiries Found</h3>
                    <p className="text-slate-400 max-w-sm">When users complete your contact, booking, or newsletter forms, their details will appear here automatically.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeView === 'all-posts' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Post Management</h1>
                <Button onClick={() => setActiveView('create')} className="bg-brand-blue text-white flex items-center gap-2"><Plus size={20} /> New Article</Button>
              </div>
              <div className="bg-brand-navy rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left">
                  <thead className="bg-slate-900/50 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-800">
                    <tr><th className="px-6 py-4">Status</th><th className="px-6 py-4">Title</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Date</th><th className="px-6 py-4 text-right">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-900/30 transition-colors">
                        <td className="px-6 py-5"><StatusBadge status={post.status || 'published'} scheduledAt={post.scheduled_at} /></td>
                        <td className="px-6 py-5 font-bold text-white">{post.title}</td>
                        <td className="px-6 py-5 text-slate-400">{post.category}</td>
                        <td className="px-6 py-5 text-slate-500">{post.date}</td>
                        <td className="px-6 py-5 text-right flex justify-end gap-2">
                          <button onClick={() => { setCurrentPost(post); setActiveView('create'); }} className="p-2 text-brand-blue hover:bg-brand-blue/10 rounded-lg"><Edit size={16} /></button>
                          <button onClick={() => handleDelete('post', post.id)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeView === 'create' && (
            <div className="animate-fade-in space-y-6">
               <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                 <button onClick={() => { setActiveView('all-posts'); setShowScheduleHint(false); }} className="text-slate-400 flex items-center gap-2 hover:text-white transition-colors"><X size={20}/> Cancel</button>
                 <div className="flex gap-3 w-full sm:w-auto">
                   <Button onClick={(e) => handleSave(e, 'draft')} variant="outline" className="flex-1 sm:flex-none border-slate-700 text-slate-300">Save Draft</Button>
                   <Button onClick={onScheduleClick} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 transition-all ${currentPost.status === 'scheduled' ? 'bg-purple-600 ring-2 ring-purple-400 text-white' : 'bg-brand-navy border border-purple-500/50 text-purple-400 hover:bg-purple-900/20'}`}>
                     <CalendarDays size={18} /> {currentPost.status === 'scheduled' ? 'Confirm Schedule' : 'Schedule Post'}
                   </Button>
                   <Button onClick={(e) => handleSave(e, 'published')} className="flex-1 sm:flex-none bg-brand-cyan text-brand-navy flex items-center justify-center gap-2"><Send size={18}/> Publish Now</Button>
                 </div>
               </div>
               <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-brand-navy p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-widest">Article Title</label>
                        <input className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none" value={currentPost.title} onChange={e => setCurrentPost({...currentPost, title: e.target.value})} placeholder="e.g. 10 Tips for Business Automation" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-widest">Short Excerpt</label>
                        <textarea className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none h-24" value={currentPost.excerpt} onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})} placeholder="Summary for blog listing card..." />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-widest">Full Content (HTML Supported)</label>
                        <textarea className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white h-96 font-mono text-sm focus:border-brand-cyan outline-none" value={currentPost.content} onChange={e => setCurrentPost({...currentPost, content: e.target.value})} placeholder="Write your article content here..." />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-brand-navy p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
                       <div>
                         <label className="block text-xs font-bold uppercase text-slate-500 mb-4 tracking-widest">Featured Image</label>
                         <div onClick={() => fileInputRef.current?.click()} className="aspect-video bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-cyan group transition-all relative overflow-hidden">
                           {currentPost.image ? (
                             <><img src={currentPost.image} alt="Preview" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><ImagePlus className="text-white" size={32} /></div></>
                           ) : (
                             <><Upload className="text-slate-600 mb-2 group-hover:text-brand-cyan transition-colors" size={32} /><span className="text-slate-500 text-xs font-medium">Click to upload</span></>
                           )}
                           <input type="file" className="hidden" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
                         </div>
                       </div>
                       <div className="space-y-4">
                         <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-widest">Post Status</label>
                            <select 
                              className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none transition-all ${currentPost.status === 'scheduled' ? 'border-purple-500/50' : 'border-slate-700'}`}
                              value={currentPost.status}
                              onChange={e => setCurrentPost({...currentPost, status: e.target.value as any})}
                            >
                              <option value="published">Published</option>
                              <option value="scheduled">Scheduled</option>
                              <option value="draft">Draft</option>
                            </select>
                         </div>
                         {currentPost.status === 'scheduled' && (
                           <div className={`animate-fade-in p-4 rounded-xl border transition-all ${showScheduleHint && !currentPost.scheduled_at ? 'bg-purple-900/20 border-purple-500' : 'bg-slate-900/50 border-purple-500/30'}`}>
                             <label className="block text-xs font-bold uppercase text-purple-400 mb-2 tracking-widest flex items-center gap-2">
                               <Clock size={14} /> Release Date & Time
                             </label>
                             <input 
                              type="datetime-local" 
                              ref={scheduleInputRef}
                              className="w-full bg-transparent border-b border-purple-500/30 py-2 text-white focus:border-purple-400 outline-none" 
                              value={currentPost.scheduled_at} 
                              onChange={e => { setCurrentPost({...currentPost, scheduled_at: e.target.value}); setShowScheduleHint(false); }} 
                             />
                             {showScheduleHint && !currentPost.scheduled_at && (
                               <p className="text-[10px] text-rose-400 mt-2 flex items-center gap-1 font-bold animate-pulse">
                                 <AlertTriangle size={10} /> Please select a date to enable scheduling.
                               </p>
                             )}
                           </div>
                         )}
                         <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-widest">Category</label>
                            <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none" value={currentPost.category} onChange={e => setCurrentPost({...currentPost, category: e.target.value})}>
                              <option>Web Design</option><option>AI Automation</option><option>Digital Marketing</option><option>Tech Trends</option>
                            </select>
                         </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const RefreshCw: React.FC<{ className?: string, size?: number }> = ({ className, size = 18 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
);

const StatusBadge: React.FC<{ status: string, scheduledAt?: string }> = ({ status, scheduledAt }) => {
  if (status === 'published') return <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase rounded border border-emerald-500/20">Live</span>;
  if (status === 'draft') return <span className="px-2 py-1 bg-slate-500/10 text-slate-400 text-[10px] font-bold uppercase rounded border border-slate-500/20">Draft</span>;
  return (
    <div className="flex flex-col gap-1">
      <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase rounded border border-purple-500/20 w-fit flex items-center gap-1"><Clock size={10} /> Scheduled</span>
      {scheduledAt && <span className="text-[10px] text-slate-500">{new Date(scheduledAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>}
    </div>
  );
};

const SidebarLink: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactNode, label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${active ? 'bg-brand-blue text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
    {icon} <span>{label}</span>
  </button>
);

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: number, change: string }> = ({ icon, label, value, change }) => (
  <div className="bg-brand-navy p-6 rounded-2xl border border-slate-800 shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-slate-800/50 rounded-lg">{icon}</div>
      <span className="text-[10px] font-bold text-slate-500 uppercase">{change}</span>
    </div>
    <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{label}</h4>
    <p className="text-3xl font-black text-white mt-1">{value}</p>
  </div>
);
