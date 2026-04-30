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
    default: `${siteConfig.name} | Websites, AI Automations and Custom Software`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Rado Web Studio builds modern websites, landing pages, AI automations, chatbots, client systems, and custom software for small and medium businesses.",
  keywords: [
    "Rado Web Studio",
    "small business websites",
    "landing page design",
    "AI automation for business",
    "business chatbot",
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
    title: `${siteConfig.name} | Websites, AI Automations and Custom Software`,
    description:
      "Premium digital services for small and medium businesses that need a clearer website, smarter workflows, and a practical path to launch.",
    url: "/",
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Websites, AI Automations and Custom Software`,
    description:
      "Modern websites, landing pages, AI automations, chatbots, and custom software for growing businesses.",
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
