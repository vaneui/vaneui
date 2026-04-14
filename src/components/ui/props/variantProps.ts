/**
 * Variant props for controlling component style variations
 */

export interface VariantProps {
  /** Filled variant - solid background with contrasting text color */
  filled?: boolean;
  /** Outline variant - transparent background with border and colored text (default) */
  outline?: boolean;
  /** Ghost variant - transparent background, no border, appearance-colored text, tinted hover background */
  ghost?: boolean;
}
