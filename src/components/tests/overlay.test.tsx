import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

import {
  Overlay,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Overlay Component Tests', () => {

  describe('Basic Rendering', () => {
    it('should render when open is true (default)', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay>Content</Overlay>
        </ThemeProvider>
      );

      // Overlay renders in portal to body by default
      const overlay = baseElement.querySelector('.vane-overlay');
      expect(overlay).toBeInTheDocument();
    });

    it('should not render when open is false', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay open={false}>Content</Overlay>
        </ThemeProvider>
      );

      const overlay = container.querySelector('.vane-overlay');
      expect(overlay).not.toBeInTheDocument();
    });

    it('should render with default classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay portal={false}>Content</Overlay>
        </ThemeProvider>
      );

      const overlay = container.querySelector('.vane-overlay');
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveClass('fixed', 'inset-0', 'z-50');
      // Uses CSS variable for background
      expect(overlay).toHaveClass('bg-(--overlay-bg)');
    });

    it('should be centered by default via flex props', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay portal={false}>Content</Overlay>
        </ThemeProvider>
      );

      const overlay = container.querySelector('.vane-overlay');
      expect(overlay).toHaveClass('flex', 'items-center', 'justify-center');
    });

    it('should render children', () => {
      const { getByText } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay portal={false}>
            <div>Test Content</div>
          </Overlay>
        </ThemeProvider>
      );

      expect(getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('Portal Rendering', () => {
    it('should render in portal by default', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <div id="container">
            <Overlay>Content</Overlay>
          </div>
        </ThemeProvider>
      );

      // Overlay should be a direct child of body, not inside #container
      const overlay = baseElement.querySelector('.vane-overlay');
      expect(overlay).toBeInTheDocument();
      expect(overlay?.parentElement).toBe(document.body);
    });

    it('should render in place when portal is false', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <div id="container">
            <Overlay portal={false}>Content</Overlay>
          </div>
        </ThemeProvider>
      );

      const overlay = container.querySelector('.vane-overlay');
      expect(overlay).toBeInTheDocument();
      // Should be inside the container, not in body
      expect(container.querySelector('#container .vane-overlay')).toBeInTheDocument();
    });
  });

  describe('Data Attributes', () => {
    it('should apply blur class when blur prop is true', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay portal={false} blur>Content</Overlay>
        </ThemeProvider>
      );

      const overlay = container.querySelector('.vane-overlay');
      // blur is now handled via theme system, outputs class instead of data attribute
      expect(overlay).toHaveClass('backdrop-blur-(--overlay-blur)');
    });

    it('should not have blur class by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay portal={false}>Content</Overlay>
        </ThemeProvider>
      );

      const overlay = container.querySelector('.vane-overlay');
      expect(overlay).not.toHaveClass('backdrop-blur-(--overlay-blur)');
    });

    it('should apply pointer-events-none class when pointerEventsNone prop is true', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay portal={false} pointerEventsNone>Content</Overlay>
        </ThemeProvider>
      );

      const overlay = container.querySelector('.vane-overlay');
      expect(overlay).toHaveClass('pointer-events-none');
    });

    it('should not have pointer-events-none class by default', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay portal={false}>Content</Overlay>
        </ThemeProvider>
      );

      const overlay = container.querySelector('.vane-overlay');
      expect(overlay).not.toHaveClass('pointer-events-none');
    });
  });

  describe('Click Behavior', () => {
    it('should call onClose when clicking the overlay background', () => {
      const onClose = jest.fn();
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay portal={false} onClose={onClose}>
            <div data-testid="content">Content</div>
          </Overlay>
        </ThemeProvider>
      );

      const overlay = container.querySelector('.vane-overlay');
      fireEvent.click(overlay!);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose when clicking inside content', () => {
      const onClose = jest.fn();
      const { getByTestId } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay portal={false} onClose={onClose}>
            <div data-testid="content">Content</div>
          </Overlay>
        </ThemeProvider>
      );

      fireEvent.click(getByTestId('content'));
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should not call onClose when pointerEventsNone is true', () => {
      const onClose = jest.fn();
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay portal={false} onClose={onClose} pointerEventsNone>
            <div>Content</div>
          </Overlay>
        </ThemeProvider>
      );

      const overlay = container.querySelector('.vane-overlay');
      fireEvent.click(overlay!);
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to the overlay element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay ref={ref} portal={false}>Content</Overlay>
        </ThemeProvider>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('vane-overlay');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with theme classes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay portal={false} className="custom-overlay-class">
            Content
          </Overlay>
        </ThemeProvider>
      );

      const overlay = container.querySelector('.vane-overlay');
      expect(overlay).toHaveClass('fixed', 'inset-0'); // theme classes
      expect(overlay).toHaveClass('custom-overlay-class'); // custom class
    });
  });

  describe('HTML Attributes', () => {
    it('should pass through HTML attributes', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay
            portal={false}
            data-testid="overlay"
            id="my-overlay"
          >
            Content
          </Overlay>
        </ThemeProvider>
      );

      const overlay = container.querySelector('.vane-overlay');
      expect(overlay).toHaveAttribute('data-testid', 'overlay');
      expect(overlay).toHaveAttribute('id', 'my-overlay');
    });
  });

  describe('Boolean Props Do Not Leak to DOM', () => {
    it('should not leak boolean props to DOM', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay portal={false} blur pointerEventsNone>
            Content
          </Overlay>
        </ThemeProvider>
      );

      const overlay = container.querySelector('.vane-overlay');
      // Boolean props should not appear as DOM attributes
      expect(overlay).not.toHaveAttribute('blur');
      expect(overlay).not.toHaveAttribute('pointerEventsNone');
      expect(overlay).not.toHaveAttribute('portal');
    });
  });

  describe('Alignment Props', () => {
    it('should allow overriding default centering with itemsStart', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay portal={false} itemsStart>Content</Overlay>
        </ThemeProvider>
      );

      const overlay = container.querySelector('.vane-overlay');
      expect(overlay).toHaveClass('items-start');
      expect(overlay).not.toHaveClass('items-center');
    });

    it('should allow overriding default centering with justifyStart', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Overlay portal={false} justifyStart>Content</Overlay>
        </ThemeProvider>
      );

      const overlay = container.querySelector('.vane-overlay');
      expect(overlay).toHaveClass('justify-start');
      expect(overlay).not.toHaveClass('justify-center');
    });
  });
});
