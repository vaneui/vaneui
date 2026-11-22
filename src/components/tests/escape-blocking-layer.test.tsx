import '@testing-library/jest-dom';
import { useRef, useState } from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import { Modal, Overlay, Popup, ThemeProvider, defaultTheme } from '../../index';
import { resetStackCount } from '../utils/stackingContext';
import { resetOverlayStack } from '../utils/overlayStack';
import { resetEscapeStack } from '../utils/escapeStack';

// Escape closes only the topmost layer. A topmost layer that does not close on Escape keeps it:
// the dialog beneath it must not close in its place.

const wrap = (ui: React.ReactElement) => <ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>;
const pressEscape = () => fireEvent.keyDown(document, { key: 'Escape' });

describe('Escape with a top layer that does not close on it', () => {
  beforeEach(() => {
    resetStackCount();
    resetOverlayStack();
    resetEscapeStack();
  });

  it('should not close the Modal beneath a Modal with closeOnEscape={false}', () => {
    const closeA = jest.fn();
    const closeB = jest.fn();
    const ui = (b: boolean) => wrap(
      <>
        <Modal open onClose={closeA} title="A">a</Modal>
        <Modal open={b} onClose={closeB} closeOnEscape={false} title="B" noAnimation>b</Modal>
      </>
    );
    const { rerender } = render(ui(false));
    rerender(ui(true));

    pressEscape();
    expect(closeA).not.toHaveBeenCalled();
    expect(closeB).not.toHaveBeenCalled();

    // once the blocking dialog is gone, Escape reaches the one below again
    rerender(ui(false));
    pressEscape();
    expect(closeA).toHaveBeenCalledTimes(1);
  });

  it('should leave the default action of Escape alone when the top layer does not close on it', () => {
    render(wrap(<Modal open onClose={() => {}} closeOnEscape={false} title="Search"><input type="search" /></Modal>));
    const blocked = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    document.dispatchEvent(blocked);
    expect(blocked.defaultPrevented).toBe(false);
  });

  it('should still prevent the default action when Escape closes the top layer', () => {
    render(wrap(<Modal open onClose={() => {}} title="Dialog">content</Modal>));
    const closing = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    document.dispatchEvent(closing);
    expect(closing.defaultPrevented).toBe(true);
  });

  it('should not close a Modal while a portaled Overlay without onClose covers it', () => {
    const closeModal = jest.fn();
    function SavingOverlay() {
      const [saving, setSaving] = useState(false);
      return (
        <>
          <Modal open onClose={closeModal} title="Edit">
            <button data-testid="save" onClick={() => setSaving(true)}>Save</button>
          </Modal>
          <Overlay open={saving}>Saving...</Overlay>
        </>
      );
    }
    render(wrap(<SavingOverlay />));
    fireEvent.click(document.body.querySelector('[data-testid="save"]')!);

    pressEscape();
    expect(closeModal).not.toHaveBeenCalled();
  });

  it('should not close a Modal beneath a modal Popup with closeOnEscape={false}', () => {
    const closeModal = jest.fn();
    const closePopup = jest.fn();
    function PopupInModal() {
      const anchorRef = useRef<HTMLButtonElement>(null);
      const [open, setOpen] = useState(false);
      return (
        <Modal open onClose={closeModal} title="Edit">
          <button ref={anchorRef} data-testid="anchor" onClick={() => setOpen(true)}>More</button>
          <Popup open={open} onClose={closePopup} anchorRef={anchorRef} modal closeOnEscape={false} aria-label="More">
            <button>Action</button>
          </Popup>
        </Modal>
      );
    }
    render(wrap(<PopupInModal />));
    fireEvent.click(document.body.querySelector('[data-testid="anchor"]')!);

    pressEscape();
    expect(closePopup).not.toHaveBeenCalled();
    expect(closeModal).not.toHaveBeenCalled();
  });

  it('should still close the Modal when an Overlay rendered in place inside it has no onClose', () => {
    const closeModal = jest.fn();
    render(wrap(
      <Modal open onClose={closeModal} title="Edit">
        <Overlay open portal={false}>Loading</Overlay>
      </Modal>
    ));

    pressEscape();
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('should still close the Modal when a pointer-events-none Overlay without onClose sits above it', () => {
    const closeModal = jest.fn();
    let showScrim: () => void = () => {};
    function Scrim() {
      const [shown, setShown] = useState(false);
      showScrim = () => setShown(true);
      return (
        <>
          <Modal open onClose={closeModal} title="Edit">content</Modal>
          <Overlay open={shown} pointerEventsNone />
        </>
      );
    }
    render(wrap(<Scrim />));
    act(() => showScrim());

    pressEscape();
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('should still close a popup opened inside a Modal with closeOnEscape={false}', () => {
    const closeModal = jest.fn();
    const closePopup = jest.fn();
    function PopupInBlockingModal() {
      const anchorRef = useRef<HTMLButtonElement>(null);
      return (
        <Modal open onClose={closeModal} closeOnEscape={false} title="Edit">
          <button ref={anchorRef}>More</button>
          <Popup open onClose={closePopup} anchorRef={anchorRef} aria-label="More">menu</Popup>
        </Modal>
      );
    }
    render(wrap(<PopupInBlockingModal />));

    pressEscape();
    expect(closePopup).toHaveBeenCalledTimes(1);
    expect(closeModal).not.toHaveBeenCalled();
  });
});

// An Overlay's Escape entry is pushed once per open. Re-pushing it whenever an inline onClose
// changes identity (any render of its parent) would move it above a Modal opened after it.
describe('Escape with an Overlay whose onClose is an inline function', () => {
  beforeEach(() => {
    resetStackCount();
    resetOverlayStack();
    resetEscapeStack();
  });

  function DrawerWithRename() {
    const [drawer, setDrawer] = useState(true);
    const [rename, setRename] = useState(false);
    const [name, setName] = useState('Report');
    return (
      <>
        <Overlay open={drawer} onClose={() => setDrawer(false)} noAnimation>
          <div data-testid="drawer">
            <button data-testid="rename" onClick={() => setRename(true)}>Rename</button>
          </div>
        </Overlay>
        <Modal open={rename} onClose={() => setRename(false)} title="Rename" noAnimation>
          <input data-testid="name" value={name} onChange={(e) => setName(e.target.value)} />
        </Modal>
      </>
    );
  }

  it('should close the Modal opened over the Overlay after the parent re-rendered', () => {
    render(wrap(<DrawerWithRename />));
    fireEvent.click(document.body.querySelector('[data-testid="rename"]')!);
    fireEvent.change(document.body.querySelector('[data-testid="name"]')!, { target: { value: 'Report 2' } });

    pressEscape();
    expect(document.body.querySelector('[role="dialog"]')).not.toBeInTheDocument();
    expect(document.body.querySelector('[data-testid="drawer"]')).toBeInTheDocument();

    pressEscape();
    expect(document.body.querySelector('[data-testid="drawer"]')).not.toBeInTheDocument();
  });

  it('should call the onClose of the latest render', () => {
    const first = jest.fn();
    const latest = jest.fn();
    const { rerender } = render(wrap(<Overlay open onClose={first} />));
    rerender(wrap(<Overlay open onClose={latest} />));

    pressEscape();
    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });
});
