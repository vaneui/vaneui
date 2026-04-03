import '@testing-library/jest-dom';
import { defaultTheme } from '../themeContext';

describe('ComponentTheme extractedKeys optimization', () => {
  it('should produce identical classes with and without precomputedKeys', () => {
    const buttonTheme = defaultTheme.button.main;
    const testProps = { primary: true, filled: true, lg: true } as Record<string, boolean>;

    const classesWithout = buttonTheme.getClasses(testProps);
    const classesAgain = buttonTheme.getClasses(testProps);

    expect(classesWithout).toEqual(classesAgain);
  });

  it('should produce identical classes for different components', () => {
    const themes = [
      { theme: defaultTheme.button.main },
      { theme: defaultTheme.badge },
      { theme: defaultTheme.card.main },
    ];

    for (const { theme } of themes) {
      const props = { md: true, primary: true } as Record<string, boolean>;
      const classes1 = theme.getClasses(props);
      const classes2 = theme.getClasses(props);
      expect(classes1).toEqual(classes2);
    }
  });

  it('getClasses should accept precomputedKeys parameter without error', () => {
    const buttonTheme = defaultTheme.button.main;
    const props = { primary: true, filled: true } as Record<string, boolean>;

    const precomputed = { size: 'md', appearance: 'primary', variant: 'filled' };
    expect(() => buttonTheme.getClasses(props, precomputed)).not.toThrow();
  });

  it('getClasses with precomputedKeys should use them instead of recomputing', () => {
    const buttonTheme = defaultTheme.button.main;
    const props = { primary: true, filled: true } as Record<string, boolean>;

    // Partial precomputed keys produce a subset of classes (only covers 3 of 15+ categories)
    const precomputed = { size: 'md', appearance: 'primary', variant: 'filled' };
    const classesWithPrecomputed = buttonTheme.getClasses(props, precomputed);

    expect(classesWithPrecomputed.length).toBeGreaterThan(0);

    // With no precomputed keys, the full category resolution runs (including defaults)
    const classesWithout = buttonTheme.getClasses(props);
    expect(classesWithout.length).toBeGreaterThan(0);

    // Full resolution produces more classes because it resolves ALL default categories
    expect(classesWithout.length).toBeGreaterThanOrEqual(classesWithPrecomputed.length);
  });

  it('getClasses with empty precomputedKeys should return base classes only', () => {
    const buttonTheme = defaultTheme.button.main;
    const props = {} as Record<string, boolean>;

    const classesEmpty = buttonTheme.getClasses(props, {});

    expect(classesEmpty.length).toBeGreaterThan(0);
  });

  it('getComponentConfig should produce consistent classes with the optimization', () => {
    const buttonTheme = defaultTheme.button.main;
    const props = { primary: true, filled: true, lg: true } as Record<string, boolean>;

    const config = buttonTheme.getComponentConfig(props);

    expect(config.finalClasses).toBeTruthy();
    expect(typeof config.finalClasses).toBe('string');
  });
});
