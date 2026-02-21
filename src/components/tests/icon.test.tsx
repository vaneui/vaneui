import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { createRef } from 'react';

import {
  Icon,
  ThemeProvider,
  defaultTheme
} from '../../index';

const TestSvg = () => (
  <svg data-testid="test-svg" viewBox="0 0 24 24">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

describe('Icon Component Tests', () => {

  describe('Default Rendering', () => {
    it('should render as a span with default theme classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon><TestSvg /></Icon>
        </ThemeProvider>
      );

      const icon = container.querySelector('span');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('vane-icon');
      expect(icon).toHaveClass('inline-flex');
      expect(icon).toHaveClass('items-center');
      expect(icon).toHaveClass('justify-center');
      expect(icon).toHaveAttribute('data-size', 'md');
      expect(icon).toHaveAttribute('data-vane-type', 'ui');
    });

    it('should have no appearance by default (currentColor inheritance)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon><TestSvg /></Icon>
        </ThemeProvider>
      );

      const icon = container.querySelector('span');
      expect(icon).not.toHaveAttribute('data-appearance');
      expect(icon).not.toHaveClass('text-(--text-color)');
    });

    it('should default to outline variant', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon><TestSvg /></Icon>
        </ThemeProvider>
      );

      const icon = container.querySelector('span');
      expect(icon).toHaveAttribute('data-variant', 'outline');
    });
  });

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach(size => {
      it(`should render with ${size} size`, () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Icon {...{ [size]: true }}><TestSvg /></Icon>
          </ThemeProvider>
        );

        const icon = container.querySelector('span');
        expect(icon).toHaveAttribute('data-size', size);
        expect(icon).toHaveClass('text-(length:--fs)');
      });
    });
  });

  describe('Appearance Variants', () => {
    const appearances = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'brand', 'accent'] as const;

    appearances.forEach(appearance => {
      it(`should render with ${appearance} appearance`, () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Icon {...{ [appearance]: true }}><TestSvg /></Icon>
          </ThemeProvider>
        );

        const icon = container.querySelector('span');
        expect(icon).toHaveAttribute('data-appearance', appearance);
        expect(icon).toHaveClass('text-(--text-color)');
      });
    });
  });

  describe('Variant Modifier', () => {
    it('should apply filled variant when filled prop is set', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon filled primary><TestSvg /></Icon>
        </ThemeProvider>
      );

      const icon = container.querySelector('span');
      expect(icon).toHaveAttribute('data-variant', 'filled');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with theme classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon className="custom-icon-class"><TestSvg /></Icon>
        </ThemeProvider>
      );

      const icon = container.querySelector('span');
      expect(icon).toHaveClass('vane-icon');
      expect(icon).toHaveClass('custom-icon-class');
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to the span element', () => {
      const ref = createRef<HTMLSpanElement>();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Icon ref={ref}><TestSvg /></Icon>
        </ThemeProvider>
      );

      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('Boolean Props Leak Prevention', () => {
    it('should not leak boolean props to the DOM', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon lg danger><TestSvg /></Icon>
        </ThemeProvider>
      );

      const icon = container.querySelector('span');
      expect(icon).not.toHaveAttribute('lg');
      expect(icon).not.toHaveAttribute('danger');
    });
  });

  describe('Responsive Hide', () => {
    it('should apply mobileHide class', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Icon mobileHide><TestSvg /></Icon>
        </ThemeProvider>
      );

      const icon = container.querySelector('span');
      expect(icon).toHaveClass('max-mobile:hidden');
    });
  });
});
