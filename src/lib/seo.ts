import { site } from "./data";

export type Seo = { title: string; description?: string; canonical: string };

export function seo(page: {
  title?: string | null;
  description?: string | null;
  url: URL;
}): Seo {
  return {
    title: page.title ? `${page.title} — ${site.name}` : site.name,
    description: page.description ?? site.description,
    canonical: new URL(page.url.pathname, import.meta.env.PUBLIC_SITE_URL || page.url.origin).href,
  };
}
