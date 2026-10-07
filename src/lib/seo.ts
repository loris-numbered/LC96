import { site } from "./data";

export type Seo = { title: string; description?: string; canonical: string };

export function seo(page: { title?: string | null; description?: string | null; path: string }): Seo {
  return {
    title: page.title ? `${page.title} — ${site.name}` : site.name,
    description: page.description ?? site.description,
    canonical: new URL(page.path, import.meta.env.PUBLIC_SITE_URL).href,
  };
}
