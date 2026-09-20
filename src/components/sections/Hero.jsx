import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import ThreeDCanvas from '../ui/ThreeDCanvas';
import '../ui/ThreeDCanvas.css';
import './Hero.css';

const SHOWCASE_PREVIEWS = [
  {
    tag: 'Learnathon 5.0',
    title: 'Collaborative Problem-Solving & Live Coding Marathon',
    img: '/assets/images/gallery/gallery-2.jpg',
    stats: '1,200+ Participants',
    date: 'Annual Flagship',
  },
  {
    tag: 'Mentor Felicitation',
    title: 'Acharya Devo Bhava — Honoring Academic Mentors & Principals',
    img: '/assets/images/gallery/gallery-5.jpg',
    stats: '150+ Distinguished Professors',
    date: 'State-wide Summit',
  },
  {
    tag: 'Future Skills Summit',
    title: 'CXO Discussion on National Skilling & Workforce 2030',
    img: '/assets/images/gallery/gallery-9.jpg',
    stats: '85+ GCC Leaders',
    date: 'T-Works Hyderabad',
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Fast, lightweight auto-rotation that doesn't block the browser
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SHOWCASE_PREVIEWS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = SHOWCASE_PREVIEWS[activeSlide];

  return (
    <section id="home" className="hero-orange">
      <div className="hero-orange__glow-sphere" aria-hidden="true" />
      <div className="hero-orange__glow-sphere hero-orange__glow-sphere--secondary" aria-hidden="true" />

      {/* 3D Art Models in Background */}
      <ThreeDCanvas
        archetype="tesseract"
        color="#ff7733"
        secondaryColor="#fdba74"
        size={360}
        speed={1.1}
        className="threed-canvas--hero"
      />
      <ThreeDCanvas
        archetype="icosahedron"
        color="#ea580c"
        secondaryColor="#ffedd5"
        size={260}
        speed={0.8}
        className="threed-canvas--hero-left"
      />

      <div className="container hero-orange__container">
        {/* Left Column: Mission & Impact */}
        <div className="hero-orange__main">
          <div className="hero-orange__badge">
            <span className="hero-orange__badge-dot" />
            <span>Quality Thought Future Skills Foundation</span>
          </div>

          <h1 className="hero-orange__title">
            Bridging India’s <span className="text-orange-gradient">Skill Gap</span> Through Real Hands-On Tech
          </h1>

          <p className="hero-orange__lead">
            Empowering students, academic mentors, and young innovators with cutting-edge Cloud, AI, and Cybersecurity credentials, guaranteed placement pathways, and Pan-India hackathons.
          </p>

          <div className="hero-orange__cta-row">
            <a href="#event-photos" className="btn btn-hero-primary">
              <Icon name="image" size={18} />
              <span>Explore Real Event Photos</span>
            </a>
            <Link to="/event" className="btn btn-hero-outline">
              <span>Summit & Awards 2026</span>
              <Icon name="arrow" size={16} />
            </Link>
          </div>

          {/* High Impact Key Metrics */}
          <div className="hero-orange__metrics">
            <div className="hero-metric-item">
              <span className="hero-metric-item__num">15K+</span>
              <span className="hero-metric-item__label">Learners Trained</span>
            </div>
            <div className="hero-metric-divider" />
            <div className="hero-metric-item">
              <span className="hero-metric-item__num">300+</span>
              <span className="hero-metric-item__label">Hiring Partners</span>
            </div>
            <div className="hero-metric-divider" />
            <div className="hero-metric-item">
              <span className="hero-metric-item__num">92%</span>
              <span className="hero-metric-item__label">Placement Rate</span>
            </div>
            <div className="hero-metric-divider" />
            <div className="hero-metric-item">
              <span className="hero-metric-item__num">100+</span>
              <span className="hero-metric-item__label">Partner Colleges</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Event Spotlight Card */}
        <div className="hero-orange__visual">
          <div className="hero-spotlight-card">
            <div className="hero-spotlight-card__tabs">
              {SHOWCASE_PREVIEWS.map((item, idx) => (
                <button
                  key={item.tag}
                  type="button"
                  className={`hero-spotlight-tab ${activeSlide === idx ? 'hero-spotlight-tab--active' : ''}`}
                  onClick={() => setActiveSlide(idx)}
                >
                  {item.tag}
                </button>
              ))}
            </div>

            <div className="hero-spotlight-media">
              <img
                src={current.img}
                alt={current.title}
                className="hero-spotlight-img"
                loading="eager"
              />
              <div className="hero-spotlight-scrim" />

              <div className="hero-spotlight-info">
                <div className="hero-spotlight-tag-row">
                  <span className="hero-spotlight-tag">{current.tag}</span>
                  <span className="hero-spotlight-date">{current.date}</span>
                </div>
                <h3 className="hero-spotlight-title">{current.title}</h3>
                <div className="hero-spotlight-stats">
                  <Icon name="trophy" size={14} color="#ffedd5" />
                  <span>{current.stats}</span>
                </div>
              </div>
            </div>

            <div className="hero-spotlight-footer">
              <a href="#event-photos" className="hero-spotlight-link">
                <span>View all real event photographs</span>
                <Icon name="arrow" size={14} />
              </a>
              <div className="hero-spotlight-dots">
                {SHOWCASE_PREVIEWS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`hero-spotlight-dot ${activeSlide === i ? 'is-active' : ''}`}
                    onClick={() => setActiveSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
