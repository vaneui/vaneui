/**
 * Truncate props for controlling text overflow with ellipsis
 */

export interface TruncateProps {
  /** Single line truncation with ellipsis */
  truncate?: boolean;
  /** Truncate at 2 lines with ellipsis */
  lineClamp2?: boolean;
  /** Truncate at 3 lines with ellipsis */
  lineClamp3?: boolean;
  /** Truncate at 4 lines with ellipsis */
  lineClamp4?: boolean;
  /** Truncate at 5 lines with ellipsis */
  lineClamp5?: boolean;
  /** Remove truncation */
  noTruncate?: boolean;
}
