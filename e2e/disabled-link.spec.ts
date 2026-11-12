import { test, expect } from './base';

// A disabled Chip, Badge or Code with `href` is a placeholder link: the keyboard can still
// reach it (so it is discoverable), but neither Enter nor a click may follow it. Each fixture
// points at a hash, so a followed link shows up in the page URL.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="disabled-links"]');
});

for (const name of ['chip', 'badge', 'code'] as const) {
  test(`a disabled link ${name} takes focus but cannot be followed`, async ({ page }) => {
    const link = page.locator(`[data-testid="disabled-link-${name}"]`);
    await expect(link).toHaveAttribute('aria-disabled', 'true');
    await expect(link).not.toHaveAttribute('href');

    await link.focus();
    await expect(link).toBeFocused();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Space');
    // the disabled styling blocks the pointer, so a click is sent to the element itself
    await link.dispatchEvent('click');

    expect(new URL(page.url()).hash).toBe('');
  });
}
