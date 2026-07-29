/**
 * Ring props for the always-on inset ring (emits ring-inset). Not the focus
 * indicator — that is focusVisible.
 */

export interface RingProps {
  /** Enable the inset ring — emits ring-inset */
  insetRing?: boolean;
  /** Disable the inset ring */
  noInsetRing?: boolean;
}
