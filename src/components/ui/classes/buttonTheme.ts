import { 
  SizeKey, 
  ShapeKey, 
  StyleKey, 
  TextAppearanceKey,
  FontFamilyKey,
  FontWeightKey,
  FontStyleKey,
  TextDecorationKey,
  TextTransformKey,
  TextAlignKey,
  HideKey,
  PositionKey,
  SIZE_KEYS,
  SHAPE_KEYS,
  STYLE_KEYS,
  TEXT_APPEARANCE_KEYS
} from "../props/propKeys";
import {
  pxMap,
  pyMap,
  textSizeMap,
  roundedMap,
  gapMap
} from "./buttonClasses";
import {
  backgroundAppearanceClasses,
  hoverBackgroundAppearanceClasses,
  activeBackgroundAppearanceClasses,
  ringAppearanceClasses,
  filledBackgroundAppearanceClasses,
  filledHoverBackgroundAppearanceClasses,
  filledActiveBackgroundAppearanceClasses,
  filledRingAppearanceClasses
} from "./appearanceClasses";
import {
  textAppearanceClasses,
  filledTextAppearanceClasses,
  fontFamilyClasses,
  fontWeightClasses,
  fontStyleClasses,
  textDecorationClasses,
  textTransformClasses,
  textAlignClasses
} from "./typographyClasses";
import {
  shadowClasses,
  hoverShadowClasses,
  activeShadowClasses,
  hideClasses,
  positionClasses,
  noBorderModeClasses,
  noShadowModeClasses
} from "./layoutClasses";

// Represents styles that can vary by interaction mode (base, hover, active)
export type ModeledStyles = {
    base: string;
    hover?: string;
    active?: string;
};

// The main theme structure for the Button component
export type ButtonTheme = {
    // Base structural classes applied regardless of variants
    base: string;
    // Core visual variants
    variants: {
        size: Record<SizeKey, ModeledStyles>;
        // Nested structure for style + appearance combinations
        styleAppearance: Record<StyleKey, Record<TextAppearanceKey, ModeledStyles>>;
        // Shape variants, potentially dependent on size
        shape: Record<ShapeKey, Record<SizeKey, ModeledStyles>>;
    };
    // Typography classes mapped by their keys
    typography: {
        fontFamily: Record<FontFamilyKey, string>;
        fontWeight: Record<FontWeightKey, string>;
        fontStyle: Record<FontStyleKey, string>;
        textDecoration: Record<TextDecorationKey, string>;
        textTransform: Record<TextTransformKey, string>;
        textAlign: Record<TextAlignKey, string>;
    };
    // Layout and utility classes
    layout: {
        hide: Record<HideKey, string>;
        position: Record<PositionKey, string>;
        // Specific flags like noBorder, noShadow
        flags: {
            noBorder: ModeledStyles;
            noShadow: ModeledStyles;
            // Add other boolean flag styles here if needed
        };
    };
    // Default values used when a specific boolean prop isn't provided
    defaults: {
        size: SizeKey;
        style: StyleKey;
        appearance: TextAppearanceKey;
        shape: ShapeKey;
        fontFamily: FontFamilyKey;
        fontWeight: FontWeightKey;
        // Add defaults for others if needed (e.g., null/undefined means "don't apply")
        fontStyle: FontStyleKey | null;
        textDecoration: TextDecorationKey | null;
        textTransform: TextTransformKey | null;
        textAlign: TextAlignKey | null;
        hide: HideKey | null;
        position: PositionKey | null;
    }
};

/**
 * Helper function to create size variants
 */
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

/**
 * Helper function to create shape variants
 */
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

/**
 * Helper function to create style appearance variants
 */
function makeStyleAppearanceVariant(
  baseBg: Record<TextAppearanceKey, string>,
  hoverBg: Record<TextAppearanceKey, string>,
  activeBg: Record<TextAppearanceKey, string>,
  ring: Record<TextAppearanceKey, string>,
  text: Record<TextAppearanceKey, string>,
): Record<TextAppearanceKey, ModeledStyles> {
  return TEXT_APPEARANCE_KEYS.reduce((acc, key) => {
    acc[key] = {
      base: `${baseBg[key]} ${ring[key]} ${text[key]}`,
      hover: hoverBg[key],
      active: activeBg[key],
    };
    return acc;
  }, {} as Record<TextAppearanceKey, ModeledStyles>);
}

/**
 * Default implementation of the button theme
 */
export const defaultButtonTheme: ButtonTheme = {
  base: "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap",

  variants: {
    size: makeSizeVariants(),

    styleAppearance: {
      outline: makeStyleAppearanceVariant(
        backgroundAppearanceClasses,
        hoverBackgroundAppearanceClasses,
        activeBackgroundAppearanceClasses,
        ringAppearanceClasses,
        textAppearanceClasses
      ),
      filled: makeStyleAppearanceVariant(
        filledBackgroundAppearanceClasses,
        filledHoverBackgroundAppearanceClasses,
        filledActiveBackgroundAppearanceClasses,
        filledRingAppearanceClasses,
        filledTextAppearanceClasses
      ),
    },

    shape: {
      rounded: makeShapeVariant(size => roundedMap[size]),
      pill: makeShapeVariant(() => 'rounded-full'),
      sharp: makeShapeVariant(() => 'rounded-none'),
    },
  },

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
    flags: {
      noBorder: {
        base: noBorderModeClasses.base,
        hover: noBorderModeClasses.hover,
        active: noBorderModeClasses.active,
      },
      noShadow: {
        base: noShadowModeClasses.base,
        hover: noShadowModeClasses.hover,
        active: noShadowModeClasses.active,
      },
    },
  },

  defaults: {
    size: 'md',
    style: 'outline',
    appearance: 'default',
    shape: 'rounded',
    fontFamily: 'sans',
    fontWeight: 'semibold',
    fontStyle: null,
    textDecoration: null,
    textTransform: null,
    textAlign: 'textCenter',
    hide: null,
    position: null,
  },
};

// Export the default button theme to be used with the useButtonTheme hook
// For customization, use the ThemeProvider component with a theme prop that includes button overrides
