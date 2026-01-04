
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
    test('should filter out component props but warn about invalid ones', () => {
      // Mock console.error to capture React warnings
      const originalError = console.error;
      const consoleErrorMock = jest.fn();
      console.error = consoleErrorMock;

      try {
        // Using Record<string, unknown> to bypass TypeScript checking for testing runtime behavior
        const props: Record<string, unknown> = {
          // Valid Row props
          primary: true,
          itemsCenter: true,
          gap: true,
          
          // Invalid prop that should cause React warnings
          padding: true,  // padding category not in ROW_CATEGORIES
          
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

        // All component-specific props should be filtered out from DOM
        expect(element.hasAttribute('primary')).toBe(false);
        expect(element.hasAttribute('itemsCenter')).toBe(false);
        expect(element.hasAttribute('gap')).toBe(false);
        expect(element.hasAttribute('padding')).toBe(false);

        // Verify React warnings were generated for invalid props
        const calls = consoleErrorMock.mock.calls;
        expect(calls).toHaveLength(1);
        
        // Check for padding warning
        expect(calls.some(call => 
          call[0]?.includes('non-boolean attribute') && call[2] === 'padding'
        )).toBe(true);
      } finally {
        console.error = originalError;
      }
    });

    test('should apply correct CSS classes for valid props without warnings', () => {
      // Mock console.error to ensure no warnings for valid props
      const originalError = console.error;
      const consoleErrorMock = jest.fn();
      console.error = consoleErrorMock;

      try {
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
        expect(classes).toContain('[background:var(--bg-color)]'); // CSS variable for primary
        
        // Should have items-center
        expect(classes).toContain('items-center');

        // Valid props should not generate React warnings
        expect(consoleErrorMock).not.toHaveBeenCalledWith(
          expect.stringContaining('Received `true` for a non-boolean attribute')
        );
      } finally {
        console.error = originalError;
      }
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
    test('should filter component props and warn about invalid ones', () => {
      // Mock console.error to capture React warnings
      const originalError = console.error;
      const consoleErrorMock = jest.fn();
      console.error = consoleErrorMock;

      try {
        const props: Record<string, unknown> = {
          // Valid Stack props
          gap: true,
          primary: true,
          
          // Invalid props that should cause React warnings
          disc: true,       // listStyle category not in STACK_CATEGORIES
          underline: true,  // textDecoration category not in STACK_CATEGORIES
          
          children: 'Stack content'
        };

        const { container } = renderWithTheme(<Stack {...props} />);
        const element = container.firstChild as HTMLElement;

        // All component props should be filtered out from DOM
        expect(element.hasAttribute('gap')).toBe(false);
        expect(element.hasAttribute('primary')).toBe(false);
        expect(element.hasAttribute('disc')).toBe(false);
        expect(element.hasAttribute('underline')).toBe(false);

        // Verify React warnings were generated for invalid props
        const calls = consoleErrorMock.mock.calls;
        expect(calls.length).toBeGreaterThanOrEqual(2);
        
        // Check for warnings about invalid attributes
        expect(calls.some(call => 
          call[0]?.includes('non-boolean attribute') && call[2] === 'disc'
        )).toBe(true);
        
        expect(calls.some(call => 
          call[0]?.includes('non-boolean attribute') && call[2] === 'underline'
        )).toBe(true);
      } finally {
        console.error = originalError;
      }
    });
  });

  describe('Category-based filtering verification', () => {
    test('components should only filter props from their defined categories', () => {
      // Test data: props that exist in different categories
      const testProps: Record<string, unknown> = {
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