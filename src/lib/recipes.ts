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
    description?: string;
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

export function getRecipeBySlug(slug: string) {
  return recipes.find((recipe) => recipe.url.replace(/^\/|\/$/g, '').endsWith(slug));
}

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

export function getRelatedRecipes(recipe: RecipeModule, count = 3) {
  const currentTags = new Set([recipe.frontmatter.season, ...(recipe.frontmatter.tags ?? [])]);

  return recipes
    .filter((entry) => entry.url !== recipe.url)
    .map((entry) => {
      const shared = [entry.frontmatter.season, ...(entry.frontmatter.tags ?? [])].filter((tag) =>
        currentTags.has(tag)
      ).length;
      return { entry, shared };
    })
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, count)
    .map(({ entry }) => entry);
}
