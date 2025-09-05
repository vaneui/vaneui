
import { render } from '@testing-library/react';
import {
  Button,
  Card,
  Row,
  Stack,
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
    test('Row should accept appearance, layout, and shape props', () => {
      // Valid props for Row
      const validRow = (
        <Row 
          primary // appearance
          transparent // transparent
          itemsCenter // items
          gap // gap
          md // size
          flexWrap // wrap
          rounded // shape - now valid for Row
          border // border - now valid for Row
          ring // ring - now valid for Row
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
    test('Row should properly handle shape props and filter them from DOM', () => {
      // Now that Row supports shape props, they should be filtered from DOM but used for styling
      const { container } = renderWithTheme(
        <Row primary rounded border>
          Content
        </Row>
      );
      const rowElement = container.firstChild as HTMLElement;
      
      // Component props should be filtered out from DOM attributes
      expect(rowElement.hasAttribute('rounded')).toBe(false);
      expect(rowElement.hasAttribute('border')).toBe(false);
      expect(rowElement.hasAttribute('primary')).toBe(false);
      
      // But styling should be applied (check for rounded classes)
      expect(rowElement.className).toMatch(/rounded/);
    });

    test('Button should properly handle shape props', () => {
      const { container } = renderWithTheme(
        <Button primary rounded>Click me</Button>
      );
      const buttonElement = container.firstChild as HTMLElement;
      
      // Props should be filtered from DOM
      expect(buttonElement.hasAttribute('rounded')).toBe(false);
      expect(buttonElement.hasAttribute('primary')).toBe(false);
      
      // But styling should be applied (through classes)
      expect(buttonElement.className).toMatch(/rounded/);
    });
  });
});

describe('Category Arrays Validation', () => {
  // Type-level tests to ensure category arrays only contain valid ComponentCategoryKey values
  
  test('All category arrays should only contain valid ComponentCategoryKey values', () => {
    const validCategoryKeys = new Set(COMPONENT_PROPS_CATEGORY);
    
    // Helper to check if all values in an array are valid category keys
    const validateCategories = (categories: readonly string[]) => {
      categories.forEach(category => {
        expect(validCategoryKeys.has(category as any)).toBe(true);
      });
    };
    
    // Test all component category arrays
    validateCategories(ROW_CATEGORIES);
    validateCategories(COL_CATEGORIES);
    validateCategories(STACK_CATEGORIES);
    validateCategories(BUTTON_CATEGORIES);
    validateCategories(BADGE_CATEGORIES);
    validateCategories(CHIP_CATEGORIES);
    validateCategories(CARD_CATEGORIES);
    validateCategories(GRID_CATEGORIES);
    validateCategories(CONTAINER_CATEGORIES);
    validateCategories(SECTION_CATEGORIES);
    validateCategories(DIVIDER_CATEGORIES);
    validateCategories(TYPOGRAPHY_CATEGORIES);
    validateCategories(LIST_CATEGORIES);
  });

  test('ROW_CATEGORIES should include shape category', () => {
    expect(ROW_CATEGORIES).toContain('shape');
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
    const testCategories = (categories: readonly string[]) => {
      categories.forEach(category => {
        // Verify the category exists in ComponentKeys
        expect(ComponentKeys).toHaveProperty(category);
        
        // Verify the category has at least one key
        const keys = ComponentKeys[category as keyof typeof ComponentKeys];
        expect(Array.isArray(keys)).toBe(true);
        expect(keys.length).toBeGreaterThan(0);
      });
    };
    
    testCategories(ROW_CATEGORIES);
    testCategories(BUTTON_CATEGORIES);
    testCategories(STACK_CATEGORIES);
    testCategories(CARD_CATEGORIES);
  });
});