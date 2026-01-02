import {
  BaseTypographyComponentTheme,
  ComponentTheme,
  defaultLayoutsThemes,
  DefaultLayoutThemes,
  defaultTypographyThemes
} from "./common/ComponentTheme";
import type { LabelProps } from "../label";
import { themeDefaults } from "./defaults";
import { GapTheme } from "./size/gapTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { FontSizeTheme } from "./size/fontSizeTheme";
import { LineHeightTheme } from "./size/lineHeightTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { LABEL_CATEGORIES } from "../props";

export interface LabelTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeTheme;
    lineHeight: LineHeightTheme;
    gap: GapTheme;
  };
  appearance: {
    text: GenericVariantTheme<AppearanceTheme>;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
    flexDirection: DirectionTheme;
  };
}

export const defaultLabelTheme = new ComponentTheme<LabelProps, LabelTheme>(
  "label",
  "vane-label has-[input]:cursor-pointer cursor-default",
  {
    size: {
      text: new FontSizeTheme(),
      lineHeight: new LineHeightTheme(),
      gap: new GapTheme(),
    },
    appearance: {
      text: GenericVariantTheme.createTypographyTextTheme(),
    },
    typography: defaultTypographyThemes,
    layout: {
      ...defaultLayoutsThemes,
      wrap: new WrapTheme(),
      flexDirection: new DirectionTheme(),
    },
  },
  themeDefaults.label,
  LABEL_CATEGORIES
);