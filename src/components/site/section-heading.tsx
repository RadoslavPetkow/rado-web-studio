import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      <Badge
        variant="outline"
        className={cn(
          "mb-4",
          tone === "dark"
            ? "border-white/10 bg-white/10 text-emerald-200"
            : "border-emerald-900/15 bg-emerald-50 text-emerald-900"
        )}
      >
        {eyebrow}
      </Badge>
      <h2
        className={cn(
          "text-3xl font-semibold tracking-tight sm:text-4xl",
          tone === "dark" ? "text-white" : "text-zinc-950"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-4 text-base leading-7 sm:text-lg",
          tone === "dark" ? "text-zinc-300" : "text-zinc-600"
        )}
      >
        {description}
      </p>
    </div>
  );
}
