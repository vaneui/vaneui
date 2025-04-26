import { JSX } from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import {
  ButtonProps,
  ButtonStyleProps,
  ShapeProps,
  SizeProps,
  TextAppearanceProps,
} from "./props/props";
import { useTheme } from '../theme';
import { Mode, MODE_KEYS } from "./settings/mode";
import { omitProps, pickFirstKey, pickFirstValue } from "../utils/componentUtils";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses,
  filledActiveBackgroundAppearanceClasses,
  filledBackgroundAppearanceClasses,
  filledHoverBackgroundAppearanceClasses, filledRingAppearanceClasses,
  hoverBackgroundAppearanceClasses, ringAppearanceClasses
} from "./classes/appearanceClasses";
import {
  filledTextAppearanceClasses,
  fontFamilyClasses, fontStyleClasses,
  fontWeightClasses,
  textAppearanceClasses,
  textDecorationClasses,
  textTransformClasses,
  textAlignClasses
} from "./classes/typographyClasses";
import {
  FLAG_KEYS,
  FONT_FAMILY_KEYS, FONT_STYLE_KEYS,
  FONT_WEIGHT_KEYS,
  SIZE_KEYS,
  STYLE_KEYS,
  TEXT_APPEARANCE_KEYS,
  TEXT_DECORATION_KEYS,
  TEXT_TRANSFORM_KEYS,
  TEXT_ALIGN_KEYS,
  PILL_KEYS,
  SHARP_KEYS,
  SHAPE_KEYS,
  HIDE_KEYS,
  POSITION_KEYS,
  BORDER_KEYS,
  SHADOW_KEYS
} from "./props/propKeys";
import {
  hideClasses,
  positionClasses,
  noShadowModeClasses,
  pillModeClasses,
  sharpModeClasses,
  roundedModeClasses,
  ringModeClasses,
  noRingModeClasses
} from "./classes/layoutClasses";


const pxClasses: Record<keyof SizeProps, string> = {xs: "px-2", sm: "px-2.5", md: "px-3.5", lg: "px-5", xl: "px-6"}
const pyClasses: Record<keyof SizeProps, string> = {xs: "py-1", sm: "py-1.5", md: "py-2", lg: "py-3", xl: "py-4"}
const gapClasses: Record<keyof SizeProps, string> = {xs: "gap-1.5", sm: "gap-2", md: "gap-3", lg: "gap-4", xl: "gap-5"}
const shadowClasses: Record<keyof SizeProps, string> = {
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl"
}
const hoverShadowClasses: Record<keyof SizeProps, string> = {
  xs: "hover:shadow-sm",
  sm: "hover:shadow-md",
  md: "hover:shadow-lg",
  lg: "hover:shadow-xl",
  xl: "hover:shadow-2xl"
}
const shadowModeClasses: Record<Mode, Record<keyof SizeProps, string>> = {
  base: shadowClasses,
  hover: hoverShadowClasses,
  active: hoverShadowClasses // Using hover shadow classes for active mode as per comment
}
const buttonTextSizeClasses: Record<keyof SizeProps, string> = {
  xs: "text-xs/5",
  sm: "text-sm/5",
  md: "text-base",
  lg: "text-lg/6",
  xl: "text-xl/6",
}
const buttonRoundedClasses: Record<keyof SizeProps, string> = {
  xs: "rounded-sm",
  sm: "rounded-md",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl"
}

export class ButtonColorsDefinition {
  bg: string = "";
  color: string = "";
  borderColor: string = "";
}

export class ButtonAppearanceDefinition {
  appearance: Record<keyof TextAppearanceProps, ButtonColorsDefinition> = {
    muted: new ButtonColorsDefinition,
    link: new ButtonColorsDefinition,
    default: new ButtonColorsDefinition,
    accent: new ButtonColorsDefinition,
    primary: new ButtonColorsDefinition,
    secondary: new ButtonColorsDefinition,
    tertiary: new ButtonColorsDefinition,
    success: new ButtonColorsDefinition,
    danger: new ButtonColorsDefinition,
    warning: new ButtonColorsDefinition,
    info: new ButtonColorsDefinition,
    transparent: new ButtonColorsDefinition
  }

  // Style and mode configuration maps
  private styleConfig: {
    [key in keyof ButtonStyleProps]: {
      [mode in Mode]: {
        bg?: Record<keyof TextAppearanceProps, string>;
        borderColor?: Record<keyof TextAppearanceProps, string>;
        color?: Record<keyof TextAppearanceProps, string>;
      }
    }
  } = {
    filled: {
      base: {
        bg: filledBackgroundAppearanceClasses,
        borderColor: filledRingAppearanceClasses,
        color: filledTextAppearanceClasses
      },
      hover: {
        bg: filledHoverBackgroundAppearanceClasses
      },
      active: {
        bg: filledActiveBackgroundAppearanceClasses
      }
    },
    outline: {
      base: {
        bg: backgroundAppearanceClasses,
        borderColor: ringAppearanceClasses,
        color: textAppearanceClasses
      },
      hover: {
        bg: hoverBackgroundAppearanceClasses
      },
      active: {
        bg: activeBackgroundAppearanceClasses
      }
    }
  };

  constructor(style: keyof ButtonStyleProps, mode: Mode) {
    const appearances = Object.keys(this.appearance) as (keyof TextAppearanceProps)[];

    // Get the configuration for the current style and mode, or use an empty object if not found
    const config = this.styleConfig[style]?.[mode] ?? {};

    appearances.forEach(appearance => {
      this.appearance[appearance].color = config.color?.[appearance] ?? "";
      this.appearance[appearance].bg = config.bg?.[appearance] ?? "";
      this.appearance[appearance].borderColor = config.borderColor?.[appearance] ?? "";
    });
  }
}

export class ButtonSizeDefinition {
  extraClasses: string = "";

  padding: { x: string; y: string };
  border: string = "";
  borderRadius: string = "";
  shadow: string = "";
  gap: string = "";
  textSize: string = "";

  // Font properties
  fontFamily: string = "";
  fontWeight: string = "";
  fontStyle: string = "";

  // Text properties
  textDecoration: string = "";
  textTransform: string = "";
  textAlign: string = "";

  constructor(size: keyof SizeProps, mode: Mode) {
    this.padding = {x: pxClasses[size], y: pyClasses[size]};
    this.gap = gapClasses[size];

    // Get shadow class based on mode from the shadowModeClasses collection
    this.shadow = shadowModeClasses[mode][size];

    this.borderRadius = buttonRoundedClasses[size];
    this.border = ringModeClasses[mode];
    this.textSize = buttonTextSizeClasses[size];

    // Font and text properties - same for all sizes
    this.fontFamily = fontFamilyClasses['sans'];
    this.fontWeight = fontWeightClasses['semibold'];
    this.fontStyle = "";
    this.textDecoration = "";
    this.textTransform = "";
    this.textAlign = textAlignClasses['textCenter'];
  }
}

export class ButtonModeDefinition {
  extraClasses: string = "";

  size: Record<keyof SizeProps, ButtonSizeDefinition>;
  style: Record<keyof ButtonStyleProps, ButtonAppearanceDefinition>;
  shape: Record<keyof ShapeProps, Record<keyof SizeProps, string>>;

  constructor(mode: Mode) {
    this.size = {
      'xs': new ButtonSizeDefinition('xs', mode),
      'sm': new ButtonSizeDefinition('sm', mode),
      'md': new ButtonSizeDefinition('md', mode),
      'lg': new ButtonSizeDefinition('lg', mode),
      'xl': new ButtonSizeDefinition('xl', mode)
    };

    this.style = {
      'outline': new ButtonAppearanceDefinition('outline', mode),
      'filled': new ButtonAppearanceDefinition('filled', mode)
    }

    this.shape = {
      'rounded': roundedModeClasses[mode],
      'pill': {
        'xs': pillModeClasses[mode],
        'sm': pillModeClasses[mode],
        'md': pillModeClasses[mode],
        'lg': pillModeClasses[mode],
        'xl': pillModeClasses[mode]
      },
      'sharp': {
        'xs': sharpModeClasses[mode],
        'sm': sharpModeClasses[mode],
        'md': sharpModeClasses[mode],
        'lg': sharpModeClasses[mode],
        'xl': sharpModeClasses[mode]
      }
    }
  }
}

export class ButtonDefinition {
  tag: string = "button";
  baseClasses: string = "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap";
  extraClasses: string = "";

  mode: Record<Mode, ButtonModeDefinition>;

  constructor() {
    this.mode = {
      'base': new ButtonModeDefinition('base'),
      'hover': new ButtonModeDefinition('hover'),
      'active': new ButtonModeDefinition('active')
    };
  }
}

export const Button2 = (props: ButtonProps): JSX.Element => {

  const size = pickFirstKey(props, SIZE_KEYS, 'md') ?? 'md';
  const style = pickFirstKey(props, STYLE_KEYS, 'outline') ?? 'outline';
  const appearance = pickFirstKey(props, TEXT_APPEARANCE_KEYS, 'default') ?? 'default';
  const shape = pickFirstKey(props, SHAPE_KEYS, 'rounded');

  //Font props
  const fontFamily = pickFirstKey(props, FONT_FAMILY_KEYS, 'sans');
  const fontWeight = pickFirstKey(props, FONT_WEIGHT_KEYS, 'semibold');
  const fontStyle = pickFirstKey(props, FONT_STYLE_KEYS);

  // Text props
  const textDecoration = pickFirstKey(props, TEXT_DECORATION_KEYS);
  const textTransform = pickFirstKey(props, TEXT_TRANSFORM_KEYS);
  const textAlign = pickFirstKey(props, TEXT_ALIGN_KEYS);

  // Layout props
  const hide = pickFirstKey(props, HIDE_KEYS);
  const position = pickFirstKey(props, POSITION_KEYS);

  const noBorder = pickFirstValue(props, BORDER_KEYS);
  const noShadow = pickFirstValue(props, SHADOW_KEYS);

  const cleanProps = omitProps(props, FLAG_KEYS);

  const buttonDefinition: ButtonDefinition = new ButtonDefinition;

  let builder = componentBuilder(cleanProps, props.tag ?? buttonDefinition.tag, buttonDefinition.baseClasses);
  MODE_KEYS.forEach(mode => builder
    .withExtraClasses(buttonDefinition.mode[mode].extraClasses)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.textSize)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.padding.x)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.padding.y)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.gap)
    .withExtraClasses(noShadow !== undefined && noShadow ? noShadowModeClasses[mode] : buttonDefinition.mode[mode].size[size]?.shadow)
    .withExtraClasses(buttonDefinition.mode[mode].shape[shape ?? 'rounded'][size])
    .withExtraClasses(noBorder !== undefined && noBorder ? noRingModeClasses[mode] : buttonDefinition.mode[mode].size[size]?.border)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.extraClasses)
    .withExtraClasses(buttonDefinition.mode[mode].style[style]?.appearance[appearance]?.bg)
    .withExtraClasses(buttonDefinition.mode[mode].style[style]?.appearance[appearance]?.borderColor)
    .withExtraClasses(buttonDefinition.mode[mode].style[style]?.appearance[appearance]?.color)
    // Apply font-related classes based on mode and size
    .withExtraClasses(fontWeight === undefined ? buttonDefinition.mode[mode].size[size].fontWeight : fontWeightClasses[fontWeight])
    .withExtraClasses(fontFamily === undefined ? buttonDefinition.mode[mode].size[size].fontFamily : fontFamilyClasses[fontFamily])
    .withExtraClasses(fontStyle === undefined ? buttonDefinition.mode[mode].size[size].fontStyle : fontStyleClasses[fontStyle])
    // Apply text formatting classes based on mode and size
    .withExtraClasses(textDecoration === undefined ? buttonDefinition.mode[mode].size[size].textDecoration : textDecorationClasses[textDecoration])
    .withExtraClasses(textTransform === undefined ? buttonDefinition.mode[mode].size[size].textTransform : textTransformClasses[textTransform])
    .withExtraClasses(textAlign === undefined ? buttonDefinition.mode[mode].size[size].textAlign : textAlignClasses[textAlign])
  );

  // Apply layout classes
  builder.withExtraClasses(hide === undefined ? '' : hideClasses[hide])
  builder.withExtraClasses(position === undefined ? '' : positionClasses[position])

  builder.withExtraClasses(buttonDefinition.extraClasses)
  return builder.build();
};
