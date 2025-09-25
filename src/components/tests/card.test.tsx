import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Card,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Card Component Tests', () => {

  describe('Card Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>Card content</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('px-(--px) [--py-unit:4]', 'py-(--py) [--gap-unit:2]', 'gap-(--gap)', 'flex');
      expect(card).toHaveClass('text-(--color-text-default)'); // default appearance
      expect(card).toHaveClass('bg-(--color-bg-layout-default)', 'rounded-(--layout-br-md)', 'flex-col');
      expect(card).toHaveClass('border-(--color-border-default)');
    });
  });

  describe('Card Variants', () => {
    it('Card with primary variant should have primary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card primary>Primary Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('text-(--color-text-primary)'); // primary text color
      expect(card).toHaveClass('bg-(--color-bg-layout-primary)'); // primary background
    });

    it('Card with secondary variant should have secondary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card secondary>Secondary Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('text-(--color-text-secondary)'); // secondary text color
      expect(card).toHaveClass('bg-(--color-bg-layout-secondary)'); // secondary background
    });

    it('Card with transparent background should have transparent classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card transparent>Transparent Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('bg-transparent'); // transparent background
    });
  });

  describe('Card Sizes', () => {
    it('should render with xs size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card xs>XS Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('px-(--px) [--py-unit:2]', 'py-(--py) [--gap-unit:1]', 'gap-(--gap)'); // xs sizing for padding and gap
      // xs size has no responsive classes
    });

    it('should render with sm size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card sm>Small Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('px-(--px) [--py-unit:3]', 'py-(--py) [--gap-unit:1.5]', 'gap-(--gap)'); // sm sizing for padding and gap
    });

    it('should render with lg size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card lg>Large Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('px-(--px) [--py-unit:5]', 'py-(--py) [--gap-unit:2.5]', 'gap-(--gap)'); // lg sizing
    });

    it('should render with xl size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card xl>Extra Large Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('px-(--px) [--py-unit:6]', 'py-(--py) [--gap-unit:3]', 'gap-(--gap)'); // xl sizing
    });
  });

  describe('Card Shape and Border', () => {
    it('should render with sharp corners when sharp prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card sharp>Sharp Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('rounded-none'); // sharp corners
    });

    it('should render with border when border prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card border>Bordered Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('border');
    });

    it('should render with no border when noBorder prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card noBorder>No Border Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).not.toHaveClass('border'); // noBorder removes border classes
    });
  });

  describe('Card Shadow', () => {
    it('should render with shadow when shadow prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card shadow>Shadow Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('shadow-sm');
      expect(card).not.toHaveClass('hover:shadow-md');
    });

    it('should not have shadow by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>Default Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).not.toHaveClass('shadow-sm'); // no shadow by default
    });
  });

  describe('Card Layout', () => {
    it('should render with row direction when row prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card row>Row Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('flex-row');
      expect(card).not.toHaveClass('flex-col');
    });

    it('should render with wrap when wrap prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card flexWrap>Wrap Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('flex-wrap');
    });

    it('should render with different alignments', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card itemsCenter justifyBetween>Aligned Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('items-center', 'justify-between');
    });
  });

  describe('Card Typography', () => {
    it('should apply text appearance correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card primary>Primary Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('text-(--color-text-primary)');
    });

    it('should support filled and outline variants for text, background, border, and ring', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card primary outline border ring>Outline card</Card>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card primary filled border ring>Filled card</Card>
        </ThemeProvider>
      );

      const outlineCard = outlineContainer.querySelector('div');
      const filledCard = filledContainer.querySelector('div');

      // Text colors
      expect(outlineCard).toHaveClass('text-(--color-text-primary)');
      expect(filledCard).toHaveClass('text-(--color-text-filled-primary)');
      
      // Background colors
      expect(outlineCard).toHaveClass('bg-(--color-bg-layout-primary)');
      expect(filledCard).toHaveClass('bg-(--color-bg-filled-layout-primary)');
      
      // Border colors
      expect(outlineCard).toHaveClass('border-(--color-border-primary)');
      expect(filledCard).toHaveClass('border-(--color-border-filled-primary)');
      
      // Ring colors
      expect(outlineCard).toHaveClass('ring-(--color-border-primary)');
      expect(filledCard).toHaveClass('ring-(--color-border-filled-primary)');
    });
  });

  describe('Card Responsive', () => {
    it('should apply responsive classes correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card mdCol>Responsive Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('max-md:flex-col'); // Card uses max-md responsive pattern
    });
  });

  describe('Custom className override', () => {
    it('should merge custom className with theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card className="custom-card-class">Custom Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('flex', 'flex-col'); // theme classes
      expect(card).toHaveClass('custom-card-class'); // custom class
    });
  });

  describe('Card Border and Ring Theme Tests', () => {
    describe('Border functionality', () => {
      it('should apply border classes when border prop is true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Card border>Card with Border</Card>
          </ThemeProvider>
        );

        const card = container.querySelector('div');
        expect(card).toHaveClass('border');
      });

      it('should not apply border classes when noBorder prop is true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Card noBorder>Card without Border</Card>
          </ThemeProvider>
        );

        const card = container.querySelector('div');
        expect(card).not.toHaveClass('border');
        // Should not have any border-related classes
        expect(card!.className).not.toMatch(/\bborder\b(?!-)/);
      });

      it('should apply border classes by default (card has border: true in defaults)', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Card>Default Card</Card>
          </ThemeProvider>
        );

        const card = container.querySelector('div');
        expect(card).toHaveClass('border'); // Card has border: true as default
      });

      it('should apply border classes for different appearance variants when border is enabled', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Card border primary className="border-primary">Primary Card with Border</Card>
            <Card border secondary className="border-secondary">Secondary Card with Border</Card>
            <Card border accent className="border-accent">Accent Card with Border</Card>
          </ThemeProvider>
        );

        const primaryCard = container.querySelector('.border-primary');
        const secondaryCard = container.querySelector('.border-secondary');
        const accentCard = container.querySelector('.border-accent');

        [primaryCard, secondaryCard, accentCard].forEach(card => {
          expect(card).toHaveClass('border');
        });
      });
    });

    describe('Ring functionality', () => {
      it('should apply ring classes when ring prop is true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Card ring>Card with Ring</Card>
          </ThemeProvider>
        );

        const card = container.querySelector('div');
        expect(card).toHaveClass('ring', 'ring-inset');
        // RingTheme now has empty hover and active defaults
        expect(card).not.toHaveClass('hover:ring', 'hover:ring-inset');
        expect(card).not.toHaveClass('active:ring', 'active:ring-inset');
      });

      it('should not apply ring classes when noRing prop is true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Card noRing>Card without Ring</Card>
          </ThemeProvider>
        );

        const card = container.querySelector('div');
        expect(card).not.toHaveClass('ring');
        expect(card).not.toHaveClass('ring-inset');
        expect(card).not.toHaveClass('hover:ring');
        expect(card).not.toHaveClass('active:ring');
        // Should not have any ring-related classes
        expect(card!.className).not.toMatch(/\bring\b(?!-)/);
      });

      it('should not apply ring classes by default (card does not have ring: true in defaults)', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Card>Default Card</Card>
          </ThemeProvider>
        );

        const card = container.querySelector('div');
        // Card no longer has ring: true as default
        expect(card).not.toHaveClass('ring-(--color-border-default)');
        expect(card).not.toHaveClass('ring', 'ring-inset');
      });

      it('should apply ring classes for different appearance variants when ring is enabled', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Card ring primary className="ring-primary">Primary Card with Ring</Card>
            <Card ring info className="ring-info">Info Card with Ring</Card>
            <Card ring warning className="ring-warning">Warning Card with Ring</Card>
          </ThemeProvider>
        );

        const primaryCard = container.querySelector('.ring-primary');
        const infoCard = container.querySelector('.ring-info');
        const warningCard = container.querySelector('.ring-warning');

        [primaryCard, infoCard, warningCard].forEach(card => {
          expect(card).toHaveClass('ring', 'ring-inset');
          // RingTheme now has empty hover and active defaults
          expect(card).not.toHaveClass('hover:ring', 'hover:ring-inset');
          expect(card).not.toHaveClass('active:ring', 'active:ring-inset');
        });
      });
    });

    describe('Combined border and ring functionality', () => {
      it('should apply both border and ring classes when both props are true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Card border ring primary>Card with Border and Ring</Card>
          </ThemeProvider>
        );

        const card = container.querySelector('div');
        // Should have border classes
        expect(card).toHaveClass('border');
        // Should have appearance-based ring classes
        expect(card).toHaveClass('ring-(--color-border-primary)');
      });

      it('should not apply any border or ring classes when both noBorder and noRing are true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Card noBorder noRing>Card without Border or Ring</Card>
          </ThemeProvider>
        );

        const card = container.querySelector('div');
        // Should not have border classes
        expect(card).not.toHaveClass('border');
        expect(card!.className).not.toMatch(/\bborder\b(?!-)/);
        // Should not have ring classes
        expect(card).not.toHaveClass('ring');
        expect(card!.className).not.toMatch(/\bring\b(?!-)/);
      });

      it('should work with different sizes and padding combinations', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Card border ring lg padding className="size-test">Large Card with Border, Ring, and Padding</Card>
          </ThemeProvider>
        );

        const card = container.querySelector('.size-test');
        // Should have border and ring classes
        expect(card).toHaveClass('border');
        expect(card).toHaveClass('ring-(--color-border-default)');
        // Should have size and padding classes
        expect(card).toHaveClass('px-(--px) [--py-unit:5]', 'py-(--py) [--gap-unit:2.5]'); // lg padding
      });

      it('should work with responsive breakpoints', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Card border ring mdCol className="responsive-test">Responsive Card</Card>
          </ThemeProvider>
        );

        const card = container.querySelector('.responsive-test');
        // Should have border and ring classes
        expect(card).toHaveClass('border');
        expect(card).toHaveClass('ring-(--color-border-default)');
        // Should have responsive classes
        expect(card).toHaveClass('max-md:flex-col');
      });
    });
  });
});