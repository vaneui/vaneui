import { defineConfig } from '@playwright/test';

// Declare the custom fixture option used by e2e/base.ts
type TestOptions = { testPage: string };

// ── Project intents ───────────────────────────────────────────────────────────
// prebuilt — Chromium against the prebuilt dist/ui.css page. The full suite.
// tailwind — Chromium against the Tailwind-consumer-compiled page. Only the
//            dual-pipeline specs (below).
// firefox / webkit — Gecko and WebKit against the prebuilt page. Only the
//            behavior-critical specs (below).

// Specs that need to run against BOTH pipelines (prebuilt dist/ui.css AND the
// Tailwind-consumer-compiled output). Everything else runs once on prebuilt.
//
// What belongs here: tests that would surface differences between the two CSS
// build paths — broad computed-style coverage (computed-styles), CSS rule
// auditing (css-noise-audit), and color/contrast checks that depend on the
// exact resolved tokens (filled-contrast, dark-mode). dark-mode in
// particular validates that the plain [data-theme="dark"] rule in tokens.css
// survives both the raw dist/tokens.css passthrough (imported by the
// tailwind consumer) and the Tailwind-compiled dist/ui.css.
//
// What does NOT belong here: behaviour tests (focus, keyboard, z-index,
// menu/popup mechanics) — they exercise component logic, not CSS pipelines.
const DUAL_PIPELINE_SPECS = /(css-noise-audit|computed-styles|filled-contrast|dark-mode)\.spec\.ts$/;

// Behavior-critical specs that ALSO run on Firefox and WebKit. These cover
// component mechanics where engines genuinely differ — most importantly the
// floating-element machinery: Firefox and WebKit do not support CSS Anchor
// Positioning (`position-area`), so open Popup/Menu fixtures exercise the JS
// flip/shift/clamp fallback path on these engines. The set:
//   menu              — open Menu render path (trigger ARIA, roles, popup
//                       frame + MenuItem sizing while positioned)
//   overlay           — fixed-position backdrop mechanics (inset coverage,
//                       centering, stacking, content rendering)
//   z-index-stacking  — JS global stacking counter across Overlay/Modal/Popup
//                       tiers via inline --z-index variables
// CSS-pipeline specs (resolved colors/sizes/contrast/css-noise) stay
// Chromium-only: they validate the stylesheet build, not engine behavior.
const CROSS_ENGINE_SPECS = /[\\/](menu|overlay|z-index-stacking)\.spec\.ts$/;

export default defineConfig<TestOptions>({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Local dev: saturate the box. CI (GitHub-hosted ubuntu-latest is 2 vCPU /
  // 7 GB) — keep modest so the vite preview server isn't starved.
  workers: process.env.CI ? '50%' : '100%',
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    // 4173 = vite preview default; avoids local Next.js/CRA :3000 collisions.
    baseURL: 'http://localhost:4173',
  },
  projects: [
    {
      name: 'prebuilt',
      // Use full Chromium — headless-shell (1.49+ default) breaks :hover on
      // Linux CI. `channel` is Chromium-specific, so it lives on the chromium
      // projects' own `use` blocks and must not leak into firefox/webkit.
      use: { channel: 'chromium', testPage: '/test.html' },
    },
    {
      name: 'tailwind',
      use: { channel: 'chromium', testPage: '/test-tailwind.html' },
      testMatch: DUAL_PIPELINE_SPECS,
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox', testPage: '/test.html' },
      testMatch: CROSS_ENGINE_SPECS,
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit', testPage: '/test.html' },
      testMatch: CROSS_ENGINE_SPECS,
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
