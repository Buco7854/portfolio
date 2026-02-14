# Portfolio

A multilingual portfolio built with Next.js 16 and PocketBase.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript 5.9
- **Styling:** Tailwind CSS v4 with OKLCH color system, dark/light/system theme
- **Admin UI:** PocketBase with JS migrations
- **Deployment:** Docker Compose, GitHub Actions CI/CD

## Features

- Dynamic multilingual support (English & French by default, extensible via PocketBase)
- Browser Accept-Language detection with automatic redirect
- PocketBase-configurable accent color (hex color picker in admin) and favicon
- Dark / light / system theme with no flash on load
- Custom icon support (Lucide icons, raw SVG, or plain text)
- Responsive layout with sidebar navigation on mobile

## PocketBase Collections

| Collection   | Description                          |
|-------------|---------------------------------------|
| languages   | Available languages (code, name, flag)|
| profile     | Singleton profile (name, bio, email)  |
| skills      | Skills with multilingual names + icon |
| socials     | Social links (name, icon, url)        |
| categories  | Item categories with icon + ordering  |
| items       | Items within categories               |
| projects    | Portfolio projects with tech stack    |
| resources   | Attachable files/links for items or projects |
| settings    | Singleton settings (accent color, favicon)     |

## Getting Started

### Prerequisites

- Docker & Docker Compose

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Buco7854/portfolio.git
   cd portfolio
   ```

2. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` with your values:
   ```env
   PB_ADMIN_EMAIL=admin@example.com
   PB_ADMIN_PASSWORD=your-secure-password
   POCKETBASE_INTERNAL_URL=http://pocketbase:8090
   # NEXT_PUBLIC_POCKETBASE_URL=http://localhost:8090  # only if PB is on a different domain
   # NEXT_PUBLIC_SITE_URL=https://example.com          # recommended for OG tags in production
   ```

4. Start the services:
   ```bash
   docker compose up -d
   ```

5. Access the app at `http://localhost:3000` and the PocketBase admin at `http://localhost:8090/_/`.

### Development

The `docker-compose.override.yml` sets up a dev environment with hot reload:

```bash
docker compose up -d
```

This mounts the source code and runs `next dev --turbopack`.

## Environment Variables

| Variable                       | Required | Description                                                                 |
|-------------------------------|----------|-----------------------------------------------------------------------------|
| `PB_ADMIN_EMAIL`              | Yes      | PocketBase admin email                                                      |
| `PB_ADMIN_PASSWORD`           | Yes      | PocketBase admin password                                                   |
| `POCKETBASE_INTERNAL_URL`     | Yes      | PocketBase URL for server-side API calls (e.g. `http://pocketbase:8090`)    |
| `NEXT_PUBLIC_POCKETBASE_URL`  | No       | Override public PocketBase URL. If unset, file URLs are relative (same domain) |
| `NEXT_PUBLIC_SITE_URL`        | No       | Public site URL for OpenGraph metadata base (e.g. `https://example.com`)    |

## Docker Image

The production Docker image is automatically built and published to `ghcr.io/buco7854/portfolio` via GitHub Actions on pushes to `main` and version tags.

```bash
docker pull ghcr.io/buco7854/portfolio:latest
```

## License

MIT
