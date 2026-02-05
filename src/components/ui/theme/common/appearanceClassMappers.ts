import { SimpleConsumerClassMapper } from "../appearance/simpleConsumerClassMapper";
import { ShadowAppearanceClassMapper } from "../appearance/shadowAppearanceClassMapper";
import {
  bgConsumerClasses,
  textConsumerClass,
  borderConsumerClass,
  ringConsumerClass,
  focusVisibleConsumerClass,
  accentConsumerClass,
  checkedBgConsumerClass
} from "../../classes/appearanceClasses";

/** Background appearance — base color only */
export const bgAppearance = new SimpleConsumerClassMapper({ base: bgConsumerClasses.base }, 'bg');

/** Background appearance — base + hover */
export const bgHoverAppearance = new SimpleConsumerClassMapper({ base: bgConsumerClasses.base, hover: bgConsumerClasses.hover }, 'bg');

/** Background appearance — base + hover + active (Button) */
export const bgActiveAppearance = new SimpleConsumerClassMapper({ base: bgConsumerClasses.base, hover: bgConsumerClasses.hover, active: bgConsumerClasses.active }, 'bg');

/** Text color appearance */
export const textAppearance = new SimpleConsumerClassMapper({ base: textConsumerClass }, 'text');

/** Border color appearance */
export const borderAppearance = new SimpleConsumerClassMapper({ base: borderConsumerClass }, 'border');

/** Ring color appearance */
export const ringAppearance = new SimpleConsumerClassMapper({ base: ringConsumerClass }, 'ring');

/** Focus-visible outline appearance */
export const focusVisibleAppearance = new SimpleConsumerClassMapper({ base: focusVisibleConsumerClass }, 'focusVisible');

/** Accent color appearance (Checkbox) */
export const accentAppearance = new SimpleConsumerClassMapper({ base: accentConsumerClass }, 'accent');

/** Checked background appearance (Checkbox) */
export const checkedBgAppearance = new SimpleConsumerClassMapper({ base: checkedBgConsumerClass }, 'bg');

/** Shadow appearance for layout components */
export const shadowLayoutAppearance = ShadowAppearanceClassMapper.createLayoutTheme();

/** Shadow appearance for UI components */
export const shadowUIAppearance = ShadowAppearanceClassMapper.createUITheme();
