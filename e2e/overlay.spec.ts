import { test, expect, type Locator } from './base';

// ── Helpers ──────────────────────────────────────────────────────────────────

async function getStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );
}

function isVisible(color: string): boolean {
  if (color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return false;
  const rgbaMatch = color.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)\)/);
  if (rgbaMatch && parseFloat(rgbaMatch[1]) === 0) return false;
  return true;
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  // Overlays cover the viewport, so wait for DOM attachment, not visibility
  await page.waitForSelector('[data-testid="overlay-default"]', { state: 'attached' });
});

test.describe('Overlay: positioning and layout', () => {
  test('has fixed positioning', async ({ page }) => {
    const overlay = page.locator('[data-testid="overlay-default"]');
    const position = await getStyle(overlay, 'position');
    expect(position).toBe('fixed');
  });

  test('covers full viewport with inset: 0', async ({ page }) => {
    const overlay = page.locator('[data-testid="overlay-default"]');
    const top = await getStyle(overlay, 'top');
    const right = await getStyle(overlay, 'right');
    const bottom = await getStyle(overlay, 'bottom');
    const left = await getStyle(overlay, 'left');
    expect(top).toBe('0px');
    expect(right).toBe('0px');
    expect(bottom).toBe('0px');
    expect(left).toBe('0px');
  });

  test('uses flexbox layout', async ({ page }) => {
    const overlay = page.locator('[data-testid="overlay-default"]');
    const display = await getStyle(overlay, 'display');
    expect(display).toBe('flex');
  });

  test('centers content by default', async ({ page }) => {
    const overlay = page.locator('[data-testid="overlay-default"]');
    const alignItems = await getStyle(overlay, 'align-items');
    const justifyContent = await getStyle(overlay, 'justify-content');
    expect(alignItems).toBe('center');
    expect(justifyContent).toBe('center');
  });
});

test.describe('Overlay: backdrop appearance', () => {
  test('has background class for semi-transparent backdrop', async ({ page }) => {
    const overlay = page.locator('[data-testid="overlay-default"]');
    // The overlay should have the bg-(--overlay-bg) class OR a computed semi-transparent bg
    // (Tailwind consumer mode may not generate the utility, but prebuilt CSS does)
    const hasClass = await overlay.evaluate(el => el.classList.contains('bg-(--overlay-bg)'));
    const bgColor = await getStyle(overlay, 'background-color');
    const hasBg = isVisible(bgColor);
    expect(hasClass || hasBg).toBe(true);
  });

  test('backdrop is semi-transparent when resolved (prebuilt CSS)', async ({ page, testPage }) => {
    // This test validates the actual computed value — only reliable with prebuilt CSS
    if (testPage.includes('tailwind')) return;
    const overlay = page.locator('[data-testid="overlay-default"]');
    const bgColor = await getStyle(overlay, 'background-color');
    expect(isVisible(bgColor)).toBe(true);
    // Should contain alpha < 1
    const isTranslucent = bgColor.includes('/')
      || (bgColor.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)\)/) !== null
          && parseFloat(bgColor.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)\)/)![1]) < 1);
    expect(isTranslucent).toBe(true);
  });
});

test.describe('Overlay: blur effect', () => {
  test('blur overlay has backdrop-blur class', async ({ page }) => {
    const overlay = page.locator('[data-testid="overlay-blur"]');
    const hasClass = await overlay.evaluate(
      el => Array.from(el.classList).some(c => c.includes('backdrop-blur'))
    );
    expect(hasClass).toBe(true);
  });

  test('blur computed value resolves (prebuilt CSS)', async ({ page, testPage }) => {
    if (testPage.includes('tailwind')) return;
    const overlay = page.locator('[data-testid="overlay-blur"]');
    const backdropFilter = await getStyle(overlay, 'backdrop-filter');
    expect(backdropFilter).toContain('blur(');
  });

  test('default overlay has no backdrop blur', async ({ page }) => {
    const overlay = page.locator('[data-testid="overlay-default"]');
    const hasBlurClass = await overlay.evaluate(
      el => Array.from(el.classList).some(c => c.includes('backdrop-blur'))
    );
    expect(hasBlurClass).toBe(false);
  });
});

test.describe('Overlay: z-index', () => {
  test('has z-index greater than 0', async ({ page }) => {
    const overlay = page.locator('[data-testid="overlay-default"]');
    const zIndex = await getStyle(overlay, 'z-index');
    expect(parseInt(zIndex, 10)).toBeGreaterThan(0);
  });
});

test.describe('Overlay: custom alignment', () => {
  test('itemsStart + justifyStart aligns content to top-left', async ({ page }) => {
    const overlay = page.locator('[data-testid="overlay-aligned"]');
    const alignItems = await getStyle(overlay, 'align-items');
    const justifyContent = await getStyle(overlay, 'justify-content');
    expect(alignItems).toBe('flex-start');
    expect(justifyContent).toBe('flex-start');
  });
});

test.describe('Overlay: content rendering', () => {
  test('renders child content inside overlay', async ({ page }) => {
    const content = page.locator('[data-testid="overlay-default-content"]');
    await expect(content).toBeVisible();
    await expect(content).toHaveText('Content');
  });

  test('blur overlay renders child content', async ({ page }) => {
    const content = page.locator('[data-testid="overlay-blur-content"]');
    await expect(content).toBeVisible();
    await expect(content).toHaveText('Blurred');
  });
});
