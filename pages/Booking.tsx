import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Mail, 
  Phone,
  MessageSquare, 
  Loader2, 
  AlertCircle, 
  Monitor, 
  Cpu, 
  BarChart, 
  Palette, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { IMAGES } from '../assets';
import { CRM_ENDPOINT } from '../constants';
import { trackLeadGeneration } from '../utils/analytics';
import { motion } from 'motion/react';

// Helper to generate time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let i = 9; i <= 17; i++) {
    slots.push(`${i.toString().padStart(2, '0')}:00`);
    if (i !== 17) slots.push(`${i.toString().padStart(2, '0')}:30`);
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

const SERVICES = [
  { 
    id: 'web-design', 
    title: 'Web Design', 
    icon: Monitor, 
    color: 'text-blue-500', 
    desc: 'Bespoke, high-converting websites.'
  },
  { 
    id: 'ai-automation', 
    title: 'AI Automation', 
    icon: Cpu, 
    color: 'text-brand-cyan', 
    desc: 'Intelligent workflows & custom AI tools.'
  },
  { 
    id: 'digital-marketing', 
    title: 'Digital Marketing', 
    icon: BarChart, 
    color: 'text-purple-500', 
    desc: 'Scale your growth with data-driven PPC.'
  },
  { 
    id: 'creative', 
    title: 'Creative Services', 
    icon: Palette, 
    color: 'text-pink-500', 
    desc: 'Branding, pitch decks & social assets.'
  }
];

export const Booking: React.FC = () => {
  const navigate = useNavigate();
  const bookingRef = useRef<HTMLDivElement>(null);
  
  // State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Consultation',
    notes: '',
    gdpr: false
  });

  const handleServiceSelect = (serviceTitle: string) => {
    setFormData(prev => ({ ...prev, service: serviceTitle }));
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Calendar Logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 = Sun
  
  // Adjust for Monday start (UK standard)
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isWeekend = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const isPast = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date < today;
  };

  const handleDateClick = (day: number) => {
    if (isWeekend(day) || isPast(day)) return;
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    const bookingData = {
        ...formData,
        date: selectedDate.toISOString().split('T')[0], // YYYY-MM-DD
        time: selectedTime
    };

    try {
      await fetch(CRM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          ...bookingData,
          formType: 'booking',
          source: 'Booking Form',
          timestamp: new Date().toISOString()
        }),
      });

      trackLeadGeneration('Confirm Booking', 'Booking Page');
      navigate('/thank-you');
    } catch (err) {
      console.error('Booking error:', err);
      setError("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-brand-light dark:bg-brand-dark transition-colors duration-300">
      <SEO 
        title="Book a Consultation | OptiScale Digital"
        description="Schedule a free discovery call with our UK team. Discuss your Web Design, AI, or Marketing needs."
        keywords="Book Consultation, Discovery Call, Digital Agency Meeting, Web Design Quote"
      />

      {/* Enhanced Hero */}
      <section className="relative pt-32 pb-24 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.contact.heroBg} alt="Booking Background" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/95 via-brand-navy/80 to-brand-light/10 dark:to-brand-dark/10"></div>
          
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-cyan/20 rounded-full blur-[80px] animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                Scale Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Potential</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Book a free discovery call to explore how our specialized digital services can accelerate your business growth. 
              </p>
            </motion.div>
          </div>

          {/* Service Cards as Quick-Select */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {SERVICES.map((s, idx) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onClick={() => handleServiceSelect(s.title)}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-brand-cyan/50 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${s.color} group-hover:scale-110 transition-transform`}>
                  <s.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {s.desc}
                </p>
                <div className="flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Select <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Tool Section */}
      <div ref={bookingRef} className="container mx-auto px-6 py-20 -mt-8 relative z-20">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col lg:flex-row min-h-[700px]">
          
          {/* Left Panel: Calendar & Time */}
          <div className="lg:w-3/5 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-brand-navy dark:text-white flex items-center gap-3">
                  <CalendarIcon className="text-brand-blue dark:text-brand-cyan" size={32} /> 
                  Discovery Call
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">30 Minutes Discovery Session</p>
              </div>

              {/* Month Selector */}
              <div className="flex items-center gap-4 bg-gray-100 dark:bg-slate-700/50 p-2 rounded-2xl">
                <button onClick={handlePrevMonth} className="p-2 hover:bg-white dark:hover:bg-slate-600 rounded-xl transition-all" type="button shadow-sm">
                  <ChevronLeft className="text-gray-600 dark:text-gray-300" size={20} />
                </button>
                <span className="font-bold text-brand-navy dark:text-white min-w-[140px] text-center">
                  {currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={handleNextMonth} className="p-2 hover:bg-white dark:hover:bg-slate-600 rounded-xl transition-all" type="button shadow-sm">
                  <ChevronRight className="text-gray-600 dark:text-gray-300" size={20} />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="max-w-md mx-auto lg:mx-0">
              <div className="grid grid-cols-7 gap-2 mb-6 text-center">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
                  <div key={d} className="text-xs font-bold text-gray-400 uppercase py-2 tracking-widest">{d}</div>
                ))}
                
                {Array.from({ length: startOffset }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const disabled = isWeekend(day) || isPast(day);
                  const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth();

                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={disabled}
                      onClick={() => handleDateClick(day)}
                      className={`
                        h-12 w-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 mx-auto
                        ${isSelected ? 'bg-brand-blue text-white shadow-xl scale-110' : ''}
                        ${!disabled && !isSelected ? 'hover:bg-brand-light dark:hover:bg-slate-700 text-brand-navy dark:text-gray-200 hover:shadow-md' : ''}
                        ${disabled ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : ''}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots Section */}
            <div className="mt-12">
              <h3 className="text-lg font-bold text-brand-navy dark:text-white mb-6 flex items-center gap-2">
                <Clock className="text-brand-blue dark:text-brand-cyan" size={20} /> 
                Select Start Time <span className="text-xs font-normal text-gray-500">(GMT)</span>
              </h3>
              
              {!selectedDate ? (
                <div className="p-8 bg-gray-50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 text-center">
                  <p className="text-gray-500 text-sm">Please select a date on the calendar to view available times.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`
                        py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all duration-300
                        ${selectedTime === time 
                          ? 'bg-brand-blue text-white border-brand-blue shadow-lg scale-105' 
                          : 'border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-brand-blue hover:text-brand-blue dark:hover:text-brand-cyan'}
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="lg:w-2/5 p-8 lg:p-12 bg-gray-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-8">Confirm Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="formType" value="booking" />
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm flex items-center gap-2 border border-red-100">
                  <AlertCircle size={18} /> {error}
                </div>
              )}

              <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
                <div className="flex items-center gap-4 text-brand-blue dark:text-brand-cyan font-bold">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                    <CalendarIcon size={20} />
                  </div>
                  <span className="text-sm">
                    {selectedDate 
                      ? selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) 
                      : 'Step 1: Select a Date'}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-brand-blue dark:text-brand-cyan font-bold">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <span className="text-sm">
                    {selectedTime ? selectedTime : 'Step 2: Select a Time'}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-brand-blue dark:text-brand-cyan font-bold">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <span className="text-sm">
                    {formData.service}
                  </span>
                </div>

                {formData.email && (
                  <div className="flex items-center gap-4 text-brand-blue dark:text-brand-cyan font-bold">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <span className="text-sm">
                      {formData.email}
                    </span>
                  </div>
                )}

                {formData.phone && (
                  <div className="flex items-center gap-4 text-brand-blue dark:text-brand-cyan font-bold">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                    <span className="text-sm">
                      {formData.phone}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      id="name"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue dark:focus:ring-brand-cyan outline-none transition-all placeholder:text-gray-400"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="email" 
                      id="email"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue dark:focus:ring-brand-cyan outline-none transition-all placeholder:text-gray-400"
                      placeholder="email@company.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Telephone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="tel" 
                      id="phone"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue dark:focus:ring-brand-cyan outline-none transition-all placeholder:text-gray-400"
                      placeholder="+44 7000 000000"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Service Topic</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <select 
                      id="service"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue dark:focus:ring-brand-cyan outline-none transition-all appearance-none"
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                    >
                      <option>General Consultation</option>
                      <option>Web Design</option>
                      <option>AI Automation</option>
                      <option>Digital Marketing</option>
                      <option>Creative Services</option>
                      <option>Other / Not Listed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 px-1">
                <input 
                  type="checkbox" 
                  id="gdpr" 
                  required
                  className="mt-1 w-5 h-5 text-brand-blue rounded-lg border-gray-300 focus:ring-brand-blue"
                  checked={formData.gdpr}
                  onChange={e => setFormData({...formData, gdpr: e.target.checked})}
                />
                <label htmlFor="gdpr" className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  I agree to the storing of my data for communication purposes. View our <a href="/privacy-policy" className="underline hover:text-brand-blue font-semibold">Privacy Policy</a>.
                </label>
              </div>

              <Button 
                type="submit" 
                fullWidth 
                size="lg"
                disabled={!selectedDate || !selectedTime || isSubmitting}
                className="rounded-2xl py-4 shadow-xl shadow-brand-blue/20"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={20}/> Processing...</span>
                ) : (
                  <span className="flex items-center justify-center gap-2">Confirm Discovery Call <ArrowRight size={20} /></span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
