# qtfutureskills
Quality Thought Future Skills Foundation

Single-package app: a React (Vite) frontend in `src/` served by an Express API in `server/`,
both started from `server.ts`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000 (Express + Vite middleware)
```

## Production

```bash
npm run build    # vite build -> dist/, server.ts -> dist/server.cjs
NODE_ENV=production npm start
```

## Layout

| Path | Purpose |
|---|---|
| `src/` | React app (pages, components, styles) |
| `server/` | API routes/controllers (`/api/events`, `/api/event-registrations`, `/api/contact-messages`, `/api/auth`) |
| `public/` | Static assets; `public/uploads/events/` holds uploaded event photos |
| `landing-pages/` | Standalone HTML landing pages (copies live in `public/`) |

`server/db.js` is an in-memory mock of the data layer, so data resets on restart.
