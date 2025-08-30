import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
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
      expect(grid).toHaveClass('gap-6'); // default md gap
      expect(grid).toHaveTextContent('Grid2 content');
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
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-3', 'gap-6', 'max-lg:gap-4', 'grid');
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
      expect(grid).not.toHaveClass('gap-6');
      // With new GapTheme, noGap applies no gap classes instead of gap-0
      expect(grid).not.toHaveClass('gap-2', 'gap-3', 'gap-4', 'gap-5', 'gap-6');
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
        expect(grid).toHaveClass(`text-(--text-color-${appearance})`);
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
      expect(outlineGrid).toHaveClass('text-(--text-color-primary)');
      expect(filledGrid).toHaveClass('text-white');
      
      // Background colors
      expect(outlineGrid).toHaveClass('bg-(--background-color-primary)');
      expect(filledGrid).toHaveClass('bg-(--filled-background-color-primary)');
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
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-3', 'gap-6', 'max-lg:gap-4', 'grid'); // theme classes
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
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4', 'gap-6', 'max-lg:gap-4', 'grid');
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
      expect(grid).not.toHaveClass('gap-6');
      // With new GapTheme, noGap applies no gap classes instead of gap-0
      expect(grid).not.toHaveClass('gap-2', 'gap-3', 'gap-4', 'gap-5', 'gap-6');
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
        expect(grid).toHaveClass(`text-(--text-color-${appearance})`);
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
      expect(outlineGrid).toHaveClass('text-(--text-color-primary)');
      expect(filledGrid).toHaveClass('text-white');
      
      // Background colors
      expect(outlineGrid).toHaveClass('bg-(--background-color-primary)');
      expect(filledGrid).toHaveClass('bg-(--filled-background-color-primary)');
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
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4', 'gap-6', 'max-lg:gap-4', 'grid'); // theme classes
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
      expect(grid3).toHaveClass('grid', 'gap-6', 'max-lg:gap-4');
      expect(grid4).toHaveClass('grid', 'gap-6', 'max-lg:gap-4');
    });
  });
});