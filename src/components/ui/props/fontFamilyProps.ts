/**
 * Font family props for controlling text font
 */

export interface FontFamilyProps {
  /** Sans-serif font family (default) */
  sans?: boolean;
  /** Serif font family */
  serif?: boolean;
  /** Monospace font family */
  mono?: boolean;
  /** Heading font family (defaults to sans, independently customizable via --font-heading CSS variable) */
  heading?: boolean;
}
