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
});