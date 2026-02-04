import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { BadgeProps } from "./BadgeProps";
import type { BadgeTheme } from "./BadgeTheme";
import { BADGE_CATEGORIES } from "../props/categoryBuilders";
import { interactiveSubThemes } from "../theme/common/interactiveSubThemes";
import { badgeDefaults } from "./badgeDefaults";

export const defaultBadgeTheme = new ComponentTheme<BadgeProps, BadgeTheme>(
  "span",
  "vane-badge",
  interactiveSubThemes,
  badgeDefaults,
  BADGE_CATEGORIES,
  (props: BadgeProps) => props.href ? "a" : "span",
  'ui'
);
