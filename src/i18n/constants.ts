import type { UIString } from "./types";

export enum Locale {
  ENGLISH = "ENGLISH",
  JAPANESE = "JAPANESE",
}

export const DEFAULT_LOCALE: Locale = Locale.ENGLISH;

export const SUPPORTED_LOCALES = Object.freeze([
  Locale.ENGLISH,
  Locale.JAPANESE,
] as const) satisfies ReadonlyArray<Locale>;

export const LOCALE_CONFIGS = Object.freeze({
  [Locale.ENGLISH]: new Intl.Locale("en"),
  [Locale.JAPANESE]: new Intl.Locale("ja"),
} as const) satisfies Record<Locale, Intl.Locale>;

//----------------------
// Strings
//----------------------

export const ENGLISH_STRINGS = Object.freeze({
  "{} — Griffen Schwiesow": "{} — Griffen Schwiesow",
  "Griffen Schwiesow": "Griffen Schwiesow",
  Languages: "Languages",
  "Page not found": "Page not found",
} as const) satisfies Record<string, string>;

export const JAPANESE_STRINGS = Object.freeze({
  "{} — Griffen Schwiesow": "{}｜グリフィン・シュヴィーゾー",
  "Griffen Schwiesow": "グリフィン・シュヴィーゾー",
  Languages: "言語",
  "Page not found": "ページが見つかりません",
} as const) satisfies Record<UIString, string>;
