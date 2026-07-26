import { DEFAULT_LOCALE, SUPPORTED_LOCALES, toCode } from "./src/i18n";
import { defineConfig } from "astro/config";

export default defineConfig({
  i18n: {
    defaultLocale: toCode(DEFAULT_LOCALE),
    locales: SUPPORTED_LOCALES.map(toCode),
  },
  site: "https://www.griffen.dev",
});
