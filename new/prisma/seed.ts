import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { blogPosts } from "../src/data/blogs";
import { SITE } from "../src/data/site";

const prisma = new PrismaClient();

async function main() {
  const name = process.env.ADMIN_NAME ?? "Aravinthan";
  const email = process.env.ADMIN_EMAIL ?? "aravinthanbaalaji@gmail.com";
  const password = process.env.ADMIN_PASSWORD ?? "Admin@123";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { name, passwordHash },
    create: { email, name, passwordHash },
  });

  await prisma.siteProfile.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      name: SITE.name,
      title: SITE.title,
      tagline: SITE.tagline,
      domain: SITE.domain,
      location: SITE.location,
      availability: SITE.availability,
      email: SITE.email,
      linkedIn: SITE.linkedIn,
      github: SITE.github,
      calendly: SITE.calendly,
    },
  });

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        content: JSON.stringify(post.content),
        readTime: post.readTime,
        relatedProject: post.relatedProject ?? null,
        published: true,
        publishedAt: new Date(post.date),
      },
    });
  }

  console.log(`Seeded admin "${name}" (${email}) and ${blogPosts.length} blog posts.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
