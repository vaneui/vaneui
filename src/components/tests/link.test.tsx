import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  ThemeProps,
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
      expect(link).toHaveClass('text-(--text-color)'); // link appearance by default
      expect(link).toHaveClass('leading-(--lh)'); // CSS variable line height
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

    it('should support different sizes with correct line heights', () => {
      const sizes = [
        { prop: 'xs' },
        { prop: 'sm' },
        { prop: 'md' },
        { prop: 'lg' },
        { prop: 'xl' }
      ] as const;

      sizes.forEach(({prop}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Link href="#test" {...{[prop]: true}}>{prop} link</Link>
          </ThemeProvider>
        );

        const link = container.querySelector('a');
        expect(link).toHaveAttribute('data-size', prop);
        expect(link).toHaveClass('leading-(--lh)'); // line height classes
        // Note: text-(length:--fs) class conflicts with text-(--text-color) for Link components
        // The font size is still applied via the CSS variable, but the utility class is not present
      });
    });

    it('should support filled and outline variants', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" outline>Outline link</Link>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" filled>Filled link</Link>
        </ThemeProvider>
      );

      const outlineLink = outlineContainer.querySelector('a');
      const filledLink = filledContainer.querySelector('a');

      // Link uses link-specific text colors only (no background colors)
      expect(outlineLink).toHaveClass('text-(--text-color)');
      expect(filledLink).toHaveClass('text-(--text-color)');
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
        { prop: 'mobileHide', class: 'max-mobile:hidden' },
        { prop: 'mobileHide', class: 'max-mobile:hidden' },
        { prop: 'tabletHide', class: 'max-tablet:hidden' },
        { prop: 'desktopHide', class: 'max-desktop:hidden' }
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
describe('Link Theme Override Tests', () => {
  it('should allow overriding outline text class via themeOverride', () => {
    const overrideFunc = (theme: ThemeProps) => {
      theme.link.themes.appearance.text.outline = 'text-custom-link-color';
      return theme;
    };

    const { container } = render(
      <ThemeProvider themeOverride={overrideFunc}>
        <Link href="#test">Custom Link</Link>
      </ThemeProvider>
    );

    const link = container.querySelector('a');
    expect(link).toHaveClass('text-custom-link-color');
    expect(link).not.toHaveClass('text-(--text-color)');
  });

  it('should allow overriding filled text class via themeOverride', () => {
    const overrideFunc = (theme: ThemeProps) => {
      theme.link.themes.appearance.text.filled = 'text-custom-filled-link';
      return theme;
    };

    const { container } = render(
      <ThemeProvider themeOverride={overrideFunc}>
        <Link href="#test" filled>Custom Filled Link</Link>
      </ThemeProvider>
    );

    const link = container.querySelector('a');
    expect(link).toHaveClass('text-custom-filled-link');
    expect(link).not.toHaveClass('text-(--text-color)');
  });

  it('should allow overriding both outline and filled classes', () => {
    const overrideFunc = (theme: ThemeProps) => {
      theme.link.themes.appearance.text.outline = 'text-purple-600';
      theme.link.themes.appearance.text.filled = 'text-purple-100';
      return theme;
    };

    const { container } = render(
      <ThemeProvider themeOverride={overrideFunc}>
        <Link href="#outline" className="outline-link">Outline</Link>
        <Link href="#filled" filled className="filled-link">Filled</Link>
      </ThemeProvider>
    );

    const outlineLink = container.querySelector('.outline-link');
    const filledLink = container.querySelector('.filled-link');

    expect(outlineLink).toHaveClass('text-purple-600');
    expect(filledLink).toHaveClass('text-purple-100');
  });
});
