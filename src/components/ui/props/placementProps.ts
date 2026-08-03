/** Placement props for positioning floating elements relative to their anchor */
export interface PlacementProps {
  /** Position above anchor, centered horizontally (default) */
  placeTop?: boolean;
  /** Position above anchor, aligned to start (left) */
  placeTopStart?: boolean;
  /** Position above anchor, aligned to end (right) */
  placeTopEnd?: boolean;
  /** Position below anchor, centered horizontally */
  placeBottom?: boolean;
  /** Position below anchor, aligned to start (left) */
  placeBottomStart?: boolean;
  /** Position below anchor, aligned to end (right) */
  placeBottomEnd?: boolean;
  /** Position to the left of anchor, centered vertically */
  placeLeft?: boolean;
  /** Position to the left of anchor, aligned to top */
  placeLeftStart?: boolean;
  /** Position to the left of anchor, aligned to bottom */
  placeLeftEnd?: boolean;
  /** Position to the right of anchor, centered vertically */
  placeRight?: boolean;
  /** Position to the right of anchor, aligned to top */
  placeRightStart?: boolean;
  /** Position to the right of anchor, aligned to bottom */
  placeRightEnd?: boolean;
}
