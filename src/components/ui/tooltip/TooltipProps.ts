import type React from 'react';
import type { PopupProps } from "../popup/PopupProps";

/** Tooltip component props */
export interface TooltipProps {
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
  /** Props passed to the internal Popup */
  popupProps?: Partial<Omit<PopupProps, 'open' | 'onClose' | 'anchorRef' | 'children'>>;
  /** Override the generated tooltip id */
  popupId?: string;
  /** Prevent the tooltip from opening */
  disabled?: boolean;
}
