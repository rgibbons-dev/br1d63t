export const seasons = ['spring', 'summer', 'fall', 'winter'];

export function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-');
}
