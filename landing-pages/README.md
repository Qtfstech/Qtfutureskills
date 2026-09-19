# QT Future Skills — Standalone Landing Pages

Frontend-only, standalone landing/ad pages. Not part of the React app in `frontend/` —
no shared routing, navbar, forms, or payment gateway. Each page is a single, self-contained
static HTML file (inline CSS/JS) styled with a light cream background and orange accents,
designed to fit on one screen with no scrolling on typical desktop sizes.

## Pages / URLs

| Page | File | Intended URL |
|---|---|---|
| Ramana's Roadmap | `ramanas-roadmap/index.html` | `qtfutureskills.org/ramanas-roadmap` |
| Data Analyst — Tech Mahindra opening | `data-analyst-tech-mahindra/index.html` | `qtfutureskills.org/data-analyst-tech-mahindra` |
| Cyber Security Workshop | `workshops/index.html` | `qtfutureskills.org/cybersecurity` |
| Robotics Workshop | `workshops/index.html` (same file) | `qtfutureskills.org/robotics` |
| Space Tech Workshop | `workshops/index.html` (same file) | `qtfutureskills.org/spacetech` |

The 3 workshop URLs are served from a **single file** (`workshops/index.html`); a small
inline script reads the last URL path segment (`cybersecurity` / `robotics` / `spacetech`)
and shows only the matching workshop's content, hiding the other two.

No page has a payment flow, QR code, or registration form — they're pure informational/ad
pages by design.

## Local dev (via the React app's Vite server)

These files are copied into `frontend/public/` and `frontend/vite.config.js` has a small
dev-server middleware (`standaloneLandingPages`) that serves them verbatim on the routes
above — bypassing Vite's normal HTML/SPA handling, which would otherwise intercept these
extensionless URLs and always return the React app shell. If you edit a page, update it in
both `frontend/public/<folder>/index.html` and here in `landing-pages/` to keep them in sync.

## Deploying at `qtfutureskills.org/<slug>` without a visible redirect / back button

1. **Reverse proxy / rewrite, not a client-side redirect.** Configure your web server or
   CDN so a request to e.g. `qtfutureskills.org/cybersecurity` is served directly from the
   corresponding static file — a rewrite/proxy, not a 302 — so the URL bar always shows
   `qtfutureskills.org/...`.
2. **No back button into the referring app.** Whatever app sends users here must navigate
   with `window.location.replace(url)` (not `location.href` or an `<a>` click), which
   replaces the current history entry so "Back" doesn't return to it. Each page also pins
   its own URL into the history stack on load as a defense-in-depth measure.

## Local preview (standalone, without the React app)

```powershell
cd landing-pages
python -m http.server 4173
```

Then visit e.g. `http://localhost:4173/ramanas-roadmap/`,
`http://localhost:4173/data-analyst-tech-mahindra/`, or
`http://localhost:4173/workshops/?slug=cybersecurity` (standalone preview only — the clean
`/cybersecurity` URL requires the rewrite described above, or the Vite dev-server plugin).
