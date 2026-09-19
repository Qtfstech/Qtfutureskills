import { useState } from 'react';
import Icon from '../ui/Icon';
import Modal from '../ui/Modal';
import './Event.css';

const initialForm = {
  name: '',
  mobile: '',
  email: '',
  address: '',
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4177';

export default function Event({ open, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [passData, setPassData] = useState(null);

  const setField = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^\d{10}$/.test(form.mobile)) e.mobile = 'Enter a valid 10-digit number';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.address.trim()) e.address = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError('');
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/event-registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || 'Registration failed. Please try again.');
      }
      setPassData({ passId: data.passId, email: form.email, mobile: form.mobile, name: form.name });
      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setSubmitError('');
    setErrors({});
    setPassData(null);
    onClose?.();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      eyebrow="Future Skills Summit"
      title="Register for the"
      highlight="Summit"
      description="Free entry · QR pass sent instantly · 08 Aug 2026, T-Works Hyderabad"
    >
      {submitted && passData ? (
        <div className="event__success-screen">
          <div className="event__success-icon">✅</div>
          <h3 className="event__success-title">Registration Successful!</h3>
          <p className="event__success-sub">
            Your pass has been confirmed. Details have been sent to your email.
          </p>

          <button type="button" className="btn btn-primary event__success-close" onClick={handleClose}>
            Done <Icon name="arrow" size={16} />
          </button>
        </div>
      ) : (
      <form className="event__form" onSubmit={handleSubmit}>
        <div className="event__field">
          <label>Full Name <span>*</span></label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setField('name')(e.target.value)}
            placeholder="Your full name"
          />
          {errors.name && <span className="event__error">{errors.name}</span>}
        </div>

        <div className="event__row">
          <div className="event__field">
            <label>Mobile Number <span>*</span></label>
            <input
              type="tel"
              value={form.mobile}
              onChange={(e) => setField('mobile')(e.target.value)}
              placeholder="10-digit number"
            />
            {errors.mobile && <span className="event__error">{errors.mobile}</span>}
          </div>
          <div className="event__field">
            <label>Email <span>*</span></label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setField('email')(e.target.value)}
              placeholder="you@email.com"
            />
            {errors.email && <span className="event__error">{errors.email}</span>}
          </div>
        </div>

        <div className="event__field">
          <label>Address <span>*</span></label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setField('address')(e.target.value)}
            placeholder="Your address"
          />
          {errors.address && <span className="event__error">{errors.address}</span>}
        </div>

        <button type="submit" className="btn btn-primary event__submit" disabled={submitting}>
          {submitting ? 'Submitting…' : <>Get My Free Pass <Icon name="arrow" size={16} /></>}
        </button>

        {submitError && (
          <p className="event__error event__error--banner">{submitError}</p>
        )}
      </form>
      )}
    </Modal>
  );
}
