# LinkedIn Post - Raja Supermart E-Commerce Platform

---

Built a **full-stack grocery e-commerce platform** for Raja Supermart - and it taught me what "legacy integration" really means in Indian retail.

The business wasn't starting from zero. They already had an Optech POS/inventory system running their physical store. Customers wanted online ordering, phone orders, and doorstep delivery - but stock, pricing, and product data still lived in SQL Server.

So I built a platform that bridges the old world and the new.

**What the platform does:**

→ **Customer storefront** - browse by category, filter by brand, cart, wishlist, checkout with address management, order history, and return requests.

→ **Admin operations console** - product catalog with variants, hierarchical categories (Category → Sub-Category → Brand), order management, phone-order workflow, customer records, discounts, invoices, and delivery partner assignment.

→ **Analytics dashboard** - order and revenue charts (day/week/month/year), category performance, Excel export, and real-time KPI tiles.

→ **Delivery partner APIs** - grouped pickup/delivery by address, handling both normal orders and return pickups from a single mobile-ready backend.

→ **Phone order support** - because in India, a lot of grocery orders still start with a phone call. Admins can place and track phone orders alongside online ones.

**The engineering:**

- React 18 + Vite frontend with Redux Toolkit, Tailwind CSS, Radix UI, and Recharts
- Node.js + Express backend with MongoDB (Mongoose) and legacy SQL Server (Optech) integration
- Minute-by-minute stock sync cron from SQL Server → MongoDB
- AWS S3 for product images with signed URLs
- MSG91 OTP for registration and password reset
- Redis caching, JWT cookie-based auth with cross-subdomain support
- Return order workflow with admin approval and delivery partner coordination

The interesting part isn't any single feature - it's the **dual-database architecture**. MongoDB powers the modern app (users, carts, orders, analytics), while SQL Server remains the source of truth for inventory. A cron job keeps them in sync every minute so customers never see stale stock.

This is what freelance full-stack work looks like when you're building for a real business: customer UX, admin tooling, delivery logistics, legacy system integration, and production deployment - all in one engagement.

#FreelanceDeveloper #FullStack #ECommerce #React #NodeJS #MongoDB #AWS #GroceryTech #IndianRetail

---

**Tips for posting:**
- Screen recording of the admin dashboard analytics or customer shop page works well
- Mention the legacy POS integration angle - relatable for anyone in Indian retail/SMB tech
- Highlight phone orders if your audience is India-focused - it's a uniquely local requirement
