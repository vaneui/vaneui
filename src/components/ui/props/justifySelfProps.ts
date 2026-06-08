/**
 * JustifySelf props for overriding a single grid item's inline-axis alignment
 * within its grid area (justify-self). Useful with CSS anchor positioning.
 */

export interface JustifySelfProps {
  /** Use the parent's justify-items value (justify-self: auto) */
  justifySelfAuto?: boolean;
  /** Align this item to the start of the inline axis (justify-self: start) */
  justifySelfStart?: boolean;
  /** Align this item to the end of the inline axis (justify-self: end) */
  justifySelfEnd?: boolean;
  /** Center this item on the inline axis (justify-self: center) */
  justifySelfCenter?: boolean;
  /** Stretch this item to fill the inline axis (justify-self: stretch) */
  justifySelfStretch?: boolean;
}
