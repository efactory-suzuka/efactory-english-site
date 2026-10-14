// Publication is opt-in; local development and preview builds stay out of search.
export const productionOrigin = 'https://efactory-suzuka.github.io';
export const productionBase = '/efactory-english-site/';
export const searchIndexable = process.env.EFACTORY_PUBLICATION === 'production';
export function canonicalURL(route: string) {
  return `${productionOrigin}${productionBase}${route.replace(/^\//, '')}`;
}
