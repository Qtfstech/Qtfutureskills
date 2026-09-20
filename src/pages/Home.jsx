import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import MarqueeStrip from '../components/sections/MarqueeStrip';
import EventPhotosShowcase from '../components/sections/EventPhotosShowcase';
import CorePillars from '../components/sections/CorePillars';
import CollaborationImpact from '../components/sections/CollaborationImpact';
import GetInvolved from '../components/sections/GetInvolved';
import Leadership from '../components/sections/Leadership';
import CallToAction from '../components/sections/CallToAction';
import BackToTop from '../components/ui/BackToTop';
import Login from '../components/sections/Login';

export default function Home({ session, setSession }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenAuth = () => {
    if (!session) {
      setLoginOpen(true);
    } else {
      navigate('/dashboard');
    }
  };

  const handleLoginSuccess = (data) => {
    setSession(data);
    setLoginOpen(false);
    navigate('/dashboard');
  };

  const authLabel = !session ? 'Sign In' : session.role === 'admin' ? 'Admin Portal' : 'My Dashboard';

  return (
    <>
      <Navbar onOpenAuth={handleOpenAuth} authLabel={authLabel} />
      <main>
        <Hero />
        <MarqueeStrip />
        <EventPhotosShowcase />
        <CorePillars />
        <CollaborationImpact />
        <GetInvolved />
        <Leadership />
        <CallToAction />
      </main>
      <Footer />
      <BackToTop />
      <Login
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        restrictToAdmin
      />
    </>
  );
}
