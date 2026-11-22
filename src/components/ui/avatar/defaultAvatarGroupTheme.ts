import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { AvatarGroupProps } from "./AvatarGroupProps";
import type { AvatarGroupTheme } from "./AvatarGroupTheme";
import { DirectionClassMapper } from "../theme/layout";
import { MarginClassMapper } from "../theme/size";
import { AVATAR_GROUP_CATEGORIES } from "./AvatarGroupCategories";
import { avatarGroupDefaults } from "./avatarGroupDefaults";

// A row of avatars that overlap by a quarter of their size, each ringed in the surface
// color behind the group (rules.css). Its size is the size default of the avatars in it.
export const defaultAvatarGroupTheme = new ComponentTheme<AvatarGroupProps, AvatarGroupTheme>(
  "div",
  "vane-avatar-group",
  {
    size: {
      margin: new MarginClassMapper(),
    },
    layout: {
      ...defaultLayoutClassMappers,
      flexDirection: new DirectionClassMapper(),
    },
  },
  avatarGroupDefaults,
  AVATAR_GROUP_CATEGORIES,
  undefined,
  'ui'
);
