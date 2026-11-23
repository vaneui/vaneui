import { LAYOUT_CORE, MARGIN } from "../props/categoryBuilders";

/** Categories for the AvatarGroup: a row of overlapping avatars; its size reaches the avatars */
export const AVATAR_GROUP_CATEGORIES = [
  ...LAYOUT_CORE,
  'flexDirection',
  ...MARGIN,
] as const;
