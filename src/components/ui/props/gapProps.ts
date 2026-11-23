/**
 * Gap props for controlling spacing between children
 */

export interface GapProps {
  /** Enable gap spacing between children, at the component's size */
  gap?: boolean;
  /** Extra-small gap, whatever the component's size */
  gapXs?: boolean;
  /** Small gap, whatever the component's size */
  gapSm?: boolean;
  /** Medium gap, whatever the component's size */
  gapMd?: boolean;
  /** Large gap, whatever the component's size */
  gapLg?: boolean;
  /** Extra-large gap, whatever the component's size */
  gapXl?: boolean;
  /** Disable gap spacing */
  noGap?: boolean;
}
