import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  MessageSquareText,
  Rocket,
} from "lucide-react";

import { FadeIn } from "@/components/site/fade-in";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { en } from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { defaultLocale, localizedPath } from "@/i18n/locales";

export const metadata: Metadata = {
  title: "Project Start Checklist",
  description:
    "A practical checklist for preparing business information, brand assets, website content, access details, feedback, and launch steps before starting a Rado Web Studio project.",
  alternates: {
    canonical: "/start",
  },
  openGraph: {
    title: "Project Start Checklist | Rado Web Studio",
    description:
      "Prepare the key business details, content, assets, access, and launch checks before starting a website, automation, or custom software project.",
    url: "/start",
  },
  twitter: {
    title: "Project Start Checklist | Rado Web Studio",
    description:
      "A simple preparation checklist for website, automation, and custom software projects.",
  },
};

export default function StartPage() {
  return <StartPageContent />;
}

export function StartPageContent({
  dictionary = en,
  locale = defaultLocale,
  localized = false,
}: {
  dictionary?: Dictionary;
  locale?: Locale;
  localized?: boolean;
}) {
  const copy = dictionary.startPage;
  const href = (path: string) => (localized ? localizedPath(locale, path) : path);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar dictionary={dictionary} locale={locale} localized={localized} showLanguageSwitcher />
      <main>
        <section className="border-b border-zinc-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto w-full max-w-5xl">
            <Badge
              variant="outline"
              className="mb-5 border-emerald-900/15 bg-emerald-50 text-emerald-900"
            >
              {copy.badge}
            </Badge>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
              {copy.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-lg bg-zinc-950">
                <Link href={href("/contact")}>
                  {copy.primaryCta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-lg border-zinc-300 bg-white"
              >
                <Link href={href("/projects")}>{copy.secondaryCta}</Link>
              </Button>
            </div>
          </FadeIn>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-8">
            <FadeIn>
              <Card className="rounded-2xl border-zinc-200 bg-zinc-950 p-2 text-white shadow-xl shadow-zinc-950/10">
                <CardHeader>
                  <ClipboardCheck className="size-6 text-emerald-300" />
                  <CardTitle>{copy.beforeTitle}</CardTitle>
                  <CardDescription className="max-w-3xl text-zinc-300">
                    {copy.beforeDescription}
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>

            <div className="grid gap-5 lg:grid-cols-2">
              {copy.sections.map((section, index) => (
                <FadeIn key={section.title} delay={index * 0.04}>
                  <ChecklistCard
                    title={section.title}
                    description={section.description}
                    items={section.items}
                  />
                </FadeIn>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <FadeIn>
                <Card className="h-full rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
                  <CardHeader>
                    <MessageSquareText className="size-6 text-emerald-700" />
                    <CardTitle>{copy.feedbackTitle}</CardTitle>
                    <CardDescription className="leading-6">
                      {copy.feedbackDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm leading-7 text-zinc-600">
                    {copy.feedbackBody}
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.04}>
                <Card className="h-full rounded-2xl border-emerald-200 bg-emerald-50 p-2 shadow-sm">
                  <CardHeader>
                    <Rocket className="size-6 text-emerald-800" />
                    <CardTitle>{copy.readyTitle}</CardTitle>
                    <CardDescription className="leading-6 text-emerald-950/75">
                      {copy.readyDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-5">
                    <div className="rounded-xl border border-emerald-200 bg-white p-4">
                      <p className="text-sm font-semibold text-emerald-950">
                        {copy.flowTitle}
                      </p>
                      <div className="mt-4 grid gap-3">
                        {copy.flow.map((item, index) => (
                          <div key={item} className="flex gap-3 text-sm">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-900">
                              {index + 1}
                            </span>
                            <span className="text-zinc-700">{item}</span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-sm leading-6 text-zinc-600">
                        {copy.portalNote}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button asChild className="h-11 rounded-lg bg-zinc-950">
                        <Link href={href("/contact")}>
                          {copy.primaryCta}
                          <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="h-11 rounded-lg bg-white"
                      >
                        <Link href={href("/projects")}>{copy.secondaryCta}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer dictionary={dictionary} locale={locale} localized={localized} />
    </div>
  );
}

function ChecklistCard({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: readonly string[];
}) {
  return (
    <Card className="h-full rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="leading-6">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-zinc-700">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-700" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
