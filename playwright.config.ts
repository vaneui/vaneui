import { defineConfig } from '@playwright/test';

// Declare the custom fixture option used by e2e/base.ts
type TestOptions = { testPage: string };

// Specs that need to run against BOTH pipelines (prebuilt dist/ui.css AND the
// Tailwind-consumer-compiled output). Everything else runs once on prebuilt.
//
// What belongs here: tests that would surface differences between the two CSS
// build paths — broad computed-style coverage (computed-styles), CSS rule
// auditing (css-noise-audit), and color/contrast checks that depend on the
// exact resolved tokens (filled-contrast).
//
// What does NOT belong here: behaviour tests (focus, keyboard, z-index,
// menu/popup mechanics) — they exercise component logic, not CSS pipelines.
const DUAL_PIPELINE_SPECS = /(css-noise-audit|computed-styles|filled-contrast)\.spec\.ts$/;

export default defineConfig<TestOptions>({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Local dev: saturate the box. CI (GitHub-hosted ubuntu-latest is 2 vCPU /
  // 7 GB) — keep modest; sharding in the workflow does the real CI parallelism.
  workers: process.env.CI ? '50%' : '100%',
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    // 4173 = vite preview default; avoids local Next.js/CRA :3000 collisions.
    baseURL: 'http://localhost:4173',
    // Use full Chromium — headless-shell (1.49+ default) breaks :hover on Linux CI.
    channel: 'chromium',
  },
  projects: [
    {
      name: 'prebuilt',
      use: { testPage: '/test.html' },
    },
    {
      name: 'tailwind',
      use: { testPage: '/test-tailwind.html' },
      testMatch: DUAL_PIPELINE_SPECS,
    },
  ],
  webServer: {
    command: 'npm run e2e:serve',
    // Validate the server actually serves our fixture, not whatever else may
    // happen to be listening on this port. `port` alone only checks for an
    // open socket, which let an unrelated Next.js dev server be reused.
    url: 'http://localhost:4173/test.html',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
