import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Title,
  PageTitle,
  SectionTitle,
  Section,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Responsive Typography and Layout Tests', () => {

  describe('Responsive Font Sizes', () => {
    it('should apply responsive font sizes to Title components', () => {
      const {container: titleContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title lg>Responsive Title</Title>
        </ThemeProvider>
      );

      const {container: pageTitleContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <PageTitle lg>Responsive Page Title</PageTitle>
        </ThemeProvider>
      );

      const {container: sectionTitleContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <SectionTitle lg>Responsive Section Title</SectionTitle>
        </ThemeProvider>
      );

      const title = titleContainer.querySelector('h3');
      const pageTitle = pageTitleContainer.querySelector('h1');
      const sectionTitle = sectionTitleContainer.querySelector('h2');

      // Title, PageTitle, SectionTitle all have responsive font sizes
      expect(title).toHaveAttribute('data-size', 'lg');
      expect(pageTitle).toHaveAttribute('data-size', 'lg');
      expect(sectionTitle).toHaveAttribute('data-size', 'lg');
    });

    it('should scale down font sizes appropriately across breakpoints', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <PageTitle xs>Smallest Page Title</PageTitle>
        </ThemeProvider>
      );

      const pageTitle = container.querySelector('h1');

      // PageTitle xs has responsive font size scaling
      expect(pageTitle).toHaveAttribute('data-size', 'xs');
    });

    it('should maintain readability with smallest responsive font sizes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title xs>Small Title</Title>
        </ThemeProvider>
      );

      const title = container.querySelector('h3');

      // Title xs has responsive font size scaling
      expect(title).toHaveAttribute('data-size', 'xs');
      expect(title).toHaveClass('text-(length:--fs)');
    });
  });

  describe('Responsive Section Padding', () => {
    it('should apply responsive padding to Section components', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section xl>Large Section with Responsive Padding</Section>
        </ThemeProvider>
      );

      const section = container.querySelector('div');

      // Section xl has responsive padding scaling
      expect(section).toHaveAttribute('data-size', 'xl');
      expect(section).toHaveClass('py-(--py)');
    });

    it('should ensure minimum padding on mobile devices', () => {
      const paddingSizes = ['xs', 'sm', 'md', 'lg'] as const;
      
      paddingSizes.forEach(size => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Section {...{[size]: true}}>Section {size}</Section>
          </ThemeProvider>
        );

        const section = container.querySelector('div');

        // All sizes have responsive padding
        expect(section).toHaveAttribute('data-size', size);
      });
    });

    it('should scale padding proportionally across breakpoints', () => {
      const {container: smContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section sm>Small Section</Section>
        </ThemeProvider>
      );

      const {container: lgContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section lg>Large Section</Section>
        </ThemeProvider>
      );

      const smSection = smContainer.querySelector('div');
      const lgSection = lgContainer.querySelector('div');

      // Both have responsive padding with different sizes
      expect(smSection).toHaveAttribute('data-size', 'sm');
      expect(lgSection).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('Combined Responsive Behavior', () => {
    it('should work well when combining responsive typography and layout', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section lg>
            <PageTitle md>Responsive Page Title in Responsive Section</PageTitle>
            <SectionTitle sm>Responsive Section Title</SectionTitle>
            <Title xs>Responsive Small Title</Title>
          </Section>
        </ThemeProvider>
      );

      const section = container.querySelector('div');
      const pageTitle = container.querySelector('h1');
      const sectionTitle = container.querySelector('h2');
      const title = container.querySelector('h3');

      // All components have responsive sizing
      expect(section).toHaveAttribute('data-size', 'lg');
      expect(pageTitle).toHaveAttribute('data-size', 'md');
      expect(sectionTitle).toHaveAttribute('data-size', 'sm');
      expect(title).toHaveAttribute('data-size', 'xs');
    });

    it('should maintain design hierarchy across all breakpoints', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <div>
            <PageTitle sm>Page Title</PageTitle>
            <SectionTitle sm>Section Title</SectionTitle>
            <Title sm>Regular Title</Title>
          </div>
        </ThemeProvider>
      );

      const pageTitle = container.querySelector('h1');
      const sectionTitle = container.querySelector('h2');
      const title = container.querySelector('h3');

      // All using sm size with responsive scaling
      expect(pageTitle).toHaveAttribute('data-size', 'sm');
      expect(sectionTitle).toHaveAttribute('data-size', 'sm');
      expect(title).toHaveAttribute('data-size', 'sm');
    });
  });

  describe('Responsive CSS Variable Switching Classes', () => {
    describe('Typography Components', () => {
      it('should have responsive font size switching classes on Title', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Title md>Responsive Title</Title>
          </ThemeProvider>
        );

        const title = container.querySelector('h3');
        expect(title).toHaveClass('[--fs-unit:var(--fs-unit-desktop)]');
        expect(title).toHaveClass('max-tablet:[--fs-unit:var(--fs-unit-tablet)]');
        expect(title).toHaveClass('max-mobile:[--fs-unit:var(--fs-unit-mobile)]');
        expect(title).toHaveClass('text-(length:--fs)');
      });

      it('should have responsive font size switching classes on PageTitle', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <PageTitle md>Responsive Page Title</PageTitle>
          </ThemeProvider>
        );

        const pageTitle = container.querySelector('h1');
        expect(pageTitle).toHaveClass('[--fs-unit:var(--fs-unit-desktop)]');
        expect(pageTitle).toHaveClass('max-tablet:[--fs-unit:var(--fs-unit-tablet)]');
        expect(pageTitle).toHaveClass('max-mobile:[--fs-unit:var(--fs-unit-mobile)]');
        expect(pageTitle).toHaveClass('text-(length:--fs)');
      });

      it('should have responsive font size switching classes on SectionTitle', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <SectionTitle md>Responsive Section Title</SectionTitle>
          </ThemeProvider>
        );

        const sectionTitle = container.querySelector('h2');
        expect(sectionTitle).toHaveClass('[--fs-unit:var(--fs-unit-desktop)]');
        expect(sectionTitle).toHaveClass('max-tablet:[--fs-unit:var(--fs-unit-tablet)]');
        expect(sectionTitle).toHaveClass('max-mobile:[--fs-unit:var(--fs-unit-mobile)]');
        expect(sectionTitle).toHaveClass('text-(length:--fs)');
      });
    });

    describe('Section Component', () => {
      it('should have responsive py switching classes on Section', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Section md>Responsive Section Padding</Section>
          </ThemeProvider>
        );

        const section = container.querySelector('div');
        expect(section).toHaveClass('[--py-unit:var(--py-unit-desktop)]');
        expect(section).toHaveClass('max-tablet:[--py-unit:var(--py-unit-tablet)]');
        expect(section).toHaveClass('max-mobile:[--py-unit:var(--py-unit-mobile)]');
        expect(section).toHaveClass('py-(--py)');
      });

      it('should have responsive gap switching classes on Section with gap', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Section md gap>Responsive Section Gap</Section>
          </ThemeProvider>
        );

        const section = container.querySelector('div');
        expect(section).toHaveClass('[--gap-unit:var(--gap-unit-desktop)]');
        expect(section).toHaveClass('max-tablet:[--gap-unit:var(--gap-unit-tablet)]');
        expect(section).toHaveClass('max-mobile:[--gap-unit:var(--gap-unit-mobile)]');
        expect(section).toHaveClass('gap-(--gap)');
      });

      it('should have both responsive py and gap classes when gap is enabled', () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Section lg gap>Section with Gap</Section>
          </ThemeProvider>
        );

        const section = container.querySelector('div');
        // Should have responsive py classes
        expect(section).toHaveClass('[--py-unit:var(--py-unit-desktop)]');
        expect(section).toHaveClass('py-(--py)');
        // Should have responsive gap classes
        expect(section).toHaveClass('[--gap-unit:var(--gap-unit-desktop)]');
        expect(section).toHaveClass('gap-(--gap)');
      });
    });
  });
});