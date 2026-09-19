import { useState } from 'react';
import Icon from '../ui/Icon';
import Modal from '../ui/Modal';
import './Login.css';

const initialForm = { email: '', password: '' };

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4177';

export default function Login({ open, onClose, onLoginSuccess, restrictToAdmin = false, restrictToUser = false }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const setField = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Login failed. Please try again.');
      }
      if (restrictToAdmin && data.role !== 'admin') {
        throw new Error('This login is for admins only. Attendees can log in from the Event page.');
      }
      if (restrictToUser && data.role !== 'user') {
        throw new Error('Admin login is not allowed here. Please log in from the home page.');
      }
      setForm(initialForm);
      onLoginSuccess?.(data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setForm(initialForm);
    setError('');
    onClose?.();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      eyebrow={restrictToAdmin ? 'Admin Access' : 'Welcome Back'}
      title="Login to"
      highlight="Quality Thought Future Skills Foundation"
      maxWidth={440}
    >
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__field">
          <label>Email <span>*</span></label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setField('email')(e.target.value)}
            placeholder="you@email.com"
            required
          />
        </div>

        <div className="auth__field">
          <label>Password <span>*</span></label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setField('password')(e.target.value)}
            placeholder="Your password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary auth__submit" disabled={submitting}>
          {submitting ? 'Logging in…' : <>Login <Icon name="arrow" size={16} /></>}
        </button>

        {error && <p className="auth__error">{error}</p>}

        <p className="auth__hint">
          {restrictToAdmin
            ? 'Admin access only.'
            : 'Attendees: password is the mobile number used at registration.'}
        </p>
      </form>
    </Modal>
  );
}
