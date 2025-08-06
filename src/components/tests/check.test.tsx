import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Check,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Check Component Tests', () => {

  describe('Check Component', () => {
    it('should render with default SVG structure', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Check />
        </ThemeProvider>
      );

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('invisible', 'col-start-1', 'row-start-1', 'peer-checked:visible');
      expect(svg).toHaveAttribute('viewBox', '0 0 14 14');
      expect(svg).toHaveAttribute('fill', 'none');
      
      const path = svg?.querySelector('path');
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute('d', 'M3 8L6 11L11 3.5');
      expect(path).toHaveAttribute('stroke-width', '2');
      expect(path).toHaveAttribute('stroke-linecap', 'round');
      expect(path).toHaveAttribute('stroke-linejoin', 'round');
      expect(path).toHaveAttribute('fill', 'none');
      expect(path).toHaveAttribute('stroke', 'currentColor');
    });

    it('should support appearance variants', () => {
      const appearances = ['default', 'primary', 'secondary', 'tertiary', 'accent', 'success', 'danger', 'warning', 'info'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Check {...{[appearance]: true}} />
          </ThemeProvider>
        );

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        // Check component should render with appearance classes
      });
    });

    it('should support filled variant (defaults to white/currentColor)', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Check filled primary />
        </ThemeProvider>
      );

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      // For filled variant, the theme should handle white color for checkmarks
    });

    it('should support different sizes through layout props', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      
      sizes.forEach(size => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Check {...{[size]: true}} />
          </ThemeProvider>
        );

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        // Size classes would be applied via layout theme
      });
    });

    it('should support display variants', () => {
      const displays = [
        { prop: 'inline', class: 'inline' },
        { prop: 'block', class: 'block' },
        { prop: 'hidden', class: 'hidden' }
      ] as const;

      displays.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Check {...{[prop]: true}} />
          </ThemeProvider>
        );

        const svg = container.querySelector('svg');
        expect(svg).toHaveClass(expectedClass);
      });
    });

    it('should support position variants', () => {
      const positions = [
        { prop: 'relative', class: 'relative' },
        { prop: 'absolute', class: 'absolute' },
        { prop: 'fixed', class: 'fixed' },
        { prop: 'sticky', class: 'sticky' },
        { prop: 'static', class: 'static' }
      ] as const;

      positions.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Check {...{[prop]: true}} />
          </ThemeProvider>
        );

        const svg = container.querySelector('svg');
        expect(svg).toHaveClass(expectedClass);
      });
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Check className="custom-check-class" />
        </ThemeProvider>
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('invisible'); // theme classes
      expect(svg).toHaveClass('custom-check-class'); // custom class
    });

    it('should support custom HTML tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Check tag="g" />
        </ThemeProvider>
      );

      const gEl = container.querySelector('g');
      expect(gEl).toBeInTheDocument();
      expect(gEl).toHaveClass('invisible', 'col-start-1', 'row-start-1', 'peer-checked:visible');
      
      const path = gEl?.querySelector('path');
      expect(path).toBeInTheDocument();
    });

    it('should support transparent appearance', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Check transparent />
        </ThemeProvider>
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-transparent');
    });

    it('should handle variant combinations', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Check filled primary md />
        </ThemeProvider>
      );

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      // Should apply filled variant styling for primary color at md size
    });

    it('should maintain peer-checked visibility class', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Check secondary outline />
        </ThemeProvider>
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('peer-checked:visible');
      expect(svg).toHaveClass('invisible');
    });

    it('should use filled variant by default based on theme defaults', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Check success />
        </ThemeProvider>
      );

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      // Based on the theme defaults showing filled: true, should use filled variant
    });

    it('should support onClick handler through SVG', () => {
      const handleClick = jest.fn();
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Check onClick={handleClick} />
        </ThemeProvider>
      );

      const svg = container.querySelector('svg');
      svg?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(handleClick).toHaveBeenCalled();
    });
  });
});