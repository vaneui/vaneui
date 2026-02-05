import {
  ComponentTheme,
  defaultLayoutClassMappers,
  defaultTypographyClassMappers
} from "../theme/common/ComponentTheme";
import type { LabelProps } from "./LabelProps";
import { GapClassMapper } from "../theme/size/gapClassMapper";
import { FontSizeClassMapper } from "../theme/size/fontSizeClassMapper";
import { LineHeightClassMapper } from "../theme/size/lineHeightClassMapper";
import { BorderClassMapper } from "../theme/layout/borderClassMapper";
import { RingClassMapper } from "../theme/layout/ringClassMapper";
import { WrapClassMapper } from "../theme/layout/wrapClassMapper";
import { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import { CursorClassMapper } from "../theme/layout/cursorClassMapper";
import { textAppearance, borderAppearance, ringAppearance, shadowLayoutAppearance } from "../theme/common/appearanceClassMappers";
import { LABEL_CATEGORIES } from "./LabelCategories";
import type { LabelTheme } from "./LabelTheme";
import { labelDefaults } from "./labelDefaults";

export const defaultLabelTheme = new ComponentTheme<LabelProps, LabelTheme>(
  "label",
  "vane-label has-[input]:cursor-pointer",
  {
    size: {
      text: new FontSizeClassMapper(),
      lineHeight: new LineHeightClassMapper(),
      gap: new GapClassMapper(),
    },
    appearance: {
      text: textAppearance,
      border: borderAppearance,
      ring: ringAppearance,
      shadow: shadowLayoutAppearance,
    },
    typography: defaultTypographyClassMappers,
    layout: {
      ...defaultLayoutClassMappers,
      border: new BorderClassMapper(),
      ring: new RingClassMapper(),
      wrap: new WrapClassMapper(),
      flexDirection: new DirectionClassMapper(),
      cursor: new CursorClassMapper(),
    },
  },
  labelDefaults,
  LABEL_CATEGORIES,
  undefined,
  'ui'
);
