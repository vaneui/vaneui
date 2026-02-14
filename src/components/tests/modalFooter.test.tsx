import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';

import {
  ModalFooter,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('ModalFooter Component Tests', () => {

  describe('Basic Rendering', () => {
    it('should render with default classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalFooter>Footer Content</ModalFooter>
        </ThemeProvider>
      );

      const footer = container.querySelector('.vane-modal-footer');
      expect(footer).toBeInTheDocument();
      // Default: flex row, items-center, justify-end, gap
      expect(footer).toHaveClass('flex', 'flex-row');
      expect(footer).toHaveClass('items-center');
      expect(footer).toHaveClass('justify-end');
      expect(footer).toHaveClass('gap-(--gap)');
    });

    it('should render children', () => {
      const { getByText } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalFooter>Action buttons here</ModalFooter>
        </ThemeProvider>
      );

      expect(getByText('Action buttons here')).toBeInTheDocument();
    });

    it('should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalFooter>Footer</ModalFooter>
        </ThemeProvider>
      );

      const footer = container.querySelector('.vane-modal-footer');
      expect(footer).toHaveAttribute('data-vane-type', 'layout');
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to the footer element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ThemeProvider theme={defaultTheme}>
          <ModalFooter ref={ref}>Footer</ModalFooter>
        </ThemeProvider>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('vane-modal-footer');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with theme classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalFooter className="custom-footer">Footer</ModalFooter>
        </ThemeProvider>
      );

      const footer = container.querySelector('.vane-modal-footer');
      expect(footer).toHaveClass('flex', 'flex-row');
      expect(footer).toHaveClass('custom-footer');
    });
  });

  describe('Boolean Props Do Not Leak to DOM', () => {
    it('should not leak boolean props to DOM', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalFooter flex row itemsCenter justifyEnd gap>
            Footer
          </ModalFooter>
        </ThemeProvider>
      );

      const footer = container.querySelector('.vane-modal-footer');
      expect(footer).not.toHaveAttribute('flex');
      expect(footer).not.toHaveAttribute('row');
      expect(footer).not.toHaveAttribute('itemsCenter');
      expect(footer).not.toHaveAttribute('justifyEnd');
      expect(footer).not.toHaveAttribute('gap');
    });
  });

  describe('Layout Overrides', () => {
    it('should allow overriding justify to justifyBetween', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalFooter justifyBetween>Footer</ModalFooter>
        </ThemeProvider>
      );

      const footer = container.querySelector('.vane-modal-footer');
      expect(footer).toHaveClass('justify-between');
      expect(footer).not.toHaveClass('justify-end');
    });

    it('should allow removing gap', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalFooter noGap>Footer</ModalFooter>
        </ThemeProvider>
      );

      const footer = container.querySelector('.vane-modal-footer');
      expect(footer).not.toHaveClass('gap-(--gap)');
    });
  });
});
