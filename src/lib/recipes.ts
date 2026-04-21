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
