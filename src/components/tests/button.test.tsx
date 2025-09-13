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
      expect(button).toHaveClass('text-base'); // md size
      expect(button).toHaveClass('shadow-sm', 'hover:shadow-md'); // shadow
      expect(button).toHaveClass('text-(--color-text-default)'); // default appearance
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
      expect(anchor).toHaveClass('text-base'); // md size
      expect(anchor).toHaveClass('shadow-sm', 'hover:shadow-md'); // shadow
      expect(anchor).toHaveClass('text-(--color-text-default)'); // default appearance
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
      expect(button).toHaveClass('text-(--color-text-primary)'); // primary color
      expect(button).toHaveClass('bg-(--color-bg-primary)'); // primary background
      expect(button).toHaveClass('px-4', 'py-2'); // padding
    });

    it('Button with secondary variant should have secondary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button secondary>Secondary Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('text-(--color-text-secondary)'); // secondary color
      expect(button).toHaveClass('bg-(--color-bg-secondary)'); // secondary background
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

      // These should have shadows (default button behavior)
      [btnDefault, btnPrimary, btnSecondary].forEach(btn => {
        expect(btn).toHaveClass('shadow-sm', 'hover:shadow-md');
      });

      // Note: borders and rings would only be visible when the button is focused or has those states active
      // The default button theme has noBorder and noRing as defaults, so they don't show border/ring classes by default
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
      expect(btnDefaultRing).toHaveClass('ring-(--color-border-primary)');
      expect(btnSecondaryRing).toHaveClass('ring-(--color-border-secondary)');
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
        expect(button).toHaveClass('border');
      });

      it('should not apply border classes when noBorder prop is true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Button noBorder>Button without Border</Button>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).not.toHaveClass('border');
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
        expect(button).not.toHaveClass('border');
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
          expect(button).toHaveClass('border');
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
        expect(button).toHaveClass('ring', 'ring-inset');
        // RingTheme now has empty hover and active defaults
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
        expect(button).not.toHaveClass('ring');
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
        expect(button).toHaveClass('ring', 'ring-inset'); // Button has ring: true as default
        // RingTheme now has empty hover and active defaults
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
          expect(button).toHaveClass('ring', 'ring-inset');
          // RingTheme now has empty hover and active defaults
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
        expect(button).toHaveClass('border');
        // Should have ring classes
        expect(button).toHaveClass('ring', 'ring-inset');
        // RingTheme now has empty hover and active defaults
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
        expect(button).not.toHaveClass('border');
        expect(button!.className).not.toMatch(/\bborder\b(?!-)/);
        // Should not have ring classes
        expect(button).not.toHaveClass('ring');
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
        expect(button).toHaveClass('border');
        // Should not have ring classes
        expect(button).not.toHaveClass('ring');
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
        expect(button).toHaveClass('ring', 'ring-inset');
        // RingTheme now has empty hover and active defaults
        expect(button).not.toHaveClass('hover:ring', 'hover:ring-inset');
        // Should not have border classes
        expect(button).not.toHaveClass('border');
        expect(button!.className).not.toMatch(/\bborder\b(?!-)/);
      });
    });
  });
});