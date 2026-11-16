import '@testing-library/jest-dom';
import { useState } from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import { Modal, Menu, MenuItem, Button, Popup, ThemeProvider, defaultTheme } from '../../index';
import { resetStackCount } from '../utils/stackingContext';
import { resetOverlayStack } from '../utils/overlayStack';
import { resetEscapeStack } from '../utils/escapeStack';

// A dialog opened from a menu item: the item is gone when the dialog closes (its menu closed
// behind it), so focus has to go back to the menu's trigger instead.
describe('Modal focus return through a closed menu', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    resetStackCount();
    resetOverlayStack();
    resetEscapeStack();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const settle = () => act(() => { jest.advanceTimersByTime(400); });

  // The Modal is declared BEFORE the Menu, so its effects run first and it sees the menu item
  // (not the menu trigger) as the focused element when it opens.
  function ConfirmFromMenu({ keepMounted = false }: { keepMounted?: boolean }) {
    const [open, setOpen] = useState(false);
    return (
      <ThemeProvider theme={defaultTheme}>
        <a href="#main" data-testid="skip-link">Skip to content</a>
        <Modal open={open} onClose={() => setOpen(false)} title="Delete this file?" data-testid="confirm">
          <Button data-testid="cancel" onClick={() => setOpen(false)}>Cancel</Button>
        </Modal>
        <Menu trigger={<Button data-testid="menu-trigger">Actions</Button>} keepMounted={keepMounted}>
          <MenuItem data-testid="delete" onClick={() => setOpen(true)}>Delete</MenuItem>
        </Menu>
      </ThemeProvider>
    );
  }

  function openConfirmFromMenu(getByTestId: (id: string) => HTMLElement) {
    fireEvent.click(getByTestId('menu-trigger'));
    settle();
    const item = document.body.querySelector('[data-testid="delete"]') as HTMLElement;
    act(() => { item.focus(); });
    expect(document.activeElement).toBe(item);
    fireEvent.click(item);
    // the menu finishes closing and unmounts while the dialog is open
    settle();
    expect(document.body.querySelector('[data-testid="confirm"]')).toBeInTheDocument();
  }

  it('should return focus to the menu trigger when the dialog closes', () => {
    const { getByTestId } = render(<ConfirmFromMenu />);
    openConfirmFromMenu(getByTestId);
    expect(document.body.querySelector('[data-testid="delete"]')).not.toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    settle();

    expect(document.body.querySelector('[data-testid="confirm"]')).not.toBeInTheDocument();
    expect(document.activeElement).toBe(getByTestId('menu-trigger'));
  });

  it('should return focus to the menu trigger when the closed menu is kept mounted', () => {
    const { getByTestId } = render(<ConfirmFromMenu keepMounted />);
    openConfirmFromMenu(getByTestId);
    // the item is still in the DOM, inside the hidden menu
    expect(document.body.querySelector('[data-testid="delete"]')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    settle();

    expect(document.activeElement).toBe(getByTestId('menu-trigger'));
  });

  it('should return focus to the anchor of a popup that closed behind a dialog', () => {
    function ConfirmFromPopup() {
      const [popupOpen, setPopupOpen] = useState(true);
      const [open, setOpen] = useState(false);
      const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
      return (
        <ThemeProvider theme={defaultTheme}>
          <Modal open={open} onClose={() => setOpen(false)} title="Confirm" data-testid="confirm">
            content
          </Modal>
          <button ref={setAnchor} data-testid="anchor">Anchor</button>
          <Popup open={popupOpen} anchorRef={{ current: anchor }} aria-label="Panel" onClose={() => setPopupOpen(false)}>
            <button data-testid="in-popup" onClick={() => { setOpen(true); setPopupOpen(false); }}>Open dialog</button>
          </Popup>
        </ThemeProvider>
      );
    }
    const { getByTestId } = render(<ConfirmFromPopup />);
    settle();
    const inPopup = document.body.querySelector('[data-testid="in-popup"]') as HTMLElement;
    act(() => { inPopup.focus(); });
    fireEvent.click(inPopup);
    settle();
    expect(document.body.querySelector('[data-testid="in-popup"]')).not.toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    settle();

    expect(document.activeElement).toBe(getByTestId('anchor'));
  });
});
