import {
  DEFAULT_LOCALE,
  ENGLISH_STRINGS,
  JAPANESE_STRINGS,
  Locale,
  LOCALE_CONFIGS,
  SUPPORTED_LOCALES,
} from "./constants";
import type { UIString } from "./types";

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

export function getTranslations(
  locale?: Locale | string,
): (template: TemplateStringsArray, ...values: string[]) => string {
  locale = toLocale(locale);

  let strings: Record<UIString, string> = ENGLISH_STRINGS;
  switch (locale) {
    case Locale.JAPANESE:
      strings = JAPANESE_STRINGS;
      break;
  }

  return function t(template: TemplateStringsArray, ...values: string[]): string {
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
    values.forEach((value) => (result = result.replace("{}", value)));

    return result;
  };
}

export function isLocale(value: unknown): value is Locale {
  if (typeof value !== "string" || !value) return false;
  switch (value) {
    case Locale.ENGLISH:
    case Locale.JAPANESE:
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
