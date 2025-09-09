import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

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
      // With new GapTheme, noGap applies no gap classes instead of gap-0
      expect(stack).not.toHaveClass('gap-2', 'gap-3', 'gap-4', 'gap-5', 'gap-6');
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
      expect(stack).not.toHaveClass('px-2', 'px-4', 'px-6', 'px-8', 'px-10'); // no px padding classes
      expect(stack).not.toHaveClass('py-2', 'py-4', 'py-6', 'py-8', 'py-10'); // no py padding classes
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
          >
            Decorated Stack
          </Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toHaveClass('border');
      expect(stack).toHaveClass('border-(--color-border-warning)');
      expect(stack).toHaveClass('ring');
      expect(stack).toHaveClass('ring-(--color-border-warning)');
      expect(stack).toHaveClass('rounded-(--layout-br-md)');
    });

    it('should support appearance variants for background', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack accent>
            Accent Stack
          </Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toHaveClass('bg-(--color-bg-layout-accent)');
    });

    it('should support appearance variants for text color', () => {
      const appearances = ['primary', 'secondary', 'accent', 'success', 'danger', 'warning', 'info'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Stack {...{[appearance]: true}}>
              {appearance} stack
            </Stack>
          </ThemeProvider>
        );

        const stack = container.querySelector('div');
        expect(stack).toHaveClass(`text-(--color-text-${appearance})`);
      });
    });

    it('should support filled and outline variants for text, background, border, and ring', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack primary outline border ring>Outline stack</Stack>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack primary filled border ring>Filled stack</Stack>
        </ThemeProvider>
      );

      const outlineStack = outlineContainer.querySelector('div');
      const filledStack = filledContainer.querySelector('div');

      // Text colors
      expect(outlineStack).toHaveClass('text-(--color-text-primary)');
      expect(filledStack).toHaveClass('text-(--color-text-filled-primary)');
      
      // Background colors
      expect(outlineStack).toHaveClass('bg-(--color-bg-layout-primary)');
      expect(filledStack).toHaveClass('bg-(--color-bg-filled-layout-primary)');
      
      // Border colors
      expect(outlineStack).toHaveClass('border-(--color-border-primary)');
      expect(filledStack).toHaveClass('border-(--color-border-filled-primary)');
      
      // Ring colors
      expect(outlineStack).toHaveClass('ring-(--color-border-primary)');
      expect(filledStack).toHaveClass('ring-(--color-border-filled-primary)');
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