import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CalendarClock,
  Check,
  Code2,
  Compass,
  ExternalLink,
  Layers3,
  LifeBuoy,
  LayoutDashboard,
  MessagesSquare,
  MonitorSmartphone,
  PhoneCall,
  Plug,
  Sparkles,
  Workflow,
} from "lucide-react";

import { ContactForm } from "@/components/site/contact-form";
import { FadeIn } from "@/components/site/fade-in";
import { Footer } from "@/components/site/footer";
import { LiveDemoPreview } from "@/components/site/live-demo-preview";
import { Navbar } from "@/components/site/navbar";
import { SectionHeading } from "@/components/site/section-heading";
import { TrackedLink } from "@/components/site/tracked-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { defaultLocale, localizedPath } from "@/i18n/locales";

const serviceIcons = {
  monitor: MonitorSmartphone,
  sparkles: Sparkles,
  messages: MessagesSquare,
  layout: LayoutDashboard,
  code: Code2,
  compass: Compass,
};

type PublicPageProps = {
  dictionary?: Dictionary;
  locale?: Locale;
  localized?: boolean;
};

export default function Home() {
  return <HomePage />;
}

export function HomePage({
  dictionary = en,
  locale = defaultLocale,
  localized = false,
}: PublicPageProps) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar dictionary={dictionary} locale={locale} localized={localized} showLanguageSwitcher />
      <main>
        <HeroSection dictionary={dictionary} locale={locale} localized={localized} />
        <ValuePointsSection dictionary={dictionary} />
        <ServicesSection dictionary={dictionary} />
        <AboutSection dictionary={dictionary} />
        <ProcessSection dictionary={dictionary} locale={locale} localized={localized} />
        <DemoProjectsSection dictionary={dictionary} locale={locale} localized={localized} />
        <PricingSection dictionary={dictionary} locale={locale} localized={localized} />
        <WhyChooseSection dictionary={dictionary} />
        <FaqSection dictionary={dictionary} />
        <ContactSection dictionary={dictionary} locale={locale} localized={localized} />
      </main>
      <Footer dictionary={dictionary} locale={locale} localized={localized} />
    </div>
  );
}

function getHref(locale: Locale, localized: boolean, path: string) {
  return localized ? localizedPath(locale, path) : path;
}

function HeroSection({ dictionary, locale, localized }: Required<PublicPageProps>) {
  const hero = dictionary.home.hero;
  const heroVisualItems = [
    dictionary.services[0],
    dictionary.services[2],
    dictionary.services[3],
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-zinc-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.24),transparent_32%),radial-gradient(circle_at_88%_8%,rgba(14,165,233,0.16),transparent_32%),linear-gradient(135deg,#09090b_0%,#18181b_48%,#064e3b_130%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:54px_54px] opacity-40" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20 xl:gap-16 xl:py-24">
        <FadeIn className="relative z-10">
          <p className="mb-5 text-sm font-semibold text-emerald-200">
            {siteConfig.name} {siteConfig.subtitle}
          </p>
          <Badge
            variant="outline"
            className="mb-6 border-white/10 bg-white/10 text-emerald-200"
          >
            {hero.badge}
          </Badge>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            {hero.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-lg bg-emerald-300 text-emerald-950 shadow-lg shadow-emerald-950/30 hover:bg-emerald-200"
            >
              <TrackedLink href={getHref(locale, localized, "/contact")} eventName="hero_cta_click">
                {hero.primaryCta}
                <ArrowRight className="size-4" />
              </TrackedLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-lg border-white/15 bg-white/10 text-white hover:bg-white/15"
            >
              <TrackedLink
                href={getHref(locale, localized, "/projects")}
                eventName="secondary_hero_cta_click"
              >
                {hero.secondaryCta}
              </TrackedLink>
            </Button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-zinc-300">
            <PhoneCall className="size-4 text-emerald-300" />
            {hero.note}
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="relative z-10">
          <div className="relative rounded-3xl border border-white/10 bg-white/10 p-3 shadow-2xl shadow-zinc-950/40 backdrop-blur sm:p-4">
            <div className="mb-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-zinc-950/85 p-4 shadow-xl shadow-zinc-950/20 backdrop-blur">
                <p className="text-xs font-medium text-zinc-400">{hero.priceLabel}</p>
                <p className="mt-1 text-2xl font-semibold text-white">€249+</p>
              </div>
              <div className="rounded-2xl border border-emerald-300/30 bg-emerald-300 p-4 text-emerald-950 shadow-xl shadow-emerald-950/20">
                <p className="text-xs font-semibold">{hero.proLabel}</p>
                <p className="mt-1 text-lg font-semibold">{hero.stackItems[0]}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-zinc-950/92 p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-400">{hero.studioFocus}</p>
                  <p className="mt-1 text-xl font-semibold">{hero.stackTitle}</p>
                </div>
                <Workflow className="size-6 text-emerald-300" />
              </div>

              <div className="mt-8 grid gap-3">
                {heroVisualItems.map((item, index) => {
                  const Icon = serviceIcons[item.icon as keyof typeof serviceIcons] ?? Workflow;

                  return (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-lg shadow-zinc-950/20"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-300/15 text-emerald-200">
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-zinc-50">{item.title}</p>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <span
                          className="block h-full rounded-full bg-emerald-300"
                          style={{ width: `${72 + index * 8}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white p-4 text-zinc-950">
                  <p className="text-3xl font-semibold">{hero.processStatValue}</p>
                  <p className="mt-1 text-sm text-zinc-600">{hero.processStatLabel}</p>
                </div>
                <div className="rounded-2xl bg-emerald-300 p-4 text-emerald-950">
                  <p className="text-3xl font-semibold">MVP</p>
                  <p className="mt-1 text-sm text-emerald-950/75">{hero.stackItems[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ValuePointsSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="bg-zinc-950 px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dictionary.home.valuePoints.map((point) => (
          <div
            key={point}
            className="flex min-h-18 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-center text-white shadow-lg shadow-zinc-950/10"
          >
            <BadgeCheck className="size-5 shrink-0 text-emerald-300" />
            <span className="text-sm font-medium leading-5 text-zinc-200">{point}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesSection({ dictionary }: { dictionary: Dictionary }) {
  const heading = dictionary.home.servicesHeading;

  return (
    <section id="services" className="scroll-mt-24 bg-[linear-gradient(180deg,#f4f4f5_0%,#ffffff_55%,#ecfdf5_130%)] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dictionary.services.map((service, index) => {
            const Icon = serviceIcons[service.icon as keyof typeof serviceIcons];

            return (
              <FadeIn key={service.title} delay={index * 0.03}>
                <Card className="h-full rounded-2xl border-zinc-200/80 bg-white/90 p-2 shadow-xl shadow-zinc-950/5 transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-950/10">
                  <CardHeader>
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-zinc-950 text-white shadow-lg shadow-zinc-950/15">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="leading-6">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutSection({ dictionary }: { dictionary: Dictionary }) {
  const about = dictionary.home.about;

  return (
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <FadeIn>
          <SectionHeading
            eyebrow={about.eyebrow}
            title={about.title}
            description={about.description}
          />
          <div className="mt-7 flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-xl bg-zinc-950 text-sm font-semibold text-emerald-200">
              RP
            </span>
            <div>
              <p className="font-semibold text-zinc-950">{about.signature}</p>
              <p className="text-sm text-zinc-500">{about.role}</p>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="grid gap-4 rounded-3xl border border-emerald-950/10 bg-[linear-gradient(135deg,#f4f4f5_0%,#ecfdf5_100%)] p-5 shadow-xl shadow-zinc-950/5 sm:grid-cols-2 sm:p-7">
            {about.points.map((point) => (
              <div
                key={point}
                className="flex gap-3 rounded-2xl border border-white bg-white/80 p-5 text-sm leading-6 text-zinc-700 shadow-sm"
              >
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-emerald-700" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ProcessSection({ dictionary, locale, localized }: Required<PublicPageProps>) {
  const heading = dictionary.home.processHeading;
  const ctas = dictionary.home.processCtas;

  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden bg-zinc-950 px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(16,185,129,0.18),transparent_34%),radial-gradient(circle_at_90%_55%,rgba(14,165,233,0.12),transparent_30%)]" />
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
          tone="dark"
        />

        <div className="relative mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <div className="absolute left-8 right-8 top-10 hidden h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent xl:block" />
          {dictionary.process.map((item, index) => (
            <FadeIn key={item.step} delay={index * 0.04}>
              <Card className="relative z-10 h-full rounded-2xl border-white/10 bg-white/[0.06] p-2 text-white shadow-xl shadow-zinc-950/20 backdrop-blur xl:col-span-1">
                <CardHeader>
                  <span className="flex size-11 items-center justify-center rounded-xl border border-emerald-300/25 bg-emerald-300/15 font-mono text-sm font-semibold text-emerald-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <CardTitle className="text-lg text-white xl:text-base">{item.title}</CardTitle>
                  <CardDescription className="leading-6 text-zinc-300">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-lg bg-emerald-300 text-emerald-950 shadow-lg shadow-emerald-950/20 hover:bg-emerald-200"
          >
            <TrackedLink
              href={getHref(locale, localized, "/contact")}
              eventName="process_cta_click"
              eventProperties={{
                location: "homepage_process",
                label: "Start with a request",
                destination: "/contact",
              }}
            >
              {ctas.request}
              <ArrowRight className="size-4" />
            </TrackedLink>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-lg border-white/15 bg-white/10 text-white hover:bg-white/15"
          >
            <TrackedLink
              href={getHref(locale, localized, "/start")}
              eventName="process_cta_click"
              eventProperties={{
                location: "homepage_process",
                label: "See what to prepare",
                destination: "/start",
              }}
            >
              {ctas.prepare}
            </TrackedLink>
          </Button>
        </div>
      </div>
    </section>
  );
}

function DemoProjectsSection({ dictionary, locale, localized }: Required<PublicPageProps>) {
  const heading = dictionary.home.projectsHeading;

  return (
    <section id="projects" className="scroll-mt-24 bg-[linear-gradient(180deg,#ffffff_0%,#f4f4f5_100%)] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {dictionary.demoProjects.map((project, index) => (
            <FadeIn key={project.title} delay={index * 0.04}>
              <Card className="h-full overflow-hidden rounded-3xl border-white bg-white p-2 shadow-2xl shadow-zinc-950/10 transition-all hover:-translate-y-1 hover:shadow-emerald-950/15">
                <LiveDemoPreview
                  project={project}
                  label={dictionary.projectsPage.cardCta}
                  compact
                />
                <CardHeader>
                  <Badge variant="secondary" className="mb-4 w-fit rounded-lg bg-zinc-100">
                    {project.industry}
                  </Badge>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="leading-6">
                    {project.resultPromise}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-5">
                  <div className="grid gap-3 text-sm leading-6">
                    <div>
                      <p className="font-semibold text-zinc-950">{dictionary.projectsPage.problem}</p>
                      <p className="mt-1 text-zinc-600">{project.problem}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-950">{dictionary.projectsPage.solution}</p>
                      <p className="mt-1 text-zinc-600">{project.solution}</p>
                    </div>
                  </div>
                  <ul className="grid gap-2 text-sm text-zinc-600">
                    {project.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-emerald-700" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-auto h-11 rounded-lg bg-zinc-950 text-white hover:bg-emerald-900"
                  >
                    <TrackedLink
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      eventName="project_card_cta_click"
                      eventProperties={{ project: project.title, destination: project.href }}
                    >
                      {dictionary.projectsPage.cardCta}
                      <ExternalLink className="size-4" />
                    </TrackedLink>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-lg bg-zinc-950 shadow-lg shadow-zinc-950/15"
          >
            <Link href={getHref(locale, localized, "/projects")}>
              {heading.viewAll}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function PricingSection({ dictionary, locale, localized }: Required<PublicPageProps>) {
  const heading = dictionary.home.pricingHeading;
  const clarity = dictionary.home.priceClarity;
  const maintenance = dictionary.home.maintenanceHeading;
  const icons = [Layers3, Sparkles, Plug, LayoutDashboard, Bot, LifeBuoy, CalendarClock];

  return (
    <section id="pricing" className="scroll-mt-24 bg-zinc-950 px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
          tone="dark"
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dictionary.pricing.map((plan, index) => {
            const isFeatured = "featured" in plan && plan.featured;

            return (
            <FadeIn key={plan.name} delay={index * 0.04} className="min-w-0">
              <Card
                className={`h-full rounded-3xl p-2 shadow-xl transition-all hover:-translate-y-1 ${
                  isFeatured
                    ? "border-emerald-300/50 bg-white text-zinc-950 shadow-emerald-950/20"
                    : "border-white/10 bg-white/[0.06] text-white shadow-zinc-950/20"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    {isFeatured ? (
                      <Badge className="rounded-lg bg-emerald-300 text-emerald-950">
                        {dictionary.home.maintenanceHeading.practical === "Practical choice"
                          ? "Recommended"
                          : dictionary.home.maintenanceHeading.practical}
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-4 text-3xl font-semibold">{plan.price}</p>
                  <CardDescription
                    className={isFeatured ? "text-zinc-600" : "text-zinc-300"}
                  >
                    {plan.description}
                  </CardDescription>
                  <p
                    className={`mt-4 rounded-lg border p-3 text-sm leading-6 ${
                      isFeatured
                        ? "border-zinc-200 bg-zinc-50 text-zinc-600"
                        : "border-white/10 bg-white/5 text-zinc-300"
                    }`}
                  >
                    {locale === "bg" ? "Подходящо за" : locale === "it" ? "Ideale per" : "Best for"}: {plan.bestFor}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm">
                        <Check
                          className={`mt-0.5 size-4 shrink-0 ${
                            isFeatured ? "text-emerald-700" : "text-emerald-300"
                          }`}
                        />
                        <span className={isFeatured ? "text-zinc-700" : "text-zinc-200"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardContent>
                  <Button
                    asChild
                    variant={isFeatured ? "secondary" : "outline"}
                    className={
                      isFeatured
                        ? "h-auto min-h-11 w-full whitespace-normal rounded-lg bg-zinc-950 py-3 text-center text-white hover:bg-zinc-800"
                        : "h-auto min-h-11 w-full whitespace-normal rounded-lg border-white/15 bg-white/10 py-3 text-center text-white hover:bg-white/15"
                    }
                  >
                    <TrackedLink
                      href={`${getHref(locale, localized, "/contact")}?package=${encodeURIComponent(plan.name)}`}
                      eventName="pricing_package_cta_click"
                      eventProperties={{ package: plan.name }}
                    >
                      {heading.askAbout} {plan.name}
                      <ArrowRight className="size-4" />
                    </TrackedLink>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-sm leading-6 text-zinc-300">
          {heading.includedNote}
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white p-6 text-zinc-950 shadow-2xl shadow-zinc-950/25">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <Badge
                variant="outline"
                className="border-emerald-900/15 bg-emerald-50 text-emerald-900"
              >
                {clarity.eyebrow}
              </Badge>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                {clarity.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {clarity.description}
              </p>
              <Button asChild className="mt-5 h-11 rounded-lg bg-zinc-950">
                <TrackedLink
                  href={getHref(locale, localized, "/contact")}
                  eventName="pricing_package_cta_click"
                  eventProperties={{ package: "Free project review" }}
                >
                  {clarity.cta}
                  <ArrowRight className="size-4" />
                </TrackedLink>
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {clarity.factors.map((factor, index) => {
                const Icon = icons[index] ?? Layers3;

                return (
                  <div
                    key={factor.title}
                    className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                  >
                    <Icon className="size-5 text-emerald-700" />
                    <p className="mt-3 text-sm font-semibold text-zinc-950">
                      {factor.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      {factor.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Monthly care"
            title={maintenance.title}
            description={maintenance.description}
            tone="dark"
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {dictionary.maintenancePlans.map((plan, index) => {
              const isFeatured = "featured" in plan && plan.featured;

              return (
              <FadeIn key={plan.name} delay={index * 0.04} className="min-w-0">
                <Card
                  className={`h-full rounded-lg p-2 shadow-sm ${
                    isFeatured
                      ? "border-emerald-300/50 bg-white text-zinc-950 shadow-xl shadow-emerald-950/10"
                      : "border-white/10 bg-white/[0.06] text-white"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      {isFeatured ? (
                        <Badge className="rounded-lg bg-emerald-100 text-emerald-900">
                          {maintenance.practical}
                        </Badge>
                      ) : null}
                    </div>
                    <p className="mt-4 text-3xl font-semibold">{plan.price}</p>
                    <CardDescription className={isFeatured ? "text-zinc-600" : "text-zinc-300"}>
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className={`flex gap-3 text-sm ${isFeatured ? "text-zinc-700" : "text-zinc-200"}`}
                        >
                          <Check className={`mt-0.5 size-4 shrink-0 ${isFeatured ? "text-emerald-700" : "text-emerald-300"}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection({ dictionary }: { dictionary: Dictionary }) {
  const heading = dictionary.home.why;

  return (
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {dictionary.reasons.map((reason, index) => (
            <FadeIn key={reason} delay={index * 0.04}>
              <div className="h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-950/5">
                <BadgeCheck className="mb-5 size-6 text-emerald-700" />
                <p className="text-base leading-7 text-zinc-700">{reason}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ dictionary }: { dictionary: Dictionary }) {
  const heading = dictionary.home.faq;

  return (
    <section id="faq" className="scroll-mt-24 bg-zinc-100 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />
        <Accordion type="single" collapsible className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl shadow-zinc-950/5">
          {dictionary.faqs.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function ContactSection({ dictionary, locale, localized }: Required<PublicPageProps>) {
  const contact = dictionary.home.contact;

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-zinc-950 px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.2),transparent_32%),linear-gradient(135deg,#064e3b_0%,#09090b_55%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <FadeIn>
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.07] px-6 py-10 text-white shadow-2xl shadow-zinc-950/30 backdrop-blur sm:px-10">
            <Badge className="mb-5 rounded-lg bg-emerald-300 text-emerald-950">
              {contact.badge}
            </Badge>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              {contact.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
              {contact.description}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 rounded-lg bg-white text-zinc-950 hover:bg-zinc-100"
            >
              <Link href={getHref(locale, localized, "/contact")}>
                {contact.cta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
        <FadeIn delay={0.08} className="relative">
          <ContactForm dictionary={dictionary} locale={locale} localized={localized} />
        </FadeIn>
      </div>
    </section>
  );
}
