import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Icon from '../components/ui/Icon';
import Login from '../components/sections/Login';
import { contactInfo } from '../data/content';
import './ContactUs.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4177';

const MAP_QUERY = encodeURIComponent(
  'Siddhi Vinayak Nagar, Madhapur, Shaikpet, Hyderabad, Telangana 500081'
);
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

const initialForm = { name: '', email: '', phone: '', message: '' };

export default function ContactUs({ session, setSession }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

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
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || 'Could not send your message. Please try again.');
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
    <>
      <Navbar onOpenAuth={handleOpenAuth} authLabel={authLabel} />
      <main className="contact-page">
        <section className="contact-page__hero">
          <div className="container">
            <span className="contact-page__eyebrow">Get In Touch</span>
            <h1>We Are Here…</h1>
            <p>
              Have a question about our programs, partnerships, or centers? Reach out — our team
              typically responds within one business day.
            </p>
          </div>
        </section>

        <section className="contact-page__body">
          <div className="contact-page__column">
            <div className="contact-page__info-list">
              <a className="contact-page__info-row" href={MAP_LINK} target="_blank" rel="noreferrer">
                <span className="contact-page__info-icon">
                  <Icon name="pin" size={18} color="var(--orange)" />
                </span>
                <span>
                  <strong>Our Address</strong>
                  <span>{contactInfo.address}</span>
                </span>
              </a>
              <a className="contact-page__info-row" href={`mailto:${contactInfo.email}`}>
                <span className="contact-page__info-icon">
                  <Icon name="mail" size={18} color="var(--orange)" />
                </span>
                <span>
                  <strong>Email Us</strong>
                  <span>{contactInfo.email}</span>
                </span>
              </a>
              <a
                className="contact-page__info-row"
                href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`}
              >
                <span className="contact-page__info-icon">
                  <Icon name="phone" size={18} color="var(--orange)" />
                </span>
                <span>
                  <strong>Call Us</strong>
                  <span>{contactInfo.phone} · {contactInfo.hours}</span>
                </span>
              </a>
            </div>

            <div className="contact-page__form-block">
              <h2>Send Us a Message</h2>

              {submitted ? (
                <div className="contact-page__success">
                  <Icon name="check" size={26} color="var(--teal)" />
                  <p>Thanks — your message has been sent. We'll get back to you shortly.</p>
                  <button type="button" className="btn btn-outline-dark" onClick={() => setSubmitted(false)}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-page__form" noValidate>
                  <div className="contact-page__field">
                    <input
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span className="contact-page__error">{errors.name}</span>}
                  </div>
                  <div className="contact-page__field">
                    <input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="contact-page__error">{errors.email}</span>}
                  </div>
                  <div className="contact-page__field">
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Your Phone Number (optional)"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-page__field">
                    <textarea
                      name="message"
                      placeholder="How can we help?"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                    />
                    {errors.message && <span className="contact-page__error">{errors.message}</span>}
                  </div>

                  {submitError && <p className="contact-page__submit-error">{submitError}</p>}

                  <button type="submit" className="btn btn-primary contact-page__submit" disabled={submitting}>
                    {submitting ? 'Sending…' : 'Submit'}
                  </button>
                </form>
              )}
            </div>

            <div className="contact-page__map">
              <iframe
                title="Quality Thought Future Skills Foundation location"
                src={MAP_EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a className="contact-page__map-link" href={MAP_LINK} target="_blank" rel="noreferrer">
                <Icon name="pin" size={15} color="var(--orange)" /> Open in Google Maps
              </a>
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
