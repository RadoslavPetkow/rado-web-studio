import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Mail } from "lucide-react";

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
  title: "Terms of Service",
  description:
    "Terms of Service for Rado Web Studio website, project requests, client portal, and digital service work.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | Rado Web Studio",
    description:
      "Simple terms for Rado Web Studio services, project scope, communication, responsibilities, and paid work.",
    url: "/terms",
  },
  twitter: {
    title: "Terms of Service | Rado Web Studio",
    description:
      "Simple terms for Rado Web Studio services, project scope, communication, and paid work.",
  },
};

const sections = [
  {
    title: "Services offered",
    body: [
      "Rado Web Studio offers website design and development, landing pages, online stores, client portals, dashboards, admin panels, custom web apps, automations, and related digital services.",
      "The exact service, deliverables, price, and timeline depend on the agreed project scope.",
    ],
  },
  {
    title: "Project scope and communication",
    body: [
      "Before paid work begins, we clarify the project goal, pages or features, timeline, responsibilities, and expected deliverables.",
      "Project communication may happen by email, contact form, client portal messages, or another agreed communication channel.",
    ],
  },
  {
    title: "Payments",
    body: [
      "Payments are not handled directly through this platform yet. The website and client portal do not process card payments or online checkout for services at this stage.",
      "For paid work, payment terms, invoices, deposits, milestones, or bank transfer details may be handled separately.",
    ],
  },
  {
    title: "Client responsibilities",
    body: [
      "Clients are responsible for providing accurate business information, content, images, access details, feedback, approvals, and any required third-party accounts or subscriptions.",
      "Domain, hosting, paid tools, and third-party services are not included in the base price unless clearly agreed in writing.",
    ],
  },
  {
    title: "Revisions and changes",
    body: [
      "Reasonable revisions are discussed as part of the project scope. Extra pages, features, integrations, content work, or major direction changes may require a new quote or adjusted timeline.",
      "The goal is to keep expectations clear before work starts and before the scope changes.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      "Rado Web Studio works to build reliable, professional digital solutions, but no website or software can guarantee sales, rankings, traffic, or uninterrupted service.",
      "In simple terms, Rado Web Studio is not responsible for indirect losses, lost profits, third-party service outages, or issues caused by incorrect information, missing client input, or external tools outside direct control.",
    ],
  },
  {
    title: "Formal agreements",
    body: [
      "For paid work, a separate written agreement, proposal, invoice, or project document may be used to define the final scope, payment terms, timeline, and responsibilities.",
      "If there is a difference between this general page and a signed or written project agreement, the specific project agreement should guide the paid work.",
    ],
  },
  {
    title: "Contact",
    body: [
      `For questions about these terms, contact ${siteConfig.email}.`,
    ],
  },
];

export default function TermsPage() {
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
              Terms of Service
            </Badge>
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
              Simple terms for project requests and digital service work.
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              These terms explain how Rado Web Studio handles project scope,
              communication, responsibilities, and paid work at this early MVP
              stage.
            </p>
          </FadeIn>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-4xl gap-5">
            <Card className="rounded-2xl border-emerald-200 bg-emerald-50 p-2 shadow-sm">
              <CardHeader>
                <FileText className="size-5 text-emerald-800" />
                <CardTitle>Plain-English terms</CardTitle>
                <CardDescription className="text-emerald-950/75">
                  This page is written for clarity and is not legal advice.
                  Formal agreements may be handled separately for paid client
                  work.
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
                <CardTitle>Questions about the terms?</CardTitle>
                <CardDescription className="text-zinc-300">
                  Send a message before starting a project.
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
