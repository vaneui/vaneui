import React from 'react';
import { render } from '@testing-library/react';
import { Row, Button, Stack, Card, ThemeProvider, defaultTheme } from '../../index';

describe('Component Prop Filtering', () => {
  const renderWithTheme = (element: React.ReactElement) => {
    return render(
      <ThemeProvider theme={defaultTheme}>
        {element}
      </ThemeProvider>
    );
  };

  describe('Row component prop filtering', () => {
    test('should filter out shape-related props from DOM', () => {
      // Using 'any' to bypass TypeScript checking for testing runtime behavior
      const props: any = {
        // Valid Row props
        primary: true,
        itemsCenter: true,
        gap: true,
        
        // Invalid props that should be filtered
        rounded: true,
        pill: true,
        sharp: true,
        outline: true,
        
        // Standard HTML props that should pass through
        'data-testid': 'test-row',
        'aria-label': 'Test row',
        
        children: 'Content'
      };

      const { container } = renderWithTheme(<Row {...props} />);
      const element = container.firstChild as HTMLElement;

      // Valid HTML attributes should be present
      expect(element.getAttribute('data-testid')).toBe('test-row');
      expect(element.getAttribute('aria-label')).toBe('Test row');

      // Component-specific props should be filtered out
      expect(element.hasAttribute('primary')).toBe(false);
      expect(element.hasAttribute('itemsCenter')).toBe(false);
      expect(element.hasAttribute('gap')).toBe(false);
      
      // Invalid props should definitely be filtered out
      expect(element.hasAttribute('rounded')).toBe(false);
      expect(element.hasAttribute('pill')).toBe(false);
      expect(element.hasAttribute('sharp')).toBe(false);
      expect(element.hasAttribute('outline')).toBe(false);
    });

    test('should apply correct CSS classes for valid props', () => {
      const { container } = renderWithTheme(
        <Row primary itemsCenter gap>
          Content
        </Row>
      );
      
      const element = container.firstChild as HTMLElement;
      const classes = element.className;

      // Should have flex and row by default
      expect(classes).toContain('flex');
      
      // Should have appearance styling
      expect(classes).toContain('bg-(--layout-background-primary)'); // CSS variable for primary
      
      // Should have items-center
      expect(classes).toContain('items-center');
    });
  });

  describe('Button component prop filtering', () => {
    test('should properly handle shape props since Button supports them', () => {
      const { container } = renderWithTheme(
        <Button primary rounded shadow>
          Click me
        </Button>
      );
      
      const element = container.firstChild as HTMLElement;
      const classes = element.className;

      // Button should have rounded styling
      expect(classes).toMatch(/rounded/);
      
      // Should not have the props as DOM attributes
      expect(element.hasAttribute('rounded')).toBe(false);
      expect(element.hasAttribute('primary')).toBe(false);
      expect(element.hasAttribute('shadow')).toBe(false);
    });
  });

  describe('Stack component prop filtering', () => {
    test('should filter out shape props from Stack', () => {
      const props: any = {
        // Valid Stack props
        gap: true,
        padding: true,
        primary: true,
        
        // Invalid shape props
        rounded: true,
        pill: true,
        
        children: 'Stack content'
      };

      const { container } = renderWithTheme(<Stack {...props} />);
      const element = container.firstChild as HTMLElement;

      // Shape props should be filtered out
      expect(element.hasAttribute('rounded')).toBe(false);
      expect(element.hasAttribute('pill')).toBe(false);
      
      // Valid props should be filtered too (they're used for styling)
      expect(element.hasAttribute('gap')).toBe(false);
      expect(element.hasAttribute('padding')).toBe(false);
      expect(element.hasAttribute('primary')).toBe(false);
    });
  });

  describe('Category-based filtering verification', () => {
    test('components should only filter props from their defined categories', () => {
      // Test data: props that exist in different categories
      const testProps: any = {
        // appearance
        primary: true,
        
        // shape
        rounded: true,
        
        // variant
        outline: true,
        
        // layout
        itemsCenter: true,
        
        // gap
        gap: true,
        
        // padding
        padding: true,
        
        // shadow
        shadow: true,
        
        children: 'Test'
      };

      // Row should filter shape and variant props
      const { container: rowContainer } = renderWithTheme(<Row {...testProps} />);
      const rowElement = rowContainer.firstChild as HTMLElement;
      
      expect(rowElement.hasAttribute('rounded')).toBe(false); // shape not in ROW_CATEGORIES
      expect(rowElement.hasAttribute('outline')).toBe(false); // variant not in ROW_CATEGORIES
      
      // Card should not filter shape props
      const { container: cardContainer } = renderWithTheme(<Card {...testProps} />);
      const cardElement = cardContainer.firstChild as HTMLElement;
      
      // All props should be filtered from DOM (used for styling)
      expect(cardElement.hasAttribute('rounded')).toBe(false);
      expect(cardElement.hasAttribute('outline')).toBe(false);
      
      // But Card should have the rounded styling applied
      expect(cardElement.className).toMatch(/rounded/);
    });
  });
});