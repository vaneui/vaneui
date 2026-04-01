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
      // Divider defaults to inherit appearance (no data-appearance attribute)
      expect(divider).toHaveClass('bg-(--divider-color)');
      expect(divider).not.toHaveAttribute('data-appearance');
    });
  });

  describe('Divider box-sizing and background clip', () => {
    it('should have box-content class by default for correct padding behavior', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider />
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveClass('box-content');
    });

    it('should have bg-clip-content class so padding area stays transparent', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider />
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveClass('bg-clip-content');
    });

    it('should have both box-content and bg-clip-content when padding is enabled', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider padding />
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveClass('box-content');
      expect(divider).toHaveClass('bg-clip-content');
      expect(divider).toHaveClass('py-(--py)');
    });
  });

  describe('Divider Padding', () => {
    it('should apply both py and px when padding prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider padding/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass('py-(--py)');
      expect(divider).toHaveClass('px-(--px)');
    });

    it('should apply only py when paddingY prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider paddingY/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveClass('py-(--py)');
      expect(divider).not.toHaveClass('px-(--px)');
    });

    it('should apply only px when paddingX prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider paddingX/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveClass('px-(--px)');
      expect(divider).not.toHaveClass('py-(--py)');
    });

    it('should apply no padding by default (noPadding)', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).not.toHaveClass('py-(--py)');
      expect(divider).not.toHaveClass('px-(--px)');
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
      expect(divider).toHaveClass('bg-(--divider-color)');
    });

    it('should apply secondary appearance variant', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider secondary/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveClass('bg-(--divider-color)');
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

  describe('Accessibility (role="separator")', () => {
    it('should have role="separator" by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider />
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveAttribute('role', 'separator');
    });

    it('should have aria-orientation="horizontal" by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider />
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('should have aria-orientation="vertical" when vertical prop is set', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider vertical />
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveAttribute('role', 'separator');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('should allow role override for decorative dividers', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider role="presentation" />
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveAttribute('role', 'presentation');
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
      expect(divider).toHaveClass('py-(--py)'); // padding (both axes)
      expect(divider).toHaveClass('px-(--px)');
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