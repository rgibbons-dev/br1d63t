export function withBase(path: string) {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function resolvePublicAssetUrl(path: string) {
  return /^(?:[a-z]+:)?\/\//i.test(path) ? path : withBase(path);
}
