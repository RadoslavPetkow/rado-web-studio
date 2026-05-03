export const locales = ["en", "bg", "it"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  bg: "Български",
  it: "Italiano",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(locale: Locale, path = "") {
  const cleanPath = path === "/" ? "" : path;
  return `/${locale}${cleanPath}`;
}
