import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-full.jpeg';
import Icon from '../components/ui/Icon';
import BackToTop from '../components/ui/BackToTop';
import Footer from '../components/layout/Footer';
import './Events.css';

const API_URL = import.meta.env.VITE_API_URL ?? '';

function EventAlbum({ event, index, onOpenPhoto }) {
  return (
    <section className="ev-album" data-aos="fade-up" data-aos-delay={index * 80}>
      <div className="container">
        <div className="ev-album__head">
          <span className="ev-album__index">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h2 className="ev-album__title">{event.title}</h2>
            <p className="ev-album__desc">{event.description}</p>
          </div>
        </div>

        {event.photos.length === 0 ? (
          <div className="ev-album__empty">
            <Icon name="check" size={20} color="var(--orange)" />
            <span>Photos for this event are coming soon.</span>
          </div>
        ) : (
          <div className="ev-album__grid">
            {event.photos.map((photo, i) => (
              <button
                type="button"
                key={photo.id}
                className="ev-album__item shine"
                onClick={() => onOpenPhoto(event, i)}
                data-aos="zoom-in"
                data-aos-delay={(i % 4) * 90}
              >
                <img src={`${API_URL}${photo.imageUrl}`} alt={photo.caption || event.title} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null); // { photos, index, title }

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/events`);
        const data = await res.json();
        if (!ignore) setEvents(Array.isArray(data) ? data : []);
      } catch {
        if (!ignore) setEvents([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') {
        setLightbox((cur) => (cur ? { ...cur, index: (cur.index + 1) % cur.photos.length } : cur));
      }
      if (e.key === 'ArrowLeft') {
        setLightbox((cur) =>
          cur ? { ...cur, index: (cur.index - 1 + cur.photos.length) % cur.photos.length } : cur
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox]);

  const openPhoto = (event, index) => setLightbox({ photos: event.photos, index, title: event.title });

  return (
    <div className="ev-page">
      <header className="ev-topbar">
        <Link to="/" className="ev-brand">
          <img src={logo} alt="Quality Thought Future Skills Foundation" />
        </Link>
        <Link to="/" className="ev-home-link">Back to site</Link>
      </header>

      <section className="ev-hero">
        <div className="container">
          <span className="ev-hero__eyebrow" data-aos="fade-up">Foundation Events</span>
          <h1 className="ev-hero__title" data-aos="fade-up" data-aos-delay="100">
            Moments From Our <span>Events</span>
          </h1>
          <p className="ev-hero__desc" data-aos="fade-up" data-aos-delay="200">
            A look back at the workshops, marathons, and celebrations we've hosted for
            students, mentors, and the community — organized event by event.
          </p>
        </div>
      </section>

      {loading && (
        <div className="container ev-loading">Loading events…</div>
      )}

      {!loading && events.length === 0 && (
        <div className="container ev-loading">No events to show yet. Check back soon.</div>
      )}

      {!loading &&
        events.map((event, index) => (
          <EventAlbum key={event.id} event={event} index={index} onOpenPhoto={openPhoto} />
        ))}

      <Footer hideQuickLinks />
      <BackToTop />

      {lightbox && (
        <div className="ev-lightbox" onClick={() => setLightbox(null)}>
          <button
            type="button"
            className="ev-lightbox__close"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            <Icon name="x" size={18} color="#fff" />
          </button>
          <img
            src={`${API_URL}${lightbox.photos[lightbox.index].imageUrl}`}
            alt={lightbox.title}
            onClick={(e) => e.stopPropagation()}
          />
          <span className="ev-lightbox__caption">
            {lightbox.title} — {lightbox.index + 1}/{lightbox.photos.length}
          </span>
        </div>
      )}
    </div>
  );
}
