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
    "Privacy Policy for Zoro WebStudio, including contact requests, client portal accounts, project data, and messages.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Zoro WebStudio",
    description:
      "How Zoro WebStudio collects and uses contact request, account, project, and message data.",
    url: "/privacy",
  },
  twitter: {
    title: "Privacy Policy | Zoro WebStudio",
    description:
      "How Zoro WebStudio handles contact requests, account data, project data, and messages.",
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
        <section className="relative overflow-hidden border-b border-white/10 bg-zinc-950 px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.22),transparent_34%),radial-gradient(circle_at_88%_8%,rgba(14,165,233,0.12),transparent_32%)]" />
          <FadeIn className="relative mx-auto w-full max-w-4xl">
            <Badge
              variant="outline"
              className="mb-5 border-white/10 bg-white/10 text-emerald-200"
            >
              {copy.badge}
            </Badge>
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              {copy.description}
            </p>
          </FadeIn>
        </section>

        <section className="bg-[linear-gradient(180deg,#f4f4f5_0%,#ffffff_100%)] px-4 py-16 sm:px-6 lg:px-8">
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
                className="rounded-2xl border-zinc-200 bg-white p-2 shadow-xl shadow-zinc-950/5"
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
