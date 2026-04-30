import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BriefcaseBusiness, Inbox, UsersRound } from "lucide-react";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { SetupNotice } from "@/components/site/setup-notice";
import { StatusBadge } from "@/components/site/status-badge";
import { Badge } from "@/components/ui/badge";
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
  title: "Admin",
  description: "Rado Web Studio admin dashboard foundation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const isConfigured = isSupabaseConfigured();

  if (!isConfigured) {
    return <AdminShell main={<SetupNotice />} />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  const [{ data: requests }, { data: projects }, { data: clients }] =
    await Promise.all([
      supabase
        .from("project_requests")
        .select("id,name,email,business_name,service_needed,budget_range,timeline,status,created_at")
        .order("created_at", { ascending: false })
        .limit(8),
      supabase
        .from("projects")
        .select("id,title,service_type,status,budget_range,created_at")
        .order("created_at", { ascending: false })
        .limit(8),
      supabase
        .from("profiles")
        .select("id,full_name,email,company_name,role,created_at")
        .order("created_at", { ascending: false })
        .limit(8),
    ]);

  return (
    <AdminShell
      main={
        <div className="grid gap-8">
          <section>
            <Badge
              variant="outline"
              className="mb-5 border-emerald-900/15 bg-emerald-50 text-emerald-900"
            >
              Admin dashboard
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Portal operations overview.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
              Review incoming requests, active projects, and client accounts.
              Editing workflows can be added once the first real admin process
              is clear.
            </p>
          </section>

          <section className="grid gap-5 lg:grid-cols-3">
            <SummaryCard
              icon="requests"
              title="Recent requests"
              value={requests?.length || 0}
            />
            <SummaryCard
              icon="projects"
              title="Projects"
              value={projects?.length || 0}
            />
            <SummaryCard
              icon="clients"
              title="Clients"
              value={clients?.length || 0}
            />
          </section>

          <section className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
            <Card className="rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
              <CardHeader>
                <CardTitle>Recent project requests</CardTitle>
                <CardDescription>
                  New inquiries from the public request flow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {requests?.length ? (
                  <div className="grid gap-3">
                    {requests.map((request) => (
                      <div
                        key={request.id}
                        className="rounded-lg border border-zinc-200 bg-zinc-50 p-4"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h2 className="font-semibold text-zinc-950">
                              {request.name}
                            </h2>
                            <p className="mt-1 text-sm text-zinc-600">
                              {request.business_name || request.email}
                            </p>
                          </div>
                          <StatusBadge status={request.status} />
                        </div>
                        <p className="mt-3 text-sm text-zinc-600">
                          {request.service_needed || "Service not selected"} ·{" "}
                          {request.budget_range || "Budget not specified"} ·{" "}
                          {request.timeline || "Timeline flexible"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyAdminState text="No requests yet." />
                )}
              </CardContent>
            </Card>

            <div className="grid gap-5">
              <Card className="rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>
                    Current project records and statuses.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {projects?.length ? (
                    projects.map((project) => (
                      <div
                        key={project.id}
                        className="rounded-lg border border-zinc-200 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-zinc-950">
                            {project.title}
                          </p>
                          <StatusBadge status={project.status} />
                        </div>
                        <p className="mt-2 text-sm text-zinc-500">
                          {project.service_type || "Digital project"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <EmptyAdminState text="No projects yet." />
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
                <CardHeader>
                  <CardTitle>Clients</CardTitle>
                  <CardDescription>
                    Recently created portal profiles.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {clients?.length ? (
                    clients.map((client) => (
                      <div
                        key={client.id}
                        className="rounded-lg border border-zinc-200 p-4"
                      >
                        <p className="text-sm font-semibold text-zinc-950">
                          {client.full_name || client.email || "Unnamed client"}
                        </p>
                        <p className="mt-2 text-sm text-zinc-500">
                          {client.company_name || client.role}
                        </p>
                      </div>
                    ))
                  ) : (
                    <EmptyAdminState text="No clients yet." />
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      }
    />
  );
}

function AdminShell({ main }: { main: React.ReactNode }) {
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

function SummaryCard({
  icon,
  title,
  value,
}: {
  icon: "requests" | "projects" | "clients";
  title: string;
  value: number;
}) {
  const Icon =
    icon === "requests"
      ? Inbox
      : icon === "projects"
        ? BriefcaseBusiness
        : UsersRound;

  return (
    <Card className="rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
      <CardHeader>
        <Icon className="size-5 text-emerald-700" />
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-3xl font-semibold text-zinc-950">
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function EmptyAdminState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm text-zinc-600">
      {text}
    </div>
  );
}
