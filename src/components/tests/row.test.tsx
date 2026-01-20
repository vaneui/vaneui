import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Row,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Row Component Tests', () => {

  describe('Row Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row>Row content</Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toBeInTheDocument();
      expect(row).toHaveClass('gap-(--gap)', 'items-center', 'flex', 'flex-row');
    });

    it('should support column direction', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row column>Column Row</Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toHaveClass('flex-col');
    });

    it('should support reverse direction', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row reverse>Reverse Row</Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toHaveClass('flex-row-reverse');
    });

    it('should support column reverse', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row columnReverse>Column Reverse Row</Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toHaveClass('flex-col-reverse');
    });

    it('should support flex properties', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row itemsCenter justifyBetween gap>
            Flex Row
          </Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toHaveClass('items-center', 'justify-between', 'gap-(--gap)');
    });

    it('should support wrap properties', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row flexWrap>
            Wrapping Row
          </Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toHaveClass('flex-wrap');
    });

    it('should support responsive breakpoint props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row mobileCol>
            Responsive Row
          </Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toHaveClass('max-mobile:flex-col');
    });

    it('should support appearance variants for background', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row primary>
            Primary Row
          </Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toHaveClass('bg-(--bg-color)');
    });

    it('should support appearance variants for text color', () => {
      const appearances = ['primary', 'secondary', 'accent', 'success', 'danger', 'warning', 'info'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Row {...{[appearance]: true}}>
              {appearance} row
            </Row>
          </ThemeProvider>
        );

        const row = container.querySelector('div');
        expect(row).toHaveClass('text-(--text-color)');
      });
    });

    it('should support filled and outline variants for text, background, border, and ring', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row primary outline border ring>Outline row</Row>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row primary filled border ring>Filled row</Row>
        </ThemeProvider>
      );

      const outlineRow = outlineContainer.querySelector('div');
      const filledRow = filledContainer.querySelector('div');

      // Text colors
      expect(outlineRow).toHaveClass('text-(--text-color)');
      expect(filledRow).toHaveClass('text-(--text-color)');
      
      // Background colors
      expect(outlineRow).toHaveClass('bg-(--bg-color)');
      expect(filledRow).toHaveClass('bg-(--bg-color)');
      
      // Border colors
      expect(outlineRow).toHaveClass('border-(--border-color)');
      expect(filledRow).toHaveClass('border-(--border-color)');
      
      // Ring colors
      expect(outlineRow).toHaveClass('ring-(--ring-color)');
      expect(filledRow).toHaveClass('ring-(--ring-color)');
    });

    
    it('should have no default appearance classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row>Row without appearance</Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      // Layout components should not have appearance classes by default
      expect(row).not.toHaveClass('bg-(--bg-color)');
      expect(row).not.toHaveClass('text-(--text-color)');
      expect(row).not.toHaveClass('border-(--border-color)');
      expect(row).not.toHaveAttribute('data-appearance');
    });

    it('should support background', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row primary>
            Row with background
          </Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toHaveClass('bg-(--bg-color)');
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row className="custom-row-class">
            Custom Row
          </Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toHaveClass('gap-(--gap)', 'items-center', 'flex', 'flex-row'); // theme classes
      expect(row).toHaveClass('custom-row-class'); // custom class
    });

    it('should support visual decoration props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row 
            primary
            border 
            ring 
            rounded
          >
            Decorated Row
          </Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toHaveClass('border-[length:var(--bw)]');
      expect(row).toHaveClass('border-(--border-color)');
      expect(row).toHaveClass('ring-[length:var(--rw)]');
      expect(row).toHaveClass('ring-(--ring-color)');
      expect(row).toHaveClass('rounded-(--br)');
    });

    it('should support custom HTML tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row tag="section">
            Section Row
          </Row>
        </ThemeProvider>
      );

      const sectionEl = container.querySelector('section');
      expect(sectionEl).toBeInTheDocument();
      expect(sectionEl).toHaveTextContent('Section Row');
    });

    it('should have no padding by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row>Row without padding</Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      // Row should not have padding by default (noPadding: true in defaults)
      expect(row).not.toHaveClass('px-(--px)');
      expect(row).not.toHaveClass('py-(--py)');
    });

    it('should support padding prop', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row padding>
            Row with padding
          </Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toHaveClass('px-(--px)');
      expect(row).toHaveClass('py-(--py)');
    });

    it('should support noPadding prop to explicitly disable padding', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row noPadding>
            Row with no padding
          </Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).not.toHaveClass('px-(--px)');
      expect(row).not.toHaveClass('py-(--py)');
    });

    it('should apply correct padding classes for different sizes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      sizes.forEach(size => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Row {...{[size]: true}} padding>
              {size} row with padding
            </Row>
          </ThemeProvider>
        );

        const row = container.querySelector('div');
        expect(row).toHaveClass('px-(--px)');
        expect(row).toHaveClass('py-(--py)');
        expect(row).toHaveAttribute('data-size', size);
      });
    });
  });
});