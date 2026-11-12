import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import { useRef } from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import { Menu, MenuItem, Popup, Button, ThemeProvider, defaultTheme } from '../../index';

// A menu with more items than fit beside its trigger scrolls inside itself. Popup measures the room
// and writes it to a custom property on the menu; the stylesheet caps the menu's scroll box with it.
// jsdom has no layout, so the trigger's position is stubbed and only the measured value is checked
// here; the scrolling itself is covered in the browser tests.

const CAP = '--popup-scroll-max-height';

const rect = (top: number, bottom: number, left = 100, right = 200): DOMRect =>
  ({ top, bottom, left, right, width: right - left, height: bottom - top, x: left, y: top, toJSON: () => ({}) }) as DOMRect;

const wrap = (ui: React.ReactElement) => <ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>;

const getMenu = () => document.body.querySelector('[role="menu"]') as HTMLElement;
const capOf = (el: HTMLElement) => el.style.getPropertyValue(CAP);

describe('Menu scrolling: the room a long menu may take', () => {
  const originalInnerHeight = window.innerHeight;
  let triggerRect: DOMRect;

  const setWindowHeight = (height: number) => {
    Object.defineProperty(window, 'innerHeight', { configurable: true, writable: true, value: height });
  };

  beforeEach(() => {
    jest.useFakeTimers();
    setWindowHeight(768);
    triggerRect = rect(100, 130);
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      return this.getAttribute('data-testid') === 'trigger' ? triggerRect : rect(0, 0, 0, 0);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    setWindowHeight(originalInnerHeight);
  });

  const renderMenu = (props: Record<string, unknown> = {}) =>
    render(wrap(
      <Menu defaultOpen trigger={<Button data-testid="trigger">Actions</Button>} {...props}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    ));

  it('should give the menu the room under its trigger, less the gap', () => {
    renderMenu();
    // 768 window - 130 trigger bottom - 4 offset
    expect(capOf(getMenu())).toBe('634px');
  });

  it('should use the room above the trigger when there is more of it', () => {
    triggerRect = rect(600, 630);
    renderMenu();
    // above: 600 - 4; below would be 768 - 630 - 4
    expect(capOf(getMenu())).toBe('596px');
  });

  it('should count the offset prop as part of the gap', () => {
    renderMenu({ offset: 12 });
    expect(capOf(getMenu())).toBe('626px');
  });

  it('should take the popup padding and border off the room', () => {
    renderMenu({ style: { paddingTop: '6px', paddingBottom: '6px', borderTopWidth: '1px', borderBottomWidth: '1px', borderStyle: 'solid' } });
    expect(capOf(getMenu())).toBe('620px');
  });

  it('should measure a menu placed beside its trigger from the trigger edges', () => {
    const { unmount } = renderMenu({ placeRightStart: true });
    // hangs down from the trigger's top edge (768 - 100), or stands on its bottom edge (130)
    expect(capOf(getMenu())).toBe('668px');
    unmount();

    triggerRect = rect(700, 730);
    renderMenu({ placeRightStart: true });
    expect(capOf(getMenu())).toBe('730px');
  });

  it('should follow the window when it is resized', () => {
    renderMenu();
    expect(capOf(getMenu())).toBe('634px');

    setWindowHeight(400);
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(capOf(getMenu())).toBe('266px');
  });

  it('should follow the trigger when the page scrolls', () => {
    renderMenu();
    triggerRect = rect(300, 330);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(capOf(getMenu())).toBe('434px');
  });

  it('should never be negative when the window has no room at all', () => {
    setWindowHeight(20);
    triggerRect = rect(0, 30);
    renderMenu();
    expect(capOf(getMenu())).toBe('0px');
  });

  it('should keep the value across a re-render with a consumer style', () => {
    const ui = (label: string) => wrap(
      <Menu defaultOpen trigger={<Button data-testid="trigger">Actions</Button>} style={{ color: 'red' }}>
        <MenuItem>{label}</MenuItem>
      </Menu>
    );
    const { rerender } = render(ui('Edit'));
    rerender(ui('Rename'));
    expect(capOf(getMenu())).toBe('634px');
    expect(getMenu().style.color).toBe('red');
  });

  it('should not set it on a Popup that is not a menu', () => {
    function Harness() {
      const anchorRef = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button ref={anchorRef} data-testid="trigger">Anchor</button>
          <Popup open anchorRef={anchorRef} aria-label="Panel" data-testid="panel">Content</Popup>
        </>
      );
    }
    render(wrap(<Harness />));
    const panel = document.body.querySelector('[data-testid="panel"]') as HTMLElement;
    expect(panel).toBeInTheDocument();
    expect(capOf(panel)).toBe('');
  });

  it('should focus a hovered item without scrolling the menu to it', () => {
    renderMenu();
    const item = document.body.querySelectorAll<HTMLElement>('[role="menuitem"]')[1];
    const focus = jest.spyOn(item, 'focus');

    fireEvent.mouseEnter(item);

    expect(focus).toHaveBeenCalledWith({ preventScroll: true });
    expect(item).toHaveFocus();
  });
});

// A scroll box must hold something the Tab key can reach. Menu items are focused by the arrow keys,
// so the item focused last is made the menu's one tab stop.
describe('Menu scrolling: one tab stop among the items', () => {
  // a submenu is portaled out of its parent, so a menu element holds its own items only
  const items = (menu: Element) => Array.from(menu.querySelectorAll<HTMLElement>('[data-menu-item]'));
  const tabIndexes = (menu: Element) => items(menu).map((item) => item.getAttribute('tabindex'));

  const renderMenu = (extra?: React.ReactNode) =>
    render(wrap(
      <Menu defaultOpen trigger={<Button data-testid="trigger">Actions</Button>} data-testid="root-menu">
        <MenuItem>Edit</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuItem disabled>Archive</MenuItem>
        <MenuItem>Delete</MenuItem>
        {extra}
      </Menu>
    ));

  it('should leave every item out of the tab order until one is focused', () => {
    renderMenu();
    expect(tabIndexes(getMenu())).toEqual(['-1', '-1', '-1', '-1']);
  });

  it('should make the focused item the tab stop', () => {
    renderMenu();
    const menu = getMenu();
    act(() => items(menu)[0].focus());
    expect(tabIndexes(menu)).toEqual(['0', '-1', '-1', '-1']);
  });

  it('should move the tab stop with the arrow keys', () => {
    renderMenu();
    const menu = getMenu();
    act(() => items(menu)[0].focus());

    fireEvent.keyDown(items(menu)[0], { key: 'ArrowDown' });
    expect(items(menu)[1]).toHaveFocus();
    expect(tabIndexes(menu)).toEqual(['-1', '0', '-1', '-1']);

    // the disabled item is skipped and never becomes the tab stop
    fireEvent.keyDown(items(menu)[1], { key: 'ArrowDown' });
    expect(items(menu)[3]).toHaveFocus();
    expect(tabIndexes(menu)).toEqual(['-1', '-1', '-1', '0']);
  });

  it('should move the tab stop to an item the pointer enters', () => {
    renderMenu();
    const menu = getMenu();
    act(() => items(menu)[0].focus());

    fireEvent.mouseEnter(items(menu)[3]);
    expect(tabIndexes(menu)).toEqual(['-1', '-1', '-1', '0']);
  });

  it('should keep the tab stop on the item that had focus when focus leaves the menu', () => {
    const { getByTestId } = renderMenu();
    const menu = getMenu();
    act(() => items(menu)[1].focus());
    act(() => getByTestId('trigger').focus());
    expect(tabIndexes(menu)).toEqual(['-1', '0', '-1', '-1']);
  });

  it('should still call an onFocus handler passed to the item', () => {
    const onFocus = jest.fn();
    render(wrap(
      <Menu defaultOpen trigger={<Button>Actions</Button>}>
        <MenuItem onFocus={onFocus}>Edit</MenuItem>
      </Menu>
    ));
    act(() => items(getMenu())[0].focus());
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('should count a submenu trigger as an item of the parent menu', () => {
    renderMenu(
      <Menu defaultOpen trigger={<MenuItem>More</MenuItem>} data-testid="sub-menu">
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
      </Menu>
    );
    const root = document.body.querySelector('[data-testid="root-menu"]') as HTMLElement;
    const sub = document.body.querySelector('[data-testid="sub-menu"]') as HTMLElement;
    expect(items(root)).toHaveLength(5);

    // from a plain item to the submenu trigger: one tab stop in the parent, and it moved
    act(() => items(root)[0].focus());
    act(() => items(root)[4].focus());
    expect(tabIndexes(root)).toEqual(['-1', '-1', '-1', '-1', '0']);

    // into the submenu: each menu keeps its own tab stop
    act(() => items(sub)[1].focus());
    expect(tabIndexes(sub)).toEqual(['-1', '0']);
    expect(tabIndexes(root)).toEqual(['-1', '-1', '-1', '-1', '0']);
  });

  it('should keep the tab stop when the menu re-renders', () => {
    const ui = (label: string) => wrap(
      <Menu defaultOpen trigger={<Button>Actions</Button>}>
        <MenuItem>{label}</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    );
    const { rerender } = render(ui('Edit'));
    act(() => items(getMenu())[1].focus());

    rerender(ui('Rename'));
    expect(tabIndexes(getMenu())).toEqual(['-1', '0']);
  });
});

describe('Menu scrolling: the stylesheet', () => {
  const rulesCss = fs.readFileSync(path.resolve(__dirname, '../css/rules.css'), 'utf-8');
  const menuScrollRule = rulesCss.match(/\.vane-popup\[data-menu-dropdown\] > \.vane-popup-scroll \{([^}]*)\}/)?.[1] ?? '';

  it('should cap the menu scroll box with the value Popup measures', () => {
    expect(menuScrollRule).toContain(`max-height: var(${CAP}, none)`);
  });

  it('should scroll the menu vertically instead of letting items spill', () => {
    expect(menuScrollRule).toContain('overflow-y: auto');
    expect(menuScrollRule).not.toContain('overflow: visible');
  });

  it('should keep room for the focus outline without moving the items', () => {
    expect(menuScrollRule).toContain('padding: 4px');
    expect(menuScrollRule).toContain('margin: -4px');
  });
});
