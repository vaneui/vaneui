import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Card Component Tests', () => {

  describe('Card href and Tag Behavior', () => {
    it('should render as div by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>Card content</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div.vane-card');
      expect(card).toBeInTheDocument();
      expect(card?.tagName.toLowerCase()).toBe('div');
    });

    it('should render as anchor when href is provided', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card href="/test-page">Link Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('a.vane-card');
      expect(card).toBeInTheDocument();
      expect(card?.tagName.toLowerCase()).toBe('a');
      expect(card).toHaveAttribute('href', '/test-page');
    });

    it('should render as anchor with correct href for hash links', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card href="#section">Section Link</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('a.vane-card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('href', '#section');
    });

    it('should render as anchor with correct href for external URLs', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card href="https://example.com">External Link</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('a.vane-card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('href', 'https://example.com');
    });

    it('should maintain theme classes when rendered as anchor', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card href="/page" primary filled>Styled Link Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('a.vane-card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('px-(--px)', 'py-(--py)', 'flex', 'flex-col');
      expect(card).toHaveClass('text-(--text-color)', 'bg-(--bg-color)');
      expect(card).toHaveAttribute('data-appearance', 'primary');
      expect(card).toHaveAttribute('data-variant', 'filled');
    });

    it('should allow manual tag override even with href', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card tag="article" href="/page">Article Card</Card>
        </ThemeProvider>
      );

      // When tag is explicitly set, it should use that tag
      // The tagFunction only applies when tag is not explicitly provided
      const card = container.querySelector('article.vane-card');
      expect(card).toBeInTheDocument();
      expect(card?.tagName.toLowerCase()).toBe('article');
    });

    it('should support anchor attributes when href is provided', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card href="https://example.com" target="_blank" rel="noopener noreferrer">
            External Link Card
          </Card>
        </ThemeProvider>
      );

      const card = container.querySelector('a.vane-card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('href', 'https://example.com');
      expect(card).toHaveAttribute('target', '_blank');
      expect(card).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should work with responsive props when rendered as anchor', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card href="/page" mobileCol lg>Responsive Link Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('a.vane-card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('max-mobile:flex-col');
      expect(card).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('Card Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>Card content</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('px-(--px)', 'py-(--py)', 'gap-(--gap)', 'flex');
      expect(card).toHaveClass('text-(--text-color)'); // primary appearance
      expect(card).toHaveClass('bg-(--bg-color)', 'rounded-(--br)', 'flex-col');
      expect(card).toHaveClass('border-(--border-color)');
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
      expect(card).toHaveClass('text-(--text-color)'); // primary text color
      expect(card).toHaveClass('bg-(--bg-color)'); // primary background
    });

    it('Card with secondary variant should have secondary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card secondary>Secondary Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('text-(--text-color)'); // secondary text color
      expect(card).toHaveClass('bg-(--bg-color)'); // secondary background
    });

    it('Card with background should have classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>Transparent Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('bg-(--bg-color)'); // background
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
      expect(card).toHaveClass('px-(--px)', 'py-(--py)', 'gap-(--gap)'); // xs sizing for padding and gap
      expect(card).toHaveAttribute('data-size', 'xs');
    });

    it('should render with sm size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card sm>Small Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('px-(--px)', 'py-(--py)', 'gap-(--gap)'); // sm sizing for padding and gap
      expect(card).toHaveAttribute('data-size', 'sm');
    });

    it('should render with lg size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card lg>Large Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('px-(--px)', 'py-(--py)', 'gap-(--gap)'); // lg sizing
      expect(card).toHaveAttribute('data-size', 'lg');
    });

    it('should render with xl size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card xl>Extra Large Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('px-(--px)', 'py-(--py)', 'gap-(--gap)'); // xl sizing
      expect(card).toHaveAttribute('data-size', 'xl');
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
      expect(card).toHaveClass('border-[length:var(--bw)]');
    });

    it('should render with no border when noBorder prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card noBorder>No Border Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).not.toHaveClass('border-[length:var(--bw)]'); // noBorder removes border classes
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
      expect(card).toHaveAttribute('data-vane-type', 'layout'); // Layout component type
      expect(card).toHaveClass('shadow-(--shadow-base)');
    });

    it('should not have shadow by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>Default Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).not.toHaveClass('shadow-layout'); // no shadow by default
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
      expect(card).toHaveClass('text-(--text-color)');
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
      expect(outlineCard).toHaveClass('text-(--text-color)');
      expect(filledCard).toHaveClass('text-(--text-color)');
      
      // Background colors
      expect(outlineCard).toHaveClass('bg-(--bg-color)');
      expect(filledCard).toHaveClass('bg-(--bg-color)');
      
      // Border colors
      expect(outlineCard).toHaveClass('border-(--border-color)');
      expect(filledCard).toHaveClass('border-(--border-color)');
      
      // Ring colors
      expect(outlineCard).toHaveClass('ring-(--ring-color)');
      expect(filledCard).toHaveClass('ring-(--ring-color)');
    });
  });

  describe('Card Responsive', () => {
    it('should apply responsive classes correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card mobileCol>Responsive Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('max-mobile:flex-col'); // Card uses max-tablet responsive pattern
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
        expect(card).toHaveClass('border-[length:var(--bw)]');
      });

      it('should not apply border classes when noBorder prop is true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Card noBorder>Card without Border</Card>
          </ThemeProvider>
        );

        const card = container.querySelector('div');
        expect(card).not.toHaveClass('border-[length:var(--bw)]');
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
        expect(card).toHaveClass('border-[length:var(--bw)]'); // Card has border: true as default
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
          expect(card).toHaveClass('border-[length:var(--bw)]');
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
        expect(card).toHaveClass('ring-[length:var(--rw)]', 'ring-inset');
        // RingClassMapper now has empty hover and active defaults
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
        expect(card).not.toHaveClass('ring-[length:var(--rw)]');
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
        expect(card).not.toHaveClass('ring-(--ring-color)');
        expect(card).not.toHaveClass('ring-[length:var(--rw)]', 'ring-inset');
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
          expect(card).toHaveClass('ring-[length:var(--rw)]', 'ring-inset');
          // RingClassMapper now has empty hover and active defaults
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
        expect(card).toHaveClass('border-[length:var(--bw)]');
        // Should have appearance-based ring classes
        expect(card).toHaveClass('ring-(--ring-color)');
      });

      it('should not apply any border or ring classes when both noBorder and noRing are true', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Card noBorder noRing>Card without Border or Ring</Card>
          </ThemeProvider>
        );

        const card = container.querySelector('div');
        // Should not have border classes
        expect(card).not.toHaveClass('border-[length:var(--bw)]');
        expect(card!.className).not.toMatch(/\bborder\b(?!-)/);
        // Should not have ring classes
        expect(card).not.toHaveClass('ring-[length:var(--rw)]');
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
        expect(card).toHaveClass('border-[length:var(--bw)]');
        expect(card).toHaveClass('ring-(--ring-color)');
        // Should have size and padding classes
        expect(card).toHaveClass('px-(--px)', 'py-(--py)'); // lg padding
        expect(card).toHaveAttribute('data-size', 'lg');
      });

      it('should work with responsive breakpoints', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Card border ring mobileCol className="responsive-test">Responsive Card</Card>
          </ThemeProvider>
        );

        const card = container.querySelector('.responsive-test');
        // Should have border and ring classes
        expect(card).toHaveClass('border-[length:var(--bw)]');
        expect(card).toHaveClass('ring-(--ring-color)');
        // Should have responsive classes
        expect(card).toHaveClass('max-mobile:flex-col');
      });
    });
  });

  describe('Cursor Props', () => {
    it('should apply cursorPointer class', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card cursorPointer>Clickable card</Card>
        </ThemeProvider>
      );
      const card = container.querySelector('div');
      expect(card).toHaveClass('cursor-pointer');
    });
  });

  describe('Width Props', () => {
    it('should apply wFull class for full width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card wFull>Full Width Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('w-full');
    });

    it('should apply wFit class for fit-content width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card wFit>Fit Width Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('w-fit');
    });

    it('should apply wAuto class for auto width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card wAuto>Auto Width Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('w-auto');
    });

    it('should work with wFull and other layout props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card wFull shadow border>Full Width Card with Shadow</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('w-full');
      expect(card).toHaveClass('shadow-(--shadow-base)');
      expect(card).toHaveClass('border-[length:var(--bw)]');
    });
  });

  describe('Height Props', () => {
    it('should apply hFull class for full height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card hFull>Content</Card>
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('h-full');
    });

    it('should apply hFit class for fit-content height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card hFit>Content</Card>
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('h-fit');
    });

    it('should apply hAuto class for auto height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card hAuto>Content</Card>
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('h-auto');
    });
  });

  describe('CardHeader Sub-component', () => {
    it('should render with default classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardHeader>Header Content</CardHeader>
        </ThemeProvider>
      );

      const header = container.querySelector('.vane-card-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('flex', 'flex-row', 'items-center', 'justify-between');
      expect(header).toHaveClass('gap-(--gap)');
      expect(header).toHaveClass('px-(--px)', 'py-(--py)');
    });

    it('should render children', () => {
      const { getByText } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardHeader>Title text</CardHeader>
        </ThemeProvider>
      );
      expect(getByText('Title text')).toBeInTheDocument();
    });

    it('should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardHeader>Header</CardHeader>
        </ThemeProvider>
      );
      const header = container.querySelector('.vane-card-header');
      expect(header).toHaveAttribute('data-vane-type', 'layout');
    });

    it('should forward ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ThemeProvider theme={defaultTheme}>
          <CardHeader ref={ref}>Header</CardHeader>
        </ThemeProvider>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('vane-card-header');
    });

    it('should merge custom className', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardHeader className="custom-header">Header</CardHeader>
        </ThemeProvider>
      );
      const header = container.querySelector('.vane-card-header');
      expect(header).toHaveClass('flex', 'flex-row');
      expect(header).toHaveClass('custom-header');
    });

    it('should not leak boolean props to DOM', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardHeader flex row itemsCenter justifyBetween gap padding>
            Header
          </CardHeader>
        </ThemeProvider>
      );
      const header = container.querySelector('.vane-card-header');
      expect(header).not.toHaveAttribute('flex');
      expect(header).not.toHaveAttribute('row');
      expect(header).not.toHaveAttribute('itemsCenter');
      expect(header).not.toHaveAttribute('justifyBetween');
      expect(header).not.toHaveAttribute('gap');
      expect(header).not.toHaveAttribute('padding');
    });
  });

  describe('CardBody Sub-component', () => {
    it('should render with default classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardBody>Body Content</CardBody>
        </ThemeProvider>
      );

      const body = container.querySelector('.vane-card-body');
      expect(body).toBeInTheDocument();
      expect(body).toHaveClass('flex', 'flex-col');
      expect(body).toHaveClass('gap-(--gap)');
      expect(body).toHaveClass('overflow-auto');
      expect(body).toHaveClass('px-(--px)', 'py-(--py)');
    });

    it('should render children', () => {
      const { getByText } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardBody>Scrollable content</CardBody>
        </ThemeProvider>
      );
      expect(getByText('Scrollable content')).toBeInTheDocument();
    });

    it('should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardBody>Body</CardBody>
        </ThemeProvider>
      );
      const body = container.querySelector('.vane-card-body');
      expect(body).toHaveAttribute('data-vane-type', 'layout');
    });

    it('should forward ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ThemeProvider theme={defaultTheme}>
          <CardBody ref={ref}>Body</CardBody>
        </ThemeProvider>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('vane-card-body');
    });

    it('should merge custom className', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardBody className="custom-body">Body</CardBody>
        </ThemeProvider>
      );
      const body = container.querySelector('.vane-card-body');
      expect(body).toHaveClass('flex', 'flex-col');
      expect(body).toHaveClass('custom-body');
    });

    it('should not leak boolean props to DOM', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardBody flex column gap overflowAuto padding>
            Body
          </CardBody>
        </ThemeProvider>
      );
      const body = container.querySelector('.vane-card-body');
      expect(body).not.toHaveAttribute('flex');
      expect(body).not.toHaveAttribute('column');
      expect(body).not.toHaveAttribute('gap');
      expect(body).not.toHaveAttribute('overflowAuto');
      expect(body).not.toHaveAttribute('padding');
    });

    it('should allow overriding direction to row', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardBody row>Body</CardBody>
        </ThemeProvider>
      );
      const body = container.querySelector('.vane-card-body');
      expect(body).toHaveClass('flex-row');
      expect(body).not.toHaveClass('flex-col');
    });

    it('should allow disabling overflow', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardBody overflowHidden>Body</CardBody>
        </ThemeProvider>
      );
      const body = container.querySelector('.vane-card-body');
      expect(body).toHaveClass('overflow-hidden');
      expect(body).not.toHaveClass('overflow-auto');
    });
  });

  describe('CardFooter Sub-component', () => {
    it('should render with default classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardFooter>Footer Content</CardFooter>
        </ThemeProvider>
      );

      const footer = container.querySelector('.vane-card-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('flex', 'flex-row', 'items-center', 'justify-end');
      expect(footer).toHaveClass('gap-(--gap)');
      expect(footer).toHaveClass('px-(--px)', 'py-(--py)');
    });

    it('should render children', () => {
      const { getByText } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardFooter>Action buttons</CardFooter>
        </ThemeProvider>
      );
      expect(getByText('Action buttons')).toBeInTheDocument();
    });

    it('should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardFooter>Footer</CardFooter>
        </ThemeProvider>
      );
      const footer = container.querySelector('.vane-card-footer');
      expect(footer).toHaveAttribute('data-vane-type', 'layout');
    });

    it('should forward ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ThemeProvider theme={defaultTheme}>
          <CardFooter ref={ref}>Footer</CardFooter>
        </ThemeProvider>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('vane-card-footer');
    });

    it('should merge custom className', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardFooter className="custom-footer">Footer</CardFooter>
        </ThemeProvider>
      );
      const footer = container.querySelector('.vane-card-footer');
      expect(footer).toHaveClass('flex', 'flex-row');
      expect(footer).toHaveClass('custom-footer');
    });

    it('should not leak boolean props to DOM', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <CardFooter flex row itemsCenter justifyEnd gap padding>
            Footer
          </CardFooter>
        </ThemeProvider>
      );
      const footer = container.querySelector('.vane-card-footer');
      expect(footer).not.toHaveAttribute('flex');
      expect(footer).not.toHaveAttribute('row');
      expect(footer).not.toHaveAttribute('itemsCenter');
      expect(footer).not.toHaveAttribute('justifyEnd');
      expect(footer).not.toHaveAttribute('gap');
      expect(footer).not.toHaveAttribute('padding');
    });
  });

  describe('Compound Mode', () => {
    it('should remove Card padding when sub-components are used', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>
            <CardHeader>Header</CardHeader>
            <CardBody>Body</CardBody>
            <CardFooter>Footer</CardFooter>
          </Card>
        </ThemeProvider>
      );

      const card = container.querySelector('.vane-card');
      expect(card).toBeInTheDocument();
      // In compound mode, Card should NOT have padding classes
      expect(card).not.toHaveClass('px-(--px)');
      expect(card).not.toHaveClass('py-(--py)');
    });

    it('should keep Card padding in simple mode (backwards-compatible)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>Simple content</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('.vane-card');
      expect(card).toBeInTheDocument();
      // In simple mode, Card should have padding classes
      expect(card).toHaveClass('px-(--px)', 'py-(--py)');
    });

    it('should detect compound mode with only CardHeader', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>
            <CardHeader>Header</CardHeader>
            <div>Other content</div>
          </Card>
        </ThemeProvider>
      );

      const card = container.querySelector('.vane-card');
      expect(card).not.toHaveClass('px-(--px)');
      expect(card).not.toHaveClass('py-(--py)');
    });

    it('should detect compound mode with only CardBody', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>
            <CardBody>Body content</CardBody>
          </Card>
        </ThemeProvider>
      );

      const card = container.querySelector('.vane-card');
      expect(card).not.toHaveClass('px-(--px)');
      expect(card).not.toHaveClass('py-(--py)');
    });

    it('should detect compound mode with Header + Body (no footer)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>
            <CardHeader>Header</CardHeader>
            <CardBody>Body</CardBody>
          </Card>
        </ThemeProvider>
      );

      const card = container.querySelector('.vane-card');
      expect(card).not.toHaveClass('px-(--px)');
    });

    it('should render exactly one of each sub-component', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>
            <CardHeader>Header</CardHeader>
            <CardBody>Body</CardBody>
            <CardFooter>Footer</CardFooter>
          </Card>
        </ThemeProvider>
      );

      expect(container.querySelectorAll('.vane-card-header')).toHaveLength(1);
      expect(container.querySelectorAll('.vane-card-body')).toHaveLength(1);
      expect(container.querySelectorAll('.vane-card-footer')).toHaveLength(1);
    });

    it('should keep Card theme classes (border, rounded) in compound mode', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>
            <CardHeader>Header</CardHeader>
            <CardBody>Body</CardBody>
          </Card>
        </ThemeProvider>
      );

      const card = container.querySelector('.vane-card');
      // Card should still have its visual classes
      expect(card).toHaveClass('flex', 'flex-col');
      expect(card).toHaveClass('border-[length:var(--bw)]');
      expect(card).toHaveClass('rounded-(--br)');
    });

    it('sub-components should have padding in compound mode', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>
            <CardHeader>Header</CardHeader>
            <CardBody>Body</CardBody>
            <CardFooter>Footer</CardFooter>
          </Card>
        </ThemeProvider>
      );

      const header = container.querySelector('.vane-card-header');
      const body = container.querySelector('.vane-card-body');
      const footer = container.querySelector('.vane-card-footer');

      expect(header).toHaveClass('px-(--px)', 'py-(--py)');
      expect(body).toHaveClass('px-(--px)', 'py-(--py)');
      expect(footer).toHaveClass('px-(--px)', 'py-(--py)');
    });

    it('should preserve Card props like appearance in compound mode', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card danger filled>
            <CardHeader>Header</CardHeader>
            <CardBody>Body</CardBody>
          </Card>
        </ThemeProvider>
      );

      const card = container.querySelector('.vane-card');
      expect(card).toHaveAttribute('data-appearance', 'danger');
      expect(card).toHaveAttribute('data-variant', 'filled');
    });

    it('should preserve Card href in compound mode', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Card href="/details">
            <CardHeader>Header</CardHeader>
            <CardBody>Body</CardBody>
          </Card>
        </ThemeProvider>
      );

      const card = container.querySelector('a.vane-card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('href', '/details');
    });
  });
});