# Bridget Recipes (Astro)

Simple, static recipe site inspired by a photography-forward layout with seasonal navigation and tag filtering.

## Why this setup

- Minimal dependencies (`astro` only).
- Recipes are simple Markdown files in `src/pages/recipes`.
- Seasons are first-class and also work as tags.
- Styling is in one file (`src/styles.css`) to keep customization easy.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Add a recipe

1. Create a new `.md` file in `src/pages/recipes`.
2. Add frontmatter fields:
   - `title`
   - `date` (`YYYY-MM-DD`)
   - `season` (`spring|summer|fall|winter`)
   - `tags` (list)
   - `image` (URL or local path)
3. Add short recipe intro text below frontmatter.

Your new recipe will appear automatically in:
- All recipes page
- Any matching tag page
- Any matching season page (`/tags/spring`, etc.)
