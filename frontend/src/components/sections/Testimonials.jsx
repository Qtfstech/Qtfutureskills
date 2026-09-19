import { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { testimonials } from '../../data/content';
import './Testimonials.css';

const AUTOPLAY_MS = 5500;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const go = (i) => setIndex((i + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return undefined;
    timerRef.current = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      AUTOPLAY_MS
    );
    return () => clearInterval(timerRef.current);
  }, [paused]);

  return (
    <section id="stories" className="stories section">
      <div className="container">
        <SectionHeading
          eyebrow="Success Stories"
          title="Voices From Our"
          highlight="Community"
          description="Learners, universities, and hiring partners on what the
            Foundation's skilling ecosystem has meant for them."
        />

        <div
          className="stories__slider"
          data-aos="zoom-in-up"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <span className="stories__mark" aria-hidden="true">&ldquo;</span>

          <div className="stories__viewport">
            <div
              className="stories__strip"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.map((t) => (
                <figure className="stories__slide" key={t.name}>
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>
                    <span className="stories__avatar">{t.initials}</span>
                    <span className="stories__who">
                      <strong>{t.name}</strong>
                      <em>{t.role}</em>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="stories__controls">
            <button
              type="button"
              className="stories__arrow stories__arrow--prev"
              aria-label="Previous story"
              onClick={() => go(index - 1)}
            >
              <Icon name="arrow" size={18} />
            </button>

            <div className="stories__dots">
              {testimonials.map((t, i) => (
                <button
                  type="button"
                  key={t.name}
                  className={`stories__dot ${i === index ? 'stories__dot--active' : ''}`}
                  aria-label={`Go to story ${i + 1}`}
                  onClick={() => go(i)}
                />
              ))}
            </div>

            <button
              type="button"
              className="stories__arrow"
              aria-label="Next story"
              onClick={() => go(index + 1)}
            >
              <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
