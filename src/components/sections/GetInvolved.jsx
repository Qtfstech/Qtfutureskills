import { useState } from 'react';
import Icon from '../ui/Icon';
import ThreeDCanvas from '../ui/ThreeDCanvas';
import '../ui/ThreeDCanvas.css';
import './GetInvolved.css';

const API_URL = import.meta.env.VITE_API_URL ?? '';

const INVOLVEMENT_PATHWAYS = [
  {
    id: 'sponsor',
    title: 'Sponsor Education',
    subtitle: 'Fund a Dream, Build a Career',
    icon: 'trophy',
    color: '#ea580c',
    description:
      'Directly sponsor tuition fees, high-spec engineering laptops, and globally recognized cloud/AI certification vouchers for talented students from economically disadvantaged backgrounds.',
    perks: ['100% transparent direct student linkage', 'Quarterly academic & placement updates', 'Tax-exempt 80G receipts'],
  },
  {
    id: 'skilling',
    title: 'Support Skilling Initiatives',
    subtitle: 'Accelerate Future Skills Labs',
    icon: 'flask',
    color: '#ff5500',
    description:
      'Help us set up state-of-the-art Centers of Excellence in rural and Tier-2 engineering colleges. Provide servers, GPU compute access, and modern IoT kits for hands-on student innovation.',
    perks: ['Campus CoE naming rights', 'Direct branding on student projects', 'Annual impact audits'],
  },
  {
    id: 'volunteer',
    title: 'Volunteer Your Expertise',
    subtitle: 'Mentor Tomorrow’s Engineers',
    icon: 'network',
    color: '#f97316',
    description:
      'Are you a software architect, data scientist, or industry leader? Volunteer your weekend hours to review code repositories, conduct mock technical interviews, or mentor teams during 24-hour hackathons.',
    perks: ['Flexible weekend commitments', 'Judge national Learnathon finals', 'Inspire hundreds of young coders'],
  },
  {
    id: 'csr',
    title: 'Partner Through CSR',
    subtitle: 'High-ROI Social Impact',
    icon: 'briefcase',
    color: '#ea580c',
    description:
      'We partner with enterprise CSR committees to implement structured, audited skilling cohorts with guaranteed employment metrics and women-in-tech enablement programs.',
    perks: ['Comprehensive CSR audit compliance', 'Clear ESG impact reporting', 'Campus recruitment pipeline privileges'],
  },
];

export default function GetInvolved() {
  const [selectedPathway, setSelectedPathway] = useState('sponsor');
  const [interestModalOpen, setInterestModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    pathway: 'Sponsor Education',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const activePath = INVOLVEMENT_PATHWAYS.find((p) => p.id === selectedPathway) || INVOLVEMENT_PATHWAYS[0];

  const handleOpenInterest = (pathwayTitle) => {
    setFormData((prev) => ({ ...prev, pathway: pathwayTitle }));
    setInterestModalOpen(true);
    setSubmitted(false);
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${API_URL}/api/contact-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `[Get Involved - ${formData.pathway}] Phone: ${formData.phone || 'N/A'}, Org: ${formData.organization || 'Individual'}\nMessage: ${formData.message}`,
        }),
      });

      if (!res.ok) {
        throw new Error('Could not submit details. Please try again.');
      }
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        pathway: 'Sponsor Education',
        message: '',
      });
    } catch (err) {
      setErrorMsg(err.message || 'Submission failed. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="get-involved" className="get-involved-section">
      {/* 3D Model representing Community Empowerment & Crystalline Structure */}
      <ThreeDCanvas
        archetype="dodecahedron"
        color="#ea580c"
        secondaryColor="#fdba74"
        size={360}
        speed={0.8}
        className="threed-canvas--section-corner"
      />
      <ThreeDCanvas
        archetype="octahedron"
        color="#ff5500"
        secondaryColor="#fed7aa"
        size={270}
        speed={1}
        className="threed-canvas--section-corner-left"
      />

      <div className="container get-involved-container">
        {/* Section Header with exact requested text */}
        <div className="get-involved-header">
          <span className="get-involved-eyebrow">
            <span className="get-involved-dot" /> Every Individual Has The Power To Create Meaningful Change
          </span>

          <h2 className="get-involved-title">
            Get <span>Involved</span>
          </h2>

          <p className="get-involved-desc">
            Whether you wish to sponsor education, support skilling initiatives, volunteer your expertise, partner through CSR, or collaborate on community programmes — Future Skills Foundation welcomes your participation. Together, we can create opportunities, transform lives, and build a future where everyone has the tools to succeed.
          </p>
        </div>

        {/* 4 Involvement Cards */}
        <div className="get-involved-grid">
          {INVOLVEMENT_PATHWAYS.map((item) => (
            <div
              key={item.id}
              className={`involve-card ${selectedPathway === item.id ? 'involve-card--active' : ''}`}
              onClick={() => setSelectedPathway(item.id)}
            >
              <div className="involve-card__icon" style={{ color: item.color }}>
                <Icon name={item.icon} size={24} />
              </div>

              <div className="involve-card__body">
                <span className="involve-card__subtitle">{item.subtitle}</span>
                <h3 className="involve-card__title">{item.title}</h3>
                <p className="involve-card__text">{item.description}</p>

                <ul className="involve-card__perks">
                  {item.perks.map((perk, i) => (
                    <li key={i}>
                      <Icon name="check" size={13} color="#ea580c" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="involve-card__action">
                <button
                  type="button"
                  className="btn btn-involve"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenInterest(item.title);
                  }}
                >
                  Join as {item.title} <Icon name="arrow" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Strip */}
        <div className="get-involved-cta-strip">
          <div className="get-involved-cta-text">
            <h4>Have a custom proposal, foundation endowment, or CSR framework?</h4>
            <p>Our program coordinators are ready to co-create bespoke partnerships with universities, corporate trusts, and NGOs.</p>
          </div>
          <button
            type="button"
            className="btn btn-hero-primary"
            onClick={() => handleOpenInterest('Custom Partnership / CSR')}
          >
            Connect with Our Team <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>

      {/* Participation Inquiry Modal */}
      {interestModalOpen && (
        <div className="involve-modal-overlay" onClick={() => setInterestModalOpen(false)}>
          <div className="involve-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="involve-modal__close"
              onClick={() => setInterestModalOpen(false)}
              aria-label="Close"
            >
              <Icon name="x" size={18} />
            </button>

            <div className="involve-modal__head">
              <span className="involve-modal__tag">Future Skills Foundation</span>
              <h3>Participate: {formData.pathway}</h3>
              <p>Leave your details and our team will get in touch with you within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="involve-modal__success">
                <div className="success-icon-wrap">
                  <Icon name="check" size={28} color="#166534" />
                </div>
                <h4>Thank You For Stepping Forward!</h4>
                <p>
                  Your commitment helps us empower the next generation. Our partnership director will reach out with the detailed onboarding kit.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setInterestModalOpen(false)}
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form className="involve-modal__form" onSubmit={handleSubmit}>
                <div className="involve-modal__field">
                  <label htmlFor="inv-name">Full Name *</label>
                  <input
                    id="inv-name"
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="involve-modal__row">
                  <div className="involve-modal__field">
                    <label htmlFor="inv-email">Email Address *</label>
                    <input
                      id="inv-email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="involve-modal__field">
                    <label htmlFor="inv-phone">Phone / WhatsApp</label>
                    <input
                      id="inv-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="involve-modal__field">
                  <label htmlFor="inv-org">Organization / Institution (Optional)</label>
                  <input
                    id="inv-org"
                    type="text"
                    placeholder="e.g. Tech Enterprise / College / Independent Mentor"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>

                <div className="involve-modal__field">
                  <label htmlFor="inv-msg">How would you like to contribute?</label>
                  <textarea
                    id="inv-msg"
                    rows={3}
                    placeholder="Tell us about your interests, proposed student sponsorship count, or mentoring expertise…"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {errorMsg && <p className="involve-modal__error">{errorMsg}</p>}

                <button type="submit" className="btn btn-hero-primary" disabled={submitting}>
                  {submitting ? 'Submitting Interest…' : 'Submit Involvement Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
