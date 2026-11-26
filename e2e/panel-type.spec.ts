import { test, expect, getFontSize } from './base';

// Title and Text inside a Card or Modal, and the Breadcrumb text at every size
// (fixtures: PanelTypeFixtures in e2e/fixtures/test-fixtures.tsx).

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="panel-type-section"]');
});

const fs = (page: import('@playwright/test').Page, id: string) => getFontSize(page.getByTestId(id));

test.describe('Card and Modal type scale', () => {
  test('a Title in a Card is 18px and an unsized Text 14px; the page keeps 24 and 16', async ({ page }) => {
    // Title kept the page heading size (24px) and Text the page copy size (16px) in a Card
    expect(await fs(page, 'pt-card-title')).toBe(18);
    expect(await fs(page, 'pt-card-text')).toBe(14);
    expect(await fs(page, 'pt-page-title')).toBe(24);
    expect(await fs(page, 'pt-page-text')).toBe(16);
  });

  test('a Text with a size prop keeps its size in a Card', async ({ page }) => {
    expect(await fs(page, 'pt-card-text-sm')).toBe(14);
    expect(await fs(page, 'pt-card-text-lg')).toBe(18);
  });

  test('an unsized List and Blockquote in a Card match its 14px text; a sized List keeps its size', async ({ page }) => {
    // they kept the page copy size (16px), so a feature list sat a step above the card text
    expect(await fs(page, 'pt-card-list')).toBe(14);
    expect(await fs(page, 'pt-card-list-item')).toBe(14);
    expect(await fs(page, 'pt-card-quote')).toBe(14);
    expect(await fs(page, 'pt-card-list-lg')).toBe(18);
    expect(await fs(page, 'pt-page-list')).toBe(16);
  });

  test('a Title in a Card runs 14/16/18/20/24px from xs to xl', async ({ page }) => {
    const want = { xs: 14, sm: 16, md: 18, lg: 20, xl: 24 };
    for (const [size, px] of Object.entries(want)) {
      expect(await fs(page, `pt-card-title-${size}`)).toBe(px);
    }
  });

  test('the parts, and a Row in the Card, count; a Section in it and bare text do not', async ({ page }) => {
    expect(await fs(page, 'pt-parts-title')).toBe(18);
    expect(await fs(page, 'pt-parts-text')).toBe(14);
    expect(await fs(page, 'pt-card-row-title')).toBe(18);
    expect(await fs(page, 'pt-card-section-title')).toBe(24);
    expect(await fs(page, 'pt-card-bare')).toBe(16);
  });

  test('the Card title keeps 18px on a phone, where a page Title is 20px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    expect(await fs(page, 'pt-card-title')).toBe(18);
    expect(await fs(page, 'pt-page-title')).toBe(20);
  });

  test('a Title in a ModalHeader is 18px and a Text in a ModalBody 14px', async ({ page }) => {
    await page.getByTestId('pt-modal-open').click();
    await expect(page.getByTestId('pt-modal')).toBeVisible();
    expect(await fs(page, 'pt-modal-title')).toBe(18);
    expect(await fs(page, 'pt-modal-text')).toBe(14);
  });
});

test.describe('Breadcrumb text size', () => {
  test('follows the size prop: 12/14/16/18/20px from xs to xl', async ({ page }) => {
    // the text was 16px at every size
    const want = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 };
    for (const [size, px] of Object.entries(want)) {
      expect(await fs(page, `pt-breadcrumb-${size}-link`)).toBe(px);
      expect(await fs(page, `pt-breadcrumb-${size}-current`)).toBe(px);
    }
  });

  test('is 14px by default, the text size of a default Button', async ({ page }) => {
    expect(await fs(page, 'pt-breadcrumb-default-current')).toBe(14);
    expect(await fs(page, 'pt-breadcrumb-default-current')).toBe(await getFontSize(page.getByTestId('pt-button-default')));
  });
});
