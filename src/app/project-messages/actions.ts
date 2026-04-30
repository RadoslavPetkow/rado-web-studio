"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

const maxMessageLength = 2000;

type MessageContext = "client" | "admin";

function getRedirectPath(projectId: string, context: MessageContext) {
  return context === "admin"
    ? `/admin/projects/${projectId}`
    : `/dashboard/projects/${projectId}`;
}

function redirectWithMessage({
  context,
  projectId,
  type,
  message,
}: {
  context: MessageContext;
  projectId: string;
  type: "success" | "error";
  message: string;
}): never {
  redirect(
    `${getRedirectPath(projectId, context)}?type=${type}&message=${encodeURIComponent(
      message
    )}`
  );
}

export async function addProjectMessage(formData: FormData) {
  const projectId = formData.get("projectId");
  const contextValue = formData.get("context");
  const messageValue = formData.get("message");

  if (!projectId || typeof projectId !== "string") {
    throw new Error("Missing project id.");
  }

  const context: MessageContext = contextValue === "admin" ? "admin" : "client";

  if (!messageValue || typeof messageValue !== "string") {
    redirectWithMessage({
      context,
      projectId,
      type: "error",
      message: "Write a message before sending.",
    });
  }

  const message = messageValue.trim();

  if (!message) {
    redirectWithMessage({
      context,
      projectId,
      type: "error",
      message: "Write a message before sending.",
    });
  }

  if (message.length > maxMessageLength) {
    redirectWithMessage({
      context,
      projectId,
      type: "error",
      message: "Messages must be 2000 characters or fewer.",
    });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=${getRedirectPath(projectId, context)}`);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const isAdmin = profile?.role === "admin";

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id,client_id")
    .eq("id", projectId)
    .maybeSingle();

  if (projectError || !project) {
    redirectWithMessage({
      context,
      projectId,
      type: "error",
      message: "Project not found or you do not have access to it.",
    });
  }

  if (!isAdmin && project.client_id !== user.id) {
    redirectWithMessage({
      context,
      projectId,
      type: "error",
      message: "You can only message projects assigned to your account.",
    });
  }

  const { error } = await supabase.from("messages").insert({
    project_id: projectId,
    sender_id: user.id,
    message,
  });

  if (error) {
    redirectWithMessage({
      context,
      projectId,
      type: "error",
      message: error.message,
    });
  }

  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath(`/admin/projects/${projectId}`);
  redirectWithMessage({
    context,
    projectId,
    type: "success",
    message: "Message sent.",
  });
}
