import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const routes = ['/', '/services/', '/pricing/', '/about/', '/ecu-tuning/', '/faq/', '/contact/'];
for (const width of [375, 390, 430, 1280]) {
  test(`all pages fit at ${width}px and HOME renders`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      // Every text box must fit horizontally without clipping.
      const clipped = await page.locator('h1,h2,h3,p,.text-link,.card-link').evaluateAll(elements => elements.filter(el => el.scrollWidth > el.clientWidth + 1).map(el => el.textContent));
      expect(clipped).toEqual([]);
      await mkdir('docs/screenshots', { recursive: true });
      for (const image of await page.locator('img').all()) {
          await image.scrollIntoViewIfNeeded();
          await expect.poll(async () => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      }
      await page.evaluate(() => scrollTo(0, 0));
      if (route !== '/') {
        await page.screenshot({ path: `docs/screenshots/${route.split('/')[1]}-${width}.png`, fullPage: true });
        await page.screenshot({ path: `docs/screenshots/${route.split('/')[1]}-${width}-top.png` });
      }
      if (route === '/') {
        await page.screenshot({ path: `docs/screenshots/home-revised-${width}.png`, fullPage: true });
        await page.screenshot({ path: `docs/screenshots/home-revised-${width}-top.png` });
        await expect(page.getByRole('link', { name: 'Plan your first visit' })).toBeVisible();
        await expect(page.getByRole('heading', { name: '“My bike needs help.”' })).toBeVisible();
        await expect(page.getByRole('heading', { name: '“I want to do it myself.”' })).toBeVisible();
      }
    }
    expect(errors).toEqual([]);
  });
}
for (const route of routes) {
  test(`accessible structure and contrast: ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
  });
}
test('internal links and fragment destinations exist', async ({ page, request }) => {
  const links = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page.locator('a[href]').evaluateAll(elements => elements.map(el => el.getAttribute('href')!))) {
      if (href.startsWith('/')) links.add(href);
      if (href.startsWith('#')) await expect(page.locator(href)).toHaveCount(1);
    }
  }
  for (const href of links) {
    const url = new URL(href, 'http://127.0.0.1:4322');
    expect((await request.get(url.pathname)).status()).toBe(200);
    if (url.hash) {
      await page.goto(url.pathname);
      await expect(page.locator(url.hash)).toHaveCount(1);
    }
  }
});
test('mobile navigation and FAQ work without client JavaScript', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await expect(page.locator('script')).toHaveCount(0);
  await page.locator('.mobile-menu summary').click();
  const mobileNav = page.getByRole('navigation', { name: 'Mobile navigation' });
  await expect(mobileNav.getByRole('link')).toHaveCount(7);
  await mobileNav.getByRole('link', { name: 'FAQ', exact: true }).click();
  await expect(page).toHaveURL(/\/faq\/$/);
  const language = page.locator('details').filter({ has: page.locator('summary', { hasText: 'Can I receive support in English?' }) });
  await language.locator('summary').click();
  await expect(language.locator('p')).toBeVisible();
  await expect(language.locator('p')).toContainText('has not been confirmed');
});
test('pricing calculations and contact route are visible', async ({ page }) => {
  await page.goto('/pricing/');
  await expect(page.getByRole('row', { name: '3-session pass ¥14,850 ¥4,950 ¥1,650' })).toBeVisible();
  await expect(page.getByRole('row', { name: '5-session pass ¥22,000 ¥4,400 ¥5,500' })).toBeVisible();
  await page.goto('/contact/');
  await expect(page.getByRole('link', { name: 'Japanese official website', exact: true })).toHaveAttribute('href', 'https://efactorysuzuka.wixsite.com/efactory');
});

test('Japanese original assets remain intact and photos display without cropping', async ({ page }) => {
  const manifest = JSON.parse(await readFile('docs/IMAGE-SOURCES.json', 'utf8'));
  expect(manifest.images).toHaveLength(19);
  for (const image of manifest.images) {
    const bytes = await readFile(image.file);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(image.sha256);
  }
  await page.goto('/');
  await expect(page.locator('.media-placeholder')).toHaveCount(0);
  for (const selector of ['.hero-photo', '.workshop-detail']) {
    const image = page.locator(selector);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(async () => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    const dimensions = await image.evaluate((el: HTMLImageElement) => ({ rendered: el.clientWidth / el.clientHeight, original: el.naturalWidth / el.naturalHeight, filter: getComputedStyle(el).filter, fit: getComputedStyle(el).objectFit }));
    expect(Math.abs(dimensions.rendered - dimensions.original)).toBeLessThan(0.02);
    expect(dimensions.filter).toBe('none');
    expect(dimensions.fit).toBe('contain');
  }
});
test('HOME communicates nationwide visits, total prices and service-specific responsibilities', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText("Your Bike.Your Project.We're Here to Help.");
  await expect(page.locator('.media-caption')).toContainText('Welcoming riders from across Japan');
  await expect(page.locator('.approach-note')).toContainText('Who performs each task depends on the service');
  await expect(page.locator('.approach-note')).toContainText('staff operate the tyre changer');
  await expect(page.locator('.first-price')).toContainText('Total price');
  await expect(page.locator('.first-price')).toContainText('¥4,400');
  await expect(page.locator('.first-price')).toContainText('/ 90 min · incl. tax');
  await expect(page.locator('.pass-total').nth(0)).toContainText('¥14,850');
  await expect(page.locator('.pass-total').nth(1)).toContainText('¥22,000');
  await expect(page.locator('.membership-strip')).toContainText('¥9,900');
  await expect(page.locator('.membership-strip')).toContainText('¥13,200');
  await expect(page.locator('.visit-steps')).toContainText('Sending an enquiry does not secure a slot');
  await expect(page.locator('.visit-language')).toContainText('needs to be confirmed');
  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/half.?price|half.?off|promotion|tax.?free|Fluent English|Full English technical service|Guaranteed English-speaking assistance/i);
});
test('mobile HOME and expanded menu pass accessibility checks', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.locator('.mobile-menu summary').click();
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
});

test('Google Maps access and directions use the published address on HOME and Contact', async ({ page }) => {
  const address = '三重県鈴鹿市徳居町1135';
  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/contact/']) {
      await page.goto(route);
      const map = page.locator('.access-map');
      await map.scrollIntoViewIfNeeded();
      await expect(map.getByText('Visits are by appointment only.', { exact: false })).toBeVisible();
      const embed = map.locator('iframe');
      await expect(embed).toHaveAttribute('title', /Google Maps.*eFactory/);
      const source = new URL((await embed.getAttribute('src'))!);
      expect(source.origin).toBe('https://www.google.com');
      expect(source.searchParams.get('q')).toBe(address);
      expect(source.searchParams.get('output')).toBe('embed');
      const directions = new URL((await map.getByRole('link', { name: 'Get directions' }).getAttribute('href'))!);
      expect(directions.pathname).toBe('/maps/dir/');
      expect(directions.searchParams.get('destination')).toBe(address);
      await expect(map.getByRole('link', { name: 'Open Google Maps' })).toBeVisible();
      const box = await embed.boundingBox();
      expect(box?.width).toBeGreaterThan(250);
      expect(box?.height).toBeGreaterThanOrEqual(270);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await map.screenshot({ path: `docs/screenshots/${route === '/' ? 'home' : 'contact'}-access-${width}.png` });
    }
  }
});

test('six inner pages are complete review pages with meaningful next steps', async ({ page }) => {
  for (const route of routes.slice(1)) {
    await page.goto(route);
    await expect(page.locator('.draft-notice,.media-placeholder')).toHaveCount(0);
    await expect(page.locator('.breadcrumbs')).toContainText('Home');
    expect(await page.locator('main h2').count()).toBeGreaterThanOrEqual(3);
    expect(await page.locator('main a[href="/contact/"], main a[href^="https://lin.ee/"]').count()).toBeGreaterThanOrEqual(1);
    expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy();
  }
  await page.goto('/pricing/');
  await expect(page.locator('.membership-card').nth(1)).toContainText('does not guarantee your preferred time');
  await page.goto('/about/');
  await expect(page.locator('main')).toContainText('DENSO');
  await expect(page.locator('main')).toContainText('JAGE Class A');
  await page.goto('/ecu-tuning/');
  await expect(page.locator('.process-list > li')).toHaveCount(5);
  await expect(page.locator('main')).toContainText('confirm the scope and fees in advance');
});


test('founder portrait and latest Japanese ECU images render intact with Japanese navigation', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const expected = route === '/ecu-tuning/' ? 'https://efactory-ecu-site.pages.dev/' : route === '/about/' ? 'https://efactorysuzuka.wixsite.com/efactory/us' : route === '/pricing/' ? 'https://efactorysuzuka.wixsite.com/efactory/page' : 'https://efactorysuzuka.wixsite.com/efactory';
    for (const button of await page.locator('.language-button').all()) {
      await expect(button).toHaveAttribute('href', expected);
      await expect(button).toHaveAttribute('target', '_blank');
    }
  }
  await page.goto('/about/');
  await expect(page.getByRole('heading', { name: 'Etsugo Yanagida', exact: true })).toBeVisible();
  await expect(page.locator('.founder-portrait img')).toHaveAttribute('src', /jp-about-portrait/);
  await page.goto('/ecu-tuning/');
  await expect(page.locator('h1')).toHaveText('ECU Flashing & Setup');
  await expect(page.locator('.ecu-case')).toHaveCount(3);
  await expect(page.locator('main')).toContainText('Postal flashing availability has not been verified');
  const images = page.locator('.ecu-rider img,.ecu-case img');
  await expect(images).toHaveCount(4);
  for (const img of await images.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    const ratios = await img.evaluate((el: HTMLImageElement) => ({ rendered: el.clientWidth / el.clientHeight, original: el.naturalWidth / el.naturalHeight, filter: getComputedStyle(el).filter }));
    expect(Math.abs(ratios.rendered - ratios.original)).toBeLessThan(0.02);
    expect(ratios.filter).toBe('none');
  }
});
