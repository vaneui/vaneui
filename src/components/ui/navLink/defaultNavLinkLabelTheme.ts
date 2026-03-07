import { ComponentTheme, defaultTypographyClassMappers } from "../theme/common";
import type { NavLinkLabelProps } from "./NavLinkLabelProps";
import type { NavLinkLabelTheme } from "./NavLinkLabelTheme";
import { NAV_LINK_LABEL_CATEGORIES } from "./NavLinkLabelCategories";
import { navLinkLabelDefaults } from "./navLinkLabelDefaults";
import { WidthClassMapper } from "../theme/layout/widthClassMapper";
import { OverflowClassMapper } from "../theme/layout/overflowClassMapper";
import { WhitespaceClassMapper } from "../theme/layout/whitespaceClassMapper";

export const defaultNavLinkLabelTheme = new ComponentTheme<NavLinkLabelProps, NavLinkLabelTheme>(
  "span",
  "vane-nav-link-label min-w-0",
  {
    layout: {
      overflow: new OverflowClassMapper(),
      whitespace: new WhitespaceClassMapper(),
      width: new WidthClassMapper(),
    },
    typography: {
      truncate: defaultTypographyClassMappers.truncate,
    },
  },
  navLinkLabelDefaults,
  NAV_LINK_LABEL_CATEGORIES,
  undefined,
  'ui'
);
