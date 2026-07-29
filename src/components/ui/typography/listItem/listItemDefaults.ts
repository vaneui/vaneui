import type { TypographyProps } from "../common";

/** Default props for ListItem. No size default so it inherits --fs-unit/--gap-unit from the parent List (like Card/Modal sub-components); pass an explicit size to opt out. */
export const listItemDefaults: Partial<TypographyProps> = {
  outline: true,
  fontSans: true,
};
