import { test, expect, getStyle, type Locator } from './base';

// Field, Alert, Spinner and Tooltip in a real browser: association and live-region
// semantics that jsdom can assert, plus the computed geometry it cannot.

const WIDE = { width: 1440, height: 900 };
const PHONE = { width: 390, height: 844 };

const padX = (l: Locator) => getStyle(l, 'padding-left').then(parseFloat);

test.beforeEach(async ({ page, testPage }) => {
  await page.setViewportSize(WIDE);
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="tier2-section"]');
});

test.describe('Field', () => {
  test('points its label at the control and describes it', async ({ page }) => {
    const input = page.locator('[data-testid="tier2-field-input"]');
    const inputId = await input.getAttribute('id');
    expect(inputId).toBeTruthy();

    const label = page.locator('[data-testid="tier2-field"] label');
    expect(await label.getAttribute('for')).toBe(inputId);

    const describedBy = (await input.getAttribute('aria-describedby'))!.split(' ');
    expect(describedBy).toHaveLength(2);
    for (const id of describedBy) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test('marks the control invalid when it carries an error', async ({ page }) => {
    await expect(page.locator('[data-testid="tier2-field-input"]')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('[data-testid="tier2-field-plain-input"]')).not.toHaveAttribute('aria-invalid', 'true');
  });

  test('stacks its parts with a tighter gap than the layout curve', async ({ page }) => {
    const gap = parseFloat(await getStyle(page.locator('[data-testid="tier2-field"]'), 'row-gap'));
    expect(gap).toBe(6); // md field: --gap-unit 1.5
    expect(gap).toBeLessThan(16); // the generic layout md gap
  });
});

test.describe('Alert', () => {
  test('is a live region, assertive by default and polite on request', async ({ page }) => {
    await expect(page.locator('[data-testid="tier2-alert"]')).toHaveAttribute('role', 'alert');
    await expect(page.locator('[data-testid="tier2-alert-polite"]')).toHaveAttribute('role', 'status');
  });

  test('paints a surface and ramps its padding down on a phone', async ({ page }) => {
    const alert = page.locator('[data-testid="tier2-alert"]');

    await page.setViewportSize(WIDE);
    expect(await padX(alert)).toBe(16);

    await page.setViewportSize(PHONE);
    expect(await padX(alert)).toBe(8);
  });
});

test.describe('Spinner', () => {
  test('renders a ring that scales with the size prop', async ({ page }) => {
    const md = page.locator('[data-testid="tier2-spinner"]');
    const xl = page.locator('[data-testid="tier2-spinner-xl"]');

    const mdBox = (await md.boundingBox())!;
    const xlBox = (await xl.boundingBox())!;
    expect(mdBox.width).toBeGreaterThan(0);
    expect(xlBox.width).toBeGreaterThan(mdBox.width);
    // the ring is 1em square on both axes, so it stays a circle at every size
    expect(mdBox.width).toBeCloseTo(mdBox.height, 1);
    expect(xlBox.width).toBeCloseTo(xlBox.height, 1);
  });

  test('is round and announced as a live region', async ({ page }) => {
    const spinner = page.locator('[data-testid="tier2-spinner"]');
    await expect(spinner).toHaveAttribute('role', 'status');
    const radius = await getStyle(spinner, 'border-top-left-radius');
    expect(radius).toBe('50%');
  });
});

test.describe('Tooltip', () => {
  test('stays closed until the trigger is hovered, then describes it', async ({ page }) => {
    const trigger = page.locator('[data-testid="tier2-tooltip-trigger"]');
    await expect(page.locator('[data-testid="tier2-tooltip"]')).toHaveCount(0);
    await expect(trigger).not.toHaveAttribute('aria-describedby', /.+/);

    await trigger.hover();
    const tooltip = page.locator('[data-testid="tier2-tooltip"]');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('role', 'tooltip');
    expect(await trigger.getAttribute('aria-describedby')).toBe(await tooltip.getAttribute('id'));
  });

  test('does not advertise disclosure semantics it does not have', async ({ page }) => {
    const trigger = page.locator('[data-testid="tier2-tooltip-trigger"]');
    await trigger.hover();
    await expect(page.locator('[data-testid="tier2-tooltip"]')).toBeVisible();
    await expect(trigger).not.toHaveAttribute('aria-haspopup', /.+/);
    await expect(trigger).not.toHaveAttribute('aria-expanded', /.+/);
  });

  test('opens on keyboard focus, not only on hover', async ({ page }) => {
    await page.locator('[data-testid="tier2-tooltip-trigger"]').focus();
    await expect(page.locator('[data-testid="tier2-tooltip"]')).toBeVisible();
  });
});
