import {
  ComponentTheme,
  defaultLayoutsThemes,
  defaultTypographyThemes
} from "../../theme/common/ComponentTheme";
import type { TypographyProps } from "../common/TypographyProps";
import type { LinkTheme } from "./LinkTheme";
import { FontSizeTheme } from "../../theme/size/fontSizeTheme";
import { LineHeightTheme } from "../../theme/size/lineHeightTheme";
import { LinkVariantTheme } from "../../theme/appearance/linkVariantTheme";
import { TYPOGRAPHY_CATEGORIES } from "../common/TypographyCategories";
import { linkDefaults } from "./linkDefaults";

/** Link specific theme - uses LinkVariantTheme for link-specific colors */
export const defaultLinkTheme: ComponentTheme<TypographyProps, LinkTheme> = new ComponentTheme<TypographyProps, LinkTheme>(
  "a",
  "vane-link hover:underline w-fit cursor-pointer",
  {
    size: {
      text: new FontSizeTheme(),
      lineHeight: new LineHeightTheme(),
    },
    appearance: {
      text: new LinkVariantTheme(),
    },
    typography: defaultTypographyThemes,
    layout: defaultLayoutsThemes,
  },
  linkDefaults,
  TYPOGRAPHY_CATEGORIES,
  undefined,
  'ui'
);

/** Alias for backward compatibility */
export const linkTheme = defaultLinkTheme;
