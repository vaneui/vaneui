import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  ThemeProps,
  Link,
  ThemeProvider,
  defaultTheme,
  ExternalLinkIcon
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
      expect(link).toHaveClass('text-(length:--fs)'); // font size - NOT conflicting with text color
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
        expect(link).toHaveClass('text-(length:--fs)'); // font size - NOT conflicting with text color
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

  describe('Width Props', () => {
    it('should apply wFull class for full width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" wFull>Content</Link>
        </ThemeProvider>
      );
      const el = container.querySelector('a');
      expect(el).toHaveClass('w-full');
    });

    it('should apply wFit class for fit-content width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" wFit>Content</Link>
        </ThemeProvider>
      );
      const el = container.querySelector('a');
      expect(el).toHaveClass('w-fit');
    });

    it('should apply wAuto class for auto width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" wAuto>Content</Link>
        </ThemeProvider>
      );
      const el = container.querySelector('a');
      expect(el).toHaveClass('w-auto');
    });
  });

  describe('Height Props', () => {
    it('should apply hFull class for full height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" hFull>Content</Link>
        </ThemeProvider>
      );
      const el = container.querySelector('a');
      expect(el).toHaveClass('h-full');
    });

    it('should apply hFit class for fit-content height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" hFit>Content</Link>
        </ThemeProvider>
      );
      const el = container.querySelector('a');
      expect(el).toHaveClass('h-fit');
    });

    it('should apply hAuto class for auto height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Link href="#test" hAuto>Content</Link>
        </ThemeProvider>
      );
      const el = container.querySelector('a');
      expect(el).toHaveClass('h-auto');
    });
  });
});
describe('Link Theme Override Tests', () => {
  it('should allow overriding outline text class via themeOverride', () => {
    const overrideFunc = (theme: ThemeProps) => {
      theme.link.main.themes.appearance.text.outline = 'text-custom-link-color';
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
      theme.link.main.themes.appearance.text.filled = 'text-custom-filled-link';
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
      theme.link.main.themes.appearance.text.outline = 'text-purple-600';
      theme.link.main.themes.appearance.text.filled = 'text-purple-100';
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

describe('External Link Behavior', () => {
  it('external sets target="_blank" and rel="noopener noreferrer"', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="https://example.com" external>External</Link>
      </ThemeProvider>
    );

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('external renders SVG icon inside .vane-link-end-icon wrapper', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="https://example.com" external>External</Link>
      </ThemeProvider>
    );

    const wrapper = container.querySelector('a > .vane-link-end-icon');
    expect(wrapper).toBeInTheDocument();

    const svg = wrapper?.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('icon wrapper is inline (not inline-flex) so parent underline propagates', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="https://example.com" external>External</Link>
      </ThemeProvider>
    );

    const wrapper = container.querySelector('a > .vane-link-end-icon');
    expect(wrapper).toBeInTheDocument();
    // inline-flex + items-center for vertical centering, height matched to line-height
    expect(wrapper).toHaveClass('inline-flex');
    expect(wrapper).toHaveClass('items-center');
    expect(wrapper).toHaveClass('h-[calc(var(--lh)*var(--fs))]');
  });

  it('does not render icon without external', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="https://example.com">Normal</Link>
      </ThemeProvider>
    );

    const svg = container.querySelector('a svg');
    expect(svg).toBeNull();
  });

  it('preserves explicit target over external default', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="https://example.com" external target="_self">External</Link>
      </ThemeProvider>
    );

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('target', '_self');
    // No auto-rel when target is not _blank
    expect(link).not.toHaveAttribute('rel');
  });

  it('preserves explicit rel over auto-rel', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="https://example.com" external rel="nofollow">External</Link>
      </ThemeProvider>
    );

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'nofollow');
  });

  it('auto-injects rel when target="_blank" without external', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="https://example.com" target="_blank">Blank target</Link>
      </ThemeProvider>
    );

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('respects explicit rel with target="_blank" without external', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="https://example.com" target="_blank" rel="nofollow">Link</Link>
      </ThemeProvider>
    );

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('rel', 'nofollow');
  });

  it('does not leak external prop to DOM', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="https://example.com" external>External</Link>
      </ThemeProvider>
    );

    const link = container.querySelector('a');
    expect(link).not.toHaveAttribute('external');
  });

  it('does not leak startIcon or endIcon props to DOM', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="https://example.com" startIcon={<span>s</span>} endIcon={<span>e</span>}>
          Link
        </Link>
      </ThemeProvider>
    );

    const link = container.querySelector('a');
    expect(link).not.toHaveAttribute('startIcon');
    expect(link).not.toHaveAttribute('starticon');
    expect(link).not.toHaveAttribute('endIcon');
    expect(link).not.toHaveAttribute('endicon');
  });

  it('ExternalLinkIcon is exported and renders bare SVG', () => {
    const { container } = render(
      <ExternalLinkIcon />
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    // No span wrapper — bare SVG
    expect(container.querySelector('span')).toBeNull();
  });
});

describe('startIcon and endIcon', () => {
  it('renders startIcon before link text', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="#test" startIcon={<span data-testid="start">S</span>}>
          Link text
        </Link>
      </ThemeProvider>
    );

    const wrapper = container.querySelector('a > .vane-link-start-icon');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.querySelector('[data-testid="start"]')).toBeInTheDocument();

    // Start icon should come before the text
    const link = container.querySelector('a')!;
    const children = Array.from(link.childNodes);
    const startIdx = children.findIndex(n => (n as Element).classList?.contains('vane-link-start-icon'));
    const textIdx = children.findIndex(n => n.textContent?.includes('Link text') && !(n as Element).classList);
    expect(startIdx).toBeLessThan(textIdx);
  });

  it('renders endIcon after link text', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="#test" endIcon={<span data-testid="end">E</span>}>
          Link text
        </Link>
      </ThemeProvider>
    );

    const wrapper = container.querySelector('a > .vane-link-end-icon');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.querySelector('[data-testid="end"]')).toBeInTheDocument();
  });

  it('renders both startIcon and endIcon simultaneously', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link
          href="#test"
          startIcon={<span data-testid="start">S</span>}
          endIcon={<span data-testid="end">E</span>}
        >
          Link text
        </Link>
      </ThemeProvider>
    );

    expect(container.querySelector('.vane-link-start-icon')).toBeInTheDocument();
    expect(container.querySelector('.vane-link-end-icon')).toBeInTheDocument();

    // Ordering: startIcon, text, endIcon
    const link = container.querySelector('a')!;
    const html = link.innerHTML;
    const startPos = html.indexOf('vane-link-start-icon');
    const endPos = html.indexOf('vane-link-end-icon');
    expect(startPos).toBeLessThan(endPos);
  });

  it('endIcon overrides external default icon', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="https://example.com" external endIcon={<span data-testid="custom-end">custom</span>}>
          External
        </Link>
      </ThemeProvider>
    );

    const wrapper = container.querySelector('a > .vane-link-end-icon');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.querySelector('[data-testid="custom-end"]')).toBeInTheDocument();
    // Should NOT have the default SVG icon
    expect(wrapper?.querySelector('svg')).toBeNull();
  });

  it('endIcon={null} suppresses external icon', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="https://example.com" external endIcon={null}>
          External no icon
        </Link>
      </ThemeProvider>
    );

    // No icon wrappers at all
    expect(container.querySelector('.vane-link-end-icon')).toBeNull();
    expect(container.querySelector('.vane-link-start-icon')).toBeNull();
  });

  it('does not render icon wrappers when no icons provided', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="#test">Plain link</Link>
      </ThemeProvider>
    );

    expect(container.querySelector('.vane-link-start-icon')).toBeNull();
    expect(container.querySelector('.vane-link-end-icon')).toBeNull();
  });

  it('icon wrapper renders as span element', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Link href="#test" startIcon={<span>icon</span>}>Link</Link>
      </ThemeProvider>
    );

    const wrapper = container.querySelector('.vane-link-start-icon');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.tagName).toBe('SPAN');
  });
});
