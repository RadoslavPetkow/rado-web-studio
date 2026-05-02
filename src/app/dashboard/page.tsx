import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  FolderKanban,
  MessageSquare,
  UserRound,
} from "lucide-react";

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
import { formatDateTime, getProjectMessageActivity } from "@/lib/portal-activity";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Private Rado Web Studio client dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  const isConfigured = isSupabaseConfigured();

  if (!isConfigured) {
    return <DashboardShell main={<SetupNotice />} />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/dashboard");
  }

  const [{ data: profile }, { data: projects }, { data: requests }] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
      supabase
        .from("projects")
        .select("id,title,service_type,description,budget_range,status,created_at,updated_at")
        .eq("client_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("project_requests")
        .select("id,service_needed,budget_range,timeline,status,created_at")
        .or(`user_id.eq.${user.id},email.eq.${user.email}`)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);
  const projectIds = (projects || []).map((project) => project.id);
  const { data: projectMessages } = projectIds.length
    ? await supabase
        .from("messages")
        .select("project_id,message,created_at")
        .in("project_id", projectIds)
        .order("created_at", { ascending: false })
    : { data: [] };
  const activityByProject = getProjectMessageActivity(projectMessages || []);

  return (
    <DashboardShell
      main={
        <div className="grid gap-8">
          <section className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
            <div>
              <Badge
                variant="outline"
                className="mb-5 border-emerald-900/15 bg-emerald-50 text-emerald-900"
              >
                Client dashboard
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
                This is the first portal foundation for project visibility,
                request history, and future client messages.
              </p>
              <Button asChild className="mt-6 h-11 rounded-lg bg-zinc-950">
                <Link href="/contact">
                  Create a new request
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <Card className="rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
              <CardHeader>
                <UserRound className="size-5 text-emerald-700" />
                <CardTitle>Profile summary</CardTitle>
                <CardDescription>{profile?.email || user.email}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm text-zinc-600">
                <p>Company: {profile?.company_name || "Not added yet"}</p>
                <p>Phone: {profile?.phone || "Not added yet"}</p>
                <p>Role: {profile?.role || "client"}</p>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1fr_0.55fr]">
            <Card className="rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
              <CardHeader>
                <FolderKanban className="size-5 text-emerald-700" />
                <CardTitle>Your projects</CardTitle>
                <CardDescription>
                  Active and completed projects will appear here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {projects?.length ? (
                  <div className="grid gap-3">
                    {projects.map((project) => {
                      const activity = activityByProject.get(project.id);

                      return (
                        <div
                          key={project.id}
                          className="rounded-xl border border-zinc-200 bg-zinc-50 p-5"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h2 className="font-semibold text-zinc-950">
                                {project.title}
                              </h2>
                              <p className="mt-1 text-sm text-zinc-600">
                                {project.service_type || "Digital project"}
                              </p>
                            </div>
                            <StatusBadge status={project.status} />
                          </div>
                          <div className="mt-4 grid gap-3 text-sm text-zinc-600 sm:grid-cols-2">
                            <ProjectCardDetail
                              icon="calendar"
                              label="Created"
                              value={formatDateTime(project.created_at)}
                            />
                            <ProjectCardDetail
                              icon="clock"
                              label="Updated"
                              value={formatDateTime(project.updated_at)}
                            />
                            <ProjectCardDetail
                              label="Budget"
                              value={project.budget_range || "Not specified"}
                            />
                            <ProjectCardDetail
                              label="Messages"
                              value={`${activity?.count || 0} total`}
                            />
                          </div>
                          <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                              Last message
                            </p>
                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-700">
                              {activity?.lastMessagePreview ||
                                "No messages yet."}
                            </p>
                            {activity?.lastMessageAt ? (
                              <p className="mt-2 text-xs text-zinc-500">
                                {formatDateTime(activity.lastMessageAt)}
                              </p>
                            ) : null}
                          </div>
                          {project.description ? (
                            <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-600">
                              {project.description}
                            </p>
                          ) : null}
                          <Button
                            asChild
                            variant="outline"
                            className="mt-5 h-10 rounded-lg bg-white"
                          >
                            <Link href={`/dashboard/projects/${project.id}`}>
                              View project details
                              <ArrowRight className="size-4" />
                            </Link>
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyState text="No projects yet. Submit a request and approved work can be added here." />
                )}
              </CardContent>
            </Card>

            <div className="grid gap-5">
              <Card className="rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
                <CardHeader>
                  <CardTitle>Recent requests</CardTitle>
                  <CardDescription>
                    Your submitted project requests and review status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {requests?.length ? (
                    <div className="grid gap-3">
                      {requests.map((request) => (
                        <div
                          key={request.id}
                          className="rounded-lg border border-zinc-200 p-4"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-medium text-zinc-950">
                              {request.service_needed || "Project request"}
                            </p>
                            <StatusBadge status={request.status} />
                          </div>
                          <p className="mt-2 text-sm text-zinc-500">
                            {request.budget_range || "Budget not specified"} ·{" "}
                            {request.timeline || "Timeline flexible"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState text="No saved requests yet." />
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-zinc-200 bg-zinc-950 p-2 text-white shadow-sm">
                <CardHeader>
                  <MessageSquare className="size-5 text-emerald-300" />
                  <CardTitle>Messages</CardTitle>
                  <CardDescription className="text-zinc-300">
                    Open a project to read or send messages. New replies appear
                    after refresh in this MVP.
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

function DashboardShell({ main }: { main: React.ReactNode }) {
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

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm leading-6 text-zinc-600">
      {text}
    </div>
  );
}

function ProjectCardDetail({
  icon,
  label,
  value,
}: {
  icon?: "calendar" | "clock";
  label: string;
  value: string;
}) {
  const Icon =
    icon === "calendar" ? CalendarDays : icon === "clock" ? Clock3 : null;

  return (
    <div className="flex gap-2">
      {Icon ? (
        <Icon className="mt-0.5 size-4 shrink-0 text-emerald-700" />
      ) : null}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {label}
        </p>
        <p className="mt-1 text-zinc-700">{value}</p>
      </div>
    </div>
  );
}
