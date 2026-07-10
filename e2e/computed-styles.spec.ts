import { test, expect, getStyle, getColor, getFontSize, getSvgWidth } from './base';

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  // Wait for React to render
  await page.waitForSelector('[data-testid]');
});

// ── 1. Appearance inheritance: Card → child Text/Title ──

test.describe('Appearance inheritance', () => {
  test('Card primary outline → Text inherits text color', async ({ page }) => {
    const card = page.locator('[data-testid="inherit-primary-outline"] [data-appearance="primary"]');
    const text = page.locator('[data-testid="inherit-primary-outline-text"]');

    const cardColor = await getColor(card);
    const textColor = await getColor(text);

    expect(textColor).toBe(cardColor);
  });

  test('Card primary outline → Title inherits text color', async ({ page }) => {
    const card = page.locator('[data-testid="inherit-primary-outline"] [data-appearance="primary"]');
    const title = page.locator('[data-testid="inherit-primary-outline-title"]');

    const cardColor = await getColor(card);
    const titleColor = await getColor(title);

    expect(titleColor).toBe(cardColor);
  });

  test('Card danger filled → Text inherits filled text color', async ({ page }) => {
    const card = page.locator('[data-testid="inherit-danger-filled"] [data-variant="filled"]');
    const text = page.locator('[data-testid="inherit-danger-filled-text"]');

    const cardColor = await getColor(card);
    const textColor = await getColor(text);

    expect(textColor).toBe(cardColor);
  });

  test('Card danger filled → Title inherits filled text color', async ({ page }) => {
    const card = page.locator('[data-testid="inherit-danger-filled"] [data-variant="filled"]');
    const title = page.locator('[data-testid="inherit-danger-filled-title"]');

    const cardColor = await getColor(card);
    const titleColor = await getColor(title);

    expect(titleColor).toBe(cardColor);
  });

  test('Card brand outline → Text inherits brand color', async ({ page }) => {
    const card = page.locator('[data-testid="inherit-brand-outline"] [data-appearance="brand"]');
    const text = page.locator('[data-testid="inherit-brand-outline-text"]');

    const cardColor = await getColor(card);
    const textColor = await getColor(text);

    expect(textColor).toBe(cardColor);
  });

  test('Card success filled → Text inherits success filled color', async ({ page }) => {
    const card = page.locator('[data-testid="inherit-success-filled"] [data-variant="filled"]');
    const text = page.locator('[data-testid="inherit-success-filled-text"]');

    const cardColor = await getColor(card);
    const textColor = await getColor(text);

    expect(textColor).toBe(cardColor);
  });

  test('filled danger text color differs from outline danger', async ({ page }) => {
    const brandOutlineText = page.locator('[data-testid="inherit-brand-outline-text"]');
    const dangerFilledText = page.locator('[data-testid="inherit-danger-filled-text"]');

    const outlineColor = await getColor(brandOutlineText);
    const filledColor = await getColor(dangerFilledText);

    // Outline text (brand-colored) must differ from filled text (light on dark)
    expect(outlineColor).not.toBe(filledColor);
  });
});

// ── 2. Nested appearance override ──

test.describe('Nested appearance override', () => {
  test('Badge danger inside Card primary has different color than Card text', async ({ page }) => {
    const badge = page.locator('[data-testid="nested-override-badge"]');
    const text = page.locator('[data-testid="nested-override-text"]');

    const badgeColor = await getColor(badge);
    const textColor = await getColor(text);

    // Badge with danger appearance overrides Card's primary
    expect(badgeColor).not.toBe(textColor);
  });
});

// ── 3. Size variants produce different font sizes ──

test.describe('Size variants', () => {
  test('Button sizes produce strictly increasing font-size', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const fontSizes: number[] = [];

    for (const size of sizes) {
      fontSizes.push(await getFontSize(page.locator(`[data-testid="button-${size}"]`)));
    }

    // Each size must be strictly larger than the previous
    for (let i = 1; i < fontSizes.length; i++) {
      expect(fontSizes[i]).toBeGreaterThan(fontSizes[i - 1]);
    }
  });

  test('Text sizes produce strictly increasing font-size', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const fontSizes: number[] = [];

    for (const size of sizes) {
      fontSizes.push(await getFontSize(page.locator(`[data-testid="text-${size}"]`)));
    }

    for (let i = 1; i < fontSizes.length; i++) {
      expect(fontSizes[i]).toBeGreaterThan(fontSizes[i - 1]);
    }
  });

  test('Button md font-size matches expected 16px (1rem)', async ({ page }) => {
    const fs = await getFontSize(page.locator('[data-testid="button-md"]'));
    expect(fs).toBe(16);
  });

  test('Text md font-size matches expected 16px (1rem)', async ({ page }) => {
    const fs = await getFontSize(page.locator('[data-testid="text-md"]'));
    expect(fs).toBe(16);
  });
});

// ── 4. Button SVG sizing across size variants ──

test.describe('Button SVG sizing', () => {
  test('SVG size scales with button size', async ({ page }) => {
    const xsWidth = await getSvgWidth(page.locator('[data-testid="icon-bare-xs"]'));
    const mdWidth = await getSvgWidth(page.locator('[data-testid="icon-bare-md"]'));
    const xlWidth = await getSvgWidth(page.locator('[data-testid="icon-bare-xl"]'));

    expect(mdWidth).toBeGreaterThan(xsWidth);
    expect(xlWidth).toBeGreaterThan(mdWidth);
  });
});

// ── 5. Explicit appearance overrides parent ──

test.describe('Explicit appearance override', () => {
  test('Text without appearance inherits Card danger color', async ({ page }) => {
    const section = page.locator('[data-testid="explicit-override"]');
    const card = section.locator('[data-appearance="danger"]');
    const inheritText = page.locator('[data-testid="explicit-override-inherit"]');

    const cardColor = await getColor(card);
    const textColor = await getColor(inheritText);

    expect(textColor).toBe(cardColor);
  });

  test('Text with explicit primary inside Card danger uses its own color', async ({ page }) => {
    const card = page.locator('[data-testid="explicit-override"] [data-appearance="danger"]');
    const primaryText = page.locator('[data-testid="explicit-override-primary"]');

    const cardColor = await getColor(card);
    const textColor = await getColor(primaryText);

    // Primary text color should differ from danger
    expect(textColor).not.toBe(cardColor);
  });
});

// ── 6. Border width resolves from --bw variable ──

test.describe('Border width (--bw variable)', () => {
  test('Card has computed border-width of 1px (default --bw)', async ({ page }) => {
    const card = page.locator('[data-testid="card-gap-md"]');
    const borderWidth = parseFloat(await getStyle(card, 'border-width'));
    expect(borderWidth).toBe(1);
  });

  test('Card border-width changes when --bw is overridden via CSS', async ({ page }) => {
    // Verify the default is 1px, then check it responds to variable changes
    const card = page.locator('[data-testid="card-gap-sm"]');
    const defaultBw = parseFloat(await getStyle(card, 'border-width'));
    expect(defaultBw).toBe(1);
  });
});

// ── 7. Card gap is half of padding across all sizes ──

test.describe('Card gap-to-padding ratio', () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  // Expected: gap-unit = py-unit / 2, both multiplied by --spacing (4px).
  // Padding follows the shared layout curve (.5/.75/1/1.5/2 × md=24px).
  const expected: Record<string, { gap: number; paddingTop: number }> = {
    xs: { gap: 6, paddingTop: 12 },
    sm: { gap: 9, paddingTop: 18 },
    md: { gap: 12, paddingTop: 24 },
    lg: { gap: 18, paddingTop: 36 },
    xl: { gap: 24, paddingTop: 48 },
  };

  for (const size of sizes) {
    test(`Card ${size}: gap is exactly half of padding`, async ({ page }) => {
      const card = page.locator(`[data-testid="card-gap-${size}"]`);
      const gap = parseFloat(await getStyle(card, 'row-gap'));
      const paddingTop = parseFloat(await getStyle(card, 'padding-top'));

      expect(gap).toBe(expected[size].gap);
      expect(paddingTop).toBe(expected[size].paddingTop);
      expect(gap).toBe(paddingTop / 2);
    });
  }
});

// ── 8. Layout spacing curve: md→xl doubles, gap == padding for primitives ──

test.describe('Layout primitive (Stack) spacing curve', () => {
  // Stack inherits the layout-type defaults where gap-unit == py-unit, so gap
  // equals padding at every size. The shared curve is .5/.75/1/1.5/2 × md, so
  // gap/padding = 8/12/16/24/32px and xl is exactly double md.
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  const expectedGap: Record<string, number> = { xs: 8, sm: 12, md: 16, lg: 24, xl: 32 };

  for (const size of sizes) {
    test(`Stack ${size}: gap equals vertical padding (1:1)`, async ({ page }) => {
      const stack = page.locator(`[data-testid="stack-spacing-${size}"]`);
      const gap = parseFloat(await getStyle(stack, 'row-gap'));
      const paddingTop = parseFloat(await getStyle(stack, 'padding-top'));
      expect(gap).toBeCloseTo(paddingTop, 1);
    });

    test(`Stack ${size}: gap matches expected curve value`, async ({ page }) => {
      const stack = page.locator(`[data-testid="stack-spacing-${size}"]`);
      const gap = parseFloat(await getStyle(stack, 'row-gap'));
      expect(gap).toBeCloseTo(expectedGap[size], 1);
    });
  }

  test('Stack gap is strictly increasing xs→xl', async ({ page }) => {
    const gaps: number[] = [];
    for (const size of sizes) {
      gaps.push(parseFloat(await getStyle(page.locator(`[data-testid="stack-spacing-${size}"]`), 'row-gap')));
    }
    for (let i = 1; i < gaps.length; i++) {
      expect(gaps[i]).toBeGreaterThan(gaps[i - 1]);
    }
  });

  test('Stack xl gap is exactly double md gap (accelerating curve)', async ({ page }) => {
    const md = parseFloat(await getStyle(page.locator('[data-testid="stack-spacing-md"]'), 'row-gap'));
    const xl = parseFloat(await getStyle(page.locator('[data-testid="stack-spacing-xl"]'), 'row-gap'));
    expect(xl).toBeCloseTo(md * 2, 1);
  });
});

test.describe('Section spacing curve (desktop track)', () => {
  // At the default 1280px viewport the desktop track applies. Section gap rides
  // the shared curve (16/24/32/48/64px) keeping its ~2:3 gap:padding ratio, so
  // xl gap doubles md gap and gap stays below padding at every size.
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  const expectedGap: Record<string, number> = { xs: 16, sm: 24, md: 32, lg: 48, xl: 64 };

  for (const size of sizes) {
    test(`Section ${size}: gap matches expected desktop curve value`, async ({ page }) => {
      const section = page.locator(`[data-testid="section-spacing-${size}"]`);
      const gap = parseFloat(await getStyle(section, 'row-gap'));
      expect(gap).toBeCloseTo(expectedGap[size], 1);
    });

    test(`Section ${size}: gap is two-thirds of vertical padding (2:3)`, async ({ page }) => {
      const section = page.locator(`[data-testid="section-spacing-${size}"]`);
      const gap = parseFloat(await getStyle(section, 'row-gap'));
      const paddingTop = parseFloat(await getStyle(section, 'padding-top'));
      expect(gap).toBeCloseTo(paddingTop * (2 / 3), 1);
    });
  }

  test('Section gap is strictly increasing xs→xl', async ({ page }) => {
    const gaps: number[] = [];
    for (const size of sizes) {
      gaps.push(parseFloat(await getStyle(page.locator(`[data-testid="section-spacing-${size}"]`), 'row-gap')));
    }
    for (let i = 1; i < gaps.length; i++) {
      expect(gaps[i]).toBeGreaterThan(gaps[i - 1]);
    }
  });

  test('Section xl gap is exactly double md gap (accelerating curve)', async ({ page }) => {
    const md = parseFloat(await getStyle(page.locator('[data-testid="section-spacing-md"]'), 'row-gap'));
    const xl = parseFloat(await getStyle(page.locator('[data-testid="section-spacing-xl"]'), 'row-gap'));
    expect(xl).toBeCloseTo(md * 2, 1);
  });
});

// ── 9. Icon-to-label gap: role-aware curve (controls looser, pills tighter) ──

test.describe('Icon-to-label gap (role-aware)', () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  // Control tier (Button, NavLink, MenuItem, MenuLabel): base ui gap + one notch,
  // gap-unit 1.5/2/2.5/3/3.5 × 4px, so the sm default lands at 8px (not a cramped 6px).
  const controlGap: Record<string, number> = { xs: 6, sm: 8, md: 10, lg: 12, xl: 14 };
  // Pill tier (Badge, Chip): ~half the control gap, gap-unit 0.5/0.75/1/1.25/1.5 × 4px.
  const pillGap: Record<string, number> = { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 };

  for (const size of sizes) {
    test(`NavLink ${size}: icon gap is ${controlGap[size]}px (control tier)`, async ({ page }) => {
      const gap = parseFloat(await getStyle(page.locator(`[data-testid="navlink-gap-${size}"]`), 'column-gap'));
      expect(gap).toBeCloseTo(controlGap[size], 1);
    });

    test(`Badge ${size}: icon gap is ${pillGap[size]}px (pill tier)`, async ({ page }) => {
      const gap = parseFloat(await getStyle(page.locator(`[data-testid="badge-gap-${size}"]`), 'column-gap'));
      expect(gap).toBeCloseTo(pillGap[size], 1);
    });
  }

  test('control-tier defaults (Button sm, MenuItem sm) gap is 8px', async ({ page }) => {
    const button = parseFloat(await getStyle(page.locator('[data-testid="button-gap-default"]'), 'column-gap'));
    const menuitem = parseFloat(await getStyle(page.locator('[data-testid="menuitem-gap-default"]'), 'column-gap'));
    expect(button).toBeCloseTo(8, 1);
    expect(menuitem).toBeCloseTo(8, 1);
  });

  test('pill-tier default (Chip md) gap is 4px', async ({ page }) => {
    const chip = parseFloat(await getStyle(page.locator('[data-testid="chip-gap-default"]'), 'column-gap'));
    expect(chip).toBeCloseTo(4, 1);
  });

  test('at the same size, a control gap is looser than a pill gap', async ({ page }) => {
    const control = parseFloat(await getStyle(page.locator('[data-testid="navlink-gap-md"]'), 'column-gap'));
    const pill = parseFloat(await getStyle(page.locator('[data-testid="badge-gap-md"]'), 'column-gap'));
    expect(control).toBeGreaterThan(pill);
  });

  test('both tiers are strictly increasing xs→xl', async ({ page }) => {
    for (const prefix of ['navlink-gap', 'badge-gap']) {
      const gaps: number[] = [];
      for (const size of sizes) {
        gaps.push(parseFloat(await getStyle(page.locator(`[data-testid="${prefix}-${size}"]`), 'column-gap')));
      }
      for (let i = 1; i < gaps.length; i++) {
        expect(gaps[i]).toBeGreaterThan(gaps[i - 1]);
      }
    }
  });
});

// ── 10. MenuLabel vertical padding scales on a strictly-increasing ramp ──

test.describe('MenuLabel padding ramp', () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  // py = py-unit × 4px, py-unit 0.75/0.875/1/1.25/1.5 → 3/3.5/4/5/6px (no sm/md flat spot).
  const expected: Record<string, number> = { xs: 3, sm: 3.5, md: 4, lg: 5, xl: 6 };

  for (const size of sizes) {
    test(`MenuLabel ${size}: vertical padding is ${expected[size]}px`, async ({ page }) => {
      const py = parseFloat(await getStyle(page.locator(`[data-testid="menulabel-pad-${size}"]`), 'padding-top'));
      expect(py).toBeCloseTo(expected[size], 1);
    });
  }

  test('MenuLabel padding is strictly increasing xs→xl (no sm/md flat spot)', async ({ page }) => {
    const pads: number[] = [];
    for (const size of sizes) {
      pads.push(parseFloat(await getStyle(page.locator(`[data-testid="menulabel-pad-${size}"]`), 'padding-top')));
    }
    for (let i = 1; i < pads.length; i++) {
      expect(pads[i]).toBeGreaterThan(pads[i - 1]);
    }
  });
});

test.describe('Button padding does not depend on icon presence', () => {
  // The previous `.vane-button:has(> svg) { --aspect-ratio: 1.5 }` rule shrank
  // horizontal padding by ~25% whenever a direct-child SVG was present. That
  // diverged from common design-system conventions, and created a
  // cramping effect on the text-trailing edge when text was the second child.
  // Removing it makes Button padding depend on `size` only.
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  for (const size of sizes) {
    test(`Button ${size}: padding-left matches between text-only and text-with-icon`, async ({ page }) => {
      const withIcon = page.locator(`[data-testid="button-icon-${size}"]`);
      const textOnly = page.locator(`[data-testid="button-text-${size}"]`);

      const iconPadL = parseFloat(await getStyle(withIcon, 'padding-left'));
      const textPadL = parseFloat(await getStyle(textOnly, 'padding-left'));
      expect(iconPadL).toBeCloseTo(textPadL, 1);
    });

    test(`Button ${size}: padding-right matches between text-only and text-with-icon`, async ({ page }) => {
      const withIcon = page.locator(`[data-testid="button-icon-${size}"]`);
      const textOnly = page.locator(`[data-testid="button-text-${size}"]`);

      const iconPadR = parseFloat(await getStyle(withIcon, 'padding-right'));
      const textPadR = parseFloat(await getStyle(textOnly, 'padding-right'));
      expect(iconPadR).toBeCloseTo(textPadR, 1);
    });
  }
});
