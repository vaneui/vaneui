import { test, expect, getStyle, getSvgWidth } from './base';

// A5: an error-state input shows a non-color cue (an alert-icon ELEMENT, not a
// CSS background-image) in addition to the red border (SC 1.4.1), and is marked
// aria-invalid. The icon is the customizable `inputErrorIcon` sub-theme.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="err-input"]');
});

test.describe('Error input cue (A5)', () => {
  test('renders a non-color alert-icon element the normal input lacks', async ({ page }) => {
    // the error input is wrapped so the icon can overlay it; the icon is a real
    // <svg> element, not a background image
    const errWrapper = page.locator('.vane-input-wrapper', { has: page.locator('[data-testid="err-input"]') });
    await expect(errWrapper.locator('.vane-input-error-icon svg')).toBeVisible();

    // the OK input is not wrapped and has no icon
    await expect(
      page.locator('.vane-input-wrapper', { has: page.locator('[data-testid="ok-input"]') })
    ).toHaveCount(0);
  });

  test('the error icon is decorative (aria-hidden) and uses the danger color token', async ({ page }) => {
    const icon = page.locator('.vane-input-error-icon').first();
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    // the icon color is text-(--color-text-danger) (svg follows via fill=currentColor):
    // a distinct danger color, NOT the normal input text color — token-driven, not hardcoded
    const iconColor = await getStyle(icon, 'color');
    const normalText = await getStyle(page.locator('[data-testid="ok-input"]'), 'color');
    expect(iconColor).not.toBe(normalText);
  });

  test('error input is marked aria-invalid', async ({ page }) => {
    await expect(page.locator('[data-testid="err-input"]')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('[data-testid="ok-input"]')).not.toHaveAttribute('aria-invalid');
  });

  // Class-name and geometry assertions both pass on a glyph whose subpaths wind the
  // wrong way, so the shape itself is sampled: disc filled, stem and dot cut through.
  test('the alert glyph reads as an exclamation mark, not a solid disc', async ({ page }) => {
    const samples = await page.locator('.vane-input-error-icon svg').first().evaluate(async (svg) => {
      const clone = svg.cloneNode(true) as SVGSVGElement;
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      clone.setAttribute('width', '200');
      clone.setAttribute('height', '200');
      // currentColor has nothing to resolve against once the node is detached
      clone.setAttribute('fill', 'red');
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(clone));
      });
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 200;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, 200, 200);
      ctx.drawImage(img, 0, 0, 200, 200);
      // sample in viewBox units (the 20x20 box is rastered at 10x)
      const at = (x: number, y: number) => {
        const [r, g, b] = ctx.getImageData(Math.round(x * 10), Math.round(y * 10), 1, 1).data;
        return r > 200 && g < 80 && b < 80 ? 'ink' : 'hole';
      };
      return { disc: at(10, 3), stem: at(10, 8), gap: at(10, 12), dot: at(10, 14), below: at(10, 16.5) };
    });
    expect(samples).toEqual({ disc: 'ink', stem: 'hole', gap: 'ink', dot: 'hole', below: 'ink' });
  });

  test('the error icon scales with the input size prop (no fixed size)', async ({ page }) => {
    // the icon svg sizes to h-1/2 of the input-height overlay box, so it scales
    // with the input's size (no per-size CSS block, no fixed value)
    const xsWidth = await getSvgWidth(page.locator('.vane-input-wrapper', { has: page.locator('[data-testid="err-input-xs"]') }));
    const xlWidth = await getSvgWidth(page.locator('.vane-input-wrapper', { has: page.locator('[data-testid="err-input-xl"]') }));
    expect(xlWidth).toBeGreaterThan(xsWidth);
  });
});
