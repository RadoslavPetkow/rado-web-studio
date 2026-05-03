import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, Workflow } from "lucide-react";

import { ContactForm } from "@/components/site/contact-form";
import { FadeIn } from "@/components/site/fade-in";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

const requestFlowSteps = [
  "I review your request.",
  "I reply with questions or a suggested direction.",
  "We clarify scope, timeline and expectations.",
  "If the project moves forward, you create a client portal account.",
  "I create your project workspace.",
  "We communicate and track progress inside the portal.",
  "We review, polish and launch.",
];

export const metadata: Metadata = {
  title: "Request a Project",
  description:
    "Request a professional business website, landing page, online store, client portal, or custom software project from Rado Web Studio.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Request a Project | Rado Web Studio",
    description:
      "Share your business goals and request a practical website or digital system scope from Rado Web Studio.",
    url: "/contact",
  },
  twitter: {
    title: "Request a Project | Rado Web Studio",
    description:
      "Request a business website, landing page, online store, client portal, or custom software project.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar />
      <main>
        <section className="border-b border-zinc-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <FadeIn>
              <Badge
                variant="outline"
                className="mb-5 border-emerald-900/15 bg-emerald-50 text-emerald-900"
              >
                Project request
              </Badge>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
                Start with a free project review.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
                Share your business context, the service you need, and what a
                successful first version should accomplish. I will suggest a
                focused scope, realistic starting price, and next step.
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <Card className="rounded-lg border-zinc-200 bg-zinc-950 p-2 text-white shadow-xl shadow-zinc-950/10">
                <CardHeader>
                  <Workflow className="size-5 text-emerald-300" />
                  <CardTitle>What happens after you submit a request?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-4 text-sm text-zinc-200">
                    {requestFlowSteps.map((item, index) => (
                      <li key={item} className="flex gap-3">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-emerald-200">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-6 text-zinc-200">
                    The portal is used only for approved projects, so first we
                    confirm that the project is a good fit. It helps clients
                    track progress, view status updates, and keep communication
                    organized after approval.
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-start">
            <FadeIn>
              <ContactForm />
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <Mail className="size-6 text-emerald-700" />
                <h2 className="mt-5 text-xl font-semibold">Prefer email?</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  You can also send the project details directly. Include your
                  business, service needed, budget range, timeline, and what you
                  want the first version to achieve. Domain, hosting, paid
                  tools, and third-party services are handled separately, and I
                  can help choose and configure them.
                </p>
                <p className="mt-4 rounded-lg border border-emerald-900/10 bg-emerald-50 p-3 text-sm leading-6 text-emerald-950">
                  You can use this as a free consultation request. I will review
                  the project direction before suggesting a paid scope.
                </p>
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-950"
                >
                  {siteConfig.email}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto w-full max-w-7xl">
            <Card className="rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
              <CardHeader>
                <CardTitle>Request first, portal after approval</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm leading-6 text-zinc-600 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                <p>
                  The first step is a simple request. After we confirm the
                  project is a good fit, the client portal becomes the project
                  workspace for details, messages, progress, and review. The
                  portal is a support and trust feature for approved projects,
                  not something you need before sending a request.
                </p>
                <div className="grid gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  {["Request", "Clarify", "Approve", "Portal workspace"].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="size-4 text-emerald-700" />
                        <span className="font-medium text-zinc-800">{item}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </div>
  );
}
