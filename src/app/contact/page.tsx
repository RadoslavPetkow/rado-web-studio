import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

import { ContactForm } from "@/components/site/contact-form";
import { FadeIn } from "@/components/site/fade-in";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

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
                Tell me what your business needs online.
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
                  <CardTitle>
                    What happens after you send a request?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-4 text-sm text-zinc-200">
                    {[
                      "I review your project details.",
                      "I suggest the best solution.",
                      "We agree on scope, price, and timeline.",
                      "I build and share progress.",
                      "You review, approve and launch.",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
      </main>
      <Footer />
    </div>
  );
}
