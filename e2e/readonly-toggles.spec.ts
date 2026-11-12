import { test, expect, type Page } from './base';

// A read-only Checkbox, Switch or Radio must not report a change. Each fixture is controlled
// and prints the state a form would store, so a click, a click on the label and Space on the
// focused control have to leave both the stored value and the rendered box as they were.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="readonly-toggles"]');
});

const byId = (page: Page, id: string) => page.locator(`[data-testid="${id}"]`);

async function activateEveryWay(page: Page, control: string, text: string) {
  await byId(page, control).click();
  await byId(page, text).click();
  await byId(page, control).focus();
  await page.keyboard.press('Space');
}

for (const control of ['ro-checkbox', 'ro-switch'] as const) {
  test(`${control}: click, label click and Space change neither the state nor the box`, async ({ page }) => {
    await activateEveryWay(page, control, `${control}-text`);
    await expect(byId(page, `${control}-state`)).toHaveText('false');
    await expect(byId(page, control)).not.toBeChecked();
    await expect(byId(page, control)).toBeFocused();
  });
}

test('a Radio in a read-only RadioGroup cannot be chosen: the group keeps its value', async ({ page }) => {
  await activateEveryWay(page, 'ro-radio-b', 'ro-radio-b-text');
  await expect(byId(page, 'ro-radio-state')).toHaveText('a');
  await expect(byId(page, 'ro-radio-a')).toBeChecked();
  await expect(byId(page, 'ro-radio-b')).not.toBeChecked();
});

test('arrow keys do not move the selection of a read-only RadioGroup', async ({ page }) => {
  await byId(page, 'ro-radio-a').focus();
  await page.keyboard.press('ArrowDown');
  await expect(byId(page, 'ro-radio-state')).toHaveText('a');
  await expect(byId(page, 'ro-radio-a')).toBeChecked();
  await expect(byId(page, 'ro-radio-b')).not.toBeChecked();
});
