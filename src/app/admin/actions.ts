"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

type RequestStatus = "reviewed" | "rejected";
const allowedProjectStatuses = [
  "new",
  "in_progress",
  "waiting_for_client",
  "completed",
] as const;

type ProjectStatus = (typeof allowedProjectStatuses)[number];

async function requireAdmin() {
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

  return supabase;
}

function getRequestId(formData: FormData) {
  const requestId = formData.get("requestId");

  if (!requestId || typeof requestId !== "string") {
    throw new Error("Missing request id.");
  }

  return requestId;
}

export async function updateProjectRequestStatus(formData: FormData) {
  const supabase = await requireAdmin();
  const requestId = getRequestId(formData);
  const status = formData.get("status");

  if (status !== "reviewed" && status !== "rejected") {
    redirect("/admin?type=error&message=Invalid request status.");
  }

  const nextStatus: RequestStatus = status;

  const { error } = await supabase
    .from("project_requests")
    .update({ status: nextStatus })
    .eq("id", requestId);

  if (error) {
    redirect(
      `/admin?type=error&message=${encodeURIComponent(error.message)}`
    );
  }

  revalidatePath("/admin");
  redirect(
    `/admin?type=success&message=${encodeURIComponent(
      `Request marked as ${nextStatus}.`
    )}`
  );
}

export async function convertProjectRequestToProject(formData: FormData) {
  const supabase = await requireAdmin();
  const requestId = getRequestId(formData);

  const { data: request, error: requestError } = await supabase
    .from("project_requests")
    .select(
      "id,name,email,business_name,business_type,service_needed,budget_range,timeline,message,status"
    )
    .eq("id", requestId)
    .maybeSingle();

  if (requestError || !request) {
    redirect("/admin?type=error&message=Request not found.");
  }

  const { data: clientProfile, error: profileError } = await supabase
    .from("profiles")
    .select("id,email,full_name")
    .ilike("email", request.email)
    .maybeSingle();

  if (profileError) {
    redirect(
      `/admin?type=error&message=${encodeURIComponent(profileError.message)}`
    );
  }

  if (!clientProfile) {
    redirect(
      `/admin?type=error&message=${encodeURIComponent(
        "No registered client found with this email. Ask the client to create an account first, then convert the request."
      )}`
    );
  }

  const serviceType = request.service_needed || "Digital project";
  const businessName = request.business_name || request.name;
  const title = `${serviceType} for ${businessName}`;
  const description = [
    request.message ? `Original request:\n${request.message}` : null,
    request.business_type ? `Business type: ${request.business_type}` : null,
    request.timeline ? `Timeline: ${request.timeline}` : null,
    `Contact email: ${request.email}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const { error: projectError } = await supabase.from("projects").insert({
    client_id: clientProfile.id,
    title,
    service_type: serviceType,
    description,
    budget_range: request.budget_range,
    status: "new",
  });

  if (projectError) {
    redirect(
      `/admin?type=error&message=${encodeURIComponent(projectError.message)}`
    );
  }

  const { error: updateError } = await supabase
    .from("project_requests")
    .update({ status: "converted" })
    .eq("id", request.id);

  if (updateError) {
    redirect(
      `/admin?type=error&message=${encodeURIComponent(updateError.message)}`
    );
  }

  revalidatePath("/admin");
  revalidatePath("/dashboard");
  redirect(
    `/admin?type=success&message=${encodeURIComponent(
      `Project created for ${clientProfile.email}.`
    )}`
  );
}

export async function updateProjectDetails(formData: FormData) {
  const supabase = await requireAdmin();
  const projectId = formData.get("projectId");
  const title = formData.get("title");
  const serviceType = formData.get("serviceType");
  const budgetRange = formData.get("budgetRange");
  const status = formData.get("status");
  const description = formData.get("description");

  if (!projectId || typeof projectId !== "string") {
    throw new Error("Missing project id.");
  }

  if (!title || typeof title !== "string" || !title.trim()) {
    redirect(
      `/admin/projects/${projectId}?type=error&message=${encodeURIComponent(
        "Project title is required."
      )}`
    );
  }

  if (
    typeof status !== "string" ||
    !allowedProjectStatuses.includes(status as ProjectStatus)
  ) {
    redirect(
      `/admin/projects/${projectId}?type=error&message=${encodeURIComponent(
        "Invalid project status."
      )}`
    );
  }

  const { error } = await supabase
    .from("projects")
    .update({
      title: title.trim(),
      service_type: typeof serviceType === "string" ? serviceType.trim() : null,
      budget_range: typeof budgetRange === "string" ? budgetRange.trim() : null,
      status,
      description: typeof description === "string" ? description.trim() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", projectId);

  if (error) {
    redirect(
      `/admin/projects/${projectId}?type=error&message=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/projects/${projectId}`);
  redirect(
    `/admin/projects/${projectId}?type=success&message=${encodeURIComponent(
      "Project updated successfully."
    )}`
  );
}
