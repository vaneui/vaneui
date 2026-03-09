import { defineConfig } from '@playwright/test';

// Declare the custom fixture option used by e2e/base.ts
type TestOptions = { testPage: string };

export default defineConfig<TestOptions>({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'prebuilt',
      use: { testPage: '/test.html' },
    },
    {
      name: 'tailwind',
      use: { testPage: '/test-tailwind.html' },
    },
  ],
  webServer: {
    command:
      'npm run build:css:ui && npm run build:css:vars && ' +
      'npx @tailwindcss/cli -i e2e/fixtures/tailwind-consumer.css -o e2e/fixtures/tailwind-output.css && ' +
      'cd e2e/fixtures && npx vite --port 3000',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
