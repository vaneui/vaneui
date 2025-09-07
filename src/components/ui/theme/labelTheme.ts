import {
  BaseTypographyComponentTheme,
  ComponentTheme,
  defaultLayoutTheme,
  DefaultLayoutThemes,
  defaultTypographyTheme
} from "./common/ComponentTheme";
import { LabelProps } from "../props";
import { themeDefaults } from "./defaults";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { textSizeClasses } from "../classes/typographyClasses";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { LABEL_CATEGORIES } from "../props";

export interface LabelTheme extends BaseTypographyComponentTheme {
  size: {
    text: SizeTheme;
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
  "has-[input]:cursor-pointer cursor-default",
  {
    size: {
      text: new SizeTheme(textSizeClasses),
      gap: new GapTheme({xs: 'gap-1.5', sm: 'gap-2', md: 'gap-2.5', lg: 'gap-3', xl: 'gap-3'}),
    },
    appearance: {
      text: GenericVariantTheme.createUIElementTextTheme(),
    },
    typography: defaultTypographyTheme,
    layout: {
      ...defaultLayoutTheme,
      wrap: new WrapTheme(),
      flexDirection: new DirectionTheme(),
    },
  },
  themeDefaults.label,
  LABEL_CATEGORIES
);