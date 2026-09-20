const EMAIL_RE = /^\S+@\S+\.\S+$/;

export function validateContactMessage(body) {
  const errors = {};
  if (!body.name || !body.name.trim()) errors.name = 'Required';
  if (!EMAIL_RE.test(body.email || '')) errors.email = 'Enter a valid email';
  if (!body.message || !body.message.trim()) errors.message = 'Required';
  return errors;
}
