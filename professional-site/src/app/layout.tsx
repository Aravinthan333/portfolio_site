import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ConditionalShell } from "@/components/layout/ConditionalShell";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";
import { getSiteProfile } from "@/lib/site-profile";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getSiteProfile();
  return buildMetadata({
    title: `${profile.name} - ${profile.title} | ${profile.domain}`,
    description: `${profile.name} is a ${profile.title} building production-grade web platforms, APIs, and cloud systems for startups and businesses. Based in India, available worldwide.`,
  });
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const profile = await getSiteProfile();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.tagline,
    url: getSiteUrl(),
    email: profile.email,
    sameAs: [profile.linkedIn, profile.github],
  };

  return (
    <html lang="en" className={nunito.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="antialiased">
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
