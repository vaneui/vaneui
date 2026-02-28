import { ComponentTheme, defaultTypographyClassMappers, interactiveClassMappers, bgHoverAppearance } from "../theme/common";
import type { NavLinkProps } from "./NavLinkProps";
import type { NavLinkTheme } from "./NavLinkTheme";
import { NAV_LINK_CATEGORIES } from "./NavLinkCategories";
import { navLinkDefaults } from "./navLinkDefaults";

export const defaultNavLinkTheme = new ComponentTheme<NavLinkProps, NavLinkTheme>(
  "a",
  "vane-nav-link [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    ...interactiveClassMappers,
    appearance: {
      ...interactiveClassMappers.appearance,
      background: bgHoverAppearance,
    },
    typography: defaultTypographyClassMappers,
  },
  navLinkDefaults,
  NAV_LINK_CATEGORIES,
  (props: NavLinkProps) => props.href ? "a" : "button",
  'ui'
);
