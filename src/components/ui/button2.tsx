import { JSX } from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import { ButtonProps, ButtonStyleProps, SizeProps, TextAppearanceProps } from "./props/props";
import { useTheme } from '../theme';
import { Mode } from "./settings/mode";
import { getFirstTruthyKey } from "../utils/getFirstTruthyKey";


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

  style: Record<keyof ButtonStyleProps, ButtonAppearanceDefinition> = {
    outline: new ButtonAppearanceDefinition(),
    filled: new ButtonAppearanceDefinition(),
  }
}

export class ButtonDefinition {
  tag: string = "button";
  baseClasses: string = "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap";
  extraClasses: string = "";

  mode: Record<Mode, ButtonModeDefinition>;

  constructor() {
    this.mode = {
      base: new ButtonModeDefinition,
      hover: new ButtonModeDefinition,
      active: new ButtonModeDefinition,
    };
  }
}

export const Button2 = (props: ButtonProps): JSX.Element => {
  const {
    //size:
    xs, sm, md, lg, xl,
    //style:
    filled, outline,
    //appearance:
    default: defaultVal, accent, primary, secondary, tertiary, success, danger, warning, info, transparent, muted, link,
    ...rest
  } = props;

  const size = getFirstTruthyKey<SizeProps>("md", {xs, sm, md, lg, xl});
  const style = getFirstTruthyKey<ButtonStyleProps>("outline", {filled, outline});
  const appearance = getFirstTruthyKey<TextAppearanceProps>("default",
    {
      default: defaultVal,
      accent,
      primary,
      secondary,
      tertiary,
      success,
      danger,
      warning,
      info,
      transparent,
      muted,
      link
    })

  const buttonDefinition: ButtonDefinition = new ButtonDefinition;

  let builder = componentBuilder(props, props.tag ?? buttonDefinition.tag, buttonDefinition.baseClasses);
  const modes : Mode[] = ['base', 'hover', 'active']
  modes.forEach(mode => builder
    .withExtraClasses(buttonDefinition.mode[mode].extraClasses)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.textSize)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.gap)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.shadow)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.borderRadius)
    .withExtraClasses(buttonDefinition.mode[mode].size[size]?.extraClasses)
    .withExtraClasses(buttonDefinition.mode[mode].style[style]?.appearance[appearance]?.bg)
    .withExtraClasses(buttonDefinition.mode[mode].style[style]?.appearance[appearance]?.borderColor)
    .withExtraClasses(buttonDefinition.mode[mode].style[style]?.appearance[appearance]?.color)
  );
  builder.withExtraClasses(buttonDefinition.extraClasses)
  return builder.build();
};
