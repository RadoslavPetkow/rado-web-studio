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
  const visibleFeatures = project.features.slice(0, 4);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-3 shadow-2xl shadow-zinc-950/20 sm:p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(52,211,153,0.22),transparent_34%),radial-gradient(circle_at_90%_70%,rgba(14,165,233,0.16),transparent_30%)]" />
      <div className="relative flex items-center gap-1.5 pb-3">
        <span className="size-2.5 rounded-full bg-red-300" />
        <span className="size-2.5 rounded-full bg-amber-300" />
        <span className="size-2.5 rounded-full bg-emerald-300" />
        <div className="ml-3 flex h-6 flex-1 items-center rounded-full border border-white/10 bg-white/10 px-3">
          <span className="h-1.5 w-24 max-w-[45%] rounded-full bg-white/20" />
        </div>
      </div>

      <div className="relative rounded-2xl border border-white/10 bg-white p-3 sm:p-4">
        <div className="flex flex-col gap-3 border-b border-zinc-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${style.soft} ${style.text}`}
            >
              <Icon className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-zinc-950">
                {project.title}
              </p>
              <p className="text-xs text-zinc-500">{project.industry}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-8 rounded-full bg-zinc-200" />
            <span className="h-2 w-10 rounded-full bg-zinc-200" />
            <span className={`h-2 w-12 rounded-full ${style.accent}`} />
          </div>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-3 sm:p-4">
          <div className={`absolute inset-x-0 top-0 h-20 ${style.soft}`} />
          <div className="relative grid gap-4 xl:grid-cols-[1fr_0.42fr]">
            <div className="min-w-0 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-lg shadow-zinc-950/5 backdrop-blur">
              <div className={`mb-4 h-1.5 w-16 rounded-full ${style.accent}`} />
              <div className="h-4 w-4/5 rounded-full bg-zinc-950" />
              <div className="mt-3 h-2.5 w-full rounded-full bg-zinc-200" />
              <div className="mt-2 h-2.5 w-3/4 rounded-full bg-zinc-200" />
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <span className={`h-14 rounded-xl border ${style.border} ${style.soft}`} />
                <span className="h-14 rounded-xl border border-zinc-200 bg-zinc-50" />
                <span className="h-14 rounded-xl border border-zinc-200 bg-zinc-50" />
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <span className="rounded-lg bg-zinc-950 px-3 py-2 text-center text-[10px] font-semibold leading-4 text-white">
                  {labels[style.primaryKey]}
                </span>
                <span className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-center text-[10px] font-semibold leading-4 text-zinc-700">
                  {labels.viewServices}
                </span>
              </div>
            </div>

            <div className="grid min-w-0 gap-2 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl border border-white/80 bg-white/90 p-3 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                  <CalendarDays className="size-3.5 text-emerald-700" />
                  <span className="min-w-0">{labels[style.statKey]}</span>
                </div>
                <div className="mt-3 grid gap-1.5">
                  <span className="h-2 rounded-full bg-zinc-200" />
                  <span className="h-2 w-2/3 rounded-full bg-zinc-200" />
                </div>
              </div>
              <div className="rounded-2xl border border-white/80 bg-white/90 p-3 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                  <MapPin className="size-3.5 text-emerald-700" />
                  <span className="min-w-0">{labels.mapsContact}</span>
                </div>
                <div className="mt-3 h-12 rounded-lg bg-[linear-gradient(135deg,#e4e4e7,#f4f4f5)]" />
              </div>
            </div>
          </div>

          <div className="relative mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/80 bg-white/90 p-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className={`size-8 rounded-xl ${style.soft}`} />
                  <div className="min-w-0 flex-1">
                    <span className="block h-2 rounded-full bg-zinc-900" />
                    <span className="mt-2 block h-2 w-2/3 rounded-full bg-zinc-200" />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  <span className={`h-7 rounded-lg ${style.accent}`} />
                  <span className="h-7 rounded-lg bg-zinc-200" />
                  <span className="h-7 rounded-lg bg-zinc-200" />
                </div>
              </div>
              <div className="rounded-2xl border border-white/80 bg-white/90 p-3 shadow-sm">
                <div className="h-2 w-1/2 rounded-full bg-zinc-900" />
                <div className="mt-3 grid gap-2">
                  <span className="h-2 rounded-full bg-zinc-200" />
                  <span className="h-2 w-4/5 rounded-full bg-zinc-200" />
                  <span className={`h-8 rounded-xl ${style.soft}`} />
                </div>
              </div>
            </div>
            <div className="w-full max-w-32 justify-self-end rounded-2xl border-4 border-zinc-950 bg-white p-2 shadow-xl shadow-zinc-950/20 sm:max-w-36">
              <div className={`h-10 rounded-lg ${style.soft}`} />
              <div className="mt-2 h-1.5 rounded-full bg-zinc-950" />
              <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-zinc-200" />
              <div className={`mt-2 h-4 rounded-md ${style.accent}`} />
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {visibleFeatures.map((feature) => (
            <div
              key={feature}
              className="flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium leading-4 text-zinc-700 shadow-sm"
            >
              <Check className="size-3.5 shrink-0 text-emerald-700" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs leading-5 text-zinc-600">
          {project.resultPromise}
        </div>
      </div>
    </div>
  );
}
