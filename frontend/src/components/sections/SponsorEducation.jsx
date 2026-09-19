import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import sponsorImg from '../../assets/focus/sponsor-education.png';
import Icon from '../ui/Icon';
import './SponsorEducation.css';

gsap.registerPlugin(ScrollTrigger);

export default function SponsorEducation() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const dotgridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    const dotgrid = dotgridRef.current;
    if (!section || !glow || !dotgrid) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.to(glow, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(dotgrid, {
        yPercent: -28,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="sponsor-education" className="sponsor section" ref={sectionRef}>
      <div className="sponsor__glow" ref={glowRef} aria-hidden="true"></div>
      <div className="sponsor__dotgrid" ref={dotgridRef} aria-hidden="true"></div>

      <div className="container sponsor__inner">
        <div className="sponsor__content" data-aos="fade-right" data-aos-duration="900">
          <span className="sponsor__eyebrow">Sponsor Education</span>
          <h2>
            Sponsor Education. <span className="sponsor__highlight">Change Lives.</span>
          </h2>
          <p className="sponsor__intro">Education has the power to transform generations.</p>
          <p>
            Through our sponsorship programmes, individuals and organizations can support
            deserving students by providing access to quality education, digital learning
            resources, skill development, scholarships, mentoring, and career guidance.
          </p>
          <p className="sponsor__tagline">Every sponsorship creates opportunities for brighter futures.</p>

          <a href="#contact" className="btn btn-primary sponsor__cta">
            Sponsor a Student Today <Icon name="arrow" size={16} />
          </a>
        </div>

        <div className="sponsor__visual" data-aos="fade-left" data-aos-delay="150">
          <div className="sponsor__orbit" aria-hidden="true"></div>
          <img src={sponsorImg} alt="A mentor handing a sponsored student their study materials in a library" />
        </div>
      </div>
    </section>
  );
}