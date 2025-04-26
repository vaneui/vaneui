import { JSX } from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import {
  ButtonProps,
  ButtonStyleProps,
  SizeProps,
  TextAppearanceProps,
} from "./props/props";
import { useTheme } from '../theme';
import { Mode } from "./settings/mode";
import { omitProps, pickFirst } from "../utils/componentUtils";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses,
  borderAppearanceClasses,
  filledActiveBackgroundAppearanceClasses,
  filledBackgroundAppearanceClasses,
  filledBorderAppearanceClasses,
  filledHoverBackgroundAppearanceClasses,
  hoverBackgroundAppearanceClasses
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
  HIDE_KEYS,
  POSITION_KEYS,
  BORDER_KEYS,
  SHADOW_KEYS
} from "./props/propKeys";
import {
  pillClasses,
  sharpClasses,
  hideClasses,
  positionClasses,
  noBorderModeClasses,
  noShadowClasses
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
        borderColor: filledBorderAppearanceClasses,
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
        borderColor: borderAppearanceClasses,
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
  borderRadius: string = "";
  shadow: string = "";
  gap: string = "";
  textSize: string = "";

  constructor(size: keyof SizeProps) {
    this.padding = {x: pxClasses[size], y: pyClasses[size]};
    this.gap = gapClasses[size];
    this.shadow = shadowClasses[size];
    this.borderRadius = buttonRoundedClasses[size];
    this.textSize = buttonTextSizeClasses[size];
  }
}

export class ButtonModeDefinition {
  extraClasses: string = "";

  size: Record<keyof SizeProps, ButtonSizeDefinition> = {
    xs: new ButtonSizeDefinition('xs'),
    sm: new ButtonSizeDefinition('sm'),
    md: new ButtonSizeDefinition('md'),
    lg: new ButtonSizeDefinition('lg'),
    xl: new ButtonSizeDefinition('xl'),
  }

  style: Record<keyof ButtonStyleProps, ButtonAppearanceDefinition>;

  constructor(mode: Mode) {
    this.style = {
      outline: new ButtonAppearanceDefinition('outline', mode),
      filled: new ButtonAppearanceDefinition('filled', mode),
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
      base: new ButtonModeDefinition('base'),
      hover: new ButtonModeDefinition('hover'),
      active: new ButtonModeDefinition('active'),
    };
  }
}

export const Button2 = (props: ButtonProps): JSX.Element => {

  const size = pickFirst(props, SIZE_KEYS, 'md') ?? 'md';
  const style = pickFirst(props, STYLE_KEYS, 'outline') ?? 'outline';
  const appearance = pickFirst(props, TEXT_APPEARANCE_KEYS, 'default') ?? 'default';

  //Font props
  const fontFamily = pickFirst(props, FONT_FAMILY_KEYS, 'sans');
  const fontWeight = pickFirst(props, FONT_WEIGHT_KEYS, 'semibold');
  const fontStyle = pickFirst(props, FONT_STYLE_KEYS);

  // Text props
  const textDecoration = pickFirst(props, TEXT_DECORATION_KEYS);
  const textTransform = pickFirst(props, TEXT_TRANSFORM_KEYS);
  const textAlign = pickFirst(props, TEXT_ALIGN_KEYS);

  // Layout props
  const pill = pickFirst(props, PILL_KEYS);
  const sharp = pickFirst(props, SHARP_KEYS);
  const hide = pickFirst(props, HIDE_KEYS);
  const position = pickFirst(props, POSITION_KEYS);
  const noBorder = pickFirst(props, BORDER_KEYS);
  const noShadow = pickFirst(props, SHADOW_KEYS);

  const cleanProps = omitProps(props, FLAG_KEYS);

  const buttonDefinition: ButtonDefinition = new ButtonDefinition;

  let builder = componentBuilder(cleanProps, props.tag ?? buttonDefinition.tag, buttonDefinition.baseClasses);
  const modes: Mode[] = ['base', 'hover', 'active']
  modes.forEach(mode => builder
    .withExtraClasses(buttonDefinition.mode[mode].extraClasses)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.textSize)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.padding.x)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.padding.y)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.gap)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.shadow)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.borderRadius)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.extraClasses)
    .withExtraClasses(buttonDefinition.mode[mode].style[style]?.appearance[appearance]?.bg)
    .withExtraClasses(buttonDefinition.mode[mode].style[style]?.appearance[appearance]?.borderColor)
    .withExtraClasses(buttonDefinition.mode[mode].style[style]?.appearance[appearance]?.color)
  );
  // Apply font-related classes
  builder.withExtraClasses(fontWeight === undefined ? '' : fontWeightClasses[fontWeight])
  builder.withExtraClasses(fontFamily === undefined ? '' : fontFamilyClasses[fontFamily])
  builder.withExtraClasses(fontStyle === undefined ? '' : fontStyleClasses[fontStyle])

  // Apply text formatting classes
  builder.withExtraClasses(textDecoration === undefined ? '' : textDecorationClasses[textDecoration])
  builder.withExtraClasses(textTransform === undefined ? '' : textTransformClasses[textTransform])
  builder.withExtraClasses(textAlign === undefined ? '' : textAlignClasses[textAlign])

  // Apply layout classes
  builder.withExtraClasses(pill === undefined ? '' : pillClasses[pill])
  builder.withExtraClasses(sharp === undefined ? '' : sharpClasses[sharp])
  builder.withExtraClasses(hide === undefined ? '' : hideClasses[hide])
  builder.withExtraClasses(position === undefined ? '' : positionClasses[position])
  builder.withExtraClasses(noBorder === undefined ? '' : noBorderModeClasses.base)
  builder.withExtraClasses(noShadow === undefined ? '' : noShadowClasses[noShadow])

  builder.withExtraClasses(buttonDefinition.extraClasses)
  return builder.build();
};
