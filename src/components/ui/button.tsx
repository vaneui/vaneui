import { JSX, useMemo } from 'react';
import {
  ButtonProps
} from './props/props'; // Adjust path if needed
import {
  SIZE_KEYS,
  STYLE_KEYS,
  TEXT_APPEARANCE_KEYS,
  FONT_FAMILY_KEYS,
  FONT_WEIGHT_KEYS,
  FONT_STYLE_KEYS,
  TEXT_DECORATION_KEYS,
  TEXT_TRANSFORM_KEYS,
  TEXT_ALIGN_KEYS,
  SHAPE_KEYS,
  HIDE_KEYS,
  POSITION_KEYS,
  FLAG_KEYS,
} from './props/propKeys'; // Adjust path if needed
import {
  pickFirstKey,
  omitProps
} from '../utils/componentUtils'; // Adjust path if needed
import { MODE_KEYS } from './settings/mode'; // Adjust path if needed
import { componentBuilder } from '../utils/componentBuilder'; // Adjust path if needed
import { useButtonTheme } from '../theme/themeContext'; // Adjust path if needed

export function useButtonClasses(props: ButtonProps) {
  const buttonTheme = useButtonTheme();

  // Extract props using defaults from buttonTheme
  const {
    size,
    style,
    appearance,
    shape,
    fontFamily,
    fontWeight,
    fontStyle,
    textDecoration,
    textTransform,
    textAlign,
    hide,
    position,
    noBorder = buttonTheme.defaults.noBorder, // Apply default immediately
    noShadow = buttonTheme.defaults.noShadow,
    noRing = buttonTheme.defaults.noRing
  } = useMemo(() => {
    const defaultSize = buttonTheme.defaults.size;
    const defaultStyle = buttonTheme.defaults.style;
    const defaultAppearance = buttonTheme.defaults.appearance;
    const defaultShape = buttonTheme.defaults.shape;
    const defaultFontFamily = buttonTheme.defaults.fontFamily;
    const defaultFontWeight = buttonTheme.defaults.fontWeight;

    return {
      size: pickFirstKey(props, SIZE_KEYS, defaultSize) ?? defaultSize,
      style: pickFirstKey(props, STYLE_KEYS, defaultStyle) ?? defaultStyle,
      appearance: pickFirstKey(props, TEXT_APPEARANCE_KEYS, defaultAppearance) ?? defaultAppearance,
      shape: pickFirstKey(props, SHAPE_KEYS, defaultShape) ?? defaultShape,
      fontFamily: pickFirstKey(props, FONT_FAMILY_KEYS, defaultFontFamily),
      fontWeight: pickFirstKey(props, FONT_WEIGHT_KEYS, defaultFontWeight),
      fontStyle: pickFirstKey(props, FONT_STYLE_KEYS, buttonTheme.defaults.fontStyle),
      textDecoration: pickFirstKey(props, TEXT_DECORATION_KEYS, buttonTheme.defaults.textDecoration),
      textTransform: pickFirstKey(props, TEXT_TRANSFORM_KEYS, buttonTheme.defaults.textTransform),
      textAlign: pickFirstKey(props, TEXT_ALIGN_KEYS, buttonTheme.defaults.textAlign),
      hide: pickFirstKey(props, HIDE_KEYS, buttonTheme.defaults.hide),
      position: pickFirstKey(props, POSITION_KEYS, buttonTheme.defaults.position),
      // Assign prop value if present, otherwise use theme default boolean
      noBorder: props.noBorder === undefined ? buttonTheme.defaults.noBorder : props.noBorder,
      noShadow: props.noShadow === undefined ? buttonTheme.defaults.noShadow : props.noShadow,
      noRing: props.noRing === undefined ? buttonTheme.defaults.noRing : props.noRing,
    };
  }, [props, buttonTheme]);

  // strip all the boolean flags
  const cleanProps = omitProps(props, FLAG_KEYS);

  // --- Get variants/styles from the FLATTENED buttonTheme structure ---
  const sizeVariant = buttonTheme.size[size]; // Direct access
  const shapeClass = shape === 'rounded' ? buttonTheme.layout.radius[size] : shape === 'pill' ? 'rounded-full' : shape === 'sharp' ? 'rounded-none' : buttonTheme.layout.radius[size]; // Direct access
  const appearanceVariant = buttonTheme.style[style]?.[appearance]; // Direct access

  // Define the base tag and classes
  const tag = props.tag ?? "button";
  const baseThemeClasses = buttonTheme.base;

  // Base classes related to typography/layout props
  // (These don't have hover/active states directly tied to them in the theme)
  const baseClasses = [
    baseThemeClasses,
    shapeClass,
    fontWeight ? buttonTheme.typography.fontWeight[fontWeight] : '',
    fontFamily ? buttonTheme.typography.fontFamily[fontFamily] : '',
    fontStyle ? buttonTheme.typography.fontStyle[fontStyle] : '',
    textDecoration ? buttonTheme.typography.textDecoration[textDecoration] : '',
    textTransform ? buttonTheme.typography.textTransform[textTransform] : '',
    textAlign ? buttonTheme.typography.textAlign[textAlign] : '',
    hide ? buttonTheme.layout.hide[hide] : '',
    position ? buttonTheme.layout.position[position] : '',
  ];

  // Array to hold all mode-specific classes (base variant, hover, active)
  const modeClasses: string[] = [];

  MODE_KEYS.forEach(mode => {
    // Get the appearance properties for the current mode
    const backgroundClass = appearanceVariant?.background?.[mode] ?? '';
    const textColorClass = appearanceVariant?.textColor?.[mode] ?? '';
    const borderColorClass = appearanceVariant?.borderColor?.[mode] ?? '';
    const ringColorClass = appearanceVariant?.ringColor?.[mode] ?? '';

    // Get the base utility classes for border/ring for the current mode
    const borderUtilityClass = buttonTheme.layout.border[mode] ?? '';
    const ringUtilityClass = buttonTheme.layout.ring[mode] ?? '';

    // Get the flag override classes for the current mode
    const noBorderClass = buttonTheme.layout.flags.noBorder[mode] ?? '';
    const noRingClass = buttonTheme.layout.flags.noRing[mode] ?? '';
    const noShadowClass = buttonTheme.layout.flags.noShadow[mode] ?? '';

    // Get the default shadow class for the current mode and size
    const defaultShadowClass = buttonTheme.layout.shadow[mode]?.[size] ?? '';

    // Combine utility + color manually for border and ring when enabled
    // Use .trim() to avoid extra spaces if one part is empty
    const combinedBorderClass = `${borderUtilityClass} ${borderColorClass}`.trim();
    const combinedRingClass = `${ringUtilityClass} ${ringColorClass}`.trim();

    // Build the array of classes for the current mode
    const currentModeClasses = [
      sizeVariant?.[mode] ?? '',

      // Appearance classes
      backgroundClass,
      textColorClass,
      // Border/Ring/Shadow handled conditionally below

      // Conditional Ring: Use noRing class OR combined ring utility+color
      noRing ? noRingClass : combinedRingClass,

      // Conditional Border: Use noBorder class OR combined border utility+color
      noBorder ? noBorderClass : combinedBorderClass,

      // Conditional Shadow: Use noShadow class OR default shadow for size/mode
      noShadow ? noShadowClass : defaultShadowClass,
    ];

    // Add the classes for this mode to the flattened modeClasses array
    modeClasses.push(...currentModeClasses);
  });

  // Return the same structure as before (arrays)
  return { cleanProps, tag, baseClasses: baseClasses, modeClasses: modeClasses };
}

// --- Button Component (Unchanged from your last version) ---
export const Button = (props: ButtonProps): JSX.Element => {
  const {cleanProps, tag, baseClasses, modeClasses} = useButtonClasses(props);

  // Still relies on componentBuilder to handle the flattened array
  // containing base styles and all mode styles (including empty strings).
  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};