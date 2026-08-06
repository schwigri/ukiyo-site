import {
  DEFAULT_LOCALE,
  ENGLISH_STRINGS,
  JAPANESE_STRINGS,
  KOREAN_STRINGS,
  Locale,
  LOCALE_CONFIGS,
  PATHNAMES,
  SUPPORTED_LOCALES,
} from "./constants";
import type { UIString, UITranslation } from "./types";

//----------------------
// Local helpers
//----------------------

const displayNamesCache: Map<Locale, Intl.DisplayNames> = new Map<Locale, Intl.DisplayNames>();

function newIntlDisplayNames(locale: Locale): Intl.DisplayNames {
  return new Intl.DisplayNames(LOCALE_CONFIGS[locale], { type: "language" });
}

//----------------------
// Public APIs
//----------------------

export function getTranslations(locale?: Locale | string): {
  s: (template: TemplateStringsArray, ...values: string[]) => string;
  t: (template: TemplateStringsArray, ...values: string[]) => UITranslation;
} {
  locale = toLocale(locale);

  let strings: Record<UIString, UITranslation> = ENGLISH_STRINGS;
  switch (locale) {
    case Locale.JAPANESE:
      strings = JAPANESE_STRINGS;
      break;
    case Locale.KOREAN:
      strings = KOREAN_STRINGS;
      break;
  }

  function t(template: TemplateStringsArray, ...values: string[]): UITranslation {
    // Construct the key, replacing empty strings with {} as the
    // chosen standard for string interpolation values
    const key = template.map((value) => (value === "" ? "{}" : value)).join("");
    if (!isUIString(key)) {
      throw new Error(`Unknown string: "${key}"`);
    }

    // Check for known strings using the constructed key
    let result = strings[key];
    if (!result) {
      throw new Error(`Missing ${locale} translation for key "${key}"`);
    }

    // Replace placeholders with actual values
    values.forEach((value) => {
      if (typeof result === "string") {
        result = result.replace("{}", value);
      } else {
        result.forEach((resultPiece) => {
          if (typeof resultPiece === "string") {
            resultPiece = resultPiece.replace("{}", value);
          } else {
            resultPiece.rb = resultPiece.rb.replace("{}", value);
            resultPiece.rt = resultPiece.rt.replace("{}", value);
          }
        });
      }
    });

    return result;
  }

  function s(template: TemplateStringsArray, ...values: string[]): string {
    // Construct the key, replacing empty strings with {} as the
    // chosen standard for string interpolation values
    const key = template.map((value) => (value === "" ? "{}" : value)).join("");
    if (!isUIString(key)) {
      throw new Error(`Unknown string: "${key}"`);
    }

    // Check for known strings using the constructed key
    let result = strings[key];
    if (!result) {
      throw new Error(`Missing ${locale} translation for key "${key}"`);
    }

    // Replace placeholders with actual values
    values.forEach((value) => {
      if (typeof result === "string") {
        result = result.replace("{}", value);
      } else {
        result.forEach((resultPiece) => {
          if (typeof resultPiece === "string") {
            resultPiece = resultPiece.replace("{}", value);
          } else {
            resultPiece.rb = resultPiece.rb.replace("{}", value);
            resultPiece.rt = resultPiece.rt.replace("{}", value);
          }
        });
      }
    });

    return typeof result === "string"
      ? result
      : result
          .map((resultPiece) =>
            typeof resultPiece === "string"
              ? resultPiece
              : locale === Locale.KOREAN
                ? resultPiece.rt
                : resultPiece.rb,
          )
          .join("");
  }

  return { s, t };
}

export function isLocale(value: unknown): value is Locale {
  if (typeof value !== "string" || !value) return false;
  switch (value) {
    case Locale.ENGLISH:
    case Locale.JAPANESE:
    case Locale.KOREAN:
      return true;
    default:
      return false;
  }
}

export function isUIString(value: unknown): value is UIString {
  if (typeof value !== "string" || !value) return false;
  return value in ENGLISH_STRINGS;
}

export function toCode(locale: Locale): string {
  return LOCALE_CONFIGS[locale].minimize().baseName;
}

export function toDisplayName(locale: Locale, baseLocale?: Locale): string {
  baseLocale = baseLocale ?? locale;

  let displayNames = displayNamesCache.get(baseLocale);
  if (!displayNames) {
    displayNames = newIntlDisplayNames(baseLocale);
    displayNamesCache.set(baseLocale, displayNames);
  }

  const result = displayNames.of(toCode(locale));
  if (!result) {
    throw new Error(`Invalid display name "${result}" for locale "${locale}"`);
  }

  return result;
}

export function toLocale(value?: Locale | string): Locale {
  if (!value) return DEFAULT_LOCALE;
  if (isLocale(value)) return value;

  for (const locale of SUPPORTED_LOCALES) {
    if (toCode(locale) === value) return locale;
  }

  return DEFAULT_LOCALE;
}

export function getLocaleFromPathname(pathname: string): Locale {
  const candidates = SUPPORTED_LOCALES.filter((x) => x !== DEFAULT_LOCALE);
  for (const supportedLocale of candidates) {
    const prefix = `/${toCode(supportedLocale)}/`;
    if (pathname === prefix || pathname.startsWith(prefix)) {
      return supportedLocale;
    }
  }

  return DEFAULT_LOCALE;
}

export function translatePathname(pathname: string, targetLocale: Locale): string | undefined {
  switch (pathname) {
    case "/about-me/":
      pathname = "/about-me.html";
      break;
    case "/resume/":
      pathname = "/resume.html";
      break;
    case "/ja/profile/":
      pathname = "/ja/profile.html";
      break;
    case "/ja/shokumukeirekisho/":
      pathname = "/ja/shokumukeirekisho.html";
      break;
  }
  const sourceLocale = getLocaleFromPathname(pathname);
  if (sourceLocale === targetLocale) return pathname;

  for (const pathInfo of PATHNAMES) {
    if (pathInfo[sourceLocale] === pathname) {
      return pathInfo[targetLocale];
    }
  }

  return undefined;
}
