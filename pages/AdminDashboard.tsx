import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BlogPost } from '../types';
import { Button } from '../components/Button';
import { 
  Trash2, Edit, Plus, Save, X, Loader2, Lock, LogOut, 
  LayoutDashboard, FileText, Image as ImageIcon, ExternalLink, 
  CheckCircle2, Clock, MoreVertical, Search, MessageSquare, 
  Calendar as CalendarIcon, TrendingUp, Users, Upload, ImagePlus,
  Send, CalendarDays, AlertTriangle, Database, Info, Mail,
  RefreshCw, BarChart, PieChart as PieChartIcon, Activity,
  ArrowUpRight, ArrowDownRight, ChevronRight
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, BarChart as ReBarChart, 
  Bar, Cell, PieChart, Pie 
} from 'recharts';

type AdminView = 'dashboard' | 'all-posts' | 'create' | 'leads';

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
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Mock Analytics Data
  const analyticsData = useMemo(() => [
    { name: 'Mon', leads: 4, traffic: 240, conversion: 2.4 },
    { name: 'Tue', leads: 7, traffic: 300, conversion: 2.8 },
    { name: 'Wed', leads: 5, traffic: 280, conversion: 2.1 },
    { name: 'Thu', leads: 12, traffic: 450, conversion: 3.5 },
    { name: 'Fri', leads: 9, traffic: 390, conversion: 3.0 },
    { name: 'Sat', leads: 3, traffic: 150, conversion: 1.8 },
    { name: 'Sun', leads: 6, traffic: 210, conversion: 2.2 },
  ], []);

  const serviceDistribution = useMemo(() => [
    { name: 'Web Design', value: 45, color: '#3b82f6' },
    { name: 'Marketing', value: 30, color: '#a855f7' },
    { name: 'AI Automation', value: 25, color: '#10b981' },
  ], []);
  
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

      // 2. Fetch All Leads (Contacts, Bookings, Subscribers combined via admin_data.php)
      const leadRes = await fetch(`./api/admin_data.php?key=${apiKey}`);
      if (!leadRes.ok) throw new Error();
      const leadData = await leadRes.json();
      if (leadData.success) {
        setLeads(leadData.data);
      }
    } catch (e) {
      console.warn("Using demo data due to connection issues.");
      setIsDemoMode(true);
      // Demo fallback data
      setPosts([
        { id: '1', title: 'Future of AI', excerpt: 'Demo data...', date: '2023-10-15', author: 'OptiScale', category: 'AI Automation', status: 'published' }
      ]);
      setLeads([
        { id: 1, name: 'Demo Contact', email: 'demo@optiscale.uk', message: 'Hello from demo!', created_at: '2023-11-20', type: 'contact' },
        { id: 2, name: 'Demo Booking', email: 'book@optiscale.uk', service: 'AI Audit', booking_date: '2023-12-05', booking_time: '14:30', created_at: '2023-11-21', type: 'booking' },
        { id: 3, name: 'Newsletter Member', email: 'news@optiscale.uk', created_at: '2023-11-22', type: 'subscriber' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent, overrideStatus?: any) => {
    e.preventDefault();
    setIsLoading(true);
    const postToSave = { ...currentPost, status: overrideStatus || currentPost.status };
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
      alert("Operation failed. Ensure database tables are created via api/setup.php");
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
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6">
        <SEO title="Admin Login" description="Restricted access" />
        <div className="bg-brand-navy p-8 rounded-3xl shadow-2xl w-full max-w-md text-center border border-slate-800">
          <div className="flex justify-center mb-6 text-brand-cyan"><Lock size={40} /></div>
          <h1 className="text-2xl font-bold text-white mb-8">Admin Portal</h1>
          <input 
            type="password"
            placeholder="Security Key"
            className="w-full px-5 py-4 rounded-xl border border-slate-700 mb-6 bg-slate-900/50 text-white focus:border-brand-cyan outline-none"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAuth()}
          />
          <Button onClick={checkAuth} fullWidth>Verify Access</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200 flex font-sans">
      <SEO title="Admin Dashboard" description="OptiScale CMS" />
      
      {/* Sidebar */}
      <aside className="w-64 bg-brand-navy border-r border-slate-800 flex flex-col hidden lg:flex sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white font-black">O</div>
          <span className="font-bold text-white">Admin Console</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} icon={<LayoutDashboard size={20} />} label="Overview" />
          <SidebarLink active={activeView === 'leads'} onClick={() => setActiveView('leads')} icon={<Users size={20} />} label="Enquiries" />
          <SidebarLink active={activeView === 'all-posts'} onClick={() => setActiveView('all-posts')} icon={<FileText size={20} />} label="Blog Posts" />
          <SidebarLink active={activeView === 'create'} onClick={() => { setActiveView('create'); setCurrentPost({ title: '', excerpt: '', content: '', author: 'OptiScale Team', category: 'Web Design', image: '', status: 'published', scheduled_at: '', date: new Date().toISOString().split('T')[0] }); }} icon={<Plus size={20} />} label="New Post" />
        </nav>
        <button onClick={() => setIsAuthenticated(false)} className="p-6 text-slate-500 hover:text-rose-400 flex items-center gap-3 transition-colors">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <header className="h-16 border-b border-slate-800 bg-brand-navy/50 px-8 flex items-center justify-between sticky top-0 z-40">
          <h2 className="text-lg font-bold text-white capitalize">{activeView.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
             {isDemoMode && <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full font-bold uppercase tracking-widest border border-amber-500/20">Demo Mode</span>}
             <button onClick={fetchAllData} className="p-2 text-slate-400 hover:text-white"><RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} /></button>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          {activeView === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                  icon={<MessageSquare className="text-brand-cyan" />} 
                  label="Contacts" 
                  value={leads.filter(l => l.type === 'contact').length} 
                  trend="+12%" 
                  trendUp={true}
                />
                <StatCard 
                  icon={<CalendarIcon className="text-purple-400" />} 
                  label="Bookings" 
                  value={leads.filter(l => l.type === 'booking').length} 
                  trend="+5%" 
                  trendUp={true}
                />
                <StatCard 
                  icon={<Mail className="text-emerald-400" />} 
                  label="Subscribers" 
                  value={leads.filter(l => l.type === 'subscriber').length} 
                  trend="-2%" 
                  trendUp={false}
                />
                <StatCard 
                  icon={<FileText className="text-blue-400" />} 
                  label="Total Posts" 
                  value={posts.length} 
                  trend="+1" 
                  trendUp={true}
                />
              </div>
              
              {/* Charts Row */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Growth Chart */}
                <div className="lg:col-span-2 bg-brand-navy p-6 rounded-2xl border border-slate-800 shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-white font-bold">Growth Performance</h3>
                      <p className="text-xs text-slate-500 mt-1">Lead generation vs Website traffic (Weekly)</p>
                    </div>
                    <select className="bg-slate-900 border border-slate-800 text-xs text-slate-400 rounded-lg px-3 py-1.5 outline-none focus:border-brand-blue">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData}>
                        <defs>
                          <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#64748b" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                          dy={10}
                        />
                        <YAxis 
                          stroke="#64748b" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                          tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                          itemStyle={{ color: '#f8fafc' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="leads" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorLeads)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Service Distribution */}
                <div className="bg-brand-navy p-6 rounded-2xl border border-slate-800 shadow-xl">
                  <h3 className="text-white font-bold mb-8">Service Interest</h3>
                  <div className="h-[220px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={serviceDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {serviceDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-black text-white">100%</span>
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Inbound</span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    {serviceDistribution.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-xs text-slate-400">{item.name}</span>
                        </div>
                        <span className="text-xs font-bold text-white">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-brand-navy p-6 rounded-2xl border border-slate-800 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-bold">Recent Activity</h3>
                    <button onClick={() => setActiveView('leads')} className="text-xs text-brand-blue hover:underline font-bold">View All</button>
                  </div>
                  <div className="space-y-4">
                    {leads.slice(0, 5).map(lead => (
                      <div key={`${lead.type}-${lead.id}`} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0 group">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110 ${lead.type === 'booking' ? 'bg-purple-500/10 text-purple-400' : lead.type === 'subscriber' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-brand-cyan/10 text-brand-cyan'}`}>
                            {lead.type === 'booking' ? <CalendarIcon size={18} /> : lead.type === 'subscriber' ? <Mail size={18} /> : <MessageSquare size={18} />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{lead.name || lead.email}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-2">
                              <span className="capitalize">{lead.type}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                              <span>{lead.service || 'General Enquiry'}</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-400 font-medium">{new Date(lead.created_at).toLocaleDateString()}</p>
                          <p className="text-[10px] text-slate-600 uppercase font-bold tracking-tighter">Processed</p>
                        </div>
                      </div>
                    ))}
                    {leads.length === 0 && (
                      <div className="py-12 text-center">
                        <Activity size={40} className="text-slate-800 mx-auto mb-4" />
                        <p className="text-slate-500 text-sm">No recent activity found.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <div className="bg-brand-navy p-6 rounded-2xl border border-slate-800 shadow-xl">
                    <h3 className="text-white font-bold mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <QuickActionBtn onClick={() => setActiveView('create')} icon={<Plus size={18} />} label="New Blog Post" color="bg-brand-blue" />
                      <QuickActionBtn onClick={() => setActiveView('leads')} icon={<Users size={18} />} label="Review Leads" color="bg-brand-cyan" />
                      <QuickActionBtn onClick={() => window.open('/', '_blank')} icon={<ExternalLink size={18} />} label="View Live Site" color="bg-slate-700" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-brand-blue to-brand-cyan p-6 rounded-2xl shadow-xl text-white relative overflow-hidden group">
                    <div className="relative z-10">
                      <h4 className="font-black text-lg mb-2">Need Support?</h4>
                      <p className="text-white/80 text-xs leading-relaxed mb-4">Our engineering team is available 24/7 for technical assistance.</p>
                      <button className="bg-white text-brand-navy px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all">
                        Contact Devs
                      </button>
                    </div>
                    <Database size={120} className="absolute -bottom-10 -right-10 text-white/10 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'leads' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-white">All Enquiries</h1>
              <div className="bg-brand-navy rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left">
                  <thead className="bg-slate-900/50 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-800">
                    <tr><th className="px-6 py-4">Lead Source</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Details</th><th className="px-6 py-4">Date</th><th className="px-6 py-4 text-right">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {leads.map((lead) => (
                      <tr key={`${lead.type}-${lead.id}`} className="hover:bg-slate-900/30 transition-colors">
                        <td className="px-6 py-5">
                          <p className="font-bold text-white">{lead.name}</p>
                          <p className="text-xs text-slate-500">{lead.email}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${lead.type === 'booking' ? 'border-purple-500/30 text-purple-400' : lead.type === 'subscriber' ? 'border-emerald-500/30 text-emerald-400' : 'border-brand-cyan/30 text-brand-cyan'}`}>
                            {lead.type}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-400">
                          {lead.type === 'booking' ? `${lead.service} @ ${lead.booking_time} on ${lead.booking_date}` : lead.message?.substring(0, 40) + '...'}
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-500">{new Date(lead.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-5 text-right">
                          <button onClick={() => handleDelete('lead', lead.id)} className="text-rose-500 p-2 hover:bg-rose-500/10 rounded-lg"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ... Other views (all-posts, create) follow existing pattern ... */}
          {activeView === 'all-posts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Post Management</h1>
                <Button onClick={() => {
                  setCurrentPost({ title: '', excerpt: '', content: '', author: 'OptiScale Team', category: 'Web Design', image: '', status: 'published', scheduled_at: '', date: new Date().toISOString().split('T')[0] });
                  setActiveView('create');
                }} className="flex items-center gap-2"><Plus size={18} /> New Article</Button>
              </div>
              <div className="bg-brand-navy rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left">
                  <thead className="bg-slate-900/50 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-800">
                    <tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Date</th><th className="px-6 py-4 text-right">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {posts.map(post => (
                      <tr key={post.id} className="hover:bg-slate-900/30 transition-colors">
                        <td className="px-6 py-5 font-bold text-white">{post.title}</td>
                        <td className="px-6 py-5">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${post.status === 'published' ? 'border-emerald-500/30 text-emerald-400' : 'border-slate-500/30 text-slate-500'}`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-500">{post.date}</td>
                        <td className="px-6 py-5 text-right flex justify-end gap-2">
                          <button onClick={() => { setCurrentPost(post); setActiveView('create'); }} className="text-brand-blue p-2 hover:bg-brand-blue/10 rounded-lg"><Edit size={16}/></button>
                          <button onClick={() => handleDelete('post', post.id)} className="text-rose-500 p-2 hover:bg-rose-500/10 rounded-lg"><Trash2 size={16}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeView === 'create' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-black text-white">{currentPost.id ? 'Edit Article' : 'Craft New Article'}</h1>
                  <p className="text-slate-500 mt-2">Publish high-performance insights to your audience.</p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveView('all-posts')}
                    className="px-6 py-3 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all font-bold text-sm"
                  >
                    Discard
                  </button>
                  <Button onClick={(e) => handleSave(e)} className="flex items-center gap-2">
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {currentPost.id ? 'Update Post' : 'Publish Now'}
                  </Button>
                </div>
              </div>

              <form onSubmit={handleSave} className="grid lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-brand-navy p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Article Headline</label>
                      <input 
                        type="text"
                        placeholder="Enter a compelling title..."
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-6 py-4 text-xl font-bold text-white focus:border-brand-blue outline-none transition-all"
                        value={currentPost.title}
                        onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Short Excerpt</label>
                      <textarea 
                        placeholder="A brief summary for the blog listing page..."
                        rows={3}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-6 py-4 text-slate-300 focus:border-brand-blue outline-none transition-all resize-none"
                        value={currentPost.excerpt}
                        onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Article Content (Markdown Supported)</label>
                      <textarea 
                        placeholder="Write your masterpiece here..."
                        rows={15}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-6 py-4 text-slate-300 focus:border-brand-blue outline-none transition-all font-mono text-sm leading-relaxed"
                        value={currentPost.content}
                        onChange={e => setCurrentPost({...currentPost, content: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                  <div className="bg-brand-navy p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
                    <h3 className="text-white font-bold flex items-center gap-2 border-b border-slate-800 pb-4 mb-2">
                      <Info size={18} className="text-brand-blue" /> Post Settings
                    </h3>
                    
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Category</label>
                      <select 
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:border-brand-blue outline-none"
                        value={currentPost.category}
                        onChange={e => setCurrentPost({...currentPost, category: e.target.value})}
                      >
                        <option>Web Design</option>
                        <option>AI Automation</option>
                        <option>Digital Marketing</option>
                        <option>Case Study</option>
                        <option>Company News</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Author Name</label>
                      <input 
                        type="text"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:border-brand-blue outline-none"
                        value={currentPost.author}
                        onChange={e => setCurrentPost({...currentPost, author: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Publication Date</label>
                      <input 
                        type="date"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:border-brand-blue outline-none"
                        value={currentPost.date}
                        onChange={e => setCurrentPost({...currentPost, date: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="bg-brand-navy p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
                    <h3 className="text-white font-bold flex items-center gap-2 border-b border-slate-800 pb-4 mb-2">
                      <ImageIcon size={18} className="text-brand-cyan" /> Featured Image
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="aspect-video w-full bg-slate-900 rounded-xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center overflow-hidden group relative">
                        {currentPost.image ? (
                          <>
                            <img src={currentPost.image} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button onClick={() => setCurrentPost({...currentPost, image: ''})} className="text-white bg-rose-500 p-2 rounded-full"><X size={20}/></button>
                            </div>
                          </>
                        ) : (
                          <div className="text-center p-6">
                            <ImagePlus size={32} className="text-slate-700 mx-auto mb-2" />
                            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">No Image Selected</p>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Image URL</label>
                        <div className="flex gap-2">
                          <input 
                            type="text"
                            placeholder="https://..."
                            className="flex-1 bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 text-xs text-white focus:border-brand-blue outline-none"
                            value={currentPost.image}
                            onChange={e => setCurrentPost({...currentPost, image: e.target.value})}
                          />
                        </div>
                        <p className="text-[10px] text-slate-600 mt-2">Use Unsplash or Picsum for high-quality placeholders.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-brand-navy p-8 rounded-3xl border border-slate-800 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-bold text-white uppercase tracking-widest">Visibility</span>
                      <div className={`px-2 py-1 rounded text-[10px] font-black uppercase ${currentPost.status === 'published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'}`}>
                        {currentPost.status}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        type="button"
                        onClick={() => setCurrentPost({...currentPost, status: 'draft'})}
                        className={`py-2 rounded-lg text-xs font-bold border transition-all ${currentPost.status === 'draft' ? 'bg-slate-700 border-slate-600 text-white' : 'border-slate-800 text-slate-500 hover:border-slate-700'}`}
                      >
                        Draft
                      </button>
                      <button 
                        type="button"
                        onClick={() => setCurrentPost({...currentPost, status: 'published'})}
                        className={`py-2 rounded-lg text-xs font-bold border transition-all ${currentPost.status === 'published' ? 'bg-brand-blue border-brand-blue text-white' : 'border-slate-800 text-slate-500 hover:border-brand-blue'}`}
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const StatCard: React.FC<{icon: any, label: string, value: number, trend?: string, trendUp?: boolean}> = ({ icon, label, value, trend, trendUp }) => (
  <div className="bg-brand-navy p-6 rounded-2xl border border-slate-800 shadow-xl hover:border-slate-700 transition-colors group">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-slate-800/50 rounded-lg group-hover:scale-110 transition-transform">{icon}</div>
      {trend && (
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
          {trendUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {trend}
        </div>
      )}
    </div>
    <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{label}</h4>
    <p className="text-3xl font-black text-white mt-1">{value}</p>
  </div>
);

const QuickActionBtn: React.FC<{onClick: () => void, icon: any, label: string, color: string}> = ({ onClick, icon, label, color }) => (
  <button 
    onClick={onClick}
    className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all group w-full"
  >
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-white`}>
        {icon}
      </div>
      <span className="text-sm font-bold text-slate-300 group-hover:text-white">{label}</span>
    </div>
    <ChevronRight size={16} className="text-slate-600 group-hover:text-white transition-transform group-hover:translate-x-1" />
  </button>
);

const SidebarLink: React.FC<{active: boolean, onClick: () => void, icon: any, label: string}> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${active ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
    {icon} <span>{label}</span>
  </button>
);
