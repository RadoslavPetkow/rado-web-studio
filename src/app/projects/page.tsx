import type { Metadata } from "next";
import { ArrowRight, Check, Lightbulb, Target } from "lucide-react";

import { FadeIn } from "@/components/site/fade-in";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { ProjectMockup } from "@/components/site/project-mockup";
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
  title: "Demo Projects",
  description:
    "Demo project directions for small business websites, landing pages, and lead-generation systems from Rado Web Studio.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Demo Projects | Rado Web Studio",
    description:
      "Explore practical demo project directions for local service websites, fitness landing pages, and restaurant websites.",
    url: "/projects",
  },
  twitter: {
    title: "Demo Projects | Rado Web Studio",
    description:
      "Premium demo project directions for small business websites and landing pages.",
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
        <section className="border-b border-zinc-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto w-full max-w-7xl">
            <Badge
              variant="outline"
              className="mb-5 border-emerald-900/15 bg-emerald-50 text-emerald-900"
            >
              {copy.badge}
            </Badge>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              {copy.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-lg bg-zinc-950">
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

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-5">
            {dictionary.demoProjects.map((project, index) => (
              <FadeIn key={project.slug} delay={index * 0.04}>
                <Card className="overflow-hidden rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
                  <CardHeader className="gap-6 xl:grid xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
                    <ProjectMockup project={project} labels={dictionary.projectMockup} />
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
                      <Button asChild className="h-11 rounded-lg bg-zinc-950">
                        <TrackedLink
                          href={`${href("/contact")}?project=${project.slug}`}
                          eventName="project_card_cta_click"
                          eventProperties={{
                            project: project.title,
                            industry: project.industry,
                          }}
                        >
                          {copy.cardCta}
                          <ArrowRight className="size-4" />
                        </TrackedLink>
                      </Button>
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
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
      <Icon className="size-5 text-emerald-700" />
      <p className="mt-4 text-sm font-semibold text-zinc-950">{title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
    </div>
  );
}
