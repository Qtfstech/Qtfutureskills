import SectionHeading from '../ui/SectionHeading';
import ThreeDCanvas from '../ui/ThreeDCanvas';
import '../ui/ThreeDCanvas.css';
import { leadershipTeam } from '../../data/content';
import './Leadership.css';

export default function Leadership() {
  return (
    <section id="leadership" className="leadership section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* 3D Model representing Mentorship & Leadership Constellation */}
      <ThreeDCanvas
        archetype="icosahedron"
        color="#ea580c"
        secondaryColor="#fdba74"
        size={320}
        speed={0.7}
        className="threed-canvas--section-corner"
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
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
