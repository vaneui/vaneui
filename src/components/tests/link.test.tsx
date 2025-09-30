import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Link,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Link Component Tests', () => {

  describe('Link Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test">Link content</Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass('hover:underline', 'w-fit');
      expect(link).not.toHaveClass('text-base'); // no default size
      expect(link).toHaveClass('text-(--color-text-link)'); // link appearance by default
      expect(link).toHaveClass('font-sans');
      expect(link).toHaveAttribute('href', '#test');
    });

    it('should apply overflow props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" overflowHidden>Link with overflow hidden</Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toHaveClass('overflow-hidden');
    });

    it('should support absolute positioning', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" absolute>Absolute positioned link</Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toHaveClass('absolute');
    });

    it('should support different sizes', () => {
      const sizes = [
        { prop: 'xs', unitClass: '[--fs-unit:6]' }, // 0.75rem = 6 * 0.125rem
        { prop: 'sm', unitClass: '[--fs-unit:7]' }, // 0.875rem = 7 * 0.125rem
        { prop: 'md', unitClass: '[--fs-unit:8]' }, // 1rem = 8 * 0.125rem
        { prop: 'lg', unitClass: '[--fs-unit:9]' }, // 1.125rem = 9 * 0.125rem
        { prop: 'xl', unitClass: '[--fs-unit:10]' } // 1.25rem = 10 * 0.125rem
      ] as const;

      sizes.forEach(({prop, unitClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Link href="#test" {...{[prop]: true}}>{prop} link</Link>
          </ThemeProvider>
        );

        const link = container.querySelector('a');
        expect(link).toHaveClass(unitClass);
        // Note: text-(--fs) class conflicts with text-(--color-text-link) for Link components
        // The font size is still applied via the CSS variable, but the utility class is not present
      });
    });

    it('should apply appearance props to change text color', () => {
      const appearances = ['primary', 'secondary', 'accent', 'success', 'danger', 'warning', 'info'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Link href="#test" {...{[appearance]: true}}>{appearance} link</Link>
          </ThemeProvider>
        );

        const link = container.querySelector('a');
        // Link should use the specified appearance color
        expect(link).toHaveClass(`text-(--color-text-${appearance})`);
        expect(link).not.toHaveClass('text-(--color-text-link)');
      });
    });

    it('should support filled and outline variants', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" primary outline>Outline link</Link>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" primary filled>Filled link</Link>
        </ThemeProvider>
      );

      const outlineLink = outlineContainer.querySelector('a');
      const filledLink = filledContainer.querySelector('a');

      expect(outlineLink).toHaveClass('text-(--color-text-primary)');
      expect(filledLink).toHaveClass('text-(--color-text-filled-primary)');
    });

    it('should use link appearance by default when no appearance prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test">Default link</Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      // Link without appearance props should use link appearance by default
      expect(link).toHaveClass('text-(--color-text-link)');
    });

    it('should support all overflow variants', () => {
      const overflowOptions = [
        { prop: 'overflowAuto', class: 'overflow-auto' },
        { prop: 'overflowHidden', class: 'overflow-hidden' },
        { prop: 'overflowClip', class: 'overflow-clip' },
        { prop: 'overflowVisible', class: 'overflow-visible' },
        { prop: 'overflowScroll', class: 'overflow-scroll' },
        { prop: 'overflowXAuto', class: 'overflow-x-auto' },
        { prop: 'overflowYAuto', class: 'overflow-y-auto' },
        { prop: 'overflowXHidden', class: 'overflow-x-hidden' },
        { prop: 'overflowYHidden', class: 'overflow-y-hidden' }
      ] as const;

      overflowOptions.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Link href="#test" {...{[prop]: true}}>{prop} link</Link>
          </ThemeProvider>
        );

        const link = container.querySelector('a');
        expect(link).toHaveClass(expectedClass);
      });
    });

    it('should support all position variants', () => {
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
            <Link href="#test" {...{[prop]: true}}>{prop} link</Link>
          </ThemeProvider>
        );

        const link = container.querySelector('a');
        expect(link).toHaveClass(expectedClass);
      });
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
            <Link href="#test" {...{[prop]: true}}>{prop} link</Link>
          </ThemeProvider>
        );

        const link = container.querySelector('a');
        expect(link).toHaveClass(expectedClass);
      });
    });

    it('should support flex alignment properties', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" flex itemsCenter justifyBetween>
            Flex Link
          </Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toHaveClass('flex', 'items-center', 'justify-between');
    });

    it('should support font properties', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" bold serif uppercase underline>
            Styled Link
          </Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toHaveClass('font-bold', 'font-serif', 'uppercase', 'underline');
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
            <Link href="#test" {...{[prop]: true}}>{prop} link</Link>
          </ThemeProvider>
        );

        const link = container.querySelector('a');
        expect(link).toHaveClass(expectedClass);
      });
    });

    it('should support hide breakpoints', () => {
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
            <Link href="#test" {...{[prop]: true}}>{prop} link</Link>
          </ThemeProvider>
        );

        const link = container.querySelector('a');
        expect(link).toHaveClass(expectedClass);
      });
    });

    it('should support transparent appearance', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" transparent>Transparent Link</Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toHaveClass('text-transparent');
    });

    it('should handle external links', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="https://example.com">External Link</Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('should support mailto links', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="mailto:test@example.com">Email Link</Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toHaveAttribute('href', 'mailto:test@example.com');
    });

    it('should support target and rel attributes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
            External Link
          </Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" className="custom-link-class">Custom Link</Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toHaveClass('hover:underline'); // theme classes (no default color)
      expect(link).toHaveClass('custom-link-class'); // custom class
    });

    it('should support custom HTML tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link tag="button">Button Link</Link>
        </ThemeProvider>
      );

      const buttonEl = container.querySelector('button');
      expect(buttonEl).toBeInTheDocument();
      expect(buttonEl).toHaveTextContent('Button Link');
    });

    it('should work without href attribute', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link>Link without href</Link>
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).not.toHaveAttribute('href');
    });
  });
});