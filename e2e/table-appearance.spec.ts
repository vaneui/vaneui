import { test, expect, getStyle, getColor, getBg, type Page } from './base';

// A Table's appearance and variant reach its rows and cells: cells carry no appearance
// of their own, so the row rules and the header text read the colors the Table (or a
// row between them) resolved. `outline` colors the lines, `filled` fills the surface.
// The default Table must keep the look it always had.

const TRANSPARENT = 'rgba(0, 0, 0, 0)';

const byId = (page: Page, id: string) => page.locator(`[data-testid="${id}"]`);
const rowRule = (page: Page, id: string) => getStyle(byId(page, id), 'border-bottom-color');

/** Resolve a design token to the computed color the browser reports for it. */
async function token(page: Page, name: string): Promise<string> {
  return page.evaluate((tokenName) => {
    const probe = document.createElement('span');
    probe.style.color = `var(${tokenName})`;
    document.body.appendChild(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    return color;
  }, name);
}

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="theme-engine-section"]');
});

test.describe('Table appearance', () => {
  test('the default Table keeps neutral row rules, muted header text and no surface', async ({ page }) => {
    const border = await token(page, '--color-border-secondary');
    expect(await rowRule(page, 'ta-default-th')).toBe(border);
    expect(await rowRule(page, 'ta-default-td')).toBe(border);
    expect(await getColor(byId(page, 'ta-default-th'))).toBe(await token(page, '--color-text-secondary'));

    // body text is whatever the page gives the table: the Table sets no text color
    const pageColor = await byId(page, 'ta-default').evaluate(el => getComputedStyle(el.parentElement!).color);
    expect(await getColor(byId(page, 'ta-default'))).toBe(pageColor);
    expect(await getColor(byId(page, 'ta-default-td'))).toBe(pageColor);

    for (const id of ['ta-default', 'ta-default-tr', 'ta-default-th', 'ta-default-td']) {
      expect(await getBg(byId(page, id))).toBe(TRANSPARENT);
    }
  });

  test('the default Table matches a Table from before the cascade fixtures', async ({ page }) => {
    // table-el is the long-standing default fixture: same colors on both
    expect(await rowRule(page, 'ta-default-th')).toBe(await rowRule(page, 'table-th'));
    expect(await rowRule(page, 'ta-default-td')).toBe(await rowRule(page, 'table-td'));
    expect(await getColor(byId(page, 'ta-default-th'))).toBe(await getColor(byId(page, 'table-th')));
    expect(await getColor(byId(page, 'ta-default-td'))).toBe(await getColor(byId(page, 'table-td')));
  });

  test('an outline appearance colors the row rules and the header text', async ({ page }) => {
    const border = await token(page, '--color-border-success');
    expect(border).not.toBe(await token(page, '--color-border-secondary'));
    expect(await rowRule(page, 'ta-success-th')).toBe(border);
    expect(await rowRule(page, 'ta-success-td')).toBe(border);
    expect(await getColor(byId(page, 'ta-success-th'))).toBe(await token(page, '--color-text-success'));
    // outline leaves the surface alone
    expect(await getBg(byId(page, 'ta-success'))).toBe(TRANSPARENT);
    expect(await getBg(byId(page, 'ta-success-td'))).toBe(TRANSPARENT);
  });

  test('the outer border and the row rules share the Table\'s color', async ({ page }) => {
    const border = await token(page, '--color-border-danger');
    for (const side of ['top', 'right', 'bottom', 'left']) {
      expect(await getStyle(byId(page, 'ta-danger-border'), `border-${side}-color`)).toBe(border);
    }
    expect(await rowRule(page, 'ta-danger-border-td')).toBe(border);
  });

  test('a filled Table fills its surface and its text follows the fill', async ({ page }) => {
    const bg = await token(page, '--color-bg-filled-secondary');
    const text = await token(page, '--color-text-filled-secondary');
    expect(bg).not.toBe(TRANSPARENT);
    expect(await getBg(byId(page, 'ta-filled'))).toBe(bg);
    for (const id of ['ta-filled', 'ta-filled-th', 'ta-filled-td', 'ta-filled-text']) {
      expect(await getColor(byId(page, id))).toBe(text);
    }
    // cells paint nothing of their own, so the Table's fill shows through
    for (const id of ['ta-filled-tr', 'ta-filled-th', 'ta-filled-td']) {
      expect(await getBg(byId(page, id))).toBe(TRANSPARENT);
    }
    // filled has no border color, as on every other filled surface
    expect(await rowRule(page, 'ta-filled-td')).toBe(TRANSPARENT);
  });

  test('a filled Table with an appearance fills in that appearance', async ({ page }) => {
    const bg = await token(page, '--color-bg-filled-success');
    expect(bg).not.toBe(await token(page, '--color-bg-filled-secondary'));
    expect(await getBg(byId(page, 'ta-filled-success'))).toBe(bg);
    const text = await token(page, '--color-text-filled-success');
    expect(await getColor(byId(page, 'ta-filled-success-th'))).toBe(text);
    expect(await getColor(byId(page, 'ta-filled-success-td'))).toBe(text);
  });

  test('a cell\'s own appearance wins over the Table\'s', async ({ page }) => {
    const border = await token(page, '--color-border-danger');
    expect(border).not.toBe(await token(page, '--color-border-success'));
    expect(await rowRule(page, 'ta-own-th')).toBe(border);
    expect(await rowRule(page, 'ta-own-td')).toBe(border);
    expect(await getColor(byId(page, 'ta-own-th'))).toBe(await token(page, '--color-text-danger'));
  });

  test('a filled row passes its colors to its cells, other rows keep the Table\'s', async ({ page }) => {
    expect(await getBg(byId(page, 'ta-row-tr'))).toBe(await token(page, '--color-bg-filled-info'));
    const text = await token(page, '--color-text-filled-info');
    expect(await getColor(byId(page, 'ta-row-th'))).toBe(text);
    expect(await getColor(byId(page, 'ta-row-td'))).toBe(text);
    expect(await rowRule(page, 'ta-row-plain-td')).toBe(await token(page, '--color-border-secondary'));
  });

  test('cells outside a Table keep the neutral palette inside a colored parent', async ({ page }) => {
    const border = await token(page, '--color-border-secondary');
    expect(border).not.toBe(await token(page, '--color-border-danger'));
    expect(await rowRule(page, 'ta-standalone-th')).toBe(border);
    expect(await rowRule(page, 'ta-standalone-td')).toBe(border);
    expect(await getColor(byId(page, 'ta-standalone-th'))).toBe(await token(page, '--color-text-secondary'));
  });
});
