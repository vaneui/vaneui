import {
  ButtonStyleProps,
  ShapeProps,
  SizeProps,
  TextAppearanceProps,
} from "./props/props";
import { Mode } from "./settings/mode";
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
  fontFamilyClasses,
  fontWeightClasses,
  textAppearanceClasses,
  textAlignClasses
} from "./classes/typographyClasses";
import {
  pillModeClasses,
  sharpModeClasses,
  roundedModeClasses,
  ringModeClasses,
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
