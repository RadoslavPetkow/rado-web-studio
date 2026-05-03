import { bg } from "@/i18n/dictionaries/bg";
import { en } from "@/i18n/dictionaries/en";
import { it } from "@/i18n/dictionaries/it";
import type { Locale } from "@/i18n/locales";

const dictionaries = {
  en,
  bg,
  it,
};

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { readonly [K in keyof T]: Widen<T[K]> }
          : T;

export type Dictionary = Widen<typeof en>;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
