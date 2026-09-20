import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { journeySteps } from '../../data/content';
import './Journey.css';

export default function Journey() {
  return (
    <section id="journey" className="journey section">
      <div className="container">
        <SectionHeading
          eyebrow="How It Works"
          title="Your Skilling Journey,"
          highlight="Step By Step"
          description="From first enquiry to first offer letter — a clear, guided path
            designed around outcomes at every stage."
        />

        <div className="journey__track">
          <div className="journey__line" aria-hidden="true" />
          {journeySteps.map((step, i) => (
            <div className="journey__step" key={step.title} data-aos="fade-up" data-aos-delay={i * 150}>
              <div className="journey__badge">
                <span className="journey__badge-num">{i + 1}</span>
                <span className="journey__badge-icon">
                  <Icon name={step.icon} size={22} color="#fff" />
                </span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
