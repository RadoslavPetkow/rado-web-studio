"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";

import { localeLabels, locales, type Locale } from "@/i18n/locales";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white p-1"
      aria-label="Language selector"
    >
      <Languages className="ml-2 size-4 text-zinc-500" aria-hidden="true" />
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${pathWithoutLocale}`}
          className={cn(
            "rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors",
            locale === currentLocale
              ? "bg-zinc-950 text-white"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
          )}
          aria-current={locale === currentLocale ? "page" : undefined}
        >
          <span className="hidden lg:inline">{localeLabels[locale]}</span>
          <span className="lg:hidden">{locale.toUpperCase()}</span>
        </Link>
      ))}
    </div>
  );
}

function getPathWithoutLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (locales.includes(firstSegment as Locale)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "";
  }

  if (!segments.length) {
    return "";
  }

  return `/${segments.join("/")}`;
}
