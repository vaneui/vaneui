import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Kbd } from '../ui/kbd';

describe('Kbd Component', () => {

  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      const { container } = render(<Kbd>Ctrl</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toBeInTheDocument();
      expect(el).toHaveTextContent('Ctrl');
    });

    it('should render as kbd element by default', () => {
      const { container } = render(<Kbd>Enter</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toBeInTheDocument();
      expect(el?.tagName).toBe('KBD');
    });

    it('should accept custom className', () => {
      const { container } = render(<Kbd className="custom-class">Shift</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveClass('custom-class');
    });

    it('should allow custom tag override', () => {
      const { container } = render(<Kbd tag="span">Alt</Kbd>);
      const spanEl = container.querySelector('span');

      expect(spanEl).toBeInTheDocument();
      expect(spanEl?.tagName).toBe('SPAN');
    });
  });

  describe('Default Theme Application', () => {
    it('should have vane-kbd class', () => {
      const { container } = render(<Kbd>Ctrl</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveClass('vane-kbd');
    });

    it('should have default theme classes applied', () => {
      const { container } = render(<Kbd>Ctrl</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveClass('inline');
      expect(el).toHaveClass('text-(length:--fs)');
      expect(el).toHaveAttribute('data-size', 'md');
      expect(el).toHaveClass('px-(--px)');
      expect(el).toHaveClass('py-(--py)');
      expect(el).toHaveClass('bg-(--bg-color)');
      expect(el).toHaveClass('text-(--text-color)');
      expect(el).toHaveClass('rounded-(--br)');
      expect(el).toHaveClass('font-mono');
      expect(el).toHaveClass('font-semibold');
    });

    it('should have border by default (not ring)', () => {
      const { container } = render(<Kbd>Ctrl</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveClass('border-(--border-color)');
      expect(el).toHaveClass('border-[length:var(--bw)]');
    });

    it('should have primary appearance by default', () => {
      const { container } = render(<Kbd>Ctrl</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveAttribute('data-appearance', 'primary');
    });

    it('should have outline variant by default', () => {
      const { container } = render(<Kbd>Ctrl</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveAttribute('data-variant', 'outline');
    });
  });

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach(size => {
      it(`should apply ${size} size`, () => {
        const { container } = render(<Kbd {...{ [size]: true }}>Key</Kbd>);
        const el = container.querySelector('kbd');

        expect(el).toHaveClass('text-(length:--fs)');
        expect(el).toHaveAttribute('data-size', size);
        expect(el).toHaveClass('px-(--px)');
        expect(el).toHaveClass('py-(--py)');
        expect(el).toHaveClass('rounded-(--br)');
      });
    });
  });

  describe('Appearance Variants', () => {
    it('should apply primary appearance', () => {
      const { container } = render(<Kbd primary>Key</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveClass('bg-(--bg-color)');
      expect(el).toHaveClass('text-(--text-color)');
      expect(el).toHaveAttribute('data-appearance', 'primary');
    });

    it('should apply secondary appearance', () => {
      const { container } = render(<Kbd secondary>Key</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveClass('bg-(--bg-color)');
      expect(el).toHaveClass('text-(--text-color)');
      expect(el).toHaveAttribute('data-appearance', 'secondary');
    });

    it('should apply danger appearance', () => {
      const { container } = render(<Kbd danger>Key</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveAttribute('data-appearance', 'danger');
    });
  });

  describe('Variant Styles', () => {
    it('should apply outline variant by default', () => {
      const { container } = render(<Kbd>Key</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveClass('bg-(--bg-color)');
      expect(el).toHaveAttribute('data-appearance', 'primary');
      expect(el).toHaveAttribute('data-variant', 'outline');
    });

    it('should apply filled variant when specified', () => {
      const { container } = render(<Kbd filled>Key</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveAttribute('data-variant', 'filled');
      expect(el).toHaveClass('bg-(--bg-color)');
      expect(el).toHaveClass('text-(--text-color)');
    });
  });

  describe('Shape Variants', () => {
    it('should apply rounded shape by default', () => {
      const { container } = render(<Kbd>Key</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveClass('rounded-(--br)');
    });

    it('should apply pill shape', () => {
      const { container } = render(<Kbd pill>Key</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveClass('rounded-full');
    });

    it('should apply sharp corners', () => {
      const { container } = render(<Kbd sharp>Key</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveClass('rounded-none');
    });
  });

  describe('Typography Options', () => {
    it('should use monospace font by default', () => {
      const { container } = render(<Kbd>Key</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveClass('font-mono');
    });

    it('should allow sans font override', () => {
      const { container } = render(<Kbd sans>Key</Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toHaveClass('font-sans');
      expect(el).not.toHaveClass('font-mono');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content', () => {
      const { container } = render(<Kbd></Kbd>);
      const el = container.querySelector('kbd');

      expect(el).toBeInTheDocument();
      expect(el).toHaveTextContent('');
    });

    it('should handle multiple props correctly', () => {
      const { container } = render(
        <Kbd xs secondary filled pill bold className="custom">
          Key
        </Kbd>
      );
      const el = container.querySelector('kbd');

      expect(el).toHaveAttribute('data-size', 'xs');
      expect(el).toHaveAttribute('data-appearance', 'secondary');
      expect(el).toHaveAttribute('data-variant', 'filled');
      expect(el).toHaveClass('rounded-full');
      expect(el).toHaveClass('font-bold');
      expect(el).toHaveClass('custom');
      expect(el).toHaveClass('vane-kbd');
    });
  });
});
