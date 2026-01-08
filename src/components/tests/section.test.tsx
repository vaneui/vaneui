import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Section,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Section Component Tests', () => {

  describe('Section Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section>Section content</Section>
        </ThemeProvider>
      );

      const section = container.querySelector('div');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('w-full', 'flex-col');
    });

    it('should render with complex styling', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section>
            Section with default styling
          </Section>
        </ThemeProvider>
      );

      const section = container.querySelector('div');
      expect(section).toBeInTheDocument();
      expect(section).toHaveTextContent('Section with default styling');
      // Section has complex default styling, so we just verify it renders
      expect(section).toHaveClass('w-full');
    });

    
    it('should have no default appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section>Section without appearance</Section>
        </ThemeProvider>
      );

      const section = container.querySelector('div');
      // Layout components should not have appearance classes by default
      expect(section).not.toHaveClass('bg-(--bg-color)');
      expect(section).not.toHaveClass('text-(--text-color)');
      expect(section).not.toHaveClass('border-(--border-color)');
      expect(section).not.toHaveAttribute('data-appearance');
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section className="custom-section-class">
            Custom Section
          </Section>
        </ThemeProvider>
      );

      const section = container.querySelector('div');
      expect(section).toHaveClass('w-full', 'flex-col'); // theme classes
      expect(section).toHaveClass('custom-section-class'); // custom class
    });

    it('should support appearance variants for text color', () => {
      const appearances = ['primary', 'secondary', 'accent', 'success', 'danger', 'warning', 'info'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Section {...{[appearance]: true}}>
              {appearance} section
            </Section>
          </ThemeProvider>
        );

        const section = container.querySelector('div');
        expect(section).toHaveClass('text-(--text-color)');
      });
    });

    it('should support filled and outline variants for text, background, border, and ring', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section primary outline border ring>Outline section</Section>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section primary filled border ring>Filled section</Section>
        </ThemeProvider>
      );

      const outlineSection = outlineContainer.querySelector('div');
      const filledSection = filledContainer.querySelector('div');

      // Text colors
      expect(outlineSection).toHaveClass('text-(--text-color)');
      expect(filledSection).toHaveClass('text-(--text-color)');
      
      // Background colors
      expect(outlineSection).toHaveClass('bg-(--bg-color)');
      expect(filledSection).toHaveClass('bg-(--bg-color)');
      
      // Border colors
      expect(outlineSection).toHaveClass('border-(--border-color)');
      expect(filledSection).toHaveClass('border-(--border-color)');
      
      // Ring colors
      expect(outlineSection).toHaveClass('ring-(--ring-color)');
      expect(filledSection).toHaveClass('ring-(--ring-color)');
    });

    it('should support custom HTML tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section tag="div">
            Div Section
          </Section>
        </ThemeProvider>
      );

      const divEl = container.querySelector('div');
      expect(divEl).toBeInTheDocument();
      expect(divEl).toHaveTextContent('Div Section');
    });

    it('should render with default responsive padding (md)', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section>Default Section</Section>
        </ThemeProvider>
      );

      const section = container.querySelector('div');
      expect(section).toHaveClass('py-(--py-desktop)');
    });

    it('should support all responsive padding sizes', () => {
      const paddingSizes = [
        { prop: 'xs' },
        { prop: 'sm' },
        { prop: 'md' },
        { prop: 'lg' },
        { prop: 'xl' }
      ] as const;

      paddingSizes.forEach(({prop}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Section {...{[prop]: true}}>{prop} section</Section>
          </ThemeProvider>
        );

        const section = container.querySelector('div');
        expect(section).toHaveClass('py-(--py-desktop)');
        expect(section).toHaveAttribute('data-size', prop);
      });
    });
  });
  describe('Responsive Breakpoint Classes', () => {
    it('should have all responsive py breakpoint classes by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Section>Responsive Section</Section>
        </ThemeProvider>
      );

      const section = container.querySelector('div');
      // Section is responsive by default, should have all breakpoint classes for py
      expect(section).toHaveClass('py-(--py-desktop)');
      expect(section).toHaveClass('max-tablet:py-(--py-tablet)');
      expect(section).toHaveClass('max-mobile:py-(--py-mobile)');
    });

    it('should have all responsive gap breakpoint classes by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Section>Responsive Section with Gap</Section>
        </ThemeProvider>
      );

      const section = container.querySelector('div');
      // Section is responsive by default, should have all breakpoint classes for gap
      expect(section).toHaveClass('gap-(--gap-desktop)');
      expect(section).toHaveClass('max-tablet:gap-(--gap-tablet)');
      expect(section).toHaveClass('max-mobile:gap-(--gap-mobile)');
    });

    it('should have all responsive breakpoint classes for all sizes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      sizes.forEach((size) => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <Section {...{[size]: true}}>{size} Section</Section>
          </ThemeProvider>
        );

        const section = container.querySelector('div');

        // All sizes should have responsive breakpoint classes
        expect(section).toHaveClass('py-(--py-desktop)');
        expect(section).toHaveClass('max-tablet:py-(--py-tablet)');
        expect(section).toHaveClass('max-mobile:py-(--py-mobile)');
        expect(section).toHaveClass('gap-(--gap-desktop)');
        expect(section).toHaveClass('max-tablet:gap-(--gap-tablet)');
        expect(section).toHaveClass('max-mobile:gap-(--gap-mobile)');
        expect(section).toHaveAttribute('data-size', size);
      });
    });

    it('should use base classes when responsive is explicitly disabled', () => {
      const { container } = render(
        <ThemeProvider
          themeDefaults={{ section: { responsive: false } }}
        >
          <Section>Non-responsive Section</Section>
        </ThemeProvider>
      );

      const section = container.querySelector('div');
      // When responsive is false, should use base classes
      expect(section).toHaveClass('py-(--py)');
      expect(section).toHaveClass('gap-(--gap)');
      expect(section).not.toHaveClass('py-(--py-desktop)');
      expect(section).not.toHaveClass('gap-(--gap-desktop)');
    });
  });

});