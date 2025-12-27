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
        expect(section).toHaveClass(`text-(--color-text-${appearance})`);
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
      expect(outlineSection).toHaveClass('text-(--color-text-primary)');
      expect(filledSection).toHaveClass('text-(--color-text-filled-primary)');
      
      // Background colors
      expect(outlineSection).toHaveClass('[background:var(--color-bg-layout-primary)]');
      expect(filledSection).toHaveClass('[background:var(--color-bg-filled-layout-primary)]');
      
      // Border colors
      expect(outlineSection).toHaveClass('border-(--color-border-primary)');
      expect(filledSection).toHaveClass('border-(--color-border-filled-primary)');
      
      // Ring colors
      expect(outlineSection).toHaveClass('ring-(--color-border-primary)');
      expect(filledSection).toHaveClass('ring-(--color-border-filled-primary)');
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
      expect(section).toHaveClass('[--py-unit:12] max-laptop:[--py-unit:6] max-tablet:[--py-unit:2]', 'py-(--py)');
    });

    it('should support all responsive padding sizes', () => {
      const paddingSizes = [
        { prop: 'xs', pyClass: '[--py-unit:4] max-laptop:[--py-unit:3] max-tablet:[--py-unit:2]' },
        { prop: 'sm', pyClass: '[--py-unit:8] max-laptop:[--py-unit:4] max-tablet:[--py-unit:2]' },
        { prop: 'md', pyClass: '[--py-unit:12] max-laptop:[--py-unit:6] max-tablet:[--py-unit:2]' },
        { prop: 'lg', pyClass: '[--py-unit:16] max-laptop:[--py-unit:8] max-tablet:[--py-unit:2]' },
        { prop: 'xl', pyClass: '[--py-unit:20] max-laptop:[--py-unit:10] max-tablet:[--py-unit:4]' }
      ] as const;

      paddingSizes.forEach(({prop, pyClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Section {...{[prop]: true}}>{prop} section</Section>
          </ThemeProvider>
        );

        const section = container.querySelector('div');
        expect(section).toHaveClass(pyClass, 'py-(--py)');
      });
    });
  });
});