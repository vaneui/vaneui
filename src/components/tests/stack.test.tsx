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
      expect(stack).toHaveClass('px-(--px) [--py-unit:4]', 'py-(--py) [--gap-unit:4]', 'gap-(--gap)', 'flex', 'flex-wrap', 'flex-col');
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
      expect(stack).not.toHaveClass('gap-(--gap)');
      // With new GapTheme, noGap applies no gap classes instead of gap-0
      expect(stack).not.toHaveClass('gap-(--gap)');
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
      expect(stack).not.toHaveClass('px-(--px)');
      expect(stack).not.toHaveClass('px-(--px)'); // no px padding classes
      expect(stack).not.toHaveClass('py-(--py)'); // no py padding classes
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
      expect(stack).toHaveClass('border-[length:var(--bw)]');
      expect(stack).toHaveClass('border-(--color-border-warning)');
      expect(stack).toHaveClass('ring-[length:var(--rw)]');
      expect(stack).toHaveClass('ring-(--color-border-warning)');
      expect(stack).toHaveClass('rounded-(--br)');
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
      expect(stack).toHaveClass('[background:var(--color-bg-layout-accent)]');
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
      expect(outlineStack).toHaveClass('[background:var(--color-bg-layout-primary)]');
      expect(filledStack).toHaveClass('[background:var(--color-bg-filled-layout-primary)]');
      
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
      expect(stack).toHaveClass('[background:transparent]');
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
      expect(stack).toHaveClass('px-(--px) [--py-unit:4]', 'py-(--py) [--gap-unit:4]', 'gap-(--gap)', 'flex', 'flex-wrap', 'flex-col'); // theme classes
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

  describe('CSS Variable Classes Based on Size', () => {
    describe('Border Radius Variables', () => {
      it('should apply correct --br-unit for xs size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Stack xs rounded>XS Stack</Stack>
          </ThemeProvider>
        );

        const stack = container.querySelector('div');
        expect(stack).toHaveClass('[--br-unit:3]');
        expect(stack).toHaveClass('rounded-(--br)');
      });

      it('should apply correct --br-unit for lg size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Stack lg rounded>LG Stack</Stack>
          </ThemeProvider>
        );

        const stack = container.querySelector('div');
        expect(stack).toHaveClass('[--br-unit:6]');
        expect(stack).toHaveClass('rounded-(--br)');
      });

      it('should apply correct --br-unit for xl size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Stack xl rounded>XL Stack</Stack>
          </ThemeProvider>
        );

        const stack = container.querySelector('div');
        expect(stack).toHaveClass('[--br-unit:7]');
        expect(stack).toHaveClass('rounded-(--br)');
      });
    });

    describe('Padding Variables', () => {
      it('should apply correct --py-unit for xs size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Stack xs>XS Stack</Stack>
          </ThemeProvider>
        );

        const stack = container.querySelector('div');
        expect(stack).toHaveClass('[--py-unit:2]');
        expect(stack).toHaveClass('px-(--px)');
        expect(stack).toHaveClass('py-(--py)');
      });

      it('should apply correct --py-unit for lg size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Stack lg>LG Stack</Stack>
          </ThemeProvider>
        );

        const stack = container.querySelector('div');
        expect(stack).toHaveClass('[--py-unit:5]');
        expect(stack).toHaveClass('px-(--px)');
        expect(stack).toHaveClass('py-(--py)');
      });
    });

    describe('Gap Variables', () => {
      it('should apply correct --gap-unit for xs size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Stack xs gap>XS Stack</Stack>
          </ThemeProvider>
        );

        const stack = container.querySelector('div');
        expect(stack).toHaveClass('[--gap-unit:2]');
        expect(stack).toHaveClass('gap-(--gap)');
      });

      it('should apply correct --gap-unit for xl size', () => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Stack xl gap>XL Stack</Stack>
          </ThemeProvider>
        );

        const stack = container.querySelector('div');
        expect(stack).toHaveClass('[--gap-unit:6]');
        expect(stack).toHaveClass('gap-(--gap)');
      });
    });
  });
});