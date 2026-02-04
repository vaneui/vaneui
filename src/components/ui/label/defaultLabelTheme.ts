import {
  ComponentTheme,
  defaultLayoutsThemes,
  defaultTypographyThemes
} from "../theme/common/ComponentTheme";
import type { LabelProps } from "./LabelProps";
import { GapTheme } from "../theme/size/gapTheme";
import { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import { FontSizeTheme } from "../theme/size/fontSizeTheme";
import { LineHeightTheme } from "../theme/size/lineHeightTheme";
import { BorderTheme } from "../theme/layout/borderTheme";
import { RingTheme } from "../theme/layout/ringTheme";
import { WrapTheme } from "../theme/layout/wrapTheme";
import { DirectionTheme } from "../theme/layout/directionTheme";
import { CursorTheme } from "../theme/layout/cursorTheme";
import { LABEL_CATEGORIES } from "./LabelCategories";
import { textConsumerClass, borderConsumerClass, ringConsumerClass } from "../classes/appearanceClasses";
import type { LabelTheme } from "./LabelTheme";
import { labelDefaults } from "./labelDefaults";

export const defaultLabelTheme = new ComponentTheme<LabelProps, LabelTheme>(
  "label",
  "vane-label has-[input]:cursor-pointer",
  {
    size: {
      text: new FontSizeTheme(),
      lineHeight: new LineHeightTheme(),
      gap: new GapTheme(),
    },
    appearance: {
      text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
      border: new SimpleConsumerTheme({ base: borderConsumerClass }, 'border'),
      ring: new SimpleConsumerTheme({ base: ringConsumerClass }, 'ring'),
      shadow: ShadowAppearanceTheme.createLayoutTheme(),
    },
    typography: defaultTypographyThemes,
    layout: {
      ...defaultLayoutsThemes,
      border: new BorderTheme(),
      ring: new RingTheme(),
      wrap: new WrapTheme(),
      flexDirection: new DirectionTheme(),
      cursor: new CursorTheme(),
    },
  },
  labelDefaults,
  LABEL_CATEGORIES,
  undefined,
  'ui'
);
