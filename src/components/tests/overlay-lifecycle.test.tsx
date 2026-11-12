import '@testing-library/jest-dom';
import { useEffect, useRef, type ReactElement, type ReactNode } from 'react';
import { render, act } from '@testing-library/react';

import {
  Modal,
  Popup,
  Menu,
  MenuItem,
  Tooltip,
  Overlay,
  Button,
  ThemeProvider,
  defaultTheme,
} from '../../index';

// Closing an overlay must keep its content mounted until the exit transition has finished:
// the same DOM node, the same component instances, the same uncontrolled form state.

const DURATION = 200;

function Probe({ log }: { log: string[] }) {
  useEffect(() => {
    log.push('mount');
    return () => {
      log.push('unmount');
    };
  }, [log]);
  return <input data-testid="probe-input" defaultValue="" />;
}

function PopupHarness({ open, children, ...rest }: { open: boolean; children: ReactNode } & Record<string, unknown>) {
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button ref={anchorRef}>Anchor</button>
      <Popup open={open} anchorRef={anchorRef} transitionDuration={DURATION} {...rest}>
        {children}
      </Popup>
    </>
  );
}

interface Case {
  name: string;
  /** the element that carries data-state for this overlay */
  selector: string;
  ui: (open: boolean, log: string[], extra?: Record<string, unknown>) => ReactElement;
}

const cases: Case[] = [
  {
    name: 'Modal',
    selector: '.vane-modal',
    ui: (open, log, extra) => (
      <Modal open={open} title="Dialog" transitionDuration={DURATION} {...extra}>
        <Probe log={log} />
      </Modal>
    ),
  },
  {
    name: 'Popup',
    selector: '.vane-popup',
    ui: (open, log, extra) => (
      <PopupHarness open={open} aria-label="Panel" {...extra}>
        <Probe log={log} />
      </PopupHarness>
    ),
  },
  {
    name: 'Menu',
    selector: '.vane-popup',
    ui: (open, log, extra) => (
      <Menu open={open} trigger={<Button>Actions</Button>} transitionDuration={DURATION} {...extra}>
        <MenuItem>Edit</MenuItem>
        <Probe log={log} />
      </Menu>
    ),
  },
  {
    name: 'Tooltip',
    selector: '.vane-popup',
    ui: (open, log, extra) => (
      <Tooltip
        open={open}
        content={<Probe log={log} />}
        popupProps={{ transitionDuration: DURATION, ...extra }}
      >
        <Button>Trigger</Button>
      </Tooltip>
    ),
  },
  {
    name: 'Overlay',
    selector: '.vane-overlay',
    ui: (open, log, extra) => (
      <Overlay open={open} transitionDuration={DURATION} {...extra}>
        <Probe log={log} />
      </Overlay>
    ),
  },
];

const wrap = (ui: ReactElement) => <ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>;

const getInput = () => document.body.querySelector<HTMLInputElement>('[data-testid="probe-input"]');

// render open and let the enter transition finish, so the close starts from the settled state
function renderOpen(ui: Case['ui'], log: string[], extra?: Record<string, unknown>) {
  const view = render(wrap(ui(true, log, extra)));
  act(() => {
    jest.advanceTimersByTime(DURATION);
  });
  return view;
}

describe('Overlay lifecycle: content stays mounted through the exit transition', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe.each(cases)('$name', ({ selector, ui }) => {
    it('should keep the same DOM node while it closes', () => {
      const log: string[] = [];
      const { rerender } = renderOpen(ui, log);
      const node = document.body.querySelector(selector);
      const input = getInput();
      expect(node).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(node).toHaveAttribute('data-state', 'entered');

      rerender(wrap(ui(false, log)));

      // still exiting: the very same elements, not fresh copies
      expect(document.body.querySelector(selector)).toBe(node);
      expect(getInput()).toBe(input);
      expect(node).toHaveAttribute('data-state', 'exiting');

      act(() => {
        jest.advanceTimersByTime(DURATION);
      });
      expect(document.body.querySelector(selector)).not.toBeInTheDocument();
    });

    it('should run a child effect once on mount and once on unmount', () => {
      const log: string[] = [];
      const { rerender } = renderOpen(ui, log);
      expect(log).toEqual(['mount']);

      rerender(wrap(ui(false, log)));
      // nothing unmounts when the close starts
      expect(log).toEqual(['mount']);

      act(() => {
        jest.advanceTimersByTime(DURATION);
      });
      expect(log).toEqual(['mount', 'unmount']);
    });

    it('should keep the value typed into an uncontrolled input during the exit', () => {
      const log: string[] = [];
      const { rerender } = renderOpen(ui, log);
      const input = getInput()!;
      // an uncontrolled field: only the DOM node holds the value
      input.value = 'typed by the user';

      rerender(wrap(ui(false, log)));

      expect(getInput()).toBe(input);
      expect(getInput()!.value).toBe('typed by the user');
    });

    it('should unmount at once on close when noAnimation is set', () => {
      const log: string[] = [];
      const { rerender } = renderOpen(ui, log, { noAnimation: true });
      expect(document.body.querySelector(selector)).toBeInTheDocument();

      rerender(wrap(ui(false, log, { noAnimation: true })));

      expect(document.body.querySelector(selector)).not.toBeInTheDocument();
      expect(log).toEqual(['mount', 'unmount']);
    });

    it('should keep the node across close and reopen with keepMounted', () => {
      const log: string[] = [];
      const { rerender } = renderOpen(ui, log, { keepMounted: true });
      const node = document.body.querySelector(selector);

      rerender(wrap(ui(false, log, { keepMounted: true })));
      act(() => {
        jest.advanceTimersByTime(DURATION);
      });
      // closed but kept: hidden, never unmounted
      expect(document.body.querySelector(selector)).toBe(node);
      expect(node!.closest('[aria-hidden="true"]')).toBeInTheDocument();

      rerender(wrap(ui(true, log, { keepMounted: true })));
      expect(document.body.querySelector(selector)).toBe(node);
      expect(log).toEqual(['mount']);
    });
  });

  it('should keep a Modal mounted through a reopen that interrupts the exit', () => {
    const log: string[] = [];
    const ui = cases[0].ui;
    const { rerender } = renderOpen(ui, log);
    const node = document.body.querySelector('.vane-modal');

    rerender(wrap(ui(false, log)));
    act(() => {
      jest.advanceTimersByTime(DURATION / 2);
    });
    rerender(wrap(ui(true, log)));
    act(() => {
      jest.advanceTimersByTime(DURATION * 2);
    });

    expect(document.body.querySelector('.vane-modal')).toBe(node);
    expect(node).toHaveAttribute('data-state', 'entered');
    expect(log).toEqual(['mount']);
  });
});
