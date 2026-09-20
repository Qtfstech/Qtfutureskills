import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import eventRegistrations from './routes/eventRegistrations.js';
import auth from './routes/auth.js';
import contactMessages from './routes/contactMessages.js';
import events from './routes/events.js';
import { prisma } from './db.js';
import { slugify } from './utils/slug.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const corsOrigins = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
const isLocalhost = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

app.use(cors({
  origin: ["http://localhost:5173", "https://qtfutureskills.org", "http://localhost:5173/"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
const publicUploads = path.resolve(__dirname, '../public/uploads');
const legacyUploads = path.resolve(__dirname, '../uploads');
if (!fs.existsSync(publicUploads)) {
  fs.mkdirSync(publicUploads, { recursive: true });
}
app.use('/uploads', express.static(publicUploads));
if (fs.existsSync(legacyUploads)) {
  app.use('/uploads', express.static(legacyUploads));
}

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', auth);
app.use('/api/event-registrations', eventRegistrations);
app.use('/api/contact-messages', contactMessages);
app.use('/api/events', events);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

const port = process.env.PORT || 4177;

const DEFAULT_EVENTS = [
  { title: 'Learnathon 5.0', description: 'Our flagship learning marathon bringing students together for a day of intensive skill-building, mentorship, and friendly competition.' },
  { title: 'Acharya Devo Bhava', description: 'A heartfelt tribute event honoring teachers and mentors, celebrating the guidance that shapes every student\'s future.' },
];

async function seedDefaultEvents() {
  const count = await prisma.event.count();
  if (count > 0) return;
  for (const [index, item] of DEFAULT_EVENTS.entries()) {
    // eslint-disable-next-line no-await-in-loop
    await prisma.event.create({
      data: { ...item, slug: slugify(item.title), sortOrder: index },
    });
  }
  console.log('[Seed] Default events created: Learnathon 5.0, Acharya Devo Bhava');
}

seedDefaultEvents()
  .catch((err) => console.error('[Seed] Failed to seed default events:', err.message))
  .finally(() => {
    app.listen(port, () => console.log(`Backend listening on http://localhost:${port}`));
  });
