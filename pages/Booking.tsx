import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, CheckCircle, User, Mail, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { IMAGES } from '../assets';

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

export const Booking: React.FC = () => {
  const navigate = useNavigate();
  
  // State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Consultation',
    notes: '',
    gdpr: false
  });

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
      const response = await fetch('./api/booking.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      navigate('/thank-you');
    } catch (err) {
      console.error(err);
      if (process.env.NODE_ENV === 'development') {
        alert("Dev Mode: Backend not found. Redirecting anyway.");
        navigate('/thank-you');
      } else {
        setError("Failed to book appointment. Please try again.");
      }
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

      {/* Hero */}
      <section className="relative py-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.contact.heroBg} alt="Booking Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/95 to-brand-navy/80"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Schedule Your <span className="text-brand-cyan">Discovery Call</span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose a time that works for you. Let's discuss how we can scale your business.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 -mt-10 relative z-20">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col lg:flex-row min-h-[600px]">
          
          {/* Left Panel: Calendar & Time */}
          <div className="lg:w-1/2 p-8 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-6 flex items-center gap-2">
              <CalendarIcon className="text-brand-blue dark:text-brand-cyan" /> Select Date & Time
            </h2>

            {/* Calendar Controls */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors" type="button">
                <ChevronLeft className="text-gray-600 dark:text-gray-300" />
              </button>
              <span className="font-bold text-lg text-brand-navy dark:text-white">
                {currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors" type="button">
                <ChevronRight className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-8">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
                <div key={d} className="text-center text-sm font-semibold text-gray-400 py-2">{d}</div>
              ))}
              
              {/* Empty slots for start offset */}
              {Array.from({ length: startOffset }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {/* Days */}
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
                      h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 mx-auto
                      ${isSelected ? 'bg-brand-blue text-white shadow-lg scale-110' : ''}
                      ${!disabled && !isSelected ? 'hover:bg-brand-light dark:hover:bg-slate-700 text-brand-navy dark:text-gray-200 cursor-pointer' : ''}
                      ${disabled ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : ''}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="animate-fade-in-up">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <Clock size={16} /> Available Slots (UK Time)
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`
                        py-2 px-3 rounded-lg text-sm font-medium border transition-all duration-200
                        ${selectedTime === time 
                          ? 'bg-brand-blue text-white border-brand-blue shadow-md' 
                          : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-brand-blue hover:text-brand-blue dark:hover:text-brand-cyan'}
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel: Form */}
          <div className="lg:w-1/2 p-8 bg-gray-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-6">Your Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                  <AlertCircle size={16} /> {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Time</label>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center gap-3 text-brand-blue dark:text-brand-cyan font-semibold">
                  <CalendarIcon size={20} />
                  {selectedDate 
                    ? selectedDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long' }) 
                    : <span className="text-gray-400 font-normal italic">Select a date...</span>}
                  
                  {selectedTime && (
                    <>
                      <span className="text-gray-300">|</span>
                      <Clock size={20} />
                      {selectedTime}
                    </>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue dark:focus:ring-brand-cyan focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    id="email"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue dark:focus:ring-brand-cyan focus:border-transparent outline-none transition-all"
                    placeholder="john@company.co.uk"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topic</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <select 
                    id="service"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue dark:focus:ring-brand-cyan focus:border-transparent outline-none transition-all appearance-none"
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                  >
                    <option>Web Design Project</option>
                    <option>AI Automation Solution</option>
                    <option>Digital Marketing Strategy</option>
                    <option>General Consultation</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="gdpr" 
                  required
                  className="mt-1 w-4 h-4 text-brand-blue rounded border-gray-300 focus:ring-brand-blue"
                  checked={formData.gdpr}
                  onChange={e => setFormData({...formData, gdpr: e.target.checked})}
                />
                <label htmlFor="gdpr" className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  I agree to my data being stored to process this booking. View <a href="/privacy-policy" className="underline hover:text-brand-blue">Privacy Policy</a>.
                </label>
              </div>

              <Button 
                type="submit" 
                fullWidth 
                disabled={!selectedDate || !selectedTime || isSubmitting}
                className={`transition-opacity duration-300 ${(!selectedDate || !selectedTime) ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
              >
                {isSubmitting ? <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={20}/> Booking...</span> : "Confirm Booking"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};