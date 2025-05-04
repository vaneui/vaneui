import {
  FontFamilyKey,
  FontStyleKey,
  FontWeightKey,
  HideKey,
  PositionKey,
  ShapeKey,
  SIZE_KEYS,
  SizeKey,
  STYLE_KEYS,
  StyleKey,
  TEXT_APPEARANCE_KEYS,
  TextAlignKey,
  TextAppearanceKey,
  TextDecorationKey,
  TextTransformKey
} from "../props/propKeys";
import { gapMap, pxMap, pyMap, roundedMap, textSizeMap } from "../classes/buttonClasses";
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
  fontFamilyClasses,
  fontStyleClasses,
  fontWeightClasses,
  textAlignClasses,
  textAppearanceClasses,
  textDecorationClasses,
  textTransformClasses
} from "../classes/typographyClasses";
import {
  activeShadowClasses,
  borderModeClasses,
  hideClasses,
  hoverShadowClasses,
  noBorderModeClasses,
  noRingModeClasses,
  noShadowModeClasses,
  positionClasses,
  ringModeClasses,
  shadowClasses
} from "../classes/layoutClasses";
import { Mode } from "../settings/mode";

export type ModeledStyles = {
  base: string;
  hover?: string;
  active?: string;
};

export type ButtonVariantAppearance = {
  background: ModeledStyles;
  textColor: ModeledStyles;
  borderColor: ModeledStyles;
  ringColor: ModeledStyles;
};

export type ButtonTheme = {
  base: string;

  size: Record<SizeKey, ModeledStyles>;
  style: Record<StyleKey, Record<TextAppearanceKey, ButtonVariantAppearance>>;

  typography: {
    fontFamily: Record<FontFamilyKey, string>;
    fontWeight: Record<FontWeightKey, string>;
    fontStyle: Record<FontStyleKey, string>;
    textDecoration: Record<TextDecorationKey, string>;
    textTransform: Record<TextTransformKey, string>;
    textAlign: Record<TextAlignKey, string>;
  };
  layout: {
    hide: Record<HideKey, string>;
    position: Record<PositionKey, string>;
    shadow: Record<Mode, Record<SizeKey, string>>;
    border: Record<Mode, string>;
    ring: Record<Mode, string>;
    radius: Record<SizeKey, string>;
    flags: {
      noBorder: ModeledStyles;
      noShadow: ModeledStyles;
      noRing: ModeledStyles;
    };
  };
  defaults: {
    size: SizeKey;
    style: StyleKey;
    appearance: TextAppearanceKey;
    shape: ShapeKey;
    fontFamily: FontFamilyKey;
    fontWeight: FontWeightKey;
    fontStyle: FontStyleKey | undefined;
    textDecoration: TextDecorationKey | undefined;
    textTransform: TextTransformKey | undefined;
    textAlign: TextAlignKey | undefined;
    hide: HideKey | undefined;
    position: PositionKey | undefined;
    noShadow: boolean;
    noBorder: boolean;
    noRing: boolean;
  }
};

function makeSizeVariants(): Record<SizeKey, ModeledStyles> {
  return SIZE_KEYS.reduce((acc, size) => {
    acc[size] = {
      base: `${pxMap[size]} ${pyMap[size]} ${textSizeMap[size]} ${gapMap[size]}`,
      hover: '',
      active: '',
    };
    return acc;
  }, {} as Record<SizeKey, ModeledStyles>);
}

export const defaultButtonTheme: ButtonTheme = {
  base: "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap",

  size: makeSizeVariants(),

  style: STYLE_KEYS.reduce((styleAcc, styleKey) => {
    const isFilled = styleKey === 'filled';

    const bgBaseSource = isFilled ? filledBackgroundAppearanceClasses : backgroundAppearanceClasses;
    const bgHoverSource = isFilled ? filledHoverBackgroundAppearanceClasses : hoverBackgroundAppearanceClasses;
    const bgActiveSource = isFilled ? filledActiveBackgroundAppearanceClasses : activeBackgroundAppearanceClasses;
    const textBaseSource = isFilled ? filledTextAppearanceClasses : textAppearanceClasses;
    const borderBaseSource = isFilled ? filledBorderAppearanceClasses : borderAppearanceClasses;
    const ringBaseSource = isFilled ? filledRingAppearanceClasses : ringAppearanceClasses;

    styleAcc[styleKey] = TEXT_APPEARANCE_KEYS.reduce((appearanceAcc, appearanceKey) => {
      appearanceAcc[appearanceKey] = {
        background: {
          base: bgBaseSource[appearanceKey] ?? '',
          hover: bgHoverSource[appearanceKey] ?? '',
          active: bgActiveSource[appearanceKey] ?? '',
        },
        textColor: {
          base: textBaseSource[appearanceKey] ?? '',
          hover: '',
          active: '',
        },
        borderColor: {
          base: borderBaseSource[appearanceKey] ?? '',
          hover: '',
          active: '',
        },
        ringColor: {
          base: ringBaseSource[appearanceKey] ?? '',
          hover: '',
          active: '',
        }
      };
      return appearanceAcc;
    }, {} as Record<TextAppearanceKey, ButtonVariantAppearance>);

    return styleAcc;
  }, {} as Record<StyleKey, Record<TextAppearanceKey, ButtonVariantAppearance>>),


  typography: {
    fontFamily: fontFamilyClasses,
    fontWeight: fontWeightClasses,
    fontStyle: fontStyleClasses,
    textDecoration: textDecorationClasses,
    textTransform: textTransformClasses,
    textAlign: textAlignClasses,
  },

  layout: {
    hide: hideClasses,
    position: positionClasses,
    radius: roundedMap,
    shadow: {
      base: shadowClasses,
      hover: hoverShadowClasses,
      active: activeShadowClasses,
    },
    border: borderModeClasses,
    ring: ringModeClasses,
    flags: {
      noBorder: noBorderModeClasses,
      noRing: noRingModeClasses,
      noShadow: noShadowModeClasses,
    },
  },

  defaults: {
    size: 'md',
    style: 'outline',
    appearance: 'default',
    shape: 'rounded',
    fontFamily: 'sans',
    fontWeight: 'semibold',
    fontStyle: undefined,
    textDecoration: undefined,
    textTransform: undefined,
    textAlign: 'textCenter',
    hide: undefined,
    position: undefined,
    noShadow: false,
    noBorder: true,
    noRing: false,
  },
};
