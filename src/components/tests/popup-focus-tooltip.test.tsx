import { render, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '../themeContext';
import { PopupTrigger } from '../ui/popup';
import { Button } from '../ui/button';

// P1-13: click-opened dialog popups portal to document.body, which breaks
// sequential focus order — focus must move INTO the popup on open. Tooltip
// mode gets describedby semantics instead of disclosure semantics.
describe('Popup focus management', () => {
  it('should move focus into a click-opened dialog popup', async () => {
    const { getByRole } = render(
      <ThemeProvider>
        <PopupTrigger
          popup={<button data-testid="inside">Inside action</button>}
          popupProps={{ noAnimation: true, portal: false } as never}
        >
          <Button>Open</Button>
        </PopupTrigger>
      </ThemeProvider>
    );

    fireEvent.click(getByRole('button', { name: 'Open' }));

    // jsdom reports offsetParent as null for everything, so the focusable
    // filter falls back to focusing the container — the invariant that
    // matters is that focus moved INTO the popup (e2e covers real browsers)
    await waitFor(() => {
      const popup = document.querySelector('[role="dialog"]') as HTMLElement;
      expect(popup).toBeTruthy();
      expect(popup.contains(document.activeElement)).toBe(true);
    });
  });

  it('should focus the popup container itself when it has no focusable content', async () => {
    const { getByRole } = render(
      <ThemeProvider>
        <PopupTrigger
          popup={<span>Plain text content</span>}
          popupProps={{ noAnimation: true, portal: false, 'aria-label': 'Info' } as never}
        >
          <Button>Open</Button>
        </PopupTrigger>
      </ThemeProvider>
    );

    fireEvent.click(getByRole('button', { name: 'Open' }));

    await waitFor(() => {
      const popup = document.querySelector('[role="dialog"]') as HTMLElement;
      expect(popup).toBeTruthy();
      expect(document.activeElement).toBe(popup);
    });
  });

  it('should NOT steal focus for hover-triggered popups', async () => {
    const { getByRole } = render(
      <ThemeProvider>
        <PopupTrigger
          triggerOnHover
          popup={<button>Inside</button>}
          popupProps={{ noAnimation: true, portal: false } as never}
        >
          <Button>Hover me</Button>
        </PopupTrigger>
      </ThemeProvider>
    );

    const trigger = getByRole('button', { name: 'Hover me' });
    trigger.focus();
    fireEvent.mouseEnter(trigger);

    await waitFor(() => {
      expect(document.querySelector('[role="dialog"]')).toBeTruthy();
    });
    expect(document.activeElement).toBe(trigger);
  });
});

describe('PopupTrigger tooltip mode', () => {
  it('should use describedby semantics instead of disclosure semantics', async () => {
    const { getByRole } = render(
      <ThemeProvider>
        <PopupTrigger
          triggerOnHover
          popup={<span>Helpful hint</span>}
          popupProps={{ role: 'tooltip', noAnimation: true, portal: false } as never}
        >
          <Button>Info</Button>
        </PopupTrigger>
      </ThemeProvider>
    );

    const trigger = getByRole('button', { name: 'Info' });
    // disclosure attributes must not be present in tooltip mode —
    // aria-haspopup has no "tooltip" value
    expect(trigger).not.toHaveAttribute('aria-haspopup');
    expect(trigger).not.toHaveAttribute('aria-expanded');

    fireEvent.mouseEnter(trigger);

    await waitFor(() => {
      const tooltip = document.querySelector('[role="tooltip"]') as HTMLElement;
      expect(tooltip).toBeTruthy();
      expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
    });
    // tooltips never receive focus
    expect(document.activeElement).not.toBe(document.querySelector('[role="tooltip"]'));
  });

  it('should keep disclosure semantics for the default dialog role', () => {
    const { getByRole } = render(
      <ThemeProvider>
        <PopupTrigger popup={<span>Content</span>}>
          <Button>Open</Button>
        </PopupTrigger>
      </ThemeProvider>
    );

    const trigger = getByRole('button', { name: 'Open' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).not.toHaveAttribute('aria-describedby');
  });
});
