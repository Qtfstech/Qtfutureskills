import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import Icon from '../ui/Icon';
import './MyTicket.css';

function QRCanvas({ value, size = 120 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !value) return;
    const ctx = ref.current.getContext('2d');
    const s = size;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, s, s);

    const hash = [...value].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 0);
    const cells = 21;
    const cell = Math.floor(s / cells);
    const seed = Math.abs(hash);
    const rand = (i) => ((seed * (i + 1) * 2654435761) >>> 0) % 100 < 45;

    const finder = (ox, oy) => {
      ctx.fillStyle = '#000';
      ctx.fillRect(ox * cell, oy * cell, 7 * cell, 7 * cell);
      ctx.fillStyle = '#fff';
      ctx.fillRect((ox + 1) * cell, (oy + 1) * cell, 5 * cell, 5 * cell);
      ctx.fillStyle = '#000';
      ctx.fillRect((ox + 2) * cell, (oy + 2) * cell, 3 * cell, 3 * cell);
    };
    finder(0, 0);
    finder(14, 0);
    finder(0, 14);

    ctx.fillStyle = '#000';
    for (let r = 0; r < cells; r++) {
      for (let c2 = 0; c2 < cells; c2++) {
        const inFinder = (r < 8 && c2 < 8) || (r < 8 && c2 > 12) || (r > 12 && c2 < 8);
        if (!inFinder && rand(r * cells + c2)) {
          ctx.fillRect(c2 * cell, r * cell, cell, cell);
        }
      }
    }
  }, [value, size]);

  return <canvas ref={ref} width={size} height={size} className="ticket__qr-canvas" />;
}

export default function MyTicket({ registration }) {
  const ticketRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  if (!registration) return null;

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: null,
        scale: 2,
        ignoreElements: (el) => el.classList?.contains('ticket__download'),
      });
      const link = document.createElement('a');
      link.download = `${registration.passId}-pass.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="ticket-page">
      <div className="ticket-page__header">
        <span className="ticket-page__eyebrow">Your Pass</span>
        <h1>
          Future Skills <span>Summit</span>
        </h1>
      </div>

      <div className="ticket" ref={ticketRef}>
        <div className="ticket__top">
          <span className="ticket__brand">FUTURE SKILLS SUMMIT</span>
          <div className="ticket__top-right">
            <button
              type="button"
              className="ticket__download"
              onClick={handleDownload}
              disabled={downloading}
              aria-label="Download pass"
              title="Download pass"
            >
              <Icon name="download" size={13} color="var(--navy)" />
            </button>
            <span className="ticket__pass-tag">PASS</span>
          </div>
        </div>

        <div className="ticket__body">
          <div className="ticket__qr">
            <QRCanvas value={registration.passId} />
          </div>
          <div className="ticket__info">
            <div className="ticket__label">Attendee</div>
            <div className="ticket__name">{registration.name}</div>
            <div className="ticket__sub">{registration.address}</div>
          </div>
        </div>

        <div className="ticket__perforation" />

        <div className="ticket__bottom">
          <div>
            <div className="ticket__label">Date</div>
            <div className="ticket__value">Aug 8, 2026</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="ticket__label">Venue</div>
            <div className="ticket__value ticket__value--light">T-Works, Hyderabad</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ticket__label">Pass ID</div>
            <div className="ticket__value">{registration.passId}</div>
          </div>
        </div>
      </div>

      <div className="ticket__status">
        {registration.checkedIn
          ? <span className="ticket__status-pill ticket__status-pill--in">✓ Checked in</span>
          : <span className="ticket__status-pill">Not checked in yet</span>}
      </div>
    </div>
  );
}
