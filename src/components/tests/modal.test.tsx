import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ThemeProvider,
  defaultTheme
} from '../../index';
import { resetStackCount } from '../utils/stackingContext';

describe('Modal Component Tests', () => {
  beforeEach(() => { resetStackCount(); });

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

  describe('Close Button', () => {
    it('should not render close button by default', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const closeBtn = baseElement.querySelector('.vane-modal-close');
      expect(closeBtn).not.toBeInTheDocument();
    });

    it('should render close button when closeButton is true', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} closeButton>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const closeBtn = baseElement.querySelector('.vane-modal-close');
      expect(closeBtn).toBeInTheDocument();
      expect(closeBtn).toHaveAttribute('aria-label', 'Close');
      expect(closeBtn).toHaveAttribute('type', 'button');
    });

    it('should call onClose when close button is clicked', () => {
      const onClose = jest.fn();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={onClose} closeButton>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const closeBtn = baseElement.querySelector('.vane-modal-close');
      fireEvent.click(closeBtn!);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Centered', () => {
    it('should have centered overlay by default', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const overlay = baseElement.querySelector('.vane-overlay');
      expect(overlay).toHaveClass('items-center', 'justify-center');
    });

    it('should use items-start when centered is false', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} centered={false}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const overlay = baseElement.querySelector('.vane-overlay');
      expect(overlay).toHaveClass('items-start');
      expect(overlay).not.toHaveClass('items-center');
    });
  });

  describe('Full Screen', () => {
    it('should apply fullscreen styles when fullScreen is true', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} fullScreen>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveStyle({
        width: '100vw',
        height: '100vh',
        maxWidth: 'none',
        maxHeight: 'none',
        borderRadius: 0,
      });
    });

    it('should add bg-transparent to overlay when fullScreen', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} fullScreen>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const overlay = baseElement.querySelector('.vane-overlay');
      expect(overlay).toHaveClass('bg-transparent');
    });
  });

  describe('keepMounted', () => {
    it('should keep DOM mounted when keepMounted is true and open is false', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={false} onClose={() => {}} keepMounted>
            <div>Hidden Content</div>
          </Modal>
        </ThemeProvider>
      );

      const overlay = baseElement.querySelector('.vane-overlay');
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveStyle({ display: 'none' });
    });

    it('should be visible when keepMounted is true and open is true', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} keepMounted>
            <div>Visible Content</div>
          </Modal>
        </ThemeProvider>
      );

      const overlay = baseElement.querySelector('.vane-overlay') as HTMLElement;
      expect(overlay).toBeInTheDocument();
      // Should not have display:none
      expect(overlay?.style.display).not.toBe('none');
    });
  });

  describe('Dynamic Z-Index', () => {
    it('should have z-index as inline style', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const overlay = baseElement.querySelector('.vane-overlay');
      expect(overlay).toHaveStyle({ zIndex: 51 });
    });
  });

  describe('Data State (Transitions)', () => {
    it('should have data-state attribute on overlay and content', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const overlay = baseElement.querySelector('.vane-overlay');
      const modal = baseElement.querySelector('.vane-modal');
      // Initial mount: state is 'entered' (since open=true from start)
      expect(overlay).toHaveAttribute('data-state', 'entered');
      expect(modal).toHaveAttribute('data-state', 'entered');
    });
  });

  describe('Compound Components', () => {
    it('should render ModalHeader, ModalBody, ModalFooter inside Modal', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <ModalHeader>Header</ModalHeader>
            <ModalBody>Body</ModalBody>
            <ModalFooter>Footer</ModalFooter>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal?.querySelector('.vane-modal-header')).toBeInTheDocument();
      expect(modal?.querySelector('.vane-modal-body')).toBeInTheDocument();
      expect(modal?.querySelector('.vane-modal-footer')).toBeInTheDocument();
    });
  });

  describe('ARIA Attributes (Extended)', () => {
    it('should accept custom ariaLabelledBy', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} ariaLabelledBy="custom-label">
            <div id="custom-label">Custom Title</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveAttribute('aria-labelledby', 'custom-label');
    });

    it('should accept custom ariaDescribedBy', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} ariaDescribedBy="custom-desc">
            <div id="custom-desc">Description</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).toHaveAttribute('aria-describedby', 'custom-desc');
    });

    it('should not set aria-labelledby when not provided', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).not.toHaveAttribute('aria-labelledby');
    });
  });

  describe('Custom Animation Duration', () => {
    it('should use default duration (no custom CSS variable)', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const overlay = baseElement.querySelector('.vane-overlay') as HTMLElement;
      expect(overlay.style.getPropertyValue('--transition-duration')).toBe('');
    });

    it('should set custom --transition-duration on overlay and content', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} transitionDuration={500}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const overlay = baseElement.querySelector('.vane-overlay') as HTMLElement;
      const modal = baseElement.querySelector('.vane-modal') as HTMLElement;
      expect(overlay.style.getPropertyValue('--transition-duration')).toBe('500ms');
      expect(modal.style.getPropertyValue('--transition-duration')).toBe('500ms');
    });

    it('should not leak transitionDuration to DOM', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} transitionDuration={300}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).not.toHaveAttribute('transitionDuration');
    });
  });

  describe('Return Focus', () => {
    it('should not leak returnFocus to DOM', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} returnFocus={false}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).not.toHaveAttribute('returnFocus');
    });

    it('should not leak initialFocus to DOM', () => {
      const ref = { current: null };
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}} initialFocus={ref}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).not.toHaveAttribute('initialFocus');
    });
  });

  describe('Uncontrolled Mode', () => {
    it('should render closed by default without open prop', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      expect(baseElement.querySelector('.vane-modal')).not.toBeInTheDocument();
    });

    it('should render open with defaultOpen={true}', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal defaultOpen>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      expect(baseElement.querySelector('.vane-modal')).toBeInTheDocument();
    });

    it('should fire onOpenChange when Escape is pressed', () => {
      const onOpenChange = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Modal defaultOpen onOpenChange={onOpenChange}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('should fire onOpenChange when overlay is clicked', () => {
      const onOpenChange = jest.fn();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal defaultOpen onOpenChange={onOpenChange}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const overlay = baseElement.querySelector('.vane-overlay');
      fireEvent.click(overlay!);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('should still work in controlled mode', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={true} onClose={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      expect(baseElement.querySelector('.vane-modal')).toBeInTheDocument();
    });

    it('should not leak defaultOpen or onOpenChange to DOM', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal defaultOpen onOpenChange={() => {}}>
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).not.toHaveAttribute('defaultOpen');
      expect(modal).not.toHaveAttribute('onOpenChange');
    });
  });

  describe('New Boolean Props Do Not Leak to DOM', () => {
    it('should not leak new boolean props to DOM', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal
            open={true}
            onClose={() => {}}
            keepMounted
            noAnimation
            closeButton
            centered
            fullScreen
          >
            <div>Content</div>
          </Modal>
        </ThemeProvider>
      );

      const modal = baseElement.querySelector('.vane-modal');
      expect(modal).not.toHaveAttribute('keepMounted');
      expect(modal).not.toHaveAttribute('noAnimation');
      expect(modal).not.toHaveAttribute('closeButton');
      expect(modal).not.toHaveAttribute('centered');
      expect(modal).not.toHaveAttribute('fullScreen');
    });
  });
});
