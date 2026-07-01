# Building Race Parts India: A Serverless Motorsport E-Commerce Platform

**Author:** [Your Name]  
**Role:** Freelance Software Engineer & Architect  
**Client:** Race Parts India  
**Live Site:** [racepartsindia.com](https://racepartsindia.com)  
**Published:** [Add date]

---

## Introduction

When Race Parts India approached me for a freelance engagement, they needed more than a brochure website. They needed a **credible, high-performance storefront** for motorsport racing parts, simulator rigs, performance accessories, and professional tools - something that could compete visually with established retailers while staying practical for a growing business.

The constraint that shaped every architectural decision: **keep operations lean**. No dedicated backend team, no complex payment integrations at launch, and minimal ongoing hosting costs.

This case study walks through how I designed and delivered a complete solution - frontend application, cloud infrastructure, and automated deployment pipeline - as a single freelance engagement.

---

## The Business Problem

Race Parts India serves a niche but passionate market: professional racers, amateur enthusiasts, simulator builders, and motorsport teams looking for race-grade components. Their catalog spans multiple categories:

- Simulator rigs and racing seats
- Performance parts (air filters, bonnet scoops, tow belts)
- Racing accessories (fire extinguishers, hood pins, hydraulic hand brakes)
- Fasteners and professional tools
- Electrical components and wiring

Customers expect rich product imagery, detailed specifications, and an easy way to inquire about availability, delivery, and pricing - especially for items with variable price ranges.

Traditional e-commerce platforms would require:

- A product database and admin CMS
- User authentication and session management
- Payment gateway integration and compliance
- Ongoing server maintenance

For this stage of the business, that overhead didn't justify the return. The client already operated successfully through direct communication channels - phone and WhatsApp. The goal was to **digitize the catalog and streamline the order handoff**, not rebuild their entire sales operation.

---

## Architectural Decision: Serverless-First Storefront

I proposed a **serverless-first architecture** - a static React single-page application with client-side state management and WhatsApp as the checkout channel.

### Why this worked

| Requirement | Solution |
|---|---|
| Fast time-to-market | Static SPA, no API layer to build |
| Low hosting cost | Single EC2 instance + Nginx |
| Mobile-heavy traffic | Responsive UI with dedicated mobile product views |
| Variable pricing | Client-side price-range parsing in cart totals |
| Order placement | Formatted WhatsApp message with full cart summary |
| Future scalability | Clean separation allows backend addition later |

This wasn't cutting corners - it was **matching architecture to business reality**. The storefront feels complete; the operational model stays simple.

---

## Part 1: The E-Commerce Frontend

### Tech stack

- **React 19** with functional components and hooks
- **Vite 7** for fast development and optimized production builds
- **Tailwind CSS v4** with native Vite integration
- **Framer Motion** for polished transitions and animations
- **React Router DOM 7** for `/` (shop) and `/cart` routes
- **Flowbite React** and **React Icons** for UI consistency
- **React Image Zoom** for high-resolution product inspection
- **React YouTube** for embedded brand content

### Information architecture

The landing page (`Shop.jsx`) orchestrates a full marketing-to-purchase funnel:

1. **Promotional ticker** - rotating offers and announcements
2. **Sticky header** - logo, navigation, cart access, contact shortcuts
3. **Hero banner** - category showcases with CTAs
4. **Product catalog** - filterable grid with category tabs
5. **Brand story** - engineering heritage and trust signals
6. **Contact section** - WhatsApp, phone, email, social links
7. **Footer** - address, links, copyright

### State management

Cart state lives at the application root (`App.jsx`) so it persists across route changes between the shop and cart pages:

```text
App.jsx (state owner)
├── cartItems[]
├── selectedProduct
├── isModalOpen
├── isMobile (< 1024px breakpoint)
├── addToCart / updateQuantity / removeItem / clearCart
└── Routes
    ├── / → Shop
    └── /cart → CartPage
```

This pattern avoids Redux or context boilerplate for a focused use case while keeping handlers reusable across components.

### Product catalog design

Products are defined in a structured schema within the catalog component - each entry includes:

- Category (`simulator`, `accessories`, `performance`, `fasteners & tools`, `electrical tools`)
- Brand, pricing (fixed or range), discount labels
- Multiple high-resolution images
- Marketing features and engineering specifications
- Badge tags (e.g., "Race Spec | Fast Selling")

The category menu provides horizontal filter tabs. Clicking a product opens either a desktop modal or a mobile slide-up sheet depending on viewport width - a deliberate UX split that keeps interactions native-feeling on each form factor.

### WhatsApp checkout flow

The checkout is the architectural centerpiece. When a customer clicks **"Checkout on WhatsApp"** on the cart page, the application:

1. Iterates cart items with brand, quantity, unit price, and subtotal
2. Handles price ranges (e.g., `₹800 - ₹3,000`) in total calculations
3. Constructs a professionally formatted markdown message
4. Opens `wa.me/{phone}?text={encodedMessage}` in a new tab

A sample output:

```text
Hi! I'd like to checkout with the following items from my cart:

*1. SEAT*
   • Brand: KARI SPORTS
   • Quantity: 2
   • Unit price: ₹14,000
   • Subtotal: ₹28,000

*Cart Summary*
   • Total products: 2
   • Total value: ₹28,000

Please provide details about:
• Availability confirmation
• Delivery timeline
• Payment options
• Any additional charges

Thank you!
```

The shop phone number is centralized in a single constant (`shopPhone.js`), so updating contact info propagates everywhere - header, footer, contact page, and checkout.

### Price utilities

Motorsport parts often have variable pricing. The `price.js` utility sanitizes currency strings, extracts numeric values, and computes min/max cart totals when ranges are present - preventing broken totals and giving customers realistic expectations before they message the shop.

### Visual identity

The UI follows Race Parts India's brand: **white backgrounds, dark accents, and energetic orange (#ff7402)**. Typography uses the Orbitron font family for racing-themed headings. Animations are purposeful - scroll-triggered reveals, hover states on product cards, and smooth modal transitions - without sacrificing performance on mid-range mobile devices.

---

## Part 2: Cloud Infrastructure

### AWS with Terraform

Infrastructure is defined as code in Terraform, making the environment reproducible and documented:

| Resource | Purpose |
|---|---|
| `aws_key_pair.deployer` | SSH access for deployment |
| `aws_security_group.web_ssh` | Port 80/443 public; SSH restricted to operator IP |
| `aws_iam_role.ssm_role` | SSM Session Manager for secure shell access |
| `aws_instance.web` | Ubuntu 22.04 LTS EC2 hosting Nginx and static files |
| `aws_iam_user.deployer` (optional) | Least-privilege IAM user scoped to the instance |

Security decisions worth noting:

- SSH is **IP-restricted**, not open to the world
- IMDSv2 is enforced (`http_tokens = "required"`)
- IAM policies scope SSM sessions to the specific EC2 instance
- Outbound traffic is allowed for package updates and certificate renewal

The default region is `ap-south-1` (Mumbai), keeping latency low for the Indian customer base.

### Nginx configuration

Nginx serves the Vite build output with:

- **HTTP → HTTPS redirects** (apex and www normalization)
- **ACME challenge path** for Let's Encrypt certificate issuance
- **SPA fallback routing** (`try_files $uri $uri/ /index.html`) so `/cart` works on direct navigation
- **30-day immutable caching** for static assets (JS, CSS, images, fonts)

The deploy path is templated (`__ROOT__`) and replaced at deploy time by the CI pipeline - keeping the nginx config portable across environments.

### SSL/TLS

Certificates are issued via Certbot (Let's Encrypt) and renewed automatically through a scheduled GitHub Actions workflow that SSHs into the instance, runs `certbot renew`, and reloads Nginx.

---

## Part 3: CI/CD Pipeline

### Design goals

1. **One-click deploy** from GitHub Actions
2. **Reusable composite actions** for SSH setup, rsync, and remote commands
3. **No broken UI during deploys**
4. **Nginx config stays in sync** with the repository

### Deploy workflow

The **Deploy to EC2 (nginx)** workflow:

1. Checks out code and sets up Node.js 20
2. Caches `node_modules` and Vite build cache
3. Runs `npm ci && npm run build` in `client/`
4. Resolves the deploy path from GitHub repository variables
5. Sets up SSH with deploy keys
6. **Rsyncs images first** (PNG, JPG, SVG, WebP, etc.)
7. **Rsyncs remaining assets** (HTML, JS, CSS)
8. Uploads nginx config and enables the site remotely
9. Validates config (`nginx -t`) and reloads Nginx

The images-first pattern prevents a common SPA deploy issue: the browser loads new JavaScript that references image paths before those images exist on the server, causing broken product cards mid-deploy.

### Composite actions

Three reusable actions keep the workflows DRY:

- `ec2-ssh-setup` - configures SSH keys and known_hosts
- `ec2-rsync` - parameterized rsync to the EC2 host
- `ec2-ssh-run` - executes remote shell commands

This structure makes it straightforward to add new workflows (migrations, health checks, rollbacks) without duplicating SSH boilerplate.

### Documentation

I wrote step-by-step guides covering:

- Manual setup checklist (domain, SSH keys, DNS)
- GitHub Actions pipeline configuration
- Terraform variable customization
- Nginx vhost and SSL setup
- End-to-end deployment workflow
- Secrets management with KeePassXC

The goal: the client or a future developer can maintain the system without depending on me.

---

## Results & Impact

**For the business:**

- A live, professional storefront at [racepartsindia.com](https://racepartsindia.com)
- Customers can browse 50+ products across 5 categories with rich detail views
- Orders flow directly into WhatsApp - the channel the business already uses
- Near-zero ongoing infrastructure cost on a burstable EC2 instance

**For the engineering:**

- Clean separation between presentation (React), hosting (Nginx/EC2), and delivery (GitHub Actions)
- Infrastructure as code with Terraform
- Automated, repeatable deployments
- Room to grow: admin panel, product API, analytics, and payment integration can layer on later without rewriting the frontend

---

## What I Learned

**1. Architecture should serve the business stage, not the resume.**  
A "simpler" stack that ships in weeks beats a "proper" microservices platform that ships in months - especially for freelance engagements with real budget constraints.

**2. Checkout UX doesn't require a payment gateway.**  
For B2C businesses with high-touch sales, WhatsApp checkout is a legitimate pattern. The key is formatting the handoff professionally so the operator receives actionable order data.

**3. Deploy reliability is a feature.**  
The images-first rsync pattern, nginx config validation before reload, and composite GitHub Actions aren't glamorous - but they prevent the 2 AM "the site looks broken" call.

**4. Document for handoff from day one.**  
Freelance work ends; the system shouldn't. Comprehensive docs in the repo mean the client owns their infrastructure confidently.

---

## Tech Summary

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite 7, Tailwind CSS v4, Framer Motion, React Router 7 |
| Hosting | AWS EC2, Ubuntu 22.04, Nginx |
| Infrastructure | Terraform, IAM, Security Groups, SSM |
| CI/CD | GitHub Actions, rsync, composite actions |
| SSL | Let's Encrypt, Certbot |
| Checkout | WhatsApp (`wa.me`) integration |

---

## Looking Ahead

The current architecture is intentionally extensible. Natural next phases for the client include:

- **Admin panel** for product CRUD (replacing the in-code catalog)
- **Analytics** - visit tracking, UTM parameters, conversion funnels
- **Payment gateway** integration when order volume justifies it
- **CDN** (CloudFront) if traffic grows beyond single-instance serving

Each of these can be added incrementally without disrupting the live storefront.

---

*Interested in a similar build - e-commerce, static-to-production pipelines, or AWS infrastructure? [Get in touch](mailto:your@email.com).*
