import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Chip,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Chip Component Tests', () => {

  describe('Chip Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip>Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('w-fit', 'h-fit', 'whitespace-nowrap');
      expect(chip).toHaveClass('text-(length:--fs-desktop)'); // md size
      expect(chip).toHaveAttribute('data-size', 'md');
      expect(chip).toHaveClass('text-(--text-color)'); // secondary appearance (default for chip)
      expect(chip).toHaveClass('font-mono'); // mono font for chip
      expect(chip).toHaveClass('font-normal'); // normal weight
      expect(chip).toHaveClass('inline-flex', 'items-center', 'rounded-(--br)');
    });
  });

  describe('Chip Variants', () => {
    it('Chip with primary variant should have primary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip primary>Primary Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('text-(--text-color)'); // primary color
      expect(chip).toHaveClass('bg-(--bg-color)'); // primary background
    });

    it('Chip with primary variant should have primary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip primary>Primary Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('text-(--text-color)'); // primary color
      expect(chip).toHaveClass('bg-(--bg-color)'); // primary background
    });

    it('Chip with success variant should have success classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip success>Success Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('text-(--text-color)'); // success color
      expect(chip).toHaveClass('bg-(--bg-color)'); // success background
    });

    it('Chip with danger variant should have danger classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip danger>Danger Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('text-(--text-color)'); // danger color
      expect(chip).toHaveClass('bg-(--bg-color)'); // danger background
    });
  });

  describe('Chip Sizes', () => {
    it('should render with xs size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip xs>XS Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toHaveClass('text-(length:--fs-desktop)', 'px-(--px-desktop)', 'py-(--py-desktop)', 'gap-(--gap-desktop)');
      expect(chip).toHaveAttribute('data-size', 'xs');
    });

    it('should render with lg size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip lg>Large Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toHaveClass('text-(length:--fs-desktop)', 'px-(--px-desktop)', 'py-(--py-desktop)', 'gap-(--gap-desktop)');
      expect(chip).toHaveAttribute('data-size', 'lg');
    });

    it('should render with xl size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip xl>XL Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toHaveClass('text-(length:--fs-desktop)', 'px-(--px-desktop)', 'py-(--py-desktop)', 'gap-(--gap-desktop)');
      expect(chip).toHaveAttribute('data-size', 'xl');
    });
  });

  describe('Chip Shape and Border', () => {
    it('should render with rounded corners by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip>Rounded Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toHaveClass('rounded-(--br)'); // default rounded
    });

    it('should render with sharp corners when sharp prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip sharp>Sharp Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toHaveClass('rounded-none'); // sharp corners
    });

    it('should render with pill shape when pill prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip pill>Pill Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toHaveClass('rounded-full'); // pill shape
    });
  });

  describe('Chip Border, Ring, and Shadow Behavior', () => {
    it('should preserve borders, rings, and shadows for appearance variants', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip id="chip-default">Default</Chip>
          <Chip id="chip-primary" primary>Primary</Chip>
          <Chip id="chip-secondary" secondary>Secondary</Chip>
        </ThemeProvider>
      );

      const chipDefault = container.querySelector('#chip-default');
      const chipPrimary = container.querySelector('#chip-primary');
      const chipSecondary = container.querySelector('#chip-secondary');

      // Chips should not have shadows by default (noShadow: true in defaults)
      [chipDefault, chipPrimary, chipSecondary].forEach(chip => {
        expect(chip).not.toHaveClass('shadow-ui');
      });
    });

    it('should demonstrate ring functionality works for chips when ring prop is enabled', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip id="chip-default-ring" ring primary>Default with Ring</Chip>
          <Chip id="chip-secondary-ring" ring secondary>Secondary with Ring</Chip>
        </ThemeProvider>
      );

      const chipDefaultRing = container.querySelector('#chip-default-ring');
      const chipSecondaryRing = container.querySelector('#chip-secondary-ring');

      // Chips with ring should show ring classes
      expect(chipDefaultRing).toHaveClass('ring-(--ring-color)');
      expect(chipSecondaryRing).toHaveClass('ring-(--ring-color)');
    });
  });

  describe('Chip Variants', () => {
    it('should render with primary variant correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip primary>Primary Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('text-(--text-color)'); // primary color
    });

    it('should render with outline variant correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip outline>Outline Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('ring-[length:var(--rw)]', 'ring-inset'); // outline variant shows ring
    });
  });

  describe('Chip Font Properties', () => {
    it('should render with mono font by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip>Mono Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toHaveClass('font-mono'); // mono font family
    });

    it('should render with different font weights', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip semibold>Semibold Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toHaveClass('font-semibold');
    });

    it('should render with different font families', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip sans>Sans Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toHaveClass('font-sans');
    });
  });

  describe('Custom className override', () => {
    it('should merge custom className with theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip className="custom-chip-class">Custom Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('w-fit', 'h-fit', 'whitespace-nowrap'); // theme classes
      expect(chip).toHaveClass('custom-chip-class'); // custom class
    });
  });

  describe('CSS Variable Classes Based on Size', () => {
    describe('Border Radius Variables', () => {
      it('should apply correct --br-unit for xs size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Chip xs>XS Chip</Chip>
          </ThemeProvider>
        );

        const chip = container.querySelector('span');
        expect(chip).toHaveClass('rounded-(--br)');
        expect(chip).toHaveAttribute('data-size', 'xs');
      });

      it('should apply correct --br-unit for lg size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Chip lg>LG Chip</Chip>
          </ThemeProvider>
        );

        const chip = container.querySelector('span');
        expect(chip).toHaveClass('rounded-(--br)');
        expect(chip).toHaveAttribute('data-size', 'lg');
      });
    });

    describe('Padding Variables', () => {
      it('should apply correct aspect-ratio and --py-unit for xs size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Chip xs>XS Chip</Chip>
          </ThemeProvider>
        );

        const chip = container.querySelector('span');
        expect(chip).toHaveClass('px-(--px-desktop)');
        expect(chip).toHaveClass('py-(--py-desktop)');
        expect(chip).toHaveAttribute('data-size', 'xs');
      });
    });

    describe('Gap Variables', () => {
      it('should apply correct --gap-unit for xs size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Chip xs gap>XS Chip</Chip>
          </ThemeProvider>
        );

        const chip = container.querySelector('span');
        expect(chip).toHaveClass('gap-(--gap-desktop)');
        expect(chip).toHaveAttribute('data-size', 'xs');
      });
    });
  });
});