import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React, { useRef, useEffect } from 'react';
import {
  Grid2,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Grid2 Component Tests', () => {
  describe('Grid2 Component', () => {
    it('should render with default grid classes for 2 columns', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid2>Grid2 content</Grid2>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid-cols-1'); // mobile and small screens: 1 column
      expect(grid).toHaveClass('md:grid-cols-2'); // medium screens and up: 2 columns
      expect(grid).toHaveClass('grid'); // grid display
      expect(grid).toHaveClass('gap-6'); // default md gap
      expect(grid).toHaveTextContent('Grid2 content');
    });

    it('should support different gap sizes', () => {
      const gaps = [
        { prop: 'xs', class: 'gap-2' },
        { prop: 'sm', class: 'gap-4' },
        { prop: 'md', class: 'gap-6' },
        { prop: 'lg', class: 'gap-8' },
        { prop: 'xl', class: 'gap-10' }
      ] as const;

      gaps.forEach(({ prop, class: expectedClass }) => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Grid2 {...{ [prop]: true }} gap>
              <div>Item 1</div>
              <div>Item 2</div>
            </Grid2>
          </ThemeProvider>
        );

        const grid = container.querySelector('div');
        expect(grid).toHaveClass(expectedClass);
      });
    });

    it('should support noGap option', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid2 noGap>
            <div>Item 1</div>
            <div>Item 2</div>
          </Grid2>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      // With new GapTheme, noGap applies no gap classes instead of gap-0
      expect(grid).not.toHaveClass('gap-2', 'gap-3', 'gap-4', 'gap-5', 'gap-6');
    });

    it('should support background appearance variants', () => {
      const appearances = ['default', 'accent', 'primary', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info'] as const;
      
      appearances.forEach(appearance => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Grid2 {...{ [appearance]: true }}>
              <div>Item 1</div>
              <div>Item 2</div>
            </Grid2>
          </ThemeProvider>
        );

        const grid = container.querySelector('div');
        expect(grid).toHaveClass(`bg-(--layout-background-${appearance})`);
      });
    });

    it('should support transparent appearance', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid2 transparent>
            <div>Item 1</div>
            <div>Item 2</div>
          </Grid2>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('bg-transparent');
    });



    it('should support position variants', () => {
      const positions = [
        { prop: 'relative', class: 'relative' },
        { prop: 'absolute', class: 'absolute' },
        { prop: 'fixed', class: 'fixed' },
        { prop: 'sticky', class: 'sticky' },
        { prop: 'static', class: 'static' }
      ] as const;

      positions.forEach(({ prop, class: expectedClass }) => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Grid2 {...{ [prop]: true }}>
              <div>Item 1</div>
              <div>Item 2</div>
            </Grid2>
          </ThemeProvider>
        );

        const grid = container.querySelector('div');
        expect(grid).toHaveClass(expectedClass);
      });
    });

    it('should support overflow variants', () => {
      const overflows = [
        { prop: 'overflowHidden', class: 'overflow-hidden' },
        { prop: 'overflowScroll', class: 'overflow-scroll' },
        { prop: 'overflowAuto', class: 'overflow-auto' }
      ] as const;

      overflows.forEach(({ prop, class: expectedClass }) => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Grid2 {...{ [prop]: true }}>
              <div>Item 1</div>
              <div>Item 2</div>
            </Grid2>
          </ThemeProvider>
        );

        const grid = container.querySelector('div');
        expect(grid).toHaveClass(expectedClass);
      });
    });

    it('should support hide on different breakpoints', () => {
      const hideProps = [
        { prop: 'xsHide', class: 'max-xs:hidden' },
        { prop: 'smHide', class: 'max-sm:hidden' },
        { prop: 'mdHide', class: 'max-md:hidden' },
        { prop: 'lgHide', class: 'max-lg:hidden' },
        { prop: 'xlHide', class: 'max-xl:hidden' }
      ] as const;

      hideProps.forEach(({ prop, class: expectedClass }) => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Grid2 {...{ [prop]: true }}>
              <div>Item 1</div>
              <div>Item 2</div>
            </Grid2>
          </ThemeProvider>
        );

        const grid = container.querySelector('div');
        expect(grid).toHaveClass(expectedClass);
      });
    });

    it('should support flex direction when grid is overridden to flex', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid2 flex column>
            <div>Item 1</div>
            <div>Item 2</div>
          </Grid2>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('flex', 'flex-col');
    });

    it('should support wrap options when using flex', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid2 flex flexWrap>
            <div>Item 1</div>
            <div>Item 2</div>
          </Grid2>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('flex', 'flex-wrap');
    });

    it('should support custom className', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid2 className="custom-grid-class">
            <div>Item 1</div>
            <div>Item 2</div>
          </Grid2>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2'); // theme classes
      expect(grid).toHaveClass('custom-grid-class'); // custom class
    });

    it('should support custom HTML tag', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid2 tag="section">
            <div>Item 1</div>
            <div>Item 2</div>
          </Grid2>
        </ThemeProvider>
      );

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('grid-cols-1', 'md:grid-cols-2');
    });

    it('should render as anchor when href prop is provided', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid2 href="/grid-link">
            <div>Item 1</div>
            <div>Item 2</div>
          </Grid2>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      const div = container.querySelector('div div'); // nested div inside anchor
      
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/grid-link');
      expect(anchor).toHaveClass('grid-cols-1', 'md:grid-cols-2');
      expect(div).toBeInTheDocument(); // children should render inside anchor
    });

    it('should support accessibility attributes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid2 role="grid" aria-label="Two column grid">
            <div role="gridcell">Item 1</div>
            <div role="gridcell">Item 2</div>
          </Grid2>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveAttribute('role', 'grid');
      expect(grid).toHaveAttribute('aria-label', 'Two column grid');
    });

    it('should forward ref correctly', () => {
      let gridRef: HTMLDivElement | null = null;
      
      const TestComponent = () => {
        const ref = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
          gridRef = ref.current;
        }, []);
        
        return (
          <ThemeProvider theme={defaultTheme}>
            <Grid2 ref={ref}>
              <div>Item 1</div>
              <div>Item 2</div>
            </Grid2>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const grid = container.querySelector('div');
      
      expect(grid).toBeInTheDocument();
      expect(gridRef).toBe(grid);
    });

    it('should handle multiple children in 2-column layout', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid2>
            <div data-testid="item-1">Item 1</div>
            <div data-testid="item-2">Item 2</div>
            <div data-testid="item-3">Item 3</div>
            <div data-testid="item-4">Item 4</div>
          </Grid2>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2');
      
      // All children should be present
      expect(container.querySelector('[data-testid="item-1"]')).toBeInTheDocument();
      expect(container.querySelector('[data-testid="item-2"]')).toBeInTheDocument();
      expect(container.querySelector('[data-testid="item-3"]')).toBeInTheDocument();
      expect(container.querySelector('[data-testid="item-4"]')).toBeInTheDocument();
    });

    it('should work with complex responsive design', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid2 lg smHide>
            <div>This grid is large and hidden on small screens</div>
            <div>Second item</div>
          </Grid2>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass(
        'grid-cols-1', // mobile and small screens
        'md:grid-cols-2', // medium screens and up
        'gap-8', // lg gap
        'max-sm:hidden' // hidden on small screens
      );
    });
  });
});