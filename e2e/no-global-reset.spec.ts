import { test, expect, type Locator } from './base';

async function getStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );
}

// The shipped stylesheet must not globally reset the consumer's page: the
// preflight is scoped to [data-vane-type] subtrees (scripts/scopePreflight.ts).
// Bare elements OUTSIDE VaneUI components keep their user-agent styles;
// elements INSIDE VaneUI components get the normalizations the library
// relies on.
test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="no-global-reset"]');
});

test.describe('No global page reset', () => {
  test('bare h1 outside VaneUI keeps user-agent margins and sizing', async ({ page }) => {
    const h1 = page.locator('[data-testid="bare-h1"]');

    // UA default: h1 is 2em with block margins — the old global preflight
    // zeroed both
    const fontSize = parseFloat(await getStyle(h1, 'font-size'));
    const marginTop = parseFloat(await getStyle(h1, 'margin-top'));
    expect(fontSize).toBeGreaterThan(24);
    expect(marginTop).toBeGreaterThan(0);
  });

  test('bare ul outside VaneUI keeps user-agent list styling', async ({ page }) => {
    const ul = page.locator('[data-testid="bare-ul"]');

    const paddingLeft = parseFloat(await getStyle(ul, 'padding-left'));
    const listStyle = await getStyle(ul, 'list-style-type');
    expect(paddingLeft).toBeGreaterThan(0);
    expect(listStyle).toBe('disc');
  });

  test('bare button outside VaneUI keeps user-agent appearance', async ({ page }) => {
    const button = page.locator('[data-testid="bare-button"]');

    // the old global preflight stripped button backgrounds site-wide
    const bg = await getStyle(button, 'background-color');
    expect(bg).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('headings INSIDE VaneUI components still get the scoped normalization', async ({ page }) => {
    // PageTitle renders an h1 with data-vane-type — preflight margin
    // zeroing must still apply within VaneUI subtrees
    const vaneHeading = page.locator('[data-vane-type] h1, h1[data-vane-type]').first();
    const marginTop = parseFloat(await getStyle(vaneHeading, 'margin-top'));
    expect(marginTop).toBe(0);
  });
});
