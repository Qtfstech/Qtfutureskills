import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import ThreeDCanvas from '../ui/ThreeDCanvas';
import '../ui/ThreeDCanvas.css';
import './EventPhotosShowcase.css';

const API_URL = import.meta.env.VITE_API_URL ?? '';

// Built-in fallback gallery if API is initializing
const FALLBACK_PHOTOS = [
  {
    id: 'fb-1',
    eventId: 1,
    eventTitle: 'Learnathon 5.0',
    caption: 'Learnathon 5.0 Grand Opening & Keynote Address',
    imageUrl: '/assets/images/gallery/gallery-1.jpg',
    date: 'Aug 2026',
  },
  {
    id: 'fb-2',
    eventId: 1,
    eventTitle: 'Learnathon 5.0',
    caption: 'Students in Collaborative Coding & Problem Solving',
    imageUrl: '/assets/images/gallery/gallery-2.jpg',
    date: 'Aug 2026',
  },
  {
    id: 'fb-3',
    eventId: 1,
    eventTitle: 'Learnathon 5.0',
    caption: 'One-on-One Technical Mentorship with Industry Architects',
    imageUrl: '/assets/images/gallery/gallery-3.jpg',
    date: 'Aug 2026',
  },
  {
    id: 'fb-4',
    eventId: 1,
    eventTitle: 'Learnathon 5.0',
    caption: 'Grand Prize Ceremony & Award Distribution',
    imageUrl: '/assets/images/gallery/gallery-4.jpg',
    date: 'Aug 2026',
  },
  {
    id: 'fb-5',
    eventId: 2,
    eventTitle: 'Acharya Devo Bhava',
    caption: 'Honoring Distinguished Academic Mentors & College Principals',
    imageUrl: '/assets/images/gallery/gallery-5.jpg',
    date: 'Sep 2026',
  },
  {
    id: 'fb-6',
    eventId: 2,
    eventTitle: 'Acharya Devo Bhava',
    caption: 'Keynote Panel: Re-imagining Higher Education for AI Era',
    imageUrl: '/assets/images/gallery/gallery-6.jpg',
    date: 'Sep 2026',
  },
  {
    id: 'fb-7',
    eventId: 3,
    eventTitle: 'Future Skills Summit 2026',
    caption: 'Inaugural Lamp Lighting Ceremony with Dignitaries at T-Works',
    imageUrl: '/assets/images/gallery/gallery-9.jpg',
    date: 'Oct 2026',
  },
  {
    id: 'fb-8',
    eventId: 3,
    eventTitle: 'Future Skills Summit 2026',
    caption: 'CXO Discussion on National Skilling & Workforce 2030',
    imageUrl: '/assets/images/gallery/gallery-10.jpg',
    date: 'Oct 2026',
  },
  {
    id: 'fb-9',
    eventId: 4,
    eventTitle: 'Youth Skilling & Workshops',
    caption: 'AWS Cloud Architecture & Serverless Deployment Lab',
    imageUrl: '/assets/images/skilling/skilling-1.jpg',
    date: 'Nov 2026',
  },
  {
    id: 'fb-10',
    eventId: 4,
    eventTitle: 'Youth Skilling & Workshops',
    caption: 'Cybersecurity Threat Defense & Hands-on Sandbox',
    imageUrl: '/assets/images/skilling/skilling-2.jpg',
    date: 'Nov 2026',
  },
  {
    id: 'fb-11',
    eventId: 4,
    eventTitle: 'Youth Skilling & Workshops',
    caption: 'Women in Tech Mentorship Circle & Coding Sprint',
    imageUrl: '/assets/images/skilling/skilling-4.jpg',
    date: 'Nov 2026',
  },
  {
    id: 'fb-12',
    eventId: 3,
    eventTitle: 'Future Skills Summit 2026',
    caption: 'Excellence in Skilling Awards Presentation',
    imageUrl: '/assets/images/gallery/gallery-12.jpg',
    date: 'Oct 2026',
  },
];

export default function EventPhotosShowcase({ onOpenAdmin }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    let active = true;
    async function fetchPhotos() {
      try {
        const res = await fetch(`${API_URL}/api/events`);
        if (res.ok) {
          const data = await res.json();
          if (active && Array.isArray(data) && data.length > 0) {
            setEvents(data);
          }
        }
      } catch {
        // graceful fallback to static data
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchPhotos();
    return () => {
      active = false;
    };
  }, []);

  // Consolidate all photos across events
  const allPhotos = useMemo(() => {
    if (events.length === 0) return FALLBACK_PHOTOS;
    const list = [];
    events.forEach((ev) => {
      if (Array.isArray(ev.photos)) {
        ev.photos.forEach((ph) => {
          list.push({
            id: ph.id,
            eventId: ev.id,
            eventTitle: ev.title,
            caption: ph.caption || ev.title,
            imageUrl: ph.imageUrl.startsWith('http') || ph.imageUrl.startsWith('/')
              ? ph.imageUrl
              : `/${ph.imageUrl}`,
            date: ev.eventDate ? new Date(ev.eventDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '2026',
          });
        });
      }
    });
    return list.length > 0 ? list : FALLBACK_PHOTOS;
  }, [events]);

  // Filter categories
  const categories = useMemo(() => {
    const map = new Map();
    allPhotos.forEach((p) => {
      map.set(p.eventTitle, (map.get(p.eventTitle) || 0) + 1);
    });
    const tabs = [{ key: 'all', label: 'All Photos', count: allPhotos.length }];
    map.forEach((count, title) => {
      tabs.push({ key: title, label: title, count });
    });
    return tabs;
  }, [allPhotos]);

  const filteredPhotos = useMemo(() => {
    if (activeTab === 'all') return allPhotos;
    return allPhotos.filter((p) => p.eventTitle === activeTab);
  }, [activeTab, allPhotos]);

  // Keyboard controls for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filteredPhotos]);

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <section id="event-photos" className="event-showcase-section">
      {/* 3D Model representing Optics, Prisms & Visual Moments */}
      <ThreeDCanvas
        archetype="octahedron"
        color="#ea580c"
        secondaryColor="#fdba74"
        size={340}
        speed={0.9}
        className="threed-canvas--section-corner"
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="event-showcase__header">
          <div className="event-showcase__title-wrap">
            <span className="event-showcase__badge">
              <span className="pulse-dot" /> Real Event Moments
            </span>
            <h2 className="event-showcase__title">
              Our Journey in <span>Real Photographs</span>
            </h2>
            <p className="event-showcase__subtitle">
              Authentic highlights from Learnathon marathons, academic mentor felicitations, youth tech bootcamps, and the Future Skills Summit.
            </p>
          </div>

          <div className="event-showcase__actions">
            <Link
              to="/events"
              className="btn btn-outline-dark"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>View Full Gallery</span>
              <Icon name="arrow" size={14} />
            </Link>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="event-showcase__tabs-bar">
          <div className="event-showcase__tabs">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={`event-showcase__tab ${activeTab === cat.key ? 'event-showcase__tab--active' : ''}`}
                onClick={() => setActiveTab(cat.key)}
              >
                <span>{cat.label}</span>
                <span className="event-showcase__tab-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Photos Grid */}
        <div className="event-showcase__grid">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id || idx}
              className="event-photo-card"
              onClick={() => setLightboxIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setLightboxIndex(idx);
              }}
            >
              <div className="event-photo-card__media">
                <img
                  src={`${API_URL}${photo.imageUrl}`}
                  alt={photo.caption}
                  loading="lazy"
                  className="event-photo-card__img"
                  onError={(e) => {
                    // Fallback to gallery-1 if missing
                    e.currentTarget.src = '/assets/images/gallery/gallery-1.jpg';
                  }}
                />
                <div className="event-photo-card__overlay">
                  <div className="event-photo-card__zoom-btn">
                    <Icon name="arrow" size={16} />
                  </div>
                  <div className="event-photo-card__caption-box">
                    <span className="event-photo-card__tag">{photo.eventTitle}</span>
                    <h4 className="event-photo-card__caption">{photo.caption}</h4>
                    <span className="event-photo-card__date">{photo.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Public Gallery Exploration Footer */}
        <div className="event-showcase__footer-bar">
          <div className="event-showcase__footer-info">
            <Icon name="image" size={20} color="#ff5500" />
            <div>
              <strong>Comprehensive Event Archives</strong>
              <p>Explore high-resolution galleries from past summits, student project exhibitions, and mentor awards ceremonies.</p>
            </div>
          </div>
          <Link to="/events" className="btn btn-outline-orange">
            Explore All Event Albums <Icon name="arrow" size={14} />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="photo-lightbox"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="photo-lightbox__container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="photo-lightbox__close"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close photo preview"
            >
              <Icon name="x" size={20} color="#ffffff" />
            </button>

            <button
              type="button"
              className="photo-lightbox__nav photo-lightbox__nav--prev"
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
                )
              }
              aria-label="Previous photo"
            >
              <Icon name="arrow" size={20} color="#ffffff" />
            </button>

            <button
              type="button"
              className="photo-lightbox__nav photo-lightbox__nav--next"
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length)
              }
              aria-label="Next photo"
            >
              <Icon name="arrow" size={20} color="#ffffff" />
            </button>

            <div className="photo-lightbox__image-wrap">
              <img
                src={`${API_URL}${activePhoto.imageUrl}`}
                alt={activePhoto.caption}
                className="photo-lightbox__image"
              />
            </div>

            <div className="photo-lightbox__footer">
              <div className="photo-lightbox__meta">
                <span className="photo-lightbox__pill">{activePhoto.eventTitle}</span>
                <p className="photo-lightbox__caption">{activePhoto.caption}</p>
                <span className="photo-lightbox__date">{activePhoto.date}</span>
              </div>
              <div className="photo-lightbox__counter">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
