import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";

const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

export default defineConfig({
  site: PUBLIC_SITE_URL,
  // Server-rendered, so a data change needs no rebuild once content moves to a CMS.
  output: "server",
  adapter: vercel(),
  devToolbar: { enabled: false },
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({ context: "client", access: "public", url: true, optional: true }),
    },
  },
  vite: { plugins: [tailwindcss()] },
});
