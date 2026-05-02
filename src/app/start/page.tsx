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

const checklistSections = [
  {
    title: "Business information",
    description:
      "The basics that explain what your business does, who it helps, and how customers can reach you.",
    items: [
      "Business name",
      "Short business description",
      "Main services/products",
      "Target customers",
      "Location if relevant",
      "Contact details",
    ],
  },
  {
    title: "Brand assets",
    description:
      "Useful visual material that helps the website feel consistent and credible from the first version.",
    items: [
      "Logo",
      "Brand colors",
      "Fonts if available",
      "Photos/images",
      "Social media links",
    ],
  },
  {
    title: "Website content",
    description:
      "The words and sections that help visitors understand your offer and decide to contact you.",
    items: [
      "Homepage text",
      "Services/pricing text",
      "About section",
      "FAQ",
      "Contact details",
      "Legal pages if needed",
    ],
  },
  {
    title: "Access and technical details",
    description:
      "Existing accounts and links that can make setup, migration, SEO, and deployment smoother.",
    items: [
      "Existing domain",
      "Hosting access if available",
      "Existing website link",
      "Google Maps link",
      "Analytics/Search Console access if relevant",
    ],
  },
  {
    title: "Launch preparation",
    description:
      "Final checks before the project goes live and becomes visible to real customers.",
    items: [
      "Final content approval",
      "Mobile review",
      "Form testing",
      "SEO basics check",
      "Domain/deployment check",
    ],
  },
];

const compactRequestFlow = [
  "Submit a request",
  "Clarify fit and scope",
  "Create portal account",
  "Track progress in the project workspace",
];

export default function StartPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar />
      <main>
        <section className="border-b border-zinc-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto w-full max-w-5xl">
            <Badge
              variant="outline"
              className="mb-5 border-emerald-900/15 bg-emerald-50 text-emerald-900"
            >
              Project Start Checklist
            </Badge>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
              Prepare the right details before your project starts.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
              A little preparation makes a website, automation, or custom
              software project much clearer. This checklist shows what is
              useful to collect before we agree the final scope and start work.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-lg bg-zinc-950">
                <Link href="/contact">
                  Start a project
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-lg border-zinc-300 bg-white"
              >
                <Link href="/projects">View demo projects</Link>
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
                  <CardTitle>Before we start</CardTitle>
                  <CardDescription className="max-w-3xl text-zinc-300">
                    Before any paid work begins, we clarify scope, timeline,
                    expectations, communication, and what the first version
                    should achieve. The goal is to avoid vague work, rushed
                    decisions, and surprises later in the project.
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>

            <div className="grid gap-5 lg:grid-cols-2">
              {checklistSections.map((section, index) => (
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
                    <CardTitle>Feedback and revisions</CardTitle>
                    <CardDescription className="leading-6">
                      Clear feedback helps the project move faster. Useful
                      feedback explains what should change, why it matters, and
                      whether it affects content, design, functionality, or
                      business goals.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm leading-7 text-zinc-600">
                    Revision rounds should be agreed before work starts, so the
                    project has a clear review process and enough room for
                    improvements without turning into an undefined scope.
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.04}>
                <Card className="h-full rounded-2xl border-emerald-200 bg-emerald-50 p-2 shadow-sm">
                  <CardHeader>
                    <Rocket className="size-6 text-emerald-800" />
                    <CardTitle>Ready to start?</CardTitle>
                    <CardDescription className="leading-6 text-emerald-950/75">
                      You do not need to have everything perfect before
                      reaching out. If some details are missing, we can identify
                      what is needed during the first project conversation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-5">
                    <div className="rounded-xl border border-emerald-200 bg-white p-4">
                      <p className="text-sm font-semibold text-emerald-950">
                        How the request becomes a portal project
                      </p>
                      <div className="mt-4 grid gap-3">
                        {compactRequestFlow.map((item, index) => (
                          <div key={item} className="flex gap-3 text-sm">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-900">
                              {index + 1}
                            </span>
                            <span className="text-zinc-700">{item}</span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-sm leading-6 text-zinc-600">
                        The portal is used only for approved projects, so first
                        we confirm that the project is a good fit.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button asChild className="h-11 rounded-lg bg-zinc-950">
                        <Link href="/contact">
                          Start a project
                          <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="h-11 rounded-lg bg-white"
                      >
                        <Link href="/projects">View demo projects</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
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
  items: string[];
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
