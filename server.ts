import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

import eventRegistrations from './server/routes/eventRegistrations.js';
import auth from './server/routes/auth.js';
import contactMessages from './server/routes/contactMessages.js';
import events from './server/routes/events.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STANDALONE_LANDING_ROUTES: Record<string, string> = {
  'ramanas-roadmap': 'ramanas-roadmap/index.html',
  'data-analyst-tech-mahindra': 'data-analyst-tech-mahindra/index.html',
  cybersecurity: 'workshops/index.html',
  robotics: 'workshops/index.html',
  spacetech: 'workshops/index.html',
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // CORS and body parser
  app.use(cors());
  app.use(express.json());

  // Static uploads and public assets
  const uploadsDir = path.resolve(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsDir));
  app.use(express.static(path.resolve(process.cwd(), 'public')));

  // Health check
  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.get('/api/health', (_req, res) => res.json({ ok: true }));

  // API Routes
  app.use('/api/auth', auth);
  app.use('/api/event-registrations', eventRegistrations);
  app.use('/api/contact-messages', contactMessages);
  app.use('/api/events', events);

  // Standalone landing pages (serves plain static HTML verbatim)
  for (const [slug, relPath] of Object.entries(STANDALONE_LANDING_ROUTES)) {
    const handler = (_req: express.Request, res: express.Response, next: express.NextFunction) => {
      const publicPath = path.resolve(process.cwd(), 'public', relPath);
      const distPath = path.resolve(process.cwd(), 'dist', relPath);
      const targetPath = fs.existsSync(publicPath) ? publicPath : distPath;
      if (fs.existsSync(targetPath)) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.sendFile(targetPath);
      }
      next();
    };
    app.get(`/${slug}`, handler);
    app.get(`/${slug}/`, handler);
  }

  // Error handling middleware
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('[Server Error]', err);
    res.status(500).json({ error: err.message || 'Something went wrong' });
  });

  // Vite middleware in dev, static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Quality Thought Future Skills server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
