import type React from 'react';
import type { PopupProps } from './PopupProps';

/** PopupTrigger component props */
export interface PopupTriggerProps {
  /** The trigger element (must accept ref) */
  children: React.ReactElement;
  /** Content to render inside the popup */
  popup: React.ReactNode;
  /** Open popup on click (default: true when no other trigger is set) */
  triggerOnClick?: boolean;
  /** Open popup on mouse hover with optional delay */
  triggerOnHover?: boolean;
  /** Open popup on focus (for inputs with autocomplete/suggestions) */
  triggerOnFocus?: boolean;
  /** Delay before showing on hover in ms (default: 0) */
  openDelay?: number;
  /** Delay before hiding on hover in ms (default: 150) */
  closeDelay?: number;
  /** Props passed to the internal Popup component */
  popupProps?: Partial<Omit<PopupProps, 'open' | 'onClose' | 'anchorRef' | 'children'>>;
  /** Override the generated popup id for aria-controls (default: auto-generated) */
  popupId?: string;
  /** Prevent popup from opening (default: false) */
  disabled?: boolean;
}
