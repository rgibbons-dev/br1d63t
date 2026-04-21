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

## Layout behavior

- Desktop/tablet (`>=900px`): 4 cards per row.
- Mobile (`<900px`): 1 card per row.

## Podman container

Use the included `Containerfile` to get a CLI environment with:
- Node + npm
- Python + `uv`/`uvx`
- Chromium and common browser libs for screenshot tooling

Build and run:

```bash
podman build -t bridget-recipes-dev -f Containerfile .
podman run --rm -it -v "$PWD:/workspace" -w /workspace bridget-recipes-dev bash
```

Then inside container:

```bash
npm install
npm run build
uvx --version
```

## Environment troubleshooting

If `npm install` fails with a `403` in a managed container, that is typically an environment policy issue (blocked npm egress), not a project issue.

For screenshot tooling in CLI:
- Playwright: requires package install + browser install.
- `uvx` tools (`showboat`, `rodney`): require PyPI network access.

If you have network-restricted sessions, run these in a local CLI or CI environment with npm + PyPI access.
