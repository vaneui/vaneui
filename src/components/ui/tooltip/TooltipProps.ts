import type React from 'react';
import type { PopupProps } from "../popup/PopupProps";

/**
 * Tooltip component props. Popup props (size, appearance, variant, shape, placement, arrow, offset, ...)
 * are accepted directly and styled onto the tooltip. The ref, event handlers and aria-* attributes
 * go to the child instead, so a Tooltip can itself be the trigger of a Menu or PopupTrigger.
 */
export type TooltipProps = Omit<
  PopupProps,
  'anchorRef' | 'open' | 'onClose' | 'defaultOpen' | 'onOpenChange' | 'disabled' | 'children' | 'content' | 'id' | 'role'
> & {
  /** The element the tooltip describes (must accept ref) */
  children: React.ReactElement;
  /** Tooltip content */
  content: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Initial open state for uncontrolled mode */
  defaultOpen?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Delay before showing in ms (default: 300) */
  openDelay?: number;
  /** Delay before hiding in ms (default: 100) */
  closeDelay?: number;
  /** Props passed to the internal Popup, combined with the direct props (pass one value per category) */
  popupProps?: Partial<Omit<PopupProps, 'open' | 'onClose' | 'anchorRef' | 'children'>>;
  /** Override the generated tooltip id */
  popupId?: string;
  /** Prevent the tooltip from opening */
  disabled?: boolean;
};
