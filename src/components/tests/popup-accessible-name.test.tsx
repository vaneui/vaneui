import '@testing-library/jest-dom';
import { useRef } from 'react';
import { render } from '@testing-library/react';

import { Popup, PopupTrigger, Menu, MenuItem, Tooltip, Button, ThemeProvider, defaultTheme } from '../../index';

// A popup opened from a trigger is named by that trigger. A dialog (the default Popup role) with no
// accessible name is an ARIA violation, and a menu named after its button is what screen readers expect.

const wrap = (ui: React.ReactElement) => <ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>;
const byTestId = (id: string) => document.body.querySelector(`[data-testid="${id}"]`) as HTMLElement;
// the PopupTrigger tests give their popup this id through `popupId`
const getPopup = () => document.getElementById('popup') as HTMLElement;

describe('PopupTrigger: the popup is named by its trigger', () => {
  it('should point the popup at the trigger and give the trigger an id for it', () => {
    render(wrap(
      <PopupTrigger defaultOpen popup={<div>Content</div>} popupId="popup">
        <button data-testid="trigger">Filters</button>
      </PopupTrigger>
    ));

    const trigger = byTestId('trigger');
    const popup = getPopup();
    expect(trigger.id).not.toBe('');
    expect(popup).toHaveAttribute('role', 'dialog');
    expect(popup).toHaveAttribute('aria-labelledby', trigger.id);
    expect(popup).toHaveAccessibleName('Filters');
  });

  it('should use the id the trigger already has', () => {
    render(wrap(
      <PopupTrigger defaultOpen popup={<div>Content</div>} popupId="popup">
        <button id="filters-button" data-testid="trigger">Filters</button>
      </PopupTrigger>
    ));

    expect(byTestId('trigger').id).toBe('filters-button');
    expect(getPopup()).toHaveAttribute('aria-labelledby', 'filters-button');
  });

  it('should name the popup after a VaneUI Button trigger too', () => {
    render(wrap(
      <PopupTrigger defaultOpen popup={<div>Content</div>} popupId="popup">
        <Button data-testid="trigger">Share</Button>
      </PopupTrigger>
    ));

    expect(getPopup()).toHaveAttribute('aria-labelledby', byTestId('trigger').id);
    expect(getPopup()).toHaveAccessibleName('Share');
  });

  it('should keep an aria-label the consumer gave the popup', () => {
    render(wrap(
      <PopupTrigger defaultOpen popup={<div>Content</div>} popupId="popup" popupProps={{ 'aria-label': 'Filter options' }}>
        <button data-testid="trigger">Filters</button>
      </PopupTrigger>
    ));

    const popup = getPopup();
    expect(popup).not.toHaveAttribute('aria-labelledby');
    expect(popup).toHaveAccessibleName('Filter options');
    // no reference to the trigger, so it gets no id either
    expect(byTestId('trigger')).not.toHaveAttribute('id');
  });

  it('should keep an aria-labelledby the consumer gave the popup', () => {
    render(wrap(
      <>
        <h2 id="panel-heading">Advanced filters</h2>
        <PopupTrigger defaultOpen popup={<div>Content</div>} popupId="popup" popupProps={{ 'aria-labelledby': 'panel-heading' }}>
          <button data-testid="trigger">Filters</button>
        </PopupTrigger>
      </>
    ));

    expect(getPopup()).toHaveAttribute('aria-labelledby', 'panel-heading');
    expect(getPopup()).toHaveAccessibleName('Advanced filters');
    expect(byTestId('trigger')).not.toHaveAttribute('id');
  });

  it('should name a popup with another role the same way', () => {
    render(wrap(
      <PopupTrigger defaultOpen popup={<div role="option" aria-selected="false">One</div>} popupId="popup" popupProps={{ role: 'listbox' }}>
        <button data-testid="trigger">Choose</button>
      </PopupTrigger>
    ));

    expect(getPopup()).toHaveAttribute('aria-labelledby', byTestId('trigger').id);
  });

  it('should leave a tooltip alone: it is named by its own text and describes the trigger', () => {
    render(wrap(
      <Tooltip open content="Copy link">
        <Button data-testid="trigger">Copy</Button>
      </Tooltip>
    ));

    const tooltip = document.body.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tooltip).toHaveAttribute('role', 'tooltip');
    expect(tooltip).not.toHaveAttribute('aria-labelledby');
    expect(byTestId('trigger')).not.toHaveAttribute('id');
    expect(byTestId('trigger')).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('should keep the trigger id stable across renders', () => {
    const ui = (label: string) => wrap(
      <PopupTrigger defaultOpen popup={<div>Content</div>} popupId="popup">
        <button data-testid="trigger">{label}</button>
      </PopupTrigger>
    );
    const { rerender } = render(ui('Filters'));
    const id = byTestId('trigger').id;

    rerender(ui('Filters (2)'));
    expect(byTestId('trigger').id).toBe(id);
    expect(getPopup()).toHaveAccessibleName('Filters (2)');
  });
});

describe('Menu: the menu is named by its trigger', () => {
  it('should point the menu at the trigger and give the trigger an id for it', () => {
    render(wrap(
      <Menu defaultOpen trigger={<Button data-testid="trigger">Actions</Button>} data-testid="menu">
        <MenuItem>Edit</MenuItem>
      </Menu>
    ));

    const trigger = byTestId('trigger');
    const menu = byTestId('menu');
    expect(trigger.id).not.toBe('');
    expect(menu).toHaveAttribute('role', 'menu');
    expect(menu).toHaveAttribute('aria-labelledby', trigger.id);
    expect(menu).toHaveAccessibleName('Actions');
  });

  it('should use the id the trigger already has', () => {
    render(wrap(
      <Menu defaultOpen trigger={<Button id="actions-button" data-testid="trigger">Actions</Button>} data-testid="menu">
        <MenuItem>Edit</MenuItem>
      </Menu>
    ));

    expect(byTestId('trigger').id).toBe('actions-button');
    expect(byTestId('menu')).toHaveAttribute('aria-labelledby', 'actions-button');
  });

  it('should keep a name the consumer gave the menu', () => {
    render(wrap(
      <Menu defaultOpen trigger={<Button data-testid="trigger">Actions</Button>} data-testid="menu" aria-label="Row actions">
        <MenuItem>Edit</MenuItem>
      </Menu>
    ));

    const menu = byTestId('menu');
    expect(menu).not.toHaveAttribute('aria-labelledby');
    expect(menu).toHaveAccessibleName('Row actions');
    expect(byTestId('trigger')).not.toHaveAttribute('id');
  });

  it('should find the real trigger behind a Tooltip and leave the tooltip its own id', () => {
    render(wrap(
      <Menu defaultOpen trigger={<Tooltip open content="More actions"><Button data-testid="trigger">Actions</Button></Tooltip>} data-testid="menu">
        <MenuItem>Edit</MenuItem>
      </Menu>
    ));

    const trigger = byTestId('trigger');
    const tooltip = document.body.querySelector('[role="tooltip"]') as HTMLElement;
    expect(trigger.id).not.toBe('');
    expect(byTestId('menu')).toHaveAttribute('aria-labelledby', trigger.id);
    expect(tooltip.id).not.toBe(trigger.id);
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('should use the id of a trigger wrapped in a Tooltip', () => {
    render(wrap(
      <Menu defaultOpen trigger={<Tooltip content="More actions"><Button id="actions-button" data-testid="trigger">Actions</Button></Tooltip>} data-testid="menu">
        <MenuItem>Edit</MenuItem>
      </Menu>
    ));

    expect(byTestId('trigger').id).toBe('actions-button');
    expect(byTestId('menu')).toHaveAttribute('aria-labelledby', 'actions-button');
    expect(byTestId('menu')).toHaveAccessibleName('Actions');
  });

  it('should follow the trigger when its id changes', () => {
    const ui = (id?: string) => wrap(
      <Menu defaultOpen trigger={<Button id={id} data-testid="trigger">Actions</Button>} data-testid="menu">
        <MenuItem>Edit</MenuItem>
      </Menu>
    );
    const { rerender } = render(ui('first-id'));
    expect(byTestId('menu')).toHaveAttribute('aria-labelledby', 'first-id');

    rerender(ui('second-id'));
    expect(byTestId('menu')).toHaveAttribute('aria-labelledby', 'second-id');

    // the id is taken away: the trigger gets a generated one, and the menu follows
    rerender(ui(undefined));
    expect(byTestId('trigger').id).not.toBe('');
    expect(byTestId('menu')).toHaveAttribute('aria-labelledby', byTestId('trigger').id);
  });

  it('should name a submenu after the item that opens it', () => {
    render(wrap(
      <Menu defaultOpen trigger={<Button>Actions</Button>} data-testid="menu">
        <MenuItem>Edit</MenuItem>
        <Menu defaultOpen trigger={<MenuItem data-testid="sub-trigger">Share</MenuItem>} data-testid="submenu">
          <MenuItem>Copy link</MenuItem>
        </Menu>
      </Menu>
    ));

    const subTrigger = byTestId('sub-trigger');
    const submenu = byTestId('submenu');
    expect(submenu).toHaveAttribute('aria-labelledby', subTrigger.id);
    expect(submenu).toHaveAccessibleName('Share');
  });
});

describe('Popup: development warning for a dialog without a name', () => {
  let warn: jest.SpyInstance;

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warn.mockRestore();
  });

  const nameWarnings = () => warn.mock.calls.filter(([message]) => String(message).includes('no accessible name'));

  function Harness(props: Record<string, unknown>) {
    const anchorRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <button ref={anchorRef}>Anchor</button>
        <Popup open anchorRef={anchorRef} {...props}>Content</Popup>
      </>
    );
  }

  it('should warn when a Popup with the default dialog role has no name', () => {
    render(wrap(<Harness />));
    expect(nameWarnings()).toHaveLength(1);
    expect(String(nameWarnings()[0][0])).toContain('aria-label or aria-labelledby');
  });

  it('should warn for an unnamed modal Popup whatever its role', () => {
    render(wrap(<Harness modal role="group" />));
    expect(nameWarnings()).toHaveLength(1);
  });

  it('should stay quiet when the Popup has aria-label or aria-labelledby', () => {
    render(wrap(<Harness aria-label="Details" />));
    render(wrap(<Harness aria-labelledby="some-heading" />));
    expect(nameWarnings()).toHaveLength(0);
  });

  it('should stay quiet for roles that are not dialogs', () => {
    render(wrap(<Harness role="tooltip" />));
    render(wrap(<Harness role="menu" />));
    render(wrap(<Harness role="listbox" />));
    expect(nameWarnings()).toHaveLength(0);
  });

  it('should stay quiet while the Popup is closed', () => {
    render(wrap(<Harness open={false} />));
    expect(nameWarnings()).toHaveLength(0);
  });

  it('should stay quiet for PopupTrigger, Menu and Tooltip, which name or describe by the trigger', () => {
    render(wrap(
      <>
        <PopupTrigger defaultOpen popup={<div>Content</div>}>
          <button>Filters</button>
        </PopupTrigger>
        <Menu defaultOpen trigger={<Button>Actions</Button>}>
          <MenuItem>Edit</MenuItem>
        </Menu>
        <Tooltip open content="Copy link">
          <Button>Copy</Button>
        </Tooltip>
      </>
    ));
    expect(nameWarnings()).toHaveLength(0);
  });
});
