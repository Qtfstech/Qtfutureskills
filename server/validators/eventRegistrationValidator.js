const MOBILE_RE = /^\d{10}$/;
const EMAIL_RE = /^\S+@\S+\.\S+$/;

export function validateEventRegistration(body) {
  const errors = {};
  if (!body.name || !body.name.trim()) errors.name = 'Required';
  if (!MOBILE_RE.test(body.mobile || '')) errors.mobile = 'Enter a valid 10-digit number';
  if (!EMAIL_RE.test(body.email || '')) errors.email = 'Enter a valid email';
  if (!body.address || !body.address.trim()) errors.address = 'Required';
  return errors;
}
