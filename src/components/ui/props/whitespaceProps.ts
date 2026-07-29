/**
 * Whitespace props for controlling text wrapping behavior
 */

export interface WhitespaceProps {
  /** No wrap - text stays on single line */
  whitespaceNowrap?: boolean;
  /** Normal wrapping - default browser behavior */
  whitespaceNormal?: boolean;
  /** Preserve whitespace and line breaks */
  whitespacePre?: boolean;
  /** Preserve whitespace, wrap text */
  whitespacePreWrap?: boolean;
  /** Preserve line breaks, collapse spaces, wrap text */
  whitespacePreLine?: boolean;
  /** Preserve whitespace incl. trailing spaces, wrap text (white-space: break-spaces) */
  whitespaceBreakSpaces?: boolean;
}
