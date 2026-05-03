import { CalendarDays, Check, Dumbbell, MapPin, Scissors, Utensils } from "lucide-react";

import { en } from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/get-dictionary";

type ProjectMockupProps = {
  project: {
    title: string;
    industry: string;
    features: readonly string[];
    resultPromise: string;
    slug: string;
  };
  labels?: Dictionary["projectMockup"];
};

const mockupStyles = {
  "barber-studio-website": {
    accent: "bg-emerald-400",
    soft: "bg-emerald-50",
    text: "text-emerald-900",
    border: "border-emerald-200",
    icon: Scissors,
    primaryKey: "bookAppointment",
    statKey: "openToday",
  },
  "fitness-coach-landing-page": {
    accent: "bg-sky-400",
    soft: "bg-sky-50",
    text: "text-sky-900",
    border: "border-sky-200",
    icon: Dumbbell,
    primaryKey: "startCoaching",
    statKey: "onlinePlan",
  },
  "restaurant-website": {
    accent: "bg-rose-400",
    soft: "bg-rose-50",
    text: "text-rose-900",
    border: "border-rose-200",
    icon: Utensils,
    primaryKey: "reserveTable",
    statKey: "menuReady",
  },
} as const;

export function ProjectMockup({ project, labels = en.projectMockup }: ProjectMockupProps) {
  const style =
    mockupStyles[project.slug as keyof typeof mockupStyles] ??
    mockupStyles["barber-studio-website"];
  const Icon = style.icon;

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 p-3 shadow-xl shadow-zinc-950/10">
      <div className="flex items-center gap-1.5 pb-3">
        <span className="size-2.5 rounded-full bg-red-300" />
        <span className="size-2.5 rounded-full bg-amber-300" />
        <span className="size-2.5 rounded-full bg-emerald-300" />
        <div className="ml-3 h-5 flex-1 rounded-full bg-white/10" />
      </div>

      <div className="rounded-lg bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`flex size-9 items-center justify-center rounded-lg ${style.soft} ${style.text}`}
            >
              <Icon className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-zinc-950">
                {project.title}
              </p>
              <p className="text-xs text-zinc-500">{project.industry}</p>
            </div>
          </div>
          <span className={`h-2.5 w-14 rounded-full ${style.accent}`} />
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.62fr]">
          <div className={`rounded-lg border ${style.border} ${style.soft} p-4`}>
            <div className="h-3 w-3/4 rounded-full bg-zinc-950" />
            <div className="mt-3 h-2 w-full rounded-full bg-white" />
            <div className="mt-2 h-2 w-4/5 rounded-full bg-white" />
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-md bg-zinc-950 px-3 py-2 text-[10px] font-semibold text-white">
                {labels[style.primaryKey]}
              </span>
              <span className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-[10px] font-semibold text-zinc-700">
                {labels.viewServices}
              </span>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                <CalendarDays className="size-3.5 text-emerald-700" />
                {labels[style.statKey]}
              </div>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                <MapPin className="size-3.5 text-emerald-700" />
                {labels.mapsContact}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {project.features.slice(0, 4).map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-700"
            >
              <Check className="size-3.5 shrink-0 text-emerald-700" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-3 text-xs leading-5 text-zinc-600">
          {project.resultPromise}
        </div>
      </div>
    </div>
  );
}
