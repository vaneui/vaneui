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

// Several dialogs can make the same child of <body> inert. Each one holds it, and the page comes
// back only when the last of them lets go, with the attributes it had before any dialog opened.
describe('Modal inert background with stacked dialogs', () => {
  beforeEach(() => {
    resetStackCount();
    resetOverlayStack();
    resetEscapeStack();
  });

  const expectLive = (el: Element) => {
    expect(el).not.toHaveAttribute('inert');
    expect(el).not.toHaveAttribute('aria-hidden');
  };
  const expectInert = (el: Element) => {
    expect(el).toHaveAttribute('inert');
    expect(el).toHaveAttribute('aria-hidden', 'true');
  };

  // the inner dialog is still open while its parent plays its exit, and unmounts with it afterwards
  it('should bring the page back when a nested Modal closes together with its parent', async () => {
    function EditDialog() {
      const [outer, setOuter] = useState(false);
      const [inner, setInner] = useState(false);
      return (
        <>
          <button data-testid="edit" onClick={() => setOuter(true)}>Edit item</button>
          <Modal open={outer} onClose={() => setOuter(false)} title="Edit item" transitionDuration={20}>
            <button data-testid="delete" onClick={() => setInner(true)}>Delete</button>
            <Modal open={inner} onClose={() => setInner(false)} title="Delete this item?" transitionDuration={20}>
              <button data-testid="confirm" onClick={() => setOuter(false)}>Yes, delete</button>
            </Modal>
          </Modal>
        </>
      );
    }
    const { container, getByTestId } = render(wrap(<EditDialog />));

    fireEvent.click(getByTestId('edit'));
    fireEvent.click(document.body.querySelector('[data-testid="delete"]')!);
    expect(document.body.querySelectorAll('[role="dialog"]')).toHaveLength(2);
    expectInert(container);

    fireEvent.click(document.body.querySelector('[data-testid="confirm"]')!);
    await waitFor(() => expect(document.body.querySelectorAll('[role="dialog"]')).toHaveLength(0));
    expectLive(container);
  });

  it('should bring the page back when sibling Modals close in one handler', () => {
    let closeBoth: () => void = () => {};
    function TwoDialogs() {
      const [a, setA] = useState(true);
      const [b, setB] = useState(true);
      closeBoth = () => { setB(false); setA(false); };
      return (
        <>
          <Modal open={a} onClose={() => setA(false)} title="A" noAnimation>a</Modal>
          <Modal open={b} onClose={() => setB(false)} title="B" noAnimation>b</Modal>
        </>
      );
    }
    const background = document.body.appendChild(document.createElement('div'));
    const { container } = render(wrap(<TwoDialogs />));
    expectInert(container);
    expectInert(background);

    act(() => closeBoth());
    expectLive(container);
    expectLive(background);
    background.remove();
  });

  it('should keep the page inert while the upper Modal stays open after the lower one closed', () => {
    let closeLower: () => void = () => {};
    let closeUpper: () => void = () => {};
    function TwoDialogs() {
      const [lower, setLower] = useState(true);
      const [upper, setUpper] = useState(true);
      closeLower = () => setLower(false);
      closeUpper = () => setUpper(false);
      return (
        <>
          <Modal open={lower} onClose={() => setLower(false)} title="Lower" noAnimation>lower</Modal>
          <Modal open={upper} onClose={() => setUpper(false)} title="Upper" noAnimation>upper</Modal>
        </>
      );
    }
    const background = document.body.appendChild(document.createElement('div'));
    const { container } = render(wrap(<TwoDialogs />));

    act(() => closeLower());
    expect(document.body.querySelectorAll('[role="dialog"]')).toHaveLength(1);
    expectInert(container);
    expectInert(background);

    act(() => closeUpper());
    expectLive(container);
    expectLive(background);
    background.remove();
  });

  it('should restore the attributes the page had before any dialog opened, whatever the closing order', () => {
    const hidden = document.body.appendChild(document.createElement('div'));
    hidden.setAttribute('aria-hidden', 'true');
    const inertAlready = document.body.appendChild(document.createElement('div'));
    inertAlready.setAttribute('inert', '');
    const shown = document.body.appendChild(document.createElement('div'));
    shown.setAttribute('aria-hidden', 'false');

    const ui = (a: boolean, b: boolean) => wrap(
      <>
        <Modal open={a} onClose={() => {}} title="A" noAnimation>a</Modal>
        <Modal open={b} onClose={() => {}} title="B" noAnimation>b</Modal>
      </>
    );
    const { rerender } = render(ui(true, false));
    rerender(ui(true, true));
    for (const el of [hidden, inertAlready, shown]) expectInert(el);

    // the first dialog closes before the second
    rerender(ui(false, true));
    for (const el of [hidden, inertAlready, shown]) expectInert(el);
    rerender(ui(false, false));

    expect(hidden).toHaveAttribute('aria-hidden', 'true');
    expect(hidden).not.toHaveAttribute('inert');
    expect(inertAlready).toHaveAttribute('inert');
    expect(inertAlready).not.toHaveAttribute('aria-hidden');
    expect(shown).toHaveAttribute('aria-hidden', 'false');
    expect(shown).not.toHaveAttribute('inert');

    hidden.remove();
    inertAlready.remove();
    shown.remove();
  });
});
