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

// In a radio group only one radio is a tab stop: the checked one, or (with none checked) the
// radio Tab lands on. A trap that took the last radio in DOM order for its last stop never saw
// Tab from the group's real stop, and the browser moved focus out of the dialog.
describe('createFocusTrap with a radio group', () => {
  let container: HTMLElement;
  let offsetParent: PropertyDescriptor | undefined;

  beforeEach(() => {
    jest.useFakeTimers();
    // jsdom has no layout: report a parent, so the controls count as focusable
    offsetParent = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetParent');
    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      configurable: true,
      get(this: HTMLElement) { return this.parentNode; },
    });
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    if (offsetParent) Object.defineProperty(HTMLElement.prototype, 'offsetParent', offsetParent);
    jest.useRealTimers();
  });

  const radio = (name: string, value: string, checked = false) => {
    const el = document.createElement('input');
    el.type = 'radio';
    el.name = name;
    el.value = value;
    el.checked = checked;
    el.dataset.testid = value;
    return el;
  };
  const button = (text: string) => {
    const el = document.createElement('button');
    el.textContent = text;
    return el;
  };
  const tab = (shiftKey = false) => {
    const evt = new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true });
    document.activeElement!.dispatchEvent(evt);
    return evt;
  };

  it('should wrap Tab from the checked radio of a group that ends the dialog', () => {
    const close = button('Close');
    const light = radio('theme', 'light', true);
    container.append(close, light, radio('theme', 'dark'), radio('theme', 'system'));
    const cleanup = createFocusTrap(container, null);

    light.focus();
    expect(tab().defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(close);
    cleanup();
  });

  it('should wrap Shift+Tab from the first control to the checked radio of the last group', () => {
    const close = button('Close');
    const dark = radio('theme', 'dark', true);
    container.append(close, radio('theme', 'light'), dark, radio('theme', 'system'));
    const cleanup = createFocusTrap(container, null);

    close.focus();
    expect(tab(true).defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(dark);
    cleanup();
  });

  it('should wrap Tab from any radio of a last group with none checked', () => {
    const close = button('Close');
    const first = radio('size', 's');
    const last = radio('size', 'l');
    container.append(close, first, radio('size', 'm'), last);
    const cleanup = createFocusTrap(container, null);

    // Tab enters an unchecked group on its first radio, Shift+Tab on its last
    for (const entered of [first, last]) {
      entered.focus();
      expect(tab().defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(close);
    }
    close.focus();
    tab(true);
    expect(document.activeElement).toBe(first);
    cleanup();
  });

  it('should wrap Shift+Tab from a radio group that starts the dialog', () => {
    const light = radio('theme', 'light');
    const dark = radio('theme', 'dark', true);
    const save = button('Save');
    container.append(light, dark, save);
    const cleanup = createFocusTrap(container, null);

    dark.focus();
    expect(tab(true).defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(save);

    save.focus();
    tab();
    expect(document.activeElement).toBe(dark);
    cleanup();
  });

  it('should keep radios of different groups, and radios without a name, as tab stops of their own', () => {
    const close = button('Close');
    const a = radio('a', 'a1', true);
    const b = radio('b', 'b1', true);
    const loose = document.createElement('input');
    loose.type = 'radio';
    container.append(close, a, b, loose);
    const cleanup = createFocusTrap(container, null);

    // b is not the last stop: Tab from it is left to the browser
    b.focus();
    expect(tab().defaultPrevented).toBe(false);
    loose.focus();
    expect(tab().defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(close);
    cleanup();
  });

  it('should not count an element taken out of the tab order as the last stop', () => {
    const close = button('Close');
    const save = button('Save');
    const skipped = button('Not a tab stop');
    skipped.tabIndex = -1;
    container.append(close, save, skipped);
    const cleanup = createFocusTrap(container, null);

    save.focus();
    expect(tab().defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(close);
    cleanup();
  });
});
