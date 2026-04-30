import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  new: "border-blue-200 bg-blue-50 text-blue-900",
  reviewed: "border-amber-200 bg-amber-50 text-amber-900",
  converted: "border-emerald-200 bg-emerald-50 text-emerald-900",
  rejected: "border-zinc-200 bg-zinc-50 text-zinc-700",
  in_progress: "border-emerald-200 bg-emerald-50 text-emerald-900",
  waiting_for_client: "border-amber-200 bg-amber-50 text-amber-900",
  completed: "border-zinc-900 bg-zinc-950 text-white",
};

export function StatusBadge({ status }: { status?: string | null }) {
  const label = status ? status.replaceAll("_", " ") : "unknown";

  return (
    <Badge
      variant="outline"
      className={cn("capitalize", statusStyles[status || ""])}
    >
      {label}
    </Badge>
  );
}
