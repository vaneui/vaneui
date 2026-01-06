import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Badge,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Badge Component Tests', () => {

  describe('Badge Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge>Badge</Badge>
        </ThemeProvider>
      );

      const badge = container.querySelector('span');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('w-fit', 'h-fit', 'whitespace-nowrap');
      expect(badge).toHaveClass('text-(length:--fs-desktop)'); // md size
      expect(badge).toHaveAttribute('data-size', 'md');
      expect(badge).toHaveClass('text-(--text-color)'); // primary appearance
      expect(badge).toHaveClass('font-sans');
      expect(badge).toHaveClass('font-semibold'); // semibold weight
      expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full', 'uppercase');
    });
  });

  describe('Badge Variants', () => {
    it('Badge with primary variant should have primary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge primary>Primary Badge</Badge>
        </ThemeProvider>
      );

      const badge = container.querySelector('span');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('text-(--text-color)'); // primary color
      expect(badge).toHaveClass('[background:var(--bg-color)]'); // primary background
    });

    it('Badge with secondary variant should have secondary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge secondary>Secondary Badge</Badge>
        </ThemeProvider>
      );

      const badge = container.querySelector('span');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('text-(--text-color)'); // secondary color
      expect(badge).toHaveClass('[background:var(--bg-color)]'); // secondary background
    });

    it('Badge with success variant should have success classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge success>Success Badge</Badge>
        </ThemeProvider>
      );

      const badge = container.querySelector('span');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('text-(--text-color)'); // success color
      expect(badge).toHaveClass('[background:var(--bg-color)]'); // success background
    });

    it('Badge with danger variant should have danger classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge danger>Danger Badge</Badge>
        </ThemeProvider>
      );

      const badge = container.querySelector('span');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('text-(--text-color)'); // danger color
      expect(badge).toHaveClass('[background:var(--bg-color)]'); // danger background
    });
  });

  describe('Badge Sizes', () => {
    it('should render with xs size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge xs>XS Badge</Badge>
        </ThemeProvider>
      );

      const badge = container.querySelector('span');
      expect(badge).toHaveClass('text-(length:--fs-desktop)', 'px-(--px-desktop)', 'py-(--py-desktop)');
      expect(badge).toHaveAttribute('data-size', 'xs');
    });

    it('should render with lg size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge lg>Large Badge</Badge>
        </ThemeProvider>
      );

      const badge = container.querySelector('span');
      expect(badge).toHaveClass('text-(length:--fs-desktop)', 'px-(--px-desktop)', 'py-(--py-desktop)');
      expect(badge).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('Badge Border, Ring, and Shadow Behavior', () => {
    it('should preserve borders, rings, and shadows for appearance variants', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge id="badge-default">Default</Badge>
          <Badge id="badge-primary" primary>Primary</Badge>
          <Badge id="badge-secondary" secondary>Secondary</Badge>
        </ThemeProvider>
      );

      const badgeDefault = container.querySelector('#badge-default');
      const badgePrimary = container.querySelector('#badge-primary');
      const badgeSecondary = container.querySelector('#badge-secondary');

      // Badges should not have shadows by default (noShadow: true in defaults)
      [badgeDefault, badgePrimary, badgeSecondary].forEach(badge => {
        expect(badge).not.toHaveClass('shadow-ui');
      });
    });

    it('should demonstrate ring functionality works for badges when ring prop is enabled', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge id="badge-default-ring" ring primary>Default with Ring</Badge>
          <Badge id="badge-secondary-ring" ring secondary>Secondary with Ring</Badge>
        </ThemeProvider>
      );

      const badgeDefaultRing = container.querySelector('#badge-default-ring');
      const badgeSecondaryRing = container.querySelector('#badge-secondary-ring');

      // Badges with ring should show ring classes
      expect(badgeDefaultRing).toHaveClass('ring-(--ring-color)');
      expect(badgeSecondaryRing).toHaveClass('ring-(--ring-color)');
    });
  });

  describe('Badge Variant', () => {
    it('should render with filled variant by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge filled primary>Filled Badge</Badge>
        </ThemeProvider>
      );

      const badge = container.querySelector('span');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('[background:var(--bg-color)]'); // filled variant shows background
    });

    it('should render with outline variant when specified', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge outline primary>Outline Badge</Badge>
        </ThemeProvider>
      );

      const badge = container.querySelector('span');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('ring-(--ring-color)'); // outline variant shows ring
    });
  });

  describe('Custom className override', () => {
    it('should merge custom className with theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Badge className="custom-badge-class">Custom Badge</Badge>
        </ThemeProvider>
      );

      const badge = container.querySelector('span');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('w-fit', 'h-fit', 'whitespace-nowrap'); // theme classes
      expect(badge).toHaveClass('custom-badge-class'); // custom class
    });
  });
});