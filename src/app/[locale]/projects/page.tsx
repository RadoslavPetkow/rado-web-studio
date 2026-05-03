import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectsPageContent } from "@/app/projects/page";
import { getDictionary } from "@/i18n/get-dictionary";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { isLocale, locales, type Locale } from "@/i18n/locales";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return createLocalizedMetadata(getDictionary(locale), locale, "projects", "/projects");
}

export default async function LocalizedProjectsPage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <ProjectsPageContent
      dictionary={getDictionary(locale as Locale)}
      locale={locale as Locale}
      localized
    />
  );
}
