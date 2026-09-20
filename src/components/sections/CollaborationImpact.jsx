import Icon from '../ui/Icon';
import ThreeDCanvas from '../ui/ThreeDCanvas';
import '../ui/ThreeDCanvas.css';
import './CollaborationImpact.css';

const COLLABORATION_PILLARS = [
  {
    icon: 'network',
    tag: 'Academic Alliances',
    title: '100+ Engineering Colleges & Universities',
    desc: 'Empowering faculties, co-designing modern curriculums, establishing Centers of Excellence, and organizing state-level hackathons on campus.',
    stat: '100+ Institutions',
  },
  {
    icon: 'briefcase',
    tag: 'Enterprise & GCC Tie-ups',
    title: '300+ Corporate Hiring Partners',
    desc: 'Direct talent pipelines into Global Capability Centers, product startups, and Fortune 500 enterprises with guaranteed campus placements.',
    stat: '300+ Companies',
  },
  {
    icon: 'flask',
    tag: 'Innovation Hubs',
    title: 'T-Works & Prototyping Ecosystem',
    desc: 'Connecting students to prototyping labs, IoT testing facilities, and incubator grants that convert ideas into viable tech startups.',
    stat: '₹50L+ Grants',
  },
  {
    icon: 'trophy',
    tag: 'Mentor Community',
    title: '500+ Distinguished Academic & Industry Mentors',
    desc: 'Dedicated CTOs, distinguished professors, and technical architects offering 1-on-1 code reviews, resume clinics, and career guidance.',
    stat: '500+ Mentors',
  },
];

const IMPACT_HIGHLIGHTS = [
  { value: '15,000+', label: 'Students Trained & Certified' },
  { value: '92%', label: 'Placement Transition Success' },
  { value: '140%', label: 'Average Salary Hike' },
  { value: '45+', label: 'Student Ventures Incubated' },
];

export default function CollaborationImpact() {
  return (
    <section id="collaboration" className="collab-section">
      {/* 3D Art Model in Background representing Synergistic Interlocking Collaboration */}
      <ThreeDCanvas
        archetype="torus"
        color="#ea580c"
        secondaryColor="#fdba74"
        size={380}
        speed={0.9}
        className="threed-canvas--section-corner"
      />
      <ThreeDCanvas
        archetype="tesseract"
        color="#ff5500"
        secondaryColor="#fed7aa"
        size={280}
        speed={0.7}
        className="threed-canvas--section-corner-left"
      />

      <div className="container collab-container">
        {/* Section Header */}
        <div className="collab-header">
          <div className="collab-badge">
            <span className="collab-badge-dot" />
            <span>Shared Purpose • Exponential Outcomes</span>
          </div>

          <h2 className="collab-title">
            We Believe Collaboration <span>Creates Greater Impact</span>
          </h2>

          <p className="collab-lead">
            Real societal transformation happens when educational institutions, global enterprise leaders, government agencies, and dedicated academic mentors unite with a shared mission.
          </p>
        </div>

        {/* Impact Metric Strip */}
        <div className="collab-metric-strip">
          {IMPACT_HIGHLIGHTS.map((metric) => (
            <div key={metric.label} className="collab-metric-box">
              <span className="collab-metric-val">{metric.value}</span>
              <span className="collab-metric-lbl">{metric.label}</span>
            </div>
          ))}
        </div>

        {/* 4 Collaborative Pillars */}
        <div className="collab-cards-grid">
          {COLLABORATION_PILLARS.map((item, idx) => (
            <div key={idx} className="collab-card">
              <div className="collab-card__top">
                <div className="collab-card__icon">
                  <Icon name={item.icon} size={22} />
                </div>
                <span className="collab-card__tag">{item.tag}</span>
              </div>

              <h3 className="collab-card__title">{item.title}</h3>
              <p className="collab-card__desc">{item.desc}</p>

              <div className="collab-card__footer">
                <span className="collab-card__stat-badge">
                  <Icon name="check" size={14} color="#ea580c" />
                  {item.stat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="collab-quote-banner">
          <div className="collab-quote-content">
            <Icon name="network" size={28} color="#ffedd5" />
            <p>
              "No single organization can bridge India’s talent divide alone. By bridging classroom theory with enterprise execution, our collaborative coalition guarantees every student a seat at the table of the digital economy."
            </p>
            <div className="collab-quote-author">
              <strong>Quality Thought Future Skills Foundation</strong>
              <span>Coalition for National Tech Excellence</span>
            </div>
          </div>
          <div className="collab-quote-cta">
            <a href="#contact" className="btn btn-hero-primary">
              Partner in Our Coalition <Icon name="arrow" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
