import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Mark } from '../ui/mark';

describe('Mark Component', () => {

  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      const { container } = render(<Mark>highlighted</Mark>);
      const el = container.querySelector('mark');

      expect(el).toBeInTheDocument();
      expect(el).toHaveTextContent('highlighted');
    });

    it('should render as mark element by default', () => {
      const { container } = render(<Mark>text</Mark>);
      const el = container.querySelector('mark');

      expect(el).toBeInTheDocument();
      expect(el?.tagName).toBe('MARK');
    });

    it('should accept custom className', () => {
      const { container } = render(<Mark className="custom-class">text</Mark>);
      const el = container.querySelector('mark');

      expect(el).toHaveClass('custom-class');
    });

    it('should allow custom tag override', () => {
      const { container } = render(<Mark tag="span">text</Mark>);
      const spanEl = container.querySelector('span');

      expect(spanEl).toBeInTheDocument();
      expect(spanEl?.tagName).toBe('SPAN');
    });
  });

  describe('Default Theme Application', () => {
    it('should have vane-mark class', () => {
      const { container } = render(<Mark>text</Mark>);
      const el = container.querySelector('mark');

      expect(el).toHaveClass('vane-mark');
    });

    it('should have default theme classes applied', () => {
      const { container } = render(<Mark>text</Mark>);
      const el = container.querySelector('mark');

      expect(el).toHaveClass('inline');
      expect(el).toHaveClass('text-(length:--fs)');
      expect(el).toHaveAttribute('data-size', 'md');
      expect(el).toHaveClass('px-(--px)');
      expect(el).toHaveClass('py-(--py)');
      expect(el).toHaveClass('bg-(--bg-color)');
      expect(el).toHaveClass('text-(--text-color)');
      expect(el).toHaveClass('rounded-(--br)');
    });

    it('should have warning appearance by default', () => {
      const { container } = render(<Mark>text</Mark>);
      const el = container.querySelector('mark');

      expect(el).toHaveAttribute('data-appearance', 'warning');
    });

    it('should have outline variant by default', () => {
      const { container } = render(<Mark>text</Mark>);
      const el = container.querySelector('mark');

      expect(el).toHaveAttribute('data-variant', 'outline');
    });

    it('should not have mono or semibold by default', () => {
      const { container } = render(<Mark>text</Mark>);
      const el = container.querySelector('mark');

      expect(el).not.toHaveClass('font-mono');
      expect(el).not.toHaveClass('font-semibold');
    });
  });

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach(size => {
      it(`should apply ${size} size`, () => {
        const { container } = render(<Mark {...{ [size]: true }}>text</Mark>);
        const el = container.querySelector('mark');

        expect(el).toHaveClass('text-(length:--fs)');
        expect(el).toHaveAttribute('data-size', size);
        expect(el).toHaveClass('px-(--px)');
        expect(el).toHaveClass('py-(--py)');
        expect(el).toHaveClass('rounded-(--br)');
      });
    });
  });

  describe('Appearance Variants', () => {
    const appearances = ['primary', 'brand', 'secondary', 'success', 'danger', 'warning', 'info'] as const;

    appearances.forEach(appearance => {
      it(`should apply ${appearance} appearance`, () => {
        const { container } = render(<Mark {...{ [appearance]: true }}>text</Mark>);
        const el = container.querySelector('mark');

        expect(el).toHaveClass('bg-(--bg-color)');
        expect(el).toHaveClass('text-(--text-color)');
        expect(el).toHaveAttribute('data-appearance', appearance);
      });
    });
  });

  describe('Variant Styles', () => {
    it('should apply outline variant by default', () => {
      const { container } = render(<Mark>text</Mark>);
      const el = container.querySelector('mark');

      expect(el).toHaveClass('bg-(--bg-color)');
      expect(el).toHaveAttribute('data-appearance', 'warning');
      expect(el).toHaveAttribute('data-variant', 'outline');
    });

    it('should apply filled variant when specified', () => {
      const { container } = render(<Mark filled>text</Mark>);
      const el = container.querySelector('mark');

      expect(el).toHaveAttribute('data-variant', 'filled');
      expect(el).toHaveClass('bg-(--bg-color)');
      expect(el).toHaveClass('text-(--text-color)');
    });
  });

  describe('Shape Variants', () => {
    it('should apply rounded shape by default', () => {
      const { container } = render(<Mark>text</Mark>);
      const el = container.querySelector('mark');

      expect(el).toHaveClass('rounded-(--br)');
    });

    it('should apply pill shape', () => {
      const { container } = render(<Mark pill>text</Mark>);
      const el = container.querySelector('mark');

      expect(el).toHaveClass('rounded-full');
    });

    it('should apply sharp corners', () => {
      const { container } = render(<Mark sharp>text</Mark>);
      const el = container.querySelector('mark');

      expect(el).toHaveClass('rounded-none');
    });
  });

  describe('Typography Options', () => {
    it('should allow mono font', () => {
      const { container } = render(<Mark mono>text</Mark>);
      const el = container.querySelector('mark');

      expect(el).toHaveClass('font-mono');
    });

    it('should allow font weight override', () => {
      const { container } = render(<Mark bold>text</Mark>);
      const el = container.querySelector('mark');

      expect(el).toHaveClass('font-bold');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content', () => {
      const { container } = render(<Mark></Mark>);
      const el = container.querySelector('mark');

      expect(el).toBeInTheDocument();
      expect(el).toHaveTextContent('');
    });

    it('should handle multiple props correctly', () => {
      const { container } = render(
        <Mark xs success filled pill bold className="custom">
          text
        </Mark>
      );
      const el = container.querySelector('mark');

      expect(el).toHaveAttribute('data-size', 'xs');
      expect(el).toHaveAttribute('data-appearance', 'success');
      expect(el).toHaveAttribute('data-variant', 'filled');
      expect(el).toHaveClass('rounded-full');
      expect(el).toHaveClass('font-bold');
      expect(el).toHaveClass('custom');
      expect(el).toHaveClass('vane-mark');
    });
  });
});
