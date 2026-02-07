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

    
    it('should have no default appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container>Container without appearance</Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      // Layout components should not have appearance classes by default
      expect(containerEl).not.toHaveClass('bg-(--bg-color)');
      expect(containerEl).not.toHaveClass('text-(--text-color)');
      expect(containerEl).not.toHaveClass('border-(--border-color)');
      expect(containerEl).not.toHaveAttribute('data-appearance');
    });

    it('should apply background correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container primary>Container with background</Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      expect(containerEl).toHaveClass('bg-(--bg-color)');
    });

    it('should apply default background correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container primary>Primary Container</Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      expect(containerEl).toHaveClass('bg-(--bg-color)');
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
        expect(containerEl).toHaveClass('bg-(--bg-color)');
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
        expect(containerEl).toHaveClass('text-(--text-color)');
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
      expect(outlineContainer1).toHaveClass('text-(--text-color)');
      expect(filledContainer1).toHaveClass('text-(--text-color)');
      
      // Background colors
      expect(outlineContainer1).toHaveClass('bg-(--bg-color)');
      expect(filledContainer1).toHaveClass('bg-(--bg-color)');
      
      // Border colors
      expect(outlineContainer1).toHaveClass('border-(--border-color)');
      expect(filledContainer1).toHaveClass('border-(--border-color)');
      
      // Ring colors
      expect(outlineContainer1).toHaveClass('ring-(--ring-color)');
      expect(filledContainer1).toHaveClass('ring-(--ring-color)');
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
      // Test pill shape
      const {container: pillContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container pill>Pill Container</Container>
        </ThemeProvider>
      );
      expect(pillContainer.querySelector('div')).toHaveClass('rounded-full');

      // Test sharp shape
      const {container: sharpContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container sharp>Sharp Container</Container>
        </ThemeProvider>
      );
      expect(sharpContainer.querySelector('div')).toHaveClass('rounded-none');

      // Test rounded shape
      const {container: roundedContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container rounded>Rounded Container</Container>
        </ThemeProvider>
      );
      expect(roundedContainer.querySelector('div')).toHaveClass('rounded-(--br)');
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

    it('should have no padding by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container>Container without padding</Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      // Container should not have padding by default (noPadding: true in defaults)
      expect(containerEl).not.toHaveClass('px-(--px)');
      expect(containerEl).not.toHaveClass('py-(--py)');
    });

    it('should support padding prop', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container padding>
            Container with padding
          </Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      expect(containerEl).toHaveClass('px-(--px)');
      expect(containerEl).toHaveClass('py-(--py)');
    });

    it('should support noPadding prop to explicitly disable padding', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container noPadding>
            Container with no padding
          </Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      expect(containerEl).not.toHaveClass('px-(--px)');
      expect(containerEl).not.toHaveClass('py-(--py)');
    });

    it('should apply correct padding classes for different sizes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      sizes.forEach(size => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Container {...{[size]: true}} padding>
              {size} container with padding
            </Container>
          </ThemeProvider>
        );

        const containerEl = container.querySelector('div');
        expect(containerEl).toHaveClass('px-(--px)');
        expect(containerEl).toHaveClass('py-(--py)');
        expect(containerEl).toHaveAttribute('data-size', size);
      });
    });
  });

  describe('TextAlign Props', () => {
    it('should apply textCenter class', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container textCenter>Centered content</Container>
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('text-center');
    });
  });

  describe('Breakpoint Props', () => {
    it('should apply mobileCol class', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container mobileCol>Responsive container</Container>
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('max-mobile:flex-col');
    });
  });

  describe('Width Props', () => {
    it('should apply wFull class for full width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container wFull>Content</Container>
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('w-full');
    });

    it('should apply wFit class for fit-content width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container wFit>Content</Container>
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('w-fit');
    });

    it('should apply wAuto class for auto width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container wAuto>Content</Container>
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('w-auto');
    });
  });

  describe('Height Props', () => {
    it('should apply hFull class for full height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container hFull>Content</Container>
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('h-full');
    });

    it('should apply hFit class for fit-content height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container hFit>Content</Container>
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('h-fit');
    });

    it('should apply hAuto class for auto height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container hAuto>Content</Container>
        </ThemeProvider>
      );
      const el = container.querySelector('div');
      expect(el).toHaveClass('h-auto');
    });
  });
});