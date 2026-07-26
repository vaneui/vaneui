/**
 * Word break props for controlling how text breaks to prevent overflow
 */

export interface WordBreakProps {
  /** Reset breaking - overflow-wrap and word-break normal */
  breakNormal?: boolean;
  /** Break long words to prevent overflow - overflow-wrap: break-word */
  breakWords?: boolean;
  /** Break between any two characters - word-break: break-all */
  breakAll?: boolean;
  /** Do not break CJK text - word-break: keep-all */
  breakKeep?: boolean;
}
