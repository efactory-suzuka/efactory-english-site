// Astro rewrites asset URLs; site navigation also needs the project base path.
export function sitePath(href: string) {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${href}`;
}
export function routePath(path: string) {
  const base = import.meta.env.BASE_URL;
  return base !== '/' && path.startsWith(base) ? `/${path.slice(base.length)}` : path;
}
