/**
 * Root Menu component props.
 * Menu is a renderless provider — it emits no DOM element.
 */
export interface MenuProps {
  children: React.ReactNode;
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
  /** Trigger mode for MenuTrigger (default: 'click') */
  trigger?: 'click' | 'hover';
  /** Prevent menu from opening (default: false) */
  disabled?: boolean;
  /** Delay before opening on hover in ms (default: 0) */
  openDelay?: number;
  /** Delay before closing on hover in ms (default: 150) */
  closeDelay?: number;
}
