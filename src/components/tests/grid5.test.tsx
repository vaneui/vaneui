import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { useRef, useEffect } from 'react';
import {
  Grid5,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Grid5 Component Tests', () => {
  describe('Grid5 Component', () => {
    it('should render with default grid classes for 5 columns', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid5>Grid5 content</Grid5>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid-cols-1'); // mobile screens: 1 column
      expect(grid).toHaveClass('sm:grid-cols-2'); // small screens: 2 columns
      expect(grid).toHaveClass('md:grid-cols-3'); // medium screens: 3 columns
      expect(grid).toHaveClass('lg:grid-cols-5'); // large screens and up: 5 columns
      expect(grid).toHaveClass('grid'); // grid display
      expect(grid).toHaveClass('gap-6'); // default md gap
      expect(grid).toHaveTextContent('Grid5 content');
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
            <Grid5 {...{ [prop]: true }} gap>
              <div>Item 1</div>
              <div>Item 2</div>
              <div>Item 3</div>
              <div>Item 4</div>
              <div>Item 5</div>
            </Grid5>
          </ThemeProvider>
        );

        const grid = container.querySelector('div');
        expect(grid).toHaveClass(expectedClass);
      });
    });

    it('should support noGap option', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid5 noGap>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
          </Grid5>
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
            <Grid5 {...{ [appearance]: true }}>
              <div>Item 1</div>
              <div>Item 2</div>
              <div>Item 3</div>
              <div>Item 4</div>
              <div>Item 5</div>
            </Grid5>
          </ThemeProvider>
        );

        const grid = container.querySelector('div');
        expect(grid).toHaveClass(`bg-(--color-bg-layout-${appearance})`);
      });
    });

    it('should support transparent appearance', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid5 transparent>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
          </Grid5>
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
            <Grid5 {...{ [prop]: true }}>
              <div>Item 1</div>
              <div>Item 2</div>
              <div>Item 3</div>
              <div>Item 4</div>
              <div>Item 5</div>
            </Grid5>
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
            <Grid5 {...{ [prop]: true }}>
              <div>Item 1</div>
              <div>Item 2</div>
              <div>Item 3</div>
              <div>Item 4</div>
              <div>Item 5</div>
            </Grid5>
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
            <Grid5 {...{ [prop]: true }}>
              <div>Item 1</div>
              <div>Item 2</div>
              <div>Item 3</div>
              <div>Item 4</div>
              <div>Item 5</div>
            </Grid5>
          </ThemeProvider>
        );

        const grid = container.querySelector('div');
        expect(grid).toHaveClass(expectedClass);
      });
    });

    it('should support flex direction when grid is overridden to flex', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid5 flex column>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
          </Grid5>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('flex', 'flex-col');
    });

    it('should support wrap options when using flex', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid5 flex flexWrap>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
          </Grid5>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('flex', 'flex-wrap');
    });

    it('should support custom className', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid5 className="custom-grid-class">
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
          </Grid5>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-5'); // theme classes
      expect(grid).toHaveClass('custom-grid-class'); // custom class
    });

    it('should support custom HTML tag', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid5 tag="section">
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
          </Grid5>
        </ThemeProvider>
      );

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-5');
    });

    it('should render as anchor when href prop is provided', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid5 href="/grid-link">
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
          </Grid5>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      const div = container.querySelector('a div'); // nested div inside anchor
      
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/grid-link');
      expect(anchor).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-5');
      expect(div).toBeInTheDocument(); // children should render inside anchor
    });

    it('should support accessibility attributes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid5 role="grid" aria-label="Five column grid">
            <div role="gridcell">Item 1</div>
            <div role="gridcell">Item 2</div>
            <div role="gridcell">Item 3</div>
            <div role="gridcell">Item 4</div>
            <div role="gridcell">Item 5</div>
          </Grid5>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveAttribute('role', 'grid');
      expect(grid).toHaveAttribute('aria-label', 'Five column grid');
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
            <Grid5 ref={ref}>
              <div>Item 1</div>
              <div>Item 2</div>
              <div>Item 3</div>
              <div>Item 4</div>
              <div>Item 5</div>
            </Grid5>
          </ThemeProvider>
        );
      };
      
      const { container } = render(<TestComponent />);
      const grid = container.querySelector('div');
      
      expect(grid).toBeInTheDocument();
      expect(gridRef).toBe(grid);
    });

    it('should handle multiple children in 5-column layout', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid5>
            <div data-testid="item-1">Item 1</div>
            <div data-testid="item-2">Item 2</div>
            <div data-testid="item-3">Item 3</div>
            <div data-testid="item-4">Item 4</div>
            <div data-testid="item-5">Item 5</div>
            <div data-testid="item-6">Item 6</div>
            <div data-testid="item-7">Item 7</div>
            <div data-testid="item-8">Item 8</div>
            <div data-testid="item-9">Item 9</div>
            <div data-testid="item-10">Item 10</div>
          </Grid5>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-5');
      
      // All children should be present
      for (let i = 1; i <= 10; i++) {
        expect(container.querySelector(`[data-testid="item-${i}"]`)).toBeInTheDocument();
      }
    });

    it('should work with complex responsive design', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid5 lg smHide>
            <div>This grid is large and hidden on small screens</div>
            <div>Second item</div>
            <div>Third item</div>
            <div>Fourth item</div>
            <div>Fifth item</div>
          </Grid5>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass(
        'grid-cols-1', // mobile screens
        'sm:grid-cols-2', // small screens
        'md:grid-cols-3', // medium screens
        'lg:grid-cols-5', // large screens and up
        'gap-8', // lg gap
        'max-sm:hidden' // hidden on small screens
      );
    });
  });
});