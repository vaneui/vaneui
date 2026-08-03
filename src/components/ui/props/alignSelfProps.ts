/**
 * AlignSelf props for overriding a single flex/grid item's cross-axis
 * alignment (align-self), independent of the parent's align-items.
 */

export interface AlignSelfProps {
  /** Use the parent's align-items value (align-self: auto) */
  alignSelfAuto?: boolean;
  /** Align this item to the start of the cross axis (align-self: flex-start) */
  alignSelfStart?: boolean;
  /** Align this item to the end of the cross axis (align-self: flex-end) */
  alignSelfEnd?: boolean;
  /** Center this item on the cross axis (align-self: center) */
  alignSelfCenter?: boolean;
  /** Stretch this item to fill the cross axis (align-self: stretch) */
  alignSelfStretch?: boolean;
  /** Align this item to its baseline (align-self: baseline) */
  alignSelfBaseline?: boolean;
}
