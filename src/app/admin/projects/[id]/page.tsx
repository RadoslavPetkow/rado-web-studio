import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CalendarDays, Save, UserRound } from "lucide-react";

import { updateProjectDetails } from "@/app/admin/actions";
import { addProjectMessage } from "@/app/project-messages/actions";
import { ProjectMessageThread } from "@/components/portal/project-message-thread";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { formatDateTime } from "@/lib/portal-activity";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Manage Project",
  description: "Admin project management for Rado Web Studio.",
  robots: {
    index: false,
    follow: false,
  },
};

const projectStatuses = [
  { value: "new", label: "New" },
  { value: "in_progress", label: "In progress" },
  { value: "waiting_for_client", label: "Waiting for client" },
  { value: "completed", label: "Completed" },
];

export default async function AdminProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string; message?: string }>;
}) {
  const { id } = await params;
  const { type, message } = await searchParams;
  const isConfigured = isSupabaseConfigured();

  if (!isConfigured) {
    return <AdminProjectShell main={<SetupNotice />} />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=/admin/projects/${id}`);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  const { data: project } = await supabase
    .from("projects")
    .select("id,client_id,title,service_type,description,budget_range,status,created_at,updated_at")
    .eq("id", id)
    .maybeSingle();

  if (!project) {
    notFound();
  }

  const { data: clientProfile } = await supabase
    .from("profiles")
    .select("full_name,email,company_name,phone")
    .eq("id", project.client_id)
    .maybeSingle();

  const { data: messages } = await supabase
    .from("messages")
    .select("id,sender_id,message,created_at")
    .eq("project_id", project.id)
    .order("created_at", { ascending: true });

  const senderIds = Array.from(
    new Set((messages || []).map((item) => item.sender_id).filter(Boolean))
  );
  const { data: senderProfiles } = senderIds.length
    ? await supabase
        .from("profiles")
        .select("id,full_name,email,role")
        .in("id", senderIds)
    : { data: [] };
  const senderById = new Map(
    (senderProfiles || []).map((sender) => [sender.id, sender])
  );
  const projectMessages =
    messages?.map((item) => {
      const sender = senderById.get(item.sender_id);
      const isCurrentUser = item.sender_id === user.id;
      const isAdminSender = sender?.role === "admin";

      return {
        id: item.id,
        senderLabel: getAdminSenderLabel({ sender, isCurrentUser }),
        message: item.message,
        createdAt: item.created_at,
        isCurrentUser,
        isAdminSender,
      };
    }) || [];

  return (
    <AdminProjectShell
      main={
        <div className="grid gap-8">
          <div>
            <Button
              asChild
              variant="outline"
              className="mb-6 h-10 rounded-lg bg-white"
            >
              <Link href="/admin">
                <ArrowLeft className="size-4" />
                Back to admin
              </Link>
            </Button>
            <Badge
              variant="outline"
              className="mb-5 border-emerald-900/15 bg-emerald-50 text-emerald-900"
            >
              Manage project
            </Badge>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  {project.title}
                </h1>
                <p className="mt-4 text-base leading-7 text-zinc-600">
                  Update the client-facing project details and current status.
                </p>
              </div>
              <StatusBadge status={project.status} />
            </div>
          </div>

          {message ? <AdminProjectNotice type={type} message={message} /> : null}

          <section className="grid gap-5 lg:grid-cols-[1fr_0.42fr]">
            <Card className="rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
              <CardHeader>
                <CardTitle>Edit project details</CardTitle>
                <CardDescription>
                  Clients will see these fields in their dashboard and project
                  detail page.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={updateProjectDetails} className="grid gap-5">
                  <input type="hidden" name="projectId" value={project.id} />

                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={project.title}
                      className="h-11 bg-white"
                      required
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="serviceType">Service type</Label>
                      <Input
                        id="serviceType"
                        name="serviceType"
                        defaultValue={project.service_type || ""}
                        className="h-11 bg-white"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="budgetRange">Budget range</Label>
                      <Input
                        id="budgetRange"
                        name="budgetRange"
                        defaultValue={project.budget_range || ""}
                        className="h-11 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      name="status"
                      defaultValue={project.status || "new"}
                      className="h-11 rounded-lg border border-input bg-white px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {projectStatuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={project.description || ""}
                      className="min-h-44 bg-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-11 w-full rounded-lg bg-zinc-950 sm:w-fit"
                  >
                    <Save className="size-4" />
                    Save project updates
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-5">
              <Card className="rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
                <CardHeader>
                  <UserRound className="size-5 text-emerald-700" />
                  <CardTitle>Client profile</CardTitle>
                  <CardDescription>
                    Linked client account for this project.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 text-sm text-zinc-600">
                  <p>Name: {clientProfile?.full_name || "Not added"}</p>
                  <p>Email: {clientProfile?.email || "Not available"}</p>
                  <p>Company: {clientProfile?.company_name || "Not added"}</p>
                  <p>Phone: {clientProfile?.phone || "Not added"}</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
                <CardHeader>
                  <CalendarDays className="size-5 text-emerald-700" />
                  <CardTitle>Project metadata</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 text-sm text-zinc-600">
                  <p>Created: {formatDateTime(project.created_at)}</p>
                  <p>Updated: {formatDateTime(project.updated_at)}</p>
                  <p>Project ID: {project.id}</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <ProjectMessageThread
            context="admin"
            projectId={project.id}
            messages={projectMessages}
            action={addProjectMessage}
          />
        </div>
      }
    />
  );
}

function AdminProjectShell({ main }: { main: React.ReactNode }) {
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

function AdminProjectNotice({
  type,
  message,
}: {
  type?: string;
  message: string;
}) {
  const isSuccess = type === "success";

  return (
    <div
      className={`rounded-2xl border p-4 text-sm ${
        isSuccess
          ? "border-emerald-200 bg-emerald-50 text-emerald-950"
          : "border-amber-200 bg-amber-50 text-amber-950"
      }`}
    >
      {message}
    </div>
  );
}

function getAdminSenderLabel({
  sender,
  isCurrentUser,
}: {
  sender?: {
    full_name?: string | null;
    email?: string | null;
    role?: string | null;
  };
  isCurrentUser: boolean;
}) {
  if (sender?.role === "admin") {
    return isCurrentUser ? "You / Admin" : "Rado Web Studio / Admin";
  }

  return sender?.full_name || sender?.email || "Client";
}
