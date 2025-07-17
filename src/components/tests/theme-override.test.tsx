import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Button, ThemeProvider, ThemeProps, defaultTheme } from '../../index';

describe('Theme Override Tests', () => {
  describe('Theme Property Access', () => {
    it('should allow direct access to theme properties without TypeScript errors', () => {
      // This is the exact code pattern the user wants to work
      const overrideFunc = (theme: ThemeProps) => {
        theme.button.themes.appearance.text.outline.default.base = 'text-blue-500';
        theme.button.themes.appearance.text.outline.default.hover = 'hover:text-blue-700';
        theme.button.themes.appearance.text.outline.default.active = 'active:text-blue-900';
        return theme;
      };

      // Test that the override function can be called without errors
      expect(() => {
        const modifiedTheme = overrideFunc(defaultTheme);
        expect(modifiedTheme).toBeDefined();
      }).not.toThrow();
    });

    it('should validate that theme properties exist and are accessible', () => {
      // Test that all the nested properties exist
      expect(defaultTheme.button).toBeDefined();
      expect(defaultTheme.button.themes).toBeDefined();
      expect(defaultTheme.button.themes.appearance).toBeDefined();
      expect(defaultTheme.button.themes.appearance.text).toBeDefined();
      expect(defaultTheme.button.themes.appearance.text.outline).toBeDefined();
      expect(defaultTheme.button.themes.appearance.text.outline.default).toBeDefined();
      expect(defaultTheme.button.themes.appearance.text.outline.default.base).toBeDefined();
      expect(defaultTheme.button.themes.appearance.text.outline.default.hover).toBeDefined();
      expect(defaultTheme.button.themes.appearance.text.outline.default.active).toBeDefined();
    });

    it('should allow theme overrides to be applied and used in components', () => {
      const overrideFunc = (theme: ThemeProps) => {
        theme.button.themes.appearance.text.outline.default.base = 'text-blue-200';
        theme.button.themes.appearance.text.outline.default.hover = 'hover:text-blue-700';
        theme.button.themes.appearance.text.outline.default.active = 'active:text-blue-900';
        return theme;
      };

      const { container } = render(
        <ThemeProvider themeOverride={overrideFunc}>
          <Button>Test Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      // The overridden classes should be applied
      expect(button).toHaveClass('text-blue-200');
      expect(button).toHaveClass('hover:text-blue-700');
      expect(button).toHaveClass('active:text-blue-900');
    });

    it('should validate that theme properties are of correct types', () => {
      // Test that the properties are strings as expected
      expect(typeof defaultTheme.button.themes.appearance.text.outline.default.base).toBe('string');
      expect(typeof defaultTheme.button.themes.appearance.text.outline.default.hover).toBe('string');
      expect(typeof defaultTheme.button.themes.appearance.text.outline.default.active).toBe('string');
    });

    it('should allow multiple theme overrides without conflicts', () => {
      const overrideFunc = (theme: ThemeProps) => {
        // Test multiple component overrides
        theme.button.themes.appearance.text.outline.default.base = 'text-blue-500';
        theme.button.themes.appearance.text.filled.default.base = 'text-white';
        
        // Test that badge theme is also accessible
        theme.badge.themes.appearance.text.outline.default.base = 'text-green-500';
        
        return theme;
      };

      expect(() => {
        const modifiedTheme = overrideFunc(defaultTheme);
        expect(modifiedTheme.button.themes.appearance.text.outline.default.base).toBe('text-blue-500');
        expect(modifiedTheme.button.themes.appearance.text.filled.default.base).toBe('text-white');
        expect(modifiedTheme.badge.themes.appearance.text.outline.default.base).toBe('text-green-500');
      }).not.toThrow();
    });

    it('should work with TypeScript strict mode (compile-time validation)', () => {
      // This test ensures TypeScript compilation works
      const overrideFunc = (theme: ThemeProps): ThemeProps => {
        // All these assignments should compile without TS errors
        theme.button.themes.appearance.text.outline.default.base = 'text-blue-500';
        theme.button.themes.appearance.text.outline.default.hover = 'hover:text-blue-700';
        theme.button.themes.appearance.text.outline.default.active = 'active:text-blue-900';
        
        // Test other theme properties
        theme.button.themes.appearance.background.outline.default.base = 'bg-blue-100';
        theme.button.themes.appearance.border.outline.default.base = 'border-blue-300';
        
        return theme;
      };

      const result = overrideFunc(defaultTheme);
      expect(result).toBeDefined();
      expect(result.button.themes.appearance.text.outline.default.base).toBe('text-blue-500');
    });
  });

  describe('Theme Structure Validation', () => {
    it('should validate button theme structure completeness', () => {
      const buttonTheme = defaultTheme.button.themes;
      
      // Validate size properties
      expect(buttonTheme.size).toBeDefined();
      expect(buttonTheme.size.px).toBeDefined();
      expect(buttonTheme.size.py).toBeDefined();
      expect(buttonTheme.size.text).toBeDefined();
      expect(buttonTheme.size.gap).toBeDefined();
      
      // Validate appearance properties
      expect(buttonTheme.appearance).toBeDefined();
      expect(buttonTheme.appearance.background).toBeDefined();
      expect(buttonTheme.appearance.text).toBeDefined();
      expect(buttonTheme.appearance.border).toBeDefined();
      expect(buttonTheme.appearance.ring).toBeDefined();
      expect(buttonTheme.appearance.shadow).toBeDefined();
      
      // Validate layout properties
      expect(buttonTheme.layout).toBeDefined();
      expect(buttonTheme.layout.border).toBeDefined();
      expect(buttonTheme.layout.ring).toBeDefined();
      expect(buttonTheme.layout.radius).toBeDefined();
      
      // Validate typography properties
      expect(buttonTheme.typography).toBeDefined();
    });

    it('should validate variant structures (outline and filled)', () => {
      const textTheme = defaultTheme.button.themes.appearance.text;
      
      // Both variants should exist
      expect(textTheme.outline).toBeDefined();
      expect(textTheme.filled).toBeDefined();
      
      // Both should have all appearance keys
      expect(textTheme.outline.default).toBeDefined();
      expect(textTheme.outline.primary).toBeDefined();
      expect(textTheme.outline.secondary).toBeDefined();
      
      expect(textTheme.filled.default).toBeDefined();
      expect(textTheme.filled.primary).toBeDefined();
      expect(textTheme.filled.secondary).toBeDefined();
      
      // All should have mode keys (base, hover, active)
      expect(textTheme.outline.default.base).toBeDefined();
      expect(textTheme.outline.default.hover).toBeDefined();
      expect(textTheme.outline.default.active).toBeDefined();
    });
  });
});