import { prisma } from '../db.js';
import { withPassId } from '../utils/passId.js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123';

export async function login(req, res, next) {
  try {
    const email = (req.body.email || '').trim().toLowerCase();
    const password = req.body.password || '';

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (email === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      return res.json({ role: 'admin' });
    }

    const registration = await prisma.eventRegistration.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });

    if (!registration || registration.mobile !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ role: 'user', registration: withPassId(registration) });
  } catch (err) {
    next(err);
  }
}
