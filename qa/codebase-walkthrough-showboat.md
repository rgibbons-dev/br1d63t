# Codebase Walkthrough

*2026-04-21T13:18:48Z by Showboat 0.6.1*
<!-- showboat-id: 16e405a4-859d-4d1d-8d0f-3e209b6f58a8 -->

A linear walkthrough of the Astro codebase, using grep and sed style inspection so it can be replayed in a fresh container session.

```bash
cd /workspace && rg --files src | sort
```

```output
src/components/RecipeCard.astro
src/data.ts
src/layouts/BaseLayout.astro
src/layouts/RecipeLayout.astro
src/lib/recipes.ts
src/pages/all-recipes.astro
src/pages/index.astro
src/pages/recipes/apricot-yogurt-loaf.md
src/pages/recipes/blood-orange-cake.md
src/pages/recipes/burnt-leek-butter-beans.md
src/pages/recipes/charred-corn-salad.md
src/pages/recipes/citrus-braised-chicken.md
src/pages/recipes/coconut-lime-rice-noodles.md
src/pages/recipes/mushroom-toasts.md
src/pages/recipes/roasted-plum-ripple.md
src/pages/recipes/soft-herb-frittata.md
src/pages/recipes/spring-pea-risotto.md
src/pages/recipes/squash-soup.md
src/pages/recipes/strawberry-shortcake.md
src/pages/recipes/tomato-galette.md
src/pages/tags/[tag].astro
src/styles.css
```

1. Start at the outer shell. BaseLayout owns the HTML document, shared stylesheet import, header navigation, main content slot, and footer.

```bash
cd /workspace && sed -n '1,120p' src/layouts/BaseLayout.astro
```

```output
---
import '../styles.css';

const {
  title = 'Bridget Recipes',
  description = 'A quiet collection of seasonal recipes, cakes, soups, salads, and simple dinners.'
} = Astro.props;

const pathname = Astro.url.pathname;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <header class="site-header">
      <div class="header-inner">
        <a href="/" class="logo">
          <span class="logo-mark">Bridget</span>
        </a>
        <nav class="nav" aria-label="Main">
          <a href="/" aria-current={pathname === '/' ? 'page' : undefined}>Home</a>
          <a href="/all-recipes" aria-current={pathname.startsWith('/all-recipes') ? 'page' : undefined}>All Recipes</a>
        </nav>
      </div>
    </header>

    <main class="container">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="footer-inner"></div>
    </footer>
  </body>
</html>
```

2. Read the shared data layer next. data.ts defines season constants and slug helpers, while lib/recipes.ts eagerly loads Markdown recipe modules with import.meta.glob and builds the tag and season collections used by pages.

```bash
cd /workspace && sed -n '1,80p' src/data.ts && printf '\n---\n' && sed -n '1,140p' src/lib/recipes.ts
```

```output
export const seasons = ['spring', 'summer', 'fall', 'winter'] as const;

export type Season = (typeof seasons)[number];

export function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');
}

export function formatSeason(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

---
import { seasons, slugify, type Season } from '../data';

export type RecipeModule = {
  url: string;
  frontmatter: {
    title: string;
    date: string;
    season: Season;
    tags?: string[];
    image: string;
    imageAlt?: string;
    intro?: string;
    serves?: string;
    prepTime?: string;
    cookTime?: string;
    featured?: boolean;
  };
};

const recipeModules = import.meta.glob('../pages/recipes/*.md', { eager: true }) as Record<
  string,
  RecipeModule
>;

export const recipes = Object.values(recipeModules).sort(
  (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
);

export const featuredRecipes = recipes.filter((recipe) => recipe.frontmatter.featured);

export const latestRecipes = recipes.slice(0, 6);

export const allTags = Array.from(
  new Set(
    recipes.flatMap((recipe) => [
      recipe.frontmatter.season,
      ...(recipe.frontmatter.tags ?? [])
    ])
  )
).sort((a, b) => a.localeCompare(b));

export const recipeCountsBySeason = seasons.map((season) => ({
  season,
  count: recipes.filter((recipe) => recipe.frontmatter.season === season).length
}));

export const browseCollections = [
  {
    title: 'Weeknight suppers',
    description: 'Bright dinners, grain bowls, pasta, and things that feel generous without much effort.',
    tag: 'weeknight'
  },
  {
    title: 'Baking days',
    description: 'Cakes, galettes, and loaf cakes with a little ceremony but still a relaxed hand.',
    tag: 'baking'
  },
  {
    title: 'Make-ahead lunches',
    description: 'Salads, soups, and grain dishes that hold well and improve as they sit.',
    tag: 'lunch'
  }
];

export const seasonShowcase = seasons.map((season) => {
  const recipe = recipes.find((entry) => entry.frontmatter.season === season) ?? recipes[0];

  return {
    season,
    count: recipes.filter((entry) => entry.frontmatter.season === season).length,
    image: recipe.frontmatter.image,
    imageAlt: recipe.frontmatter.imageAlt ?? recipe.frontmatter.title
  };
});

export function getRecipesByTag(tag: string) {
  const normalized = slugify(tag);
  return recipes.filter((recipe) => {
    const tags = recipe.frontmatter.tags ?? [];
    return (
      slugify(recipe.frontmatter.season) === normalized ||
      tags.some((entry) => slugify(entry) === normalized)
    );
  });
}
```

3. Follow the page entry points. index.astro renders the season landing grid, all-recipes.astro renders the filterable archive, and tags/[tag].astro renders static tag and season pages.

```bash
cd /workspace && sed -n '1,160p' src/pages/index.astro && printf '\n---\n' && sed -n '1,220p' src/pages/all-recipes.astro && printf '\n---\n' && sed -n '1,160p' src/pages/tags/[tag].astro
```

```output
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { formatSeason } from '../data';
import { seasonShowcase } from '../lib/recipes';
---

<BaseLayout title="Bridget Recipes">
  <section class="home-season-grid">
    {seasonShowcase.map((entry) => (
      <article class="season-card">
        <a href={`/tags/${entry.season}`}>
          <img src={entry.image} alt={entry.imageAlt} />
          <h2>{formatSeason(entry.season)}</h2>
        </a>
      </article>
    ))}
  </section>
</BaseLayout>

---
---
import BaseLayout from '../layouts/BaseLayout.astro';
import RecipeCard from '../components/RecipeCard.astro';
import { allTags, recipes } from '../lib/recipes';

const tagOptions = allTags.map((tag) => ({
  label: tag,
  value: tag.toLowerCase().replace(/\s+/g, '-')
}));
---

<BaseLayout title="All Recipes | Bridget Recipes">
  <section class="page-intro">
    <h1>All Recipes</h1>
  </section>

  <details class="filter-panel" id="recipe-filter-panel">
    <summary>
      <span>Filter by tags</span>
      <span class="filter-count" id="filter-count">0 selected</span>
    </summary>

    <div class="filter-panel-inner">
      <form class="filter-form" id="recipe-filter-form">
        {tagOptions.map((tag) => (
          <label class="filter-chip">
            <input type="checkbox" name="tags" value={tag.value} />
            <span>{tag.label}</span>
          </label>
        ))}
      </form>

      <div class="filter-actions">
        <button class="filter-button" type="button" id="filter-clear">Clear</button>
      </div>
    </div>
  </details>

  <div class="recipe-grid four-up-grid" id="all-recipes-grid">
    {recipes.map((recipe) => (
      <div
        class="filterable-recipe"
        data-tags={[
          recipe.frontmatter.season,
          ...(recipe.frontmatter.tags ?? [])
        ]
          .map((tag) => tag.toLowerCase().replace(/\s+/g, '-'))
          .join(' ')}
      >
        <RecipeCard recipe={recipe} />
      </div>
    ))}
  </div>

  <script is:inline>
    const panel = document.getElementById('recipe-filter-panel');
    const form = document.getElementById('recipe-filter-form');
    const clearButton = document.getElementById('filter-clear');
    const countLabel = document.getElementById('filter-count');
    const cards = Array.from(document.querySelectorAll('.filterable-recipe'));
    const params = new URLSearchParams(window.location.search);
    const selected = new Set(params.getAll('tags'));

    const update = () => {
      const active = Array.from(form.querySelectorAll('input[name="tags"]:checked')).map((input) => input.value);
      const activeSet = new Set(active);

      cards.forEach((card) => {
        const tags = (card.getAttribute('data-tags') || '').split(' ').filter(Boolean);
        const visible = activeSet.size === 0 || active.every((tag) => tags.includes(tag));
        card.hidden = !visible;
      });

      countLabel.textContent = `${active.length} selected`;

      const nextParams = new URLSearchParams();
      active.forEach((tag) => nextParams.append('tags', tag));
      const next = nextParams.toString();
      const url = next ? `${window.location.pathname}?${next}` : window.location.pathname;
      window.history.replaceState({}, '', url);
    };

    form.querySelectorAll('input[name="tags"]').forEach((input) => {
      input.checked = selected.has(input.value);
      input.addEventListener('change', update);
    });

    clearButton.addEventListener('click', () => {
      form.reset();
      update();
    });

    if (selected.size > 0) {
      panel.open = true;
    }

    update();
  </script>
</BaseLayout>

---
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import RecipeCard from '../../components/RecipeCard.astro';
import { formatSeason, slugify } from '../../data';
import { allTags, getRecipesByTag } from '../../lib/recipes';

export async function getStaticPaths() {
  return allTags.map((tag) => ({
    params: { tag: slugify(tag) },
    props: { tag }
  }));
}

const { tag } = Astro.props;
const filtered = getRecipesByTag(Astro.params.tag ?? tag);
---

<BaseLayout title={`${tag} | Bridget Recipes`}>
  <section class="page-intro">
    <h1>{formatSeason(tag)}</h1>
  </section>

  <div class="recipe-grid four-up-grid">
    {filtered.map((recipe) => (
      <RecipeCard recipe={recipe} />
    ))}
  </div>
</BaseLayout>
```

4. Read the reusable recipe view pair next. RecipeCard is intentionally tiny, while RecipeLayout does the heavier work of taking rendered Markdown, splitting h2 sections, and placing ingredients beside the hero image with the remaining sections below.

```bash
cd /workspace && sed -n '1,120p' src/components/RecipeCard.astro && printf '\n---\n' && sed -n '1,180p' src/layouts/RecipeLayout.astro
```

```output
---
const { recipe } = Astro.props;
---

<article class="recipe-card">
  <a href={recipe.url}>
    <img
      src={recipe.frontmatter.image}
      alt={recipe.frontmatter.imageAlt ?? recipe.frontmatter.title}
      loading="lazy"
    />
    <div class="recipe-card-copy">
      <h3>{recipe.frontmatter.title}</h3>
    </div>
  </a>
</article>

---
---
import BaseLayout from './BaseLayout.astro';
import { slugify } from '../data';

const frontmatter = Astro.props.frontmatter ?? Astro.props;

const {
  title,
  image,
  imageAlt = title,
  tags = [],
  intro,
} = frontmatter;

const renderedContent = await Astro.slots.render('default');
const headingMatches = Array.from(renderedContent.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi));
const stripTags = (value: string) => value.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim().toLowerCase();

const preamble = headingMatches.length > 0
  ? renderedContent.slice(0, headingMatches[0].index).trim()
  : renderedContent.trim();

const sections = headingMatches.map((match, index) => {
  const start = match.index ?? 0;
  const end = headingMatches[index + 1]?.index ?? renderedContent.length;

  return {
    title: stripTags(match[1]),
    html: renderedContent.slice(start, end).trim()
  };
});

const ingredientsIndex = sections.findIndex((section) => section.title.includes('ingredient'));
const instructionsIndex = sections.findIndex((section) =>
  /(method|instruction|direction|preparation)/.test(section.title)
);

const ingredientsSection =
  (ingredientsIndex >= 0 && sections[ingredientsIndex]) ??
  (sections.length > 0 ? sections[0] : null);

const instructionsSection =
  (instructionsIndex >= 0 && sections[instructionsIndex]) ??
  sections.find((_, index) => index !== ingredientsIndex) ??
  null;

const remainingSections = sections.filter(
  (_, index) => index !== ingredientsIndex && index !== instructionsIndex
);
---

<BaseLayout title={`${title} | Bridget Recipes`} description={intro}>
  <article class="recipe-article">
    <div class="recipe-frame">
      <section class="recipe-heading">
        <div class="recipe-copy">
          {tags.length > 0 && (
            <p class="recipe-tag-line">
              {tags.map((tag: string, index: number) => (
                <>
                  <a href={`/tags/${slugify(tag)}`}>{tag}</a>{index < tags.length - 1 && ' • '}
                </>
              ))}
            </p>
          )}
          <h1>{title}</h1>
        </div>
      </section>

      <section class="recipe-shell">
        <figure class="recipe-figure">
          <img class="recipe-hero" src={image} alt={imageAlt} />
        </figure>

        {ingredientsSection && (
          <div class="recipe-sidebar">
            <section class="recipe-body prose-flow recipe-section" set:html={ingredientsSection.html} />
          </div>
        )}

        <div class="recipe-main">
          {preamble && <div class="recipe-body prose-flow" set:html={preamble} />}
          {instructionsSection && (
            <section class="recipe-body prose-flow recipe-section" set:html={instructionsSection.html} />
          )}
          {remainingSections.map((section) => (
            <section class="recipe-body prose-flow recipe-section" set:html={section.html} />
          ))}
        </div>
      </section>
    </div>
  </article>
</BaseLayout>
```

5. Finally, inspect content and styling together. Recipes are plain Markdown files with frontmatter and h2 sections, and styles.css carries the entire visual system for layout, typography, grids, filter chips, and recipe detail composition.

```bash
cd /workspace && grep -n '^title:\|^season:\|^tags:\|^image:\|^intro:\|^## ' src/pages/recipes/apricot-yogurt-loaf.md && printf '\n---\n' && sed -n '1,260p' src/styles.css
```

```output
3:title: Apricot Yogurt Loaf
5:season: spring
6:tags:
10:image: https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=1400&q=80
12:intro: A tender yogurt loaf with chopped apricots and a little lemon zest through the crumb.
18:## Ingredients
30:## Method
38:## Notes

---
:root {
  --bg: #f7f4ee;
  --panel: #f7dc95;
  --text: #23211d;
  --muted: #6c6457;
  --border: rgba(35, 33, 29, 0.16);
  --max-width: 1900px;
  --content-width: 1760px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, 'Times New Roman', serif;
  color: var(--text);
  background: var(--bg);
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
}

.site-header {
  background: var(--panel);
  border-bottom: 1px solid rgba(35, 33, 29, 0.08);
}

.header-inner,
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: inline-flex;
  align-items: center;
}

.logo-mark {
  font-size: clamp(3rem, 4vw, 4.4rem);
  font-style: italic;
  font-weight: 700;
  line-height: 1;
}

.nav {
  display: flex;
  align-items: center;
  gap: 3.25rem;
}

.nav a {
  font-size: clamp(1.2rem, 1.6vw, 1.75rem);
  line-height: 1;
  padding-bottom: 0.12rem;
  border-bottom: 1px solid transparent;
}

.nav a:hover,
.nav a:focus-visible,
.nav a[aria-current='page'] {
  border-bottom-color: currentColor;
}

.container {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 7rem 4rem 8rem;
}

.site-footer {
  min-height: 8.5rem;
  background: var(--panel);
}

.footer-inner {
  min-height: 8.5rem;
}

.page-intro {
  margin-bottom: 2.8rem;
}

.page-intro h1,
.recipe-copy h1 {
  margin: 0;
  font-size: clamp(2.8rem, 4vw, 4.3rem);
  font-weight: 500;
  line-height: 0.98;
}

.recipe-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.four-up-grid {
  gap: 2rem 1.25rem;
}

.filterable-recipe[hidden] {
  display: none;
}

.recipe-card img,
.season-card img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
}

.recipe-card-copy {
  padding-top: 0.8rem;
}

.recipe-card h3,
.season-card h2 {
  margin: 0;
  font-size: clamp(2rem, 2.1vw, 2.75rem);
  font-weight: 400;
  line-height: 1.05;
  text-align: center;
}

.recipe-card h3 {
  text-align: left;
  font-size: clamp(1.85rem, 1.9vw, 2.5rem);
}

.home-season-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.season-card a {
  display: grid;
  gap: 1.4rem;
}

.recipe-heading {
  margin-bottom: 1.5rem;
}

.recipe-article {
  max-width: 1600px;
}

.recipe-frame {
  width: min(100%, 74rem);
  margin: 0 auto;
}

.recipe-tag-line {
  margin: 0 0 0.7rem;
  font-size: 0.94rem;
  letter-spacing: 0.06em;
  text-transform: lowercase;
  color: var(--muted);
}

.recipe-tag-line a {
  border-bottom: 1px solid transparent;
}

.recipe-tag-line a:hover,
.recipe-tag-line a:focus-visible {
  border-bottom-color: currentColor;
}

.recipe-shell {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;
}

.recipe-figure {
  margin: 0;
  display: flex;
  justify-content: flex-start;
}

.recipe-hero {
  width: 100%;
  max-width: 42rem;
  max-height: min(50vh, 34rem);
  aspect-ratio: 4 / 5;
  object-fit: cover;
}

.recipe-body {
  font-size: 0.92rem;
  line-height: 1.75;
}

.recipe-sidebar,
.recipe-main {
  min-width: 0;
}

.recipe-sidebar {
  justify-self: start;
  text-align: left;
}

.recipe-section + .recipe-section {
  margin-top: 2rem;
}

.recipe-body h2 {
  margin: 0 0 0.75rem;
  font-size: 1.05rem;
  font-weight: 600;
}

.recipe-body p,
.recipe-body ul,
.recipe-body ol {
  margin: 0 0 1.2rem;
}

.recipe-body ul,
.recipe-body ol {
  padding-left: 1.2rem;
}

.recipe-body li {
  margin-bottom: 0.35rem;
}

.filter-panel {
  margin: 0 0 2.5rem;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.filter-panel summary {
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
```

Mental model summary: this is a static Markdown-backed recipe catalog. Astro assembles pages at build time, one inline script powers archive filtering on the client, and nearly all design behavior lives in the single global stylesheet.
