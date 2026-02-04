import { ComponentKeys, ComponentCategoryKey } from '../../ui/props';

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
 * Check if a DOM element has any of the boolean prop attributes that should be omitted.
 * Also checks for React console.error warnings about unrecognized props.
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
 * Console spy helper for detecting React warnings about props leaking to DOM.
 * Use this to wrap test execution and check if React emitted warnings.
 */
export interface ConsoleSpy {
  mockFn: jest.SpyInstance;
  getLeakedProps: () => string[];
  restore: () => void;
}

/**
 * Create a spy on console.error to capture React warnings about unrecognized props.
 * Call getLeakedProps() after rendering to get list of props that leaked to DOM.
 */
export function createConsoleErrorSpy(): ConsoleSpy {
  const mockFn = jest.spyOn(console, 'error').mockImplementation(() => {});

  return {
    mockFn,
    getLeakedProps: () => {
      const leakedProps: string[] = [];
      for (const call of mockFn.mock.calls) {
        const message = call[0];
        if (typeof message === 'string' && message.includes('React does not recognize')) {
          // Extract prop name from message like "React does not recognize the `cursorPointer` prop"
          const match = message.match(/`(\w+)`/);
          if (match) {
            leakedProps.push(match[1]);
          }
        }
      }
      return leakedProps;
    },
    restore: () => {
      mockFn.mockRestore();
    }
  };
}

/**
 * Create a comprehensive test case for prop omission
 */
export function createPropOmissionTest(
  componentName: string,
  categories: readonly ComponentCategoryKey[],
  renderComponent: (props: Record<string, unknown>) => { container: HTMLElement },
  querySelector: string = componentName.toLowerCase()
) {
  return () => {
    describe(`${componentName} Prop Omission Tests`, () => {
      it('should omit all boolean component props from DOM attributes', () => {
        const consoleSpy = createConsoleErrorSpy();

        try {
          const testProps = createTestPropsWithAllBooleans(categories);
          const { container } = renderComponent(testProps);

          const element = container.querySelector(querySelector);
          const { hasInvalidProps, invalidProps } = checkForOmittedProps(element, categories);

          // Check for props in DOM attributes
          if (hasInvalidProps) {
            console.error(`${componentName} failed prop omission test. Found invalid props in DOM:`, invalidProps);
            console.error('Element attributes:', Array.from(element?.attributes || []).map((attr) => (attr as Attr).name));
          }

          // Check for React warnings about unrecognized props (props passed but stripped by React)
          const leakedProps = consoleSpy.getLeakedProps();
          if (leakedProps.length > 0) {
            console.error(`${componentName} passed props that React didn't recognize:`, leakedProps);
          }

          expect(hasInvalidProps).toBe(false);
          expect(invalidProps).toHaveLength(0);
          expect(leakedProps).toHaveLength(0);
        } finally {
          consoleSpy.restore();
        }
      });

      it('should still render valid HTML attributes', () => {
        const consoleSpy = createConsoleErrorSpy();

        try {
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

          // Should not have React warnings when rendering with valid props
          const leakedProps = consoleSpy.getLeakedProps();
          expect(leakedProps).toHaveLength(0);
        } finally {
          consoleSpy.restore();
        }
      });

      it('should preserve className attribute', () => {
        const consoleSpy = createConsoleErrorSpy();

        try {
          const testProps = {
            ...createTestPropsWithAllBooleans(categories),
            className: 'custom-test-class'
          };

          const { container } = renderComponent(testProps);
          const element = container.querySelector(querySelector);

          expect(element).toHaveAttribute('class');
          expect(element).toHaveClass('custom-test-class');

          // Should not have React warnings
          const leakedProps = consoleSpy.getLeakedProps();
          expect(leakedProps).toHaveLength(0);
        } finally {
          consoleSpy.restore();
        }
      });

      it('should not render theme prop in DOM attributes', () => {
        const consoleSpy = createConsoleErrorSpy();

        try {
          // Note: Theme is provided via ThemeProvider context, not as a direct prop
          // This test ensures the theme system works without polluting DOM attributes
          const testProps = {
            ...createTestPropsWithAllBooleans(categories)
          };

          const { container } = renderComponent(testProps);
          const element = container.querySelector(querySelector);

          expect(element).not.toHaveAttribute('theme');
          expect(element).toBeInTheDocument();

          // Should not have React warnings
          const leakedProps = consoleSpy.getLeakedProps();
          expect(leakedProps).toHaveLength(0);
        } finally {
          consoleSpy.restore();
        }
      });

      it('should list all props being tested for omission', () => {
        const allBooleanProps = getAllBooleanPropsForCategories(categories);

        expect(allBooleanProps.length).toBeGreaterThan(0);
      });
    });
  };
}