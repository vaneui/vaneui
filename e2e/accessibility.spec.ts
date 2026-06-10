import AxeBuilder from '@axe-core/playwright';
import { test, expect } from './base';

// Automated accessibility gate: axe scans the full fixture page (which
// renders essentially every component and variant), so coverage scales
// automatically as components are added to the harness — no per-component
// test-writing burden. Fails on serious/critical violations.
//
// The color-contrast rule is excluded here: contrast is gated by the
// dedicated filled-contrast.spec.ts, which owns the threshold policy for
// the appearance matrix.

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
