import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Button,
  Text,
  ThemeProvider,
  defaultTheme,
  ThemeDefaults,
  ThemeExtraClasses
} from '../../index';

describe('Theme Types Strictness Tests', () => {
  it('should accept valid ThemeDefaults keys', () => {
    // These should compile without errors
    const validDefaults: ThemeDefaults = {
      button: {
        primary: true,
        secondary: true,
        sm: true,
        lg: true,
        // All valid ButtonProps boolean keys
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
        primary: 'extra-primary-class',
        secondary: 'extra-secondary-class',
        filled: 'extra-filled-class',
        // All valid ButtonProps boolean keys with string values
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
          success: true,
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
          success: 'check-success-override',
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
        primary: true,
        // Don't need to define all possible keys
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