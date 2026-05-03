import Link from "next/link";
import { ArrowRight, LayoutDashboard, Shield } from "lucide-react";

import { LogoutButton } from "@/components/auth/logout-button";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { TrackedLink } from "@/components/site/tracked-link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { en } from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { defaultLocale, localizedPath } from "@/i18n/locales";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function Navbar({
  locale = defaultLocale,
  dictionary = en,
  localized = false,
  showLanguageSwitcher = false,
}: {
  locale?: Locale;
  dictionary?: Dictionary;
  localized?: boolean;
  showLanguageSwitcher?: boolean;
}) {
  const authState = await getAuthState();
  const nav = dictionary.nav;

  const href = (path: string) => (localized ? localizedPath(locale, path) : path);
  const anchorHref = (hash: string) => (localized ? `/${locale}${hash}` : `/${hash}`);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={href("") || "/"} className="flex items-center gap-3" aria-label={nav.home}>
          <span className="flex size-9 items-center justify-center rounded-lg bg-zinc-950 text-sm font-semibold text-white">
            RW
          </span>
          <span className="text-sm font-semibold tracking-tight text-zinc-950 sm:text-base">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
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
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {showLanguageSwitcher ? (
            <LanguageSwitcher currentLocale={locale} />
          ) : null}
          {authState.isLoggedIn ? (
            <>
              {authState.isAdmin ? (
                <Button
                  asChild
                  variant="outline"
                  className="hidden h-10 rounded-lg bg-white sm:inline-flex"
                >
                  <Link href="/admin">
                    <Shield className="size-4" />
                    {nav.admin}
                  </Link>
                </Button>
              ) : null}
              <Button asChild className="h-10 rounded-lg bg-zinc-950">
                <Link href="/dashboard">
                  <LayoutDashboard className="size-4" />
                  <span className="hidden sm:inline">{nav.dashboard}</span>
                </Link>
              </Button>
              <LogoutButton />
            </>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                className="hidden h-10 rounded-lg bg-white sm:inline-flex"
              >
                <Link href="/login">{nav.login}</Link>
              </Button>
              <Button asChild className="h-10 rounded-lg bg-zinc-950">
                <TrackedLink href={href("/contact")} eventName="navbar_contact_cta_click">
                  <span className="hidden sm:inline">{nav.cta}</span>
                  <span className="sm:hidden">{nav.mobileCta}</span>
                  <ArrowRight className="size-4" />
                </TrackedLink>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

async function getAuthState() {
  if (!isSupabaseConfigured()) {
    return { isLoggedIn: false, isAdmin: false };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { isLoggedIn: false, isAdmin: false };
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    return {
      isLoggedIn: true,
      isAdmin: profile?.role === "admin",
    };
  } catch {
    return { isLoggedIn: false, isAdmin: false };
  }
}
