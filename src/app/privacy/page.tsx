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
import { en } from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { defaultLocale } from "@/i18n/locales";

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

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}

export function PrivacyPageContent({
  dictionary = en,
  locale = defaultLocale,
  localized = false,
}: {
  dictionary?: Dictionary;
  locale?: Locale;
  localized?: boolean;
}) {
  const copy = dictionary.privacyPage;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar dictionary={dictionary} locale={locale} localized={localized} showLanguageSwitcher />
      <main>
        <section className="border-b border-zinc-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto w-full max-w-4xl">
            <Badge
              variant="outline"
              className="mb-5 border-emerald-900/15 bg-emerald-50 text-emerald-900"
            >
              {copy.badge}
            </Badge>
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              {copy.description}
            </p>
          </FadeIn>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-4xl gap-5">
            <Card className="rounded-2xl border-emerald-200 bg-emerald-50 p-2 shadow-sm">
              <CardHeader>
                <ShieldCheck className="size-5 text-emerald-800" />
                <CardTitle>{copy.noteTitle}</CardTitle>
                <CardDescription className="text-emerald-950/75">
                  {copy.note}
                </CardDescription>
              </CardHeader>
            </Card>

            {copy.sections.map((section) => (
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
                <CardTitle>{copy.questionsTitle}</CardTitle>
                <CardDescription className="text-zinc-300">
                  {copy.questionsDescription}
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
      <Footer dictionary={dictionary} locale={locale} localized={localized} />
    </div>
  );
}
