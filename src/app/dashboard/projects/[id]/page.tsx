import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CalendarDays, MessageSquare } from "lucide-react";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { SetupNotice } from "@/components/site/setup-notice";
import { StatusBadge } from "@/components/site/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Project Details",
  description: "Private Rado Web Studio project details.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isConfigured = isSupabaseConfigured();

  if (!isConfigured) {
    return <ProjectShell main={<SetupNotice />} />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=/dashboard/projects/${id}`);
  }

  const { data: project } = await supabase
    .from("projects")
    .select("id,title,service_type,description,budget_range,status,created_at")
    .eq("id", id)
    .maybeSingle();

  if (!project) {
    notFound();
  }

  return (
    <ProjectShell
      main={
        <div className="grid gap-8">
          <div>
            <Button
              asChild
              variant="outline"
              className="mb-6 h-10 rounded-lg bg-white"
            >
              <Link href="/dashboard">
                <ArrowLeft className="size-4" />
                Back to dashboard
              </Link>
            </Button>
            <Badge
              variant="outline"
              className="mb-5 border-emerald-900/15 bg-emerald-50 text-emerald-900"
            >
              Project details
            </Badge>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  {project.title}
                </h1>
                <p className="mt-4 text-base leading-7 text-zinc-600">
                  {project.service_type || "Digital project"}
                </p>
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
                  <p className="font-semibold">Current stage</p>
                  <p className="mt-1">{getStageDescription(project.status)}</p>
                </div>
              </div>
              <StatusBadge status={project.status} />
            </div>
          </div>

          <section className="grid gap-5 lg:grid-cols-[1fr_0.45fr]">
            <Card className="rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
              <CardHeader>
                <CardTitle>Project brief</CardTitle>
                <CardDescription>
                  The current project scope created from the original request.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line text-sm leading-7 text-zinc-700">
                  {project.description || "No project description has been added yet."}
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-5">
              <Card className="rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
                <CardHeader>
                  <CardTitle>Project summary</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm text-zinc-600">
                  <div>
                    <p className="font-medium text-zinc-950">Budget range</p>
                    <p className="mt-1">{project.budget_range || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-950">Created</p>
                    <p className="mt-1 flex gap-2">
                      <CalendarDays className="size-4 text-emerald-700" />
                      {formatDate(project.created_at)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-zinc-200 bg-zinc-950 p-2 text-white shadow-sm">
                <CardHeader>
                  <MessageSquare className="size-5 text-emerald-300" />
                  <CardTitle>Messages</CardTitle>
                  <CardDescription className="text-zinc-300">
                    A simple project message thread will be added here later.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>
        </div>
      }
    />
  );
}

function getStageDescription(status?: string | null) {
  switch (status) {
    case "new":
      return "Your project has been created and is waiting to be started.";
    case "in_progress":
      return "Work is currently in progress.";
    case "waiting_for_client":
      return "I am waiting for your feedback, content, or approval.";
    case "completed":
      return "This project is marked as completed.";
    default:
      return "Project status will be updated here as the work moves forward.";
  }
}

function ProjectShell({ main }: { main: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {main}
      </main>
      <Footer />
    </div>
  );
}

function formatDate(value?: string | null) {
  if (!value) {
    return "Not provided";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
