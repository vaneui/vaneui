import React from 'react';
import { render } from '@testing-library/react';
import {
  Button,
  Badge,
  Chip,
  Card,
  Row,
  Col,
  Stack,
  Grid3,
  Container,
  Section,
  Divider,
  Text,
  Title,
  Link,
  List,
  ThemeProvider,
  defaultTheme,
  BUTTON_CATEGORIES,
  BADGE_CATEGORIES,
  CHIP_CATEGORIES,
  CARD_CATEGORIES,
  ROW_CATEGORIES,
  COL_CATEGORIES,
  STACK_CATEGORIES,
  GRID_CATEGORIES,
  CONTAINER_CATEGORIES,
  SECTION_CATEGORIES,
  DIVIDER_CATEGORIES,
  TYPOGRAPHY_CATEGORIES,
  LIST_CATEGORIES,
  COMPONENT_PROPS_CATEGORY,
  ComponentKeys
} from '../../index';

describe('Component Prop Type Validation', () => {
  // Helper to render components with theme
  const renderWithTheme = (element: React.ReactElement) => {
    return render(
      <ThemeProvider theme={defaultTheme}>
        {element}
      </ThemeProvider>
    );
  };

  describe('Valid Props Tests', () => {
    test('Row should accept appearance and layout props but not shape props', () => {
      // Valid props for Row
      const validRow = (
        <Row 
          primary // appearance
          transparent // transparent
          itemsCenter // items
          gap // gap
          md // size
          flexWrap // wrap
        >
          Content
        </Row>
      );
      
      expect(() => renderWithTheme(validRow)).not.toThrow();
    });

    test('Button should accept all interactive category props including shape', () => {
      // Valid props for Button
      const validButton = (
        <Button
          primary // appearance
          rounded // shape - valid for Button
          md // size
          outline // variant
          shadow // shadow
        >
          Click me
        </Button>
      );
      
      expect(() => renderWithTheme(validButton)).not.toThrow();
    });

    test('Stack should accept layout, padding, and appearance props', () => {
      const validStack = (
        <Stack
          gap // gap
          padding // padding
          success // appearance
          transparent // transparent
          md // size
        >
          Content
        </Stack>
      );
      
      expect(() => renderWithTheme(validStack)).not.toThrow();
    });

    test('Card should accept shape, border, and typography props', () => {
      const validCard = (
        <Card
          rounded // shape - valid for Card
          border // border
          shadow // shadow
          padding // padding
          primary // appearance
        >
          Card content
        </Card>
      );
      
      expect(() => renderWithTheme(validCard)).not.toThrow();
    });
  });


  describe('Runtime Prop Filtering Tests', () => {
    test('Row should filter out shape props even if passed at runtime', () => {
      // Using any to bypass TypeScript for runtime testing
      const rowProps: any = {
        primary: true,
        rounded: true, // This should be filtered out
        children: 'Content'
      };
      
      const { container } = renderWithTheme(<Row {...rowProps} />);
      const rowElement = container.firstChild as HTMLElement;
      
      // Verify rounded is not in the DOM
      expect(rowElement.getAttribute('rounded')).toBeNull();
      expect(rowElement.hasAttribute('rounded')).toBe(false);
    });

    test('Button should NOT filter out shape props', () => {
      const { container } = renderWithTheme(
        <Button primary rounded>Click me</Button>
      );
      const buttonElement = container.firstChild as HTMLElement;
      
      // Button should have rounded styling applied (through classes)
      expect(buttonElement.className).toContain('rounded');
    });
  });
});

describe('Category Arrays Validation', () => {
  // Type-level tests to ensure category arrays only contain valid ComponentCategoryKey values
  
  test('All category arrays should only contain valid ComponentCategoryKey values', () => {
    const validCategoryKeys = new Set(COMPONENT_PROPS_CATEGORY);
    
    // Helper to check if all values in an array are valid category keys
    const validateCategories = (categories: readonly string[], name: string) => {
      categories.forEach(category => {
        expect(validCategoryKeys.has(category as any)).toBe(true);
      });
    };
    
    // Test all component category arrays
    validateCategories(ROW_CATEGORIES, 'ROW_CATEGORIES');
    validateCategories(COL_CATEGORIES, 'COL_CATEGORIES');
    validateCategories(STACK_CATEGORIES, 'STACK_CATEGORIES');
    validateCategories(BUTTON_CATEGORIES, 'BUTTON_CATEGORIES');
    validateCategories(BADGE_CATEGORIES, 'BADGE_CATEGORIES');
    validateCategories(CHIP_CATEGORIES, 'CHIP_CATEGORIES');
    validateCategories(CARD_CATEGORIES, 'CARD_CATEGORIES');
    validateCategories(GRID_CATEGORIES, 'GRID_CATEGORIES');
    validateCategories(CONTAINER_CATEGORIES, 'CONTAINER_CATEGORIES');
    validateCategories(SECTION_CATEGORIES, 'SECTION_CATEGORIES');
    validateCategories(DIVIDER_CATEGORIES, 'DIVIDER_CATEGORIES');
    validateCategories(TYPOGRAPHY_CATEGORIES, 'TYPOGRAPHY_CATEGORIES');
    validateCategories(LIST_CATEGORIES, 'LIST_CATEGORIES');
  });

  test('ROW_CATEGORIES should not include shape category', () => {
    expect(ROW_CATEGORIES).not.toContain('shape');
  });

  test('ROW_CATEGORIES should include appearance and transparent', () => {
    expect(ROW_CATEGORIES).toContain('appearance');
    expect(ROW_CATEGORIES).toContain('transparent');
  });

  test('BUTTON_CATEGORIES should include shape category', () => {
    expect(BUTTON_CATEGORIES).toContain('shape');
  });

  test('Interactive components should have shape, variant, and appearance', () => {
    const interactiveComponents = [BUTTON_CATEGORIES, BADGE_CATEGORIES, CHIP_CATEGORIES];
    
    interactiveComponents.forEach(categories => {
      expect(categories).toContain('shape');
      expect(categories).toContain('variant');
      expect(categories).toContain('appearance');
    });
  });
});

describe('ComponentKeys Coverage', () => {
  test('All keys in category arrays should map to valid ComponentKeys', () => {
    const testCategories = (categories: readonly string[], componentName: string) => {
      categories.forEach(category => {
        // Verify the category exists in ComponentKeys
        expect(ComponentKeys).toHaveProperty(category);
        
        // Verify the category has at least one key
        const keys = ComponentKeys[category as keyof typeof ComponentKeys];
        expect(Array.isArray(keys)).toBe(true);
        expect(keys.length).toBeGreaterThan(0);
      });
    };
    
    testCategories(ROW_CATEGORIES, 'Row');
    testCategories(BUTTON_CATEGORIES, 'Button');
    testCategories(STACK_CATEGORIES, 'Stack');
    testCategories(CARD_CATEGORIES, 'Card');
  });
});