import { DirectionTheme } from "../theme/layout/directionTheme";
import {
  ComponentTheme,
  defaultLayoutsThemes,
  defaultTypographyThemes
} from "../theme/common/ComponentTheme";
import { FontSizeTheme } from "../theme/size/fontSizeTheme";
import { LineHeightTheme } from "../theme/size/lineHeightTheme";
import type { InputProps } from "./InputProps";
import { GapTheme } from "../theme/size/gapTheme";
import { BorderTheme } from "../theme/layout/borderTheme";
import { RadiusTheme } from "../theme/layout/radiusTheme";
import { RingTheme } from "../theme/layout/ringTheme";
import { FocusVisibleTheme } from "../theme/layout/focusVisibleTheme";
import { CursorTheme } from "../theme/layout/cursorTheme";
import { PxTheme } from "../theme/size/pxTheme";
import { PyTheme } from "../theme/size/pyTheme";
import { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import { WrapTheme } from "../theme/layout/wrapTheme";
import { TransitionTheme } from "../theme/layout/transitionTheme";
import { WidthTheme } from "../theme/layout/widthTheme";
import { StatusTheme } from "../theme/appearance/statusTheme";
import { INPUT_CATEGORIES } from "./InputCategories";
import { bgConsumerClasses, textConsumerClass, borderConsumerClass, ringConsumerClass, focusVisibleConsumerClass } from "../classes/appearanceClasses";
import type { InputTheme } from "./InputTheme";
import { inputDefaults } from "./inputDefaults";

export const defaultInputTheme = new ComponentTheme<InputProps, InputTheme>(
  "input",
  "vane-input w-full",
  {
    size: {
      px: new PxTheme(),
      py: new PyTheme(),
      gap: new GapTheme(),
      text: new FontSizeTheme(),
      lineHeight: new LineHeightTheme(),
    },
    appearance: {
      background: new SimpleConsumerTheme({ base: bgConsumerClasses.base, hover: bgConsumerClasses.hover }, 'bg'),
      text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
      border: new SimpleConsumerTheme({ base: borderConsumerClass }, 'border'),
      ring: new SimpleConsumerTheme({ base: ringConsumerClass }, 'ring'),
      focusVisible: new SimpleConsumerTheme({ base: focusVisibleConsumerClass }, 'focusVisible'),
      shadow: ShadowAppearanceTheme.createUITheme(),
      status: new StatusTheme(),
    },
    layout: {
      ...defaultLayoutsThemes,
      border: new BorderTheme(),
      ring: new RingTheme(),
      focusVisible: new FocusVisibleTheme(),
      cursor: new CursorTheme(),
      radius: new RadiusTheme(),
      wrap: new WrapTheme(),
      flexDirection: new DirectionTheme(),
      transition: new TransitionTheme(),
      width: new WidthTheme(),
    },
    typography: defaultTypographyThemes,
  },
  inputDefaults,
  INPUT_CATEGORIES,
  () => "input",
  'ui'
);
