import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Code } from '../ui/code';

describe('Code Component', () => {
  
  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      const { container } = render(<Code>console.log('hello')</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toBeInTheDocument();
      expect(codeElement).toHaveTextContent("console.log('hello')");
    });

    it('should render as code element by default', () => {
      const { container } = render(<Code>const x = 1;</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toBeInTheDocument();
      expect(codeElement?.tagName).toBe('CODE');
    });

    it('should accept custom className', () => {
      const { container } = render(<Code className="custom-class">test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('custom-class');
    });

    it('should allow custom tag override', () => {
      const { container } = render(<Code tag="span">test</Code>);
      const spanElement = container.querySelector('span');
      
      expect(spanElement).toBeInTheDocument();
      expect(spanElement?.tagName).toBe('SPAN');
    });
  });

  describe('Default Theme Application', () => {
    it('should have default theme classes applied', () => {
      const { container } = render(<Code>test</Code>);
      const codeElement = container.querySelector('code');

      expect(codeElement).toHaveClass('inline');
      expect(codeElement).toHaveClass('[--fs-unit:7]');
      expect(codeElement).toHaveClass('text-(length:--fs)');
      expect(codeElement).toHaveClass('px-(--ui-px)');
      expect(codeElement).toHaveClass('py-(--ui-py)');
      expect(codeElement).toHaveClass('bg-(--color-bg-default)');
      expect(codeElement).toHaveClass('text-(--color-text-default)');
      expect(codeElement).toHaveClass('rounded-(--ui-br)');
      expect(codeElement).toHaveClass('font-mono');
    });

    it('should have ring by default now', () => {
      const { container } = render(<Code>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).not.toHaveClass('shadow-sm');
      expect(codeElement).toHaveClass('ring');
    });
  });

  describe('Size Variants', () => {
    it('should apply xs size classes', () => {
      const { container } = render(<Code xs>test</Code>);
      const codeElement = container.querySelector('code');

      expect(codeElement).toHaveClass('[--fs-unit:5]');
      expect(codeElement).toHaveClass('text-(length:--fs)');
      expect(codeElement).toHaveClass('px-(--ui-px)');
      expect(codeElement).toHaveClass('py-(--ui-py)');
      expect(codeElement).toHaveClass('rounded-(--ui-br)');
    });

    it('should apply md size classes', () => {
      const { container } = render(<Code md>test</Code>);
      const codeElement = container.querySelector('code');

      expect(codeElement).toHaveClass('[--fs-unit:7]');
      expect(codeElement).toHaveClass('text-(length:--fs)');
      expect(codeElement).toHaveClass('px-(--ui-px)');
      expect(codeElement).toHaveClass('py-(--ui-py)');
      expect(codeElement).toHaveClass('rounded-(--ui-br)');
    });

    it('should apply lg size classes', () => {
      const { container } = render(<Code lg>test</Code>);
      const codeElement = container.querySelector('code');

      expect(codeElement).toHaveClass('[--fs-unit:8]');
      expect(codeElement).toHaveClass('text-(length:--fs)');
      expect(codeElement).toHaveClass('px-(--ui-px)');
      expect(codeElement).toHaveClass('py-(--ui-py)');
      expect(codeElement).toHaveClass('rounded-(--ui-br)');
    });

    it('should apply xl size classes', () => {
      const { container } = render(<Code xl>test</Code>);
      const codeElement = container.querySelector('code');

      expect(codeElement).toHaveClass('[--fs-unit:9]');
      expect(codeElement).toHaveClass('text-(length:--fs)');
      expect(codeElement).toHaveClass('px-(--ui-px)');
      expect(codeElement).toHaveClass('py-(--ui-py)');
      expect(codeElement).toHaveClass('rounded-(--ui-br)');
    });
  });

  describe('Appearance Variants', () => {
    it('should apply primary appearance', () => {
      const { container } = render(<Code primary>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('bg-(--color-bg-primary)');
      expect(codeElement).toHaveClass('text-(--color-text-primary)');
      expect(codeElement).toHaveClass('ring-(--color-border-primary)');
    });

    it('should apply secondary appearance', () => {
      const { container } = render(<Code secondary>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('bg-(--color-bg-secondary)');
      expect(codeElement).toHaveClass('text-(--color-text-secondary)');
      expect(codeElement).toHaveClass('ring-(--color-border-secondary)');
    });

    it('should apply success appearance', () => {
      const { container } = render(<Code success>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('bg-(--color-bg-success)');
      expect(codeElement).toHaveClass('text-(--color-text-success)');
      expect(codeElement).toHaveClass('ring-(--color-border-success)');
    });

    it('should apply danger appearance', () => {
      const { container } = render(<Code danger>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('bg-(--color-bg-danger)');
      expect(codeElement).toHaveClass('text-(--color-text-danger)');
      expect(codeElement).toHaveClass('ring-(--color-border-danger)');
    });
  });

  describe('Variant Styles', () => {
    it('should apply outline variant by default', () => {
      const { container } = render(<Code>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('bg-(--color-bg-default)');
      expect(codeElement).not.toHaveClass('bg-(--color-bg-filled-default)');
    });

    it('should apply filled variant when specified', () => {
      const { container } = render(<Code filled>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('bg-(--color-bg-filled-default)');
      expect(codeElement).toHaveClass('text-(--color-text-filled-default)');
    });

    it('should apply filled variant with primary appearance', () => {
      const { container } = render(<Code filled primary>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('bg-(--color-bg-filled-primary)');
      expect(codeElement).toHaveClass('text-(--color-text-filled-primary)');
    });
  });

  describe('Typography Options', () => {
    it('should use monospace font by default', () => {
      const { container } = render(<Code>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('font-mono');
    });

    it('should allow sans font override', () => {
      const { container } = render(<Code sans>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('font-sans');
      expect(codeElement).not.toHaveClass('font-mono');
    });

    it('should allow serif font', () => {
      const { container } = render(<Code serif>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('font-serif');
      expect(codeElement).not.toHaveClass('font-mono');
    });

    it('should apply font weight variants', () => {
      const { container: boldContainer } = render(<Code bold>test</Code>);
      const { container: semiboldContainer } = render(<Code semibold>test</Code>);
      
      const boldElement = boldContainer.querySelector('code');
      const semiboldElement = semiboldContainer.querySelector('code');
      
      expect(boldElement).toHaveClass('font-bold');
      expect(semiboldElement).toHaveClass('font-semibold');
    });
  });

  describe('Layout Options', () => {
    it('should have inline display by default', () => {
      const { container } = render(<Code>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('inline');
    });

    it('should allow block display', () => {
      const { container } = render(<Code block>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('block');
      expect(codeElement).not.toHaveClass('inline');
    });

    it('should allow inline-flex display', () => {
      const { container } = render(<Code inlineFlex>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('inline-flex');
      expect(codeElement).not.toHaveClass('inline');
    });
  });

  describe('Shape and Border Options', () => {
    it('should apply rounded shape by default', () => {
      const { container } = render(<Code>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('rounded-(--ui-br)');
    });

    it('should apply pill shape', () => {
      const { container } = render(<Code pill>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('rounded-full');
    });

    it('should apply sharp corners', () => {
      const { container } = render(<Code sharp>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('rounded-none');
    });
  });

  describe('Accessibility and Semantic', () => {
    it('should be accessible with proper semantics', () => {
      const { container } = render(<Code>const value = 42;</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement?.tagName).toBe('CODE');
      expect(codeElement).toHaveTextContent('const value = 42;');
    });

    it('should work with complex code content', () => {
      const codeContent = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`;
      
      const { container } = render(<Code>{codeContent}</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveTextContent('function fibonacci(n) { if (n <= 1) return n; return fibonacci(n - 1) + fibonacci(n - 2); }');
    });
  });

  describe('Comparison with Chip Component', () => {
    it('should have smaller paddings than Chip for same size', () => {
      const { container: codeContainer } = render(<Code md>test</Code>);
      const codeElement = codeContainer.querySelector('code');
      
      expect(codeElement).toHaveClass('px-(--ui-px)');
      expect(codeElement).toHaveClass('py-(--ui-py)');
    });

    it('should have same default size as Chip now', () => {
      const { container } = render(<Code>test</Code>);
      const codeElement = container.querySelector('code');

      expect(codeElement).toHaveClass('[--fs-unit:7]');
      expect(codeElement).toHaveClass('text-(length:--fs)');
    });

    it('should have inline by default now', () => {
      const { container } = render(<Code>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('inline');
      expect(codeElement).not.toHaveClass('inline-flex');
    });

    it('should have ring by default now but no shadow', () => {
      const { container } = render(<Code>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).not.toHaveClass('shadow-sm');
      expect(codeElement).toHaveClass('ring');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content', () => {
      const { container } = render(<Code></Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toBeInTheDocument();
      expect(codeElement).toHaveTextContent('');
    });

    it('should handle whitespace content', () => {
      const { container } = render(<Code>   </Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toBeInTheDocument();
    });

    it('should handle special characters', () => {
      const specialCode = '<script>alert("test");</script>';
      const { container } = render(<Code>{specialCode}</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveTextContent(specialCode);
    });

    it('should handle multiple props correctly', () => {
      const { container } = render(
        <Code xs primary filled pill mono bold className="custom">
          test
        </Code>
      );
      const codeElement = container.querySelector('code');

      expect(codeElement).toHaveClass('[--fs-unit:5]');
      expect(codeElement).toHaveClass('text-(length:--fs)');
      expect(codeElement).toHaveClass('bg-(--color-bg-filled-primary)');
      expect(codeElement).toHaveClass('rounded-full');
      expect(codeElement).toHaveClass('font-mono');
      expect(codeElement).toHaveClass('font-bold');
      expect(codeElement).toHaveClass('custom');
    });
  });

  describe('New defaults behavior', () => {
    it('should use default appearance when no appearance prop specified', () => {
      const { container } = render(<Code>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('bg-(--color-bg-default)');
      expect(codeElement).toHaveClass('text-(--color-text-default)');
    });

    it('should show ring by default', () => {
      const { container } = render(<Code>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('ring');
      expect(codeElement).toHaveClass('ring-inset');
    });

    it('should allow explicit inline prop', () => {
      const { container } = render(<Code inline>test</Code>);
      const codeElement = container.querySelector('code');
      
      expect(codeElement).toHaveClass('inline');
    });

    it('should allow explicit sm size', () => {
      const { container } = render(<Code sm>test</Code>);
      const codeElement = container.querySelector('code');

      expect(codeElement).toHaveClass('[--fs-unit:6]');
      expect(codeElement).toHaveClass('text-(length:--fs)');
      expect(codeElement).toHaveClass('px-(--ui-px)');
      expect(codeElement).toHaveClass('py-(--ui-py)');
    });
  });
});