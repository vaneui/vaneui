import {
  ComponentTheme,
  defaultSizedLayoutClassMappers,
  defaultTypographyClassMappers
} from "../../theme/common/ComponentTheme";
import type { TypographyProps } from "../common";
import type { LinkTheme } from "./LinkTheme";
import { FontSizeClassMapper } from "../../theme/size/fontSizeClassMapper";
import { LineHeightClassMapper } from "../../theme/size/lineHeightClassMapper";
import { LinkVariantClassMapper } from "../../theme/appearance/linkVariantClassMapper";
import { TYPOGRAPHY_CATEGORIES } from "../common";
import { linkDefaults } from "./linkDefaults";

/** Link specific theme - uses LinkVariantClassMapper for link-specific colors */
export const defaultLinkTheme: ComponentTheme<TypographyProps, LinkTheme> = new ComponentTheme<TypographyProps, LinkTheme>(
  "a",
  "vane-link hover:underline w-fit cursor-pointer",
  {
    size: {
      text: new FontSizeClassMapper(),
      lineHeight: new LineHeightClassMapper(),
    },
    appearance: {
      text: new LinkVariantClassMapper(),
    },
    typography: defaultTypographyClassMappers,
    layout: defaultSizedLayoutClassMappers,
  },
  linkDefaults,
  TYPOGRAPHY_CATEGORIES,
  undefined,
  'ui'
);

/** Alias for backward compatibility */
export const linkTheme = defaultLinkTheme;
