/**
 * List style props for choosing the marker type on <List>.
 * All six are mutually exclusive — first truthy per JSX declaration wins.
 */
export interface ListStyleProps {
  /** Filled bullet — default for unordered lists */
  disc?: boolean;
  /** Arabic numerals — default for ordered lists */
  decimal?: boolean;
  /** Hollow circle — typically 2nd-depth unordered marker */
  circle?: boolean;
  /** Filled square — typically 3rd-depth unordered marker */
  square?: boolean;
  /** Lowercase letters a, b, c — typically 2nd-depth ordered marker */
  lowerAlpha?: boolean;
  /** Lowercase roman i, ii, iii — typically 3rd-depth ordered marker */
  lowerRoman?: boolean;
}
