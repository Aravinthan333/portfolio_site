# Case Study: WhatsApp Operations Platform for Valathi Chit Funds

*A freelance full-stack engineering engagement - real-time messaging, bulk campaigns, SLA ticketing, and integrated website administration for an Indian chit fund.*

---

## Overview

**Client:** Valathi Chit Funds (Trichy Shree Valathi Chit Funds Private Limited)  
**Console:** office.valathichits.com *(internal)*  
**Public site:** [valathichits.com](https://valathichits.com)  
**Role:** Freelance Full-Stack Software Engineer  
**Duration:** *[Add your dates]*

In India, customer communication for financial businesses happens on WhatsApp. But WhatsApp Business API rules create real operational constraints: agents get a 24-hour free-reply window after a customer messages, then must use pre-approved (and paid) templates. Bulk outreach to thousands of chit fund members requires careful scheduling, template compliance, and delivery tracking.

Valathi Chit Funds needed more than a chat widget. They needed an internal operations platform where agents could handle conversations, run campaigns, manage customer records, and administer their public website - all in one place.

I built it from the ground up.

---

## The Problem

1. **Fragmented communication** - Agents used personal phones and ad-hoc WhatsApp chats with no central visibility, no delivery tracking, and no team handoff.
2. **Campaign complexity** - Reaching thousands of members with approved templates required manual effort, with no scheduling, retry logic, or delivery reporting.
3. **Session window pressure** - WhatsApp's 24-hour reply window means delayed responses cost money (template fees). Agents needed proactive alerts before windows expired.
4. **Customer data silos** - Member records lived in spreadsheets, disconnected from conversation history.
5. **Website administration** - Content updates for the public site (chit schemes, blogs, applications) required a separate workflow.

---

## My Approach

### Architecture

A two-package monorepo - `frontend/` (Next.js) and `backend/` (Express) - deployed as separate artifacts to a single AWS EC2 host behind Nginx.

```
Browser (Next.js) ──REST/JWT──► Express API
                 ──WebSocket──► Socket.IO
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
              PostgreSQL           Redis            AWS S3
              (Prisma 7)      (BullMQ + pub/sub)   (media)
                    ▲                 │
                    │         messageWorker / campaignWorker
                    │                 │
                    └──── MSG91 WhatsApp/SMS APIs ◄── webhooks
```

**Key patterns:**

- **Async outbound messaging** - API creates a `PENDING` message, enqueues a BullMQ job, worker calls MSG91, webhook updates delivery status, Redis pub/sub fans out to Socket.IO rooms
- **Webhook-first inbound** - Raw body parser registered before `express.json()` to handle heterogeneous MSG91/Meta Cloud payload shapes
- **Room-based real-time** - Client phone number = Socket.IO room; Redis pattern subscribe bridges workers and webhooks to connected agents
- **BFF for website admin** - Next.js API routes proxy to the separate business-site API for chits, blogs, applications, and auctions

### Real-Time Messaging Console

The chat interface (~3,500 lines) delivers WhatsApp-parity UX:

- Text, media (image/video/document/audio), contacts, and templates
- Reply, forward, edit (with edit history), delete (for me / for everyone)
- Delivery and read receipts with single/double tick indicators
- Message search, per-client media gallery, conversation clear
- Real-time updates via Socket.IO with polling fallback
- Template composer with live preview

### Campaign Engine

A 3-stage wizard for bulk outreach:

1. Select an approved WhatsApp template with visual preview
2. Choose recipients from the database or upload a spreadsheet (with client upsert)
3. Schedule date and time

Background execution via BullMQ:

- Delayed campaign jobs fire at the scheduled time
- Per-recipient template sends routed through the message queue
- **3 automatic retry waves** with structured delivery summary JSON
- Admin cancel/delete and manual retry of failed recipients
- Dashboard countdown timer (HH:MM:SS) for upcoming campaigns

### SLA-Aware Ticketing

Domain knowledge encoded directly into the product:

- Tickets auto-open on inbound customer messages
- Tickets auto-close when an agent replies
- **20-hour yellow alert** and **23-hour red alert** - escalating urgency as the free-reply window closes
- Dashboard alert dropdown with priority sorting and deep-link to the relevant chat

This isn't generic ticketing. It's built around WhatsApp Business API session rules.

### Webhook Orchestration

MSG91's webhook payloads are notoriously inconsistent - different shapes for inbound messages, delivery receipts, status updates, and edits, with variations between their API versions and Meta Cloud API passthrough.

I built 17 specialized modules under `msg91Webhook/` to:

- Unwrap nested payload structures
- Classify message direction (inbound vs. outbound)
- Normalize Indian phone numbers (+91 handling)
- Merge Meta Cloud API shapes with MSG91-native formats
- Map delivery statuses to internal lifecycle states
- Extract reply context and edit history

This defensive layer is what keeps the system reliable in production.

### Authentication & Access Control

- Password login with **email OTP 2FA** (10-minute expiry)
- Roles: `admin`, `employee`, `developer` (developer bypasses OTP for dev workflows)
- JWT access tokens with HttpOnly refresh cookies (`SameSite=strict`)
- Silent token refresh via Zustand-persisted state
- Role-gated navigation (website admin visible to admin/developer only)

### Website Admin Module

Rather than building a separate CMS, I integrated website administration into the same console via a BFF proxy to the business-site API:

- **Chits** - scheme CRUD with financial calculations
- **Blogs** - rich bilingual content with cover image upload
- **Applications** - membership review with A4 PDF generation (Tamil fonts via headless Chromium)
- **Auctions** - auction form and announcement management

### Production Deployment

Not a platform-as-a-service deploy - a full EC2 operations setup:

- GitHub Actions builds artifacts, SCPs to EC2, runs Docker (backend) and PM2 (frontend)
- Custom composite action opens/closes Security Group SSH rules per deploy
- Nginx as a templated Docker service with two-phase TLS (ACME challenge → production certificates)
- Host networking for ports 80/443, reverse proxy for API, WebSocket, and Next.js
- Documented production roadmap (OIDC, RDS, ALB, SSM secrets, WAF)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Zustand |
| Backend | Node.js, Express 5, TypeScript, Zod, Winston |
| Database | PostgreSQL 16, Prisma ORM 7 (multi-schema) |
| Cache/Queues | Redis, BullMQ, ioredis |
| Real-time | Socket.IO + Redis adapter + pub/sub |
| Storage | AWS S3 |
| Messaging | MSG91 WhatsApp & SMS APIs |
| Auth | JWT, bcrypt, Nodemailer (OTP) |
| PDF | Puppeteer-core, pdf-lib (Tamil fonts) |
| DevOps | AWS EC2, Docker, PM2, Nginx, GitHub Actions, Let's Encrypt |
| Testing | Vitest, Supertest, ESLint, Prettier |

---

## Scale & Complexity

| Metric | Value |
|--------|-------|
| Backend TypeScript files | ~129 |
| Frontend TypeScript/TSX files | ~199 |
| Main chat page | ~3,500 lines |
| Webhook parser modules | 17 |
| Database migrations | 16 |
| Campaign backend modules | 17 |
| CI/CD workflows | 3 + reusable deploy action |

---

## Key Outcomes

- **Production messaging platform** handling real customer WhatsApp conversations with delivery tracking and team coordination
- **Campaign engine** enabling scheduled bulk outreach to thousands of members with automatic retry and delivery analytics
- **SLA system** preventing revenue loss from expired WhatsApp session windows
- **Unified operations console** - messaging, campaigns, customers, and website admin in one application
- **Full production DevOps** - EC2, Docker, PM2, Nginx/TLS, automated CI/CD

---

## What I Learned

The hardest part wasn't the chat UI or the database schema - it was making a reliable system on top of a third-party API that doesn't always behave consistently. Webhook normalization, async job processing with retry semantics, and real-time fanout through Redis pub/sub are the kind of problems you only encounter when you ship production messaging infrastructure, not when you build CRUD apps.

Building the website admin module into the same platform also taught me the value of API-first design - the business-site REST API I built separately became the integration point that let this console manage public content without duplicating business logic.

---

## Related Work

This platform integrates with the [Valathi Chit Funds public website](../business-site/portfolio-blog.md) through a shared REST API. The business-site handles public-facing content and applications; this console handles internal operations and admin. Together they form a complete digital platform for the client's business.
