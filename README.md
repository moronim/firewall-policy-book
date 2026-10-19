# Firewall Policy Management: companion site

Companion site for *Firewall Policy Management in Modern Security Operations* by Maurizio Moroni. Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build), deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Commands

| Command | What it does |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at `localhost:4321/firewall-policy-book/` |
| `npm run build` | Build the site into `./dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run sync -- "/path/to/Firewall Book"` | Refresh Resources, Checklists, Templates, and the change policy download from the manuscript |

## Content

Hand-written pages live in `src/content/docs/` (`index.mdx`, `downloads.md`, `errata.md`, `about.md`). `resources.md`, `checklists.md`, and `templates.md` are generated from Appendices C, D, and E by `npm run sync`, so edit the manuscript and re-sync rather than editing them here.

## Custom domain

Set `SITE` and `BASE` in `astro.config.mjs` (for a custom domain, `BASE` becomes `/`), add `public/CNAME` with the domain, and set the domain under Settings → Pages.
