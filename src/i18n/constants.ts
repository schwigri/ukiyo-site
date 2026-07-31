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
  "/about-me/": "/about-me/",
  "/about-me.html": "/about-me.html",
  "/blog/": "/blog/",
  "/resume/": "/resume/",
  "/resume.html": "/resume.html",
  Home: "Home",
  "About me": "About me",
  Blog: "Blog",
  Résumé: "Résumé",
  "Griffen Schwiesow — {}": "Griffen Schwiesow — {}",
  "{} — Griffen Schwiesow": "{} — Griffen Schwiesow",
  "Griffen Schwiesow": "Griffen Schwiesow",
  "Designer, front-end developer and accessibility specialist":
    "Designer, front-end developer and accessibility specialist",
  Languages: "Languages",
  "Page not found": "Page not found",
  "Skip to navigation": "Skip to navigation",
  "Copyright © 2026 Griffen Schwiesow": "Copyright © 2026 Griffen Schwiesow",
} as const) satisfies Record<string, string>;

export const JAPANESE_STRINGS = Object.freeze({
  "/about-me/": "/ja/profile/",
  "/about-me.html": "/ja/profile.html",
  "/blog/": "/ja/blog/",
  "/resume/": "/ja/shokumukeirekisho/",
  "/resume.html": "/ja/shokumukeirekisho.html",
  Home: "トップ",
  "About me": "プロフィール",
  Blog: "ブログ",
  Résumé: "職務経歴書",
  "Griffen Schwiesow — {}": "グリフィン・シュヴィーゾー｜{}",
  "{} — Griffen Schwiesow": "{}｜グリフィン・シュヴィーゾー",
  "Griffen Schwiesow": "グリフィン・シュヴィーゾー",
  "Designer, front-end developer and accessibility specialist":
    "デザイナー・フロントエンド開発・アクセシビリティ専門",
  Languages: "言語",
  "Page not found": "ページが見つかりません",
  "Skip to navigation": "メニューへスキップ",
  "Copyright © 2026 Griffen Schwiesow": "令和八年 © グリフィン・シュヴィーゾー",
} as const) satisfies Record<UIString, string>;
