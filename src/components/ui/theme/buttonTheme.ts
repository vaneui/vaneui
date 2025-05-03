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
} from "../props/propKeys"; // Adjust path if needed
import { gapMap, pxMap, pyMap, roundedMap, textSizeMap } from "../classes/buttonClasses"; // Adjust path if needed
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
} from "../classes/appearanceClasses"; // Adjust path if needed
import {
  filledTextAppearanceClasses,
  fontFamilyClasses,
  fontStyleClasses,
  fontWeightClasses,
  textAlignClasses,
  textAppearanceClasses,
  textDecorationClasses,
  textTransformClasses
} from "../classes/typographyClasses"; // Adjust path if needed
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
} from "../classes/layoutClasses"; // Adjust path if needed
import { Mode } from "../settings/mode"; // Adjust path if needed

// Represents styles that can vary by interaction mode (base, hover, active)
export type ModeledStyles = {
  base: string;
  hover?: string;
  active?: string;
};

// Helper type for the bundle of properties defining a specific style+appearance
export type ButtonVariantAppearance = {
  background: ModeledStyles;
  textColor: ModeledStyles;
  borderColor: ModeledStyles;
  ringColor: ModeledStyles;
  // Add other properties here if they depend on style+appearance
};

export type ButtonTheme = {
  // Base structural classes applied regardless of variants
  base: string;

  // --- Variants moved to top level ---
  size: Record<SizeKey, ModeledStyles>;
  shape: Record<ShapeKey, Record<SizeKey, ModeledStyles>>;
  style: Record<StyleKey, Record<TextAppearanceKey, ButtonVariantAppearance>>;

  // --- Other top-level categories ---
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
    border: Record<Mode, string>; // Base border utility classes by mode
    ring: Record<Mode, string>;   // Base ring utility classes by mode
    flags: {
      noBorder: ModeledStyles; // Classes to apply when noBorder=true
      noShadow: ModeledStyles;
      noRing: ModeledStyles;   // Classes to apply when noRing=true
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

// Size variant helper
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
// Shape variant helper
function makeShapeVariant(baseClassFn: (size: SizeKey) => string): Record<SizeKey, ModeledStyles> {
  return SIZE_KEYS.reduce((acc, size) => {
    acc[size] = {
      base: baseClassFn(size),
      hover: '',
      active: '',
    };
    return acc;
  }, {} as Record<SizeKey, ModeledStyles>);
}

export const defaultButtonTheme: ButtonTheme = {
  base: "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap",

  size: makeSizeVariants(),

  shape: {
    rounded: makeShapeVariant(size => roundedMap[size]),
    pill: makeShapeVariant(() => 'rounded-full'),
    sharp: makeShapeVariant(() => 'rounded-none'),
  },

  // Use nested reduce to build the style object correctly
  style: STYLE_KEYS.reduce((styleAcc, styleKey) => {
    const isFilled = styleKey === 'filled';

    // Determine source objects based on styleKey (same as before)
    const bgBaseSource = isFilled ? filledBackgroundAppearanceClasses : backgroundAppearanceClasses;
    const bgHoverSource = isFilled ? filledHoverBackgroundAppearanceClasses : hoverBackgroundAppearanceClasses;
    const bgActiveSource = isFilled ? filledActiveBackgroundAppearanceClasses : activeBackgroundAppearanceClasses;
    const textBaseSource = isFilled ? filledTextAppearanceClasses : textAppearanceClasses;
    const borderBaseSource = isFilled ? filledBorderAppearanceClasses : borderAppearanceClasses; // Assumes these exist
    const ringBaseSource = isFilled ? filledRingAppearanceClasses : ringAppearanceClasses;

    // Use reduce to build the inner Record<TextAppearanceKey, ButtonVariantAppearance>
     // Initial value for the INNER reduce
    // Assign the fully constructed inner object (appearanceMap) to the outer accumulator
    styleAcc[styleKey] = TEXT_APPEARANCE_KEYS.reduce((appearanceAcc, appearanceKey) => {
      // Construct the ButtonVariantAppearance object for this specific style+appearance
      appearanceAcc[appearanceKey] = {
        background: {
          base: bgBaseSource[appearanceKey] ?? '',
          hover: bgHoverSource[appearanceKey] ?? '',
          active: bgActiveSource[appearanceKey] ?? '',
        },
        textColor: {
          base: textBaseSource[appearanceKey] ?? '',
          hover: '', // Add sources if they exist
          active: '',
        },
        borderColor: {
          base: borderBaseSource[appearanceKey] ?? '',
          hover: '', // Add sources if they exist
          active: '',
        },
        ringColor: {
          base: ringBaseSource[appearanceKey] ?? '',
          hover: '', // Add sources if they exist
          active: '',
        }
      };
      return appearanceAcc;
    }, {} as Record<TextAppearanceKey, ButtonVariantAppearance>);

    return styleAcc;
    // Type the initial value for the OUTER reduce correctly
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
