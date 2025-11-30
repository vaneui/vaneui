/**
 * Items props for controlling flex item alignment (align-items)
 */

export interface ItemsProps {
  /** Align items to start (top/left) */
  itemsStart?: boolean;
  /** Align items to end (bottom/right) */
  itemsEnd?: boolean;
  /** Align items to center */
  itemsCenter?: boolean;
  /** Align items to baseline */
  itemsBaseline?: boolean;
  /** Stretch items to fill container */
  itemsStretch?: boolean;
}
