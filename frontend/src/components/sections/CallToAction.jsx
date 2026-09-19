import { useState } from 'react';
import teamImg from '../../assets/images/team-discussion.png';
import Icon from '../ui/Icon';
import './CallToAction.css';

const initialForm = { name: '', email: '', message: '' };
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4177';

export default function CallToAction() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const setField = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError('');
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/contact-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="cta">
      <div className="container cta__inner">
        <div className="cta__visual" data-aos="fade-right" data-aos-duration="900">
          <img src={teamImg} alt="Team reviewing a partnership proposal" />
        </div>

        <div className="cta__content" data-aos="fade-left" data-aos-delay="150">
          <div>
            <h2>Ready to Shape the Future of Skilling?</h2>
            <p>
              Partner with us, join a chapter, or enroll in a certification program —
              be part of a future-ready workforce movement.
            </p>
          </div>

          <form className="cta__form" onSubmit={handleSubmit}>
            <div className="cta__row">
              <div className="cta__field">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setField('name')(e.target.value)}
                  placeholder="Your name"
                  className="cta__input"
                />
                {errors.name && <span className="cta__error">{errors.name}</span>}
              </div>
              <div className="cta__field">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField('email')(e.target.value)}
                  placeholder="you@organization.org"
                  className="cta__input"
                />
                {errors.email && <span className="cta__error">{errors.email}</span>}
              </div>
            </div>

            <div className="cta__field">
              <textarea
                value={form.message}
                onChange={(e) => setField('message')(e.target.value)}
                placeholder="Tell us how you'd like to get involved…"
                className="cta__input cta__textarea"
                rows={3}
              />
              {errors.message && <span className="cta__error">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary cta__submit" disabled={submitting}>
              <Icon name="mail" size={16} /> {submitting ? 'Sending…' : 'Get in touch'}
            </button>

            {submitError && <p className="cta__error cta__error--banner">{submitError}</p>}
            {submitted && (
              <p className="cta__success">
                <Icon name="check" size={16} color="var(--teal)" /> Thanks! We'll get back to you shortly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
