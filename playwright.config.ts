import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  workers: 2,
  use: {
    baseURL: 'http://127.0.0.1:4322',
    launchOptions: { executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] },
  },
  webServer: {
    command: 'npm run preview -- --port 4322 --ignore-lock',
    url: 'http://127.0.0.1:4322',
    reuseExistingServer: !process.env.CI,
  },
});
