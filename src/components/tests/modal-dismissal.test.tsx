import '@testing-library/jest-dom';
import { useCallback, useRef, useState } from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import { Modal, Menu, MenuItem, Button, Popup, Tooltip, ThemeProvider, defaultTheme } from '../../index';
import { resetStackCount } from '../utils/stackingContext';
import { resetOverlayStack } from '../utils/overlayStack';
import { resetEscapeStack } from '../utils/escapeStack';

const getBackdrop = () => document.body.querySelector('.vane-overlay') as HTMLElement;

describe('Modal dismissal', () => {
  beforeEach(() => {
    resetStackCount();
    resetOverlayStack();
    resetEscapeStack();
  });

  // A click's target is the nearest common ancestor of where the press started and where it
  // ended. Pressing inside the dialog and releasing over the backdrop therefore clicks the backdrop.
  describe('backdrop click after a drag', () => {
    const renderModal = (onClose: () => void, overlayProps?: Record<string, unknown>) =>
      render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open onClose={onClose} title="Form" overlayProps={overlayProps}>
            <input data-testid="field" defaultValue="some text to select" />
          </Modal>
        </ThemeProvider>
      );

    it('should stay open when the press started inside the dialog and ended on the backdrop', () => {
      const onClose = jest.fn();
      const { getByTestId } = renderModal(onClose);

      fireEvent.mouseDown(getByTestId('field'));
      fireEvent.mouseUp(getBackdrop());
      fireEvent.click(getBackdrop());

      expect(onClose).not.toHaveBeenCalled();
    });

    it('should close when the press started and ended on the backdrop', () => {
      const onClose = jest.fn();
      renderModal(onClose);

      fireEvent.mouseDown(getBackdrop());
      fireEvent.mouseUp(getBackdrop());
      fireEvent.click(getBackdrop());

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should close on a backdrop click that follows an ignored drag', () => {
      const onClose = jest.fn();
      const { getByTestId } = renderModal(onClose);

      fireEvent.mouseDown(getByTestId('field'));
      fireEvent.click(getBackdrop());
      expect(onClose).not.toHaveBeenCalled();

      // the drag is over: the next click on the backdrop is a real one, with or without a press event
      fireEvent.click(getBackdrop());
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should see a press inside the dialog even when a child stops its propagation', () => {
      const onClose = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open onClose={onClose} title="Form">
            <div data-testid="widget" onMouseDown={(e) => e.stopPropagation()}>custom widget</div>
          </Modal>
        </ThemeProvider>
      );

      fireEvent.mouseDown(document.body.querySelector('[data-testid="widget"]')!);
      fireEvent.click(getBackdrop());

      expect(onClose).not.toHaveBeenCalled();
    });

    it('should still run a mouse-down handler passed through overlayProps', () => {
      const onClose = jest.fn();
      const onMouseDownCapture = jest.fn();
      const { getByTestId } = renderModal(onClose, { onMouseDownCapture });

      fireEvent.mouseDown(getByTestId('field'));
      fireEvent.click(getBackdrop());

      expect(onMouseDownCapture).toHaveBeenCalledTimes(1);
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('backdrop click after a press on the backdrop that ends in the dialog', () => {
    it('should stay open when the press started on the backdrop and ended inside the dialog', () => {
      const onClose = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open onClose={onClose} title="Form"><input data-testid="field" /></Modal>
        </ThemeProvider>
      );

      fireEvent.mouseDown(getBackdrop());
      fireEvent.mouseUp(document.body.querySelector('[data-testid="field"]')!);
      // the click lands on the nearest common ancestor: the backdrop
      fireEvent.click(getBackdrop());

      expect(onClose).not.toHaveBeenCalled();

      // the gesture is over: the next real click on the backdrop closes
      fireEvent.mouseDown(getBackdrop());
      fireEvent.mouseUp(getBackdrop());
      fireEvent.click(getBackdrop());
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  // A click inside the dialog reaches listeners on the document (delegated analytics, a widget in
  // the dialog that closes on a click outside itself), and still does not close the Modal.
  describe('clicks inside the dialog', () => {
    let seen: EventTarget[] = [];
    const listener = (e: Event) => { seen.push(e.target as EventTarget); };
    beforeEach(() => {
      seen = [];
      document.addEventListener('click', listener);
    });
    afterEach(() => document.removeEventListener('click', listener));

    it('should reach a click listener on the document', () => {
      const onClose = jest.fn();
      const { getByTestId } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open onClose={onClose} title="Track"><button data-testid="inside">Buy</button></Modal>
        </ThemeProvider>
      );
      const inside = getByTestId('inside');

      fireEvent.mouseDown(inside);
      fireEvent.mouseUp(inside);
      fireEvent.click(inside);

      expect(seen).toContain(inside);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should not close the Modal on a click inside the dialog, also without press events', () => {
      const onClose = jest.fn();
      const { getByTestId } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open onClose={onClose} title="Track"><span data-testid="text">Some text</span></Modal>
        </ThemeProvider>
      );

      fireEvent.click(getByTestId('text'));
      fireEvent.click(document.body.querySelector('[role="dialog"]')!);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should still run a click handler passed to the dialog', () => {
      const onClick = jest.fn();
      const { getByTestId } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open onClose={() => {}} title="Track" onClick={onClick}><button data-testid="inside">Buy</button></Modal>
        </ThemeProvider>
      );

      fireEvent.click(getByTestId('inside'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  // Escape closes one layer at a time, the one on top first.
  describe('Escape with two modals open', () => {
    const isOpen = (testId: string) => document.body.querySelector(`[data-testid="${testId}"]`) !== null;
    const pressEscape = () => fireEvent.keyDown(document, { key: 'Escape' });

    // B is declared next to A and opened from it; A's inline onClose gets a new identity on every render
    function Siblings() {
      const [a, setA] = useState(true);
      const [b, setB] = useState(false);
      const [, setTick] = useState(0);
      const closeB = useCallback(() => setB(false), []);
      return (
        <ThemeProvider theme={defaultTheme}>
          <Modal open={a} onClose={() => setA(false)} title="A" noAnimation data-testid="modal-a">
            <button data-testid="open-b" onClick={() => setB(true)}>open B</button>
          </Modal>
          <Modal open={b} onClose={closeB} title="B" noAnimation data-testid="modal-b">
            <button data-testid="rerender" onClick={() => setTick((t) => t + 1)}>re-render</button>
          </Modal>
        </ThemeProvider>
      );
    }

    // B is rendered inside A's content; with `inPlace` it is not portaled, so it opens in the same commit as A
    function Nested({ initialB = false, inPlace = false }: { initialB?: boolean; inPlace?: boolean }) {
      const [a, setA] = useState(true);
      const [b, setB] = useState(initialB);
      return (
        <ThemeProvider theme={defaultTheme}>
          <Modal open={a} onClose={() => setA(false)} title="A" noAnimation data-testid="modal-a">
            <button data-testid="open-b" onClick={() => setB(true)}>open B</button>
            <Modal open={b} onClose={() => setB(false)} title="B" noAnimation portal={!inPlace} data-testid="modal-b">
              inner
            </Modal>
          </Modal>
        </ThemeProvider>
      );
    }

    it('should close the modal opened last, then the one under it (siblings)', () => {
      const { getByTestId } = render(<Siblings />);
      fireEvent.click(getByTestId('open-b'));
      expect(isOpen('modal-b')).toBe(true);

      pressEscape();
      expect(isOpen('modal-b')).toBe(false);
      expect(isOpen('modal-a')).toBe(true);

      pressEscape();
      expect(isOpen('modal-a')).toBe(false);
    });

    it('should keep that order after the lower modal re-renders with a new onClose', () => {
      const { getByTestId } = render(<Siblings />);
      fireEvent.click(getByTestId('open-b'));
      // a state change in the parent re-renders A with a fresh inline onClose
      fireEvent.click(getByTestId('rerender'));
      fireEvent.click(getByTestId('rerender'));

      pressEscape();
      expect(isOpen('modal-b')).toBe(false);
      expect(isOpen('modal-a')).toBe(true);
    });

    it('should call the latest onClose, not the one from the render that opened it', () => {
      const first = jest.fn();
      const second = jest.fn();
      const ui = (onClose: () => void) => (
        <ThemeProvider theme={defaultTheme}>
          <Modal open onClose={onClose} title="A" noAnimation>content</Modal>
        </ThemeProvider>
      );
      const { rerender } = render(ui(first));
      rerender(ui(second));

      pressEscape();
      expect(first).not.toHaveBeenCalled();
      expect(second).toHaveBeenCalledTimes(1);
    });

    it('should close a nested modal before the modal it is rendered in', () => {
      const { getByTestId } = render(<Nested />);
      fireEvent.click(getByTestId('open-b'));
      expect(isOpen('modal-b')).toBe(true);

      pressEscape();
      expect(isOpen('modal-b')).toBe(false);
      expect(isOpen('modal-a')).toBe(true);

      pressEscape();
      expect(isOpen('modal-a')).toBe(false);
    });

    it('should close a nested modal first when both open in the same render', () => {
      // an in-place child runs its effects before its parent, so it registers for Escape first
      render(<Nested initialB inPlace />);
      expect(isOpen('modal-a')).toBe(true);
      expect(isOpen('modal-b')).toBe(true);

      pressEscape();
      expect(isOpen('modal-b')).toBe(false);
      expect(isOpen('modal-a')).toBe(true);

      pressEscape();
      expect(isOpen('modal-a')).toBe(false);
    });

    it('should stop listening for Escape when closeOnEscape is turned off', () => {
      const onClose = jest.fn();
      const ui = (closeOnEscape: boolean) => (
        <ThemeProvider theme={defaultTheme}>
          <Modal open onClose={onClose} closeOnEscape={closeOnEscape} title="A" noAnimation>content</Modal>
        </ThemeProvider>
      );
      const { rerender } = render(ui(true));
      rerender(ui(false));

      pressEscape();
      expect(onClose).not.toHaveBeenCalled();
    });
  });
});

// One click outside closes one layer, like Escape: a press on the backdrop that closes a menu open
// in the Modal does not close the Modal too.
describe('Backdrop click with a popup open in the Modal', () => {
  beforeEach(() => {
    resetStackCount();
    resetOverlayStack();
    resetEscapeStack();
  });

  // the outside-press listener is attached on the next task, so the click that opened it does not close it
  const settle = () => act(async () => { await new Promise((resolve) => setTimeout(resolve, 0)); });
  const clickBackdrop = () => {
    fireEvent.mouseDown(getBackdrop());
    fireEvent.mouseUp(getBackdrop());
    fireEvent.click(getBackdrop());
  };

  it('should close only the Menu, and the Modal on the next click', async () => {
    const onClose = jest.fn();
    render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open onClose={onClose} title="Edit">
          <Menu trigger={<Button data-testid="trigger">Actions</Button>} noAnimation>
            <MenuItem>Duplicate</MenuItem>
          </Menu>
        </Modal>
      </ThemeProvider>
    );
    fireEvent.click(document.body.querySelector('[data-testid="trigger"]')!);
    await settle();
    expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument();

    clickBackdrop();
    expect(document.body.querySelector('[role="menu"]')).not.toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();

    clickBackdrop();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should close the Modal when the open popup does not close on a click outside', async () => {
    const onClose = jest.fn();
    function PinnedPopup() {
      const anchorRef = useRef<HTMLButtonElement>(null);
      return (
        <Modal open onClose={onClose} title="Edit">
          <button ref={anchorRef}>Anchor</button>
          <Popup open anchorRef={anchorRef} closeOnClickOutside={false} aria-label="Hint">Hint</Popup>
        </Modal>
      );
    }
    render(<ThemeProvider theme={defaultTheme}><PinnedPopup /></ThemeProvider>);
    await settle();

    clickBackdrop();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should close the Modal on the first click while a Tooltip in it is open', async () => {
    const onClose = jest.fn();
    render(
      <ThemeProvider theme={defaultTheme}>
        <Modal open onClose={onClose} title="Edit">
          <Tooltip content="Saves a copy" open><Button>Duplicate</Button></Tooltip>
        </Modal>
      </ThemeProvider>
    );
    await settle();
    expect(document.body.querySelector('[role="tooltip"]')).toBeInTheDocument();

    clickBackdrop();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should close the Modal when the popup that closed on the press was not its own', async () => {
    const onClose = jest.fn();
    function PagePopup() {
      const anchorRef = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button ref={anchorRef}>Page anchor</button>
          <Popup defaultOpen anchorRef={anchorRef} aria-label="Page popup">On the page</Popup>
          <Modal open onClose={onClose} title="Edit">content</Modal>
        </>
      );
    }
    render(<ThemeProvider theme={defaultTheme}><PagePopup /></ThemeProvider>);
    await settle();

    clickBackdrop();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
