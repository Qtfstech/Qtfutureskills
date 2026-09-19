import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Icon from '../components/ui/Icon';
import SectionHeading from '../components/ui/SectionHeading';
import CountUp from '../components/ui/CountUp';
import Login from '../components/sections/Login';
import Leadership from '../components/sections/Leadership';
import { pillars, impactStats } from '../data/content';
import studyImg from '../assets/images/study-illustration.png';
import teamImg from '../assets/images/team-discussion.png';
import meetingImg from '../assets/images/meeting.png';
import './AboutUs.css';

const coreValues = [
  { title: 'Integrity', icon: 'check' },
  { title: 'Innovation', icon: 'flask' },
  { title: 'Excellence', icon: 'trophy' },
  { title: 'Collaboration', icon: 'users' },
  { title: 'Inclusion', icon: 'heart' },
  { title: 'Social Responsibility', icon: 'globe' },
];

const focusAreas = [
  { title: 'Artificial Intelligence', icon: 'flask' },
  { title: 'Data Science & Analytics', icon: 'chart' },
  { title: 'Cyber Security', icon: 'check' },
  { title: 'Cloud Computing', icon: 'globe' },
  { title: 'Robotics & Automation', icon: 'flask' },
  { title: 'IoT — Internet of Things', icon: 'network' },
  { title: 'Blockchain Technology', icon: 'network' },
  { title: 'FinTech & Digital Finance', icon: 'chart' },
  { title: 'Web & App Development', icon: 'flask' },
  { title: 'UI/UX Design & Multimedia', icon: 'flask' },
  { title: 'Digital Marketing', icon: 'mic' },
  { title: 'Content Creation & Media', icon: 'mic' },
  { title: 'IT & Computer Fundamentals', icon: 'flask' },
  { title: 'Networking & Systems', icon: 'network' },
  { title: 'Spoken English & Communication', icon: 'users' },
  { title: 'Soft Skills & Personality Dev.', icon: 'users' },
  { title: 'Leadership & Life Skills', icon: 'trophy' },
  { title: 'Entrepreneurship & Startups', icon: 'briefcase' },
];

const objectives = [
  'Future Skills Development',
  'Enhance Employability',
  'Promote Quality Education',
  'Encourage Entrepreneurship',
  'Bridge Industry–Academia Gap',
  'Empower Rural and Underprivileged Communities',
  'Promote Research and Innovation',
  'Develop Leadership and Life Skills',
  'Support Career Guidance and Mentorship',
  'Contribute to Sustainable Community Development',
];

const flagshipInitiatives = [
  { title: 'Future Skills Academy', icon: 'book' },
  { title: 'AI & Emerging Technologies Programs', icon: 'flask' },
  { title: 'Digital Literacy Mission', icon: 'globe' },
  { title: 'Women Empowerment Programs', icon: 'heart' },
  { title: 'Faculty & Educator Development', icon: 'users' },
  { title: 'Career Accelerator Program', icon: 'briefcase' },
  { title: 'Innovation & Research Labs', icon: 'flask' },
  { title: 'Entrepreneurship & Startup Support', icon: 'chart' },
  { title: 'Community Outreach & CSR Initiatives', icon: 'network' },
  { title: 'Scholarships & Financial Assistance', icon: 'trophy' },
];

const partnerGroups = [
  {
    title: 'International & Industry Organizations',
    partners: ['IACC', 'Indo Japan Connect', 'World Federation', 'TAP TCO Consortium'],
  },
  {
    title: 'Skill Ecosystem Partners',
    partners: ['DEET', 'Braincode', 'TASK', 'BSNL', 'Music Champs', 'K Labs'],
  },
  {
    title: 'Academic Partner',
    partners: ['Skillioma', 'TTPOA', 'Vairis'],
  },
  {
    title: 'Media Partners',
    partners: ['India Next', 'Radiovaani', 'Cloud Media News'],
  },
  {
    title: 'Medical Partner',
    partners: ['Medicover Hospitals'],
  },
  {
    title: 'Corporate & Technology Partner',
    partners: ['Coign', 'TechForce', 'Elevate Career.AI'],
  },
];

const approachSteps = [
  { title: 'Learn', icon: 'book' },
  { title: 'Build Skills', icon: 'flask' },
  { title: 'Earn Certifications', icon: 'trophy' },
  { title: 'Gain Employment', icon: 'briefcase' },
  { title: 'Transform Lives', icon: 'users' },
];

function handleMagneticMove(e, strength = 14) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  el.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
}

function handleMagneticLeave(e) {
  e.currentTarget.style.transform = '';
}

function handleCardTilt(e, strength = 8) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  el.style.setProperty('--tilt-x', `${(x / (rect.width / 2)) * strength}deg`);
  el.style.setProperty('--tilt-y', `${-(y / (rect.height / 2)) * strength}deg`);
}

function resetCardTilt(e) {
  e.currentTarget.style.setProperty('--tilt-x', '0deg');
  e.currentTarget.style.setProperty('--tilt-y', '0deg');
}

function handleStageTilt(e, strength = 16) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  el.style.setProperty('--stage-x', `${(x / (rect.width / 2)) * strength}deg`);
  el.style.setProperty('--stage-y', `${-(y / (rect.height / 2)) * strength}deg`);
}

function resetStageTilt(e) {
  e.currentTarget.style.setProperty('--stage-x', '0deg');
  e.currentTarget.style.setProperty('--stage-y', '0deg');
}

function useParallax(ref, strength = 30) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const centered = (rect.top + rect.height / 2 - vh / 2) / vh;
      el.style.setProperty('--parallax-y', `${(centered * strength).toFixed(1)}px`);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, strength]);
}

function useScrollFill(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--fill', '1');
      return undefined;
    }

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh * 0.8 - rect.top) / (rect.height + vh * 0.4);
      el.style.setProperty('--fill', Math.min(1, Math.max(0, progress)).toFixed(3));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);
}

export default function AboutUs({ session, setSession }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();
  const timelineRef = useRef(null);
  useScrollFill(timelineRef);
  const heroPhotoRef = useRef(null);
  useParallax(heroPhotoRef, 24);

  const handleOpenAuth = () => {
    if (!session) {
      setLoginOpen(true);
    } else {
      navigate('/dashboard');
    }
  };

  const handleLoginSuccess = (data) => {
    setSession(data);
    setLoginOpen(false);
    navigate('/dashboard');
  };

  const authLabel = !session ? 'Admin Login' : session.role === 'admin' ? 'Admin' : 'My Ticket';

  return (
    <>
      <Navbar onOpenAuth={handleOpenAuth} authLabel={authLabel} />
      <main className="about-page">
        <section className="about-page__hero">
          <div className="about-page__hero-blob about-page__hero-blob--orange" aria-hidden="true" />
          <div className="about-page__hero-blob about-page__hero-blob--teal" aria-hidden="true" />

          <div className="container about-page__hero-grid">
            <div className="about-page__hero-content" data-aos="fade-right" data-aos-duration="800">
              <span className="about-page__hero-eyebrow">About the Foundation</span>
              <h1>
                Empowering People. Enabling Skills.
                <span> Transforming Futures.</span>
              </h1>
              <p>
                Quality Thought Future Skills Foundation is a non-profit organization committed to
                empowering students, youth, educators, women and communities with future-ready
                skills, quality education, innovation and career development opportunities.
              </p>
              <div className="about-page__hero-actions">
                <a
                  href="#vm"
                  className="btn btn-primary"
                  onMouseMove={(e) => handleMagneticMove(e, 14)}
                  onMouseLeave={handleMagneticLeave}
                >
                  Our Vision &amp; Mission <Icon name="arrow" size={16} />
                </a>
                <a
                  href="/#get-involved"
                  className="btn btn-outline"
                  onMouseMove={(e) => handleMagneticMove(e, 14)}
                  onMouseLeave={handleMagneticLeave}
                >
                  Get Involved
                </a>
              </div>
            </div>

            <div
              className="about-page__hero-visual"
              data-aos="fade-left"
              data-aos-delay="150"
              data-aos-duration="800"
              onMouseMove={handleStageTilt}
              onMouseLeave={resetStageTilt}
            >
              <div className="about-page__hero-stage">
                <div className="about-page__hero-ring" aria-hidden="true" />
                <div className="about-page__hero-photo" ref={heroPhotoRef}>
                  <img src={studyImg} alt="A student studying with books and a laptop" />
                </div>
                <div className="about-page__hero-badge about-page__hero-badge--top icon-float">
                  <Icon name="trophy" size={16} color="var(--orange-light)" />
                  <span>Non-Profit Foundation</span>
                </div>
                <div className="about-page__hero-badge about-page__hero-badge--bottom icon-float" style={{ animationDelay: '0.5s' }}>
                  <Icon name="pin" size={16} color="var(--teal)" />
                  <span>Hyderabad, Telangana</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-page__stats" aria-label="Our impact in numbers">
          <div className="container">
            <div className="about-page__stats-band" data-aos="fade-up">
              {impactStats.map((stat, i) => (
                <div className="about-page__stats-item" key={stat.label} data-aos="zoom-in" data-aos-delay={i * 90}>
                  <span className="about-page__stats-icon-coin" style={{ animationDelay: `${i * 0.4}s` }}>
                    <span className="about-page__stats-icon about-page__stats-icon--front" style={{ animationDelay: `${i * 0.4}s` }}>
                      <Icon name={stat.icon} size={20} color="var(--orange-light)" />
                    </span>
                    <span className="about-page__stats-icon about-page__stats-icon--back" style={{ animationDelay: `${i * 0.4}s` }}>
                      <Icon name="check" size={20} color="var(--teal)" />
                    </span>
                  </span>
                  <CountUp value={stat.value} className="about-page__stats-value" />
                  <span className="about-page__stats-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="vm" className="about-page__vm section">
          <div className="container about-page__vm-grid">
            <div
              className="about-page__vm-card about-page__vm-card--vision"
              data-aos="fade-up"
              onMouseMove={(e) => handleCardTilt(e, 6)}
              onMouseLeave={resetCardTilt}
            >
              <div className="about-page__vm-icon">
                <Icon name="search" size={26} />
              </div>
              <h2>Our Vision</h2>
              <p>
                To create a future-ready society empowered through quality education, innovation,
                technology and lifelong learning.
              </p>
            </div>
            <div
              className="about-page__vm-card about-page__vm-card--mission"
              data-aos="fade-up"
              data-aos-delay="120"
              onMouseMove={(e) => handleCardTilt(e, 6)}
              onMouseLeave={resetCardTilt}
            >
              <div className="about-page__vm-icon">
                <Icon name="flask" size={26} />
              </div>
              <h2>Our Mission</h2>
              <p>
                To equip individuals with knowledge, skills, values and opportunities that enable
                them to succeed in a rapidly evolving global world while contributing meaningfully
                to society.
              </p>
            </div>
          </div>
        </section>

        <section className="about-page__story section">
          <div className="container about-page__story-grid">
            <div className="about-page__story-image" data-aos="fade-right" data-aos-duration="800">
              <img src={teamImg} alt="Team members reviewing skilling programme materials" />
              <div className="about-page__story-badge">
                <Icon name="network" size={18} color="var(--teal)" />
                <div>
                  <strong>Pan-India</strong>
                  <span>Network of Centers</span>
                </div>
              </div>
            </div>
            <div className="about-page__story-content" data-aos="fade-left" data-aos-delay="120">
              <SectionHeading align="left" eyebrow="Who We Are" title="Built By People Who" highlight="Believe In Access" />
              <p>
                We bridge the gap between traditional education and industry needs through
                innovation, technology, entrepreneurship, leadership and lifelong learning —
                working alongside institutions, corporates, and communities across India.
              </p>
              <div className="about-page__values-grid">
                {coreValues.map((value, i) => (
                  <div
                    className="about-page__value"
                    key={value.title}
                    data-aos="flip-up"
                    data-aos-delay={i * 80}
                    data-aos-duration="600"
                  >
                    <div className="about-page__value-icon">
                      <Icon name={value.icon} size={17} color="var(--orange)" />
                    </div>
                    <span>{value.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Leadership />

        <section className="about-page__focus section">
          <div className="about-page__focus-glow" aria-hidden="true" />
          <div className="about-page__focus-dots" aria-hidden="true" />
          <div className="container">
            <SectionHeading eyebrow="Holistic Skills for a Better Tomorrow" title="Our Focus" highlight="Areas" />
            <div className="about-page__focus-grid">
              {focusAreas.map((area, i) => (
                <div
                  className="about-page__focus-chip"
                  key={area.title}
                  data-aos="fade-up"
                  data-aos-delay={(i % 6) * 60}
                  onMouseMove={(e) => handleCardTilt(e, 14)}
                  onMouseLeave={resetCardTilt}
                >
                  <Icon name={area.icon} size={15} color="var(--teal)" />
                  <span>{area.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-page__pillars section">
          <div className="container about-page__pillars-layout">
            <div className="about-page__pillars-image" data-aos="fade-right" data-aos-duration="800">
              <img src={meetingImg} alt="Team collaborating around a strategy meeting" />
            </div>
            <div data-aos="fade-left" data-aos-delay="120">
              <SectionHeading align="left" eyebrow="How We Deliver" title="Our Strategic" highlight="Pillars" />
              <div className="about-page__pillars-grid">
                {pillars.map((pillar, i) => (
                  <div
                    className={`about-page__pillar about-page__pillar--${pillar.color}`}
                    key={pillar.title}
                    data-aos="fade-up"
                    data-aos-delay={i * 120}
                    onMouseMove={handleCardTilt}
                    onMouseLeave={resetCardTilt}
                  >
                    <h3>{pillar.title}</h3>
                    <ul>
                      {pillar.items.map((item) => (
                        <li key={item}>
                          <Icon name="check" size={15} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-page__objectives section">
          <div className="container about-page__objectives-grid">
            <div data-aos="fade-right">
              <SectionHeading align="left" eyebrow="What We Aim For" title="Our" highlight="Objectives" />
              <p className="about-page__objectives-desc">
                Ten priorities guide every program and partnership we build — from first-mile
                access to long-term community impact.
              </p>
            </div>
            <ol className="about-page__objectives-list" data-aos="fade-left" data-aos-delay="100">
              {objectives.map((item, i) => (
                <li key={item} data-aos="flip-left" data-aos-delay={i * 55} data-aos-duration="500">
                  <span className="about-page__objectives-index">{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="about-page__flagship section">
          <div className="container">
            <SectionHeading eyebrow="Where the Mission Lives" title="Our Flagship" highlight="Initiatives" />
            <div className="about-page__flagship-grid">
              {flagshipInitiatives.map((item, i) => (
                <div
                  className="about-page__flagship-item"
                  key={item.title}
                  data-aos="zoom-in"
                  data-aos-delay={(i % 5) * 70}
                  onMouseMove={handleCardTilt}
                  onMouseLeave={resetCardTilt}
                >
                  <div className="about-page__flagship-icon" style={{ animationDelay: `${(i % 5) * 0.35}s` }}>
                    <Icon name={item.icon} size={19} color="#fff" />
                  </div>
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-page__partners section">
          <div className="container">
            <SectionHeading
              eyebrow="Trusted Collaborations"
              title="Our Partners"
              highlight="& MoUs"
              description="Placeholder badges shown below — swap in official partner logos once assets are provided."
            />
            <div className="about-page__partners-grid">
              {partnerGroups.map((group, gi) => (
                <div className="about-page__partners-panel" key={group.title} data-aos="fade-up" data-aos-delay={gi * 90}>
                  <h3>{group.title}</h3>
                  <div className="about-page__partners-logos">
                    {group.partners.map((name) => (
                      <div className="about-page__partner-badge" key={name}>
                        <Icon name="building" size={16} color="var(--navy)" />
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-page__approach section">
          <div className="container">
            <SectionHeading eyebrow="From Learning to Livelihood" title="Our" highlight="Approach" />
            <div className="about-page__approach-row" ref={timelineRef}>
              <div className="about-page__approach-track" aria-hidden="true">
                <div className="about-page__approach-track-fill" />
              </div>
              {approachSteps.map((step, i) => (
                <div className="about-page__approach-unit" key={step.title} data-aos="zoom-in" data-aos-delay={i * 100}>
                  <div className="about-page__approach-step" style={{ '--pulse-delay': `${i * 0.4}s`, '--spin-delay': `${i * 0.3}s` }}>
                    <div className="about-page__approach-cube">
                      <Icon name={step.icon} size={18} />
                    </div>
                  </div>
                  <span>{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Login
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        restrictToAdmin
      />
    </>
  );
}
