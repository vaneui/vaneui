import { ComponentTheme, interactiveClassMappers } from "../theme/common";
import type { BadgeProps } from "./BadgeProps";
import type { BadgeTheme } from "./BadgeTheme";
import { BADGE_CATEGORIES } from "../props/categoryBuilders";
import { badgeDefaults } from "./badgeDefaults";

export const defaultBadgeTheme = new ComponentTheme<BadgeProps, BadgeTheme>(
  "span",
  "vane-badge",
  interactiveClassMappers,
  badgeDefaults,
  BADGE_CATEGORIES,
  (props: BadgeProps) => props.href ? "a" : "span",
  'ui'
);
