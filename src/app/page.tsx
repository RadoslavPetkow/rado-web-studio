import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Check,
  Code2,
  Compass,
  LayoutDashboard,
  MessagesSquare,
  MonitorSmartphone,
  Sparkles,
  Workflow,
} from "lucide-react";

import { ContactForm } from "@/components/site/contact-form";
import { FadeIn } from "@/components/site/fade-in";
import { Footer } from "@/components/site/footer";
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

const serviceIcons = {
  monitor: MonitorSmartphone,
  sparkles: Sparkles,
  messages: MessagesSquare,
  layout: LayoutDashboard,
  code: Code2,
  compass: Compass,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar />
      <main>
        <HeroSection />
        <ValuePointsSection />
        <ServicesSection />
        <ProcessSection />
        <DemoProjectsSection />
        <PricingSection />
        <WhyChooseSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-white">
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.16),transparent_55%)]" />
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <FadeIn className="relative z-10">
          <Badge
            variant="outline"
            className="mb-6 border-emerald-900/15 bg-emerald-50 text-emerald-900"
          >
            Premium digital services for growing businesses
          </Badge>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
            Modern websites and smart systems for businesses ready to grow.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            {siteConfig.name} helps small and medium businesses build polished
            websites, landing pages, AI automations, chatbots, client systems,
            and custom software solutions.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-lg bg-zinc-950">
              <TrackedLink href="/contact" eventName="hero_cta_click">
                Start a project
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
                href="/projects"
                eventName="secondary_hero_cta_click"
              >
                View demo projects
              </TrackedLink>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="relative z-10">
          <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-2xl shadow-zinc-950/10">
            <div className="rounded-xl border border-zinc-200 bg-zinc-950 p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-400">Studio focus</p>
                  <p className="mt-1 text-xl font-semibold">Launch-ready growth stack</p>
                </div>
                <Workflow className="size-6 text-emerald-300" />
              </div>

              <div className="mt-8 grid gap-3">
                {[
                  "Clear offer and conversion path",
                  "Fast mobile-first interface",
                  "Automation and AI roadmap",
                  "Future-ready app foundation",
                ].map((item) => (
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
                  <p className="text-3xl font-semibold">SMB</p>
                  <p className="mt-1 text-sm text-zinc-600">Built for real business needs</p>
                </div>
                <div className="rounded-lg bg-emerald-300 p-4 text-emerald-950">
                  <p className="text-3xl font-semibold">AI</p>
                  <p className="mt-1 text-sm text-emerald-950/75">Automation-ready from day one</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ValuePointsSection() {
  return (
    <section className="bg-white py-6">
      <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {siteConfig.valuePoints.map((point) => (
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

function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title="Digital work that connects strategy, design, and execution."
          description="The goal is not to add more technology for its own sake. It is to build the pieces that make your business easier to understand, easier to buy from, and easier to operate."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service, index) => {
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

function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow="How I work"
          title="A focused process from idea to launch."
          description="Every project starts with clarity. The first version should feel premium, useful, and realistic to maintain."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {siteConfig.process.map((item, index) => (
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
      </div>
    </section>
  );
}

function DemoProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow="Demo projects"
          title="Project directions built around real small business problems."
          description="These example projects show how a focused website or landing page can help visitors understand, trust, and contact a business faster."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {siteConfig.demoProjects.map((project, index) => (
            <FadeIn key={project.title} delay={index * 0.04}>
              <Card className="h-full rounded-lg border-zinc-200 bg-white p-2 shadow-sm">
                <CardHeader>
                  <Badge variant="secondary" className="mb-4 w-fit rounded-lg">
                    {project.industry}
                  </Badge>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="leading-6">
                    {project.resultPromise}
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
            variant="outline"
            size="lg"
            className="h-12 rounded-lg bg-white"
          >
            <Link href="/projects">
              View all demo projects
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow="Pricing preview"
          title="Clear investment ranges tied to business outcomes."
          description="The right scope depends on how much clarity, lead generation, automation, and custom workflow your first version needs."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {siteConfig.pricing.map((plan, index) => (
            <FadeIn key={plan.name} delay={index * 0.04}>
              <Card
                className={`h-full rounded-lg p-2 shadow-sm ${
                  plan.featured
                    ? "border-zinc-950 bg-zinc-950 text-white shadow-xl shadow-zinc-950/15"
                    : "border-zinc-200 bg-zinc-50"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    {plan.featured ? (
                      <Badge className="rounded-lg bg-emerald-300 text-emerald-950">
                        Popular
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-4 text-3xl font-semibold">{plan.price}</p>
                  <CardDescription
                    className={plan.featured ? "text-zinc-300" : undefined}
                  >
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm">
                        <Check
                          className={`mt-0.5 size-4 shrink-0 ${
                            plan.featured ? "text-emerald-300" : "text-emerald-700"
                          }`}
                        />
                        <span className={plan.featured ? "text-zinc-100" : "text-zinc-700"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardContent>
                  <Button
                    asChild
                    variant={plan.featured ? "secondary" : "outline"}
                    className={
                      plan.featured
                        ? "h-11 w-full rounded-lg bg-white text-zinc-950 hover:bg-zinc-100"
                        : "h-11 w-full rounded-lg bg-white"
                    }
                  >
                    <TrackedLink
                      href={`/contact?package=${encodeURIComponent(plan.name)}`}
                      eventName="pricing_package_cta_click"
                      eventProperties={{ package: plan.name }}
                    >
                      Ask about {plan.name}
                      <ArrowRight className="size-4" />
                    </TrackedLink>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          eyebrow="Why choose Rado Web Studio"
          title="A practical partner for the full shape of a digital project."
          description="Small and medium businesses need clear thinking, polished execution, and systems that can evolve. That is the center of this studio."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {siteConfig.reasons.map((reason, index) => (
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

function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions before the first build."
          description="A few useful answers for the first phase of the Rado Web Studio website and future client conversations."
        />
        <Accordion type="single" collapsible className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          {siteConfig.faqs.map((item) => (
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

function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <FadeIn>
          <div className="rounded-2xl bg-zinc-950 px-6 py-10 text-white sm:px-10">
            <Badge className="mb-5 rounded-lg bg-emerald-300 text-emerald-950">
              Request a project
            </Badge>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              Tell me what would make your business easier to find, trust, and
              buy from.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
              Use the form to share your business type, service need, budget,
              and timeline. If Formspree is not configured yet, it opens a
              ready-to-send email instead.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 rounded-lg bg-white text-zinc-950 hover:bg-zinc-100"
            >
              <Link href="/contact">
                Open dedicated contact page
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <ContactForm />
        </FadeIn>
      </div>
    </section>
  );
}
