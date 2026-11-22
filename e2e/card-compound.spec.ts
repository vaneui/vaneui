import { test, expect, getStyle, type Locator } from './base';

// A Card with CardHeader/CardBody/CardFooter is in compound mode: the parts own the
// inset and the Card itself has none. That must hold however the parts reach the Card:
// as direct children, through a fragment, through a consumer component, or as a lazily
// resolved type (the shape of a child that arrives from a Server Component). The last
// two cannot be seen by Card.tsx, so the stylesheet decides from the rendered DOM.

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, inset: 24 },
  { name: 'tablet', width: 800, height: 900, inset: 20 },
  { name: 'mobile', width: 400, height: 900, inset: 16 },
] as const;

const SIDES = ['top', 'right', 'bottom', 'left'] as const;
const GAP = 12; // Card md: --gap-unit 3 (a plain Card; a compound Card has no gap between its parts)

const padding = (l: Locator) =>
  Promise.all(SIDES.map(side => getStyle(l, `padding-${side}`).then(parseFloat)));
const gap = (l: Locator) => getStyle(l, 'row-gap').then(parseFloat);
const byId = (page: import('./base').Page, id: string) => page.locator(`[data-testid="${id}"]`);

test.beforeEach(async ({ page, testPage }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="theme-engine-section"]');
  await page.waitForSelector('[data-testid="cc-lazy-body"]');
});

for (const vp of VIEWPORTS) {
  test.describe(`compound Card at ${vp.name} width`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
    });

    test('a plain Card keeps its own inset and gap', async ({ page }) => {
      const card = byId(page, 'cc-plain');
      expect(await padding(card)).toEqual([vp.inset, vp.inset, vp.inset, vp.inset]);
      expect(await gap(card)).toBe(GAP);
    });

    for (const form of ['direct', 'fragment', 'wrapped'] as const) {
      test(`${form} parts: the Card has no inset, the parts carry it`, async ({ page }) => {
        const card = byId(page, `cc-${form}`);
        expect(await padding(card)).toEqual([0, 0, 0, 0]);
        // the parts meet without the Card's gap, and only the body pads the sides they share
        expect(await gap(card)).toBe(0);
        expect(await padding(byId(page, `cc-${form}-header`))).toEqual([vp.inset, vp.inset, 0, vp.inset]);
        expect(await padding(byId(page, `cc-${form}-body`))).toEqual([vp.inset, vp.inset, vp.inset, vp.inset]);
        expect(await padding(byId(page, `cc-${form}-footer`))).toEqual([0, vp.inset, vp.inset, vp.inset]);
      });
    }

    test('fragment and wrapped parts lay out exactly like direct parts', async ({ page }) => {
      const box = (id: string) => byId(page, id).evaluate(el => {
        const r = el.getBoundingClientRect();
        return { width: r.width, height: r.height };
      });
      const direct = await box('cc-direct');
      expect(await box('cc-fragment')).toEqual(direct);
      expect(await box('cc-wrapped')).toEqual(direct);
      for (const part of ['header', 'body', 'footer'] as const) {
        const directPart = await box(`cc-direct-${part}`);
        expect(await box(`cc-fragment-${part}`)).toEqual(directPart);
        expect(await box(`cc-wrapped-${part}`)).toEqual(directPart);
      }
    });

    test('a lazily resolved part makes the Card compound too', async ({ page }) => {
      expect(await padding(byId(page, 'cc-lazy'))).toEqual([0, 0, 0, 0]);
      expect(await padding(byId(page, 'cc-lazy-body'))).toEqual([vp.inset, vp.inset, vp.inset, vp.inset]);
    });

    test('an explicit padding prop keeps the inset on both levels', async ({ page }) => {
      for (const id of ['cc-own-direct', 'cc-own-wrapped', 'cc-own-direct-body', 'cc-own-wrapped-body']) {
        expect(await padding(byId(page, id))).toEqual([vp.inset, vp.inset, vp.inset, vp.inset]);
      }
    });

    test('header text sits one inset above the body text', async ({ page }) => {
      const edge = (id: string, side: 'top' | 'bottom') =>
        byId(page, id).evaluate((el, s) => el.getBoundingClientRect()[s], side);
      expect(await edge('cc-direct-body', 'top')).toBeCloseTo(await edge('cc-direct-header', 'bottom'), 1);
      expect(await edge('cc-direct-footer', 'top')).toBeCloseTo(await edge('cc-direct-body', 'bottom'), 1);
    });

    test('a divider line or a filled part keeps the padding beside it', async ({ page }) => {
      expect(await padding(byId(page, 'cc-divided-header'))).toEqual([vp.inset, vp.inset, vp.inset, vp.inset]);
      expect(await padding(byId(page, 'cc-divided-footer'))).toEqual([vp.inset, vp.inset, vp.inset, vp.inset]);
    });

    test('a header right above a footer leaves one inset between them', async ({ page }) => {
      expect(await padding(byId(page, 'cc-nobody-header'))).toEqual([vp.inset, vp.inset, 0, vp.inset]);
      expect(await padding(byId(page, 'cc-nobody-footer'))).toEqual([vp.inset, vp.inset, vp.inset, vp.inset]);
    });

    test('a className on a part wins over the dropped side', async ({ page }) => {
      const [top, , bottom] = await padding(byId(page, 'cc-classname-header'));
      expect([top, bottom]).toEqual([8, 8]);
    });

    test('a part nested below a plain element leaves the Card padded', async ({ page }) => {
      expect(await padding(byId(page, 'cc-nested'))).toEqual([vp.inset, vp.inset, vp.inset, vp.inset]);
    });
  });
}

test.describe('compound Card with responsiveSizing off', () => {
  // non-responsive padding reads --py/--px, which un-sized parts inherit from the Card
  test('the Card inset is zeroed while the parts keep the Card value', async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 900 });
    expect(await padding(byId(page, 'cc-static-plain'))).toEqual([24, 24, 24, 24]);
    for (const form of ['direct', 'wrapped'] as const) {
      expect(await padding(byId(page, `cc-static-${form}`))).toEqual([0, 0, 0, 0]);
      expect(await padding(byId(page, `cc-static-${form}-body`))).toEqual([24, 24, 24, 24]);
    }
    expect(await padding(byId(page, 'cc-static-wrapped-header'))).toEqual([24, 24, 0, 24]);
    expect(await padding(byId(page, 'cc-static-wrapped-footer'))).toEqual([0, 24, 24, 24]);
  });

  // the parts keep their own responsiveSizing default; they used to inherit the Card's tablet
  // and mobile units and shrink with the viewport although the Card had opted out
  for (const vp of VIEWPORTS) {
    test(`parts of a Card that opts out keep the desktop inset at ${vp.name} width`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      for (const id of ['cc-static-card', 'cc-static-card-wrapped']) {
        expect(await padding(byId(page, id))).toEqual([0, 0, 0, 0]);
        expect(await padding(byId(page, `${id}-header`))).toEqual([24, 24, 0, 24]);
        expect(await padding(byId(page, `${id}-body`))).toEqual([24, 24, 24, 24]);
        expect(await padding(byId(page, `${id}-footer`))).toEqual([0, 24, 24, 24]);
      }
      // a responsive Card's parts still follow the viewport
      expect(await padding(byId(page, 'cc-direct-body'))).toEqual([vp.inset, vp.inset, vp.inset, vp.inset]);
    });
  }
});

test.describe('compound Modal', () => {
  test('header, body and footer meet like the Card parts', async ({ page }) => {
    await page.waitForSelector('[data-testid="z-modal-content"]');
    const modal = byId(page, 'z-modal-content');
    expect(await gap(modal)).toBe(0);
    const [top, , bottom] = await padding(modal.locator('.vane-modal-header'));
    expect(top).toBeGreaterThan(0);
    expect(bottom).toBe(0);
    const [bodyTop, , bodyBottom] = await padding(modal.locator('.vane-modal-body'));
    expect(bodyTop).toBe(top);
    expect(bodyBottom).toBe(top);
  });
});
