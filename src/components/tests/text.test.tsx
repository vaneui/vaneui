import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Text,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Text Component Tests', () => {

  describe('Text Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text>Text content</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass('p-0', 'm-0', 'w-fit');
      expect(text).toHaveClass('text-base'); // md size
      expect(text).toHaveClass('text-(--text-color-default)'); // default appearance
      expect(text).toHaveClass('font-sans');
      // No default font weight; variants like medium/bold are opt-in
      expect(text).not.toHaveClass('font-normal');
    });

    it('should apply different size classes', () => {
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
            <Text {...{[prop]: true}}>{prop} text</Text>
          </ThemeProvider>
        );

        const text = container.querySelector('p');
        expect(text).toHaveClass(expectedClass);
      });
    });

    it('should apply layout props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text flex itemsCenter justifyBetween relative>Text with multiple layout props</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('flex', 'items-center', 'justify-between', 'relative');
    });

    it('should support responsive hide props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text mdHide>Text hidden on medium screens</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('max-md:hidden');
    });

    it('should support all hide breakpoints', () => {
      const hideProps = [
        { prop: 'xsHide', class: 'max-xs:hidden' },
        { prop: 'smHide', class: 'max-sm:hidden' },
        { prop: 'mdHide', class: 'max-md:hidden' },
        { prop: 'lgHide', class: 'max-lg:hidden' },
        { prop: 'xlHide', class: 'max-xl:hidden' }
      ] as const;

      hideProps.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Text {...{[prop]: true}}>{prop} text</Text>
          </ThemeProvider>
        );

        const text = container.querySelector('p');
        expect(text).toHaveClass(expectedClass);
      });
    });

    it('should support appearance variants', () => {
      const appearances = ['primary', 'secondary', 'tertiary', 'accent', 'success', 'danger', 'warning', 'info'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Text {...{[appearance]: true}}>{appearance} text</Text>
          </ThemeProvider>
        );

        const text = container.querySelector('p');
        expect(text).toHaveClass(`text-(--text-color-${appearance})`);
      });
    });

    it('should support font weight variants', () => {
      const weights = [
        { prop: 'thin', class: 'font-thin' },
        { prop: 'light', class: 'font-light' },
        { prop: 'normal', class: 'font-normal' },
        { prop: 'medium', class: 'font-medium' },
        { prop: 'semibold', class: 'font-semibold' },
        { prop: 'bold', class: 'font-bold' },
        { prop: 'extrabold', class: 'font-extrabold' }
      ] as const;

      weights.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Text {...{[prop]: true}}>{prop} text</Text>
          </ThemeProvider>
        );

        const text = container.querySelector('p');
        expect(text).toHaveClass(expectedClass);
      });
    });

    it('should support font family variants', () => {
      const families = [
        { prop: 'sans', class: 'font-sans' },
        { prop: 'serif', class: 'font-serif' },
        { prop: 'mono', class: 'font-mono' }
      ] as const;

      families.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Text {...{[prop]: true}}>{prop} text</Text>
          </ThemeProvider>
        );

        const text = container.querySelector('p');
        expect(text).toHaveClass(expectedClass);
      });
    });

    it('should support text decoration variants', () => {
      const decorations = [
        { prop: 'underline', class: 'underline' },
        { prop: 'lineThrough', class: 'line-through' },
        { prop: 'overline', class: 'overline' },
        { prop: 'noUnderline', class: 'no-underline' }
      ] as const;

      decorations.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Text {...{[prop]: true}}>{prop} text</Text>
          </ThemeProvider>
        );

        const text = container.querySelector('p');
        expect(text).toHaveClass(expectedClass);
      });
    });

    it('should support text transform variants', () => {
      const transforms = [
        { prop: 'uppercase', class: 'uppercase' },
        { prop: 'lowercase', class: 'lowercase' },
        { prop: 'capitalize', class: 'capitalize' },
        { prop: 'normalCase', class: 'normal-case' }
      ] as const;

      transforms.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Text {...{[prop]: true}}>{prop} text</Text>
          </ThemeProvider>
        );

        const text = container.querySelector('p');
        expect(text).toHaveClass(expectedClass);
      });
    });

    it('should support text alignment variants', () => {
      const alignments = [
        { prop: 'textLeft', class: 'text-left' },
        { prop: 'textCenter', class: 'text-center' },
        { prop: 'textRight', class: 'text-right' },
        { prop: 'textJustify', class: 'text-justify' }
      ] as const;

      alignments.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Text {...{[prop]: true}}>{prop} text</Text>
          </ThemeProvider>
        );

        const text = container.querySelector('p');
        expect(text).toHaveClass(expectedClass);
      });
    });

    it('should support transparent text', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text transparent>Transparent text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('text-transparent');
    });

    it('should support link appearance', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text link>Link-styled text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('text-(--text-color-link)');
    });

    it('should support display variants', () => {
      const displays = [
        { prop: 'inline', class: 'inline' },
        { prop: 'block', class: 'block' },
        { prop: 'inlineBlock', class: 'inline-block' },
        { prop: 'flex', class: 'flex' },
        { prop: 'inlineFlex', class: 'inline-flex' },
        { prop: 'grid', class: 'grid' },
        { prop: 'hidden', class: 'hidden' }
      ] as const;

      displays.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Text {...{[prop]: true}}>{prop} text</Text>
          </ThemeProvider>
        );

        const text = container.querySelector('p');
        expect(text).toHaveClass(expectedClass);
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
            <Text {...{[prop]: true}}>{prop} text</Text>
          </ThemeProvider>
        );

        const text = container.querySelector('p');
        expect(text).toHaveClass(expectedClass);
      });
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text className="custom-text-class">Custom Text</Text>
        </ThemeProvider>
      );

      const text = container.querySelector('p');
      expect(text).toHaveClass('text-base', 'font-sans'); // theme classes
      expect(text).toHaveClass('custom-text-class'); // custom class
    });

    it('should support custom HTML tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text tag="span">Span Text</Text>
        </ThemeProvider>
      );

      const spanEl = container.querySelector('span');
      expect(spanEl).toBeInTheDocument();
      expect(spanEl).toHaveTextContent('Span Text');
    });
  });
});