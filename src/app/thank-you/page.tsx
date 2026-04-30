import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquareText,
  Rocket,
  SearchCheck,
  Sparkles,
} from "lucide-react";

import { FadeIn } from "@/components/site/fade-in";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { TrackPageView } from "@/components/site/track-page-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Your Rado Web Studio project request has been received. Review the next steps and explore demo projects.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/thank-you",
  },
};

const nextSteps = [
  {
    title: "I review your request",
    description:
      "I look at your business type, goals, service need, timeline, and budget range.",
    icon: SearchCheck,
  },
  {
    title: "I clarify the best path",
    description:
      "If anything is unclear, I will ask focused questions so the first version stays practical.",
    icon: MessageSquareText,
  },
  {
    title: "We agree on scope",
    description:
      "We define the deliverables, price range, timeline, and what success should look like.",
    icon: CheckCircle2,
  },
  {
    title: "I build and share progress",
    description:
      "You get a clear build process with checkpoints instead of a black-box project.",
    icon: Sparkles,
  },
  {
    title: "You review and launch",
    description:
      "We polish the final details, prepare launch, and plan smart improvements after the first version.",
    icon: Rocket,
  },
];

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <TrackPageView eventName="thank_you_page_viewed" />
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b border-zinc-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.16),transparent_55%)]" />
          <FadeIn className="relative mx-auto w-full max-w-4xl text-center">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 ring-8 ring-emerald-50">
              <CheckCircle2 className="size-8" />
            </div>
            <Badge
              variant="outline"
              className="mb-5 border-emerald-900/15 bg-emerald-50 text-emerald-900"
            >
              Request sent
            </Badge>
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
              Your request has been received
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              Thanks for sharing the details. I will review your request and
              respond with the next practical step, whether that is a focused
              scope, a few clarifying questions, or a suggested project path.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-lg bg-zinc-950">
                <Link href="/projects">
                  View demo projects
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-lg border-zinc-300 bg-white"
              >
                <Link href={`mailto:${siteConfig.email}`}>
                  <Mail className="size-4" />
                  Email {siteConfig.email}
                </Link>
              </Button>
            </div>
          </FadeIn>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <FadeIn className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="mb-4 border-zinc-200 bg-white text-zinc-700"
              >
                What happens next
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                A simple process from request to first version.
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                The goal is to keep momentum high while making sure the project
                is scoped around the right business outcome.
              </p>
            </FadeIn>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {nextSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <FadeIn key={step.title} delay={index * 0.04}>
                    <Card className="h-full rounded-lg border-zinc-200 bg-white p-2 shadow-sm">
                      <CardHeader>
                        <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-zinc-950 text-emerald-300">
                          <Icon className="size-5" />
                        </div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-6 text-zinc-600">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
