import { DEFAULT_LOCALE, SUPPORTED_LOCALES, toCode } from "./src/i18n";
import { defineConfig, envField } from "astro/config";
import { ENV } from "varlock/env";
import varlockAstroIntegration from "@varlock/astro-integration";

export default defineConfig({
  build: {
    format: ENV.APP_ENV === "development" ? "directory" : "preserve",
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
  trailingSlash: ENV.APP_ENV === "development" ? "ignore" : "always",
});
