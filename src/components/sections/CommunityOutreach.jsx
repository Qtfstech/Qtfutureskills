import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { outreachAreas } from '../../data/content';
import './CommunityOutreach.css';

export default function CommunityOutreach() {
  return (
    <section id="community-outreach" className="outreach section">
      <div className="container">
        <SectionHeading
          eyebrow="Social & Community Outreach"
          title="Impact That Reaches"
          highlight="Beyond the Classroom"
          description="We work with communities to create meaningful and measurable social
            impact through education, health awareness, digital inclusion, environmental
            sustainability, community development, and volunteer engagement programmes."
        />

        <div className="outreach__grid">
          {outreachAreas.map((item, i) => (
            <div
              className="outreach__card"
              key={item.title}
              data-aos="fade-up"
              data-aos-delay={(i % 3) * 120}
            >
              <div className="outreach__icon icon-float" style={{ animationDelay: `${i * 0.25}s` }}>
                <Icon name={item.icon} size={24} color="var(--orange)" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
