import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
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
      expect(title).toHaveClass('text-2xl'); // md size for title
      expect(title).toHaveClass('text-(--text-color-default)'); // default appearance
      expect(title).toHaveClass('font-sans');
      expect(title).toHaveClass('font-semibold');
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
        { prop: 'xs', class: 'text-lg' },
        { prop: 'sm', class: 'text-xl' },
        { prop: 'md', class: 'text-2xl' },
        { prop: 'lg', class: 'text-3xl' },
        { prop: 'xl', class: 'text-4xl' }
      ] as const;

      sizes.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Title {...{[prop]: true}}>{prop} title</Title>
          </ThemeProvider>
        );

        const title = container.querySelector('h3');
        expect(title).toHaveClass(expectedClass);
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
        expect(title).toHaveClass(`text-(--text-color-${appearance})`);
      });
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
      expect(title).toHaveClass('text-2xl', 'font-semibold'); // theme classes
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
      expect(pageTitle).toHaveClass('text-5xl'); // md size for page title
      expect(pageTitle).toHaveClass('text-(--text-color-default)'); // default appearance
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
        { prop: 'xs', class: 'text-3xl' },
        { prop: 'sm', class: 'text-4xl' },
        { prop: 'md', class: 'text-5xl' },
        { prop: 'lg', class: 'text-6xl' },
        { prop: 'xl', class: 'text-7xl' }
      ] as const;

      sizes.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <PageTitle {...{[prop]: true}}>{prop} page title</PageTitle>
          </ThemeProvider>
        );

        const pageTitle = container.querySelector('h1');
        expect(pageTitle).toHaveClass(expectedClass);
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
        expect(pageTitle).toHaveClass(`text-(--text-color-${appearance})`);
      });
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
      expect(pageTitle).toHaveClass('text-5xl', 'font-semibold', 'tracking-tight'); // theme classes
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
      expect(sectionTitle).toHaveClass('text-4xl'); // md size for section title
      expect(sectionTitle).toHaveClass('text-(--text-color-default)'); // default appearance
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
        { prop: 'xs', class: 'text-2xl' },
        { prop: 'sm', class: 'text-3xl' },
        { prop: 'md', class: 'text-4xl' },
        { prop: 'lg', class: 'text-5xl' },
        { prop: 'xl', class: 'text-6xl' }
      ] as const;

      sizes.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <SectionTitle {...{[prop]: true}}>{prop} section title</SectionTitle>
          </ThemeProvider>
        );

        const sectionTitle = container.querySelector('h2');
        expect(sectionTitle).toHaveClass(expectedClass);
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
        expect(sectionTitle).toHaveClass(`text-(--text-color-${appearance})`);
      });
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
      expect(sectionTitle).toHaveClass('text-4xl', 'font-semibold'); // theme classes
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
  });
});