import {
  DEFAULT_LOCALE,
  ENGLISH_STRINGS,
  JAPANESE_STRINGS,
  Locale,
  SUPPORTED_LOCALES,
} from "./constants";
import { describe, expect, it } from "vitest";
import { getTranslations, toCode, toDisplayName, toLocale } from "./utils";

describe("getTranslations()", () => {
  it("should return a function that gets english strings by default", () => {
    const t = getTranslations();
    expect(t`Page not found`).toBe(ENGLISH_STRINGS["Page not found"]);
  });

  it("should return a function that gets strings for all supported locales", () => {
    SUPPORTED_LOCALES.forEach((locale) => {
      const t = getTranslations(locale);
      const result = t`Page not found`;
      switch (locale) {
        case Locale.ENGLISH:
          expect(result).toBe(ENGLISH_STRINGS["Page not found"]);
          break;
        case Locale.JAPANESE:
          expect(result).toBe(JAPANESE_STRINGS["Page not found"]);
          break;
        default:
          expect(result).toBe("");
      }
    });
  });

  it("should support string interpolation", () => {
    const t = getTranslations();
    const test = "Test";
    expect(t`${test} — Griffen Schwiesow`).toBe("Test — Griffen Schwiesow");
  });

  it("should throw for unknown strings", () => {
    const t = getTranslations();
    expect(() => t`Made up string for testing`).toThrow(
      `Unknown string: "Made up string for testing"`,
    );
  });
});

describe("toCode()", () => {
  it("should return the language code for each supported locale", () => {
    SUPPORTED_LOCALES.forEach((locale) => {
      const result = toCode(locale);
      expect(typeof result).toBe("string");
      switch (locale) {
        case Locale.ENGLISH:
          expect(result).toBe("en");
          break;
        case Locale.JAPANESE:
          expect(result).toBe("ja");
          break;
        default:
          expect(result).toBe("");
      }
    });
  });
});

describe("toDisplayName()", () => {
  it("should return the expected display name for each supported locale", () => {
    SUPPORTED_LOCALES.forEach((locale) => {
      const result = toDisplayName(locale);
      expect(typeof result).toBe("string");
      switch (locale) {
        case Locale.ENGLISH:
          expect(result).toBe("English");
          break;
        case Locale.JAPANESE:
          expect(result).toBe("日本語");
          break;
        default:
          expect(result).toBe("");
      }
    });
  });

  it("should return the expected display name for supported locales in other supported locales", () => {
    expect(toDisplayName(Locale.ENGLISH, Locale.JAPANESE)).toBe("英語");
    expect(toDisplayName(Locale.JAPANESE, Locale.ENGLISH)).toBe("Japanese");
  });
});

describe("toLocale()", () => {
  it("should return DEFAULT_LOCALE for missing or unknown values", () => {
    expect(toLocale()).toBe(DEFAULT_LOCALE);
    expect(toLocale(null as unknown as string)).toBe(DEFAULT_LOCALE);
    expect(toLocale(true as unknown as string)).toBe(DEFAULT_LOCALE);
  });

  it("should return locales for locales", () => {
    SUPPORTED_LOCALES.forEach((locale) => expect(toLocale(locale)).toBe(locale));
  });

  it("should convert codes to locales", () => {
    SUPPORTED_LOCALES.forEach((locale) => {
      const code = toCode(locale);
      expect(toLocale(code)).toBe(locale);
    });
  });
});
