import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Button,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Button Component Tests', () => {

  describe('Button Component', () => {
    it('should render as button tag when no href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button>Click me</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('w-fit', 'h-fit', 'cursor-pointer');
      expect(button).toHaveClass('text-(length:--fs)'); // md size
      expect(button).toHaveAttribute('data-size', 'md');
      expect(button).toHaveAttribute('data-vane-type', 'ui'); // UI component type
      expect(button).toHaveAttribute('data-variant', 'outline'); // outline variant by default
      expect(button).toHaveAttribute('data-appearance', 'primary'); // primary appearance by default
      expect(button).toHaveClass('shadow-(--shadow-base)', 'hover:shadow-(--shadow-hover)');
      expect(button).toHaveClass('text-(--text-color)'); // primary appearance
      expect(button).toHaveClass('font-sans'); // sans family
      expect(button).toHaveClass('font-semibold'); // semibold weight
      expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center');
      
      // Should not render as anchor
      const anchor = container.querySelector('a');
      expect(anchor).not.toBeInTheDocument();
    });

    it('should render as anchor tag when href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button href="/test-link">Link Button</Button>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveClass('w-fit', 'h-fit', 'cursor-pointer');
      expect(anchor).toHaveClass('text-(length:--fs)'); // md size
      expect(anchor).toHaveAttribute('data-size', 'md');
      expect(anchor).toHaveAttribute('data-vane-type', 'ui'); // UI component type
      expect(anchor).toHaveClass('shadow-(--shadow-base)', 'hover:shadow-(--shadow-hover)');
      expect(anchor).toHaveClass('text-(--text-color)'); // primary appearance
      expect(anchor).toHaveClass('font-sans'); // sans family
      expect(anchor).toHaveClass('font-semibold'); // semibold weight
      expect(anchor).toHaveClass('inline-flex', 'items-center', 'justify-center');
      expect(anchor).toHaveAttribute('href', '/test-link');
      
      // Should not render as button
      const button = container.querySelector('button');
      expect(button).not.toBeInTheDocument();
    });

    it('should support anchor-specific attributes when href is present', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button href="/external" target="_blank" rel="noopener noreferrer">
            External Link
          </Button>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/external');
      expect(anchor).toHaveAttribute('target', '_blank');
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should support button-specific attributes when href is not present', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button type="submit" disabled>
            Submit Button
          </Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toBeDisabled();
    });
  });


  describe('Button Variants', () => {
    it('Button with primary variant should have primary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button primary>Primary Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('text-(--text-color)'); // primary color
      expect(button).toHaveClass('bg-(--bg-color)'); // primary background
      expect(button).toHaveClass('px-(--px)', 'py-(--py)'); // padding
    });

    it('Button with secondary variant should have secondary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button secondary>Secondary Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('text-(--text-color)'); // secondary color
      expect(button).toHaveClass('bg-(--bg-color)'); // secondary background
    });
  });

  describe('Button Border, Ring, and Shadow Behavior', () => {
    it('should preserve borders, rings, and shadows for appearance variants', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button id="btn-default">Default</Button>
          <Button id="btn-primary" primary>Primary</Button>
          <Button id="btn-secondary" secondary>Secondary</Button>
        </ThemeProvider>
      );

      const btnDefault = container.querySelector('#btn-default');
      const btnPrimary = container.querySelector('#btn-primary');
      const btnSecondary = container.querySelector('#btn-secondary');

      // These should have shadows (default button behavior) via CSS variables
      [btnDefault, btnPrimary, btnSecondary].forEach(btn => {
        expect(btn).toHaveAttribute('data-vane-type', 'ui'); // UI component type
      expect(btn).toHaveClass('shadow-(--shadow-base)', 'hover:shadow-(--shadow-hover)');
      });

      // Note: borders would only be visible when the border prop is enabled
      // The default button theme has noBorder as default, so border classes don't show by default
    });

    it('should demonstrate ring functionality works for buttons when ring prop is enabled', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button id="btn-default-ring" ring primary>Default with Ring</Button>
          <Button id="btn-secondary-ring" ring secondary>Secondary with Ring</Button>
        </ThemeProvider>
      );

      const btnDefaultRing = container.querySelector('#btn-default-ring');
      const btnSecondaryRing = container.querySelector('#btn-secondary-ring');

      // Buttons with ring should show ring classes
      expect(btnDefaultRing).toHaveClass('ring-(--ring-color)');
      expect(btnSecondaryRing).toHaveClass('ring-(--ring-color)');
    });
  });

  describe('Custom className override', () => {
    it('should merge custom className with theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button className="custom-class">Custom Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('w-fit', 'h-fit', 'cursor-pointer'); // theme classes
      expect(button).toHaveClass('custom-class'); // custom class
    });
  });

  describe('Border and Ring Theme Tests', () => {
    describe('Border functionality', () => {
      it('should apply border classes when border prop is true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button border>Button with Border</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).toHaveClass('border-[length:var(--bw)]');
      });

      it('should not apply border classes when noBorder prop is true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button noBorder>Button without Border</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).not.toHaveClass('border-[length:var(--bw)]');
        // Should not have any border-related classes
        expect(button!.className).not.toMatch(/\bborder\b(?!-)/);
      });

      it('should not apply border classes by default (no border prop)', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button>Default Button</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).not.toHaveClass('border-[length:var(--bw)]');
      });

      it('should apply border classes for different appearance variants when border is enabled', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button border primary className="border-primary">Primary with Border</Button>
            <Button border secondary className="border-secondary">Secondary with Border</Button>
            <Button border danger className="border-danger">Danger with Border</Button>
          </ThemeProvider>
        );

        const primaryButton = container.querySelector('.border-primary');
        const secondaryButton = container.querySelector('.border-secondary');
        const dangerButton = container.querySelector('.border-danger');

        [primaryButton, secondaryButton, dangerButton].forEach(button => {
          expect(button).toHaveClass('border-[length:var(--bw)]');
        });
      });
    });

    describe('Ring functionality', () => {
      it('should apply ring classes when ring prop is true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button ring>Button with Ring</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).toHaveClass('ring-[length:var(--rw)]', 'ring-inset');
        // RingClassMapper now has empty hover and active defaults
        expect(button).not.toHaveClass('hover:ring', 'hover:ring-inset');
        expect(button).not.toHaveClass('active:ring', 'active:ring-inset');
      });

      it('should not apply ring classes when noRing prop is true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button noRing>Button without Ring</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).not.toHaveClass('ring-[length:var(--rw)]');
        expect(button).not.toHaveClass('ring-inset');
        expect(button).not.toHaveClass('hover:ring');
        expect(button).not.toHaveClass('active:ring');
        // Should not have any ring-related classes
        expect(button!.className).not.toMatch(/\bring\b(?!-)/);
      });

      it('should apply ring classes by default (button has ring: true in defaults)', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button>Default Button</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).toHaveClass('ring-[length:var(--rw)]', 'ring-inset'); // Button has ring: true as default
        // RingClassMapper now has empty hover and active defaults
        expect(button).not.toHaveClass('hover:ring', 'hover:ring-inset');
        expect(button).not.toHaveClass('active:ring', 'active:ring-inset');
      });

      it('should apply ring classes for different appearance variants when ring is enabled', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button ring primary className="ring-primary">Primary with Ring</Button>
            <Button ring secondary className="ring-secondary">Secondary with Ring</Button>
            <Button ring success className="ring-success">Success with Ring</Button>
          </ThemeProvider>
        );

        const primaryButton = container.querySelector('.ring-primary');
        const secondaryButton = container.querySelector('.ring-secondary');
        const successButton = container.querySelector('.ring-success');

        [primaryButton, secondaryButton, successButton].forEach(button => {
          expect(button).toHaveClass('ring-[length:var(--rw)]', 'ring-inset');
          // RingClassMapper now has empty hover and active defaults
          expect(button).not.toHaveClass('hover:ring', 'hover:ring-inset');
          expect(button).not.toHaveClass('active:ring', 'active:ring-inset');
        });
      });
    });

    describe('Combined border and ring functionality', () => {
      it('should apply both border and ring classes when both props are true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button border ring primary>Button with Border and Ring</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        // Should have border classes
        expect(button).toHaveClass('border-[length:var(--bw)]');
        // Should have ring classes
        expect(button).toHaveClass('ring-[length:var(--rw)]', 'ring-inset');
        // RingClassMapper now has empty hover and active defaults
        expect(button).not.toHaveClass('hover:ring', 'hover:ring-inset');
        expect(button).not.toHaveClass('active:ring', 'active:ring-inset');
      });

      it('should not apply any border or ring classes when both noBorder and noRing are true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button noBorder noRing>Button without Border or Ring</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        // Should not have border classes
        expect(button).not.toHaveClass('border-[length:var(--bw)]');
        expect(button!.className).not.toMatch(/\bborder\b(?!-)/);
        // Should not have ring classes
        expect(button).not.toHaveClass('ring-[length:var(--rw)]');
        expect(button!.className).not.toMatch(/\bring\b(?!-)/);
      });

      it('should apply border but not ring when border=true and noRing=true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button border noRing>Button with Border only</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        // Should have border classes
        expect(button).toHaveClass('border-[length:var(--bw)]');
        // Should not have ring classes
        expect(button).not.toHaveClass('ring-[length:var(--rw)]');
        expect(button!.className).not.toMatch(/\bring\b(?!-)/);
      });

      it('should apply ring but not border when ring=true and noBorder=true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button ring noBorder>Button with Ring only</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        // Should have ring classes
        expect(button).toHaveClass('ring-[length:var(--rw)]', 'ring-inset');
        // RingClassMapper now has empty hover and active defaults
        expect(button).not.toHaveClass('hover:ring', 'hover:ring-inset');
        // Should not have border classes
        expect(button).not.toHaveClass('border-[length:var(--bw)]');
        expect(button!.className).not.toMatch(/\bborder\b(?!-)/);
      });
    });
  });

  describe('CSS Variable Classes Based on Size', () => {
    describe('Border Radius Variables', () => {
      it('should apply correct --br-unit for xs size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button xs>XS Button</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).toHaveClass('rounded-(--br)');
        expect(button).toHaveAttribute('data-size', 'xs');
      });

      it('should apply correct --br-unit for sm size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button sm>SM Button</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).toHaveClass('rounded-(--br)');
        expect(button).toHaveAttribute('data-size', 'sm');
      });

      it('should apply correct --br-unit for md size (default)', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button>MD Button</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).toHaveClass('rounded-(--br)');
        expect(button).toHaveAttribute('data-size', 'md');
      });

      it('should apply correct --br-unit for lg size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button lg>LG Button</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).toHaveClass('rounded-(--br)');
        expect(button).toHaveAttribute('data-size', 'lg');
      });

      it('should apply correct --br-unit for xl size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button xl>XL Button</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).toHaveClass('rounded-(--br)');
        expect(button).toHaveAttribute('data-size', 'xl');
      });
    });

    describe('Padding Variables', () => {
      it('should apply correct aspect-ratio and --py-unit for xs size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button xs>XS Button</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).toHaveClass('px-(--px)');
        expect(button).toHaveClass('py-(--py)');
        expect(button).toHaveAttribute('data-size', 'xs');
      });

      it('should apply correct aspect-ratio and --py-unit for lg size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button lg>LG Button</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).toHaveClass('px-(--px)');
        expect(button).toHaveClass('py-(--py)');
        expect(button).toHaveAttribute('data-size', 'lg');
      });
    });

    describe('Gap Variables', () => {
      it('should apply correct --gap-unit for different sizes', () => {
        const {container: xsContainer} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button xs gap>XS Button</Button>
          </ThemeProvider>
        );

        const {container: lgContainer} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button lg gap>LG Button</Button>
          </ThemeProvider>
        );

        const xsButton = xsContainer.querySelector('button');
        const lgButton = lgContainer.querySelector('button');

        expect(xsButton).toHaveClass('gap-(--gap)');
        expect(xsButton).toHaveAttribute('data-size', 'xs');

        expect(lgButton).toHaveClass('gap-(--gap)');
        expect(lgButton).toHaveAttribute('data-size', 'lg');
      });
    });
  });

  describe('Loading State', () => {
    it('should render with data-loading and disabled when loading is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button loading>Save</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('data-loading', 'true');
      expect(button).toBeDisabled();
    });

    it('should contain spinner element when loading', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button loading>Save</Button>
        </ThemeProvider>
      );

      const spinner = container.querySelector('.vane-button-spinner');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('aria-hidden', 'true');
    });

    it('should render children as invisible to preserve button width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button loading>Save</Button>
        </ThemeProvider>
      );

      const invisibleSpan = container.querySelector('span.invisible');
      expect(invisibleSpan).toBeInTheDocument();
      expect(invisibleSpan).toHaveTextContent('Save');
    });

    it('should not leak loading prop to DOM as HTML attribute', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button loading>Save</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).not.toHaveAttribute('loading');
    });

    it('should render normally when loading is false', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button loading={false}>Save</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).not.toHaveAttribute('data-loading');
      expect(button).not.toBeDisabled();

      const spinner = container.querySelector('.vane-button-spinner');
      expect(spinner).not.toBeInTheDocument();
    });

    it('should not leak loading prop when loading is false', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button loading={false}>Save</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).not.toHaveAttribute('loading');
    });

    it('should work with appearance and size props while loading', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button loading danger filled lg>Delete</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveAttribute('data-loading', 'true');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('data-size', 'lg');
      expect(button).toHaveAttribute('data-appearance', 'danger');
      expect(button).toHaveAttribute('data-variant', 'filled');
    });
  });

  describe('Width Props', () => {
    it('should apply wFull class for full width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button wFull>Full Width</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('w-full');
    });

    it('should apply wFit class for fit-content width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button wFit>Fit Width</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('w-fit');
    });

    it('should apply wAuto class for auto width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button wAuto>Auto Width</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('w-auto');
    });

    it('should only apply one width class when multiple are specified (last wins)', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button wFull wFit>Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      // Only one width prop should be active
      const classes = button?.className.split(' ') || [];
      const widthClasses = classes.filter(c => c === 'w-full' || c === 'w-fit' || c === 'w-auto');
      expect(widthClasses.length).toBe(1);
    });
  });
});