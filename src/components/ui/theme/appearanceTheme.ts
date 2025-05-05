import {
  STYLE_KEYS,
  StyleKey,
  TEXT_APPEARANCE_KEYS,
  TextAppearanceKey
} from "../props/propKeys";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses,
  borderAppearanceClasses,
  filledActiveBackgroundAppearanceClasses,
  filledBackgroundAppearanceClasses,
  filledBorderAppearanceClasses,
  filledHoverBackgroundAppearanceClasses,
  filledRingAppearanceClasses,
  hoverBackgroundAppearanceClasses,
  ringAppearanceClasses,
} from "../classes/appearanceClasses";
import {
  filledTextAppearanceClasses,
  textAppearanceClasses
} from "../classes/typographyClasses";
import { VariantAppearance } from "./commonTypes";

// Appearance theme structure
export type AppearanceTheme<T extends VariantAppearance> = {
  style: Record<StyleKey, Record<TextAppearanceKey, T>>;
};

// Function to create style variants
export function makeStyleVariants<T extends VariantAppearance>(
  variantFactory: (
    bgBase: string,
    bgHover: string,
    bgActive: string,
    textBase: string,
    borderBase: string,
    ringBase: string
  ) => T
): Record<StyleKey, Record<TextAppearanceKey, T>> {
  return STYLE_KEYS.reduce((styleAcc, styleKey) => {
    const isFilled = styleKey === 'filled';

    const bgBaseSource = isFilled ? filledBackgroundAppearanceClasses : backgroundAppearanceClasses;
    const bgHoverSource = isFilled ? filledHoverBackgroundAppearanceClasses : hoverBackgroundAppearanceClasses;
    const bgActiveSource = isFilled ? filledActiveBackgroundAppearanceClasses : activeBackgroundAppearanceClasses;
    const textBaseSource = isFilled ? filledTextAppearanceClasses : textAppearanceClasses;
    const borderBaseSource = isFilled ? filledBorderAppearanceClasses : borderAppearanceClasses;
    const ringBaseSource = isFilled ? filledRingAppearanceClasses : ringAppearanceClasses;

    styleAcc[styleKey] = TEXT_APPEARANCE_KEYS.reduce((appearanceAcc, appearanceKey) => {
      appearanceAcc[appearanceKey] = variantFactory(
        bgBaseSource[appearanceKey] ?? '',
        bgHoverSource[appearanceKey] ?? '',
        bgActiveSource[appearanceKey] ?? '',
        textBaseSource[appearanceKey] ?? '',
        borderBaseSource[appearanceKey] ?? '',
        ringBaseSource[appearanceKey] ?? ''
      );
      return appearanceAcc;
    }, {} as Record<TextAppearanceKey, T>);

    return styleAcc;
  }, {} as Record<StyleKey, Record<TextAppearanceKey, T>>);
}