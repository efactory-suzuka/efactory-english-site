import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const root = process.env.GITHUB_PAGES_TEST_URL || 'http://127.0.0.1:4324';
const prefix = '/efactory-english-site/';
const canonical = 'https://efactory-suzuka.github.io';
const routes = ['', 'services/', 'pricing/', 'about/', 'ecu-tuning/', 'faq/', 'contact/'];
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
const page = await browser.newPage();
const checks = [];
try {
  for (const width of [375,1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto(root + prefix + route);
      assert.equal(response.status(),200);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'index, follow');
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),canonical+prefix+route);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),true);
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.waitFor({ state:'visible' });
        await page.waitForFunction(el => el.complete && el.naturalWidth > 0, await image.elementHandle());
      }
      const links = await page.locator('a[href]').evaluateAll(items => items.map(item => item.getAttribute('href')).filter(href => href.startsWith('/')));
      assert.ok(links.every(href => href.startsWith(prefix)), 'Internal link escaped the project base');
      for (const href of new Set(links)) assert.equal((await page.request.get(root+href)).status(),200);
      assert.ok(await page.locator('main').innerText());
      const jp = await page.locator('.language-button').first().getAttribute('href');
      assert.equal(jp,route==='about/'?'https://efactorysuzuka.wixsite.com/efactory/us':route==='pricing/'?'https://efactorysuzuka.wixsite.com/efactory/page':route==='ecu-tuning/'?'https://efactory-ecu-site.pages.dev/':'https://efactorysuzuka.wixsite.com/efactory');
      await page.evaluate(() => scrollTo(0,0));
      await mkdir('docs/screenshots/github-pages',{recursive:true});
      await page.screenshot({path:`docs/screenshots/github-pages/${route.split('/')[0] || 'home'}-${width}.png`,fullPage:true});
      checks.push({route:prefix+route,width,status:response.status(),imagesLoaded:true,internalLinks:true,canonical:true,noOverflow:true,japaneseLink:true});
    }
  }
  const robots=await page.request.get(root+prefix+'robots.txt');assert.equal(robots.status(),200);assert.ok((await robots.text()).includes('Sitemap: '+canonical+prefix+'sitemap.xml'));
  const sitemap=await page.request.get(root+prefix+'sitemap.xml');assert.equal(sitemap.status(),200);const xml=await sitemap.text();assert.equal((xml.match(/<loc>/g)||[]).length,7);assert.ok(!xml.includes('pages.dev'));
  await writeFile('docs/github-pages-check.json',JSON.stringify({checks,sitemapHTTP200:true,robotsHTTP200:true},null,2)+'\n');
  console.log('GitHub Pages production build: 7 pages at 375/1280px, assets, links, canonical, robots and sitemap passed.');
} finally { await browser.close(); }
