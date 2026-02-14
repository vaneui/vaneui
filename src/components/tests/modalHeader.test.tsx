import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';

import {
  ModalHeader,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('ModalHeader Component Tests', () => {

  describe('Basic Rendering', () => {
    it('should render with default classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalHeader>Header Content</ModalHeader>
        </ThemeProvider>
      );

      const header = container.querySelector('.vane-modal-header');
      expect(header).toBeInTheDocument();
      // Default: flex row, items-center, justify-between, gap
      expect(header).toHaveClass('flex', 'flex-row');
      expect(header).toHaveClass('items-center');
      expect(header).toHaveClass('justify-between');
      expect(header).toHaveClass('gap-(--gap)');
    });

    it('should render children', () => {
      const { getByText } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalHeader>My Header Title</ModalHeader>
        </ThemeProvider>
      );

      expect(getByText('My Header Title')).toBeInTheDocument();
    });

    it('should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalHeader>Header</ModalHeader>
        </ThemeProvider>
      );

      const header = container.querySelector('.vane-modal-header');
      expect(header).toHaveAttribute('data-vane-type', 'layout');
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to the header element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ThemeProvider theme={defaultTheme}>
          <ModalHeader ref={ref}>Header</ModalHeader>
        </ThemeProvider>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('vane-modal-header');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with theme classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalHeader className="custom-header">Header</ModalHeader>
        </ThemeProvider>
      );

      const header = container.querySelector('.vane-modal-header');
      expect(header).toHaveClass('flex', 'flex-row');
      expect(header).toHaveClass('custom-header');
    });
  });

  describe('Boolean Props Do Not Leak to DOM', () => {
    it('should not leak boolean props to DOM', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalHeader flex row itemsCenter justifyBetween gap>
            Header
          </ModalHeader>
        </ThemeProvider>
      );

      const header = container.querySelector('.vane-modal-header');
      expect(header).not.toHaveAttribute('flex');
      expect(header).not.toHaveAttribute('row');
      expect(header).not.toHaveAttribute('itemsCenter');
      expect(header).not.toHaveAttribute('justifyBetween');
      expect(header).not.toHaveAttribute('gap');
    });
  });

  describe('Layout Overrides', () => {
    it('should allow overriding default direction to column', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalHeader column>Header</ModalHeader>
        </ThemeProvider>
      );

      const header = container.querySelector('.vane-modal-header');
      expect(header).toHaveClass('flex-col');
      expect(header).not.toHaveClass('flex-row');
    });

    it('should allow removing gap', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalHeader noGap>Header</ModalHeader>
        </ThemeProvider>
      );

      const header = container.querySelector('.vane-modal-header');
      expect(header).not.toHaveClass('gap-(--gap)');
    });
  });
});
