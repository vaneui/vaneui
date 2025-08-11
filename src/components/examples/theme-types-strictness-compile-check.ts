// This file demonstrates TypeScript's compile-time checking for ThemeDefaults and ThemeExtraClasses
// Uncomment the sections below to see TypeScript errors for invalid keys

import { ThemeDefaults, ThemeExtraClasses } from '../../index';

// ✅ VALID: These will compile successfully
const validDefaults: ThemeDefaults = {
  button: {
    primary: true,
    secondary: true,
    filled: true,
    outline: true,
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
  },
  text: {
    bold: true,
    italic: true,
    underline: true,
    uppercase: true,
    lowercase: true,
    capitalize: true,
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
  },
  label: {
    flex: true,
    gap: true,
    noGap: true,
    primary: true,
    success: true,
  }
};

const validExtraClasses: ThemeExtraClasses = {
  button: {
    primary: 'btn-primary-custom',
    filled: 'btn-filled-custom',
    rounded: 'rounded-custom',
  },
  text: {
    bold: 'font-bold-custom',
    italic: 'italic-custom',
    lg: 'text-lg-custom',
  }
};

// ✅ Type checking also works for the nested checkbox structure
const validCheckboxConfig: ThemeDefaults = {
  checkbox: {
    input: {
      primary: true,
      accent: true,
      filled: true,
    },
    check: {
      success: true,
    },
    wrapper: {
      rounded: true,
      pill: true,
    }
  }
};

// Export to prevent "unused variable" warnings
export { validDefaults, validExtraClasses, validCheckboxConfig };