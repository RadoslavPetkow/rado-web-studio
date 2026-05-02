export type ProjectActivityMessage = {
  project_id?: string | null;
  message?: string | null;
  created_at?: string | null;
};

export type ProjectMessageActivity = {
  count: number;
  lastMessagePreview?: string;
  lastMessageAt?: string | null;
};

export function formatDateTime(
  value?: string | null,
  options: { dateOnly?: boolean } = {}
) {
  if (!value) {
    return "Not provided";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not provided";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: options.dateOnly ? undefined : "short",
  }).format(date);
}

export function getMessagePreview(value?: string | null, maxLength = 120) {
  const normalized = value?.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return "No message text";
  }

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`;
}

export function getProjectMessageActivity(
  messages: ProjectActivityMessage[] = []
) {
  const activityByProject = new Map<string, ProjectMessageActivity>();

  for (const message of messages) {
    if (!message.project_id) {
      continue;
    }

    const current = activityByProject.get(message.project_id) || { count: 0 };
    const currentLastTime = current.lastMessageAt
      ? new Date(current.lastMessageAt).getTime()
      : 0;
    const nextTime = message.created_at
      ? new Date(message.created_at).getTime()
      : 0;

    current.count += 1;

    if (!current.lastMessageAt || nextTime >= currentLastTime) {
      current.lastMessageAt = message.created_at;
      current.lastMessagePreview = getMessagePreview(message.message);
    }

    activityByProject.set(message.project_id, current);
  }

  return activityByProject;
}
