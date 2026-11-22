import type { AvatarProps } from "./AvatarProps";

/** Default props for the Avatar: a neutral circle with a thin edge, content centered and clipped to the shape */
export const avatarDefaults: Partial<AvatarProps> = {
  md: true,
  secondary: true,
  outline: true,
  pill: true,
  inlineFlex: true,
  itemsCenter: true,
  justifyCenter: true,
  overflowHidden: true,
  relative: true,
  noShrink: true,
  border: true,
  noInsetRing: true,
  fontMedium: true,
};
