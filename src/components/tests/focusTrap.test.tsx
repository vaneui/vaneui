import '@testing-library/jest-dom';
import { createFocusTrap } from '../utils/focusTrap';
import { registerOverlay, resetOverlayStack, setOverlayOpener } from '../utils/overlayStack';

// Regression guards for the zero-focusable focus-trap fix (bce2055). A dialog
// with no focusable children previously let Tab leak to the background; the trap
// now preventDefaults Tab so focus stays put. This is a pure util, so we drive
// the keydown handler directly — in jsdom every element reports
// offsetParent === null, so getFocusableElements() is empty and the
// no-focusable branch is the one exercised here.
describe('createFocusTrap', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('prevents Tab from escaping a container with no focusable children', () => {
    const cleanup = createFocusTrap(container, null);

    const evt = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    document.dispatchEvent(evt);

    expect(evt.defaultPrevented).toBe(true);
    cleanup();
  });

  it('also traps Shift+Tab on a container with no focusable children', () => {
    const cleanup = createFocusTrap(container, null);

    const evt = new KeyboardEvent('keydown', {
      key: 'Tab', shiftKey: true, bubbles: true, cancelable: true,
    });
    document.dispatchEvent(evt);

    expect(evt.defaultPrevented).toBe(true);
    cleanup();
  });

  it('ignores non-Tab keys', () => {
    const cleanup = createFocusTrap(container, null);

    const evt = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    document.dispatchEvent(evt);

    expect(evt.defaultPrevented).toBe(false);
    cleanup();
  });

  it('stops trapping after cleanup', () => {
    const cleanup = createFocusTrap(container, null);
    cleanup();

    const evt = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    document.dispatchEvent(evt);

    expect(evt.defaultPrevented).toBe(false);
  });

  it('returns focus to the trigger on cleanup when returnFocus is set', () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);

    const cleanup = createFocusTrap(container, trigger, { returnFocus: true });
    cleanup();

    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });

  // Where focus goes when the trap is released and the element that had focus is no longer usable.
  describe('returning focus when the trigger is gone', () => {
    let first: HTMLButtonElement;
    let offsetParent: PropertyDescriptor | undefined;

    beforeEach(() => {
      jest.useFakeTimers();
      resetOverlayStack();
      // jsdom has no layout, so every element reports offsetParent === null and counts as
      // not focusable; report a parent instead, so "the first focusable element of the page" exists
      offsetParent = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetParent');
      Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
        configurable: true,
        get(this: HTMLElement) { return this.parentNode; },
      });
      first = document.createElement('button');
      first.textContent = 'first on the page';
      document.body.prepend(first);
    });

    afterEach(() => {
      first.remove();
      if (offsetParent) Object.defineProperty(HTMLElement.prototype, 'offsetParent', offsetParent);
      jest.useRealTimers();
    });

    const flush = () => jest.advanceTimersByTime(100);

    it('does not send focus to the first focusable element of the page', () => {
      const trigger = document.createElement('button');
      document.body.appendChild(trigger);
      trigger.focus();

      const cleanup = createFocusTrap(container, trigger, { returnFocus: true });
      flush();
      trigger.remove();
      cleanup();
      flush();

      // focus is left where it was (here: on the dialog, which a real close then unmounts)
      expect(document.activeElement).not.toBe(first);
      expect(document.activeElement).toBe(container);
    });

    it('does not move focus when the dialog was opened without a trigger', () => {
      const cleanup = createFocusTrap(container, document.body, { returnFocus: true });
      flush();
      cleanup();
      flush();

      expect(document.activeElement).not.toBe(first);
      expect(document.activeElement).toBe(container);
    });

    it('falls back to the opener of the overlay the trigger was in, without scrolling', () => {
      // a menu item inside a popup that the "Actions" button opened
      const opener = document.createElement('button');
      const popup = document.createElement('div');
      const item = document.createElement('button');
      popup.appendChild(item);
      document.body.append(opener, popup);
      setOverlayOpener(popup, () => opener);
      const unregister = registerOverlay(popup);
      const focus = jest.spyOn(opener, 'focus');

      const cleanup = createFocusTrap(container, item, { returnFocus: true });
      flush();
      // the menu closes and unmounts while the dialog is open
      unregister();
      popup.remove();
      cleanup();

      expect(document.activeElement).toBe(opener);
      expect(focus).toHaveBeenCalledWith({ preventScroll: true });
      opener.remove();
    });

    it('skips a trigger that sits in an overlay which is closed but still mounted', () => {
      const opener = document.createElement('button');
      const popup = document.createElement('div');
      const item = document.createElement('button');
      popup.appendChild(item);
      document.body.append(opener, popup);
      setOverlayOpener(popup, () => opener);
      const unregister = registerOverlay(popup);

      const cleanup = createFocusTrap(container, item, { returnFocus: true });
      flush();
      // closed (no longer in the open set) but kept in the DOM: hidden, or still fading out
      unregister();
      cleanup();

      expect(document.activeElement).toBe(opener);
      opener.remove();
      popup.remove();
    });

    it('walks outward through nested overlays to the first opener that is still there', () => {
      const rootOpener = document.createElement('button');
      const menu = document.createElement('div');
      const submenuTrigger = document.createElement('button');
      const submenu = document.createElement('div');
      const item = document.createElement('button');
      menu.appendChild(submenuTrigger);
      submenu.appendChild(item);
      document.body.append(rootOpener, menu, submenu);
      setOverlayOpener(menu, () => rootOpener);
      setOverlayOpener(submenu, () => submenuTrigger);

      const cleanup = createFocusTrap(container, item, { returnFocus: true });
      flush();
      menu.remove();
      submenu.remove();
      cleanup();

      expect(document.activeElement).toBe(rootOpener);
      rootOpener.remove();
    });

    it('still returns to a trigger inside an overlay that is open', () => {
      const opener = document.createElement('button');
      const popup = document.createElement('div');
      const item = document.createElement('button');
      popup.appendChild(item);
      document.body.append(opener, popup);
      setOverlayOpener(popup, () => opener);
      const unregister = registerOverlay(popup);

      const cleanup = createFocusTrap(container, item, { returnFocus: true });
      flush();
      cleanup();

      expect(document.activeElement).toBe(item);
      unregister();
      opener.remove();
      popup.remove();
    });
  });
});
