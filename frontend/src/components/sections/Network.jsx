import meetingImg from '../../assets/images/meeting.png';
import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { networkChapters, networkJoin } from '../../data/content';
import './Network.css';

export default function Network() {
  return (
    <section id="network" className="network section">
      <div className="container">
        <SectionHeading
          eyebrow="Global Future Skills Network"
          title="One Network,"
          highlight="Many Chapters"
          description="A structured network of teams and chapters working together —
            from the global secretariat down to university campuses — to deliver
            skilling at scale."
        />

        <div className="network__chapters">
          {networkChapters.map((chapter, i) => (
            <div className="chapter-card" key={chapter.title} data-aos="fade-up" data-aos-delay={i * 120}>
              <div className="chapter-card__dot">
                <Icon name={chapter.icon} size={20} color="#fff" />
              </div>
              <h4>{chapter.title}</h4>
              <p>{chapter.desc}</p>
            </div>
          ))}
        </div>

        <div className="network__team">
          <div className="network__team-photo" data-aos="clip-reveal" data-aos-duration="1000">
            <img src={meetingImg} alt="Team collaborating" />
          </div>

          <div className="network__team-body" data-aos="fade-left" data-aos-delay="150">
            <div className="network__team-head">
              <h3>Join the Network</h3>
              <p className="network__team-sub">
                Bring the Future Skills movement to your campus, institution, or organization.
              </p>
            </div>

            <ul className="network__join-list">
              {networkJoin.map((item, i) => (
                <li
                  className="network__join-item"
                  key={item}
                  data-aos="fade-up"
                  data-aos-delay={250 + i * 120}
                >
                  <span className="network__join-check">
                    <Icon name="check" size={14} color="#fff" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a href="#contact" className="btn btn-primary network__join-btn" data-aos="fade-up" data-aos-delay="620">
              Get Involved <Icon name="arrow" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
