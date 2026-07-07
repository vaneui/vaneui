import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Blockquote } from '../ui/typography/blockquote';
import { ThemeProvider, defaultTheme } from '../../index';
import { FONT_SIZE_CLASS } from './utils/classAssertions';

describe('Blockquote Component', () => {

  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      const { container } = render(<Blockquote>A wise quote</Blockquote>);
      const el = container.querySelector('blockquote');

      expect(el).toBeInTheDocument();
      expect(el).toHaveTextContent('A wise quote');
    });

    it('should render as blockquote element by default', () => {
      const { container } = render(<Blockquote>Quote</Blockquote>);
      const el = container.querySelector('blockquote');

      expect(el).toBeInTheDocument();
      expect(el?.tagName).toBe('BLOCKQUOTE');
    });

    it('should accept custom className', () => {
      const { container } = render(<Blockquote className="custom-class">Quote</Blockquote>);
      const el = container.querySelector('blockquote');

      expect(el).toHaveClass('custom-class');
    });

    it('should allow custom tag override', () => {
      const { container } = render(<Blockquote tag="div">Quote</Blockquote>);
      const divEl = container.querySelector('div');

      expect(divEl).toBeInTheDocument();
      expect(divEl?.tagName).toBe('DIV');
    });
  });

  describe('Default Theme Application', () => {
    it('should have vane-blockquote class and logical (border-s) accent styling', () => {
      const { container } = render(<Blockquote>Quote</Blockquote>);
      const el = container.querySelector('blockquote');

      expect(el).toHaveClass('vane-blockquote');
      // Accent is the prop-driven `borderS`: width from --bw-s (3px on
      // .vane-blockquote), color from the appearance system — both logical, so
      // they sit on the reading-direction start (left in LTR, right in RTL).
      expect(el).toHaveClass('border-s-[length:var(--bw-s)]');
      expect(el).toHaveClass('border-(--border-color)');
      expect(el).toHaveClass('ps-(--pl)');
    });

    it('should drop the accent border with noBorder', () => {
      const { container } = render(<Blockquote noBorder>Quote</Blockquote>);
      const el = container.querySelector('blockquote');

      expect(el).not.toHaveClass('border-s-[length:var(--bw-s)]');
      expect(el).not.toHaveClass('border-(--border-color)');
    });

    it('should have default theme classes applied', () => {
      const { container } = render(<Blockquote>Quote</Blockquote>);
      const el = container.querySelector('blockquote');

      expect(el).toHaveClass(FONT_SIZE_CLASS); // inherit appearance cascades font-size
      expect(el).toHaveAttribute('data-size', 'md');
      expect(el).toHaveClass('w-full');
      expect(el).toHaveClass('font-sans');
      expect(el).toHaveClass('text-start');
      expect(el).toHaveClass('text-(--text-color)');
    });

    it('should use inherit appearance by default (no data-appearance)', () => {
      const { container } = render(<Blockquote>Quote</Blockquote>);
      const el = container.querySelector('blockquote');

      // inherit appearance means no data-appearance attribute
      expect(el).not.toHaveAttribute('data-appearance');
    });

  });

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach(size => {
      it(`should apply ${size} size`, () => {
        const { container } = render(<Blockquote {...{ [size]: true }}>Quote</Blockquote>);
        const el = container.querySelector('blockquote');

        // Blockquote defaults to inherit appearance; font-size cascades from parent
        expect(el).toHaveClass(FONT_SIZE_CLASS);
        expect(el).toHaveAttribute('data-size', size);
      });
    });
  });

  describe('Appearance Variants', () => {
    const appearances = ['primary', 'brand', 'secondary', 'tertiary', 'accent', 'success', 'danger', 'warning', 'info'] as const;

    appearances.forEach(appearance => {
      it(`should apply ${appearance} appearance`, () => {
        const { container } = render(<Blockquote {...{ [appearance]: true }}>Quote</Blockquote>);
        const el = container.querySelector('blockquote');

        expect(el).toHaveClass('text-(--text-color)');
        expect(el).toHaveAttribute('data-appearance', appearance);
      });
    });
  });

  describe('Variant Styles', () => {
    it('should apply filled variant when specified', () => {
      const { container } = render(<Blockquote filled primary>Quote</Blockquote>);
      const el = container.querySelector('blockquote');

      expect(el).toHaveClass('text-(--text-color)');
      expect(el).toHaveAttribute('data-appearance', 'primary');
    });
  });

  describe('Typography Options', () => {
    it('should use sans font by default', () => {
      const { container } = render(<Blockquote>Quote</Blockquote>);
      const el = container.querySelector('blockquote');

      expect(el).toHaveClass('font-sans');
    });

    it('should allow mono font override', () => {
      const { container } = render(<Blockquote mono>Quote</Blockquote>);
      const el = container.querySelector('blockquote');

      expect(el).toHaveClass('font-mono');
      expect(el).not.toHaveClass('font-sans');
    });

    it('should apply font weight variants', () => {
      const { container: boldContainer } = render(<Blockquote bold>Quote</Blockquote>);
      const { container: semiboldContainer } = render(<Blockquote semibold>Quote</Blockquote>);

      expect(boldContainer.querySelector('blockquote')).toHaveClass('font-bold');
      expect(semiboldContainer.querySelector('blockquote')).toHaveClass('font-semibold');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content', () => {
      const { container } = render(<Blockquote></Blockquote>);
      const el = container.querySelector('blockquote');

      expect(el).toBeInTheDocument();
      expect(el).toHaveTextContent('');
    });

    it('should handle multiple props correctly', () => {
      const { container } = render(
        <Blockquote lg brand filled bold className="custom">
          Quote
        </Blockquote>
      );
      const el = container.querySelector('blockquote');

      expect(el).toHaveAttribute('data-size', 'lg');
      expect(el).toHaveAttribute('data-appearance', 'brand');
      expect(el).toHaveAttribute('data-variant', 'filled');
      expect(el).toHaveClass('font-bold');
      expect(el).toHaveClass('custom');
      expect(el).toHaveClass('vane-blockquote');
    });
  });

  describe('cite (R11)', () => {
    it('sets the cite attribute and renders a visible <cite> source', () => {
      const { container } = render(
        <Blockquote cite="https://example.com/source">Quoted text</Blockquote>
      );
      const el = container.querySelector('blockquote') as HTMLElement;
      expect(el).toHaveAttribute('cite', 'https://example.com/source');
      const source = el.querySelector('cite.vane-blockquote-cite');
      expect(source).toBeInTheDocument();
      expect(source).toHaveTextContent('https://example.com/source');
    });

    it('renders no <cite> when cite is omitted', () => {
      const { container } = render(<Blockquote>Quoted text</Blockquote>);
      const el = container.querySelector('blockquote') as HTMLElement;
      expect(el).not.toHaveAttribute('cite');
      expect(el.querySelector('cite')).toBeNull();
    });

    it('renders the source as a themed <cite>: tertiary token + block + not-italic (no CSS literals)', () => {
      const { container } = render(<Blockquote cite="Author">Quoted text</Blockquote>);
      const source = container.querySelector('cite.vane-blockquote-cite') as HTMLElement;
      // muted via the tertiary appearance token, not an opacity literal
      expect(source).toHaveAttribute('data-appearance', 'tertiary');
      expect(source.style.opacity).toBe('');
      // display + font-style come from props (theme classes), not a raw CSS rule
      expect(source).toHaveClass('block');
      expect(source).toHaveClass('not-italic');
    });

    it('lets the cite line be customized via theme.blockquoteCite', () => {
      const { container } = render(
        <ThemeProvider
          theme={defaultTheme}
          themeOverride={(t) => {
            t.blockquoteCite.defaults = { ...t.blockquoteCite.defaults, danger: true, tertiary: false };
            return t;
          }}
        >
          <Blockquote cite="Author">Quoted text</Blockquote>
        </ThemeProvider>
      );
      const source = container.querySelector('cite.vane-blockquote-cite') as HTMLElement;
      expect(source).toHaveAttribute('data-appearance', 'danger');
    });
  });
});
