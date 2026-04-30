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
    default: `${siteConfig.name} | Websites and Digital Systems for Small Businesses`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Rado Web Studio builds modern, fast, mobile-friendly websites and digital systems for small businesses that want more trust, more inquiries, and a professional online presence.",
  keywords: [
    "Rado Web Studio",
    "small business websites",
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
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Digital services",
  openGraph: {
    title: `${siteConfig.name} | Websites and Digital Systems for Small Businesses`,
    description:
      "Modern websites, online stores, client portals, and custom web systems built for trust, speed, and customer inquiries.",
    url: "/",
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Websites and Digital Systems for Small Businesses`,
    description:
      "Modern websites, online stores, client portals, and custom software for small businesses.",
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
