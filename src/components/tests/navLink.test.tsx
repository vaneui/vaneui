import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';

import {
  NavLink,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('NavLink Component Tests', () => {

  describe('Rendering', () => {
    it('should render with default classes and attributes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/dashboard">Dashboard</NavLink>
        </ThemeProvider>
      );

      const el = container.querySelector('a');
      expect(el).toBeInTheDocument();
      expect(el).toHaveClass('w-full', 'cursor-pointer');
      expect(el).toHaveClass('text-(length:--fs)');
      expect(el).toHaveAttribute('data-size', 'sm');
      expect(el).toHaveAttribute('data-vane-type', 'ui');
      expect(el).toHaveAttribute('data-variant', 'outline');
      expect(el).toHaveAttribute('data-appearance', 'primary');
      expect(el).toHaveClass('text-(--text-color)');
      expect(el).toHaveClass('font-sans');
      expect(el).toHaveClass('flex', 'items-center');
    });

    it('should render as <a> when href is provided', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/settings">Settings</NavLink>
        </ThemeProvider>
      );

      expect(container.querySelector('a')).toBeInTheDocument();
      expect(container.querySelector('a')).toHaveAttribute('href', '/settings');
      expect(container.querySelector('button')).not.toBeInTheDocument();
    });

    it('should render as <button> when no href is provided', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink>Action</NavLink>
        </ThemeProvider>
      );

      expect(container.querySelector('button')).toBeInTheDocument();
      expect(container.querySelector('a')).not.toBeInTheDocument();
    });
  });

  describe('Label Sub-Theme', () => {
    it('should wrap children in a themed span with vane-nav-link-label class', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test">Dashboard</NavLink>
        </ThemeProvider>
      );

      const label = container.querySelector('span.vane-nav-link-label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Dashboard');
    });

    it('should apply truncate class to the label span by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test">Dashboard</NavLink>
        </ThemeProvider>
      );

      const label = container.querySelector('span.vane-nav-link-label');
      expect(label).toHaveClass('truncate');
    });

    it('should render label span inside the root element', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test">Dashboard</NavLink>
        </ThemeProvider>
      );

      const root = container.querySelector('a');
      const label = root?.querySelector('span.vane-nav-link-label');
      expect(label).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('should render with %s size', (size) => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test" {...{ [size]: true }}>Item</NavLink>
        </ThemeProvider>
      );

      const el = container.querySelector('a');
      expect(el).toHaveAttribute('data-size', size);
    });
  });

  describe('Appearance Variants', () => {
    it('should have primary appearance by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test">Item</NavLink>
        </ThemeProvider>
      );

      expect(container.querySelector('a')).toHaveAttribute('data-appearance', 'primary');
    });

    it.each(['secondary', 'success', 'danger', 'warning', 'info'] as const)(
      'should support %s appearance',
      (appearance) => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <NavLink href="/test" {...{ [appearance]: true }}>Item</NavLink>
          </ThemeProvider>
        );

        expect(container.querySelector('a')).toHaveAttribute('data-appearance', appearance);
      }
    );
  });

  describe('Variant Modifiers', () => {
    it('should default to outline variant', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test">Item</NavLink>
        </ThemeProvider>
      );

      expect(container.querySelector('a')).toHaveAttribute('data-variant', 'outline');
    });

    it('should support filled variant', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test" filled>Item</NavLink>
        </ThemeProvider>
      );

      expect(container.querySelector('a')).toHaveAttribute('data-variant', 'filled');
    });
  });

  describe('Shape Variants', () => {
    it.each(['rounded', 'pill', 'sharp'] as const)('should support %s shape', (shape) => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test" {...{ [shape]: true }}>Item</NavLink>
        </ThemeProvider>
      );

      const el = container.querySelector('a');
      expect(el).toBeInTheDocument();
    });
  });

  describe('Active State', () => {
    it('should set data-active and aria-current="page" when active is true', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/dashboard" active>Dashboard</NavLink>
        </ThemeProvider>
      );

      const el = container.querySelector('a');
      expect(el).toHaveAttribute('data-active', 'true');
      expect(el).toHaveAttribute('aria-current', 'page');
    });

    it('should not set data-active or aria-current when active is false', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/settings" active={false}>Settings</NavLink>
        </ThemeProvider>
      );

      const el = container.querySelector('a');
      expect(el).not.toHaveAttribute('data-active');
      expect(el).not.toHaveAttribute('aria-current');
    });

    it('should not set data-active or aria-current when active is not provided', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/settings">Settings</NavLink>
        </ThemeProvider>
      );

      const el = container.querySelector('a');
      expect(el).not.toHaveAttribute('data-active');
      expect(el).not.toHaveAttribute('aria-current');
    });
  });

  describe('Disabled State', () => {
    it('should render as button (not anchor) when both href and disabled are present', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/locked" disabled>Locked</NavLink>
        </ThemeProvider>
      );

      // Should render as <button>, not <a>, because href is stripped
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).not.toHaveAttribute('href');

      const anchor = container.querySelector('a');
      expect(anchor).not.toBeInTheDocument();
    });

    it('should add aria-disabled, role="link", and tabIndex=-1 when href and disabled are both present', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/locked" disabled>Locked</NavLink>
        </ThemeProvider>
      );

      const el = container.querySelector('button');
      expect(el).toHaveAttribute('aria-disabled', 'true');
      expect(el).toHaveAttribute('role', 'link');
      expect(el).toHaveAttribute('tabindex', '-1');
      expect(el).toHaveAttribute('data-disabled', 'true');
    });

    it('should set data-disabled when disabled prop is true without href', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink disabled>Locked</NavLink>
        </ThemeProvider>
      );

      const el = container.querySelector('button');
      expect(el).toHaveAttribute('data-disabled', 'true');
      // Should NOT have aria-disabled or role="link" when no href
      expect(el).not.toHaveAttribute('aria-disabled');
      expect(el).not.toHaveAttribute('role');
    });

    it('should render as normal anchor when href is present without disabled', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/settings">Settings</NavLink>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/settings');
      expect(anchor).not.toHaveAttribute('aria-disabled');
      expect(anchor).not.toHaveAttribute('role');
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to anchor element', () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink ref={ref} href="/test">Item</NavLink>
        </ThemeProvider>
      );

      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    it('should forward ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink ref={ref}>Item</NavLink>
        </ThemeProvider>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Boolean Props Do Not Leak to DOM', () => {
    it('should not have size prop as HTML attribute', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test" sm>Item</NavLink>
        </ThemeProvider>
      );

      expect(container.querySelector('a')).not.toHaveAttribute('sm');
    });

    it('should not have appearance prop as HTML attribute', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test" danger>Item</NavLink>
        </ThemeProvider>
      );

      expect(container.querySelector('a')).not.toHaveAttribute('danger');
    });

    it('should not have active prop as HTML attribute', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test" active>Item</NavLink>
        </ThemeProvider>
      );

      const el = container.querySelector('a');
      expect(el).not.toHaveAttribute('active');
    });
  });

  describe('Custom className', () => {
    it('should merge custom classes with theme classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test" className="custom-class">Item</NavLink>
        </ThemeProvider>
      );

      const el = container.querySelector('a');
      expect(el).toHaveClass('w-full', 'cursor-pointer', 'custom-class');
    });
  });

  describe('Icon Sizing Base Class', () => {
    it('should include vane-nav-link class for CSS icon sizing', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test">Item</NavLink>
        </ThemeProvider>
      );

      expect(container.querySelector('a')).toHaveClass('vane-nav-link');
    });
  });

  describe('Transparent Idle Background', () => {
    it('should NOT include bg-(--bg-color) class (no idle background)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test">Item</NavLink>
        </ThemeProvider>
      );

      const el = container.querySelector('a');
      expect(el).not.toHaveClass('bg-(--bg-color)');
    });

    it('should include hover:bg-(--bg-hover-color) class', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test">Item</NavLink>
        </ThemeProvider>
      );

      const el = container.querySelector('a');
      expect(el).toHaveClass('hover:bg-(--bg-hover-color)');
    });

    it('should NOT include bg-(--bg-color) even with danger appearance', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test" danger>Danger</NavLink>
        </ThemeProvider>
      );

      const el = container.querySelector('a');
      expect(el).not.toHaveClass('bg-(--bg-color)');
      expect(el).toHaveClass('hover:bg-(--bg-hover-color)');
    });

    it('should NOT include bg-(--bg-color) with filled variant', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test" filled>Filled</NavLink>
        </ThemeProvider>
      );

      const el = container.querySelector('a');
      expect(el).not.toHaveClass('bg-(--bg-color)');
      expect(el).toHaveClass('hover:bg-(--bg-hover-color)');
    });
  });

  describe('Text Truncation', () => {
    it('should apply truncate class to the label span by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test">Dashboard</NavLink>
        </ThemeProvider>
      );

      const label = container.querySelector('span.vane-nav-link-label');
      expect(label).toHaveClass('truncate');
    });

    it('should NOT apply truncate class to the root element', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test">Dashboard</NavLink>
        </ThemeProvider>
      );

      expect(container.querySelector('a')).not.toHaveClass('truncate');
    });

    it('should not leak truncate prop to DOM', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test">Item</NavLink>
        </ThemeProvider>
      );

      expect(container.querySelector('a')).not.toHaveAttribute('truncate');
    });
  });

  describe('SVG Protection Classes', () => {
    it('should include SVG pointer-events-none class', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test">Item</NavLink>
        </ThemeProvider>
      );

      expect(container.querySelector('a')).toHaveClass('[&_svg]:pointer-events-none');
    });

    it('should include SVG shrink-0 class', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <NavLink href="/test">Item</NavLink>
        </ThemeProvider>
      );

      expect(container.querySelector('a')).toHaveClass('[&_svg]:shrink-0');
    });
  });
});
