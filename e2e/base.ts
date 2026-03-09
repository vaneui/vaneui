import { test as base } from '@playwright/test';

export { expect, type Page, type Locator } from '@playwright/test';

export const test = base.extend<{ testPage: string }>({
  testPage: ['/test.html', { option: true }],
});
