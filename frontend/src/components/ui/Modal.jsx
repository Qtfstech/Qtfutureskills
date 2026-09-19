import { useEffect } from 'react';
import Icon from './Icon';
import './Modal.css';

export default function Modal({ open, onClose, eyebrow, title, highlight, description, maxWidth = 640, children }) {
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

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__card" style={{ maxWidth }} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" aria-label="Close" onClick={onClose}>
          <Icon name="x" size={18} color="var(--navy)" />
        </button>

        {(eyebrow || title) && (
          <div className="modal__header">
            {eyebrow && <span className="modal__eyebrow">{eyebrow}</span>}
            {title && (
              <h2>
                {title} {highlight && <span>{highlight}</span>}
              </h2>
            )}
            {description && <p>{description}</p>}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
