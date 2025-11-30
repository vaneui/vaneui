/**
 * Text transform props for controlling text case
 */

export interface TextTransformProps {
  /** Transform text to uppercase */
  uppercase?: boolean;
  /** Transform text to lowercase */
  lowercase?: boolean;
  /** Capitalize first letter of each word */
  capitalize?: boolean;
  /** Normal text case (no transformation) */
  normalCase?: boolean;
}
