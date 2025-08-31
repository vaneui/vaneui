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
      expect(text).not.toHaveClass('text-(--text-color-default)'); // no default appearance
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

    it('should support filled and outline variants', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text primary outline>Outline text</Text>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text primary filled>Filled text</Text>
        </ThemeProvider>
      );

      const outlineText = outlineContainer.querySelector('p');
      const filledText = filledContainer.querySelector('p');

      expect(outlineText).toHaveClass('text-(--text-color-primary)');
      expect(filledText).toHaveClass('text-(--filled-text-color-primary)');
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
      expect(text).toHaveClass('text-base', 'font-sans'); // theme classes (no default color)
      expect(text).toHaveClass('custom-text-class'); // custom class
    });

    it('should render as paragraph by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Text>Default Text</Text>
        </ThemeProvider>
      );

      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveTextContent('Default Text');
    });
  });

  describe('Text as link', () => {
    it('should render as anchor tag when href prop is provided', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text href="/test-link">Link text</Text>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      const paragraph = container.querySelector('p');
      
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/test-link');
      expect(anchor).toHaveTextContent('Link text');
      expect(paragraph).not.toBeInTheDocument();
    });

    it('should render as paragraph tag when href prop is not provided', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text>Regular text</Text>
        </ThemeProvider>
      );

      const paragraph = container.querySelector('p');
      const anchor = container.querySelector('a');
      
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveTextContent('Regular text');
      expect(anchor).not.toBeInTheDocument();
    });

    it('should support anchor-specific attributes when href is present', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text href="/external" target="_blank" rel="noopener">
            External link
          </Text>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/external');
      expect(anchor).toHaveAttribute('target', '_blank');
      expect(anchor).toHaveAttribute('rel', 'noopener');
    });

    it('should maintain theme classes when used as link', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Text href="/styled-link" primary semibold lg>
            Styled link text
          </Text>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveClass('text-(--text-color-primary)'); // primary color
      expect(anchor).toHaveClass('font-semibold'); // font weight
      expect(anchor).toHaveClass('text-lg'); // size
      expect(anchor).toHaveClass('font-sans'); // default font family
    });
  });
});