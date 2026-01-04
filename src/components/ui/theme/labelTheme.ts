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
import { SimpleConsumerTheme } from "./appearance/simpleConsumerTheme";
import { FontSizeTheme } from "./size/fontSizeTheme";
import { LineHeightTheme } from "./size/lineHeightTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { LABEL_CATEGORIES } from "../props";
import { textConsumerClass } from "../classes/appearanceClasses";

export interface LabelTheme extends BaseTypographyComponentTheme {
  size: {
    text: FontSizeTheme;
    lineHeight: LineHeightTheme;
    gap: GapTheme;
  };
  appearance: {
    text: SimpleConsumerTheme;
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
      text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
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