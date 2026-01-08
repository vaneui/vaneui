import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Grid2,
  Grid3,
  Grid4,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Grid Components Tests', () => {

  describe('Grid2 Component', () => {
    it('should render with 2-column grid classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid2>Grid2 content</Grid2>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid-cols-1'); // mobile and small screens: 1 column
      expect(grid).toHaveClass('md:grid-cols-2'); // medium screens and up: 2 columns
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveClass('gap-(--gap)'); // default md gap
      expect(grid).toHaveTextContent('Grid2 content');
    });

    it('should have no default appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid2>Grid2 without appearance</Grid2>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      // Layout components should not have appearance classes by default
      expect(grid).not.toHaveClass('bg-(--bg-color)');
      expect(grid).not.toHaveClass('text-(--text-color)');
      expect(grid).not.toHaveClass('border-(--border-color)');
      expect(grid).not.toHaveAttribute('data-appearance');
    });
  });

  describe('Grid3 Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3>Grid3 content</Grid3>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-3', 'gap-(--gap)', 'grid');
    });

    it('should have no default appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3>Grid3 without appearance</Grid3>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      // Layout components should not have appearance classes by default
      expect(grid).not.toHaveClass('bg-(--bg-color)');
      expect(grid).not.toHaveClass('text-(--text-color)');
      expect(grid).not.toHaveClass('border-(--border-color)');
      expect(grid).not.toHaveAttribute('data-appearance');
    });

    it('should render consistently', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3>Grid3 with multiple children</Grid3>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveTextContent('Grid3 with multiple children');
    });

    it('should support no gap option', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3 noGap>
            No Gap Grid3
          </Grid3>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).not.toHaveClass('gap-(--gap)');
      // With new GapTheme, noGap applies no gap classes instead of gap-0
      expect(grid).not.toHaveClass('gap-(--gap)');
    });

    it('should support flex properties for grid items', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3 itemsCenter justifyBetween>
            Aligned Grid3
          </Grid3>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('items-center', 'justify-between');
    });

    it('should support appearance variants for text color', () => {
      const appearances = ['primary', 'secondary', 'accent', 'success', 'danger', 'warning', 'info'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Grid3 {...{[appearance]: true}}>
              {appearance} grid3
            </Grid3>
          </ThemeProvider>
        );

        const grid = container.querySelector('div');
        expect(grid).toHaveClass('text-(--text-color)');
      });
    });

    it('should support filled and outline variants for text and background colors', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3 primary outline>Outline grid3</Grid3>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3 primary filled>Filled grid3</Grid3>
        </ThemeProvider>
      );

      const outlineGrid = outlineContainer.querySelector('div');
      const filledGrid = filledContainer.querySelector('div');

      // Text colors
      expect(outlineGrid).toHaveClass('text-(--text-color)');
      expect(filledGrid).toHaveClass('text-(--text-color)');
      
      // Background colors
      expect(outlineGrid).toHaveClass('bg-(--bg-color)');
      expect(filledGrid).toHaveClass('bg-(--bg-color)');
    });
    it('should support shape variants', () => {
      const {container: roundedContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3 rounded>Rounded Grid3</Grid3>
        </ThemeProvider>
      );
      
      const {container: pillContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3 pill>Pill Grid3</Grid3>
        </ThemeProvider>
      );
      
      const {container: sharpContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3 sharp>Sharp Grid3</Grid3>
        </ThemeProvider>
      );

      const roundedGrid = roundedContainer.querySelector('div');
      const pillGrid = pillContainer.querySelector('div');
      const sharpGrid = sharpContainer.querySelector('div');

      expect(roundedGrid).toHaveClass('rounded-(--br)');
      expect(pillGrid).toHaveClass('rounded-full');
      expect(sharpGrid).toHaveClass('rounded-none');
    });


    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3 className="custom-grid3-class">
            Custom Grid3
          </Grid3>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-3', 'gap-(--gap)', 'grid'); // theme classes
      expect(grid).toHaveClass('custom-grid3-class'); // custom class
    });

    it('should support custom HTML tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3 tag="section">
            Section Grid3
          </Grid3>
        </ThemeProvider>
      );

      const sectionEl = container.querySelector('section');
      expect(sectionEl).toBeInTheDocument();
      expect(sectionEl).toHaveTextContent('Section Grid3');
    });
  });

  describe('Grid4 Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4>Grid4 content</Grid4>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4', 'gap-(--gap)', 'grid');
    });

    it('should have no default appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4>Grid4 without appearance</Grid4>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      // Layout components should not have appearance classes by default
      expect(grid).not.toHaveClass('bg-(--bg-color)');
      expect(grid).not.toHaveClass('text-(--text-color)');
      expect(grid).not.toHaveClass('border-(--border-color)');
      expect(grid).not.toHaveAttribute('data-appearance');
    });

    it('should render consistently', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4>Grid4 with multiple children</Grid4>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveTextContent('Grid4 with multiple children');
    });

    it('should support no gap option', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4 noGap>
            No Gap Grid4
          </Grid4>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).not.toHaveClass('gap-(--gap)');
      // With new GapTheme, noGap applies no gap classes instead of gap-0
      expect(grid).not.toHaveClass('gap-(--gap)');
    });

    it('should support flex properties for grid items', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4 itemsStart justifyEvenly>
            Aligned Grid4
          </Grid4>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('items-start', 'justify-evenly');
    });

    it('should support layout positioning', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4 relative>
            Positioned Grid4
          </Grid4>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('relative');
    });

    it('should support overflow properties', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4 overflowHidden>
            Hidden Overflow Grid4
          </Grid4>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('overflow-hidden');
    });

    it('should support appearance variants for text color', () => {
      const appearances = ['primary', 'secondary', 'accent', 'success', 'danger', 'warning', 'info'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Grid4 {...{[appearance]: true}}>
              {appearance} grid4
            </Grid4>
          </ThemeProvider>
        );

        const grid = container.querySelector('div');
        expect(grid).toHaveClass('text-(--text-color)');
      });
    });

    it('should support filled and outline variants for text and background colors', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4 primary outline>Outline grid4</Grid4>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4 primary filled>Filled grid4</Grid4>
        </ThemeProvider>
      );

      const outlineGrid = outlineContainer.querySelector('div');
      const filledGrid = filledContainer.querySelector('div');

      // Text colors
      expect(outlineGrid).toHaveClass('text-(--text-color)');
      expect(filledGrid).toHaveClass('text-(--text-color)');
      
      // Background colors
      expect(outlineGrid).toHaveClass('bg-(--bg-color)');
      expect(filledGrid).toHaveClass('bg-(--bg-color)');
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4 className="custom-grid4-class">
            Custom Grid4
          </Grid4>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4', 'gap-(--gap)', 'grid'); // theme classes
      expect(grid).toHaveClass('custom-grid4-class'); // custom class
    });

    it('should support custom HTML tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4 tag="article">
            Article Grid4
          </Grid4>
        </ThemeProvider>
      );

      const articleEl = container.querySelector('article');
      expect(articleEl).toBeInTheDocument();
      expect(articleEl).toHaveTextContent('Article Grid4');
    });
  });

  describe('Grid Components Comparison', () => {
    it('should render different grid column counts', () => {
      const {container: container3} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3>Grid3</Grid3>
        </ThemeProvider>
      );

      const {container: container4} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4>Grid4</Grid4>
        </ThemeProvider>
      );

      const grid3 = container3.querySelector('div');
      const grid4 = container4.querySelector('div');
      
      expect(grid3).toHaveClass('md:grid-cols-3');
      expect(grid4).toHaveClass('lg:grid-cols-4');
      
      // Both should share common grid properties
      expect(grid3).toHaveClass('grid', 'gap-(--gap)');
      expect(grid4).toHaveClass('grid', 'gap-(--gap)');
    });
  });
});