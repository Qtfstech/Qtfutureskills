const PASS_PREFIX = 'FSS-';

export function toPassId(id) {
  return `${PASS_PREFIX}${String(id).padStart(3, '0')}`;
}

export function fromPassId(passId) {
  const match = /^FSS-(\d+)$/i.exec((passId || '').trim());
  return match ? Number(match[1]) : null;
}

export function withPassId(registration) {
  if (!registration) return registration;
  return { ...registration, passId: toPassId(registration.id) };
}
