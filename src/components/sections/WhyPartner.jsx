import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { partnerTypes } from '../../data/content';
import './WhyPartner.css';

export default function WhyPartner() {
  return (
    <section id="why-partner" className="why-partner section">
      <div className="container">
        <SectionHeading
          eyebrow="Why Partner With Us"
          title="We Believe Collaboration"
          highlight="Creates Greater Impact"
          description="Together, we build scalable and sustainable solutions that
            strengthen communities and prepare people for the future of work."
        />

        <div className="why-partner__panel" data-aos="fade-up" data-aos-duration="850">
          <h3 className="why-partner__panel-title">We Work With</h3>
          <div className="why-partner__grid">
            {partnerTypes.map((item, i) => (
              <div
                className="why-partner__item"
                key={item.title}
                data-aos="zoom-in"
                data-aos-delay={(i % 5) * 80}
              >
                <span className="why-partner__item-icon icon-float" style={{ animationDelay: `${(i % 5) * 0.3}s` }}>
                  <Icon name={item.icon} size={20} color="var(--orange)" />
                </span>
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
