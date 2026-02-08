/** Placement props for positioning floating elements relative to their anchor */
export interface PlacementProps {
  /** Position above anchor, centered horizontally (default) */
  top?: boolean;
  /** Position above anchor, aligned to start (left) */
  topStart?: boolean;
  /** Position above anchor, aligned to end (right) */
  topEnd?: boolean;
  /** Position below anchor, centered horizontally */
  bottom?: boolean;
  /** Position below anchor, aligned to start (left) */
  bottomStart?: boolean;
  /** Position below anchor, aligned to end (right) */
  bottomEnd?: boolean;
  /** Position to the left of anchor, centered vertically */
  left?: boolean;
  /** Position to the left of anchor, aligned to top */
  leftStart?: boolean;
  /** Position to the left of anchor, aligned to bottom */
  leftEnd?: boolean;
  /** Position to the right of anchor, centered vertically */
  right?: boolean;
  /** Position to the right of anchor, aligned to top */
  rightStart?: boolean;
  /** Position to the right of anchor, aligned to bottom */
  rightEnd?: boolean;
}
