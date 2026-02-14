import { ComponentTheme, defaultSizedLayoutClassMappers, defaultTypographyClassMappers, textAppearance, borderAppearance, ringAppearance, shadowLayoutAppearance } from "../theme/common";
import type { LabelProps } from "./LabelProps";
import { GapClassMapper, FontSizeClassMapper, LineHeightClassMapper } from "../theme/size";
import { BorderClassMapper, RingClassMapper, WrapClassMapper, DirectionClassMapper, CursorClassMapper } from "../theme/layout";
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
      ...defaultSizedLayoutClassMappers,
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
