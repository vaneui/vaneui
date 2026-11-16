import AxeBuilder from '@axe-core/playwright';
import { test, expect, type Page } from './base';

// Automated accessibility gate: axe scans the full fixture page (which
// renders essentially every component and variant), so coverage scales
// automatically as components are added to the harness — no per-component
// test-writing burden. Fails on serious/critical violations.
//
// The color-contrast rule is excluded here: contrast is gated by the
// dedicated filled-contrast.spec.ts (plus the dark grid in dark-mode.spec.ts),
// which owns the threshold policy for the appearance matrix. Be aware of what
// that policy currently is: a 3:1 floor (the WCAG large-text/UI bar) over a
// curated component grid — NOT the 4.5:1 normal-text bar, and NOT every text
// node on the page. Raising the light palette to 4.5:1 needs design decisions
// (tertiary filled sits ≈3.9:1) and is tracked in the architecture-review
// tracker's follow-ups; axe's color-contrast rule stays disabled so the gate
// doesn't double-report the same curated pairs at a different threshold.

type Violation = {
  id: string;
  impact: string | null | undefined;
  help: string;
  nodes: { html: string }[];
};

const summarize = (violations: Violation[]) =>
  violations
    .filter(v => v.impact === 'serious' || v.impact === 'critical')
    .map(v => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      examples: v.nodes.slice(0, 3).map(n => n.html),
    }));

test.describe('axe accessibility scan', () => {
  test('fixture page has no serious or critical violations', async ({ page, testPage }) => {
    await page.goto(testPage);
    await page.waitForSelector('[data-testid="variant-inherit"]');

    const results = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze();

    expect(summarize(results.violations as Violation[])).toEqual([]);
  });
});

// The scan above sees the page with every on-demand overlay closed. Each overlay type is opened here
// and the page scanned again, so what only exists while it is open is checked too: the dialog's
// name, the menu's structure, the scroll box of a long menu, the inert background of a Modal.
test.describe('axe accessibility scan with an overlay open', () => {
  const T = (id: string) => `[data-testid="${id}"]`;

  const scan = async (page: Page) => {
    const results = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze();
    return summarize(results.violations as Violation[]);
  };

  test.beforeEach(async ({ page, testPage }) => {
    await page.goto(testPage);
    await page.waitForSelector(T('overlay-behavior-section'));
  });

  test('Modal', async ({ page }) => {
    await page.locator(T('ob-drag-open')).click();
    await expect(page.locator(T('ob-drag-modal'))).toBeVisible();
    await expect(page.locator(T('ob-drag-modal'))).toHaveAccessibleName('Form');

    expect(await scan(page)).toEqual([]);
  });

  test('Popup opened by a PopupTrigger', async ({ page }) => {
    await page.locator(T('ob-name-trigger')).click();
    const popup = page.locator(T('ob-name-popup'));
    await expect(popup).toHaveAttribute('data-state', 'entered');
    // a dialog needs a name: it takes the trigger's
    await expect(popup).toHaveRole('dialog');
    await expect(popup).toHaveAccessibleName('Filters');

    expect(await scan(page)).toEqual([]);
  });

  test('Menu', async ({ page }) => {
    await page.locator(T('ob-short-trigger')).click();
    const menu = page.locator(T('ob-short-menu'));
    await expect(menu).toHaveAttribute('data-state', 'entered');
    await expect(menu).toHaveAccessibleName('Short menu');

    expect(await scan(page)).toEqual([]);
  });

  test('Menu long enough to scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 420 });
    const trigger = page.locator(T('ob-tall-trigger'));
    await trigger.focus();
    await page.keyboard.press('Enter');
    const menu = page.locator(T('ob-tall-menu'));
    await expect(menu).toHaveAttribute('data-state', 'entered');
    // the menu really scrolls here, which is what the scan has to see
    expect(await menu.evaluate((el) => {
      const box = el.querySelector(':scope > .vane-popup-scroll') as HTMLElement;
      return box.scrollHeight > box.clientHeight;
    })).toBe(true);

    expect(await scan(page)).toEqual([]);
  });

  test('Tooltip', async ({ page }) => {
    const trigger = page.locator(T('ob-anchor-trigger'));
    await trigger.scrollIntoViewIfNeeded();
    await trigger.hover();
    const tooltip = page.locator(T('ob-anchor-tooltip'));
    await expect(tooltip).toHaveAttribute('data-state', 'entered');
    await expect(trigger).toHaveAccessibleDescription('More actions');

    expect(await scan(page)).toEqual([]);
  });
});
