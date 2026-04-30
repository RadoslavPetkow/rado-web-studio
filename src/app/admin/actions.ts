"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

type RequestStatus = "reviewed" | "rejected";

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
