# Grupo Gestor Quetzaltenango

[Leer en Español](./README.es.md)

A modern content management platform for the Grupo Gestor Quetzaltenango association, built with Next.js 15 and Payload CMS.

## About

Grupo Gestor Quetzaltenango is a local, permanent, autonomous, non-profit association created under a business-oriented approach. It is made up of representative members of the community who work voluntarily to promote the economic development of the region.

This platform enables them to manage and showcase their news, events, opinion columns, and organizational information through an easy-to-use Spanish-language content management system.

## Features

- 📰 **News Management** - Articles with rich text, categories, and featured images
- 🎉 **Events System** - Event listings with registration and capacity tracking
- 💭 **Opinion Columns** - Institution-specific articles with custom branding
- 🏠 **Landing Page** - Customizable homepage managed via CMS
- 🔐 **Admin Panel** - Spanish-language interface with role-based access control

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3.x
- **Database**: PostgreSQL with Drizzle ORM
- **Rich Text**: Lexical Editor
- **Language**: TypeScript
- **Styling**: Tailwind CSS (coming in Phase 1)
- **Deployment**: Docker + Docker Compose

## Getting Started (Development)

### Option A: Docker (Recommended)

Everything runs inside containers — no local PostgreSQL or Node setup needed.

```bash
git clone <repo-url>
cd grupo-gestor-xela

# First time: build the image and start
docker compose up --build

# Subsequent starts
docker compose up
```

The app handles migrations automatically on startup.

- **Frontend**: http://localhost:3000  
- **Admin Panel**: http://localhost:3000/admin

Useful Docker commands:
```bash
docker compose logs -f app   # Follow app logs
docker compose down          # Stop everything
docker compose build app     # Rebuild after dependency changes
```

---

### Option B: Local Node + DB in Docker

Faster hot reload. Run the app with your local Node while PostgreSQL runs in Docker.

```bash
# 1. Start only the database
docker compose -f docker-compose.dev.yml up -d

# 2. Copy env file and install
cp test.env .env
pnpm install

# 3. Start the dev server
pnpm dev
```

> **Tip:** If the dev server crashes or the `.next` cache is stale, use `pnpm devsafe` — it clears the cache before starting.

---

### Environment Variables

Docker (`docker-compose.yml`) has defaults baked in for local dev, so no `.env` is needed for Option A.

For Option B, key variables in `.env`:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Secret key for Payload (32+ chars) |
| `NEXT_PUBLIC_SERVER_URL` | Site URL (default: `http://localhost:3000`) |

---

## Key Commands

```bash
pnpm dev                  # Start development server
pnpm devsafe              # Clear .next cache and start dev server
pnpm build                # Build for production
pnpm generate:types       # Regenerate TypeScript types after schema changes
pnpm generate:importmap   # Regenerate import map after adding components
pnpm payload migrate      # Run database migrations manually
pnpm test                 # Run all tests (integration + e2e)
```

## Documentation

- **Full Implementation Plan**: `docs/primary_project_prompt.md`
- **Payload Rules**: `AGENTS.md`
- **Design Mockups**: `docs/mockups/`

## License

MIT

---

**Built with ❤️ for Grupo Gestor Quetzaltenango**
