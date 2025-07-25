import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Button,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Button Component Tests', () => {

  describe('Button Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button>Click me</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('w-fit', 'h-fit', 'cursor-pointer');
      expect(button).toHaveClass('text-base'); // md size
      expect(button).toHaveClass('shadow-sm', 'hover:shadow-md'); // shadow
      expect(button).toHaveClass('text-(--text-color-default)'); // default appearance
      expect(button).toHaveClass('font-sans'); // sans family
      expect(button).toHaveClass('font-semibold'); // semibold weight
      expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });
  });


  describe('Button Variants', () => {
    it('Button with primary variant should have primary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button primary>Primary Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('text-(--text-color-primary)'); // primary color
      expect(button).toHaveClass('bg-(--background-color-primary)'); // primary background
      expect(button).toHaveClass('px-4', 'py-2'); // padding
    });

    it('Button with secondary variant should have secondary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button secondary>Secondary Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('text-(--text-color-secondary)'); // secondary color
      expect(button).toHaveClass('bg-(--background-color-secondary)'); // secondary background
    });
  });

  describe('Button Border, Ring, and Shadow Behavior', () => {
    it('should preserve borders, rings, and shadows for appearance variants', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button id="btn-default">Default</Button>
          <Button id="btn-primary" primary>Primary</Button>
          <Button id="btn-secondary" secondary>Secondary</Button>
        </ThemeProvider>
      );

      const btnDefault = container.querySelector('#btn-default');
      const btnPrimary = container.querySelector('#btn-primary');
      const btnSecondary = container.querySelector('#btn-secondary');

      // These should have shadows (default button behavior)
      [btnDefault, btnPrimary, btnSecondary].forEach(btn => {
        expect(btn).toHaveClass('shadow-sm', 'hover:shadow-md');
      });

      // Note: borders and rings would only be visible when the button is focused or has those states active
      // The default button theme has noBorder and noRing as defaults, so they don't show border/ring classes by default
    });

    it('should demonstrate ring functionality works for buttons when ring prop is enabled', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button id="btn-default-ring" ring primary>Default with Ring</Button>
          <Button id="btn-secondary-ring" ring secondary>Secondary with Ring</Button>
        </ThemeProvider>
      );

      const btnDefaultRing = container.querySelector('#btn-default-ring');
      const btnSecondaryRing = container.querySelector('#btn-secondary-ring');

      // Buttons with ring should show ring classes
      expect(btnDefaultRing).toHaveClass('ring-(--border-color-primary)');
      expect(btnSecondaryRing).toHaveClass('ring-(--border-color-secondary)');
    });
  });

  describe('Custom className override', () => {
    it('should merge custom className with theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button className="custom-class">Custom Button</Button>
        </ThemeProvider>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('w-fit', 'h-fit', 'cursor-pointer'); // theme classes
      expect(button).toHaveClass('custom-class'); // custom class
    });
  });
});