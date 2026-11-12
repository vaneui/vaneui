import { test, expect, getStyle, type Page } from './base';

// Input keeps its wrapper span in both validity states, so the <input> is the same DOM node
// when `invalid` flips and live validation does not drop focus or the typed text. While the
// input is valid the span is `display: contents`: it must add nothing to the layout. Each
// context below renders twice at one width, once with Input and once with the bare themed
// <input> (no wrapper), and the two have to match box for box.

const CONTEXTS = [
  'block', 'inline', 'row', 'col', 'label', 'field', 'class-width', 'style-width', 'wfit', 'mobile-hide',
] as const;

const WIDE = { width: 1440, height: 900 };
const MOBILE = { width: 375, height: 812 };

type Layout = {
  width: number;
  height: number;
  boxes: { tag: string; x: number; y: number; width: number; height: number }[];
};

/** Box of every element under a fixture, relative to the fixture; Input's wrapper span is left out. */
async function layoutOf(page: Page, testId: string): Promise<Layout> {
  return page.locator(`[data-testid="${testId}"]`).evaluate((root) => {
    const origin = root.getBoundingClientRect();
    const round = (n: number) => Math.round(n * 100) / 100;
    const boxes = Array.from(root.querySelectorAll('*'))
      .filter((el) => !el.classList.contains('vane-input-wrapper'))
      .map((el) => {
        const rect = el.getBoundingClientRect();
        // an element without a box reports an all-zero rect at the viewport origin, so it has no offset to compare
        const boxless = rect.width === 0 && rect.height === 0;
        return {
          tag: el.tagName.toLowerCase(),
          x: boxless ? 0 : round(rect.x - origin.x),
          y: boxless ? 0 : round(rect.y - origin.y),
          width: round(rect.width),
          height: round(rect.height),
        };
      });
    return { width: round(origin.width), height: round(origin.height), boxes };
  });
}

/** Every computed property of the fixture's <input>. */
async function inputStyleOf(page: Page, testId: string): Promise<Record<string, string>> {
  return page.locator(`[data-testid="${testId}"] input`).evaluate((input) => {
    const computed = getComputedStyle(input);
    const style: Record<string, string> = {};
    for (let i = 0; i < computed.length; i++) {
      style[computed[i]] = computed.getPropertyValue(computed[i]);
    }
    return style;
  });
}

test.beforeEach(async ({ page, testPage }) => {
  await page.setViewportSize(WIDE);
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="form-state-section"]');
});

test.describe('a valid Input lays out exactly like the bare <input>', () => {
  for (const context of CONTEXTS) {
    test(`${context}: same boxes as the reference`, async ({ page }) => {
      const actual = await layoutOf(page, `input-layout-${context}-actual`);
      const reference = await layoutOf(page, `input-layout-${context}-reference`);
      expect(actual.boxes.some((box) => box.tag === 'input' && box.width > 0 && box.height > 0)).toBe(true);
      expect(actual).toEqual(reference);
    });

    test(`${context}: the <input> computes the same styles as the reference`, async ({ page }) => {
      expect(await inputStyleOf(page, `input-layout-${context}-actual`))
        .toEqual(await inputStyleOf(page, `input-layout-${context}-reference`));
    });
  }

  test('the wrapper generates no box while valid', async ({ page }) => {
    for (const context of CONTEXTS) {
      const fixture = page.locator(`[data-testid="input-layout-${context}-actual"]`);
      const wrapper = fixture.locator('.vane-input-wrapper');
      await expect(wrapper).toHaveCount(1);
      expect(await getStyle(wrapper, 'display')).toBe('contents');
      // the reference really is unwrapped
      await expect(page.locator(`[data-testid="input-layout-${context}-reference"] .vane-input-wrapper`)).toHaveCount(0);
    }
  });

  test('a hidden Input leaves no box behind below the breakpoint', async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await expect(page.locator('[data-testid="input-layout-mobile-hide-actual"] input')).toBeHidden();
    await expect(page.locator('[data-testid="input-layout-mobile-hide-reference"] input')).toBeHidden();
    expect(await layoutOf(page, 'input-layout-mobile-hide-actual'))
      .toEqual(await layoutOf(page, 'input-layout-mobile-hide-reference'));
  });
});

test.describe('live validation keeps the <input> node', () => {
  // a JS property survives only on the same node: a re-created <input> would not carry it
  const tag = (page: Page, testId: string) =>
    page.locator(`[data-testid="${testId}"]`).evaluate((el) => { (el as HTMLElement & { sameNode?: boolean }).sameNode = true; });
  const isTagged = (page: Page, testId: string) =>
    page.locator(`[data-testid="${testId}"]`).evaluate((el) => (el as HTMLElement & { sameNode?: boolean }).sameNode === true);

  for (const testId of ['live-input', 'live-uncontrolled', 'live-field-input']) {
    test(`${testId}: typing through the invalid state keeps focus and the text`, async ({ page }) => {
      const input = page.locator(`[data-testid="${testId}"]`);
      await input.click();
      await tag(page, testId);

      // "ab" is not an email yet: the field turns invalid mid-word
      await page.keyboard.type('ab');
      await expect(input).toHaveAttribute('aria-invalid', 'true');
      await expect(input).toBeFocused();
      await expect(input).toHaveValue('ab');
      const wrapper = page.locator('.vane-input-wrapper', { has: input });
      await expect(wrapper.locator('.vane-input-error-icon svg')).toBeVisible();
      expect(await getStyle(wrapper, 'display')).toBe('flex');
      expect(await getStyle(wrapper, 'position')).toBe('relative');

      // "ab@c" is valid again: the field goes back without losing a keystroke
      await page.keyboard.type('@c');
      await expect(input).not.toHaveAttribute('aria-invalid');
      await expect(input).toBeFocused();
      await expect(input).toHaveValue('ab@c');
      await expect(wrapper.locator('.vane-input-error-icon')).toHaveCount(0);
      expect(await getStyle(wrapper, 'display')).toBe('contents');
      expect(await isTagged(page, testId)).toBe(true);
    });
  }

  test('a Field error appears and clears around the same focused input', async ({ page }) => {
    const input = page.locator('[data-testid="live-field-input"]');
    const error = page.locator('[data-testid="live-field"] .vane-field-error');
    await input.click();
    await page.keyboard.type('abcd');
    await expect(error).toHaveText('Enter an email address');
    await expect(input).toBeFocused();
    await page.keyboard.type('@e');
    await expect(error).toHaveCount(0);
    await expect(input).toHaveValue('abcd@e');
  });
});
