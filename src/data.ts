export const seasons = ['spring', 'summer', 'fall', 'winter'] as const;

export type Season = (typeof seasons)[number];

export function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');
}

export function formatSeason(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
