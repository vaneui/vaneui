import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import {
  Popup,
  ThemeProvider,
  defaultTheme
} from '../../index';
import { resetStackCount } from '../utils/stackingContext';

describe('Popup Component Tests', () => {
  beforeEach(() => { resetStackCount(); });
  // Helper to create an anchor element
  const createAnchorRef = () => {
    const ref = { current: document.createElement('button') };
    document.body.appendChild(ref.current);
    return ref;
  };

  afterEach(() => {
    // Clean up any anchor elements added to the body
    document.body.querySelectorAll('button').forEach(el => el.remove());
  });

  describe('Basic Rendering', () => {
    it('should render when open is true', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Popup Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toBeInTheDocument();
    });

    it('should not render when open is false', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={false} onClose={() => {}} anchorRef={anchorRef}>
            <div>Popup Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).not.toBeInTheDocument();
    });

    it('should render with default classes', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toBeInTheDocument();
      // Flexbox layout from boolean props
      expect(popup).toHaveClass('flex', 'flex-col');
      // Width from CSS variable, max-height hardcoded
      expect(popup).toHaveClass('w-fit', 'max-h-(--popup-max-height)');
      // Overflow from boolean prop
      expect(popup).toHaveClass('overflow-auto');
    });

    it('should render children', () => {
      const anchorRef = createAnchorRef();
      const { getByText } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Test Popup Content</div>
          </Popup>
        </ThemeProvider>
      );

      expect(getByText('Test Popup Content')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should apply xs size', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} xs>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveAttribute('data-size', 'xs');
    });

    it('should apply sm size', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} sm>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveAttribute('data-size', 'sm');
    });

    it('should apply md size by default', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveAttribute('data-size', 'md');
    });

    it('should apply lg size', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} lg>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveAttribute('data-size', 'lg');
    });

    it('should apply xl size', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} xl>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveAttribute('data-size', 'xl');
    });
  });

  describe('Close Behaviors', () => {
    it('should call onClose when pressing Escape', () => {
      const anchorRef = createAnchorRef();
      const onClose = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={onClose} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose on Escape when closeOnEscape is false', () => {
      const anchorRef = createAnchorRef();
      const onClose = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={onClose} anchorRef={anchorRef} closeOnEscape={false}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should call onClose when clicking outside', async () => {
      const anchorRef = createAnchorRef();
      const onClose = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={onClose} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      // Wait for setTimeout in click outside handler
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
      });

      fireEvent.mouseDown(document.body);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose when clicking inside popup', async () => {
      const anchorRef = createAnchorRef();
      const onClose = jest.fn();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={onClose} anchorRef={anchorRef}>
            <div data-testid="content">Content</div>
          </Popup>
        </ThemeProvider>
      );

      // Wait for setTimeout in click outside handler
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
      });

      const popup = baseElement.querySelector('.vane-popup');
      fireEvent.mouseDown(popup!);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should not call onClose when clicking on anchor', async () => {
      const anchorRef = createAnchorRef();
      const onClose = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={onClose} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      // Wait for setTimeout in click outside handler
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
      });

      fireEvent.mouseDown(anchorRef.current!);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should not call onClose on outside click when closeOnClickOutside is false', async () => {
      const anchorRef = createAnchorRef();
      const onClose = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={onClose} anchorRef={anchorRef} closeOnClickOutside={false}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      // Wait for setTimeout in click outside handler
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
      });

      fireEvent.mouseDown(document.body);
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Placement', () => {
    it('should default to top placement', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      // CSS Anchor Positioning properties are set via style.setProperty
      expect(popup).toHaveStyle({ position: 'fixed' });
    });

    it('should accept placement as boolean prop', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} top>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toBeInTheDocument();
    });

    it('should accept all placement boolean props', () => {
      const anchorRef = createAnchorRef();
      const placements = [
        'top', 'topStart', 'topEnd',
        'bottom', 'bottomStart', 'bottomEnd',
        'left', 'leftStart', 'leftEnd',
        'right', 'rightStart', 'rightEnd',
      ] as const;

      placements.forEach(placement => {
        const { baseElement, unmount } = render(
          <ThemeProvider theme={defaultTheme}>
            <Popup open={true} onClose={() => {}} anchorRef={anchorRef} {...{[placement]: true}}>
              <div>Content</div>
            </Popup>
          </ThemeProvider>
        );

        const popup = baseElement.querySelector('.vane-popup');
        expect(popup).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to the popup element', () => {
      const anchorRef = createAnchorRef();
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Popup ref={ref} open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('vane-popup');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with theme classes', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} className="custom-popup-class">
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveClass('flex', 'flex-col'); // theme classes
      expect(popup).toHaveClass('custom-popup-class'); // custom class
    });
  });

  describe('Shape Variants', () => {
    it('should apply rounded shape by default', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveClass('rounded-(--br)');
    });

    it('should apply sharp shape', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} sharp>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveClass('rounded-none');
    });

    it('should apply pill shape', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} pill>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveClass('rounded-full');
    });
  });

  describe('Padding and Gap', () => {
    it('should have padding by default', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveClass('px-(--px)', 'py-(--py)');
    });

    it('should have gap by default', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveClass('gap-(--gap)');
    });
  });

  describe('Shadow', () => {
    it('should have shadow by default', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveClass('shadow-(--shadow-base)');
    });

    it('should not have shadow when noShadow is true', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} noShadow>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).not.toHaveClass('shadow-(--shadow-base)');
    });
  });

  describe('Boolean Props Do Not Leak to DOM', () => {
    it('should not leak boolean props to DOM', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup
            open={true}
            onClose={() => {}}
            anchorRef={anchorRef}
            lg
            rounded
            padding
            gap
            shadow
            closeOnClickOutside
            closeOnEscape
            portal
            matchWidth
          >
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).not.toHaveAttribute('lg');
      expect(popup).not.toHaveAttribute('rounded');
      expect(popup).not.toHaveAttribute('padding');
      expect(popup).not.toHaveAttribute('gap');
      expect(popup).not.toHaveAttribute('shadow');
      expect(popup).not.toHaveAttribute('closeOnClickOutside');
      expect(popup).not.toHaveAttribute('closeOnEscape');
      expect(popup).not.toHaveAttribute('portal');
      expect(popup).not.toHaveAttribute('matchWidth');
    });
  });

  describe('HTML Attributes', () => {
    it('should pass through HTML attributes', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup
            open={true}
            onClose={() => {}}
            anchorRef={anchorRef}
            data-testid="popup"
            id="my-popup"
          >
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveAttribute('data-testid', 'popup');
      expect(popup).toHaveAttribute('id', 'my-popup');
    });
  });

  describe('Positioning', () => {
    it('should apply position: fixed and JS fallback positioning when open', () => {
      // JSDOM does not support CSS Anchor Positioning, so the JS fallback is used.
      // In JS fallback mode, top/left are set instead of anchor-name/position-area.
      const anchorRef = createAnchorRef();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = document.querySelector('.vane-popup');
      expect(popup).toHaveStyle({ position: 'fixed' });
    });

    it('should apply position: fixed to popup', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveStyle({ position: 'fixed' });
    });
  });

  describe('Height Props', () => {
    it('should apply hFull class for full height', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} hFull>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );
      const el = baseElement.querySelector('.vane-popup');
      expect(el).toHaveClass('h-full');
    });

    it('should apply hFit class for fit-content height', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} hFit>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );
      const el = baseElement.querySelector('.vane-popup');
      expect(el).toHaveClass('h-fit');
    });

    it('should apply hAuto class for auto height', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} hAuto>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );
      const el = baseElement.querySelector('.vane-popup');
      expect(el).toHaveClass('h-auto');
    });
  });

  describe('keepMounted', () => {
    it('should keep DOM mounted when keepMounted is true and open is false', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={false} onClose={() => {}} anchorRef={anchorRef} keepMounted>
            <div>Hidden Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toBeInTheDocument();
      expect(popup).toHaveStyle({ display: 'none' });
    });

    it('should be visible when keepMounted is true and open is true', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} keepMounted>
            <div>Visible Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup') as HTMLElement;
      expect(popup).toBeInTheDocument();
      expect(popup?.style.display).not.toBe('none');
    });

    it('should have aria-hidden when keepMounted and closed', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={false} onClose={() => {}} anchorRef={anchorRef} keepMounted>
            <div>Hidden</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Dynamic Z-Index', () => {
    it('should have z-index as inline style', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveStyle({ zIndex: 51 });
    });
  });

  describe('Data State (Transitions)', () => {
    it('should have data-state attribute when open', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveAttribute('data-state', 'entered');
    });
  });

  describe('ARIA Attributes', () => {
    it('should have role="dialog" by default', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveAttribute('role', 'dialog');
    });

    it('should accept custom role', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} role="menu">
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveAttribute('role', 'menu');
    });

    it('should have an id for aria-controls linkage', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveAttribute('id');
      expect(popup!.getAttribute('id')).toBeTruthy();
    });

    it('should use user-provided id over generated one', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} id="custom-popup">
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveAttribute('id', 'custom-popup');
    });
  });

  describe('Custom Animation Duration', () => {
    it('should use default duration (no custom CSS variable)', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup') as HTMLElement;
      expect(popup.style.getPropertyValue('--transition-duration')).toBe('');
    });

    it('should set custom --transition-duration CSS variable', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} transitionDuration={500}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup') as HTMLElement;
      expect(popup.style.getPropertyValue('--transition-duration')).toBe('500ms');
    });

    it('should not leak transitionDuration to DOM', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} transitionDuration={300}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).not.toHaveAttribute('transitionDuration');
    });
  });

  describe('Arrow', () => {
    it('should not render arrow by default', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      expect(baseElement.querySelector('.vane-popup-arrow')).not.toBeInTheDocument();
    });

    it('should render arrow when arrow={true}', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} arrow>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const arrow = baseElement.querySelector('.vane-popup-arrow');
      expect(arrow).toBeInTheDocument();
      expect(arrow).toHaveAttribute('aria-hidden', 'true');
    });

    it('should set --arrow-size CSS variable', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} arrow arrowSize={12}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup') as HTMLElement;
      expect(popup.style.getPropertyValue('--arrow-size')).toBe('12px');
    });

    it('should use overflow-visible when arrow is enabled', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} arrow>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveClass('overflow-visible');
      expect(popup).not.toHaveClass('overflow-auto');
    });

    it('should not leak arrow/arrowSize to DOM', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} arrow arrowSize={10}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).not.toHaveAttribute('arrow');
      expect(popup).not.toHaveAttribute('arrowSize');
    });
  });

  describe('Data Placement', () => {
    it('should set data-placement attribute when open', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef} bottom>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      const popup = baseElement.querySelector('.vane-popup');
      expect(popup).toHaveAttribute('data-placement');
    });
  });

  describe('Uncontrolled Mode', () => {
    it('should render closed by default without open prop', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      expect(baseElement.querySelector('.vane-popup')).not.toBeInTheDocument();
    });

    it('should render open with defaultOpen={true}', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup anchorRef={anchorRef} defaultOpen>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();
    });

    it('should fire onOpenChange when state changes', () => {
      const anchorRef = createAnchorRef();
      const onOpenChange = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Popup anchorRef={anchorRef} defaultOpen onOpenChange={onOpenChange} closeOnEscape>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      // Close via Escape
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('should still work in controlled mode with open prop', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
            <div>Content</div>
          </Popup>
        </ThemeProvider>
      );

      expect(baseElement.querySelector('.vane-popup')).toBeInTheDocument();
    });
  });

  describe('Portal Rendering', () => {
    it('should render in portal by default', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <div id="container">
            <Popup open={true} onClose={() => {}} anchorRef={anchorRef}>
              <div>Content</div>
            </Popup>
          </div>
        </ThemeProvider>
      );

      const container = baseElement.querySelector('#container');
      const popup = baseElement.querySelector('.vane-popup');

      // Popup should not be inside the container (it's in a portal)
      expect(container?.contains(popup!)).toBe(false);
      // But it should be in the document
      expect(popup).toBeInTheDocument();
    });

    it('should render inline when portal is false', () => {
      const anchorRef = createAnchorRef();
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <div id="container">
            <Popup open={true} onClose={() => {}} anchorRef={anchorRef} portal={false}>
              <div>Content</div>
            </Popup>
          </div>
        </ThemeProvider>
      );

      const container = baseElement.querySelector('#container');
      const popup = baseElement.querySelector('.vane-popup');

      // Popup should be inside the container (no portal)
      expect(container?.contains(popup!)).toBe(true);
    });
  });
});
