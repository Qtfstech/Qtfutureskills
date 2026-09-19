import SectionHeading from '../ui/SectionHeading';
import { leadershipTeam } from '../../data/content';
import './Leadership.css';

export default function Leadership() {
  return (
    <section id="leadership" className="leadership section">
      <div className="container">
        <SectionHeading
          eyebrow="Meet Our People"
          title="Founder &"
          highlight="Management"
        />
        <div className="leadership__grid">
          {leadershipTeam.map((member, i) => (
            <div
              className="leadership__card"
              key={member.name}
              data-aos="fade-up"
              data-aos-delay={i * 90}
            >
              <div className="leadership__frame">
                <div className="leadership__photo">
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                    style={{
                      objectPosition: member.position || '50% 50%',
                      transformOrigin: member.position || '50% 50%',
                      transform: `scale(${member.zoom || 1})`,
                    }}
                  />
                </div>
                <span className="leadership__swoosh" aria-hidden="true" />
              </div>
              <h3 className="leadership__name">{member.name}</h3>
              <p className="leadership__role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
