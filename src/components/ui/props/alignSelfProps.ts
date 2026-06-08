/**
 * AlignSelf props for overriding a single flex/grid item's cross-axis
 * alignment (align-self), independent of the parent's align-items.
 */

export interface AlignSelfProps {
  /** Use the parent's align-items value (align-self: auto) */
  selfAuto?: boolean;
  /** Align this item to the start of the cross axis (align-self: flex-start) */
  selfStart?: boolean;
  /** Align this item to the end of the cross axis (align-self: flex-end) */
  selfEnd?: boolean;
  /** Center this item on the cross axis (align-self: center) */
  selfCenter?: boolean;
  /** Stretch this item to fill the cross axis (align-self: stretch) */
  selfStretch?: boolean;
  /** Align this item to its baseline (align-self: baseline) */
  selfBaseline?: boolean;
}
