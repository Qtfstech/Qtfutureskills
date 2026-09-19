import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone, non-React static landing pages living under public/.
// Vite's own dev middleware intercepts every extensionless request for its
// SPA/HTML transform, so plain "public/<slug>/index.html" files never get
// served on routes like "/ramanas-roadmap". This plugin serves the mapped
// static file verbatim (no React/JSX transform) before Vite's HTML
// middleware runs. Three of the routes (cybersecurity/robotics/spacetech)
// intentionally point at the *same* single file, which reads the URL at
// runtime to show only the matching workshop's content.
const STANDALONE_LANDING_ROUTES = {
  'ramanas-roadmap': 'ramanas-roadmap/index.html',
  'data-analyst-tech-mahindra': 'data-analyst-tech-mahindra/index.html',
  cybersecurity: 'workshops/index.html',
  robotics: 'workshops/index.html',
  spacetech: 'workshops/index.html',
}

function standaloneLandingPages() {
  return {
    name: 'standalone-landing-pages',
    configureServer: {
      order: 'pre',
      handler(server) {
        server.middlewares.use((req, res, next) => {
          const url = (req.url || '').split('?')[0]
          const slug = url.replace(/^\/+|\/+$/g, '')
          const relPath = STANDALONE_LANDING_ROUTES[slug]
          if (!relPath) return next()

          const filePath = path.join(server.config.publicDir, relPath)
          fs.readFile(filePath, (err, data) => {
            if (err) return next()
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(data)
          })
        })
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), standaloneLandingPages()],
  resolve: {
    alias: {
      // lottie-react's "browser" field points to a UMD build whose default
      // export breaks under Vite's ESM interop; force the ES build instead.
      'lottie-react': 'lottie-react/build/index.es.js',
    },
  },
})
