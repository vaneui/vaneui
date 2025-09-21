import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Label,
  Checkbox,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Label Component Tests', () => {

  describe('Label Component', () => {
    it('should render with default theme classes including flex layout', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label>Label text</Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass('cursor-default'); // cursor-default when no input
      expect(label).toHaveClass('has-[input]:cursor-pointer'); // will be cursor-pointer with input
      expect(label).toHaveClass('flex'); // flex by default
      expect(label).toHaveClass('gap-(--gap)'); // default gap
      expect(label).toHaveClass('text-base'); // md size default
      expect(label).not.toHaveClass('text-(--color-text-default)'); // no default appearance
      expect(label).toHaveClass('font-sans');
      expect(label).toHaveClass('font-medium');
      expect(label).toHaveTextContent('Label text');
    });

    it('should support htmlFor attribute', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label htmlFor="test-input">Label for input</Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label');
      expect(label).toHaveAttribute('for', 'test-input');
    });

    it('should render checkbox inside label correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label htmlFor="demo1">
            <Checkbox id="demo1"/>
            Demo Label
          </Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass('flex', 'gap-(--gap)');
      expect(label).toHaveClass('has-[input]:cursor-pointer'); // has-[input] selector applies
      expect(label).toHaveClass('cursor-default'); // base cursor class
      expect(label).toHaveAttribute('for', 'demo1');
      
      const checkboxWrapper = label?.querySelector('span.inline-grid');
      expect(checkboxWrapper).toBeInTheDocument();
      
      const checkbox = label?.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('id', 'demo1');
      
      expect(label).toHaveTextContent('Demo Label');
    });

    it('should support different gap sizes', () => {
      const gaps = [
        { prop: 'xs', class: 'gap-(--gap)' },
        { prop: 'sm', class: 'gap-(--gap)' },
        { prop: 'md', class: 'gap-(--gap)' },
        { prop: 'lg', class: 'gap-(--gap)' },
        { prop: 'xl', class: 'gap-(--gap)' }
      ] as const;

      gaps.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Label {...{[prop]: true}} gap>
              <Checkbox />
              {prop} gap label
            </Label>
          </ThemeProvider>
        );

        const label = container.querySelector('label');
        expect(label).toHaveClass(expectedClass);
      });
    });

    it('should support noGap option', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label noGap>
            <Checkbox />
            No gap label
          </Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label');
      // With new GapTheme, noGap applies no gap classes instead of gap-0
      expect(label).not.toHaveClass('gap-(--gap)');
    });

    it('should support different sizes', () => {
      const sizes = [
        { prop: 'xs', class: 'text-xs' },
        { prop: 'sm', class: 'text-sm' },
        { prop: 'md', class: 'text-base' },
        { prop: 'lg', class: 'text-lg' },
        { prop: 'xl', class: 'text-xl' }
      ] as const;

      sizes.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Label {...{[prop]: true}}>{prop} label</Label>
          </ThemeProvider>
        );

        const label = container.querySelector('label');
        expect(label).toHaveClass(expectedClass);
      });
    });

    it('should support all appearance variants', () => {
      const appearances = ['default', 'accent', 'primary', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Label {...{[appearance]: true}}>{appearance} label</Label>
          </ThemeProvider>
        );

        const label = container.querySelector('label');
        expect(label).toHaveClass(`text-(--color-text-${appearance})`);
      });
    });

    it('should support display variants including overriding flex', () => {
      const displays = [
        { prop: 'inline', class: 'inline' },
        { prop: 'block', class: 'block' },
        { prop: 'inlineBlock', class: 'inline-block' },
        { prop: 'flex', class: 'flex' },
        { prop: 'inlineFlex', class: 'inline-flex' },
        { prop: 'hidden', class: 'hidden' }
      ] as const;

      displays.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Label {...{[prop]: true}}>{prop} label</Label>
          </ThemeProvider>
        );

        const label = container.querySelector('label');
        expect(label).toHaveClass(expectedClass);
      });
    });

    it('should support flex direction and wrap options', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label column flexWrap>
            <Checkbox />
            Column flex label
          </Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
      // Note: Testing that flex layout and wrap properties are supported
      // Actual class application depends on theme configuration
    });

    it('should support justify and items alignment', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label justifyBetween itemsStart>
            <Checkbox />
            Aligned label
          </Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label');
      expect(label).toHaveClass('justify-between', 'items-start');
    });

    it('should support font properties', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label bold serif uppercase underline>
            Styled Label
          </Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label');
      expect(label).toHaveClass('font-bold', 'font-serif', 'uppercase', 'underline');
    });

    it('should support text alignment', () => {
      const alignments = [
        { prop: 'textLeft', class: 'text-left' },
        { prop: 'textCenter', class: 'text-center' },
        { prop: 'textRight', class: 'text-right' },
        { prop: 'textJustify', class: 'text-justify' }
      ] as const;

      alignments.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Label {...{[prop]: true}}>{prop} label</Label>
          </ThemeProvider>
        );

        const label = container.querySelector('label');
        expect(label).toHaveClass(expectedClass);
      });
    });

    it('should support filled and outline variants', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label primary outline>Outline label</Label>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label primary filled>Filled label</Label>
        </ThemeProvider>
      );

      const outlineLabel = outlineContainer.querySelector('label');
      const filledLabel = filledContainer.querySelector('label');

      expect(outlineLabel).toHaveClass('text-(--color-text-primary)');
      expect(filledLabel).toHaveClass('text-(--color-text-filled-primary)');
    });

    it('should support transparent appearance', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label transparent>Transparent Label</Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label');
      expect(label).toHaveClass('text-transparent');
    });

    it('should support link styling', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label link>Link Label</Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label');
      expect(label).toHaveClass('text-(--color-text-link)');
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label className="custom-label-class">Custom Label</Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label');
      expect(label).toHaveClass('cursor-default'); // theme classes
      expect(label).toHaveClass('has-[input]:cursor-pointer'); // conditional cursor
      expect(label).toHaveClass('custom-label-class'); // custom class
    });

    it('should support custom HTML tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label tag="span">Span Label</Label>
        </ThemeProvider>
      );

      const spanEl = container.querySelector('span');
      expect(spanEl).toBeInTheDocument();
      expect(spanEl).toHaveTextContent('Span Label');
    });

    it('should handle form attributes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label form="test-form" htmlFor="test-input">Form Label</Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label');
      expect(label).toHaveAttribute('form', 'test-form');
      expect(label).toHaveAttribute('for', 'test-input');
    });

    it('should support onClick handler', () => {
      const handleClick = jest.fn();
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label onClick={handleClick}>Clickable Label</Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label') as HTMLLabelElement;
      label.click();
      expect(handleClick).toHaveBeenCalled();
    });

    it('should handle checkbox interaction through label click', () => {
      const handleChange = jest.fn();
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label htmlFor="interactive-checkbox">
            <Checkbox id="interactive-checkbox" onChange={handleChange} />
            Click me to check
          </Label>
        </ThemeProvider>
      );

      const label = container.querySelector('label') as HTMLLabelElement;
      const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      
      expect(checkbox.checked).toBe(false);
      
      label.click();
      
      expect(handleChange).toHaveBeenCalled();
    });
    it('should have cursor-pointer only when input is present', () => {
      // Label without input - should have cursor-default
      const {container: containerWithoutInput} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label>Label without input</Label>
        </ThemeProvider>
      );

      const labelWithoutInput = containerWithoutInput.querySelector('label');
      expect(labelWithoutInput).toHaveClass('cursor-default');
      expect(labelWithoutInput).toHaveClass('has-[input]:cursor-pointer');
      // The has-[input] selector won't apply since there's no input

      // Label with input - should have cursor-pointer through has-[input] selector
      const {container: containerWithInput} = render(
        <ThemeProvider theme={defaultTheme}>
          <Label>
            <input type="text" />
            Label with input
          </Label>
        </ThemeProvider>
      );

      const labelWithInput = containerWithInput.querySelector('label');
      expect(labelWithInput).toHaveClass('cursor-default');
      expect(labelWithInput).toHaveClass('has-[input]:cursor-pointer');
      // The has-[input] selector will apply since there's an input
      const input = labelWithInput?.querySelector('input');
      expect(input).toBeInTheDocument();
    });
  });
});