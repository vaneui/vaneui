import { ComponentKeys, ComponentCategoryKey } from '../../ui/props/keys';

/**
 * Get all possible boolean props for a given set of component categories
 */
export function getAllBooleanPropsForCategories(categories: readonly ComponentCategoryKey[]): string[] {
  return categories.flatMap(category => ComponentKeys[category]);
}

/**
 * Create test props object with all boolean props for given categories set to true
 */
export function createTestPropsWithAllBooleans(
  categories: readonly ComponentCategoryKey[]
): Record<string, boolean> {
  const props: Record<string, boolean> = {};
  const allKeys = getAllBooleanPropsForCategories(categories);
  
  for (const key of allKeys) {
    props[key] = true;
  }
  
  return props;
}

/**
 * Check if a DOM element has any of the boolean prop attributes that should be omitted
 */
export function checkForOmittedProps(
  element: Element | null,
  categories: readonly ComponentCategoryKey[]
): {
  hasInvalidProps: boolean;
  invalidProps: string[];
} {
  if (!element) {
    return { hasInvalidProps: false, invalidProps: [] };
  }

  const allBooleanProps = getAllBooleanPropsForCategories(categories);
  const invalidProps: string[] = [];

  // Check for any boolean props that should have been omitted
  for (const prop of allBooleanProps) {
    if (element.hasAttribute(prop)) {
      invalidProps.push(prop);
    }
  }

  return {
    hasInvalidProps: invalidProps.length > 0,
    invalidProps
  };
}

/**
 * Check if element has the standard allowed props that should never be omitted
 */
export function checkForRequiredProps(element: Element | null): {
  hasRequiredProps: boolean;
  missingProps: string[];
} {
  if (!element) {
    return { hasRequiredProps: false, missingProps: ['element'] };
  }

  const requiredProps = ['class']; // className should be converted to class
  const missingProps: string[] = [];

  for (const prop of requiredProps) {
    if (!element.hasAttribute(prop)) {
      missingProps.push(prop);
    }
  }

  return {
    hasRequiredProps: missingProps.length === 0,
    missingProps
  };
}

/**
 * Create a comprehensive test case for prop omission
 */
export function createPropOmissionTest(
  componentName: string,
  categories: readonly ComponentCategoryKey[],
  renderComponent: (props: any) => any,
  querySelector: string = componentName.toLowerCase()
) {
  return () => {
    describe(`${componentName} Prop Omission Tests`, () => {
      it('should omit all boolean component props from DOM attributes', () => {
        const testProps = createTestPropsWithAllBooleans(categories);
        const { container } = renderComponent(testProps);
        
        const element = container.querySelector(querySelector);
        const { hasInvalidProps, invalidProps } = checkForOmittedProps(element, categories);
        
        if (hasInvalidProps) {
          console.error(`${componentName} failed prop omission test. Found invalid props:`, invalidProps);
          console.error('Element attributes:', Array.from(element?.attributes || []).map((attr) => (attr as Attr).name));
        }
        
        expect(hasInvalidProps).toBe(false);
        expect(invalidProps).toHaveLength(0);
      });

      it('should still render valid HTML attributes', () => {
        const testProps = {
          ...createTestPropsWithAllBooleans(categories),
          id: 'test-id',
          'data-testid': 'test-component',
          'aria-label': 'Test component'
        };
        
        const { container } = renderComponent(testProps);
        const element = container.querySelector(querySelector);
        
        expect(element).toHaveAttribute('id', 'test-id');
        expect(element).toHaveAttribute('data-testid', 'test-component');
        expect(element).toHaveAttribute('aria-label', 'Test component');
      });

      it('should preserve className attribute', () => {
        const testProps = {
          ...createTestPropsWithAllBooleans(categories),
          className: 'custom-test-class'
        };
        
        const { container } = renderComponent(testProps);
        const element = container.querySelector(querySelector);
        
        expect(element).toHaveAttribute('class');
        expect(element).toHaveClass('custom-test-class');
      });

      it('should not render theme prop in DOM attributes', () => {
        // Note: Theme is provided via ThemeProvider context, not as a direct prop
        // This test ensures the theme system works without polluting DOM attributes
        const testProps = {
          ...createTestPropsWithAllBooleans(categories)
        };
        
        const { container } = renderComponent(testProps);
        const element = container.querySelector(querySelector);
        
        expect(element).not.toHaveAttribute('theme');
        expect(element).toBeInTheDocument();
      });

      it('should list all props being tested for omission', () => {
        const allBooleanProps = getAllBooleanPropsForCategories(categories);
        
        expect(allBooleanProps.length).toBeGreaterThan(0);
      });
    });
  };
}