import { useState } from 'react';
import Icon from '../ui/Icon';
import ThreeDCanvas from '../ui/ThreeDCanvas';
import '../ui/ThreeDCanvas.css';
import './CorePillars.css';

const PILLARS_DATA = [
  {
    id: 'skilling',
    title: 'Future Tech Skilling',
    subtitle: 'Industry-Aligned Certifications & Labs',
    icon: 'flask',
    badge: 'Core Program',
    description:
      'We prepare India’s youth for high-growth tech careers through rigorous, project-based curriculums developed in tandem with global technology leaders.',
    highlights: [
      {
        title: 'Cloud & DevOps Architecture',
        desc: 'Production AWS, Azure, and Google Cloud training with live containerization and serverless deployments.',
      },
      {
        title: 'Applied AI & Data Engineering',
        desc: 'Hands-on neural networks, LLM orchestration, and modern data pipeline engineering.',
      },
      {
        title: 'Cybersecurity Threat Defense',
        desc: 'Network vulnerability assessments, ethical hacking, SOC monitoring, and zero-trust principles.',
      },
      {
        title: 'Centers of Excellence in Colleges',
        desc: 'Dedicated physical and digital laboratories established inside university campuses across India.',
      },
    ],
    stats: [
      { label: 'Technical Domains', value: '12+' },
      { label: 'Live Projects Completed', value: '5,000+' },
      { label: 'Industry Certifications', value: '100% Recognized' },
    ],
  },
  {
    id: 'employment',
    title: 'Employment & GCC Hiring',
    subtitle: 'Connecting Raw Talent to Global Capability Centers',
    icon: 'briefcase',
    badge: '92% Placed',
    description:
      'Our dedicated placement wing partners directly with 300+ enterprise hiring heads and Global Capability Centers (GCCs) to ensure students transition into high-paying careers.',
    highlights: [
      {
        title: 'Corporate Campus Drives',
        desc: 'Direct hiring interviews and job fairs organized on campus and at regional tech hubs.',
      },
      {
        title: 'Technical Resume & Portfolio Clinics',
        desc: 'Transforming student GitHub repositories, live demo projects, and technical communication.',
      },
      {
        title: 'Mock Coding Rounds & Pair Programming',
        desc: 'Realistic assessments mirroring FAANG and tier-1 IT consulting technical interviews.',
      },
      {
        title: 'Dedicated Job Portal & Talent Bank',
        desc: 'Verified candidate roster accessed round-the-clock by verified corporate recruiters.',
      },
    ],
    stats: [
      { label: 'Hiring Partners', value: '300+' },
      { label: 'Average Salary Hike', value: '140%' },
      { label: 'GCC Tie-ups', value: '25+' },
    ],
  },
  {
    id: 'entrepreneurship',
    title: 'Innovation & Hackathons',
    subtitle: 'Building Creators, Not Just Job Seekers',
    icon: 'trophy',
    badge: 'Annual Learnathon',
    description:
      'Encouraging students to build viable tech startups and open-source solutions through 24-hour hackathons, mentor incubation, and prototyping grants.',
    highlights: [
      {
        title: 'Flagship Learnathons',
        desc: 'Pan-India 24-hour coding marathons tackling real-world governance, healthcare, and education problems.',
      },
      {
        title: 'Incubation & Prototype Mentorship',
        desc: 'Guidance from seasoned CTOs and venture founders to turn hackathon wins into deployable MVPs.',
      },
      {
        title: 'Angel & Seed Grant Pitch Days',
        desc: 'Connecting promising student ventures to early-stage capital and accelerator programs.',
      },
      {
        title: 'Tech Experience Labs at T-Works',
        desc: 'Prototyping facilities where students physically build and test hardware-software IoT integrations.',
      },
    ],
    stats: [
      { label: 'Hackathons Hosted', value: '18+' },
      { label: 'Student Startups Born', value: '45+' },
      { label: 'Prize Grants Distributed', value: '₹50L+' },
    ],
  },
  {
    id: 'csr',
    title: 'CSR & Women Empowerment',
    subtitle: 'Inclusive Growth & Equal Digital Access',
    icon: 'network',
    badge: 'Social Impact',
    description:
      'Ensuring technology education is not a luxury. We provide 100% sponsored scholarships, rural outreach, and women-in-tech leadership cohorts.',
    highlights: [
      {
        title: 'Girl Child Tech Scholarships',
        desc: 'Full financial grants covering laptops, certification fees, and dedicated female engineering mentors.',
      },
      {
        title: 'Rural & Tier-3 College Upliftment',
        desc: 'Bringing industry instructors and high-speed internet learning hubs to underserved districts.',
      },
      {
        title: 'Women in Tech Mentorship Circles',
        desc: 'Cohort-based leadership training preparing young women for managerial and executive tech roles.',
      },
      {
        title: 'Corporate CSR Partnership Co-funding',
        desc: 'Structured CSR programs allowing enterprises to direct 2% allocations into measurable skilling impact.',
      },
    ],
    stats: [
      { label: 'Women Skilled', value: '6,500+' },
      { label: 'Scholarships Awarded', value: '3,200+' },
      { label: 'Rural Districts Reached', value: '40+' },
    ],
  },
];

export default function CorePillars() {
  const [activePillar, setActivePillar] = useState('skilling');
  const current = PILLARS_DATA.find((p) => p.id === activePillar) || PILLARS_DATA[0];

  return (
    <section id="strategic-pillars" className="pillars-section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* 3D Model representing Four Foundations & Structural Pillars */}
      <ThreeDCanvas
        archetype="tesseract"
        color="#ea580c"
        secondaryColor="#fdba74"
        size={350}
        speed={0.8}
        className="threed-canvas--section-corner"
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Heading */}
        <div className="pillars-heading">
          <span className="pillars-eyebrow">
            <span className="pillars-dot" /> Comprehensive Foundation Architecture
          </span>
          <h2 className="pillars-title">
            Our Four Core <span>Strategic Pillars</span>
          </h2>
          <p className="pillars-desc">
            All our programs are architected around four synergistic pillars to take students from foundational skills to guaranteed employment, innovation, and social mobility.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="pillars-tabs-row">
          {PILLARS_DATA.map((pillar) => (
            <button
              key={pillar.id}
              type="button"
              className={`pillar-tab-btn ${activePillar === pillar.id ? 'pillar-tab-btn--active' : ''}`}
              onClick={() => setActivePillar(pillar.id)}
            >
              <div className="pillar-tab-icon">
                <Icon name={pillar.icon} size={20} />
              </div>
              <div className="pillar-tab-text">
                <span className="pillar-tab-title">{pillar.title}</span>
                <span className="pillar-tab-badge">{pillar.badge}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Pillar Bento Card */}
        <div className="pillar-bento-card">
          <div className="pillar-bento-left">
            <div className="pillar-bento-header">
              <span className="pillar-bento-badge">{current.badge}</span>
              <h3 className="pillar-bento-title">{current.title}</h3>
              <p className="pillar-bento-subtitle">{current.subtitle}</p>
            </div>

            <p className="pillar-bento-desc">{current.description}</p>

            <div className="pillar-stats-grid">
              {current.stats.map((s) => (
                <div className="pillar-stat-box" key={s.label}>
                  <span className="pillar-stat-val">{s.value}</span>
                  <span className="pillar-stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="pillar-action-row">
              <a href="#event-photos" className="btn btn-primary">
                View Photos from this Pillar <Icon name="arrow" size={16} />
              </a>
              <a href="#contact-us" className="btn btn-outline-dark">
                Partner with Us
              </a>
            </div>
          </div>

          <div className="pillar-bento-right">
            <h4 className="pillar-highlights-title">Key Initiatives & Impact Modules</h4>
            <div className="pillar-highlights-list">
              {current.highlights.map((item, idx) => (
                <div className="pillar-highlight-card" key={idx}>
                  <div className="pillar-highlight-num">{idx + 1}</div>
                  <div className="pillar-highlight-info">
                    <h5 className="pillar-highlight-h5">{item.title}</h5>
                    <p className="pillar-highlight-p">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
