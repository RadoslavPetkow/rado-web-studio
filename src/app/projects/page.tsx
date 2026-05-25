import type { Metadata } from "next";
import { ArrowRight, Check, ExternalLink, Lightbulb, Target } from "lucide-react";

import { FadeIn } from "@/components/site/fade-in";
import { Footer } from "@/components/site/footer";
import { LiveDemoPreview } from "@/components/site/live-demo-preview";
import { Navbar } from "@/components/site/navbar";
import { TrackedLink } from "@/components/site/tracked-link";
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
  title: "Live Demo Websites",
  description:
    "View live Zoro WebStudio website demos for a cinema, food business, and restaurant.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Live Demo Websites | Zoro WebStudio",
    description:
      "Open live website demos built for local cinema, food, and restaurant scenarios.",
    url: "/projects",
  },
  twitter: {
    title: "Live Demo Websites | Zoro WebStudio",
    description:
      "Live website demos for small local business situations.",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}

export function ProjectsPageContent({
  dictionary = en,
  locale = defaultLocale,
  localized = false,
}: {
  dictionary?: Dictionary;
  locale?: Locale;
  localized?: boolean;
}) {
  const copy = dictionary.projectsPage;
  const href = (path: string) => (localized ? localizedPath(locale, path) : path);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar dictionary={dictionary} locale={locale} localized={localized} showLanguageSwitcher />
      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-zinc-950 px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(16,185,129,0.24),transparent_32%),radial-gradient(circle_at_88%_12%,rgba(14,165,233,0.15),transparent_34%)]" />
          <FadeIn className="relative mx-auto w-full max-w-7xl">
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
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-lg bg-emerald-300 text-emerald-950 shadow-lg shadow-emerald-950/25 hover:bg-emerald-200"
              >
                <TrackedLink
                  href={href("/contact")}
                  eventName="project_card_cta_click"
                  eventProperties={{
                    project: "Demo projects overview",
                    industry: "All examples",
                  }}
                >
                  {copy.cta}
                  <ArrowRight className="size-4" />
                </TrackedLink>
              </Button>
            </div>
          </FadeIn>
        </section>

        <section className="bg-[linear-gradient(180deg,#f4f4f5_0%,#ffffff_55%,#ecfdf5_130%)] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-5">
            {dictionary.demoProjects.map((project, index) => (
              <FadeIn key={project.slug} delay={index * 0.04}>
                <Card className="overflow-hidden rounded-3xl border-white bg-white p-2 shadow-2xl shadow-zinc-950/10">
                  <CardHeader className="gap-6 xl:grid xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
                    <LiveDemoPreview
                      project={project}
                      label={copy.cardCta}
                      eager={index === 0}
                    />
                    <div>
                      <Badge variant="secondary" className="mb-4 rounded-lg">
                        {project.industry}
                      </Badge>
                      <CardTitle className="text-2xl sm:text-3xl">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="mt-4 text-base leading-7">
                        {project.resultPromise}
                      </CardDescription>
                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <InfoBlock
                          icon="problem"
                          title={copy.problem}
                          description={project.problem}
                        />
                        <InfoBlock
                          icon="solution"
                          title={copy.solution}
                          description={project.solution}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 border-t border-zinc-200 pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
                      <div>
                        <p className="text-sm font-semibold text-zinc-950">
                          {copy.keyFeatures}
                        </p>
                        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                          {project.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex gap-3 text-sm text-zinc-700"
                            >
                              <Check className="mt-0.5 size-4 shrink-0 text-emerald-700" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-5 text-sm leading-6 text-zinc-500">
                          {copy.idealFor}: {project.idealFor}
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                      <Button asChild className="h-11 rounded-lg bg-zinc-950 shadow-lg shadow-zinc-950/15">
                        <TrackedLink
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                          eventName="project_card_cta_click"
                          eventProperties={{
                            project: project.title,
                            destination: project.href,
                          }}
                        >
                          {copy.cardCta}
                          <ExternalLink className="size-4" />
                        </TrackedLink>
                      </Button>
                      <Button asChild variant="outline" className="h-11 rounded-lg">
                        <TrackedLink
                          href={`${href("/contact")}?project=${project.slug}`}
                          eventName="project_card_cta_click"
                          eventProperties={{
                            project: project.title,
                            industry: project.industry,
                          }}
                        >
                          {copy.requestCta}
                          <ArrowRight className="size-4" />
                        </TrackedLink>
                      </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
      <Footer dictionary={dictionary} locale={locale} localized={localized} />
    </div>
  );
}

function InfoBlock({
  icon,
  title,
  description,
}: {
  icon: "problem" | "solution";
  title: string;
  description: string;
}) {
  const Icon = icon === "problem" ? Target : Lightbulb;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
      <Icon className="size-5 text-emerald-700" />
      <p className="mt-4 text-sm font-semibold text-zinc-950">{title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
    </div>
  );
}
