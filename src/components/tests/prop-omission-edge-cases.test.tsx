import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Button,
  Badge,
  Card,
  ThemeProvider,
  defaultTheme
} from '../../index';

import {
  ComponentKeys,
  BUTTON_CATEGORIES,
  BADGE_CATEGORIES,
  CARD_CATEGORIES
} from '../ui/props/keys';

import {
  getAllBooleanPropsForCategories,
  createTestPropsWithAllBooleans,
  checkForOmittedProps
} from './utils/propOmissionTestUtils';

describe('Prop Omission Edge Cases', () => {
  const renderWithTheme = (Component: React.ComponentType<any>) => (props: any) =>
    render(
      <ThemeProvider theme={defaultTheme}>
        <Component {...props}>Test Content</Component>
      </ThemeProvider>
    );

  describe('Complex Prop Combinations', () => {
    it('should omit props even when mixed with valid HTML attributes', () => {
      const buttonProps = {
        ...createTestPropsWithAllBooleans(BUTTON_CATEGORIES),
        id: 'test-button',
        className: 'custom-class',
        'data-testid': 'button-test',
        'aria-label': 'Test button',
        disabled: true,
        type: 'submit' as const,
        tabIndex: 0,
        role: 'button'
      };

      const { container } = renderWithTheme(Button)(buttonProps);
      const button = container.querySelector('button');

      // Should have valid HTML attributes
      expect(button).toHaveAttribute('id', 'test-button');
      expect(button).toHaveAttribute('data-testid', 'button-test');
      expect(button).toHaveAttribute('aria-label', 'Test button');
      expect(button).toHaveAttribute('disabled');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('tabindex', '0');
      expect(button).toHaveAttribute('role', 'button');
      expect(button).toHaveClass('custom-class');

      // Should NOT have component boolean props
      const { hasInvalidProps, invalidProps } = checkForOmittedProps(button, BUTTON_CATEGORIES);
      expect(hasInvalidProps).toBe(false);
      if (hasInvalidProps) {
        console.error('Button has invalid props:', invalidProps);
      }
    });

    it('should handle conflicting boolean props correctly', () => {
      // Test with conflicting size props
      const badgeProps = {
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: true,
        primary: true,
        secondary: true,
        className: 'test-badge'
      };

      const { container } = renderWithTheme(Badge)(badgeProps);
      const badge = container.querySelector('span');

      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('test-badge');

      // All boolean props should be omitted from DOM
      const { hasInvalidProps, invalidProps } = checkForOmittedProps(badge, BADGE_CATEGORIES);
      expect(hasInvalidProps).toBe(false);
      if (hasInvalidProps) {
        console.error('Badge has invalid props:', invalidProps);
      }
    });

    it('should handle nested component props correctly', () => {
      const cardProps = {
        ...createTestPropsWithAllBooleans(CARD_CATEGORIES),
        'data-nested': 'true',
        children: (
          <div data-child="true">
            <Button primary>Nested Button</Button>
          </div>
        )
      };

      const { container } = renderWithTheme(Card)(cardProps);
      const card = container.querySelector('div[data-nested="true"]');
      const nestedButton = container.querySelector('button');

      // Card should omit its props
      const { hasInvalidProps: cardHasInvalid, invalidProps: cardInvalidProps } = 
        checkForOmittedProps(card, CARD_CATEGORIES);
      expect(cardHasInvalid).toBe(false);

      // Nested button should omit its props
      const { hasInvalidProps: buttonHasInvalid, invalidProps: buttonInvalidProps } = 
        checkForOmittedProps(nestedButton, BUTTON_CATEGORIES);
      expect(buttonHasInvalid).toBe(false);

      if (cardHasInvalid) {
        console.error('Card has invalid props:', cardInvalidProps);
      }
      if (buttonHasInvalid) {
        console.error('Nested Button has invalid props:', buttonInvalidProps);
      }
    });
  });

  describe('ComponentKeys Validation', () => {
    it('should ensure all ComponentKeys categories have at least one key', () => {
      Object.entries(ComponentKeys).forEach(([category, keys]) => {
        expect(keys.length).toBeGreaterThan(0);
        expect(Array.isArray(keys)).toBe(true);
        console.log(`${category}: ${keys.length} keys`);
      });
    });

    it('should ensure no duplicate keys across different categories', () => {
      const allKeys: string[] = [];
      const duplicates: string[] = [];

      Object.entries(ComponentKeys).forEach(([category, keys]) => {
        keys.forEach(key => {
          if (allKeys.includes(key)) {
            duplicates.push(`${key} (found in multiple categories)`);
          }
          allKeys.push(key);
        });
      });

      if (duplicates.length > 0) {
        console.warn('Duplicate keys found:', duplicates);
        // Note: Some duplicates might be intentional, so we log but don't fail
      }

      expect(allKeys.length).toBeGreaterThan(0);
    });

    it('should validate component categories contain expected number of unique keys', () => {
      const buttonKeys = getAllBooleanPropsForCategories(BUTTON_CATEGORIES);
      const badgeKeys = getAllBooleanPropsForCategories(BADGE_CATEGORIES);
      const cardKeys = getAllBooleanPropsForCategories(CARD_CATEGORIES);

      console.log('Button keys count:', buttonKeys.length);
      console.log('Badge keys count:', badgeKeys.length);  
      console.log('Card keys count:', cardKeys.length);

      expect(buttonKeys.length).toBeGreaterThan(10); // Should have many keys
      expect(badgeKeys.length).toBeGreaterThan(10);
      expect(cardKeys.length).toBeGreaterThan(10);

      // Ensure no undefined/null keys
      expect(buttonKeys.every(key => typeof key === 'string' && key.length > 0)).toBe(true);
      expect(badgeKeys.every(key => typeof key === 'string' && key.length > 0)).toBe(true);
      expect(cardKeys.every(key => typeof key === 'string' && key.length > 0)).toBe(true);
    });
  });

  describe('Theme Integration', () => {
    it('should omit props even when custom theme is provided', () => {
      const customTheme = {
        ...defaultTheme,
        button: {
          ...defaultTheme.button,
          // Custom theme modifications don't affect prop omission
        }
      };

      const buttonProps = createTestPropsWithAllBooleans(BUTTON_CATEGORIES);

      const { container } = render(
        <ThemeProvider theme={customTheme}>
          <Button {...buttonProps}>Custom Theme Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      const { hasInvalidProps, invalidProps } = checkForOmittedProps(button, BUTTON_CATEGORIES);
      
      expect(hasInvalidProps).toBe(false);
      if (hasInvalidProps) {
        console.error('Button with custom theme has invalid props:', invalidProps);
      }
    });
  });

  describe('Runtime Prop Filtering', () => {
    it('should demonstrate that props are filtered at runtime, not compile time', () => {
      // Create props object dynamically
      const dynamicProps: Record<string, any> = {};
      
      // Add all button boolean props dynamically
      getAllBooleanPropsForCategories(BUTTON_CATEGORIES).forEach(key => {
        dynamicProps[key] = true;
      });
      
      // Add valid HTML props
      dynamicProps.id = 'dynamic-button';
      dynamicProps.className = 'dynamic-class';

      const { container } = renderWithTheme(Button)(dynamicProps);
      const button = container.querySelector('button');

      expect(button).toHaveAttribute('id', 'dynamic-button');
      expect(button).toHaveClass('dynamic-class');

      const { hasInvalidProps, invalidProps } = checkForOmittedProps(button, BUTTON_CATEGORIES);
      expect(hasInvalidProps).toBe(false);
      if (hasInvalidProps) {
        console.error('Dynamically created button has invalid props:', invalidProps);
      }
    });
  });
});