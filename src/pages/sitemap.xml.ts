import { navigation } from '../data/site';
import { canonicalURL } from '../data/search';
export const prerender = true;
export function GET() {
  const urls = navigation.map(page => `  <url><loc>${canonicalURL(page.href)}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
