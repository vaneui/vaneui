import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { createRef } from 'react';

import {
  Icon,
  ThemeProvider,
  defaultTheme
} from '../../index';
import { FONT_SIZE_CLASS } from './utils/classAssertions';

const TestSvg = () => (
  <svg data-testid="test-svg" viewBox="0 0 24 24">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

describe('Icon Component Tests', () => {

  describe('Default Rendering', () => {
    it('should render as a span with default theme classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon><TestSvg /></Icon>
        </ThemeProvider>
      );

      const icon = container.querySelector('span');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('vane-icon');
      expect(icon).toHaveClass('inline-flex');
      expect(icon).toHaveClass('items-center');
      expect(icon).toHaveClass('justify-center');
      expect(icon).toHaveAttribute('data-size', 'md');
      expect(icon).toHaveAttribute('data-vane-type', 'ui');
    });

    it('should have no appearance by default (currentColor inheritance)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon><TestSvg /></Icon>
        </ThemeProvider>
      );

      const icon = container.querySelector('span');
      expect(icon).not.toHaveAttribute('data-appearance');
      expect(icon).not.toHaveClass('text-(--text-color)');
    });

    it('should default to outline variant', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon><TestSvg /></Icon>
        </ThemeProvider>
      );

      const icon = container.querySelector('span');
      // Default Icon inherits via :root — no explicit data-variant
      expect(icon).not.toHaveAttribute('data-variant');
      expect(icon).not.toHaveAttribute('data-appearance');
    });
  });

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach(size => {
      it(`should render with ${size} size`, () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Icon {...{ [size]: true }}><TestSvg /></Icon>
          </ThemeProvider>
        );

        const icon = container.querySelector('span');
        expect(icon).toHaveAttribute('data-size', size);
        expect(icon).toHaveClass(FONT_SIZE_CLASS);
      });
    });
  });

  describe('Appearance Variants', () => {
    const appearances = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'brand', 'accent'] as const;

    appearances.forEach(appearance => {
      it(`should render with ${appearance} appearance`, () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Icon {...{ [appearance]: true }}><TestSvg /></Icon>
          </ThemeProvider>
        );

        const icon = container.querySelector('span');
        expect(icon).toHaveAttribute('data-appearance', appearance);
        expect(icon).toHaveClass('text-(--text-color)');
      });
    });
  });

  describe('Variant Modifier', () => {
    it('should apply filled variant when filled prop is set', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon filled primary><TestSvg /></Icon>
        </ThemeProvider>
      );

      const icon = container.querySelector('span');
      expect(icon).toHaveAttribute('data-variant', 'filled');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with theme classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon className="custom-icon-class"><TestSvg /></Icon>
        </ThemeProvider>
      );

      const icon = container.querySelector('span');
      expect(icon).toHaveClass('vane-icon');
      expect(icon).toHaveClass('custom-icon-class');
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to the span element', () => {
      const ref = createRef<HTMLSpanElement>();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Icon ref={ref}><TestSvg /></Icon>
        </ThemeProvider>
      );

      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('Boolean Props Leak Prevention', () => {
    it('should not leak boolean props to the DOM', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon lg danger><TestSvg /></Icon>
        </ThemeProvider>
      );

      const icon = container.querySelector('span');
      expect(icon).not.toHaveAttribute('lg');
      expect(icon).not.toHaveAttribute('danger');
    });
  });

  describe('Responsive Hide', () => {
    it('should apply mobileHide class', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon mobileHide><TestSvg /></Icon>
        </ThemeProvider>
      );

      const icon = container.querySelector('span');
      expect(icon).toHaveClass('max-mobile:hidden');
    });
  });

  describe('Container Mode — defaults round-trip', () => {
    it('renders identical DOM for <Icon> and <Icon noPadding noBorder noRing>', () => {
      const { container: bare } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon><TestSvg /></Icon>
        </ThemeProvider>
      );
      const { container: explicit } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon noPadding noBorder noRing><TestSvg /></Icon>
        </ThemeProvider>
      );

      const bareSpan = bare.querySelector('span') as HTMLElement;
      const explicitSpan = explicit.querySelector('span') as HTMLElement;

      expect(explicitSpan.className).toBe(bareSpan.className);
      expect(explicitSpan.getAttributeNames().sort()).toEqual(bareSpan.getAttributeNames().sort());
    });

    it('does not paint a background when filled is set without an appearance', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon filled><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span');
      expect(icon).not.toHaveAttribute('data-appearance');
    });
  });

  describe('Container Mode — filled pill', () => {
    it('emits data-appearance, data-variant=filled, and bg/radius classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon padding pill primary filled><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span') as HTMLElement;

      expect(icon).toHaveAttribute('data-appearance', 'primary');
      expect(icon).toHaveAttribute('data-variant', 'filled');
      expect(icon).toHaveClass('bg-(--bg-color)');
      expect(icon).toHaveClass('rounded-full');
      expect(icon).toHaveClass('px-(--px)');
      expect(icon).toHaveClass('py-(--py)');
    });
  });

  describe('Container Mode — bordered rounded (no fill)', () => {
    it('emits data-appearance, border/radius classes, but no bg fill', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon padding rounded primary border><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span') as HTMLElement;

      expect(icon).toHaveAttribute('data-appearance', 'primary');
      // outline is the default variant — paired with `border`, this paints
      // the border color but not a fill.
      expect(icon).toHaveAttribute('data-variant', 'outline');
      expect(icon).toHaveClass('border-(--border-color)');
      expect(icon).toHaveClass('rounded-(--br)');
    });
  });

  describe('Container Mode — ring', () => {
    it('emits ring classes when ring prop is set with an appearance', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon padding pill primary ring><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span') as HTMLElement;

      expect(icon).toHaveAttribute('data-appearance', 'primary');
      expect(icon).toHaveClass('ring-(--ring-color)');
    });
  });

  describe('Container Mode — new boolean props do not leak to DOM', () => {
    it('strips padding/pill/sharp/rounded/border/ring/noPadding/noBorder/noRing', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon padding pill primary filled border ring><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span') as HTMLElement;

      const leakedAttrs = ['padding', 'noPadding', 'pill', 'rounded', 'sharp',
                           'border', 'noBorder', 'ring', 'noRing', 'filled'];
      for (const attr of leakedAttrs) {
        expect(icon).not.toHaveAttribute(attr);
      }
    });
  });

  describe('Shrink', () => {
    it('emits shrink-0 class by default (noShrink default)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('shrink-0');
    });

    it('still emits shrink-0 when noShrink is set explicitly', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon noShrink><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('shrink-0');
    });
  });

  describe('Shadow', () => {
    it('does not emit a shadow class by default (noShadow)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span') as HTMLElement;
      expect(icon.className).not.toMatch(/shadow-\(/);
    });

    it('emits a shadow class when shadow is set', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon shadow><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span') as HTMLElement;
      expect(icon.className).toMatch(/shadow-\(/);
    });
  });

  describe('Height', () => {
    it('emits h-full when hFull is set', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon hFull><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('h-full');
    });

    it('emits h-fit when hFit is set', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon hFit><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('h-fit');
    });
  });

  describe('Position', () => {
    it('emits absolute class when absolute is set', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon absolute><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('absolute');
    });

    it('emits relative class when relative is set', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon relative><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('relative');
    });
  });

  describe('Transition', () => {
    it('emits transition-none by default (noTransition default)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('transition-none');
    });

    it('emits transition-all when transition is set', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon transition><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('transition-all');
    });
  });

  describe('Transparent', () => {
    it('suppresses the bg-(--bg-color) class when transparent is set with an appearance', () => {
      // The transparent prop is consumed by SimpleConsumerClassMapper in the
      // background category — when set, it causes the bg consumer class to
      // be omitted (rather than emitting an explicit bg-transparent class).
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon primary filled transparent><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span') as HTMLElement;
      expect(icon.className).not.toMatch(/bg-\(--bg-color\)/);
    });

    it('emits bg-(--bg-color) when transparent is NOT set (control)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon primary filled><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span') as HTMLElement;
      expect(icon.className).toMatch(/bg-\(--bg-color\)/);
    });
  });

  describe('New props do not leak to DOM', () => {
    it('strips noShrink/shadow/noShadow/hFull/hFit/absolute/relative/transition/noTransition/transparent', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon noShrink shadow hFull absolute transition transparent><TestSvg /></Icon>
        </ThemeProvider>
      );
      const icon = container.querySelector('span') as HTMLElement;
      const leakedAttrs = ['noShrink', 'shadow', 'noShadow',
                           'hFull', 'hFit', 'hAuto', 'hScreen',
                           'absolute', 'relative', 'fixed', 'sticky', 'static',
                           'transition', 'noTransition', 'transparent'];
      for (const attr of leakedAttrs) {
        expect(icon).not.toHaveAttribute(attr);
      }
    });
  });
});
