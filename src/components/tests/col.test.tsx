import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Col,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Col Component Tests', () => {

  describe('Col Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col>Col content</Col>
        </ThemeProvider>
      );

      const col = container.querySelector('div');
      expect(col).toBeInTheDocument();
      expect(col).toHaveClass('gap-(--gap-desktop)', 'flex', 'flex-col');
    });

    it('should support row direction', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col row>Row Col</Col>
        </ThemeProvider>
      );

      const col = container.querySelector('div');
      expect(col).toHaveClass('flex-row');
    });

    it('should support reverse direction', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col reverse>Reverse Col</Col>
        </ThemeProvider>
      );

      const col = container.querySelector('div');
      expect(col).toHaveClass('flex-col-reverse');
    });

    it('should support row reverse', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col rowReverse>Row Reverse Col</Col>
        </ThemeProvider>
      );

      const col = container.querySelector('div');
      expect(col).toHaveClass('flex-row-reverse');
    });

    it('should support flex properties', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col itemsCenter justifyBetween gap>
            Flex Col
          </Col>
        </ThemeProvider>
      );

      const col = container.querySelector('div');
      expect(col).toHaveClass('items-center', 'justify-between', 'gap-(--gap-desktop)');
    });

    it('should support wrap properties', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col flexWrap>
            Wrapping Col
          </Col>
        </ThemeProvider>
      );

      const col = container.querySelector('div');
      expect(col).toHaveClass('flex-wrap');
    });

    it('should support appearance variants for background', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col secondary>
            Secondary Col
          </Col>
        </ThemeProvider>
      );

      const col = container.querySelector('div');
      expect(col).toHaveClass('[background:var(--bg-color)]');
    });

    it('should support appearance variants for text color', () => {
      const appearances = ['primary', 'secondary', 'accent', 'success', 'danger', 'warning', 'info'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Col {...{[appearance]: true}}>
              {appearance} col
            </Col>
          </ThemeProvider>
        );

        const col = container.querySelector('div');
        expect(col).toHaveClass('text-(--text-color)');
      });
    });

    it('should support filled and outline variants for text, background, border, and ring', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col primary outline border ring>Outline col</Col>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col primary filled border ring>Filled col</Col>
        </ThemeProvider>
      );

      const outlineCol = outlineContainer.querySelector('div');
      const filledCol = filledContainer.querySelector('div');

      // Text colors
      expect(outlineCol).toHaveClass('text-(--text-color)');
      expect(filledCol).toHaveClass('text-(--text-color)');
      
      // Background colors
      expect(outlineCol).toHaveClass('[background:var(--bg-color)]');
      expect(filledCol).toHaveClass('[background:var(--bg-color)]');
      
      // Border colors
      expect(outlineCol).toHaveClass('border-(--border-color)');
      expect(filledCol).toHaveClass('border-(--border-color)');
      
      // Ring colors
      expect(outlineCol).toHaveClass('ring-(--ring-color)');
      expect(filledCol).toHaveClass('ring-(--ring-color)');
    });

    it('should support background', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col>
            Transparent Col
          </Col>
        </ThemeProvider>
      );

      const col = container.querySelector('div');
      expect(col).toHaveClass('[background:var(--bg-color)]');
    });

    it('should support visual decoration props', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col 
            danger
            border 
            ring 
            pill
          >
            Decorated Col
          </Col>
        </ThemeProvider>
      );

      const col = container.querySelector('div');
      expect(col).toHaveClass('border-[length:var(--bw)]');
      expect(col).toHaveClass('border-(--border-color)');
      expect(col).toHaveClass('ring-[length:var(--rw)]');
      expect(col).toHaveClass('ring-(--ring-color)');
      expect(col).toHaveClass('rounded-full');
    });

    it('should support layout positioning', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col relative>
            Positioned Col
          </Col>
        </ThemeProvider>
      );

      const col = container.querySelector('div');
      expect(col).toHaveClass('relative');
    });

    it('should support display variants', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col grid>
            Grid Col
          </Col>
        </ThemeProvider>
      );

      const col = container.querySelector('div');
      expect(col).toHaveClass('grid');
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col className="custom-col-class">
            Custom Col
          </Col>
        </ThemeProvider>
      );

      const col = container.querySelector('div');
      expect(col).toHaveClass('gap-(--gap-desktop)', 'flex', 'flex-col'); // theme classes
      expect(col).toHaveClass('custom-col-class'); // custom class
    });

    it('should support custom HTML tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col tag="section">
            Section Col
          </Col>
        </ThemeProvider>
      );

      const sectionEl = container.querySelector('section');
      expect(sectionEl).toBeInTheDocument();
      expect(sectionEl).toHaveTextContent('Section Col');
    });
  });
});