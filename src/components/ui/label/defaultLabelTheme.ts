import {
  ComponentTheme,
  defaultLayoutsThemes,
  defaultTypographyThemes
} from "../theme/common/ComponentTheme";
import type { LabelProps } from "./LabelProps";
import { GapClassMapper } from "../theme/size/gapClassMapper";
import { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
import { FontSizeClassMapper } from "../theme/size/fontSizeClassMapper";
import { LineHeightClassMapper } from "../theme/size/lineHeightClassMapper";
import { BorderClassMapper } from "../theme/layout/borderClassMapper";
import { RingClassMapper } from "../theme/layout/ringClassMapper";
import { WrapClassMapper } from "../theme/layout/wrapClassMapper";
import { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import { CursorClassMapper } from "../theme/layout/cursorClassMapper";
import { LABEL_CATEGORIES } from "./LabelCategories";
import { textConsumerClass, borderConsumerClass, ringConsumerClass } from "../classes/appearanceClasses";
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
      text: new SimpleConsumerClassMapper({ base: textConsumerClass }, 'text'),
      border: new SimpleConsumerClassMapper({ base: borderConsumerClass }, 'border'),
      ring: new SimpleConsumerClassMapper({ base: ringConsumerClass }, 'ring'),
      shadow: ShadowAppearanceClassMapper.createLayoutTheme(),
    },
    typography: defaultTypographyThemes,
    layout: {
      ...defaultLayoutsThemes,
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
