import type React from 'react';
import type { PopupProps } from './PopupProps';

/** Trigger interaction mode */
export type PopupTriggerMode = 'click' | 'hover' | 'focus';

/** PopupTrigger component props */
export interface PopupTriggerProps {
  /** The trigger element (must accept ref) */
  children: React.ReactElement;
  /** Content to render inside the popup */
  popup: React.ReactNode;
  /** How the popup is triggered (default: "click") */
  trigger?: PopupTriggerMode;
  /** Delay before showing on hover in ms (default: 0) */
  openDelay?: number;
  /** Delay before hiding on hover in ms (default: 150) */
  closeDelay?: number;
  /** Props passed to the internal Popup component */
  popupProps?: Partial<Omit<PopupProps, 'open' | 'onClose' | 'anchorRef' | 'children'>>;
}
