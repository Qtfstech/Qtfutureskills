import Icon from '../ui/Icon';
import certificationImg from '../../assets/focus/certification.png';
import workforceImg from '../../assets/focus/workforce.png';
import skillingFutureImg from '../../assets/focus/skilling-future.png';
import './SkillingForFuture.css';

const skills = [
  {
    name: 'Technical Skills',
    icon: 'flask',
    description: 'Gain in-demand technical knowledge and hands-on expertise through industry-relevant training.',
  },
  {
    name: 'Digital Skills',
    icon: 'globe',
    description: 'Build digital fluency and master tools and technologies shaping the modern world.',
  },
  {
    name: 'Professional Skills',
    icon: 'briefcase',
    description: 'Develop essential professional competencies for career growth and workplace success.',
  },
  {
    name: 'Communication Skills',
    icon: 'mic',
    description: 'Enhance verbal, written, and interpersonal communication for effective collaboration.',
  },
  {
    name: 'Leadership Skills',
    icon: 'trophy',
    description: 'Build leadership qualities to inspire teams and drive positive change in organizations.',
  },
  {
    name: 'Workplace Readiness',
    icon: 'check',
    description: 'Prepare for real-world challenges with the right attitude, skills and workplace behaviors.',
  },
];

function Eyebrow({ children }) {
  return <p className="skilling-future__eyebrow">{children}</p>;
}

export default function SkillingForFuture() {
  return (
    <section className="skilling-future section" id="skilling-for-future">
      <section className="product-bg skilling-future__top-block" aria-labelledby="skilling-future-title">
        
        <div className="skilling-future__overlay" aria-hidden="true" />
        <div className="skilling-future__glow" aria-hidden="true" />

        <div className="container skilling-future__top-inner">
          <header className="skilling-future__header" data-aos="fade-up" data-aos-duration="700">
            <Eyebrow>Our Programmes</Eyebrow>
            <h2 id="skilling-future-title">Skilling for the Future</h2>
            <p>
              We design industry-focused training programmes aligned with emerging technologies,
              evolving business needs, and future workforce requirements.
            </p>
          </header>

          <div className="skilling-future__ecosystem" aria-labelledby="skills-journey-title">
            <h3 id="skills-journey-title">Our Programmes Help Learners Develop</h3>
            <div className="skilling-future__journey">
              {skills.map((skill, i) => (
                <div
                  className="skilling-future__skill"
                  key={skill.name}
                  data-aos="zoom-in"
                  data-aos-delay={250 + i * 90}
                  data-aos-duration="500"
                >
                  <div className="skilling-future__icon icon-float" style={{ animationDelay: `${i * 0.25}s` }}>
                    <Icon name={skill.icon} size={28} color="var(--white)" />
                  </div>
                  <p className="skilling-future__skill-title">{skill.name}</p>
                  <p className="skilling-future__skill-desc">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section
          className="skilling-future__feature skilling-future__feature--certs"
          aria-labelledby="certifications-title"
        >
          <div
            className="skilling-future__cert-visual"
            data-aos="fade-right"
            data-aos-duration="600"
            data-aos-easing="ease-out-back"
          >
            <div className="skilling-future__cert-accent" aria-hidden="true" />
            <div className="skilling-future__cert-dots" aria-hidden="true" />
            <div className="skilling-future__image-wrap skilling-future__image-wrap--cert">
              <img src={certificationImg} alt="A learner receiving an industry certification" />
            </div>
            <div className="skilling-future__cert-badge">
              <span className="skilling-future__cert-badge-icon">
                <Icon name="trophy" size={20} color="var(--white)" />
              </span>
              <div className="skilling-future__cert-badge-text">
                <span>Global Tech Partners</span>
              </div>
            </div>
          </div>

          <div
            className="skilling-future__feature-content"
            data-aos="fade-left"
            data-aos-duration="550"
            data-aos-easing="ease-out-back"
          >
            <Eyebrow>Industry Certifications</Eyebrow>
            <h2 id="certifications-title">Recognized Today. Respected Tomorrow.</h2>
            <p>
              Globally recognized certifications improve employability and career progression. We
              collaborate with industry and technology partners to provide certification programmes
              that validate skills and prepare learners for competitive job markets.
            </p>
          </div>
        </section>

        <section className="skilling-future__feature skilling-future__feature--workforce" aria-labelledby="workforce-title">
          <div
            className="skilling-future__feature-content"
            data-aos="fade-right"
            data-aos-duration="550"
            data-aos-easing="ease-out-back"
          >
            <Eyebrow>Building a Future-Ready Workforce</Eyebrow>
            <h2 id="workforce-title">Preparing Learners for Tomorrow&apos;s Opportunities</h2>
            <p>
              The workplace is changing rapidly. We prepare learners for careers shaped by AI,
              automation, sustainability, digital transformation, and emerging technologies through
              practical, industry-driven learning experiences.
            </p>
            <a className="skilling-future__cta" href="#skilling-for-future">
              Explore Programmes <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div
            className="skilling-future__workforce-visual"
            data-aos="fade-left"
            data-aos-duration="550"
            data-aos-easing="ease-out-back"
          >
            <div className="skilling-future__workforce-ring" aria-hidden="true" />

            <div className="skilling-future__workforce-portal">
              <img src={workforceImg} alt="Learners training with emerging technologies" />
              <div className="skilling-future__workforce-sweep" aria-hidden="true" />
            </div>

            <div
              className="skilling-future__workforce-node skilling-future__workforce-node--a"
              aria-hidden="true"
            >
              <span className="skilling-future__workforce-node-badge">
                <Icon name="flask" size={18} color="var(--orange)" />
              </span>
            </div>
            <div
              className="skilling-future__workforce-node skilling-future__workforce-node--b"
              aria-hidden="true"
            >
              <span className="skilling-future__workforce-node-badge">
                <Icon name="globe" size={18} color="var(--orange)" />
              </span>
            </div>
            <div
              className="skilling-future__workforce-node skilling-future__workforce-node--c"
              aria-hidden="true"
            >
              <span className="skilling-future__workforce-node-badge">
                <Icon name="briefcase" size={18} color="var(--orange)" />
              </span>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}