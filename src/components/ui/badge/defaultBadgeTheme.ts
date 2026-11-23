import { ComponentTheme, interactiveClassMappers } from "../theme/common";
import type { BadgeProps } from "./BadgeProps";
import type { BadgeTheme } from "./BadgeTheme";
import { BADGE_CATEGORIES } from "../props/categoryBuilders";
import { badgeDefaults } from "./badgeDefaults";
import { DotClassMapper } from "../theme/layout";

export const defaultBadgeTheme = new ComponentTheme<BadgeProps, BadgeTheme>(
  "span",
  "vane-badge [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    ...interactiveClassMappers,
    layout: {
      ...interactiveClassMappers.layout,
      dot: new DotClassMapper(),
    },
  },
  badgeDefaults,
  BADGE_CATEGORIES,
  (props: BadgeProps) => props.href ? "a" : "span",
  'ui'
);
