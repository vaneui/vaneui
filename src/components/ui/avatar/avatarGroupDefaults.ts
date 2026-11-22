import type { AvatarGroupProps } from "./AvatarGroupProps";

/** Default props for the AvatarGroup: a row; the overlap comes from the stylesheet */
export const avatarGroupDefaults: Partial<AvatarGroupProps> = {
  md: true,
  flex: true,
  row: true,
  itemsCenter: true,
  noMargin: true,
};
