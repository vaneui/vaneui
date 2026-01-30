/**
 * Object fit props for controlling image/video sizing within container
 */

export interface ObjectFitProps {
  /** Cover - image covers container, may be cropped */
  objectCover?: boolean;
  /** Contain - image fits inside container, may have letterboxing */
  objectContain?: boolean;
  /** Fill - image stretches to fill container */
  objectFill?: boolean;
  /** None - image displays at natural size */
  objectNone?: boolean;
  /** Scale down - like contain, but never scales up */
  objectScaleDown?: boolean;
}
