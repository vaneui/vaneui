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
      expect(row).toHaveClass('gap-(--layout-gap-md)', 'items-center', 'flex', 'flex-row');
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
      expect(row).toHaveClass('items-center', 'justify-between', 'gap-(--layout-gap-md)');
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
          <Row mdCol>
            Responsive Row
          </Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toHaveClass('max-md:flex-col');
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
      expect(row).toHaveClass('bg-(--color-bg-layout-primary)');
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
        expect(row).toHaveClass(`text-(--color-text-${appearance})`);
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
      expect(outlineRow).toHaveClass('text-(--color-text-primary)');
      expect(filledRow).toHaveClass('text-(--color-text-filled-primary)');
      
      // Background colors
      expect(outlineRow).toHaveClass('bg-(--color-bg-layout-primary)');
      expect(filledRow).toHaveClass('bg-(--color-bg-filled-layout-primary)');
      
      // Border colors
      expect(outlineRow).toHaveClass('border-(--color-border-primary)');
      expect(filledRow).toHaveClass('border-(--color-border-filled-primary)');
      
      // Ring colors
      expect(outlineRow).toHaveClass('ring-(--color-border-primary)');
      expect(filledRow).toHaveClass('ring-(--color-border-filled-primary)');
    });

    it('should support transparent background', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row transparent>
            Transparent Row
          </Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toHaveClass('bg-transparent');
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
      expect(row).toHaveClass('gap-(--layout-gap-md)', 'items-center', 'flex', 'flex-row'); // theme classes
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
      expect(row).toHaveClass('border');
      expect(row).toHaveClass('border-(--color-border-primary)');
      expect(row).toHaveClass('ring');
      expect(row).toHaveClass('ring-(--color-border-primary)');
      expect(row).toHaveClass('rounded-(--layout-br-md)');
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
  });
});