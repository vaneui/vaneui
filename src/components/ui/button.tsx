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
  omitProps, pickFirstKeyOptional
} from '../utils/componentUtils'; // Adjust path if needed
import { MODE_KEYS } from './settings/mode'; // Adjust path if needed
import { componentBuilder } from '../utils/componentBuilder'; // Adjust path if needed
import { useTheme } from '../theme/themeContext'; // Adjust path if needed

export function useButtonClasses(props: ButtonProps) {
  const theme = useTheme();

  const buttonTheme = theme.button;
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
    noBorder,
    noShadow,
    noRing,
  } = useMemo(() => {

    return {
      size: pickFirstKey(props, SIZE_KEYS, buttonTheme.defaults.size),
      style: pickFirstKey(props, STYLE_KEYS, buttonTheme.defaults.style),
      appearance: pickFirstKey(props, TEXT_APPEARANCE_KEYS, buttonTheme.defaults.appearance),
      shape: pickFirstKey(props, SHAPE_KEYS, buttonTheme.defaults.shape),
      fontFamily: pickFirstKey(props, FONT_FAMILY_KEYS, buttonTheme.defaults.fontFamily),
      fontWeight: pickFirstKey(props, FONT_WEIGHT_KEYS, buttonTheme.defaults.fontWeight),

      //optional props:
      fontStyle: pickFirstKeyOptional(props, FONT_STYLE_KEYS, buttonTheme.defaults.fontStyle),
      textDecoration: pickFirstKeyOptional(props, TEXT_DECORATION_KEYS, buttonTheme.defaults.textDecoration),
      textTransform: pickFirstKeyOptional(props, TEXT_TRANSFORM_KEYS, buttonTheme.defaults.textTransform),
      textAlign: pickFirstKeyOptional(props, TEXT_ALIGN_KEYS, buttonTheme.defaults.textAlign),
      hide: pickFirstKeyOptional(props, HIDE_KEYS, buttonTheme.defaults.hide),
      position: pickFirstKeyOptional(props, POSITION_KEYS, buttonTheme.defaults.position),

      // Assign prop value if present, otherwise use theme default boolean
      noBorder: props.noBorder ?? buttonTheme.defaults.noBorder,
      noShadow: props.noShadow ?? buttonTheme.defaults.noShadow,
      noRing: props.noRing ?? buttonTheme.defaults.noRing,
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
    modeClasses.push(...[
      sizeVariant?.[mode] ?? '',

      // Appearance classes
      appearanceVariant?.background?.[mode] ?? '',
      appearanceVariant?.textColor?.[mode] ?? '',

      // Border/Ring/Shadow handled conditionally below

      noRing
        ? buttonTheme.layout.flags.noRing[mode] ?? ''
        : `${buttonTheme.layout.ring[mode] ?? ''} ${appearanceVariant?.ringColor?.[mode] ?? ''}`,

      noBorder
        ? buttonTheme.layout.flags.noBorder[mode] ?? ''
        : `${buttonTheme.layout.border[mode] ?? ''} ${appearanceVariant?.borderColor?.[mode] ?? ''}`,

      noShadow
        ? buttonTheme.layout.flags.noShadow[mode] ?? ''
        : buttonTheme.layout.shadow[mode]?.[size] ?? '',
    ]);
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