import '@testing-library/jest-dom';
import { render, fireEvent, act } from '@testing-library/react';

import {
  Menu,
  MenuItem,
  MenuLabel,
  Button,
  Divider,
  ThemeProvider,
  defaultTheme
} from '../../index';

// Helper to render menu in a theme provider
function renderMenu(ui: React.ReactElement) {
  return render(
    <ThemeProvider theme={defaultTheme}>
      {ui}
    </ThemeProvider>
  );
}

// Use fake timers for transition-related tests
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('Menu Component Tests', () => {

  // =========================================================================
  // MenuItem rendering
  // =========================================================================
  describe('MenuItem', () => {
    it('should render as a button by default with role="menuitem"', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem>Edit</MenuItem>
        </Menu>
      );

      const item = document.body.querySelector('[role="menuitem"]');
      expect(item).toBeInTheDocument();
      expect(item!.tagName).toBe('BUTTON');
      expect(item).toHaveAttribute('tabindex', '-1');
      expect(item).toHaveAttribute('data-menu-item', '');
      expect(item).toHaveAttribute('data-vane-type', 'ui');
      expect(item).toHaveAttribute('data-size', 'sm');
      expect(item).toHaveAttribute('data-appearance', 'primary');
      expect(item).toHaveAttribute('data-variant', 'outline');
    });

    it('should render as anchor tag when href is provided', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem href="/settings">Settings</MenuItem>
        </Menu>
      );

      const item = document.body.querySelector('[role="menuitem"]');
      expect(item).toBeInTheDocument();
      expect(item!.tagName).toBe('A');
      expect(item).toHaveAttribute('href', '/settings');
    });

    it('should support size variants', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      sizes.forEach(size => {
        const sizeProps = { [size]: true };
        const { unmount } = renderMenu(
          <Menu defaultOpen trigger={<Button>Trigger</Button>}>
            <MenuItem {...sizeProps}>Item</MenuItem>
          </Menu>
        );

        const item = document.body.querySelector('[role="menuitem"]');
        expect(item).toHaveAttribute('data-size', size);
        unmount();
      });
    });

    it('should support appearance variants', () => {
      const appearances = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'] as const;

      appearances.forEach(appearance => {
        const appearanceProps = { [appearance]: true };
        const { unmount } = renderMenu(
          <Menu defaultOpen trigger={<Button>Trigger</Button>}>
            <MenuItem {...appearanceProps}>Item</MenuItem>
          </Menu>
        );

        const item = document.body.querySelector('[role="menuitem"]');
        expect(item).toHaveAttribute('data-appearance', appearance);
        unmount();
      });
    });

    it('should not leak boolean props to DOM', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem danger filled lg>Item</MenuItem>
        </Menu>
      );

      const item = document.body.querySelector('[role="menuitem"]');
      expect(item).toBeInTheDocument();
      // Boolean props should be consumed by theme, not rendered as HTML attributes
      expect(item).not.toHaveAttribute('danger');
      expect(item).not.toHaveAttribute('filled');
      expect(item).not.toHaveAttribute('lg');
    });

    it('should pass through HTML attributes', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem data-testid="my-item" aria-label="Edit item">Edit</MenuItem>
        </Menu>
      );

      const item = document.body.querySelector('[data-testid="my-item"]');
      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute('aria-label', 'Edit item');
    });

    it('should forward refs', () => {
      const ref = { current: null as HTMLElement | null };
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem ref={ref}>Edit</MenuItem>
        </Menu>
      );

      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current!.tagName).toBe('BUTTON');
    });

    it('should set disabled attributes when disabled', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem disabled>Disabled Item</MenuItem>
        </Menu>
      );

      const item = document.body.querySelector('[role="menuitem"]');
      // Theme system generates data-disabled="true"
      expect(item).toHaveAttribute('data-disabled', 'true');
      expect(item).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not fire onClick when disabled', () => {
      const onClick = jest.fn();
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem disabled onClick={onClick}>Disabled</MenuItem>
        </Menu>
      );

      const item = document.body.querySelector('[role="menuitem"]') as HTMLElement;
      fireEvent.click(item);
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  // =========================================================================
  // Menu open/close
  // =========================================================================
  describe('Menu open/close', () => {
    it('should not render menu dropdown when closed', () => {
      renderMenu(
        <Menu trigger={<Button>Trigger</Button>}>
          <MenuItem>Item</MenuItem>
        </Menu>
      );

      const menu = document.body.querySelector('[role="menu"]');
      expect(menu).not.toBeInTheDocument();
    });

    it('should render menu dropdown when defaultOpen is true', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem>Item</MenuItem>
        </Menu>
      );

      const menu = document.body.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();
    });

    it('should toggle menu on trigger click', () => {
      const { container } = renderMenu(
        <Menu trigger={<Button>Trigger</Button>}>
          <MenuItem>Item</MenuItem>
        </Menu>
      );

      const trigger = container.querySelector('button') as HTMLElement;
      expect(document.body.querySelector('[role="menu"]')).not.toBeInTheDocument();

      // Open
      fireEvent.click(trigger);
      expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument();

      // Close — trigger sets open=false, Popup transitions out
      fireEvent.click(trigger);
      // Advance timers past the transition duration
      act(() => { jest.advanceTimersByTime(300); });
      expect(document.body.querySelector('[role="menu"]')).not.toBeInTheDocument();
    });

    it('should close menu when item is clicked', () => {
      const onClick = jest.fn();
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem onClick={onClick}>Edit</MenuItem>
        </Menu>
      );

      const item = document.body.querySelector('[role="menuitem"]') as HTMLElement;
      fireEvent.click(item);
      expect(onClick).toHaveBeenCalled();
      act(() => { jest.advanceTimersByTime(300); });
      expect(document.body.querySelector('[role="menu"]')).not.toBeInTheDocument();
    });

    it('should not close menu when closeOnItemClick is false', () => {
      renderMenu(
        <Menu defaultOpen closeOnItemClick={false} trigger={<Button>Trigger</Button>}>
          <MenuItem>Edit</MenuItem>
        </Menu>
      );

      const item = document.body.querySelector('[role="menuitem"]') as HTMLElement;
      fireEvent.click(item);
      expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument();
    });

    it('should support per-item closeMenuOnClick override', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem closeMenuOnClick={false}>Stay Open</MenuItem>
          <MenuItem>Close</MenuItem>
        </Menu>
      );

      const items = document.body.querySelectorAll('[role="menuitem"]');
      // Click item with closeMenuOnClick=false — menu stays open
      fireEvent.click(items[0] as HTMLElement);
      expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument();

      // Click second item — menu closes
      fireEvent.click(items[1] as HTMLElement);
      act(() => { jest.advanceTimersByTime(300); });
      expect(document.body.querySelector('[role="menu"]')).not.toBeInTheDocument();
    });
  });

  // =========================================================================
  // ARIA attributes
  // =========================================================================
  describe('ARIA', () => {
    it('should set aria-haspopup and aria-expanded on trigger', () => {
      const { container } = renderMenu(
        <Menu trigger={<Button>Trigger</Button>}>
          <MenuItem>Item</MenuItem>
        </Menu>
      );

      const trigger = container.querySelector('button') as HTMLElement;
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('should set role="menu" on dropdown', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem>Item</MenuItem>
        </Menu>
      );

      const menu = document.body.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();
      expect(menu).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  // =========================================================================
  // Keyboard navigation
  // =========================================================================
  describe('Keyboard navigation', () => {
    it('should navigate items with ArrowDown/ArrowUp', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem data-testid="item-1">Item 1</MenuItem>
          <MenuItem data-testid="item-2">Item 2</MenuItem>
          <MenuItem data-testid="item-3">Item 3</MenuItem>
        </Menu>
      );

      const items = document.body.querySelectorAll('[role="menuitem"]');
      // Focus on first item
      (items[0] as HTMLElement).focus();

      // Arrow down to second
      fireEvent.keyDown(items[0] as HTMLElement, { key: 'ArrowDown' });
      expect(document.activeElement).toBe(items[1]);

      // Arrow down to third
      fireEvent.keyDown(items[1] as HTMLElement, { key: 'ArrowDown' });
      expect(document.activeElement).toBe(items[2]);

      // Arrow up back to second
      fireEvent.keyDown(items[2] as HTMLElement, { key: 'ArrowUp' });
      expect(document.activeElement).toBe(items[1]);
    });

    it('should loop navigation when loop is true', () => {
      renderMenu(
        <Menu defaultOpen loop trigger={<Button>Trigger</Button>}>
          <MenuItem data-testid="item-1">Item 1</MenuItem>
          <MenuItem data-testid="item-2">Item 2</MenuItem>
        </Menu>
      );

      const items = document.body.querySelectorAll('[role="menuitem"]');

      // Focus last item, ArrowDown should loop to first
      (items[1] as HTMLElement).focus();
      fireEvent.keyDown(items[1] as HTMLElement, { key: 'ArrowDown' });
      expect(document.activeElement).toBe(items[0]);

      // Focus first item, ArrowUp should loop to last
      fireEvent.keyDown(items[0] as HTMLElement, { key: 'ArrowUp' });
      expect(document.activeElement).toBe(items[1]);
    });

    it('should jump to first/last with Home/End', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </Menu>
      );

      const items = document.body.querySelectorAll('[role="menuitem"]');
      (items[1] as HTMLElement).focus();

      // Home jumps to first
      fireEvent.keyDown(items[1] as HTMLElement, { key: 'Home' });
      expect(document.activeElement).toBe(items[0]);

      // End jumps to last
      fireEvent.keyDown(items[0] as HTMLElement, { key: 'End' });
      expect(document.activeElement).toBe(items[2]);
    });

    it('should skip disabled items in navigation', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem data-testid="item-1">Item 1</MenuItem>
          <MenuItem disabled data-testid="item-2">Item 2 (disabled)</MenuItem>
          <MenuItem data-testid="item-3">Item 3</MenuItem>
        </Menu>
      );

      const items = document.body.querySelectorAll('[data-menu-item]:not([data-disabled])');
      expect(items).toHaveLength(2);

      // Focus first non-disabled, ArrowDown should skip to third
      (items[0] as HTMLElement).focus();
      fireEvent.keyDown(items[0] as HTMLElement, { key: 'ArrowDown' });
      expect(document.activeElement).toBe(items[1]);
    });

    it('should activate item with Enter', () => {
      const onClick = jest.fn();
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem onClick={onClick}>Edit</MenuItem>
        </Menu>
      );

      const item = document.body.querySelector('[role="menuitem"]') as HTMLElement;
      (item as HTMLElement).focus();
      fireEvent.keyDown(item, { key: 'Enter' });
      expect(onClick).toHaveBeenCalled();
    });

    it('should open menu on ArrowDown from trigger', () => {
      const { container } = renderMenu(
        <Menu trigger={<Button>Trigger</Button>}>
          <MenuItem>Item</MenuItem>
        </Menu>
      );

      const trigger = container.querySelector('button') as HTMLElement;
      fireEvent.keyDown(trigger, { key: 'ArrowDown' });
      expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument();
    });
  });

  // =========================================================================
  // Integration with Divider
  // =========================================================================
  describe('Integration', () => {
    it('should work with Divider separators', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Copy</MenuItem>
          <Divider />
          <MenuItem danger>Delete</MenuItem>
        </Menu>
      );

      const items = document.body.querySelectorAll('[role="menuitem"]');
      expect(items).toHaveLength(3);

      // Divider renders with vane-divider class, menu context applies compact styling
      const divider = document.body.querySelector('[data-menu-dropdown] .vane-divider');
      expect(divider).toBeInTheDocument();
    });
  });

  // =========================================================================
  // Controlled mode
  // =========================================================================
  describe('Controlled mode', () => {
    it('should respect controlled open prop', () => {
      const { rerender } = render(
        <ThemeProvider theme={defaultTheme}>
          <Menu open={false} trigger={<Button>Trigger</Button>}>
            <MenuItem>Item</MenuItem>
          </Menu>
        </ThemeProvider>
      );

      expect(document.body.querySelector('[role="menu"]')).not.toBeInTheDocument();

      rerender(
        <ThemeProvider theme={defaultTheme}>
          <Menu open={true} trigger={<Button>Trigger</Button>}>
            <MenuItem>Item</MenuItem>
          </Menu>
        </ThemeProvider>
      );

      expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument();
    });
  });

  // =========================================================================
  // Divider in Menu
  // =========================================================================
  describe('Divider in Menu', () => {
    it('should render a Divider between menu items', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem>Edit</MenuItem>
          <Divider role="separator" />
          <MenuItem>Delete</MenuItem>
        </Menu>
      );

      const separator = document.body.querySelector('[role="separator"]');
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveClass('vane-divider');
      expect(separator).toHaveAttribute('data-vane-type', 'layout');
    });
  });

  // =========================================================================
  // Divider scoped theme
  // =========================================================================
  describe('Divider scoped theme', () => {
    it('should apply menu divider theme automatically (sm size, padding)', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem>Edit</MenuItem>
          <Divider />
          <MenuItem>Delete</MenuItem>
        </Menu>
      );

      const divider = document.body.querySelector('[data-menu-dropdown] .vane-divider');
      expect(divider).toBeInTheDocument();
      // Menu divider defaults: sm size, padding enabled
      expect(divider).toHaveAttribute('data-size', 'sm');
    });
  });

  // =========================================================================
  // MenuLabel
  // =========================================================================
  describe('MenuLabel', () => {
    it('should render with role="presentation"', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuLabel>Actions</MenuLabel>
          <MenuItem>Edit</MenuItem>
        </Menu>
      );

      const label = document.body.querySelector('[role="presentation"]');
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass('vane-menu-label');
      expect(label).toHaveAttribute('data-vane-type', 'ui');
      expect(label).toHaveTextContent('Actions');
    });

    it('should render as div by default (non-interactive)', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuLabel>Section</MenuLabel>
        </Menu>
      );

      const label = document.body.querySelector('.vane-menu-label');
      expect(label).toBeInTheDocument();
      expect(label!.tagName).toBe('DIV');
    });

    it('should default to secondary appearance', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuLabel>Section</MenuLabel>
        </Menu>
      );

      const label = document.body.querySelector('.vane-menu-label');
      expect(label).toHaveAttribute('data-appearance', 'secondary');
    });

    it('should default to sm size', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuLabel>Section</MenuLabel>
        </Menu>
      );

      const label = document.body.querySelector('.vane-menu-label');
      expect(label).toHaveAttribute('data-size', 'sm');
    });

    it('should forward refs', () => {
      const ref = { current: null as HTMLElement | null };
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuLabel ref={ref}>Section</MenuLabel>
        </Menu>
      );

      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it('should not leak boolean props to DOM', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuLabel danger lg>Section</MenuLabel>
        </Menu>
      );

      const label = document.body.querySelector('.vane-menu-label');
      expect(label).toBeInTheDocument();
      expect(label).not.toHaveAttribute('danger');
      expect(label).not.toHaveAttribute('lg');
    });
  });

  // =========================================================================
  // Menu dropdown rendering
  // =========================================================================
  describe('Menu dropdown', () => {
    it('should render as a popup with data-menu-dropdown attribute', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem>Item</MenuItem>
        </Menu>
      );

      const menu = document.body.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();
      // Menu renders as Popup with menu-specific defaults and attribute
      expect(menu).toHaveClass('vane-popup');
      expect(menu).toHaveAttribute('data-menu-dropdown');
    });

    it('should apply menu popup defaults from theme (not hardcoded props)', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuItem>Item</MenuItem>
        </Menu>
      );

      const menu = document.body.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();
      // These defaults come from defaultMenuPopupTheme via ThemeProvider,
      // NOT from hardcoded boolean props on the Popup element
      expect(menu).toHaveAttribute('data-size', 'md');
      expect(menu).toHaveAttribute('data-appearance', 'primary');
      expect(menu).toHaveAttribute('data-variant', 'outline');
    });

    it('should allow overriding menu popup defaults via ThemeProvider', () => {
      render(
        <ThemeProvider theme={defaultTheme} themeDefaults={{
          menu: { popup: { lg: true, secondary: true } }
        }}>
          <Menu defaultOpen trigger={<Button>Trigger</Button>}>
            <MenuItem>Item</MenuItem>
          </Menu>
        </ThemeProvider>
      );

      const menu = document.body.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();
      expect(menu).toHaveAttribute('data-size', 'lg');
      expect(menu).toHaveAttribute('data-appearance', 'secondary');
    });
  });

  // =========================================================================
  // Full menu composition
  // =========================================================================
  describe('Full composition', () => {
    it('should render a complete labeled menu', () => {
      renderMenu(
        <Menu defaultOpen trigger={<Button>Trigger</Button>}>
          <MenuLabel>Actions</MenuLabel>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Copy</MenuItem>
          <Divider role="separator" />
          <MenuLabel>Danger Zone</MenuLabel>
          <MenuItem danger>Delete</MenuItem>
        </Menu>
      );

      // Two labels
      const labels = document.body.querySelectorAll('.vane-menu-label');
      expect(labels).toHaveLength(2);
      expect(labels[0]).toHaveTextContent('Actions');
      expect(labels[1]).toHaveTextContent('Danger Zone');

      // One separator
      const separators = document.body.querySelectorAll('[role="separator"]');
      expect(separators).toHaveLength(1);

      // Three menu items
      const items = document.body.querySelectorAll('[role="menuitem"]');
      expect(items).toHaveLength(3);
    });
  });
});
