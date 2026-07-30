import { DEFAULT_LOCALE, SUPPORTED_LOCALES, toCode } from "./src/i18n";
import { defineConfig, envField } from "astro/config";
import varlockAstroIntegration from "@varlock/astro-integration";

export default defineConfig({
  build: {
    format: "preserve",
  },
  env: {
    schema: {
      APP_ENV: envField.string({ context: "server", access: "public", default: "development" }),
    },
  },
  i18n: {
    defaultLocale: toCode(DEFAULT_LOCALE),
    locales: SUPPORTED_LOCALES.map(toCode),
  },
  integrations: [varlockAstroIntegration()],
  site: "https://www.griffen.dev",
});
