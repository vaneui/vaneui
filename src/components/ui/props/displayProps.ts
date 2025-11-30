/**
 * Display props for controlling CSS display property
 */

export interface DisplayProps {
  /** Inline display - flows with text */
  inline?: boolean;
  /** Block display - takes full width, new line */
  block?: boolean;
  /** Inline-block display - inline but with block properties */
  inlineBlock?: boolean;
  /** Flex display - flexbox container */
  flex?: boolean;
  /** Inline-flex display - inline flexbox container */
  inlineFlex?: boolean;
  /** Grid display - CSS grid container */
  grid?: boolean;
  /** Inline-grid display - inline grid container */
  inlineGrid?: boolean;
  /** Contents display - element's box is removed, children display as if parent didn't exist */
  contents?: boolean;
  /** Table display - behaves like table element */
  table?: boolean;
  /** Table-cell display - behaves like td element */
  tableCell?: boolean;
  /** Hidden display - element is not visible */
  hidden?: boolean;
}
