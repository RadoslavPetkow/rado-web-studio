import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatDateTime } from "@/lib/portal-activity";
import { cn } from "@/lib/utils";

type MessageContext = "client" | "admin";

type ProjectMessage = {
  id: string;
  senderLabel: string;
  message: string;
  createdAt?: string | null;
  isCurrentUser?: boolean;
  isAdminSender?: boolean;
};

export function ProjectMessageThread({
  context,
  projectId,
  messages,
  action,
}: {
  context: MessageContext;
  projectId: string;
  messages: ProjectMessage[];
  action: (formData: FormData) => Promise<void>;
}) {
  const isAdminContext = context === "admin";

  return (
    <Card className="rounded-2xl border-zinc-200 bg-white p-2 shadow-sm">
      <CardHeader>
        <CardTitle>{isAdminContext ? "Project messages" : "Messages"}</CardTitle>
        <CardDescription>
          {messages.length} {messages.length === 1 ? "message" : "messages"}.
          Messages are saved to this project. This MVP does not use realtime
          yet, so refresh the page to see new replies.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        {messages.length ? (
          <div className="grid gap-3">
            {messages.map((item) => (
              <article
                key={item.id}
                className={cn(
                  "rounded-2xl border p-4",
                  item.isAdminSender
                    ? "border-zinc-300 bg-zinc-950 text-white"
                    : "border-zinc-200 bg-zinc-50 text-zinc-950",
                  item.isCurrentUser && !item.isAdminSender
                    ? "border-emerald-200 bg-emerald-50"
                    : ""
                )}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      item.isAdminSender ? "text-white" : "text-zinc-950"
                    )}
                  >
                    {item.senderLabel}
                  </p>
                  <time
                    dateTime={item.createdAt || undefined}
                    className={cn(
                      "text-xs",
                      item.isAdminSender ? "text-zinc-300" : "text-zinc-500"
                    )}
                  >
                    {formatDateTime(item.createdAt)}
                  </time>
                </div>
                <p
                  className={cn(
                    "mt-3 whitespace-pre-line text-sm leading-7",
                    item.isAdminSender ? "text-zinc-100" : "text-zinc-700"
                  )}
                >
                  {item.message}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm leading-6 text-zinc-600">
            <p className="font-medium text-zinc-950">No messages yet</p>
            <p className="mt-1">
              Start the thread with a short project update, question, or reply.
            </p>
          </div>
        )}

        <form action={action} className="grid gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          <input type="hidden" name="projectId" value={projectId} />
          <input type="hidden" name="context" value={context} />
          <div className="grid gap-2">
            <Label htmlFor={`${context}-project-message`}>
              {isAdminContext ? "Admin reply" : "Your message"}
            </Label>
            <Textarea
              id={`${context}-project-message`}
              name="message"
              placeholder={
                isAdminContext
                  ? "Write a clear update or reply for the client..."
                  : "Write your question, feedback, or update..."
              }
              className="min-h-32 bg-white"
              maxLength={2000}
              required
            />
            <p className="text-xs text-zinc-500">
              Keep it focused. Messages are limited to 2000 characters.
            </p>
          </div>
          <Button type="submit" className="h-11 w-full rounded-lg bg-zinc-950 sm:w-fit">
            <Send className="size-4" />
            Send message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
