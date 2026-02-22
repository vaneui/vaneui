import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Blockquote } from '../ui/typography/blockquote';

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
    it('should have vane-blockquote class and border-l styling', () => {
      const { container } = render(<Blockquote>Quote</Blockquote>);
      const el = container.querySelector('blockquote');

      expect(el).toHaveClass('vane-blockquote');
      expect(el).toHaveClass('border-l-3');
      expect(el).toHaveClass('border-(--border-color)');
      expect(el).toHaveClass('pl-(--pl)');
    });

    it('should have default theme classes applied', () => {
      const { container } = render(<Blockquote>Quote</Blockquote>);
      const el = container.querySelector('blockquote');

      expect(el).toHaveClass('text-(length:--fs)');
      expect(el).toHaveAttribute('data-size', 'md');
      expect(el).toHaveClass('w-full');
      expect(el).toHaveClass('font-sans');
      expect(el).toHaveClass('text-left');
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

        expect(el).toHaveClass('text-(length:--fs)');
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
});
