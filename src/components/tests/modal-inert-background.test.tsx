import '@testing-library/jest-dom';
import { StrictMode, useState } from 'react';
import { render, act, waitFor, fireEvent } from '@testing-library/react';

import { Modal, Overlay, ThemeProvider, defaultTheme, useOverlayRegistration } from '../../index';
import { resetStackCount } from '../utils/stackingContext';
import { resetOverlayStack, registerOverlay, setOverlayOpener, isInClosedOverlay } from '../utils/overlayStack';
import { resetEscapeStack } from '../utils/escapeStack';

// An open Modal makes every other child of <body> inert. These tests cover what it must leave
// alone: a VaneUI Overlay, a portal of another library that is marked or registered, and the whole
// background when the consumer turns inerting off.

const wrap = (ui: React.ReactElement) => <ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>;

const bodyChildOf = (el: Element) =>
  Array.from(document.body.children).find((child) => child === el || child.contains(el)) as HTMLElement;

/** A stand-in for a portal that another library appends to <body>. */
function appendToBody(attributes: Record<string, string> = {}): HTMLDivElement {
  const el = document.createElement('div');
  for (const [name, value] of Object.entries(attributes)) el.setAttribute(name, value);
  document.body.appendChild(el);
  return el;
}

describe('Modal inert background', () => {
  const added: HTMLElement[] = [];
  const addToBody = (attributes?: Record<string, string>) => {
    const el = appendToBody(attributes);
    added.push(el);
    return el;
  };

  beforeEach(() => {
    resetStackCount();
    resetOverlayStack();
    resetEscapeStack();
  });

  afterEach(() => {
    added.splice(0).forEach((el) => el.remove());
  });

  describe('a VaneUI Overlay', () => {
    it('should stay usable when it is open together with a Modal', () => {
      const background = addToBody();
      render(wrap(
        <>
          <Modal open onClose={() => {}} title="Dialog">content</Modal>
          <Overlay open><button data-testid="in-overlay">Action</button></Overlay>
        </>
      ));

      const overlay = bodyChildOf(document.body.querySelector('[data-testid="in-overlay"]')!);
      expect(overlay).toHaveClass('vane-overlay');
      expect(overlay).not.toHaveAttribute('inert');
      expect(overlay).not.toHaveAttribute('aria-hidden');
      // the rest of the page still is
      expect(background).toHaveAttribute('inert');
    });

    it('should be released when it opens after the Modal', () => {
      function OpenFromModal() {
        const [open, setOpen] = useState(false);
        return (
          <>
            <Modal open onClose={() => {}} title="Dialog">
              <button data-testid="open-overlay" onClick={() => setOpen(true)}>More</button>
            </Modal>
            <Overlay open={open} onClose={() => setOpen(false)} noAnimation>
              <button data-testid="in-overlay">Action</button>
            </Overlay>
          </>
        );
      }
      render(wrap(<OpenFromModal />));
      expect(document.body.querySelector('[data-testid="in-overlay"]')).not.toBeInTheDocument();

      fireEvent.click(document.body.querySelector('[data-testid="open-overlay"]')!);

      const overlay = bodyChildOf(document.body.querySelector('[data-testid="in-overlay"]')!);
      expect(overlay).not.toHaveAttribute('inert');
      expect(overlay).not.toHaveAttribute('aria-hidden');
    });

    it('should not keep its container live when it is rendered in place', () => {
      // an in-place overlay (a loading scrim over a card) is part of the background it sits in
      const { container } = render(wrap(
        <>
          <Overlay open portal={false}><span>Loading</span></Overlay>
          <Modal open onClose={() => {}} title="Dialog">content</Modal>
        </>
      ));

      expect(container.querySelector('.vane-overlay')).toBeInTheDocument();
      expect(bodyChildOf(container)).toHaveAttribute('inert');
    });
  });

  describe('the data-vane-overlay attribute', () => {
    it('should keep a marked child of <body> out of the inert pass', () => {
      const marked = addToBody({ 'data-vane-overlay': '' });
      const plain = addToBody();
      render(wrap(<Modal open onClose={() => {}} title="Dialog">content</Modal>));

      expect(marked).not.toHaveAttribute('inert');
      expect(marked).not.toHaveAttribute('aria-hidden');
      expect(plain).toHaveAttribute('inert');
    });

    it('should spare a marked element that is added while the Modal is open', async () => {
      render(wrap(<Modal open onClose={() => {}} title="Dialog">content</Modal>));

      const late = addToBody({ 'data-vane-overlay': '' });
      const latePlain = addToBody();
      await waitFor(() => expect(latePlain).toHaveAttribute('inert'));
      expect(late).not.toHaveAttribute('inert');
    });

    it('should release an element when the attribute is set after the Modal opened', async () => {
      const el = addToBody();
      render(wrap(<Modal open onClose={() => {}} title="Dialog">content</Modal>));
      expect(el).toHaveAttribute('inert');

      el.setAttribute('data-vane-overlay', '');
      await waitFor(() => expect(el).not.toHaveAttribute('inert'));
      expect(el).not.toHaveAttribute('aria-hidden');
    });

    it('should make the element inert again when the attribute is removed', async () => {
      const el = addToBody({ 'data-vane-overlay': '' });
      render(wrap(<Modal open onClose={() => {}} title="Dialog">content</Modal>));
      expect(el).not.toHaveAttribute('inert');

      el.removeAttribute('data-vane-overlay');
      await waitFor(() => expect(el).toHaveAttribute('inert'));
    });

    it('should count on the child of <body> only, not on something nested in it', () => {
      const container = addToBody();
      const nested = document.createElement('div');
      nested.setAttribute('data-vane-overlay', '');
      container.appendChild(nested);
      render(wrap(<Modal open onClose={() => {}} title="Dialog">content</Modal>));

      // marking one element deep in the page must not switch the whole page back on
      expect(container).toHaveAttribute('inert');
    });

    it('should leave the attributes the element already had when the Modal closes', () => {
      const marked = addToBody({ 'data-vane-overlay': '', 'aria-hidden': 'true' });
      const { rerender } = render(wrap(<Modal open onClose={() => {}} title="Dialog" noAnimation>content</Modal>));
      rerender(wrap(<Modal open={false} onClose={() => {}} title="Dialog" noAnimation>content</Modal>));

      expect(marked).toHaveAttribute('aria-hidden', 'true');
      expect(marked).not.toHaveAttribute('inert');
    });
  });

  describe('useOverlayRegistration', () => {
    function ThirdPartyPortal({ shown = true, nested = false }: { shown?: boolean; nested?: boolean }) {
      const overlayRef = useOverlayRegistration();
      if (!shown) return null;
      return nested
        ? <div data-testid="portal-root"><div ref={overlayRef} data-testid="third-party">Popover</div></div>
        : <div ref={overlayRef} data-testid="third-party">Popover</div>;
    }

    // rendered into its own child of <body>, as another library's portal would be
    const renderPortal = (ui: React.ReactElement) => render(ui, { container: addToBody() });

    it('should keep a registered element usable while a Modal is open', () => {
      const background = addToBody();
      const portal = renderPortal(<ThirdPartyPortal />);
      render(wrap(<Modal open onClose={() => {}} title="Dialog">content</Modal>));

      expect(bodyChildOf(portal.getByTestId('third-party'))).not.toHaveAttribute('inert');
      expect(background).toHaveAttribute('inert');
    });

    it('should keep the body-level container of a nested registered element usable', () => {
      const portal = renderPortal(<ThirdPartyPortal nested />);
      render(wrap(<Modal open onClose={() => {}} title="Dialog">content</Modal>));

      expect(bodyChildOf(portal.getByTestId('third-party'))).toBe(portal.container);
      expect(portal.container).not.toHaveAttribute('inert');
    });

    it('should register an element that mounts after the Modal opened, and drop it when it unmounts', () => {
      const portal = renderPortal(<ThirdPartyPortal shown={false} />);
      render(wrap(<Modal open onClose={() => {}} title="Dialog">content</Modal>));
      expect(portal.container).toHaveAttribute('inert');

      portal.rerender(<ThirdPartyPortal />);
      expect(portal.container).not.toHaveAttribute('inert');

      portal.rerender(<ThirdPartyPortal shown={false} />);
      expect(portal.container).toHaveAttribute('inert');
    });

    it('should drop the registration when the component unmounts', () => {
      const portal = renderPortal(<ThirdPartyPortal />);
      render(wrap(<Modal open onClose={() => {}} title="Dialog">content</Modal>));
      const container = portal.container;
      expect(container).not.toHaveAttribute('inert');

      portal.unmount();
      expect(container).toHaveAttribute('inert');
    });

    it('should work under Strict Mode', () => {
      const portal = renderPortal(<StrictMode><ThirdPartyPortal /></StrictMode>);
      render(wrap(<Modal open onClose={() => {}} title="Dialog">content</Modal>));

      expect(portal.container).not.toHaveAttribute('inert');
    });

    it('should return the same ref callback on every render', () => {
      const seen: unknown[] = [];
      function Probe() {
        seen.push(useOverlayRegistration());
        return null;
      }
      const { rerender } = render(<Probe />);
      rerender(<Probe />);
      expect(seen[0]).toBe(seen[seen.length - 1]);
    });

    it('should accept the element by hand and release it on null', () => {
      let register: (el: HTMLElement | null) => void = () => {};
      function Probe() {
        register = useOverlayRegistration();
        return null;
      }
      render(<Probe />);
      const el = addToBody();
      render(wrap(<Modal open onClose={() => {}} title="Dialog">content</Modal>));
      expect(el).toHaveAttribute('inert');

      act(() => register(el));
      expect(el).not.toHaveAttribute('inert');

      act(() => register(null));
      expect(el).toHaveAttribute('inert');
    });
  });

  describe('the inertBackground prop', () => {
    it('should leave the background alone when it is false', () => {
      const background = addToBody();
      render(wrap(<Modal open onClose={() => {}} title="Dialog" inertBackground={false}>content</Modal>));

      expect(background).not.toHaveAttribute('inert');
      expect(background).not.toHaveAttribute('aria-hidden');
    });

    it('should make the background inert by default and when it is true', () => {
      const background = addToBody();
      const { rerender } = render(wrap(<Modal open onClose={() => {}} title="Dialog">content</Modal>));
      expect(background).toHaveAttribute('inert');

      rerender(wrap(<Modal open onClose={() => {}} title="Dialog" inertBackground>content</Modal>));
      expect(background).toHaveAttribute('inert');
    });

    it('should follow the prop while the Modal stays open', () => {
      const background = addToBody();
      const ui = (inertBackground: boolean) => wrap(
        <Modal open onClose={() => {}} title="Dialog" inertBackground={inertBackground}>content</Modal>
      );
      const { rerender } = render(ui(false));
      expect(background).not.toHaveAttribute('inert');

      rerender(ui(true));
      expect(background).toHaveAttribute('inert');

      rerender(ui(false));
      expect(background).not.toHaveAttribute('inert');
    });

    it('should not reach the DOM, and keep the dialog modal with its focus trap', () => {
      render(wrap(<Modal open onClose={() => {}} title="Dialog" inertBackground={false}>content</Modal>));
      const dialog = document.body.querySelector('[role="dialog"]') as HTMLElement;

      expect(dialog).not.toHaveAttribute('inertBackground');
      expect(dialog).not.toHaveAttribute('inertbackground');
      expect(dialog.parentElement).not.toHaveAttribute('inertBackground');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });
  });
});

describe('isInClosedOverlay with an Overlay around a popup', () => {
  beforeEach(() => {
    resetOverlayStack();
  });

  it('should still call a popup closed when only the Overlay around it is registered', () => {
    const overlay = document.createElement('div');
    const popup = document.createElement('div');
    const item = document.createElement('button');
    popup.appendChild(item);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    setOverlayOpener(popup, () => null);
    const unregisterOverlay = registerOverlay(overlay);
    // the popup is closing: known, but no longer in the open set
    expect(isInClosedOverlay(item)).toBe(true);

    const unregisterPopup = registerOverlay(popup, overlay);
    expect(isInClosedOverlay(item)).toBe(false);

    unregisterPopup();
    unregisterOverlay();
    overlay.remove();
  });

  it('should call a dialog open through the backdrop that names it as its content', () => {
    const backdrop = document.createElement('div');
    const dialog = document.createElement('div');
    const button = document.createElement('button');
    dialog.appendChild(button);
    backdrop.appendChild(dialog);
    document.body.appendChild(backdrop);

    setOverlayOpener(dialog, () => null);
    expect(isInClosedOverlay(button)).toBe(true);

    const unregister = registerOverlay(backdrop, null, dialog);
    expect(isInClosedOverlay(button)).toBe(false);

    unregister();
    expect(isInClosedOverlay(button)).toBe(true);
    backdrop.remove();
  });
});
