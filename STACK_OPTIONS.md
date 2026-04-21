# Static Recipe Website – Build Options

You asked for a simple setup with:
- Julia-style visual design
- Nigel-style top-level **Seasons** menu
- Tag filtering (including season tags)
- Big photography-forward cards
- Easy ongoing editing for non-devs

## Option 1 (Recommended): Eleventy (11ty) + Nunjucks + simple CSS

**Why it's great**
- Very low-JS static site generator.
- Recipes can be plain Markdown files with frontmatter tags.
- Auto-generates tag and season pages naturally.
- Extremely easy to host on Netlify / GitHub Pages / Cloudflare Pages.

**Autonomy level**: High (edit Markdown + CSS variables).

**Complexity**: Low.

## Option 2: Astro + Content Collections

**Why it's great**
- Modern DX, still static-first.
- Strong typed content model for recipes.
- Easy image optimization and layout control for large hero images.

**Autonomy level**: Medium-High (slightly more framework concepts).

**Complexity**: Medium.

## Option 3: Hugo (Go templates)

**Why it's great**
- Very fast static builds.
- Built-in taxonomy support (perfect for tags/seasons).
- Mature themes and content workflows.

**Autonomy level**: Medium (template syntax can be less friendly initially).

**Complexity**: Medium.

## Option 4: Jekyll (Liquid templates)

**Why it's great**
- GitHub Pages-native.
- Simple content model via Markdown posts and collections.

**Autonomy level**: Medium.

**Complexity**: Medium.

## Option 5: Vanilla HTML/CSS/JS + tiny build script

**Why it's great**
- Maximum simplicity at runtime.
- No framework lock-in.

**Tradeoff**
- Tag pages and filtering become custom code and more manual maintenance.

**Autonomy level**: Medium if content stays small, lower as site grows.

**Complexity**: Low to start, higher over time.

## Recommendation

Start with **Eleventy**.

It gives the best balance of:
- simple writing workflow,
- clean static output,
- easy tag/season archive pages,
- minimal JavaScript,
- and enough flexibility to match the visual references.

## If you choose Eleventy, next implementation steps

1. Scaffold the site with recipe Markdown collection.
2. Implement a Julia-inspired homepage with large image cards.
3. Add top-level **Seasons** menu and season landing pages.
4. Add tag chips and tag archive pages.
5. Expose easy style controls via CSS variables in one file.
6. Add a short “How to add a recipe” editor guide.
