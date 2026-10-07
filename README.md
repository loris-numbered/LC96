# LC96

Portfolio built with [Astro](https://astro.build). Content lives in `src/data.json` for now; a CMS can
replace it later behind `src/lib/data.ts`.

## Stack

- Astro 7, server-rendered, deployed on Vercel.
- Tailwind CSS v4 with a fluid grid plugin (`grid-container`, `span-w-*`); press **G** in dev to see the grid.
- Vanilla TypeScript custom elements for client behavior (smooth scroll, looping list, parallax).

## Run it

```bash
cp .env.example .env
npm install
npm run dev            # http://localhost:4321
```

`npm run check` type-checks and lints, `npm run format` fixes what it can.

## Where things are

```
src/
  data.json     site, projects, about
  lib/          data (typed access to data.json), seo
  pages/        index (home), 404, sitemap.xml
  layouts/      Base.astro: <head>, nav, footer
  components/   Nav, Footer, Grid, Parallax, Lenis (smooth scroll + InfiniteList)
  styles/       Tailwind entry, fonts, colors, global
tailwind.config.mjs   type scale, families, grid
```
