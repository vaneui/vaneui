/**
 * Font family props for controlling text font
 */

export interface FontFamilyProps {
  /** Sans-serif font family (default) — emits font-sans */
  fontSans?: boolean;
  /** Serif font family — emits font-serif */
  fontSerif?: boolean;
  /** Monospace font family — emits font-mono */
  fontMono?: boolean;
  /** Heading font family (defaults to sans, customizable via --font-heading) — emits font-heading */
  fontHeading?: boolean;
}
