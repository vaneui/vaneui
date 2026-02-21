import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

import {
  IconButton,
  ThemeProvider,
  defaultTheme
} from '../../index';

// Simple SVG icon for testing
const TestIcon = () => (
  <svg data-testid="test-icon" viewBox="0 0 24 24">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

describe('IconButton Component Tests', () => {

  describe('Default Rendering', () => {
    it('should render as button tag with square aspect ratio', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('aspect-square');
      expect(button).toHaveClass('vane-icon-button');
      expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center');
      expect(button).toHaveClass('cursor-pointer');
      expect(button).toHaveAttribute('data-size', 'md');
      expect(button).toHaveAttribute('data-vane-type', 'ui');
      expect(button).toHaveAttribute('data-variant', 'outline');
      expect(button).toHaveAttribute('data-appearance', 'primary');
    });

    it('should render as anchor tag when href is provided', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton href="/settings" aria-label="Settings"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveClass('aspect-square');
      expect(anchor).toHaveClass('vane-icon-button');
      expect(anchor).toHaveAttribute('href', '/settings');

      const button = container.querySelector('button');
      expect(button).not.toBeInTheDocument();
    });

    it('should pass aria-label to the DOM element', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton aria-label="Close dialog"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveAttribute('aria-label', 'Close dialog');
    });
  });

  describe('SVG Protection', () => {
    it('should include SVG protection classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('[&_svg]:pointer-events-none');
      expect(button).toHaveClass('[&_svg]:shrink-0');
    });
  });

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach(size => {
      it(`should render with ${size} size`, () => {
        const props = { [size]: true };
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <IconButton aria-label="Test" {...props}><TestIcon /></IconButton>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).toHaveAttribute('data-size', size);
        expect(button).toHaveClass('text-(length:--fs)');
        expect(button).toHaveClass('aspect-square');
      });
    });
  });

  describe('Appearance Variants', () => {
    const appearances = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'] as const;

    appearances.forEach(appearance => {
      it(`should render with ${appearance} appearance`, () => {
        const props = { [appearance]: true };
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <IconButton aria-label="Test" {...props}><TestIcon /></IconButton>
          </ThemeProvider>
        );

        const button = container.querySelector('button');
        expect(button).toHaveAttribute('data-appearance', appearance);
        expect(button).toHaveClass('text-(--text-color)');
        expect(button).toHaveClass('bg-(--bg-color)');
      });
    });
  });

  describe('Variant Modifiers', () => {
    it('should render with filled variant', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton filled aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveAttribute('data-variant', 'filled');
    });

    it('should render with outline variant by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveAttribute('data-variant', 'outline');
    });
  });

  describe('Shape Variants', () => {
    it('should render with pill shape', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton pill aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('rounded-full');
    });

    it('should render with sharp shape', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton sharp aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('rounded-none');
    });

    it('should render with rounded shape by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('rounded-(--br)');
    });
  });

  describe('Differences from Button', () => {
    it('should NOT have w-fit class (Button has it)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).not.toHaveClass('w-fit');
    });

    it('should have h-fit class', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('h-fit');
    });

    it('should NOT have gap class (no text to space from)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).not.toHaveClass('gap-(--gap)');
    });

    it('should NOT have whitespace-nowrap class', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).not.toHaveClass('whitespace-nowrap');
    });

    it('should NOT have font-sans or font-semibold defaults', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).not.toHaveClass('font-sans');
      expect(button).not.toHaveClass('font-semibold');
    });
  });

  describe('Loading State', () => {
    it('should show spinner when loading', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton loading aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('data-loading', 'true');
      expect(button).toBeDisabled();

      const spinnerRing = container.querySelector('.vane-button-spinner-ring');
      expect(spinnerRing).toBeInTheDocument();
    });

    it('should not leak loading prop to DOM', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton loading aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).not.toHaveAttribute('loading');
    });
  });

  describe('Prop Leak Prevention', () => {
    it('should not leak boolean props to DOM', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton
            primary
            filled
            lg
            pill
            aria-label="Test"
          >
            <TestIcon />
          </IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).not.toHaveAttribute('primary');
      expect(button).not.toHaveAttribute('filled');
      expect(button).not.toHaveAttribute('lg');
      expect(button).not.toHaveAttribute('pill');
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to the button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton ref={ref} aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveClass('vane-icon-button');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with theme classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton className="custom-class" aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('aspect-square');
      expect(button).toHaveClass('vane-icon-button');
    });
  });
});
