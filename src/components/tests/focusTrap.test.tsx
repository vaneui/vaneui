import '@testing-library/jest-dom';
import { createFocusTrap } from '../utils/focusTrap';

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
});
