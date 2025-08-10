import {
  BaseTypographyComponentTheme,
  ComponentTheme,
  defaultLayoutTheme,
  DefaultLayoutThemes,
  defaultTypographyTheme
} from "./common/ComponentTheme";
import { LabelProps } from "../props";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { textAppearanceClasses, textSizeClasses } from "../classes/typographyClasses";
import { WrapTheme } from "./layout/wrapTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { LABEL_CATEGORIES } from "../props";

export interface LabelTheme extends BaseTypographyComponentTheme {
  size: {
    text: SizeTheme;
    gap: GapTheme;
  };
  appearance: {
    text: AppearanceTheme;
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
      text: AppearanceTheme.createTheme({base: textAppearanceClasses}),
    },
    typography: defaultTypographyTheme,
    layout: {
      ...defaultLayoutTheme,
      wrap: new WrapTheme(),
      flexDirection: new DirectionTheme(),
    },
  },
  {
    md: true,
    flex: true,
    gap: true,
    default: true,
    sans: true,
    medium: true,
  },
  LABEL_CATEGORIES
);