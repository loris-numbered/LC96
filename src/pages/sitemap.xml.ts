import type { APIRoute } from "astro";
import { projects } from "~/lib/data";

export const GET: APIRoute = ({ site }) => {
  const urls = ["/", ...projects.map((p) => `/projets/${p.slug}`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
