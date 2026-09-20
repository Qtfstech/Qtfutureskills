import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';
import eventImage from '../../assets/images/skilling/eventimage.jpeg';
import './EventBanner.css';

export default function EventBanner({ open, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleRegister = () => {
    onClose?.();
    navigate('/event');
  };

  return (
    <div className="event-banner" onClick={onClose}>
      <div className="event-banner__card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="event-banner__close" aria-label="Close" onClick={onClose}>
          <Icon name="x" size={16} color="#ffffff" />
        </button>
        <img
          src={eventImage}
          alt="The Future Skills Summit & Awards — 08 Aug 2026, T-Works, Hyderabad"
          className="event-banner__image"
          onClick={handleRegister}
        />
        <div className="event-banner__footer">
          <button type="button" className="event-banner__cta" onClick={handleRegister}>
            Register Now
            <Icon name="arrow" size={16} color="#ffffff" />
          </button>
          <button type="button" className="event-banner__dismiss" onClick={onClose}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
