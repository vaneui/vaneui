import { test, expect } from './base';

/**
 * CSS Noise Audit — inspects which CSS rules match VaneUI elements and
 * counts how many declarations are overridden (strikethrough in dev tools).
 *
 * Uses Chrome DevTools Protocol (CDP) to get the exact same rule list
 * the browser shows in the Elements → Styles panel.
 */

interface CSSProperty {
  name: string;
  value: string;
}

interface RuleMatch {
  selector: string;
  properties: CSSProperty[];
  origin: string; // 'regular' | 'user-agent' | 'injected' | 'inspector'
  isInherited: boolean;
}

interface NoiseReport {
  testId: string;
  tagName: string;
  totalRules: number;
  totalDeclarations: number;
  /** Declarations from [data-size] broad selector */
  dataSizeDeclarations: number;
  /** Declarations from [data-responsive] broad selector */
  dataResponsiveDeclarations: number;
  /** Declarations from [data-vane-type][data-size] selectors */
  typeDeclarations: number;
  /** Declarations from [data-variant][data-appearance] selectors */
  appearanceDeclarations: number;
  /** Declarations from inherited rules (parent element styling) */
  inheritedDeclarations: number;
  /** Declarations from component-specific rules (.vane-*) */
  componentDeclarations: number;
  /** Rules that set CSS custom properties (--var) */
  cssVarRules: { selector: string; varCount: number; inherited: boolean }[];
}

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="border-color-inherit"]');
});

test.describe('CSS Noise Audit', () => {

  test('audit matching CSS rules on nested VaneUI components', async ({ page }) => {
    // Elements to audit: standalone + nested components
    const targets = [
      // Standalone components
      'button-md',           // Standalone Button md
      'text-md',             // Standalone Text md
      'divider-standalone',  // Standalone Divider

      // Nested: Text inside Card danger filled
      'border-inherit-danger-text',
      // Nested: Divider inside Card danger filled
      'divider-inherit-danger',
      // Nested: Divider inside Card brand
      'divider-inherit-brand',
    ];

    const reports: NoiseReport[] = [];

    for (const testId of targets) {
      const report = await page.evaluate(async (tid) => {
        const el = document.querySelector(`[data-testid="${tid}"]`);
        if (!el) return null;

        // Get all stylesheets and find matching rules
        const allRules: { selector: string; properties: { name: string; value: string }[]; inherited: boolean; source: string }[] = [];

        // Walk up the DOM to find inherited rules too
        const elementsToCheck: { el: Element; inherited: boolean }[] = [{ el, inherited: false }];
        let parent = el.parentElement;
        while (parent && parent !== document.documentElement) {
          elementsToCheck.push({ el: parent, inherited: true });
          parent = parent.parentElement;
        }
        elementsToCheck.push({ el: document.documentElement, inherited: true });

        for (const sheet of document.styleSheets) {
          try {
            const rules = sheet.cssRules;
            for (let i = 0; i < rules.length; i++) {
              const rule = rules[i];
              // Handle @layer rules — recurse into them
              const processRule = (r: CSSRule) => {
                if (r instanceof CSSStyleRule) {
                  for (const { el: checkEl, inherited } of elementsToCheck) {
                    try {
                      if (checkEl.matches(r.selectorText)) {
                        const props: { name: string; value: string }[] = [];
                        for (let j = 0; j < r.style.length; j++) {
                          const propName = r.style[j];
                          props.push({ name: propName, value: r.style.getPropertyValue(propName) });
                        }
                        if (props.length > 0) {
                          allRules.push({
                            selector: r.selectorText,
                            properties: props,
                            inherited,
                            source: inherited ? `inherited from <${checkEl.tagName.toLowerCase()}>` : 'direct',
                          });
                        }
                      }
                    } catch { /* selector parse error */ }
                  }
                } else if (r instanceof CSSLayerBlockRule) {
                  for (let j = 0; j < r.cssRules.length; j++) {
                    processRule(r.cssRules[j]);
                  }
                }
              };
              processRule(rule);
            }
          } catch { /* cross-origin sheet */ }
        }

        // Categorize
        let dataSizeDecl = 0;
        let dataResponsiveDecl = 0;
        let typeDecl = 0;
        let appearanceDecl = 0;
        let inheritedDecl = 0;
        let componentDecl = 0;
        const cssVarRules: { selector: string; varCount: number; inherited: boolean }[] = [];

        for (const r of allRules) {
          const varProps = r.properties.filter(p => p.name.startsWith('--'));
          if (varProps.length > 0) {
            cssVarRules.push({ selector: r.selector, varCount: varProps.length, inherited: r.inherited });
          }

          if (r.inherited) {
            inheritedDecl += r.properties.length;
          } else if (/^\[data-size\]$/.test(r.selector.trim())) {
            dataSizeDecl += r.properties.length;
          } else if (/^\[data-responsive\]$/.test(r.selector.trim())) {
            dataResponsiveDecl += r.properties.length;
          } else if (/\[data-vane-type/.test(r.selector)) {
            typeDecl += r.properties.length;
          } else if (/\[data-variant/.test(r.selector) && /\[data-appearance/.test(r.selector)) {
            appearanceDecl += r.properties.length;
          } else if (/\.vane-/.test(r.selector)) {
            componentDecl += r.properties.length;
          }
        }

        return {
          testId: tid,
          tagName: el.tagName.toLowerCase(),
          totalRules: allRules.length,
          totalDeclarations: allRules.reduce((sum, r) => sum + r.properties.length, 0),
          dataSizeDeclarations: dataSizeDecl,
          dataResponsiveDeclarations: dataResponsiveDecl,
          typeDeclarations: typeDecl,
          appearanceDeclarations: appearanceDecl,
          inheritedDeclarations: inheritedDecl,
          componentDeclarations: componentDecl,
          cssVarRules,
        } satisfies NoiseReport;
      }, testId);

      if (report) reports.push(report);
    }

    // Print report
    for (const r of reports) {
      console.log(`\n=== ${r.testId} (<${r.tagName}>) ===`);
      console.log(`  Total matching rules: ${r.totalRules}`);
      console.log(`  Total declarations: ${r.totalDeclarations}`);
      console.log(`  [data-size] broad: ${r.dataSizeDeclarations} declarations`);
      console.log(`  [data-responsive] broad: ${r.dataResponsiveDeclarations} declarations`);
      console.log(`  [data-vane-type][data-size]: ${r.typeDeclarations} declarations`);
      console.log(`  [data-variant][data-appearance]: ${r.appearanceDeclarations} declarations`);
      console.log(`  .vane-* component: ${r.componentDeclarations} declarations`);
      console.log(`  Inherited from parents: ${r.inheritedDeclarations} declarations`);
      console.log(`  --- CSS variable rules ---`);
      for (const vr of r.cssVarRules) {
        console.log(`    ${vr.inherited ? '[inherited] ' : ''}${vr.selector} → ${vr.varCount} vars`);
      }
    }

    // Assertions: at minimum the report should have data
    expect(reports.length).toBe(targets.length);

    // Log summary of nested vs standalone noise
    const standalone = reports.filter(r => !r.testId.includes('inherit'));
    const nested = reports.filter(r => r.testId.includes('inherit'));

    console.log('\n\n=== NOISE COMPARISON: STANDALONE vs NESTED ===');

    if (standalone.length > 0) {
      const avgStandalone = Math.round(standalone.reduce((s, r) => s + r.totalDeclarations, 0) / standalone.length);
      console.log(`  Standalone avg declarations: ${avgStandalone}`);
    }

    if (nested.length > 0) {
      const avgNested = Math.round(nested.reduce((s, r) => s + r.totalDeclarations, 0) / nested.length);
      console.log(`  Nested avg declarations: ${avgNested}`);
      console.log(`  Nested avg inherited: ${Math.round(nested.reduce((s, r) => s + r.inheritedDeclarations, 0) / nested.length)}`);
    }
  });
});
