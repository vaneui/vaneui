import type { TypographyProps } from "../common";

/** Default props for the Blockquote cite source line */
export const blockquoteCiteDefaults: Partial<TypographyProps> = {
  md: true,
  sans: true,
  outline: true,
  // muted via the tertiary text token (not opacity); block + not-italic reset
  // the UA <cite> italic and put the source on its own line
  tertiary: true,
  block: true,
  notItalic: true,
};
