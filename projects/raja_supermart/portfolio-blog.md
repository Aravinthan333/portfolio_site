# Case Study: Full-Stack Grocery E-Commerce Platform for Raja Supermart

*A freelance full-stack engineering engagement - customer storefront, admin operations, delivery logistics, and legacy POS integration for an Indian supermarket.*

---

## Overview

**Client:** Raja Supermart (Raja Stores)  
**Live site:** [rajasupermart.com](https://rajasupermart.com)  
**API:** api.rajasupermart.com  
**Role:** Freelance Full-Stack Software Engineer  
**Duration:** *[Add your dates]*

Raja Supermart is a grocery supermarket serving customers in India. Like many traditional retailers, they ran their physical store on an Optech POS/inventory system while customers increasingly expected online ordering and home delivery. The challenge wasn't just building an e-commerce site - it was building one that stayed in sync with a legacy inventory database, supported phone-based ordering (still common in Indian grocery retail), and gave store staff the tools to manage products, orders, deliveries, and returns from a single console.

I built the full platform from the ground up - frontend, backend, and the integration layer between them.

---

## The Problem

1. **No online presence** - Customers couldn't browse products, place orders, or track deliveries digitally.
2. **Legacy inventory lock-in** - Product stock and pricing lived in an Optech SQL Server database tied to the physical POS. Replacing it wasn't an option.
3. **Phone orders** - A significant portion of grocery orders in India still come via phone calls. The system needed to support admin-placed phone orders alongside online checkout.
4. **Delivery logistics** - Orders needed to be assigned to delivery partners who pick up and deliver grouped by customer address, including return pickups.
5. **Operational visibility** - Store owners needed analytics on orders, revenue, category performance, and customer growth - not just a product catalog.

---

## My Approach

### Architecture

A two-repository system - `raja-supermart-client-dev` (React frontend) and `RajaStoresServer` (Express API) - deployed to production with the frontend at rajasupermart.com and the API at api.rajasupermart.com.

```
Browser (React + Vite) ──REST/JWT cookies──► Express API
                                                    │
                          ┌─────────────────────────┼─────────────────────────┐
                          ▼                         ▼                         ▼
                    MongoDB                    SQL Server (Optech)          AWS S3
              (users, orders, carts,         (inventory, stock,           (product
               products, analytics)           pricing source of truth)      images)
                          ▲                         │
                          │              cron: stock sync every minute
                          └─────────────────────────┘
                                                    │
                                              Redis (caching)
                                                    │
                                              MSG91 (OTP/SMS)
```

**Key patterns:**

- **Dual-database sync** - MongoDB is the application database; SQL Server is the inventory source of truth. A cron job runs every minute to pull stock quantities from Optech and update MongoDB product records.
- **Hierarchical product catalog** - Three-level structure: Categories → Sub-Categories → Brands, with products supporting multiple variants (quantity, unit, price, MRP, stock, images).
- **Role-based access** - Three user roles with separate route trees: customers (`/user/*`), admins (`/admin/*`), and delivery partners (API-only, mobile app backend).
- **Cookie + token auth** - JWT stored in HTTP-only cookies with cross-subdomain support (`.rajasupermart.com`), plus Bearer token fallback for development.

### Customer Storefront

The public-facing experience includes:

- **Home page** with personalized picks, suggestions of the day, store services, and phone-order banner with click-to-call
- **Product browsing** by category with filter drawer (brand, price range, availability)
- **Shop page** with search, pagination, quick-add to cart, and wishlist toggle
- **Product details** with variant selection, MRP/discount display, and image gallery
- **Cart and checkout** with address management (state/district/pincode), order summary, and order placement
- **Order history** with status tracking and return request initiation
- **Account management** - registration with MSG91 OTP verification, password reset flow, profile editing

### Admin Operations Console

A comprehensive back-office built into the same React application:

- **Dashboard** - KPI tiles (orders, deliveries, customers, categories, discounts) with day/week/month/year breakdowns; order and revenue analytics charts via Recharts; category performance analytics; recent orders table; Excel export
- **Product management** - CRUD with image upload to S3, variant management, visibility toggles, top-product flags, and barcode support
- **Catalog hierarchy** - Category, sub-category, and brand management with image uploads
- **Order management** - Filter by status, update order status, view bill details, delete orders
- **Phone orders** - Create, list, track, and convert phone-based orders with delivery partner assignment
- **Customer management** - Customer list, details, and order history per customer
- **Discounts** - Create promotional banners with image upload, active/inactive toggling
- **Delivery management** - Partner CRUD, order assignment, delivery tracking
- **Returns** - View return requests, update status, coordinate with delivery partners for pickup
- **Invoices** - Invoice generation and management

### Delivery Partner APIs

A mobile-ready API layer for delivery partners:

- Registration with OTP verification, login/logout, password reset
- View grouped orders and returns by customer address
- Pick and deliver orders (normal + return pickups in a single workflow)
- Phone order pickup and delivery tracking
- Delivery count and performance metrics

### Legacy Integration

The Optech SQL Server integration was the most technically demanding aspect:

- **Stock sync cron** - Queries `Inv_Detail` and `Item_Master` tables every minute to update MongoDB product stock quantities
- **One-time migration scripts** - Imported categories and products from SQL Server to MongoDB during initial setup
- **Graceful degradation** - The app continues to function if SQL Server is temporarily unavailable; stock sync logs errors without crashing the server

---

## Technical Highlights

| Area | Implementation |
|------|----------------|
| **Frontend** | React 18, Vite 6, Redux Toolkit, React Router 7, Tailwind CSS, Radix UI, Recharts, Axios |
| **Backend** | Node.js, Express 4, Mongoose 8, ES Modules |
| **Databases** | MongoDB Atlas (production), SQL Server / Optech (inventory) |
| **Caching** | Redis (ioredis) - optional, graceful fallback |
| **Auth** | JWT in HTTP-only cookies, bcrypt password hashing, MSG91 OTP |
| **Storage** | AWS S3 with signed URL generation for product images |
| **Security** | Helmet, express-rate-limit, express-mongo-sanitize, XSS-clean, HPP, CORS with origin whitelist |
| **Background jobs** | node-cron - stock sync, top products ranking, unverified user cleanup |
| **Analytics** | Revenue analysis with IST timezone, period-over-period comparison, category breakdown |
| **Validation** | Joi, express-validator, custom field validators on frontend |

---

## Challenges & Solutions

### 1. Keeping stock accurate across two databases

**Problem:** Customers see stock on the website, but inventory changes happen in the POS system (sales, returns, restocking).

**Solution:** A cron job runs every minute, querying SQL Server for current stock quantities and bulk-updating MongoDB. The sync is logged with duration and update counts for monitoring.

### 2. Product variants and hierarchical catalog

**Problem:** Grocery products come in multiple sizes/quantities (1kg rice, 5kg rice, 10kg rice) under brands within sub-categories.

**Solution:** Designed a variant model where products are grouped by name + category + sub-category + brand, with each variant carrying its own quantity, unit, price, MRP, stock, and images. The API groups and sorts variants automatically.

### 3. Phone orders in a digital-first platform

**Problem:** Many customers prefer calling to place orders, especially for bulk grocery purchases.

**Solution:** Built a dedicated phone-order workflow where admins create orders on behalf of customers, assign delivery partners, and track through the same delivery pipeline as online orders.

### 4. Return logistics

**Problem:** Returns aren't just refunds - delivery partners need to physically pick up returned items.

**Solution:** Return orders are grouped with normal orders by customer address. Delivery partners see both in a single pickup/delivery view and can process them together.

### 5. Cross-origin authentication

**Problem:** Frontend (rajasupermart.com) and API (api.rajasupermart.com) are on different subdomains.

**Solution:** JWT cookies set with `domain: .rajasupermart.com` for cross-subdomain sharing, with Bearer token fallback in localStorage for development environments where cookie sharing is blocked.

---

## Results

- **Production deployment** at rajasupermart.com serving real customers
- **End-to-end e-commerce flow** - browse, cart, checkout, delivery, returns
- **Admin self-service** - store staff manage the entire catalog, orders, and deliveries without developer intervention
- **Legacy coexistence** - Optech POS continues running the physical store while the online platform stays in sync
- **Scalable API** - delivery partner endpoints ready for a dedicated mobile app

---

## What I Learned

Building for a traditional Indian retailer means respecting existing workflows (phone orders, POS systems) while modernizing the customer experience. The most valuable engineering wasn't the React components or the REST APIs - it was the integration layer that let a 10-year-old inventory system and a modern e-commerce platform coexist without either breaking.

---

## Tech Stack Summary

**Frontend:** React 18 · Vite 6 · Redux Toolkit · React Router 7 · Tailwind CSS · Radix UI · Recharts · Axios · XLSX  
**Backend:** Node.js · Express 4 · Mongoose 8 · SQL Server (mssql) · Redis · node-cron  
**Infrastructure:** MongoDB Atlas · AWS S3 · MSG91 · JWT · bcrypt  
**Security:** Helmet · Rate limiting · Mongo sanitize · XSS protection · CORS
