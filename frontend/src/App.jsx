import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ScrollProgress from './components/ui/ScrollProgress';
import CurtainIntro from './components/ui/CurtainIntro';
import PageTransition from './components/layout/PageTransition';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/Dashboard';
import EventSummit from './pages/EventSummit';
import Events from './pages/Events';

const SESSION_KEY = 'qtf_session';

function ScrollAnimations() {
  const location = useLocation();

  useEffect(() => {
    const initialHash = window.location.hash;
    if (initialHash) window.scrollTo(0, 0);

    AOS.init({
      duration: 750,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });

    if (initialHash) {
      const id = initialHash.slice(1);
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
    AOS.refreshHard();
  }, [location.pathname, location.hash]);

  return null;
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function App() {
  const [session, setSessionState] = useState(loadSession);

  const setSession = (data) => {
    if (data) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(data));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
    setSessionState(data);
  };

  return (
    <BrowserRouter>
      <ScrollProgress />
      <ScrollAnimations />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home session={session} setSession={setSession} />} />
          <Route path="/about" element={<AboutUs session={session} setSession={setSession} />} />
          <Route path="/contact" element={<ContactUs session={session} setSession={setSession} />} />
          <Route path="/event" element={<EventSummit />} />
          <Route path="/events" element={<Events />} />
          <Route path="/dashboard" element={<Dashboard session={session} setSession={setSession} />} />
        </Routes>
      </PageTransition>
    </BrowserRouter>
  );
}

export default App;
