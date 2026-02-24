import { ComponentTheme, defaultLayoutClassMappers } from "../../theme/common/ComponentTheme";
import type { LinkIconProps } from "./LinkIconProps";
import type { LinkIconTheme } from "./LinkIconTheme";
import { LINK_ICON_CATEGORIES } from "./LinkIconCategories";
import { linkIconDefaults } from "./linkIconDefaults";

export const defaultLinkIconTheme = new ComponentTheme<LinkIconProps, LinkIconTheme>(
  "span",
  "align-top h-[calc(var(--lh)*var(--fs))]",
  {
    layout: defaultLayoutClassMappers,
  },
  linkIconDefaults,
  LINK_ICON_CATEGORIES,
  undefined,
  'ui'
);
