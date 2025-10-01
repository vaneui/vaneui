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

      // Title (createForTitle) lg: [--fs-unit:15] max-laptop:[--fs-unit:14] max-tablet:[--fs-unit:13]
      expect(title).toHaveClass('[--fs-unit:15] max-laptop:[--fs-unit:14] max-tablet:[--fs-unit:13]');
      
      // PageTitle (createForPageTitle) lg: [--fs-unit:30] max-laptop:[--fs-unit:27] max-tablet:[--fs-unit:24]
      expect(pageTitle).toHaveClass('[--fs-unit:30] max-laptop:[--fs-unit:27] max-tablet:[--fs-unit:24]');
      
      // SectionTitle (createForSectionTitle) lg: [--fs-unit:24] max-laptop:[--fs-unit:22] max-tablet:[--fs-unit:20]
      expect(sectionTitle).toHaveClass('[--fs-unit:24] max-laptop:[--fs-unit:22] max-tablet:[--fs-unit:20]');
    });

    it('should scale down font sizes appropriately across breakpoints', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <PageTitle xs>Smallest Page Title</PageTitle>
        </ThemeProvider>
      );

      const pageTitle = container.querySelector('h1');
      
      // PageTitle xs: [--fs-unit:15] max-laptop:[--fs-unit:12] max-tablet:[--fs-unit:9]
      // This shows significant scaling: 15 → 12 → 9 (60% reduction on tablet)
      expect(pageTitle).toHaveClass('[--fs-unit:15] max-laptop:[--fs-unit:12] max-tablet:[--fs-unit:9]');
    });

    it('should maintain readability with smallest responsive font sizes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Title xs>Small Title</Title>
        </ThemeProvider>
      );

      const title = container.querySelector('h3');
      
      // Title xs: [--fs-unit:9] max-laptop:[--fs-unit:8] max-tablet:[--fs-unit:7]
      // Even the smallest scales down gracefully: 9 → 8 → 7
      expect(title).toHaveClass('[--fs-unit:9] max-laptop:[--fs-unit:8] max-tablet:[--fs-unit:7]');
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
      
      // Section xl: [--py-unit:20] max-laptop:[--py-unit:10] max-tablet:[--py-unit:4]
      // Shows dramatic scaling: 20 → 10 → 4 (80% reduction on tablet)
      expect(section).toHaveClass('[--py-unit:20] max-laptop:[--py-unit:10] max-tablet:[--py-unit:4]');
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
        
        // All sizes except xl have minimum tablet padding of [--py-unit:2]
        expect(section?.className).toMatch(/max-tablet:\[--py-unit:2\]/);
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

      // sm: [--py-unit:8] max-laptop:[--py-unit:4] max-tablet:[--py-unit:2]
      expect(smSection).toHaveClass('[--py-unit:8] max-laptop:[--py-unit:4] max-tablet:[--py-unit:2]');
      
      // lg: [--py-unit:16] max-laptop:[--py-unit:8] max-tablet:[--py-unit:2]
      expect(lgSection).toHaveClass('[--py-unit:16] max-laptop:[--py-unit:8] max-tablet:[--py-unit:2]');
      
      // Both maintain 2:1 ratio between desktop and laptop
      // But both have same minimum on tablet
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

      // Section lg padding scales down significantly
      expect(section).toHaveClass('[--py-unit:16] max-laptop:[--py-unit:8] max-tablet:[--py-unit:2]');
      
      // PageTitle md: large on desktop, scales down for smaller screens
      expect(pageTitle).toHaveClass('[--fs-unit:24] max-laptop:[--fs-unit:21] max-tablet:[--fs-unit:18]');
      
      // SectionTitle sm: medium size with responsive scaling
      expect(sectionTitle).toHaveClass('[--fs-unit:15] max-laptop:[--fs-unit:13] max-tablet:[--fs-unit:11]');
      
      // Title xs: small but readable on all devices
      expect(title).toHaveClass('[--fs-unit:9] max-laptop:[--fs-unit:8] max-tablet:[--fs-unit:7]');
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

      // All using sm size, but PageTitle > SectionTitle > Title hierarchy maintained
      // PageTitle sm: [--fs-unit:18] max-laptop:[--fs-unit:15] max-tablet:[--fs-unit:12]
      expect(pageTitle).toHaveClass('[--fs-unit:18] max-laptop:[--fs-unit:15] max-tablet:[--fs-unit:12]');
      
      // SectionTitle sm: [--fs-unit:15] max-laptop:[--fs-unit:13] max-tablet:[--fs-unit:11]
      expect(sectionTitle).toHaveClass('[--fs-unit:15] max-laptop:[--fs-unit:13] max-tablet:[--fs-unit:11]');
      
      // Title sm: [--fs-unit:10] max-laptop:[--fs-unit:9] max-tablet:[--fs-unit:8]
      expect(title).toHaveClass('[--fs-unit:10] max-laptop:[--fs-unit:9] max-tablet:[--fs-unit:8]');
      
      // Even on tablet: PageTitle(12) > SectionTitle(11) > Title(8) - hierarchy preserved
    });
  });
});