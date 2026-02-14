import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';

import {
  ModalBody,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('ModalBody Component Tests', () => {

  describe('Basic Rendering', () => {
    it('should render with default classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalBody>Body Content</ModalBody>
        </ThemeProvider>
      );

      const body = container.querySelector('.vane-modal-body');
      expect(body).toBeInTheDocument();
      // Default: flex column, gap, overflow-auto
      expect(body).toHaveClass('flex', 'flex-col');
      expect(body).toHaveClass('gap-(--gap)');
      expect(body).toHaveClass('overflow-auto');
    });

    it('should render children', () => {
      const { getByText } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalBody>Scrollable content here</ModalBody>
        </ThemeProvider>
      );

      expect(getByText('Scrollable content here')).toBeInTheDocument();
    });

    it('should have data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalBody>Body</ModalBody>
        </ThemeProvider>
      );

      const body = container.querySelector('.vane-modal-body');
      expect(body).toHaveAttribute('data-vane-type', 'layout');
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to the body element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ThemeProvider theme={defaultTheme}>
          <ModalBody ref={ref}>Body</ModalBody>
        </ThemeProvider>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('vane-modal-body');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with theme classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalBody className="custom-body">Body</ModalBody>
        </ThemeProvider>
      );

      const body = container.querySelector('.vane-modal-body');
      expect(body).toHaveClass('flex', 'flex-col');
      expect(body).toHaveClass('custom-body');
    });
  });

  describe('Boolean Props Do Not Leak to DOM', () => {
    it('should not leak boolean props to DOM', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalBody flex column gap overflowAuto>
            Body
          </ModalBody>
        </ThemeProvider>
      );

      const body = container.querySelector('.vane-modal-body');
      expect(body).not.toHaveAttribute('flex');
      expect(body).not.toHaveAttribute('column');
      expect(body).not.toHaveAttribute('gap');
      expect(body).not.toHaveAttribute('overflowAuto');
    });
  });

  describe('Layout Overrides', () => {
    it('should allow overriding default direction to row', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalBody row>Body</ModalBody>
        </ThemeProvider>
      );

      const body = container.querySelector('.vane-modal-body');
      expect(body).toHaveClass('flex-row');
      expect(body).not.toHaveClass('flex-col');
    });

    it('should allow disabling overflow', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <ModalBody overflowHidden>Body</ModalBody>
        </ThemeProvider>
      );

      const body = container.querySelector('.vane-modal-body');
      expect(body).toHaveClass('overflow-hidden');
      expect(body).not.toHaveClass('overflow-auto');
    });
  });
});
