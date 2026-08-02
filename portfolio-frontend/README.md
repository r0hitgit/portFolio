# portfolio-frontend

React + Vite frontend for the portfolio site. Terminal/IDE-themed design:
left sidebar acts as a file navigator, each section reads as a file being
viewed (education.log, projects/, skills.json, achievements.md, interests.yml,
contact.sh), styled in a black + phosphor-green palette with a monospace type
system (JetBrains Mono display / IBM Plex Mono body).

## Stack
React 19 · Vite · Tailwind CSS v4 · React Router · react-markdown

## Local setup
```
npm install
cp .env.example .env   # point VITE_API_URL at your backend, or leave as localhost:8080
npm run dev
```

If the backend isn't running or isn't reachable, every section falls back to
static content mirrored from the resume (`src/data/fallback.js`), so the site
still renders correctly on its own.

## Structure
- `src/components/` — Sidebar (nav), TerminalHero (boot-sequence hero),
  FileSection (shared "file view" wrapper), and one component per content
  section.
- `src/pages/` — Home (single-page sections), Blog, BlogPost.
- `src/api/client.js` — fetch wrapper with graceful fallback to static data.
- `src/data/fallback.js` — static content used when the API is unreachable.

## Deploying on Vercel
1. Push to GitHub, import the repo in Vercel — it auto-detects Vite.
2. Set `VITE_API_URL` in the Vercel project's environment variables to your
   deployed Render backend URL.
3. Deploy. No further config needed (`vercel.json` isn't required for a
   standard Vite SPA, but if you hit 404s on `/blog/:slug` on refresh, add a
   rewrite rule sending all paths to `/index.html`).

## Admin UI
- Visit `/admin/login`, sign in with the `ADMIN_USERNAME`/`ADMIN_PASSWORD` you
  set on the backend, and manage projects, posts, achievements, and education
  from `/admin`. The JWT is stored in `localStorage` and attached to every
  admin API call; a 401/403 response logs you out automatically.
