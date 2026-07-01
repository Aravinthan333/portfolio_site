# LinkedIn Post - Valathi Chits Business Site

---

Just shipped the full digital platform for **Valathi Chit Funds** - a government-registered chit fund operating across Trichy, Madurai, and Chennai since 2005.

When a traditional financial business asks you to bring their operations online, the challenge isn't just building a website. It's encoding real business rules, supporting bilingual audiences, and making sure legal paperwork still works in a digital world.

Here's what I built as a freelance full-stack engineer:

**valathichits.com** - a bilingual (English + Tamil) public platform where prospective members can browse active chit groups, estimate returns with a domain-specific calculator, read educational content, and apply for membership online - complete with digital signature capture.

**Under the hood:**
- Next.js 16 + React 19 + TypeScript full-stack app with PostgreSQL and Prisma
- Custom REST API powering chits, blogs, membership applications, and auction announcements
- Multi-brand A4 PDF pipeline - 3 corporate entities × 3 legal form types, rendered server-side with headless Chromium, Tamil font embedding, and pdf-lib merging
- AWS production stack: EC2, Docker Postgres, S3 presigned uploads, Nginx, PM2, GitHub Actions CI/CD

The part I'm most proud of? The legal application PDF generator. Each corporate entity has distinct agreement, security, and group-register forms. The system fills brand-specific HTML templates, renders them through a pooled Chromium instance with proper Tamil typography, and merges them into downloadable bundles - all running on a resource-constrained EC2 instance with warm caching and deploy-time pre-generation.

This wasn't a landing page project. It was product engineering for a regulated financial domain - commission math, bid-phase modeling, statutory bid floors, and graceful fallbacks when the database is unavailable.

Grateful to work on software that helps a real business serve its members better.

#FreelanceDeveloper #FullStack #NextJS #TypeScript #AWS #FinTech #TamilLocalization #WebDevelopment

---

**Tips for posting:**
- Add 2–4 screenshots (homepage, chit calculator, apply form, PDF preview)
- Tag relevant technologies if you want more reach
- Consider a carousel: Problem → Solution → Tech stack → Outcome
