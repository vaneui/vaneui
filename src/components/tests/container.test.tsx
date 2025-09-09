import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Container,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Container Component Tests', () => {

  describe('Container Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container>Container content</Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      expect(containerEl).toBeInTheDocument();
      expect(containerEl).toHaveClass('mx-auto', 'w-full', 'max-w-5xl');
    });

    it('should apply transparent background correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container transparent>Transparent Container</Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      expect(containerEl).toHaveClass('bg-transparent');
    });

    it('should apply default background correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container default>Default Container</Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      expect(containerEl).toHaveClass('bg-(--color-bg-layout-default)');
    });

    it('should support different appearance variants for background', () => {
      const appearances = ['primary', 'secondary', 'accent', 'success', 'danger', 'warning', 'info'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Container {...{[appearance]: true}}>
              {appearance} container
            </Container>
          </ThemeProvider>
        );

        const containerEl = container.querySelector('div');
        expect(containerEl).toHaveClass(`bg-(--color-bg-layout-${appearance})`);
      });
    });

    it('should support appearance variants for text color', () => {
      const appearances = ['primary', 'secondary', 'accent', 'success', 'danger', 'warning', 'info'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Container {...{[appearance]: true}}>
              {appearance} container
            </Container>
          </ThemeProvider>
        );

        const containerEl = container.querySelector('div');
        expect(containerEl).toHaveClass(`text-(--color-text-${appearance})`);
      });
    });

    it('should support filled and outline variants for text, background, border, and ring', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container primary outline border ring>Outline container</Container>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container primary filled border ring>Filled container</Container>
        </ThemeProvider>
      );

      const outlineContainer1 = outlineContainer.querySelector('div');
      const filledContainer1 = filledContainer.querySelector('div');

      // Text colors
      expect(outlineContainer1).toHaveClass('text-(--color-text-primary)');
      expect(filledContainer1).toHaveClass('text-(--color-text-filled-primary)');
      
      // Background colors
      expect(outlineContainer1).toHaveClass('bg-(--color-bg-layout-primary)');
      expect(filledContainer1).toHaveClass('bg-(--color-bg-filled-layout-primary)');
      
      // Border colors
      expect(outlineContainer1).toHaveClass('border-(--color-border-primary)');
      expect(filledContainer1).toHaveClass('border-(--color-border-filled-primary)');
      
      // Ring colors
      expect(outlineContainer1).toHaveClass('ring-(--color-border-primary)');
      expect(filledContainer1).toHaveClass('ring-(--color-border-filled-primary)');
    });

    it('should support layout props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container flex itemsCenter justifyBetween>
            Layout Container
          </Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      expect(containerEl).toHaveClass('flex', 'items-center', 'justify-between');
    });

    it('should support shape props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container pill>
            Pill Container
          </Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      expect(containerEl).toHaveClass('rounded-full');
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container className="custom-container-class">
            Custom Container
          </Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      expect(containerEl).toHaveClass('mx-auto', 'w-full', 'max-w-5xl'); // theme classes
      expect(containerEl).toHaveClass('custom-container-class'); // custom class
    });

    it('should support custom HTML tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container tag="section">
            Section Container
          </Container>
        </ThemeProvider>
      );

      const sectionEl = container.querySelector('section');
      expect(sectionEl).toBeInTheDocument();
      expect(sectionEl).toHaveTextContent('Section Container');
    });
  });
});