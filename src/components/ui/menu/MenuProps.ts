import type { PopupProps } from '../popup/PopupProps';

/**
 * Menu component props.
 *
 * Menu renders a trigger element and a dropdown popup with menu items.
 * Pass the trigger as a React element via the `trigger` prop; children
 * are the menu contents (MenuItem, MenuSeparator, MenuLabel).
 */
export type MenuProps = Omit<
  PopupProps,
  'anchorRef' | 'open' | 'onClose' | 'defaultOpen' | 'onOpenChange' | 'disabled' | 'children'
> & {
  children?: React.ReactNode;
  /** React element cloned as the menu trigger (receives ref, ARIA, click/keyboard handlers) */
  trigger: React.ReactElement;
  /** Controlled open state */
  open?: boolean;
  /** Initial open state for uncontrolled mode (default: false) */
  defaultOpen?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Called when the menu closes */
  onClose?: () => void;
  /** Close menu when any item is clicked (default: true) */
  closeOnItemClick?: boolean;
  /** Loop keyboard navigation from last to first (default: true) */
  loop?: boolean;
  /** Prevent menu from opening (default: false) */
  disabled?: boolean;
};
