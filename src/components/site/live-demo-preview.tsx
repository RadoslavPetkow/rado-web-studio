import Image from "next/image";
import { ExternalLink } from "lucide-react";

type LiveDemoPreviewProps = {
  project: {
    title: string;
    href: string;
    image: string;
  };
  label: string;
  compact?: boolean;
  eager?: boolean;
};

export function LiveDemoPreview({
  project,
  label,
  compact = false,
  eager = false,
}: LiveDemoPreviewProps) {
  const hostname = new URL(project.href).hostname.replace(".vercel.app", "");

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-950 shadow-2xl shadow-zinc-950/15">
      <div className="flex items-center gap-3 border-b border-white/10 bg-zinc-900 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-300/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="min-w-0 flex-1 truncate rounded-md bg-white/[0.06] px-3 py-1 text-center text-[11px] text-zinc-400">
          {hostname}
        </span>
      </div>
      <div
        className={`group relative overflow-hidden bg-zinc-900 ${
          compact ? "aspect-[1.22/0.92]" : "aspect-[1.34/0.9]"
        }`}
      >
        <Image
          src={project.image}
          alt={`${project.title} website preview`}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes={compact ? "(max-width: 1024px) 100vw, 33vw" : "(max-width: 1280px) 100vw, 47vw"}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-zinc-950/90 via-zinc-950/65 to-transparent px-4 pb-4 pt-12 text-white">
          <span className="rounded-md border border-white/15 bg-zinc-950/55 px-2.5 py-1 text-xs font-medium backdrop-blur">
            {label}
          </span>
          <ExternalLink className="size-4 text-emerald-200" />
        </div>
      </div>
    </div>
  );
}
