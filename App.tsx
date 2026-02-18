
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { ServiceWebDesign } from './pages/ServiceWebDesign';
import { ServiceAI } from './pages/ServiceAI';
import { ServiceMarketing } from './pages/ServiceMarketing';
import { Blog } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPostPage';
import { Contact } from './pages/Contact';
import { Booking } from './pages/Booking';
import { ThankYou } from './pages/ThankYou';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { CookiePolicy } from './pages/CookiePolicy';
import { DataSecurity } from './pages/DataSecurity';
import { AdminDashboard } from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/web-design" element={<ServiceWebDesign />} />
          <Route path="/services/ai-automation" element={<ServiceAI />} />
          <Route path="/services/digital-marketing" element={<ServiceMarketing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:id" element={<BlogPostPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Legal & Security Routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/data-security" element={<DataSecurity />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
