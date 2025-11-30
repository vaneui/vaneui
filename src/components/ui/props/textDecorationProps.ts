/**
 * Text decoration props for controlling text underline/strikethrough
 */

export interface TextDecorationProps {
  /** Add underline decoration below text */
  underline?: boolean;
  /** Add strikethrough/line-through decoration across text */
  lineThrough?: boolean;
  /** Remove text decoration (no underline, strikethrough, etc.) */
  noUnderline?: boolean;
  /** Add overline decoration above text */
  overline?: boolean;
}
