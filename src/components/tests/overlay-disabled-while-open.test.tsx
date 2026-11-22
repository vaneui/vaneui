import '@testing-library/jest-dom';
import { type ReactElement } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import { Tooltip, Menu, MenuItem, PopupTrigger, Button, ThemeProvider, defaultTheme } from '../../index';
import { resetStackCount } from '../utils/stackingContext';
import { resetOverlayStack } from '../utils/overlayStack';
import { resetEscapeStack } from '../utils/escapeStack';

// Disabling a Tooltip, PopupTrigger or Menu while it is open closes it. Re-enabling it later, after
// the pointer has left, must not bring it back on its own.

const wrap = (ui: ReactElement) => <ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>;

describe('An overlay disabled while it is open', () => {
  beforeEach(() => {
    resetStackCount();
    resetOverlayStack();
    resetEscapeStack();
  });

  it('should keep a Tooltip closed when it is enabled again', async () => {
    const onOpenChange = jest.fn();
    const ui = (disabled: boolean) => wrap(
      <Tooltip content="Save changes" openDelay={0} closeDelay={0} disabled={disabled} onOpenChange={onOpenChange} noAnimation>
        <Button>Save</Button>
      </Tooltip>
    );
    const { rerender } = render(ui(false));
    const trigger = screen.getByRole('button');
    await act(async () => { fireEvent.mouseEnter(trigger); });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    rerender(ui(true));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    // the pointer leaves while the tooltip is disabled: nothing listens
    fireEvent.mouseLeave(trigger);
    rerender(ui(false));

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(trigger).not.toHaveAttribute('aria-describedby');
  });

  it('should drop a pending open when a Tooltip is disabled during its delay', () => {
    jest.useFakeTimers();
    try {
      const ui = (disabled: boolean) => wrap(
        <Tooltip content="Save changes" openDelay={300} disabled={disabled}><Button>Save</Button></Tooltip>
      );
      const { rerender } = render(ui(false));
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => { jest.advanceTimersByTime(100); });

      rerender(ui(true));
      act(() => { jest.advanceTimersByTime(500); });
      rerender(ui(false));
      act(() => { jest.advanceTimersByTime(500); });

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    } finally {
      jest.useRealTimers();
    }
  });

  it('should keep a click PopupTrigger closed when it is enabled again', async () => {
    const ui = (disabled: boolean) => wrap(
      <PopupTrigger popup={<span>Filters</span>} disabled={disabled} popupProps={{ noAnimation: true }}>
        <Button>Open filters</Button>
      </PopupTrigger>
    );
    const { rerender } = render(ui(false));
    const trigger = screen.getByRole('button');
    await act(async () => { fireEvent.click(trigger); });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    rerender(ui(true));
    rerender(ui(false));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Filters')).not.toBeInTheDocument();
  });

  it('should keep a Menu closed when it is enabled again, and report the close', async () => {
    const onOpenChange = jest.fn();
    const ui = (disabled: boolean) => wrap(
      <Menu trigger={<Button>Actions</Button>} disabled={disabled} onOpenChange={onOpenChange} noAnimation>
        <MenuItem>Edit</MenuItem>
      </Menu>
    );
    const { rerender } = render(ui(false));
    const trigger = screen.getByRole('button', { name: 'Actions' });
    await act(async () => { fireEvent.click(trigger); });
    expect(screen.getByRole('menu')).toBeInTheDocument();

    rerender(ui(true));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    rerender(ui(false));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should not report a close for a Menu that was closed when it was disabled', () => {
    const onOpenChange = jest.fn();
    const ui = (disabled: boolean) => wrap(
      <Menu trigger={<Button>Actions</Button>} disabled={disabled} onOpenChange={onOpenChange}>
        <MenuItem>Edit</MenuItem>
      </Menu>
    );
    const { rerender } = render(ui(false));
    rerender(ui(true));
    rerender(ui(false));
    expect(onOpenChange).not.toHaveBeenCalled();
  });
});

describe('A controlled overlay disabled while it is open', () => {
  it('should leave a controlled Tooltip without onOpenChange to its owner, without a warning', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const ui = (disabled: boolean) => wrap(
        <Tooltip content="Step 2 of 3" open disabled={disabled} noAnimation><Button>Next</Button></Tooltip>
      );
      const { rerender } = render(ui(false));
      rerender(ui(true));
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      // the owner still says open
      rerender(ui(false));
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(warn).not.toHaveBeenCalled();
    } finally {
      warn.mockRestore();
    }
  });

  it('should report the close of a controlled Menu through onOpenChange', () => {
    const onOpenChange = jest.fn();
    const ui = (disabled: boolean) => wrap(
      <Menu trigger={<Button>Actions</Button>} open disabled={disabled} onOpenChange={onOpenChange}>
        <MenuItem>Edit</MenuItem>
      </Menu>
    );
    const { rerender } = render(ui(false));
    rerender(ui(true));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
