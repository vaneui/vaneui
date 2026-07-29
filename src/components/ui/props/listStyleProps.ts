/**
 * List style props for choosing the marker type on <List>.
 * All six are mutually exclusive. When more than one is set to true,
 * tuple order in ComponentKeys.listStyle determines which wins
 * (listDisc → listDecimal → listCircle → listSquare → listLowerAlpha → listLowerRoman).
 */
export interface ListStyleProps {
  /** Filled bullet — default for unordered lists — emits list-disc */
  listDisc?: boolean;
  /** Arabic numerals — default for ordered lists — emits list-decimal */
  listDecimal?: boolean;
  /** Hollow circle — typically 2nd-depth unordered marker — emits list-[circle] */
  listCircle?: boolean;
  /** Filled square — typically 3rd-depth unordered marker — emits list-[square] */
  listSquare?: boolean;
  /** Lowercase letters a, b, c — typically 2nd-depth ordered marker — emits list-[lower-alpha] */
  listLowerAlpha?: boolean;
  /** Lowercase roman i, ii, iii — typically 3rd-depth ordered marker — emits list-[lower-roman] */
  listLowerRoman?: boolean;
}
