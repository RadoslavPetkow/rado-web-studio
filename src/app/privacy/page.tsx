import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";

import { FadeIn } from "@/components/site/fade-in";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Rado Web Studio, including contact requests, client portal accounts, project data, and messages.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Rado Web Studio",
    description:
      "How Rado Web Studio collects and uses contact request, account, project, and message data.",
    url: "/privacy",
  },
  twitter: {
    title: "Privacy Policy | Rado Web Studio",
    description:
      "How Rado Web Studio handles contact requests, account data, project data, and messages.",
  },
};

const sections = [
  {
    title: "Information collected through the contact form",
    body: [
      "When you send a project request, the website may collect your name, email address, business name, business type, service needed, budget range, timeline, and message.",
      "This information is used to review your request, understand your business needs, and respond with possible next steps.",
    ],
  },
  {
    title: "Client portal account data",
    body: [
      "If you create a client portal account, the website may store your email address, name, company name, phone number, role, and account creation date.",
      "This is used to let you log in, view your projects, and keep client access separate from admin access.",
    ],
  },
  {
    title: "Project and message data",
    body: [
      "For active projects, the client portal may store project titles, descriptions, service type, budget range, status, timestamps, and project messages.",
      "Messages are saved so the client and Rado Web Studio can keep project communication in one place.",
    ],
  },
  {
    title: "How the data is used",
    body: [
      "The data is used to respond to inquiries, manage client accounts, organize project work, communicate about project progress, and improve the website and client portal experience.",
      "Rado Web Studio does not sell your personal data.",
    ],
  },
  {
    title: "Third-party services",
    body: [
      "The website may use third-party tools for hosting, analytics, forms, authentication, and database storage. These tools help run the website and client portal.",
      "Domain, hosting, paid tools, and third-party services may have their own privacy policies.",
    ],
  },
  {
    title: "Contact",
    body: [
      `For privacy questions or data requests, contact ${siteConfig.email}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar />
      <main>
        <section className="border-b border-zinc-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto w-full max-w-4xl">
            <Badge
              variant="outline"
              className="mb-5 border-emerald-900/15 bg-emerald-50 text-emerald-900"
            >
              Privacy Policy
            </Badge>
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
              Clear privacy information for clients and visitors.
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              This page explains what information Rado Web Studio may collect,
              why it is used, and how to get in touch about privacy questions.
            </p>
          </FadeIn>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-4xl gap-5">
            <Card className="rounded-2xl border-emerald-200 bg-emerald-50 p-2 shadow-sm">
              <CardHeader>
                <ShieldCheck className="size-5 text-emerald-800" />
                <CardTitle>Simple early-stage policy</CardTitle>
                <CardDescription className="text-emerald-950/75">
                  This is a simple privacy policy for an early-stage business
                  website and client portal. It is written for clarity and is
                  not legal advice.
                </CardDescription>
              </CardHeader>
            </Card>

            {sections.map((section) => (
              <Card
                key={section.title}
                className="rounded-2xl border-zinc-200 bg-white p-2 shadow-sm"
              >
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm leading-7 text-zinc-600">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </CardContent>
              </Card>
            ))}

            <Card className="rounded-2xl border-zinc-200 bg-zinc-950 p-2 text-white shadow-sm">
              <CardHeader>
                <Mail className="size-5 text-emerald-300" />
                <CardTitle>Questions about privacy?</CardTitle>
                <CardDescription className="text-zinc-300">
                  Send a message and I will review it directly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm font-semibold text-white underline-offset-4 hover:underline"
                >
                  {siteConfig.email}
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
