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
import { en } from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { defaultLocale } from "@/i18n/locales";

export const metadata: Metadata = {
  title: "Request a Free Website Review",
  description:
    "Request a free website review for your restaurant, cafe, shop, local service, or small business from Zoro WebStudio.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Request a Free Website Review | Zoro WebStudio",
    description:
      "Share your business and current online presence to receive a practical website direction from Zoro WebStudio.",
    url: "/contact",
  },
  twitter: {
    title: "Request a Free Website Review | Zoro WebStudio",
    description:
      "Request a website review for your local business and discuss a clear next step.",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}

export function ContactPageContent({
  dictionary = en,
  locale = defaultLocale,
  localized = false,
}: {
  dictionary?: Dictionary;
  locale?: Locale;
  localized?: boolean;
}) {
  const copy = dictionary.contactPage;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar dictionary={dictionary} locale={locale} localized={localized} showLanguageSwitcher />
      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-zinc-950 px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(16,185,129,0.23),transparent_34%),radial-gradient(circle_at_88%_10%,rgba(14,165,233,0.14),transparent_32%)]" />
          <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <FadeIn>
              <Badge
                variant="outline"
                className="mb-5 border-white/10 bg-white/10 text-emerald-200"
              >
                {copy.badge}
              </Badge>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                {copy.description}
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <Card className="rounded-2xl border-white/10 bg-white/[0.06] p-2 text-white shadow-2xl shadow-zinc-950/25 backdrop-blur">
                <CardHeader>
                  <Workflow className="size-5 text-emerald-300" />
                  <CardTitle>{copy.flowTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-4 text-sm text-zinc-200">
                    {copy.flow.map((item, index) => (
                      <li key={item} className="flex gap-3">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-emerald-200">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-6 text-zinc-200">
                    {copy.portalNote}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,#f4f4f5_0%,#ffffff_100%)] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-start">
            <FadeIn>
              <ContactForm dictionary={dictionary} locale={locale} localized={localized} />
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-950/5">
                <Mail className="size-6 text-emerald-700" />
                <h2 className="mt-5 text-xl font-semibold">{copy.emailTitle}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {copy.emailDescription}
                </p>
                <p className="mt-4 rounded-lg border border-emerald-900/10 bg-emerald-50 p-3 text-sm leading-6 text-emerald-950">
                  {copy.consultationNote}
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
            <Card className="rounded-3xl border-zinc-200 bg-white p-2 shadow-xl shadow-zinc-950/5">
              <CardHeader>
                <CardTitle>{copy.portalTitle}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm leading-6 text-zinc-600 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                <p>
                  {copy.portalDescription}
                </p>
                <div className="grid gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  {copy.portalSteps.map(
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
      <Footer dictionary={dictionary} locale={locale} localized={localized} />
    </div>
  );
}
