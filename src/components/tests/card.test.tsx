import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Card,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Card Component Tests', () => {

  describe('Card Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>Card content</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('px-4', 'py-4', 'gap-4', 'flex');
      expect(card).toHaveClass('text-(--text-color-default)'); // default appearance
      expect(card).toHaveClass('bg-(--layout-background-default)', 'rounded-(--layout-border-radius-md)', 'flex-col');
      expect(card).toHaveClass('border-(--border-color-default)');
    });
  });

  describe('Card Variants', () => {
    it('Card with primary variant should have primary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card primary>Primary Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('text-(--text-color-primary)'); // primary text color
      expect(card).toHaveClass('bg-(--layout-background-primary)'); // primary background
    });

    it('Card with secondary variant should have secondary classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card secondary>Secondary Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('text-(--text-color-secondary)'); // secondary text color
      expect(card).toHaveClass('bg-(--layout-background-secondary)'); // secondary background
    });

    it('Card with transparent background should have transparent classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card transparent>Transparent Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('bg-transparent'); // transparent background
    });
  });

  describe('Card Sizes', () => {
    it('should render with xs size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card xs>XS Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('px-2', 'py-2', 'gap-2'); // xs sizing for padding and gap
    });

    it('should render with lg size classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card lg>Large Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('px-5', 'py-5', 'gap-5'); // lg sizing with responsive variations
    });
  });

  describe('Card Shape and Border', () => {
    it('should render with sharp corners when sharp prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card sharp>Sharp Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('rounded-none'); // sharp corners
    });

    it('should render with border when border prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card border>Bordered Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('border');
    });

    it('should render with no border when noBorder prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card noBorder>No Border Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).not.toHaveClass('border'); // noBorder removes border classes
    });
  });

  describe('Card Shadow', () => {
    it('should render with shadow when shadow prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card shadow>Shadow Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('shadow-sm');
      expect(card).not.toHaveClass('hover:shadow-md');
    });

    it('should not have shadow by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card>Default Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).not.toHaveClass('shadow-sm'); // no shadow by default
    });
  });

  describe('Card Layout', () => {
    it('should render with row direction when row prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card row>Row Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('flex-row');
      expect(card).not.toHaveClass('flex-col');
    });

    it('should render with wrap when wrap prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card flexWrap>Wrap Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('flex-wrap');
    });

    it('should render with different alignments', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card itemsCenter justifyBetween>Aligned Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('items-center', 'justify-between');
    });
  });

  describe('Card Typography', () => {
    it('should apply text appearance correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card primary>Primary Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('text-(--text-color-primary)');
    });
  });

  describe('Card Responsive', () => {
    it('should apply responsive classes correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card mdCol>Responsive Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toHaveClass('max-md:flex-col'); // Card uses max-md responsive pattern
    });
  });

  describe('Custom className override', () => {
    it('should merge custom className with theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Card className="custom-card-class">Custom Card</Card>
        </ThemeProvider>
      );

      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('flex', 'flex-col'); // theme classes
      expect(card).toHaveClass('custom-card-class'); // custom class
    });
  });
});