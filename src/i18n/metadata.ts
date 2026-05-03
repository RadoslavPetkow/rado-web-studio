import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { localizedPath } from "@/i18n/locales";

export type PublicPageKey = keyof Dictionary["metadata"];

export function createLocalizedMetadata(
  dictionary: Dictionary,
  locale: Locale,
  page: PublicPageKey,
  path = ""
): Metadata {
  const metadata = dictionary.metadata[page];
  const url = localizedPath(locale, path);

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url,
      siteName: siteConfig.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
  };
}
