import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'npm run build:css:ui && npm run build:css:vars && cd playground && npx vite --port 3000',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
