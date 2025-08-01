import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Stack,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Stack Component Tests', () => {

  describe('Stack Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack>Stack content</Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toBeInTheDocument();
      expect(stack).toHaveClass('px-4', 'py-4', 'gap-4', 'flex', 'flex-wrap', 'flex-col');
    });

    it('should apply row direction when row prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack row>Row Stack</Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toHaveClass('flex-row');
    });

    it('should apply reverse direction', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack reverse>Reverse Stack</Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toHaveClass('flex-col-reverse');
    });

    it('should apply row reverse direction', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack row reverse>Row Reverse Stack</Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toHaveClass('flex-row-reverse');
    });

    it('should support column reverse', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack columnReverse>Column Reverse Stack</Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toHaveClass('flex-col-reverse');
    });

    it('should support wrap properties', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack flexWrap>
            Wrapping Stack
          </Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toHaveClass('flex-wrap');
    });

    it('should support no gap option', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack noGap>
            No Gap Stack
          </Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).not.toHaveClass('gap-4');
      expect(stack).toHaveClass('gap-0');
    });

    it('should support no padding option', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack noPadding>
            No Padding Stack
          </Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).not.toHaveClass('px-4');
      expect(stack).toHaveClass('px-0', 'py-0');
    });

    it('should support flex alignment properties', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack itemsCenter justifyBetween>
            Aligned Stack
          </Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toHaveClass('items-center', 'justify-between');
    });

    it('should render consistently with extra props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack>
            Stack with consistent rendering
          </Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toBeInTheDocument();
      expect(stack).toHaveTextContent('Stack with consistent rendering');
    });

    it('should support visual decoration props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack 
            warning
            border 
            ring 
            rounded
            noBorder={false}
            noRing={false}
            sharp={false}
          >
            Decorated Stack
          </Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toHaveClass('border');
      expect(stack).toHaveClass('border-(--border-color-warning)');
      expect(stack).toHaveClass('ring');
      expect(stack).toHaveClass('ring-(--border-color-warning)');
      expect(stack).toHaveClass('rounded-lg');
    });

    it('should support appearance variants', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack accent>
            Accent Stack
          </Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toHaveClass('bg-(--layout-background-accent)');
    });

    it('should support transparent background', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack transparent>
            Transparent Stack
          </Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toHaveClass('bg-transparent');
    });

    it('should support layout positioning', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack relative>
            Positioned Stack
          </Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toHaveClass('relative');
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack className="custom-stack-class">
            Custom Stack
          </Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toHaveClass('px-4', 'py-4', 'gap-4', 'flex', 'flex-wrap', 'flex-col'); // theme classes
      expect(stack).toHaveClass('custom-stack-class'); // custom class
    });

    it('should support custom HTML tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack tag="section">
            Section Stack
          </Stack>
        </ThemeProvider>
      );

      const sectionEl = container.querySelector('section');
      expect(sectionEl).toBeInTheDocument();
      expect(sectionEl).toHaveTextContent('Section Stack');
    });
  });
});