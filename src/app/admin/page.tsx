import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertCircle, BriefcaseBusiness, Inbox, UsersRound } from "lucide-react";

import {
  convertProjectRequestToProject,
  updateProjectRequestStatus,
} from "@/app/admin/actions";
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
  title: "Admin",
  description: "Rado Web Studio admin dashboard foundation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; message?: string }>;
}) {
  const { type, message } = await searchParams;
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
        .select("id,name,email,business_name,business_type,service_needed,budget_range,timeline,message,status,created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("projects")
        .select("id,client_id,title,service_type,description,status,budget_range,created_at,updated_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("profiles")
        .select("id,full_name,email,company_name,role,created_at")
        .order("created_at", { ascending: false }),
    ]);
  const clientById = new Map(
    (clients || []).map((client) => [client.id, client])
  );

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
              Convert qualified requests into client projects once the client
              has registered with the same email address.
            </p>
          </section>

          {message ? <AdminNotice type={type} message={message} /> : null}

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
                <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                  To convert a request into a project, the client must first
                  register with the same email address used in the request.
                </div>
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
                        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                          <RequestDetail label="Email" value={request.email} />
                          <RequestDetail
                            label="Business"
                            value={request.business_name}
                          />
                          <RequestDetail
                            label="Business type"
                            value={request.business_type}
                          />
                          <RequestDetail
                            label="Created"
                            value={formatDate(request.created_at)}
                          />
                        </dl>
                        <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            Message
                          </p>
                          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-zinc-700">
                            {request.message || "No message provided."}
                          </p>
                        </div>
                        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                          <form action={updateProjectRequestStatus}>
                            <input
                              type="hidden"
                              name="requestId"
                              value={request.id}
                            />
                            <input
                              type="hidden"
                              name="status"
                              value="reviewed"
                            />
                            <Button
                              type="submit"
                              variant="outline"
                              className="h-10 w-full rounded-lg bg-white sm:w-auto"
                            >
                              Mark as reviewed
                            </Button>
                          </form>
                          <form action={updateProjectRequestStatus}>
                            <input
                              type="hidden"
                              name="requestId"
                              value={request.id}
                            />
                            <input
                              type="hidden"
                              name="status"
                              value="rejected"
                            />
                            <Button
                              type="submit"
                              variant="destructive"
                              className="h-10 w-full rounded-lg sm:w-auto"
                            >
                              Reject request
                            </Button>
                          </form>
                          <form action={convertProjectRequestToProject}>
                            <input
                              type="hidden"
                              name="requestId"
                              value={request.id}
                            />
                            <Button
                              type="submit"
                              className="h-10 w-full rounded-lg bg-zinc-950 sm:w-auto"
                            >
                              Convert to project
                            </Button>
                          </form>
                        </div>
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
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-sm font-semibold text-zinc-950">
                              {project.title}
                            </p>
                            <p className="mt-1 text-sm text-zinc-500">
                              {getClientLabel(clientById.get(project.client_id))}
                            </p>
                          </div>
                          <StatusBadge status={project.status} />
                        </div>
                        <dl className="mt-4 grid gap-3 text-sm">
                          <RequestDetail
                            label="Service"
                            value={project.service_type || "Digital project"}
                          />
                          <RequestDetail
                            label="Budget"
                            value={project.budget_range}
                          />
                          <RequestDetail
                            label="Created"
                            value={formatDate(project.created_at)}
                          />
                          <RequestDetail
                            label="Updated"
                            value={formatDate(project.updated_at)}
                          />
                        </dl>
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
                          <Link href={`/admin/projects/${project.id}`}>
                            Manage project
                          </Link>
                        </Button>
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

function AdminNotice({
  type,
  message,
}: {
  type?: string;
  message: string;
}) {
  const isSuccess = type === "success";

  return (
    <div
      className={`flex gap-3 rounded-2xl border p-4 text-sm ${
        isSuccess
          ? "border-emerald-200 bg-emerald-50 text-emerald-950"
          : "border-amber-200 bg-amber-50 text-amber-950"
      }`}
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}

function RequestDetail({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </dt>
      <dd className="mt-1 text-zinc-700">{value || "Not provided"}</dd>
    </div>
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

function formatDate(value?: string | null) {
  if (!value) {
    return "Not provided";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getClientLabel(
  client?: {
    full_name?: string | null;
    email?: string | null;
  }
) {
  if (!client) {
    return "Client profile not found";
  }

  return client.full_name || client.email || "Unnamed client";
}
