import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { impactApproachSteps } from '../../data/content';
import './ImpactApproach.css';

export default function ImpactApproach() {
  return (
    <section id="impact-approach" className="impact-approach section">
      <div className="container">
        <SectionHeading
          eyebrow="Our Impact Approach"
          title="From First Lesson To"
          highlight="Lasting, Sustainable Change"
          description="Our programmes are designed around measurable outcomes that create
            lasting change — a clear progression from learning to sustainable impact."
        />

        <div className="impact-approach__flow">
          {impactApproachSteps.map((step, i) => (
            <div className="impact-approach__step-wrap" key={step.title}>
              <div
                className="impact-approach__step"
                data-aos="zoom-in"
                data-aos-delay={i * 90}
              >
                <span className="impact-approach__num">{i + 1}</span>
                <div className="impact-approach__icon icon-float" style={{ animationDelay: `${i * 0.2}s` }}>
                  <Icon name={step.icon} size={20} color="#fff" />
                </div>
                <p>{step.title}</p>
              </div>
              {i < impactApproachSteps.length - 1 && (
                <span className="impact-approach__arrow" aria-hidden="true">
                  <Icon name="arrow" size={18} color="var(--orange)" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
