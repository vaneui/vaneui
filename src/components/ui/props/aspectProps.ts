/**
 * Aspect ratio props
 */

export interface AspectProps {
  /** Square box (aspect-ratio: 1 / 1) */
  aspectSquare?: boolean;
  /** Video box (aspect-ratio: 16 / 9) */
  aspectVideo?: boolean;
  /** The content's own ratio (aspect-ratio: auto) */
  aspectAuto?: boolean;
}
