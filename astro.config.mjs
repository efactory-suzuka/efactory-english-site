import { defineConfig } from 'astro/config';
import { writeFile } from 'node:fs/promises';
const production = process.env.EFACTORY_PUBLICATION === 'production';
export default defineConfig({
  site: 'https://efactory-suzuka.github.io',
  base: production ? '/efactory-english-site' : '/',
  output: 'static',
  outDir: production ? './dist-production' : './dist',
  trailingSlash: 'always',
  integrations: [{
    name: 'static-publication-files',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        // GitHub Pages must serve Astro's _astro directory without Jekyll.
        await writeFile(new URL('.nojekyll', dir), '');
      },
    },
  }],
});
