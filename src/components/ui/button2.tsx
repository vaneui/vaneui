import { JSX } from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import { ButtonProps, ButtonStyleProps, SizeProps, TextAppearanceProps } from "./props/props";
import { useTheme } from '../theme';
import { Mode } from "./settings/mode";
import { getFirstTruthyKey } from "../utils/getFirstTruthyKey";


const px: Record<keyof SizeProps, string> = {xs: "px-2", sm: "px-2.5", md: "px-3.5", lg: "px-5", xl: "px-6"}
const py: Record<keyof SizeProps, string> = {xs: "py-1", sm: "py-1.5", md: "py-2", lg: "py-3", xl: "py-4"}
const gap: Record<keyof SizeProps, string> = {xs: "gap-1.5", sm: "gap-2", md: "gap-3", lg: "gap-4", xl: "gap-5"}
const shadowClasses: Record<keyof SizeProps, string> = {
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl"
}
const buttonTextSize: Record<keyof SizeProps, string> = {
  xs: "text-xs/5",
  sm: "text-sm/5",
  md: "text-base",
  lg: "text-lg/6",
  xl: "text-xl/6",
}
const buttonRounded: Record<keyof SizeProps, string> = {
  xs: "rounded-sm",
  sm: "rounded-md",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl"
}

export class ButtonSizeDefinition {
  size: keyof SizeProps;

  extraClasses: string = "";

  padding: { x: string; y: string };
  borderRadius: string = "";
  shadow: string = "";
  gap: string = "";
  textSize: string = "";

  constructor(size: keyof SizeProps) {
    this.size = size;
    this.padding = {x: px[size], y: py[size]};
    this.gap = gap[size];
    this.shadow = shadowClasses[size];
    this.borderRadius = buttonRounded[size];
    this.textSize = buttonTextSize[size];
  }
}

export class ButtonModeDefinition {
  mode: Mode;
  style: keyof ButtonStyleProps;

  extraClasses: string = "";

  color: string = "";
  bg: string = "";
  borderColor: string = "";

  size: Record<keyof SizeProps, ButtonSizeDefinition> = {
    xs: new ButtonSizeDefinition('xs'),
    sm: new ButtonSizeDefinition('sm'),
    md: new ButtonSizeDefinition('md'),
    lg: new ButtonSizeDefinition('lg'),
    xl: new ButtonSizeDefinition('xl'),
  }

  constructor(mode: Mode, style: keyof ButtonStyleProps) {
    this.mode = mode;
    this.style = style;
  }
}

export class ButtonDefinition {
  tag: string = "button";
  baseClasses: string = "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap";
  extraClasses: string = "";

  style: keyof ButtonStyleProps;

  mode: Record<Mode, ButtonModeDefinition>;

  constructor(style: keyof ButtonStyleProps) {
    this.style = style;
    this.mode = {
      base: new ButtonModeDefinition('base', style),
      hover: new ButtonModeDefinition('hover', style),
      active: new ButtonModeDefinition('active', style),
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
    {default: defaultVal, accent, primary, secondary, tertiary, success, danger, warning, info, transparent, muted, link})

  const buttonDefinition: ButtonDefinition = new ButtonDefinition(style);

  return componentBuilder(props, props.tag ?? buttonDefinition.tag, buttonDefinition.baseClasses)
    .withExtraClasses(buttonDefinition.mode.active.bg)
    .withExtraClasses(buttonDefinition.mode.active.color)
    .withExtraClasses(buttonDefinition.mode.active.borderColor)
    .withExtraClasses(buttonDefinition.mode.active.extraClasses)
    .withExtraClasses(buttonDefinition.mode.active.size[size]?.textSize)
    .withExtraClasses(buttonDefinition.mode.active.size[size]?.gap)
    .withExtraClasses(buttonDefinition.mode.active.size[size]?.shadow)
    .withExtraClasses(buttonDefinition.mode.active.size[size]?.borderRadius)
    .withExtraClasses(buttonDefinition.mode.active.size[size]?.extraClasses)
    .withExtraClasses(buttonDefinition.extraClasses)
    .build();
};
