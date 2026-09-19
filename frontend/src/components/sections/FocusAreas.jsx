import { useEffect, useState } from 'react';
import './FocusAreas.css';

function handleCardTilt(e, strength = 8) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  el.style.setProperty('--tilt-x', `${(x / (rect.width / 2)) * strength}deg`);
  el.style.setProperty('--tilt-y', `${-(y / (rect.height / 2)) * strength}deg`);
}

function resetCardTilt(e) {
  e.currentTarget.style.setProperty('--tilt-x', '0deg');
  e.currentTarget.style.setProperty('--tilt-y', '0deg');
}

const focusAreas = [
  {
    title: 'Livelihood Development',
    description:
      'We enable individuals to build sustainable livelihoods through market-relevant skills, career guidance, vocational training, and employment opportunities that improve long-term economic well-being.',
    image: '/ld.png',
    alt: 'Students participating in livelihood skills training',
  },
  {
    title: 'Women Empowerment',
    description:
      'We empower women through education, digital literacy, financial awareness, leadership development, entrepreneurship support, and employability programmes that promote independence and inclusive growth.',
    image: '/we.png',
    alt: 'Women participating in a leadership and digital skills workshop',
  },
  {
    title: 'Girl Child Education',
    description:
      'Education is the foundation of change. We support initiatives that encourage access to quality education, scholarships, mentorship, digital learning, and life skills for girls to help them realize their full potential.',
    image: '/gce.png',
    alt: 'Schoolgirls learning together in a classroom',
  },
];

export default function FocusAreas() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveCard((current) => (current + 1) % focusAreas.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  const getPosition = (index) => {
    if (index === activeCard) return 'center';
    return index === (activeCard + 1) % focusAreas.length ? 'right' : 'left';
  };

  return (
    <section id="focus-areas" className="focus-areas section" aria-labelledby="focus-areas-title">
      <div className="container">
        <header className="focus-areas__heading" data-aos="fade-down" data-aos-duration="700">
          <h2 id="focus-areas-title">Our Focus Areas</h2>
        </header>

        <div
          className="focus-areas__carousel"
          aria-roledescription="carousel"
          aria-label="Focus areas"
        >
          <div className="focus-areas__stage">
            {focusAreas.map((area, i) => (
              <article
                className={`focus-areas__card focus-areas__card--${getPosition(i)}`}
                key={area.title}
              >
                <div
                  className="focus-areas__tilt"
                  onMouseMove={handleCardTilt}
                  onMouseLeave={resetCardTilt}
                >
                  <div className="focus-areas__image-wrap shine">
                    <img className="focus-areas__image" src={area.image} alt={area.alt} />
                  </div>
                  <div className="focus-areas__content">
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
