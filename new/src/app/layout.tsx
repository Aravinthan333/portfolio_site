import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { ClickRipple } from "@/components/ClickRipple";
import { CustomCursor } from "@/components/CustomCursor";
import { PageTracker } from "@/components/analytics/PageTracker";
import { getSiteUrl, SITE } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE.name} - Software Engineer & Full Stack Developer`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.tagline,
  openGraph: {
    title: `${SITE.name} - Software Engineer & Full Stack Developer`,
    description: SITE.tagline,
    type: "website",
    siteName: SITE.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} - Software Engineer & Full Stack Developer`,
    description: SITE.tagline,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/noun-code-4213617.svg", type: "image/svg+xml" }],
    shortcut: "/noun-code-4213617.svg",
    apple: "/noun-code-4213617.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <CustomCursor />
        <ClickRipple />
        <PageTracker />
        {children}
      </body>
    </html>
  );
}
