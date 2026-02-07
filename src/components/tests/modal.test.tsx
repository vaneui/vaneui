import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import {
  Modal,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Modal Component Tests', () => {

  describe('Basic Rendering', () => {
    it('should render when open is true', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Modal Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toBeInTheDocument();
    });

    it('should not render when open is false', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={false} onClose={() => {}}>
            <div>Modal Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).not.toBeInTheDocument();
    });

    it('should render with default classes', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toBeInTheDocument();
      // Flexbox layout from boolean props
      expect(modal).toHaveClass('flex', 'flex-col');
      // Width and height from CSS variables
      expect(modal).toHaveClass('w-full', 'max-w-(--modal-width)', 'max-h-(--modal-max-height)');
      // Overflow from boolean prop
      expect(modal).toHaveClass('overflow-auto');
    });

    it('should render children', () => {
      const { getByText } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Test Modal Content</div>
          </Modal>
        </ThemeProvider>
      );

      expect(getByText('Test Modal Content')).toBeInTheDocument();
    });
  });

  describe('ARIA Attributes', () => {
    it('should have role="dialog"', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveAttribute('role', 'dialog');
    });

    it('should have aria-modal="true"', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('Size Variants', () => {
    it('should apply xs size', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} xs>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveAttribute('data-size', 'xs');
    });

    it('should apply sm size', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} sm>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveAttribute('data-size', 'sm');
    });

    it('should apply md size by default', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveAttribute('data-size', 'md');
    });

    it('should apply lg size', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} lg>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveAttribute('data-size', 'lg');
    });

    it('should apply xl size', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} xl>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveAttribute('data-size', 'xl');
    });
  });

  describe('Close Behaviors', () => {
    it('should call onClose when clicking overlay', () => {
      const onClose = jest.fn();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={onClose}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const overlay = baseElement.querySelector('.vane-overlay');
      fireEvent.click(overlay!);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose when clicking modal content', () => {
      const onClose = jest.fn();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={onClose}>
            <div data-testid="content">Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      fireEvent.click(modal!);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should not call onClose on overlay click when closeOnOverlayClick is false', () => {
      const onClose = jest.fn();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={onClose} closeOnOverlayClick={false}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const overlay = baseElement.querySelector('.vane-overlay');
      fireEvent.click(overlay!);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should call onClose when pressing Escape', () => {
      const onClose = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={onClose}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose on Escape when closeOnEscape is false', () => {
      const onClose = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={onClose} closeOnEscape={false}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Overlay Integration', () => {
    it('should render inside an overlay', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const overlay = baseElement.querySelector('.vane-overlay');
      const modal = baseElement.querySelector('.vane-modal');

      expect(overlay).toBeInTheDocument();
      expect(modal).toBeInTheDocument();
      expect(overlay?.contains(modal!)).toBe(true);
    });

    it('should have centered overlay via flex props', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const overlay = baseElement.querySelector('.vane-overlay');
      // Overlay is centered by default via flex props (not data-centered attribute)
      expect(overlay).toHaveClass('flex', 'items-center', 'justify-center');
    });

    it('should pass overlayProps to overlay', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal
            open={true}
            onClose={() => {}}
            overlayProps={{ blur: true, className: 'custom-overlay' }}
          >
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const overlay = baseElement.querySelector('.vane-overlay');
      // blur is now handled via theme system, outputs class instead of data attribute
      expect(overlay).toHaveClass('backdrop-blur-(--overlay-blur)');
      expect(overlay).toHaveClass('custom-overlay');
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to the modal element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Modal ref={ref} open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('vane-modal');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with theme classes', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} className="custom-modal-class">
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveClass('flex', 'flex-col'); // theme classes
      expect(modal).toHaveClass('custom-modal-class'); // custom class
    });
  });

  describe('Shape Variants', () => {
    it('should apply rounded shape by default', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveClass('rounded-(--br)');
    });

    it('should apply sharp shape', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} sharp>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveClass('rounded-none');
    });

    it('should apply pill shape', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} pill>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveClass('rounded-full');
    });
  });

  describe('Padding and Gap', () => {
    it('should have padding by default', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveClass('px-(--px)', 'py-(--py)');
    });

    it('should have gap by default', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveClass('gap-(--gap)');
    });
  });

  describe('Shadow', () => {
    it('should have shadow by default', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveClass('shadow-(--shadow-base)');
    });

    it('should not have shadow when noShadow is true', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} noShadow>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).not.toHaveClass('shadow-(--shadow-base)');
    });
  });

  describe('Boolean Props Do Not Leak to DOM', () => {
    it('should not leak boolean props to DOM', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal
            open={true}
            onClose={() => {}}
            lg
            rounded
            padding
            gap
            shadow
            closeOnOverlayClick
            closeOnEscape
            scrollLock
            focusTrap
          >
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).not.toHaveAttribute('lg');
      expect(modal).not.toHaveAttribute('rounded');
      expect(modal).not.toHaveAttribute('padding');
      expect(modal).not.toHaveAttribute('gap');
      expect(modal).not.toHaveAttribute('shadow');
      expect(modal).not.toHaveAttribute('closeOnOverlayClick');
      expect(modal).not.toHaveAttribute('closeOnEscape');
      expect(modal).not.toHaveAttribute('scrollLock');
      expect(modal).not.toHaveAttribute('focusTrap');
    });
  });

  describe('HTML Attributes', () => {
    it('should pass through HTML attributes', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal
            open={true}
            onClose={() => {}}
            data-testid="modal"
            id="my-modal"
          >
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveAttribute('data-testid', 'modal');
      expect(modal).toHaveAttribute('id', 'my-modal');
    });
  });

  describe('Width Props', () => {
    it('should apply wFull class for full width', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} wFull>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );
      const el = baseElement.querySelector('.vane-modal');
      expect(el).toHaveClass('w-full');
    });

    it('should apply wFit class for fit-content width', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} wFit>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );
      const el = baseElement.querySelector('.vane-modal');
      expect(el).toHaveClass('w-fit');
    });

    it('should apply wAuto class for auto width', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} wAuto>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );
      const el = baseElement.querySelector('.vane-modal');
      expect(el).toHaveClass('w-auto');
    });
  });

  describe('Height Props', () => {
    it('should apply hFull class for full height', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} hFull>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );
      const el = baseElement.querySelector('.vane-modal');
      expect(el).toHaveClass('h-full');
    });

    it('should apply hFit class for fit-content height', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} hFit>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );
      const el = baseElement.querySelector('.vane-modal');
      expect(el).toHaveClass('h-fit');
    });

    it('should apply hAuto class for auto height', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} hAuto>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );
      const el = baseElement.querySelector('.vane-modal');
      expect(el).toHaveClass('h-auto');
    });
  });
});
