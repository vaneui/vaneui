import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Divider,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Divider Component Tests', () => {

  describe('Divider Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass('h-(--bw)', 'w-full');
      // Divider has default primary appearance for border color
      expect(divider).toHaveClass('bg-(--border-color)');
      expect(divider).toHaveAttribute('data-appearance', 'primary');
    });
  });

  describe('Divider Padding', () => {
    it('should apply padding when padding prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider padding/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass('py-(--py)'); // md size padding
    });

    it('should apply no padding by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).not.toHaveClass('py-2', 'py-4', 'py-6', 'py-8', 'py-10'); // no padding classes applied
    });
  });

  describe('Divider Appearance Variants', () => {
    it('should apply primary appearance variant', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider primary/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveClass('bg-(--border-color)');
    });

    it('should apply secondary appearance variant', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider secondary/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveClass('bg-(--border-color)');
    });

  });

  describe('Custom className override', () => {
    it('should merge custom className with theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider className="custom-divider-class"/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass('h-(--bw)', 'w-full'); // theme classes
      expect(divider).toHaveClass('custom-divider-class'); // custom class
    });
  });

  describe('Orientation Props', () => {
    it('should render horizontal by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider />
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass('h-(--bw)', 'w-full'); // horizontal classes
      expect(divider).not.toHaveClass('w-(--bw)', 'h-full'); // not vertical
    });

    it('should apply horizontal classes when horizontal prop is set', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider horizontal />
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveClass('h-(--bw)', 'w-full');
    });

    it('should apply vertical classes when vertical prop is set', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider vertical />
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass('w-(--bw)', 'h-full'); // vertical classes
      expect(divider).not.toHaveClass('h-(--bw)', 'w-full'); // not horizontal
    });

    it('should work with vertical and other props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider vertical primary padding />
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveClass('w-(--bw)', 'h-full'); // vertical
      expect(divider).toHaveClass('py-(--py)'); // padding
      expect(divider).toHaveAttribute('data-appearance', 'primary');
    });

    it('should only apply one orientation when multiple are specified', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider horizontal vertical />
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      // Only one orientation should be active - check that we don't have conflicting classes
      const hasHorizontalHeight = divider?.classList.contains('h-(--bw)');
      const hasVerticalHeight = divider?.classList.contains('h-full');
      // Should not have both height classes
      expect(hasHorizontalHeight && hasVerticalHeight).toBe(false);
    });
  });

  describe('Width Props', () => {
    it('should apply wFull class for full width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider wFull />
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('w-full');
    });

    it('should apply wFit class for fit-content width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider wFit />
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('w-fit');
    });

    it('should apply wAuto class for auto width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider wAuto />
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('w-auto');
    });
  });

  describe('Height Props', () => {
    it('should apply hFull class for full height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider hFull />
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('h-full');
    });

    it('should apply hFit class for fit-content height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider hFit />
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('h-fit');
    });

    it('should apply hAuto class for auto height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider hAuto />
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('h-auto');
    });
  });
});