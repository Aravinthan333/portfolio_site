# LinkedIn Post - Valathi Chits Messaging Platform

---

Built a **WhatsApp operations platform** for an Indian chit fund - and it might be the most complex freelance project I've shipped.

The business problem was familiar across India: customer communication happens on WhatsApp, but Meta's rules make it hard to manage at scale. Outside a 24-hour reply window, you need approved templates (and you pay for each one). Bulk outreach to thousands of members? Even trickier.

So I built an internal console where agents can manage everything from one place.

**What the platform does:**

→ **Real-time WhatsApp chat** - reply, forward, edit, delete, delivery receipts. WhatsApp-parity UX for agents handling customer conversations.

→ **Bulk campaign engine** - schedule template messages to thousands of recipients, with 3-wave automatic retry and delivery analytics.

→ **SLA-aware ticketing** - auto-opens tickets on inbound messages, escalates at 20h and 23h (critical for WhatsApp's 24-hour session window), auto-closes on agent reply.

→ **Template management** - full CRUD against MSG91's WhatsApp API, with sample media uploads to S3.

→ **Website admin** - manage the public chit fund site (schemes, blogs, membership applications, auctions) from the same console, including Tamil-language PDF generation.

**The engineering:**

- Next.js 16 + React 19 frontend, Express 5 + TypeScript backend
- PostgreSQL with Prisma (multi-schema), Redis + BullMQ for async message processing
- Socket.IO with Redis adapter for real-time agent updates
- 17 specialized webhook parsers for MSG91's notoriously inconsistent payload formats
- AWS EC2 deployment with Docker, PM2, Nginx/TLS, GitHub Actions CI/CD

The async pipeline is what makes this interesting: API creates a pending message → BullMQ job → worker calls MSG91 → webhook updates status → Redis pub/sub → Socket.IO pushes to the agent's screen. All while handling heterogeneous webhook payloads from two different API shapes.

This is what freelance engineering looks like when you own the full stack - frontend UX, backend API, job workers, webhook normalization, database schema evolution, and production deployment.

#FreelanceDeveloper #FullStack #WhatsApp #RealTime #NodeJS #NextJS #AWS #BullMQ #SocketIO

---

**Tips for posting:**
- Screen recording of the chat UI or campaign scheduler works well
- Mention the WhatsApp 24-hour window - relatable for anyone in Indian B2C
- Pair with the business-site post as a two-part series if you want maximum engagement
