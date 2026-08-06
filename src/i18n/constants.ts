import type { UIString } from "./types";

export enum Locale {
  ENGLISH = "ENGLISH",
  JAPANESE = "JAPANESE",
  KOREAN = "KOREAN",
}

export const DEFAULT_LOCALE: Locale = Locale.ENGLISH;

export const SUPPORTED_LOCALES = Object.freeze([
  Locale.ENGLISH,
  Locale.JAPANESE,
  Locale.KOREAN,
] as const) satisfies ReadonlyArray<Locale>;

export const LOCALE_CONFIGS = Object.freeze({
  [Locale.ENGLISH]: new Intl.Locale("en"),
  [Locale.JAPANESE]: new Intl.Locale("ja"),
  [Locale.KOREAN]: new Intl.Locale("ko"),
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
  "Copyright © 2026": "Copyright © 2026",
  "PGP key": "PGP key",
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
  "Copyright © 2026": "令和八年 ©",
  "PGP key": "PGPキー",
} as const) satisfies Record<UIString, string>;

export const KOREAN_STRINGS = Object.freeze({
  "/about-me/": "/ko/sogae/",
  "/about-me.html": "/ko/sogae.html",
  "/blog/": "/ko/blog/",
  "/resume/": "/ko/iryeokseo/",
  "/resume.html": "/ko/iryeokseo.html",
  Home: "홈",
  "About me": "소개",
  Blog: "블로그",
  Résumé: "이력서",
  "Griffen Schwiesow — {}": "그리핀 슈비조 | {}",
  "{} — Griffen Schwiesow": "{} | 그리핀 슈비조",
  "Griffen Schwiesow": "그리핀 슈비조",
  "Designer, front-end developer and accessibility specialist":
    "디자이너·프론트엔드 개발자·접근성 전문가",
  Languages: "언어",
  "Page not found": "페이지를 찾을 수 없습니다",
  "Skip to navigation": "탐색으로 건너뛰기",
  "Copyright © 2026 Griffen Schwiesow": "2026 © 그리핀 슈비조",
  "Copyright © 2026": "2026 ©",
  "PGP key": "PGP 키",
} as const) satisfies Record<UIString, string>;

export const PATHNAMES = Object.freeze([
  { [Locale.ENGLISH]: "/", [Locale.JAPANESE]: "/ja/", [Locale.KOREAN]: "/ko/" },
  {
    [Locale.ENGLISH]: "/about-me.html",
    [Locale.JAPANESE]: "/ja/profile.html",
    [Locale.KOREAN]: "/ko/sogae.html",
  },
  { [Locale.ENGLISH]: "/blog/", [Locale.JAPANESE]: "/ja/blog/", [Locale.KOREAN]: "/ko/blog/" },
  {
    [Locale.ENGLISH]: "/resume.html",
    [Locale.JAPANESE]: "/ja/shokumukeirekisho.html",
    [Locale.KOREAN]: "/ko/iryeokseo.html",
  },
] as const) satisfies ReadonlyArray<Record<Locale, string>>;
