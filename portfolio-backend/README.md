# portfolio-backend

Spring Boot backend for the portfolio site — serves projects, blog posts, achievements,
and education content to the frontend, and exposes a JWT-protected admin API for managing it.

## Stack
Java 17 · Spring Boot 3 · Spring Security (JWT) · Spring Data JPA · PostgreSQL (Neon)

## Local setup
1. Copy `.env.example` to `.env` and fill in real values (or export them as env vars).
2. Point `DB_URL`/`DB_USERNAME`/`DB_PASSWORD` at a Postgres instance — Neon works, or run
   Postgres locally in Docker.
3. `mvn spring-boot:run`
4. On first boot, `DataSeeder` creates the admin user (`ADMIN_USERNAME`/`ADMIN_PASSWORD`)
   and seeds education/projects/achievements from the resume content. Log in via
   `POST /api/auth/login` and change the password from the admin UI once that's built.

## API overview

Public (no auth):
- `GET /api/projects`, `GET /api/projects/{slug}`
- `GET /api/posts`, `GET /api/posts/{slug}` (published only)
- `GET /api/achievements`
- `GET /api/education`
- `POST /api/contact`
- `POST /api/auth/login`

Admin (Bearer token, ROLE_ADMIN):
- `GET/POST/PUT/DELETE /api/admin/projects[/id]`
- `GET/POST/PUT/DELETE /api/admin/posts[/id]`
- `POST/PUT/DELETE /api/admin/achievements[/id]`
- `POST/PUT/DELETE /api/admin/education[/id]`

## Deploying on Render
1. Push this repo to GitHub.
2. New Web Service on Render → connect the repo → Docker runtime (uses the included Dockerfile).
3. Set all env vars from `.env.example` in Render's dashboard.
4. `CORS_ALLOWED_ORIGINS` should be your Vercel frontend URL once that's deployed.

## DB: Neon
1. Create a free Neon project → copy the connection string.
2. Convert it into `DB_URL` (`jdbc:postgresql://...`), `DB_USERNAME`, `DB_PASSWORD`.
3. `spring.jpa.hibernate.ddl-auto=update` will create tables automatically on first run —
   fine for this project size; switch to Flyway/Liquibase later if it grows.
