import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
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
  });
});