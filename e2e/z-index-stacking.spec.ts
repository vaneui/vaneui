import { test, expect, type Locator } from '@playwright/test';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Get a resolved computed style property from an element */
async function getStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );
}

/** Get computed z-index as a number */
async function getZIndex(locator: Locator): Promise<number> {
  const value = await getStyle(locator, 'z-index');
  return parseInt(value, 10);
}

/** Get the value of a CSS custom property set via inline style */
async function getCSSVar(locator: Locator, varName: string): Promise<string> {
  return locator.evaluate(
    (el, name) => (el as HTMLElement).style.getPropertyValue(name),
    varName,
  );
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page }) => {
  await page.goto('/test.html');
  await page.waitForSelector('[data-testid="z-index-section"]');
});

test.describe('Z-Index Stacking', () => {

  // ── Overlay ──

  test.describe('Standalone Overlay', () => {
    test('has computed z-index from CSS variable', async ({ page }) => {
      const overlay = page.locator('[data-testid="z-overlay-standalone"]');
      const zIndex = await getZIndex(overlay);
      // overlay base = 200, first in global stack → 201
      expect(zIndex).toBe(201);
    });

    test('has --z-index inline CSS variable set', async ({ page }) => {
      const overlay = page.locator('[data-testid="z-overlay-standalone"]');
      const varValue = await getCSSVar(overlay, '--z-index');
      expect(varValue).toBe('201');
    });

    test('uses z-(--z-index) class that resolves to z-index: var(--z-index)', async ({ page }) => {
      const overlay = page.locator('[data-testid="z-overlay-standalone"]');
      // The class z-(--z-index) compiles to { z-index: var(--z-index) }
      // Combined with --z-index: 201, the computed z-index should be 201
      const computedZ = await getZIndex(overlay);
      const inlineVar = parseInt(await getCSSVar(overlay, '--z-index'), 10);
      expect(computedZ).toBe(inlineVar);
    });
  });

  // ── Modal ──

  test.describe('Modal Overlay', () => {
    test('has computed z-index from CSS variable', async ({ page }) => {
      const overlay = page.locator('[data-testid="z-modal-overlay"]');
      const zIndex = await getZIndex(overlay);
      // modal base = 200, second in global stack → 202
      expect(zIndex).toBe(202);
    });

    test('has --z-index inline CSS variable set', async ({ page }) => {
      const overlay = page.locator('[data-testid="z-modal-overlay"]');
      const varValue = await getCSSVar(overlay, '--z-index');
      expect(varValue).toBe('202');
    });

    test('modal content does NOT have z-index (only overlay does)', async ({ page }) => {
      const content = page.locator('[data-testid="z-modal-content"]');
      // Modal content sits inside the overlay — it does not get its own z-index
      const zIndex = await getStyle(content, 'z-index');
      expect(zIndex).toBe('auto');
    });
  });

  // ── Popup (standalone) ──

  test.describe('Standalone Popup', () => {
    test('has computed z-index in the popup tier (300+)', async ({ page }) => {
      const popup = page.locator('[data-testid="z-popup-standalone"]');
      const zIndex = await getZIndex(popup);
      // popup base = 300, contributes to global stack
      expect(zIndex).toBeGreaterThanOrEqual(301);
    });

    test('has --z-index inline CSS variable in popup tier', async ({ page }) => {
      const popup = page.locator('[data-testid="z-popup-standalone"]');
      const varValue = parseInt(await getCSSVar(popup, '--z-index'), 10);
      expect(varValue).toBeGreaterThanOrEqual(301);
    });

    test('computed z-index matches inline --z-index variable', async ({ page }) => {
      const popup = page.locator('[data-testid="z-popup-standalone"]');
      const computedZ = await getZIndex(popup);
      const inlineVar = parseInt(await getCSSVar(popup, '--z-index'), 10);
      expect(computedZ).toBe(inlineVar);
    });
  });

  // ── Popup nested (inside modal stacking context) ──

  test.describe('Nested Popup (inside modal)', () => {
    test('has computed z-index in the popup tier', async ({ page }) => {
      const popup = page.locator('[data-testid="z-popup-nested"]');
      const zIndex = await getZIndex(popup);
      expect(zIndex).toBeGreaterThanOrEqual(301);
    });

    test('has higher z-index than the modal overlay', async ({ page }) => {
      const modalOverlay = page.locator('[data-testid="z-modal-overlay"]');
      const popup = page.locator('[data-testid="z-popup-nested"]');

      const overlayZ = await getZIndex(modalOverlay);
      const popupZ = await getZIndex(popup);

      // Popup tier (300+) should be above modal tier (200+)
      expect(popupZ).toBeGreaterThan(overlayZ);
    });
  });

  // ── Cross-component ordering ──

  test.describe('Stacking order across components', () => {
    test('overlay (200+) < popup (300+)', async ({ page }) => {
      const overlay = page.locator('[data-testid="z-overlay-standalone"]');
      const popup = page.locator('[data-testid="z-popup-standalone"]');

      const overlayZ = await getZIndex(overlay);
      const popupZ = await getZIndex(popup);

      expect(popupZ).toBeGreaterThan(overlayZ);
    });

    test('modal overlay (200+) < popup (300+)', async ({ page }) => {
      const modalOverlay = page.locator('[data-testid="z-modal-overlay"]');
      const popup = page.locator('[data-testid="z-popup-standalone"]');

      const modalZ = await getZIndex(modalOverlay);
      const popupZ = await getZIndex(popup);

      expect(popupZ).toBeGreaterThan(modalZ);
    });

    test('overlay and modal overlay are in the same tier', async ({ page }) => {
      const overlay = page.locator('[data-testid="z-overlay-standalone"]');
      const modalOverlay = page.locator('[data-testid="z-modal-overlay"]');

      const overlayZ = await getZIndex(overlay);
      const modalZ = await getZIndex(modalOverlay);

      // Both in 200 tier — within 100 of each other
      expect(Math.abs(overlayZ - modalZ)).toBeLessThan(100);
      // Both above 200
      expect(overlayZ).toBeGreaterThanOrEqual(200);
      expect(modalZ).toBeGreaterThanOrEqual(200);
    });

    test('all popups are in the 300+ tier', async ({ page }) => {
      const standalone = page.locator('[data-testid="z-popup-standalone"]');
      const nested = page.locator('[data-testid="z-popup-nested"]');

      const standaloneZ = await getZIndex(standalone);
      const nestedZ = await getZIndex(nested);

      expect(standaloneZ).toBeGreaterThanOrEqual(300);
      expect(nestedZ).toBeGreaterThanOrEqual(300);
    });

    test('global stack counter produces unique z-indexes per instance', async ({ page }) => {
      const overlay = page.locator('[data-testid="z-overlay-standalone"]');
      const modalOverlay = page.locator('[data-testid="z-modal-overlay"]');
      const nested = page.locator('[data-testid="z-popup-nested"]');
      const standalone = page.locator('[data-testid="z-popup-standalone"]');

      const allZIndexes = await Promise.all([
        getZIndex(overlay),
        getZIndex(modalOverlay),
        getZIndex(nested),
        getZIndex(standalone),
      ]);

      // Every z-index should be unique (global counter ensures this)
      const unique = new Set(allZIndexes);
      expect(unique.size).toBe(allZIndexes.length);
    });
  });

  // ── CSS variable resolution chain ──

  test.describe('CSS variable resolution', () => {
    test('overlay resolves z-index through z-(--z-index) class + --z-index var', async ({ page }) => {
      const overlay = page.locator('[data-testid="z-overlay-standalone"]');

      // 1. Element has the z-(--z-index) class
      const hasClass = await overlay.evaluate(
        el => el.classList.contains('z-(--z-index)') || el.className.includes('z-(--z-index)')
      );
      expect(hasClass).toBe(true);

      // 2. --z-index inline variable is set
      const inlineVar = await getCSSVar(overlay, '--z-index');
      expect(inlineVar).toBeTruthy();

      // 3. Computed z-index matches the variable value
      const computedZ = await getZIndex(overlay);
      expect(computedZ).toBe(parseInt(inlineVar, 10));
    });

    test('popup resolves z-index through z-(--z-index) class + --z-index var', async ({ page }) => {
      const popup = page.locator('[data-testid="z-popup-standalone"]');

      const hasClass = await popup.evaluate(
        el => el.classList.contains('z-(--z-index)') || el.className.includes('z-(--z-index)')
      );
      expect(hasClass).toBe(true);

      const inlineVar = await getCSSVar(popup, '--z-index');
      expect(inlineVar).toBeTruthy();

      const computedZ = await getZIndex(popup);
      expect(computedZ).toBe(parseInt(inlineVar, 10));
    });

    test('no inline z-index property (only --z-index CSS variable)', async ({ page }) => {
      const overlay = page.locator('[data-testid="z-overlay-standalone"]');
      const popup = page.locator('[data-testid="z-popup-standalone"]');
      const modalOverlay = page.locator('[data-testid="z-modal-overlay"]');

      // None should have style.zIndex set directly — only --z-index variable
      for (const el of [overlay, popup, modalOverlay]) {
        const directZIndex = await el.evaluate(
          (e) => (e as HTMLElement).style.zIndex
        );
        expect(directZIndex).toBe('');
      }
    });
  });
});
