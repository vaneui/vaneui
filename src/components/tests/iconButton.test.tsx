import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

import {
  IconButton,
  ThemeProvider,
  defaultTheme
} from '../../index';
import { FONT_SIZE_CLASS } from './utils/classAssertions';

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
      expect(button).toHaveAttribute('data-size', 'sm');
      expect(button).toHaveAttribute('data-vane-type', 'ui');
      // Default IconButton has non-inherit appearance → emits data attributes
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
        expect(button).toHaveClass(FONT_SIZE_CLASS);
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

    it('should emit data-variant="outline" by default', () => {
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
    it('should have w-fit class (definite square width, immune to flex-stretch parents)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton aria-label="Test"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('w-fit');
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

  describe('Disabled Link Handling', () => {
    it('should strip href and add aria-disabled when disabled with href', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton href="/settings" disabled aria-label="Settings"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const el = container.firstChild as HTMLElement;
      expect(el).not.toHaveAttribute('href');
      expect(el).toHaveAttribute('aria-disabled', 'true');
      expect(el).toHaveAttribute('role', 'link');
    });

    it('should NOT strip href when not disabled', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton href="/settings" aria-label="Settings"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/settings');
      expect(anchor).not.toHaveAttribute('aria-disabled');
      expect(anchor).not.toHaveAttribute('role');
    });

    it('should strip href when loading with href', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton href="/settings" loading aria-label="Settings"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      const el = container.firstChild as HTMLElement;
      expect(el).not.toHaveAttribute('href');
      expect(el).toHaveAttribute('aria-disabled', 'true');
      expect(el).toHaveAttribute('role', 'link');
      expect(el).toHaveAttribute('data-loading', 'true');
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

      // S4: the spinner is decorative — aria-busy on the button already conveys
      // the loading state, so the spinner wrapper must be hidden from AT
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(spinnerRing!.closest('[aria-hidden="true"]')).toBeInTheDocument();
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

  // Icon-only content gives the button no accessible name — dev builds must
  // warn when none of aria-label / aria-labelledby / title is set.
  describe('Accessible Name Dev Warning', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('should warn when mounted without any accessible name', () => {
      render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton><TestIcon /></IconButton>
        </ThemeProvider>
      );

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('IconButton has no accessible name')
      );
    });

    it('should not warn when aria-label is set', () => {
      render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton aria-label="Settings"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should not warn when aria-labelledby is set', () => {
      render(
        <ThemeProvider theme={defaultTheme}>
          <>
            <span id="icon-button-label">Settings</span>
            <IconButton aria-labelledby="icon-button-label"><TestIcon /></IconButton>
          </>
        </ThemeProvider>
      );

      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should not warn when title is set', () => {
      render(
        <ThemeProvider theme={defaultTheme}>
          <IconButton title="Settings"><TestIcon /></IconButton>
        </ThemeProvider>
      );

      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should not warn in production mode', () => {
      const previousEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      try {
        render(
          <ThemeProvider theme={defaultTheme}>
            <IconButton><TestIcon /></IconButton>
          </ThemeProvider>
        );
        expect(warnSpy).not.toHaveBeenCalled();
      } finally {
        process.env.NODE_ENV = previousEnv;
      }
    });
  });
});
