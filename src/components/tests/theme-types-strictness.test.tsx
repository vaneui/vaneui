import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Button,
  Text,
  ThemeProvider,
  defaultTheme,
  ThemeDefaults,
  ThemeExtraClasses,
  type ThemeProps
} from '../../index';

describe('Theme Types Strictness Tests', () => {
  it('should accept valid ThemeDefaults keys', () => {
    // These should compile without errors
    const validDefaults: ThemeDefaults = {
      button: {
        main: {
          primary: true,
          secondary: true,
          sm: true,
          lg: true,
          // All valid ButtonProps boolean keys
        }
      },
      text: {
        bold: true,
        italic: true,
        underline: true,
        xs: true,
        // All valid TypographyProps boolean keys
      }
    };

    const { container } = render(
      <ThemeProvider theme={defaultTheme} themeDefaults={validDefaults}>
        <Button primary>Test Button</Button>
        <Text bold>Test Text</Text>
      </ThemeProvider>
    );

    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('should accept valid ThemeExtraClasses keys', () => {
    // These should compile without errors
    const validExtraClasses: ThemeExtraClasses = {
      button: {
        main: {
          primary: 'extra-primary-class',
          secondary: 'extra-secondary-class',
          filled: 'extra-filled-class',
          // All valid ButtonProps boolean keys with string values
        }
      },
      text: {
        bold: 'extra-bold-class',
        semibold: 'extra-semibold-class',
        lg: 'text-lg-override',
        // All valid TypographyProps boolean keys with string values
      }
    };

    const { container } = render(
      <ThemeProvider theme={defaultTheme} extraClasses={validExtraClasses}>
        <Button primary>Test Button</Button>
        <Text bold lg>Test Text</Text>
      </ThemeProvider>
    );

    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('extra-primary-class');
    
    const text = container.querySelector('p');
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass('extra-bold-class');
    expect(text).toHaveClass('text-lg-override');
  });

  it('should maintain type safety for nested checkbox structure', () => {
    const checkboxDefaults: ThemeDefaults = {
      checkbox: {
        input: {
          primary: true,
          accent: true,
          filled: true,
        },
        check: {
          flex: true,
        },
        wrapper: {
          rounded: true,
        }
      }
    };

    const checkboxExtraClasses: ThemeExtraClasses = {
      checkbox: {
        input: {
          primary: 'checkbox-primary-override',
        },
        check: {
          flex: 'check-flex-override',
        },
        wrapper: {
          rounded: 'wrapper-rounded-override',
        }
      }
    };

    const { container } = render(
      <ThemeProvider 
        theme={defaultTheme} 
        themeDefaults={checkboxDefaults}
        extraClasses={checkboxExtraClasses}
      >
        <div>Test</div>
      </ThemeProvider>
    );

    expect(container).toBeInTheDocument();
  });

  it('should allow partial definitions', () => {
    // Should be able to define only some keys
    const partialDefaults: ThemeDefaults = {
      button: {
        main: {
          primary: true,
          // Don't need to define all possible keys
        }
      }
    };

    const partialExtraClasses: ThemeExtraClasses = {
      text: {
        bold: 'my-bold-class',
        // Don't need to define all possible keys
      }
    };

    const { container } = render(
      <ThemeProvider
        theme={defaultTheme}
        themeDefaults={partialDefaults}
        extraClasses={partialExtraClasses}
      >
        <Button primary>Button</Button>
        <Text bold>Text</Text>
      </ThemeProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Regression pins for the DERIVED ThemeDefaults / ThemeExtraClasses (P2-6).
//
// Both types are produced from ThemeProps by recursive mapped types in
// themeTypes.ts (DeriveThemeDefaults / DeriveThemeExtraClasses), so any
// component or sub-theme node added to ThemeProps is covered by both types
// BY CONSTRUCTION — there is no hand-written mirror that can silently omit a
// component. The assertions below pin the behaviors that derivation must
// preserve (valid shapes), reject (unknown nodes, non-category extraClasses
// keys), and guarantee (key-set sync with ThemeProps).
// ---------------------------------------------------------------------------
describe('Derived ThemeDefaults / ThemeExtraClasses', () => {
  it('should accept flat and nested themeDefaults shapes (compile-time)', () => {
    const flat: ThemeDefaults = { badge: { success: true } };
    const nested: ThemeDefaults = { button: { main: { filled: true } } };
    // Non-category boolean props remain accepted by themeDefaults on purpose:
    // its leaf is Partial<BooleanKeys<P>> — the exact key space the previous
    // hand-written type had (defaults merge into ComponentTheme.defaults,
    // which tagFunction receives in full).
    const nonCategoryBoolean: ThemeDefaults = { button: { main: { loading: true } } };

    expect(flat).toBeDefined();
    expect(nested).toBeDefined();
    expect(nonCategoryBoolean).toBeDefined();
  });

  it('should reject keys that are not ThemeProps nodes (compile-time)', () => {
    const unknownComponent: ThemeDefaults = {
      // @ts-expect-error -- 'tooltip' is not a component node in ThemeProps, so the derived type rejects it
      tooltip: { rounded: true },
    };

    const unknownSubTheme: ThemeDefaults = {
      button: {
        // @ts-expect-error -- ThemeProps.button has only main/spinner sub-themes
        label: { sm: true },
      },
    };

    const unknownExtraClassesComponent: ThemeExtraClasses = {
      // @ts-expect-error -- 'tooltip' is not a component node in ThemeProps, so the derived type rejects it
      tooltip: { rounded: 'extra' },
    };

    expect(unknownComponent).toBeDefined();
    expect(unknownSubTheme).toBeDefined();
    expect(unknownExtraClassesComponent).toBeDefined();
  });

  it('should narrow extraClasses keys to category-extractable flags (compile-time)', () => {
    // control group: category flags stay accepted (appearance, disabled, size)
    const valid: ThemeExtraClasses = {
      button: { main: { primary: 'btn-primary-extra', disabled: 'btn-disabled-extra' } },
      navLink: { root: { sm: 'navlink-sm-extra' } },
    };

    // The win over the old hand-written type: it accepted EVERY boolean prop
    // of P, including props no category can extract — the runtime applies
    // extraClasses only to extracted category values, so such entries were
    // silently dead. The derived type rejects them.
    const buttonLoading: ThemeExtraClasses = {
      button: {
        main: {
          // @ts-expect-error -- 'loading' is a non-category boolean prop; no category extracts it, so the entry could never apply
          loading: 'spinner-extra',
        },
      },
    };

    const navLinkActive: ThemeExtraClasses = {
      navLink: {
        root: {
          // @ts-expect-error -- 'active' is a non-category boolean prop; no category extracts it, so the entry could never apply
          active: 'active-extra',
        },
      },
    };

    expect(valid).toBeDefined();
    expect(buttonLoading).toBeDefined();
    expect(navLinkActive).toBeDefined();
  });

  it('should stay key-synchronized with ThemeProps by construction (compile-time)', () => {
    // Resolves to `true` when the key sets match; otherwise to the union of
    // mismatching keys, so the compile error names them (same pattern as
    // propsCategoriesAlignment.test.ts).
    type AssertSameKeys<A, B> =
      [Exclude<keyof A, keyof B> | Exclude<keyof B, keyof A>] extends [never]
        ? true
        : Exclude<keyof A, keyof B> | Exclude<keyof B, keyof A>;

    const defaultsCoverEveryThemeNode: AssertSameKeys<ThemeDefaults, ThemeProps> = true;
    const extraClassesCoverEveryThemeNode: AssertSameKeys<ThemeExtraClasses, ThemeProps> = true;
    // nested sub-theme records are derived too, not hand-listed
    const defaultsCoverButtonSubThemes: AssertSameKeys<NonNullable<ThemeDefaults['button']>, ThemeProps['button']> = true;
    const extraClassesCoverModalSubThemes: AssertSameKeys<NonNullable<ThemeExtraClasses['modal']>, ThemeProps['modal']> = true;

    expect(defaultsCoverEveryThemeNode).toBe(true);
    expect(extraClassesCoverEveryThemeNode).toBe(true);
    expect(defaultsCoverButtonSubThemes).toBe(true);
    expect(extraClassesCoverModalSubThemes).toBe(true);
  });
});