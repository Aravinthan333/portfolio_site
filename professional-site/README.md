# Aravinthan Balaji - Professional Portfolio

Business-standard portfolio site for **aravinthanbalaji.com**.

## Design

Inspired by professional developer portfolios (Brittany Chiang, Lee Robinson) and premium SaaS sites (Linear, Stripe) - clean typography, generous whitespace, serif headings, and trust-focused layout.

## Quick Start

```bash
cd professional-site
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home - hero, metrics, work, services, experience, skills, CTA |
| `/about` | Professional bio and career history |
| `/work` | Project portfolio |
| `/work/[slug]` | Individual project detail |
| `/contact` | Contact form and details |

## Deploy

Set `NEXT_PUBLIC_SITE_URL=https://aravinthanbalaji.com` in production, then:

```bash
npm run build
npm start
```

## Customize

- **Profile:** `src/lib/site.ts`
- **Projects:** `src/data/projects.ts`
- **Experience & skills:** `src/data/profile.ts`
