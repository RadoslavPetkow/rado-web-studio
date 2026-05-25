import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = new URL(siteConfig.url);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${siteConfig.name} ${siteConfig.subtitle} | Websites for Local Businesses`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Zoro WebStudio by Radoslav Petkov builds modern, fast, mobile-friendly websites for restaurants, cafes, shops, and local businesses.",
  keywords: [
    "Zoro WebStudio",
    "Radoslav Petkov",
    "small business websites",
    "restaurant website design",
    "local business website",
    "landing page design",
    "website development Bulgaria",
    "business website Europe",
    "online store development",
    "custom software development",
    "website redesign",
  ],
  alternates: {
    canonical: "/",
  },
  authors: [{ name: `${siteConfig.name} ${siteConfig.subtitle}` }],
  creator: `${siteConfig.name} ${siteConfig.subtitle}`,
  publisher: siteConfig.name,
  category: "Digital services",
  openGraph: {
    title: `${siteConfig.name} ${siteConfig.subtitle} | Websites for Local Businesses`,
    description:
      "Fast, clean, mobile-friendly websites that help local businesses look professional and make customer contact easier.",
    url: "/",
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} ${siteConfig.subtitle} | Websites for Local Businesses`,
    description:
      "Modern websites for restaurants, cafes, shops, and local businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
