import ReactSlick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Icon from '../ui/Icon';
import { stats, heroSlides } from '../../data/content';
import './Hero.css';

const Slider = ReactSlick.default || ReactSlick;

function handleMagneticMove(e, strength = 14) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  el.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
}

function handleMagneticLeave(e) {
  e.currentTarget.style.transform = '';
}

function CustomPrevArrow({ onClick }) {
  return (
    <button
      type="button"
      className="hero-nav hero-nav--prev"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <Icon name="arrow" size={20} />
    </button>
  );
}

function CustomNextArrow({ onClick }) {
  return (
    <button
      type="button"
      className="hero-nav hero-nav--next"
      onClick={onClick}
      aria-label="Next slide"
    >
      <Icon name="arrow" size={20} />
    </button>
  );
}

export default function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots) => (
      <div className="hero-dots">
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: () => <div className="hero-dots__dot" />,
  };

  return (
    <section id="home" className="hero">
      <Slider {...settings} className="hero-slider">
        {heroSlides.map((slide) => (
          <div key={slide.image} className="hero-slide">
            <div className="hero-bg" aria-hidden="true">
              <img
                src={slide.image}
                alt=""
                className="hero-bg__img"
                loading="eager"
              />
              <div className="hero-bg__grain" />
              <div className="hero-bg__scrim" />
            </div>

            <div className="container hero__inner">
              <div className="hero__content">
                <div className="hero__slide-text">
                  <span className={`hero__eyebrow${slide.eyebrow ? '' : ' is-empty'}`}>
                    <span className="hero__eyebrow-dot" />
                    {slide.eyebrow || ' '}
                  </span>
                  <p className={`hero__kicker${slide.kicker ? '' : ' is-empty'}`}>
                    {slide.kicker || ' '}
                  </p>
                  <h1 className="hero__title">{slide.title}</h1>
                  <p className={`hero__lead${slide.lead ? '' : ' is-empty'}`}>
                    {slide.lead || ' '}
                  </p>
                  <span className={`hero__divider${slide.body || slide.highlight ? '' : ' is-empty'}`} />
                  <p className={`hero__body${slide.body ? '' : ' is-empty'}`}>
                    {slide.body || ' '}
                  </p>
                  <p className={`hero__highlight${slide.highlight ? '' : ' is-empty'}`}>
                    {slide.highlight || ' '}
                  </p>
                </div>

                <div className="hero__actions">
                  <a
                    href="#programs"
                    className="btn btn-primary"
                    onMouseMove={(e) => handleMagneticMove(e, 14)}
                    onMouseLeave={handleMagneticLeave}
                  >
                    Explore Programs <Icon name="arrow" size={16} />
                  </a>
                  <a
                    href="#about"
                    className="btn btn-outline"
                    onMouseMove={(e) => handleMagneticMove(e, 14)}
                    onMouseLeave={handleMagneticLeave}
                  >
                    Learn More
                  </a>
                </div>

                <div className="hero__stats">
                  {stats.map((s) => (
                    <div className="hero__stat" key={s.label}>
                      <Icon name={s.icon} size={18} color="var(--orange-light)" />
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
