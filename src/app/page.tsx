import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CalendarClock,
  Check,
  Code2,
  Compass,
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
import { Navbar } from "@/components/site/navbar";
import { ProjectMockup } from "@/components/site/project-mockup";
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

  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-white">
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.16),transparent_55%)]" />
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <FadeIn className="relative z-10">
          <Badge
            variant="outline"
            className="mb-6 border-emerald-900/15 bg-emerald-50 text-emerald-900"
          >
            {hero.badge}
          </Badge>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            {hero.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-lg bg-zinc-950">
              <TrackedLink href={getHref(locale, localized, "/contact")} eventName="hero_cta_click">
                {hero.primaryCta}
                <ArrowRight className="size-4" />
              </TrackedLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-lg border-zinc-300 bg-white"
            >
              <TrackedLink
                href={getHref(locale, localized, "/projects")}
                eventName="secondary_hero_cta_click"
              >
                {hero.secondaryCta}
              </TrackedLink>
            </Button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-zinc-500">
            <PhoneCall className="size-4 text-emerald-700" />
            {hero.note}
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="relative z-10">
          <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-2xl shadow-zinc-950/10">
            <div className="rounded-xl border border-zinc-200 bg-zinc-950 p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-400">{hero.studioFocus}</p>
                  <p className="mt-1 text-xl font-semibold">{hero.stackTitle}</p>
                </div>
                <Workflow className="size-6 text-emerald-300" />
              </div>

              <div className="mt-8 grid gap-3">
                {hero.stackItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
                  >
                    <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-200">
                      <Check className="size-4" />
                    </span>
                    <span className="text-sm text-zinc-100">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white p-4 text-zinc-950">
                  <p className="text-3xl font-semibold">€249+</p>
                  <p className="mt-1 text-sm text-zinc-600">{hero.priceLabel}</p>
                </div>
                <div className="rounded-lg bg-emerald-300 p-4 text-emerald-950">
                  <p className="text-3xl font-semibold">Pro</p>
                  <p className="mt-1 text-sm text-emerald-950/75">{hero.proLabel}</p>
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
    <section className="bg-white py-6">
      <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {dictionary.home.valuePoints.map((point) => (
          <div
            key={point}
            className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3"
          >
            <BadgeCheck className="size-5 text-emerald-700" />
            <span className="text-sm font-medium text-zinc-700">{point}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesSection({ dictionary }: { dictionary: Dictionary }) {
  const heading = dictionary.home.servicesHeading;

  return (
    <section id="services" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
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
                <Card className="h-full rounded-lg border-zinc-200 bg-white p-2 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-950/5">
                  <CardHeader>
                    <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-zinc-950 text-white">
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

function ProcessSection({ dictionary, locale, localized }: Required<PublicPageProps>) {
  const heading = dictionary.home.processHeading;
  const ctas = dictionary.home.processCtas;

  return (
    <section id="process" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dictionary.process.map((item, index) => (
            <FadeIn key={item.step} delay={index * 0.04}>
              <Card className="h-full rounded-lg border-zinc-200 bg-zinc-50 p-2">
                <CardHeader>
                  <span className="font-mono text-sm font-semibold text-emerald-700">
                    {item.step}
                  </span>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="leading-6">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="h-12 rounded-lg bg-zinc-950">
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
            className="h-12 rounded-lg bg-white"
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
    <section id="projects" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {dictionary.demoProjects.map((project, index) => (
            <FadeIn key={project.title} delay={index * 0.04}>
              <Card className="h-full overflow-hidden rounded-2xl border-zinc-200 bg-white p-2 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-950/5">
                <ProjectMockup project={project} labels={dictionary.projectMockup} />
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
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-lg bg-zinc-950"
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
    <section id="pricing" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dictionary.pricing.map((plan, index) => {
            const isFeatured = "featured" in plan && plan.featured;

            return (
            <FadeIn key={plan.name} delay={index * 0.04}>
              <Card
                className={`h-full rounded-lg p-2 shadow-sm ${
                  isFeatured
                    ? "border-zinc-950 bg-zinc-950 text-white shadow-xl shadow-zinc-950/15"
                    : "border-zinc-200 bg-zinc-50"
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
                    className={isFeatured ? "text-zinc-300" : undefined}
                  >
                    {plan.description}
                  </CardDescription>
                  <p
                    className={`mt-4 rounded-lg border p-3 text-sm leading-6 ${
                      isFeatured
                        ? "border-white/10 bg-white/5 text-zinc-200"
                        : "border-zinc-200 bg-white text-zinc-600"
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
                            isFeatured ? "text-emerald-300" : "text-emerald-700"
                          }`}
                        />
                        <span className={isFeatured ? "text-zinc-100" : "text-zinc-700"}>
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
                        ? "h-11 w-full rounded-lg bg-white text-zinc-950 hover:bg-zinc-100"
                        : "h-11 w-full rounded-lg bg-white"
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

        <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-6 text-zinc-600">
          {heading.includedNote}
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
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
                    className="rounded-lg border border-zinc-200 bg-zinc-50 p-4"
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
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {dictionary.maintenancePlans.map((plan, index) => {
              const isFeatured = "featured" in plan && plan.featured;

              return (
              <FadeIn key={plan.name} delay={index * 0.04}>
                <Card
                  className={`h-full rounded-lg p-2 shadow-sm ${
                    isFeatured
                      ? "border-emerald-700 bg-white shadow-xl shadow-emerald-950/10"
                      : "border-zinc-200 bg-zinc-50"
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
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-3 text-sm text-zinc-700">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-700" />
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
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {dictionary.reasons.map((reason, index) => (
            <FadeIn key={reason} delay={index * 0.04}>
              <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
                <Bot className="mb-5 size-6 text-emerald-700" />
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
    <section id="faq" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />
        <Accordion type="single" collapsible className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
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
    <section id="contact" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <FadeIn>
          <div className="rounded-2xl bg-zinc-950 px-6 py-10 text-white sm:px-10">
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
        <FadeIn delay={0.08}>
          <ContactForm dictionary={dictionary} locale={locale} localized={localized} />
        </FadeIn>
      </div>
    </section>
  );
}
