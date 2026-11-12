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
const GAP = 12; // Card md: --gap-unit 3

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
        expect(await gap(card)).toBe(GAP);
        for (const part of ['header', 'body', 'footer'] as const) {
          expect(await padding(byId(page, `cc-${form}-${part}`))).toEqual([vp.inset, vp.inset, vp.inset, vp.inset]);
        }
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
  });
});
