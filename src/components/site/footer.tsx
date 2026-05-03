import Link from "next/link";
import { Mail } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { en } from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { defaultLocale, localizedPath } from "@/i18n/locales";

export function Footer({
  locale = defaultLocale,
  dictionary = en,
  localized = false,
}: {
  locale?: Locale;
  dictionary?: Dictionary;
  localized?: boolean;
}) {
  const footer = dictionary.footer;
  const nav = dictionary.nav;
  const href = (path: string) => (localized ? localizedPath(locale, path) : path);
  const anchorHref = (hash: string) => (localized ? `/${locale}${hash}` : `/${hash}`);

  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-zinc-950 text-sm font-semibold text-white">
                RW
              </span>
              <span className="font-semibold tracking-tight text-zinc-950">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-600">
              {footer.description}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:gap-12">
            <div>
              <p className="text-sm font-semibold text-zinc-950">{footer.navigate}</p>
              <div className="mt-4 grid gap-3">
                {[
                  { label: nav.home, href: href("") || "/" },
                  { label: nav.services, href: anchorHref("#services") },
                  { label: nav.projects, href: href("/projects") },
                  { label: nav.pricing, href: anchorHref("#pricing") },
                  { label: nav.faq, href: anchorHref("#faq") },
                  { label: nav.contact, href: href("/contact") },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-950">{footer.contact}</p>
              <div className="mt-4 grid gap-3">
                <Link
                  href={href("/contact")}
                  className="text-sm font-semibold text-zinc-950 transition-colors hover:text-emerald-800"
                >
                  {footer.bookCall}
                </Link>
                <Link
                  href={href("/contact")}
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
                >
                  {footer.contact}
                </Link>
                <Link
                  href={href("/privacy")}
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
                >
                  {footer.privacy}
                </Link>
                <Link
                  href={href("/terms")}
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
                >
                  {footer.terms}
                </Link>
                <Link
                  href={href("/start")}
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
                >
                  {footer.start}
                </Link>
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-950"
                >
                  <Mail className="size-4" />
                  {siteConfig.email}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {footer.rights}
          </p>
          <p>{footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
