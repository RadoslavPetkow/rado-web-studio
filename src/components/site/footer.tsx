import Link from "next/link";
import { Mail } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

export function Footer() {
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
              Modern websites, AI automations, chatbots, client systems, and
              custom software foundations for growing businesses.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:gap-12">
            <div>
              <p className="text-sm font-semibold text-zinc-950">Navigate</p>
              <div className="mt-4 grid gap-3">
                {siteConfig.nav.map((item) => (
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
              <p className="text-sm font-semibold text-zinc-950">Contact</p>
              <div className="mt-4 grid gap-3">
                <Link
                  href="/contact"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
                >
                  Contact
                </Link>
                <Link
                  href="/privacy"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/start"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
                >
                  Project Start Checklist
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
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built for clarity, speed, and long-term growth.</p>
        </div>
      </div>
    </footer>
  );
}
