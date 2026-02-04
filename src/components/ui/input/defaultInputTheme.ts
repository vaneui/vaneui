import { DirectionClassMapper } from "../theme/layout/directionClassMapper";
import {
  ComponentTheme,
  defaultLayoutsThemes,
  defaultTypographyThemes
} from "../theme/common/ComponentTheme";
import { FontSizeClassMapper } from "../theme/size/fontSizeClassMapper";
import { LineHeightClassMapper } from "../theme/size/lineHeightClassMapper";
import type { InputProps } from "./InputProps";
import { GapClassMapper } from "../theme/size/gapClassMapper";
import { BorderClassMapper } from "../theme/layout/borderClassMapper";
import { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import { RingClassMapper } from "../theme/layout/ringClassMapper";
import { FocusVisibleClassMapper } from "../theme/layout/focusVisibleClassMapper";
import { CursorClassMapper } from "../theme/layout/cursorClassMapper";
import { PxClassMapper } from "../theme/size/pxClassMapper";
import { PyClassMapper } from "../theme/size/pyClassMapper";
import { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
import { WrapClassMapper } from "../theme/layout/wrapClassMapper";
import { TransitionClassMapper } from "../theme/layout/transitionClassMapper";
import { WidthClassMapper } from "../theme/layout/widthClassMapper";
import { StatusClassMapper } from "../theme/appearance/statusClassMapper";
import { INPUT_CATEGORIES } from "./InputCategories";
import { bgConsumerClasses, textConsumerClass, borderConsumerClass, ringConsumerClass, focusVisibleConsumerClass } from "../classes/appearanceClasses";
import type { InputTheme } from "./InputTheme";
import { inputDefaults } from "./inputDefaults";

export const defaultInputTheme = new ComponentTheme<InputProps, InputTheme>(
  "input",
  "vane-input w-full",
  {
    size: {
      px: new PxClassMapper(),
      py: new PyClassMapper(),
      gap: new GapClassMapper(),
      text: new FontSizeClassMapper(),
      lineHeight: new LineHeightClassMapper(),
    },
    appearance: {
      background: new SimpleConsumerClassMapper({ base: bgConsumerClasses.base, hover: bgConsumerClasses.hover }, 'bg'),
      text: new SimpleConsumerClassMapper({ base: textConsumerClass }, 'text'),
      border: new SimpleConsumerClassMapper({ base: borderConsumerClass }, 'border'),
      ring: new SimpleConsumerClassMapper({ base: ringConsumerClass }, 'ring'),
      focusVisible: new SimpleConsumerClassMapper({ base: focusVisibleConsumerClass }, 'focusVisible'),
      shadow: ShadowAppearanceClassMapper.createUITheme(),
      status: new StatusClassMapper(),
    },
    layout: {
      ...defaultLayoutsThemes,
      border: new BorderClassMapper(),
      ring: new RingClassMapper(),
      focusVisible: new FocusVisibleClassMapper(),
      cursor: new CursorClassMapper(),
      radius: new RadiusClassMapper(),
      wrap: new WrapClassMapper(),
      flexDirection: new DirectionClassMapper(),
      transition: new TransitionClassMapper(),
      width: new WidthClassMapper(),
    },
    typography: defaultTypographyThemes,
  },
  inputDefaults,
  INPUT_CATEGORIES,
  () => "input",
  'ui'
);
