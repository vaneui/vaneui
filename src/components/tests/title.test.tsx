import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Title,
  PageTitle,
  SectionTitle,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Title Components Tests', () => {

  describe('Title Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title>Title content</Title>
        </ThemeProvider>
      );

      const title = container.querySelector('h3');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('text-balance', 'w-fit');
      expect(title).toHaveClass('[--fs-unit:12] max-laptop:[--fs-unit:11] max-tablet:[--fs-unit:10]'); // md size for title with responsive scaling
      expect(title).toHaveClass('text-(length:--fs)'); // CSS variable font size
      expect(title).not.toHaveClass('text-(--color-text-default)'); // no default appearance
      expect(title).toHaveClass('font-sans');
      expect(title).toHaveClass('font-semibold');
    });

    it('should render as anchor when href prop is provided', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title href="/title-link">Clickable Title</Title>
        </ThemeProvider>
      );

      const anchor = container.querySelector('a');
      const heading = container.querySelector('h3');
      
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/title-link');
      expect(anchor).toHaveTextContent('Clickable Title');
      expect(heading).not.toBeInTheDocument();
    });

    it('should apply position layout props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title relative>Title with relative position</Title>
        </ThemeProvider>
      );

      const title = container.querySelector('h3');
      expect(title).toHaveClass('relative');
    });

    it('should support grid display', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title grid>Grid title</Title>
        </ThemeProvider>
      );

      const title = container.querySelector('h3');
      expect(title).toHaveClass('grid');
    });

    it('should support different sizes', () => {
      const sizes = [
        { prop: 'xs', unitClass: '[--fs-unit:9] max-laptop:[--fs-unit:8] max-tablet:[--fs-unit:7]', textClass: 'text-(length:--fs)' },  // text-lg with responsive scaling
        { prop: 'sm', unitClass: '[--fs-unit:10] max-laptop:[--fs-unit:9] max-tablet:[--fs-unit:8]', textClass: 'text-(length:--fs)' }, // text-xl with responsive scaling
        { prop: 'md', unitClass: '[--fs-unit:12] max-laptop:[--fs-unit:11] max-tablet:[--fs-unit:10]', textClass: 'text-(length:--fs)' }, // text-2xl with responsive scaling
        { prop: 'lg', unitClass: '[--fs-unit:15] max-laptop:[--fs-unit:14] max-tablet:[--fs-unit:13]', textClass: 'text-(length:--fs)' }, // text-3xl with responsive scaling
        { prop: 'xl', unitClass: '[--fs-unit:18] max-laptop:[--fs-unit:17] max-tablet:[--fs-unit:16]', textClass: 'text-(length:--fs)' }  // text-4xl with responsive scaling
      ] as const;

      sizes.forEach(({prop, unitClass, textClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Title {...{[prop]: true}}>{prop} title</Title>
          </ThemeProvider>
        );

        const title = container.querySelector('h3');
        expect(title).toHaveClass(unitClass);
        expect(title).toHaveClass(textClass);
      });
    });

    it('should support appearance variants', () => {
      const appearances = ['primary', 'secondary', 'accent', 'success', 'danger'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Title {...{[appearance]: true}}>{appearance} title</Title>
          </ThemeProvider>
        );

        const title = container.querySelector('h3');
        expect(title).toHaveClass(`text-(--color-text-${appearance})`);
      });
    });

    it('should support filled and outline variants', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title primary outline>Outline title</Title>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title primary filled>Filled title</Title>
        </ThemeProvider>
      );

      const outlineTitle = outlineContainer.querySelector('h3');
      const filledTitle = filledContainer.querySelector('h3');

      expect(outlineTitle).toHaveClass('text-(--color-text-primary)');
      expect(filledTitle).toHaveClass('text-(--color-text-filled-primary)');
    });

    it('should support flex and alignment props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title flex itemsCenter justifyBetween>
            Flex Title
          </Title>
        </ThemeProvider>
      );

      const title = container.querySelector('h3');
      expect(title).toHaveClass('flex', 'items-center', 'justify-between');
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title className="custom-title-class">Custom Title</Title>
        </ThemeProvider>
      );

      const title = container.querySelector('h3');
      expect(title).toHaveClass('[--fs-unit:12] max-laptop:[--fs-unit:11] max-tablet:[--fs-unit:10]', 'text-(length:--fs)', 'font-semibold'); // theme classes with responsive sizing
      expect(title).toHaveClass('custom-title-class'); // custom class
    });

    it('should support custom HTML tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title tag="h4">H4 Title</Title>
        </ThemeProvider>
      );

      const h4El = container.querySelector('h4');
      expect(h4El).toBeInTheDocument();
      expect(h4El).toHaveTextContent('H4 Title');
    });
  });

  describe('PageTitle Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <PageTitle>Page Title</PageTitle>
        </ThemeProvider>
      );

      const pageTitle = container.querySelector('h1');
      expect(pageTitle).toBeInTheDocument();
      expect(pageTitle).toHaveClass('text-balance', 'tracking-tight', 'w-fit');
      expect(pageTitle).toHaveClass('[--fs-unit:24] max-laptop:[--fs-unit:21] max-tablet:[--fs-unit:18]'); // md size for page title with responsive scaling
      expect(pageTitle).toHaveClass('text-(length:--fs)'); // CSS variable font size
      expect(pageTitle).not.toHaveClass('text-(--color-text-default)'); // no default appearance
      expect(pageTitle).toHaveClass('font-sans');
      expect(pageTitle).toHaveClass('font-semibold');
    });

    it('should apply flex items alignment props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <PageTitle flex itemsCenter>Page Title with items center</PageTitle>
        </ThemeProvider>
      );

      const pageTitle = container.querySelector('h1');
      expect(pageTitle).toHaveClass('flex', 'items-center');
    });

    it('should support different sizes', () => {
      const sizes = [
        { prop: 'xs', unitClass: '[--fs-unit:15] max-laptop:[--fs-unit:12] max-tablet:[--fs-unit:9]', textClass: 'text-(length:--fs)' }, // text-3xl with responsive scaling
        { prop: 'sm', unitClass: '[--fs-unit:18] max-laptop:[--fs-unit:15] max-tablet:[--fs-unit:12]', textClass: 'text-(length:--fs)' }, // text-4xl with responsive scaling
        { prop: 'md', unitClass: '[--fs-unit:24] max-laptop:[--fs-unit:21] max-tablet:[--fs-unit:18]', textClass: 'text-(length:--fs)' }, // text-5xl with responsive scaling
        { prop: 'lg', unitClass: '[--fs-unit:30] max-laptop:[--fs-unit:27] max-tablet:[--fs-unit:24]', textClass: 'text-(length:--fs)' }, // text-6xl with responsive scaling
        { prop: 'xl', unitClass: '[--fs-unit:36] max-laptop:[--fs-unit:33] max-tablet:[--fs-unit:30]', textClass: 'text-(length:--fs)' }  // text-7xl with responsive scaling
      ] as const;

      sizes.forEach(({prop, unitClass, textClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <PageTitle {...{[prop]: true}}>{prop} page title</PageTitle>
          </ThemeProvider>
        );

        const pageTitle = container.querySelector('h1');
        expect(pageTitle).toHaveClass(unitClass);
        expect(pageTitle).toHaveClass(textClass);
      });
    });

    it('should support appearance variants', () => {
      const appearances = ['primary', 'secondary', 'accent', 'success', 'danger'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <PageTitle {...{[appearance]: true}}>{appearance} page title</PageTitle>
          </ThemeProvider>
        );

        const pageTitle = container.querySelector('h1');
        expect(pageTitle).toHaveClass(`text-(--color-text-${appearance})`);
      });
    });

    it('should support filled and outline variants for PageTitle', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <PageTitle primary outline>Outline page title</PageTitle>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <PageTitle primary filled>Filled page title</PageTitle>
        </ThemeProvider>
      );

      const outlineTitle = outlineContainer.querySelector('h1');
      const filledTitle = filledContainer.querySelector('h1');

      expect(outlineTitle).toHaveClass('text-(--color-text-primary)');
      expect(filledTitle).toHaveClass('text-(--color-text-filled-primary)');
    });

    it('should support layout positioning', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <PageTitle relative>Positioned Page Title</PageTitle>
        </ThemeProvider>
      );

      const pageTitle = container.querySelector('h1');
      expect(pageTitle).toHaveClass('relative');
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <PageTitle className="custom-page-title-class">Custom Page Title</PageTitle>
        </ThemeProvider>
      );

      const pageTitle = container.querySelector('h1');
      expect(pageTitle).toHaveClass('[--fs-unit:24] max-laptop:[--fs-unit:21] max-tablet:[--fs-unit:18]', 'text-(length:--fs)', 'font-semibold', 'tracking-tight'); // theme classes with responsive sizing
      expect(pageTitle).toHaveClass('custom-page-title-class'); // custom class
    });

    it('should support custom HTML tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <PageTitle tag="h2">H2 Page Title</PageTitle>
        </ThemeProvider>
      );

      const h2El = container.querySelector('h2');
      expect(h2El).toBeInTheDocument();
      expect(h2El).toHaveTextContent('H2 Page Title');
    });
  });

  describe('SectionTitle Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <SectionTitle>Section Title</SectionTitle>
        </ThemeProvider>
      );

      const sectionTitle = container.querySelector('h2');
      expect(sectionTitle).toBeInTheDocument();
      expect(sectionTitle).toHaveClass('text-balance', 'w-fit');
      expect(sectionTitle).toHaveClass('[--fs-unit:18] max-laptop:[--fs-unit:16] max-tablet:[--fs-unit:14]'); // md size for section title with responsive scaling
      expect(sectionTitle).toHaveClass('text-(length:--fs)'); // CSS variable font size
      expect(sectionTitle).not.toHaveClass('text-(--color-text-default)'); // no default appearance
      expect(sectionTitle).toHaveClass('font-sans');
      expect(sectionTitle).toHaveClass('font-semibold');
    });

    it('should apply justify content props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <SectionTitle flex justifyCenter>Section Title with justify center</SectionTitle>
        </ThemeProvider>
      );

      const sectionTitle = container.querySelector('h2');
      expect(sectionTitle).toHaveClass('flex', 'justify-center');
    });

    it('should support different sizes', () => {
      const sizes = [
        { prop: 'xs', unitClass: '[--fs-unit:12] max-laptop:[--fs-unit:10] max-tablet:[--fs-unit:8]', textClass: 'text-(length:--fs)' }, // text-2xl with responsive scaling
        { prop: 'sm', unitClass: '[--fs-unit:15] max-laptop:[--fs-unit:13] max-tablet:[--fs-unit:11]', textClass: 'text-(length:--fs)' }, // text-3xl with responsive scaling
        { prop: 'md', unitClass: '[--fs-unit:18] max-laptop:[--fs-unit:16] max-tablet:[--fs-unit:14]', textClass: 'text-(length:--fs)' }, // text-4xl with responsive scaling
        { prop: 'lg', unitClass: '[--fs-unit:24] max-laptop:[--fs-unit:22] max-tablet:[--fs-unit:20]', textClass: 'text-(length:--fs)' }, // text-5xl with responsive scaling
        { prop: 'xl', unitClass: '[--fs-unit:30] max-laptop:[--fs-unit:28] max-tablet:[--fs-unit:26]', textClass: 'text-(length:--fs)' }  // text-6xl with responsive scaling
      ] as const;

      sizes.forEach(({prop, unitClass, textClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <SectionTitle {...{[prop]: true}}>{prop} section title</SectionTitle>
          </ThemeProvider>
        );

        const sectionTitle = container.querySelector('h2');
        expect(sectionTitle).toHaveClass(unitClass);
        expect(sectionTitle).toHaveClass(textClass);
      });
    });

    it('should support appearance variants', () => {
      const appearances = ['primary', 'secondary', 'accent', 'warning', 'info'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <SectionTitle {...{[appearance]: true}}>{appearance} section title</SectionTitle>
          </ThemeProvider>
        );

        const sectionTitle = container.querySelector('h2');
        expect(sectionTitle).toHaveClass(`text-(--color-text-${appearance})`);
      });
    });

    it('should support filled and outline variants for SectionTitle', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <SectionTitle primary outline>Outline section title</SectionTitle>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <SectionTitle primary filled>Filled section title</SectionTitle>
        </ThemeProvider>
      );

      const outlineTitle = outlineContainer.querySelector('h2');
      const filledTitle = filledContainer.querySelector('h2');

      expect(outlineTitle).toHaveClass('text-(--color-text-primary)');
      expect(filledTitle).toHaveClass('text-(--color-text-filled-primary)');
    });

    it('should support all justify variants', () => {
      const justifyOptions = [
        { prop: 'justifyStart', class: 'justify-start' },
        { prop: 'justifyEnd', class: 'justify-end' },
        { prop: 'justifyCenter', class: 'justify-center' },
        { prop: 'justifyBetween', class: 'justify-between' },
        { prop: 'justifyAround', class: 'justify-around' },
        { prop: 'justifyEvenly', class: 'justify-evenly' }
      ] as const;

      justifyOptions.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <SectionTitle flex {...{[prop]: true}}>{prop} section title</SectionTitle>
          </ThemeProvider>
        );

        const sectionTitle = container.querySelector('h2');
        expect(sectionTitle).toHaveClass('flex', expectedClass);
      });
    });

    it('should support display variants', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <SectionTitle grid>Grid Section Title</SectionTitle>
        </ThemeProvider>
      );

      const sectionTitle = container.querySelector('h2');
      expect(sectionTitle).toHaveClass('grid');
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <SectionTitle className="custom-section-title-class">Custom Section Title</SectionTitle>
        </ThemeProvider>
      );

      const sectionTitle = container.querySelector('h2');
      expect(sectionTitle).toHaveClass('[--fs-unit:18] max-laptop:[--fs-unit:16] max-tablet:[--fs-unit:14]', 'text-(length:--fs)', 'font-semibold'); // theme classes with responsive sizing
      expect(sectionTitle).toHaveClass('custom-section-title-class'); // custom class
    });

    it('should support custom HTML tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <SectionTitle tag="h3">H3 Section Title</SectionTitle>
        </ThemeProvider>
      );

      const h3El = container.querySelector('h3');
      expect(h3El).toBeInTheDocument();
      expect(h3El).toHaveTextContent('H3 Section Title');
    });

    it('should apply correct line height based on text size for Title', () => {
      const sizes = [
        { prop: 'xs', fontSizeUnit: '[--fs-unit:9] max-laptop:[--fs-unit:8] max-tablet:[--fs-unit:7]', fontSizeClass: 'text-(length:--fs)', lhUnitClass: '[--lh:1.556]', lineHeightClass: 'leading-(--lh)' },  // text-lg with responsive scaling
        { prop: 'sm', fontSizeUnit: '[--fs-unit:10] max-laptop:[--fs-unit:9] max-tablet:[--fs-unit:8]', fontSizeClass: 'text-(length:--fs)', lhUnitClass: '[--lh:1.4]', lineHeightClass: 'leading-(--lh)' }, // text-xl with responsive scaling
        { prop: 'md', fontSizeUnit: '[--fs-unit:12] max-laptop:[--fs-unit:11] max-tablet:[--fs-unit:10]', fontSizeClass: 'text-(length:--fs)', lhUnitClass: '[--lh:1.333]', lineHeightClass: 'leading-(--lh)' }, // text-2xl with responsive scaling
        { prop: 'lg', fontSizeUnit: '[--fs-unit:15] max-laptop:[--fs-unit:14] max-tablet:[--fs-unit:13]', fontSizeClass: 'text-(length:--fs)', lhUnitClass: '[--lh:1.2]', lineHeightClass: 'leading-(--lh)' }, // text-3xl with responsive scaling
        { prop: 'xl', fontSizeUnit: '[--fs-unit:18] max-laptop:[--fs-unit:17] max-tablet:[--fs-unit:16]', fontSizeClass: 'text-(length:--fs)', lhUnitClass: '[--lh:1.111]', lineHeightClass: 'leading-(--lh)' } // text-4xl with responsive scaling
      ] as const;

      sizes.forEach(({prop, fontSizeUnit, fontSizeClass, lhUnitClass, lineHeightClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Title {...(prop === 'md' ? {} : {[prop]: true})}>
              {prop} title with line height
            </Title>
          </ThemeProvider>
        );

        const title = container.querySelector('h3');
        expect(title).toHaveClass(fontSizeUnit);
        expect(title).toHaveClass(fontSizeClass);
        expect(title).toHaveClass(lhUnitClass);
        expect(title).toHaveClass(lineHeightClass);
      });
    });
  });
});