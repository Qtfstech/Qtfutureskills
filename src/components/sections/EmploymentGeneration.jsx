import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { employmentJourney } from '../../data/content';
import './EmploymentGeneration.css';

export default function EmploymentGeneration() {
  return (
    <section id="employment-generation" className="employment section product2-bg">
      <div className="container ">
        <SectionHeading
          eyebrow="Employment Generation"
          title="From Training To"
          highlight="A First Offer Letter"
          description="Our employment initiatives connect trained candidates with employers
            through placement support, career counselling, job fairs, internship programmes,
            apprenticeships, and industry partnerships."
        />

        <div className="employment__panel" data-aos="fade-up" data-aos-duration="850">
          <div className="employment__flow">
            {employmentJourney.map((step, i) => (
              <div className="employment__step-wrap" key={step.title}>
                <div
                  className="employment__step"
                  data-aos="zoom-in"
                  data-aos-delay={i * 120}
                  tabIndex="0"
                >
                  <div className="employment__icon icon-float" style={{ animationDelay: `${i * 0.3}s` }}>
                    <Icon name={step.icon} size={24} color="#fff" />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                {i < employmentJourney.length - 1 && (
                  <span className="employment__arrow" aria-hidden="true">
                    <span className="employment__arrow-track" />
                    <span className="employment__arrow-icon">
                      <Icon name="arrow" size={18} color="var(--orange)" />
                    </span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
