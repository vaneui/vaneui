import { ComponentTheme, defaultLayoutClassMappers, bgAppearance, textAppearance, borderAppearance, ringAppearance } from "../theme/common";
import type { AvatarProps } from "./AvatarProps";
import type { AvatarTheme } from "./AvatarTheme";
import { BorderClassMapper, RadiusClassMapper, RingClassMapper, ShrinkClassMapper } from "../theme/layout";
import { MarginClassMapper } from "../theme/size";
import { FontWeightClassMapper } from "../theme/typography";
import { AVATAR_CATEGORIES } from "./AvatarCategories";
import { avatarDefaults } from "./avatarDefaults";
import { avatarFallbackIcon } from "./avatarFallbackIcon";

// A square box of --size (the size ramp in rules.css, 24 to 64px) clipped to its shape.
// The image covers it; initials are 40% of the size, the fallback icon 60%.
export const defaultAvatarTheme = new ComponentTheme<AvatarProps, AvatarTheme>(
  "span",
  "vane-avatar size-(--size) align-middle select-none",
  {
    fallbackElement: avatarFallbackIcon,
    size: {
      margin: new MarginClassMapper(),
    },
    appearance: {
      background: bgAppearance,
      text: textAppearance,
      border: borderAppearance,
      ring: ringAppearance,
    },
    layout: {
      ...defaultLayoutClassMappers,
      border: new BorderClassMapper(),
      ring: new RingClassMapper(),
      radius: new RadiusClassMapper(),
      shrink: new ShrinkClassMapper(),
    },
    typography: {
      fontWeight: new FontWeightClassMapper(),
    },
  },
  avatarDefaults,
  AVATAR_CATEGORIES,
  undefined,
  'ui'
);
