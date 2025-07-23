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

  describe('Transparent/Link Button Component', () => {
    it('should render without shadow', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button id="transparent" transparent>Click me</Button>
          <Button id="link" link>Click me</Button>
        </ThemeProvider>
      );

      const button1 = container.querySelector('#transparent');
      const button2 = container.querySelector('#link');
      expect(button1).toBeInTheDocument();
      expect(button1).not.toHaveClass('shadow-sm', 'hover:shadow-md');
      expect(button2).toBeInTheDocument();
      expect(button2).not.toHaveClass('shadow-sm', 'hover:shadow-md');
    });

    it('should render with transparent border and ring', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button id="transparent" transparent>Click me</Button>
          <Button id="link" link>Click me</Button>
        </ThemeProvider>
      );

      const button1 = container.querySelector('#transparent');
      const button2 = container.querySelector('#link');

      // Transparent and link buttons should have transparent border classes
      expect(button1).toBeInTheDocument();
      expect(button1).toHaveClass('border-transparent');

      expect(button2).toBeInTheDocument();
      expect(button2).toHaveClass('border-transparent');

      // Transparent and link buttons should have transparent ring classes
      expect(button1).toHaveClass('ring-transparent');
      expect(button2).toHaveClass('ring-transparent');
    });

    it('should have default text color for transparent but link color for link button', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button id="transparent" transparent>Click me</Button>
          <Button id="link" link>Click me</Button>
        </ThemeProvider>
      );

      const button1 = container.querySelector('#transparent');
      const button2 = container.querySelector('#link');

      expect(button1).toHaveClass('text-(--text-color-default)'); // transparent uses default text color
      expect(button2).toHaveClass('text-(--text-color-link)'); // link uses link text color
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
    it('should have transparent borders, rings, and no shadows for transparent and link variants in both outline and filled modes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button id="btn-outline-transparent" transparent>Outline Transparent</Button>
          <Button id="btn-outline-link" link>Outline Link</Button>
          <Button id="btn-filled-transparent" filled transparent>Filled Transparent</Button>
          <Button id="btn-filled-link" filled link>Filled Link</Button>
        </ThemeProvider>
      );

      // Test all button variants
      const btnOutlineTransparent = container.querySelector('#btn-outline-transparent');
      const btnOutlineLink = container.querySelector('#btn-outline-link');
      const btnFilledTransparent = container.querySelector('#btn-filled-transparent');
      const btnFilledLink = container.querySelector('#btn-filled-link');

      // None should have shadows
      [btnOutlineTransparent, btnOutlineLink, btnFilledTransparent, btnFilledLink].forEach(btn => {
        expect(btn).not.toHaveClass('shadow-sm', 'hover:shadow-md', 'shadow-lg');
      });

      // All should have transparent border classes
      [btnOutlineTransparent, btnOutlineLink, btnFilledTransparent, btnFilledLink].forEach(btn => {
        expect(btn).toHaveClass('border-transparent');
      });

      // All should have transparent ring classes  
      [btnOutlineTransparent, btnOutlineLink, btnFilledTransparent, btnFilledLink].forEach(btn => {
        expect(btn).toHaveClass('ring-transparent');
      });
    });

    it('should preserve borders, rings, and shadows for other appearance variants', () => {
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

    it('should demonstrate ring functionality works for normal buttons when ring prop is enabled', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Button id="btn-default-ring" ring primary>Default with Ring</Button>
          <Button id="btn-transparent-ring" ring transparent>Transparent with Ring (should be transparent)</Button>
          <Button id="btn-link-ring" ring link>Link with Ring (should be transparent)</Button>
        </ThemeProvider>
      );

      const btnDefaultRing = container.querySelector('#btn-default-ring');
      const btnTransparentRing = container.querySelector('#btn-transparent-ring');
      const btnLinkRing = container.querySelector('#btn-link-ring');

      // Default button with ring should show ring classes
      expect(btnDefaultRing).toHaveClass('ring-(--border-color-primary)');

      // Transparent and link buttons should always have transparent ring even when ring prop is set
      expect(btnTransparentRing).toHaveClass('ring-transparent');
      expect(btnLinkRing).toHaveClass('ring-transparent');
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