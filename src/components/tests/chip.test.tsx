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
      expect(chip).toHaveClass('text-base'); // md size
      expect(chip).toHaveClass('text-(--color-text-secondary)'); // secondary appearance (default for chip)
      expect(chip).toHaveClass('font-mono'); // mono font for chip
      expect(chip).toHaveClass('font-normal'); // normal weight
      expect(chip).toHaveClass('inline-flex', 'items-center', 'rounded-(--ui-br-md)');
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
      expect(chip).toHaveClass('text-(--color-text-primary)'); // primary color
      expect(chip).toHaveClass('bg-(--color-bg-primary)'); // primary background
    });

    it('Chip with default variant should have default classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip default>Default Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('text-(--color-text-default)'); // default color
      expect(chip).toHaveClass('bg-(--color-bg-default)'); // default background
    });

    it('Chip with success variant should have success classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip success>Success Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('text-(--color-text-success)'); // success color
      expect(chip).toHaveClass('bg-(--color-bg-success)'); // success background
    });

    it('Chip with danger variant should have danger classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip danger>Danger Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('text-(--color-text-danger)'); // danger color
      expect(chip).toHaveClass('bg-(--color-bg-danger)'); // danger background
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
      expect(chip).toHaveClass('text-xs', 'px-(--ui-px)', 'py-(--ui-py)', 'gap-(--ui-gap)');
    });

    it('should render with lg size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip lg>Large Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toHaveClass('text-lg', 'px-(--ui-px)', 'py-(--ui-py)', 'gap-(--ui-gap)');
    });

    it('should render with xl size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip xl>XL Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toHaveClass('text-xl', 'px-(--ui-px)', 'py-(--ui-py)', 'gap-(--ui-gap)');
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
      expect(chip).toHaveClass('rounded-(--ui-br-md)'); // default rounded
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
        expect(chip).not.toHaveClass('shadow-sm');
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
      expect(chipDefaultRing).toHaveClass('ring-(--color-border-primary)');
      expect(chipSecondaryRing).toHaveClass('ring-(--color-border-secondary)');
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
      expect(chip).toHaveClass('text-(--color-text-primary)'); // primary color
    });

    it('should render with outline variant correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Chip outline>Outline Chip</Chip>
        </ThemeProvider>
      );

      const chip = container.querySelector('span');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('ring', 'ring-inset'); // outline variant shows ring
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
});