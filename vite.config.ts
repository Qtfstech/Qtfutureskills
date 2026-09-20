import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STANDALONE_LANDING_ROUTES: Record<string, string> = {
  'ramanas-roadmap': 'ramanas-roadmap/index.html',
  'data-analyst-tech-mahindra': 'data-analyst-tech-mahindra/index.html',
  cybersecurity: 'workshops/index.html',
  robotics: 'workshops/index.html',
  spacetech: 'workshops/index.html',
};

function standaloneLandingPages() {
  return {
    name: 'standalone-landing-pages',
    configureServer: {
      order: 'pre' as const,
      handler(server: any) {
        server.middlewares.use((req: any, res: any, next: any) => {
          const url = (req.url || '').split('?')[0];
          const slug = url.replace(/^\/+|\/+$/g, '');
          const relPath = STANDALONE_LANDING_ROUTES[slug];
          if (!relPath) return next();
          const filePath = path.join(server.config.publicDir, relPath);
          fs.readFile(filePath, (err, data) => {
            if (err) return next();
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(data);
          });
        });
      },
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), standaloneLandingPages()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        'lottie-react': 'lottie-react/build/index.es.js',
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
