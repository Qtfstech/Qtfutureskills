import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-full.jpeg';
import heroImg from '../assets/focus/skilling-future.png';
import Icon from '../components/ui/Icon';
import CountUp from '../components/ui/CountUp';
import BackToTop from '../components/ui/BackToTop';
import Footer from '../components/layout/Footer';
import Event from '../components/sections/Event';
import MarqueeStrip from '../components/sections/MarqueeStrip';
import { eventStats, eventHighlights, contactInfo } from '../data/content';
import './EventSummit.css';

export default function EventSummit() {
  const [eventOpen, setEventOpen] = useState(false);

  return (
    <div className="esum">
      <header className="esum__topbar">
        <Link to="/" className="esum__brand">
          <img src={logo} alt="Quality Thought Future Skills Foundation" />
        </Link>
        <div className="esum__topbar-right">
          <Link to="/" className="esum__home-link">Back to site</Link>
        </div>
      </header>

      <section className="esum__hero">
        <div className="container esum__hero-grid">
          <div className="esum__hero-content">
            <h1 className="esum__title" data-aos="fade-up" data-aos-delay="150">
              The Future Skills <span>Summit &amp; Awards</span>
            </h1>
            <p className="esum__desc" data-aos="fade-up" data-aos-delay="280">
              Empowering tomorrow's leaders with the skills of the future. Where industry, academia
              and innovation connect, compete, and get recognized. Free entry · Limited passes.
            </p>

            <div className="esum__actions" data-aos="fade-up" data-aos-delay="400">
              <button type="button" className="btn btn-primary" onClick={() => setEventOpen(true)}>
                Register Now <Icon name="arrow" size={16} />
              </button>
              <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`} className="btn btn-outline">
                <Icon name="phone" size={16} /> Call: {contactInfo.phone}
              </a>
            </div>

            <div className="esum__stats" data-aos="fade-up" data-aos-delay="520">
              {eventStats.map((s) => (
                <div className="esum__stat" key={s.label}>
                  <CountUp value={s.value} className="esum__stat-value" />
                  <span className="esum__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="esum__hero-media" data-aos="zoom-in-left" data-aos-delay="300" data-aos-duration="900">
            <div className="esum__hero-media-glow" />
            <div className="esum__hero-media-frame">
              <img src={heroImg} alt="Learners and mentors collaborating in a future skilling lab" className="esum__hero-media-img" />
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      <section className="esum__section container">
        <h2 className="esum__section-title" data-aos="fade-up">What to Expect</h2>
        <div className="esum__cards">
          {eventHighlights.map((h, i) => (
            <div className="esum__card" key={h.title} data-aos="fade-up" data-aos-delay={i * 120}>
              <span className="esum__card-icon">
                <Icon name={h.icon} size={22} color="var(--orange)" />
              </span>
              <h3>{h.title}</h3>
              <p>{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="esum__cta">
        <div className="container esum__cta-inner" data-aos="zoom-in-up">
          <div>
            <span className="esum__cta-eyebrow">Event by IKON Foundation</span>
            <h2>Secure your free pass before it's gone</h2>
            <p>International Knowledge and Opportunities Network · Quality Thought Future Skills Foundation</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => setEventOpen(true)}>
            Get My Free Pass <Icon name="arrow" size={16} />
          </button>
        </div>
      </section>

      <Footer hideQuickLinks />
      <BackToTop />

      <Event open={eventOpen} onClose={() => setEventOpen(false)} />
    </div>
  );
}
