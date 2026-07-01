# Case Study: Building the Digital Platform for Valathi Chit Funds

*A freelance full-stack engineering engagement - public website, headless API, and legal document automation for a regulated Indian chit fund.*

---

## Overview

**Client:** Trichy Shree Valathi Chit Funds Private Limited (and affiliated entities)  
**Live site:** [valathichits.com](https://valathichits.com)  
**Role:** Freelance Full-Stack Software Engineer  
**Duration:** *[Add your dates]*

Valathi Chit Funds is a government-registered chit fund operating since 2005 across Trichy, Madurai, and Chennai. When they approached me, their customer acquisition and membership process still relied heavily on in-person visits, phone calls, and paper forms. They needed a modern digital presence that could build trust with prospective members, explain how chit funds work, and let people apply online - without losing the legal rigor their business requires.

I designed and built the entire platform end to end: public-facing website, backend API, database, file storage, PDF generation, and production deployment on AWS.

---

## The Problem

Chit funds occupy a unique space in Indian personal finance - part savings scheme, part credit instrument, heavily regulated, and deeply local. Valathi's challenges were specific:

1. **Trust and education** - Prospective members needed to understand chit funds before committing, in a language they were comfortable with (English or Tamil).
2. **Operational conversion** - Active chit groups needed to be browsable online, with realistic return estimates that reflected actual business rules (foreman commission, bid phases, ticket fractions).
3. **Legal compliance** - Membership applications involve multi-page A4 legal forms, different for each of three corporate entities under the Valathi brand umbrella.
4. **Content management** - The marketing team needed to publish bilingual blog posts and manage auction announcements without touching code.
5. **Admin integration** - An internal operations team (using a separate chat platform I also built) needed API access to manage chits, blogs, applications, and auctions.

---

## My Approach

### Architecture

I chose a **monolithic Next.js application** with a headless API pattern rather than splitting into separate frontend and backend services. For a freelance engagement with a small ops footprint, this reduced deployment complexity while keeping the API cleanly separable for the admin console.

```
Visitors → Nginx (TLS) → Next.js (PM2) → PostgreSQL (Docker)
                              ↓
                         AWS S3 (blog images)
                              ↓
                    Puppeteer/Chromium (PDF export)

Admin console → BFF proxy → same REST API
```

The public site and API share one codebase and one database. The admin application (a separate project) consumes the same REST endpoints through a backend-for-frontend proxy layer.

### Bilingual by Design

Tamil Nadu's audience is bilingual but not uniformly English-fluent. I built full English and Tamil dictionaries (~1,800 lines combined) covering every UI string, with Tamil fonts (Noto Sans Tamil, Anek Tamil) loaded across the site and in generated PDFs. Auction announcements support auto-generated Tamil date formatting (`ta-IN` locale) with a manual override mode for custom banner text.

### Online Membership Application

The application wizard is a multi-step form (~1,250 lines) covering:

- Entity selection across three corporate brands
- Subscriber details with international dial code support (1,190-entry dataset)
- Nominee and address management with smart field sync
- Canvas-based digital signature capture
- Live preview before submission
- Reference code generation (`VC-YYYYMMDD-####`)
- Choice between online submit and downloading blank PDFs per brand

All inputs are validated with Zod schemas at the API boundary.

### Chit Fund Calculator

Generic loan calculators don't work for chit funds. I implemented domain-specific logic:

- 5% foreman commission modeling
- Statutory bid floor calculations
- Bid-phase scenarios (early, mid, late auction timing)
- Configurable chit value, ticket fraction, and tenure (25/30/40 months)
- Saver vs. borrower vs. compare modes

### Multi-Brand PDF Pipeline

This was the most technically demanding subsystem. Each of three corporate entities has three distinct legal forms (agreement, security deposit, group register) - 9 unique documents total, each as a brand-specific HTML template.

The pipeline:

1. **Template filling** - Server-side DOM manipulation via linkedom injects applicant data into HTML templates
2. **Rendering** - Puppeteer-core drives a pooled headless Chromium instance with Tamil font loading (Noto Sans Tamil, Bamini)
3. **Merging** - pdf-lib combines multi-page bundles for "download all" flows
4. **Caching** - Pre-warmed Chromium with idle timeout; disk caching for repeated requests
5. **Deploy integration** - Build-time static PDF generation plus runtime API (`POST /api/applications/a4-pdf`)

Production runs on a resource-constrained EC2 instance with automated Chromium binary detection (avoiding Ubuntu snap stubs), 120-second max duration, and deploy-time verification scripts.

### Content Management

A lightweight bilingual CMS built into the platform:

- Blog posts with English/Tamil JSON content blocks
- Topic taxonomy with bilingual labels
- S3 presigned URL uploads for cover images
- Featured posts, read-time estimates, and gradient cover styling

No WordPress, no third-party CMS - just PostgreSQL and a clean API.

### Resilience

The site degrades gracefully. If PostgreSQL is unavailable, active chit listings fall back to static seed data so the marketing site remains functional. Health check endpoints support monitoring. The deploy pipeline includes recovery scripts for common EC2 failure modes.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| Backend | Next.js API Routes, Zod validation, service layer |
| Database | PostgreSQL 16, Prisma ORM 6 |
| Storage | AWS S3 (ap-south-1) |
| PDF | Puppeteer-core, pdf-lib, linkedom |
| Hosting | AWS EC2, Nginx, PM2, Docker |
| CI/CD | GitHub Actions (standalone Next.js builds) |
| i18n | Custom EN/TA dictionaries, Noto Sans Tamil fonts |

---

## Key Outcomes

- **Live production platform** serving valathichits.com with bilingual content, online applications, and automated legal PDF generation
- **Headless API** enabling a separate admin console to manage all business data without code changes
- **Mobile-first responsive design** tailored for Tamil Nadu's predominantly mobile user base
- **Production DevOps** - not a Vercel deploy, but a full EC2 stack with Docker Postgres, Nginx SSL, PM2, and automated CI/CD
- **Domain expertise encoded in software** - chit fund math, multi-entity legal forms, Tamil localization

---

## What I Learned

Building for a regulated financial business taught me that the hardest problems are rarely technical in isolation. The PDF pipeline exists because legal forms can't be simplified. The calculator exists because generic financial widgets mislead customers. The bilingual layer exists because accessibility in Tamil Nadu means Tamil, not just English with a toggle.

As a freelance engineer, the value isn't just writing code - it's translating a client's domain into software that actually fits how their business works.

---

## Related Work

This platform is one half of a two-application system. The companion project - an internal WhatsApp messaging and operations console - includes an integrated admin module that manages this site's content through the same REST API. See the [Chit Messaging Platform case study](../freelance_chit_messaging/portfolio-blog.md) for details.
