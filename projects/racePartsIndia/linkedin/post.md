# LinkedIn Post - Race Parts India

---

🏁 **Just shipped a full-stack e-commerce experience for a motorsport retailer - without a backend.**

I recently completed a freelance engagement for **Race Parts India (RPI)** - a premium motorsport parts and simulator rig retailer serving racers, teams, and enthusiasts across India.

The brief was clear: build a fast, professional storefront that showcases a large product catalog, works beautifully on mobile, and lets customers place orders through channels they already use - **WhatsApp**.

Here's what I delivered end-to-end:

**🛒 Product experience**
• React 19 + Vite SPA with category filtering, image zoom, and responsive product modals
• Shared cart state across routes with quantity management and price-range handling
• One-tap checkout that compiles a formatted order summary and hands off to WhatsApp
• Premium brand UI - dark accents, orange (#ff7402) energy, Framer Motion animations

**☁️ Production infrastructure**
• AWS EC2 provisioned with Terraform (security groups, IAM, SSM-ready instance)
• Nginx with HTTPS, SPA routing, and 30-day static asset caching
• GitHub Actions CI/CD - build, rsync deploy, nginx config sync, SSL renewal automation
• Zero-downtime deploy pattern: images first, then JS/CSS (no broken renders mid-deploy)

**Why this architecture?**
For a growing motorsport retailer, a traditional e-commerce stack (database, auth, payment gateway, admin panel) would mean higher cost, longer time-to-market, and ongoing maintenance. Instead, I designed a **serverless-first storefront** that keeps operations lean while still feeling like a premium shopping experience.

The result: **https://racepartsindia.com** - live, fast, and built to scale when the business is ready for a backend.

This is the kind of work I love as a freelance engineer: understanding the business constraint, choosing the right architecture, and shipping something real that clients can use from day one.

---

If you're building a product catalog, D2C storefront, or need help going from prototype → production on AWS - let's connect.

#FreelanceDeveloper #React #AWS #Ecommerce #WebDevelopment #DevOps #Terraform #GitHubActions #FullStack #SoftwareEngineering #Motorsport #StartupTech
