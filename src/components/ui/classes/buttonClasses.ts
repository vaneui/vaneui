import { ButtonStyleProps, CommonAppearanceProps, SizeProps, TextAppearanceProps } from "../props/props";
import { hoverShadowClasses, shadowClasses } from "./layoutClasses";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses,
  borderAppearanceClasses,
  filledActiveBackgroundAppearanceClasses,
  filledBackgroundAppearanceClasses, filledBorderAppearanceClasses,
  filledHoverBackgroundAppearanceClasses,
  hoverBackgroundAppearanceClasses
} from "./appearanceValues";
import { filledTextAppearanceClasses, textAppearanceClasses } from "./typographyClasses";
import { commonGaps } from "./spacingClasses";

export class ButtonBaseClasses {
  background: Record<keyof CommonAppearanceProps, string>;
  textAppearance: Record<keyof TextAppearanceProps, string>;
  borderColor: Record<keyof CommonAppearanceProps, string>;

  textSize: Record<keyof SizeProps, string> = {
    xs: "text-xs/5",
    sm: "text-sm/5",
    md: "text-base",
    lg: "text-lg/6",
    xl: "text-xl/6",
  };
  rounded: Record<keyof SizeProps, string> = {
    xs: "rounded-sm",
    sm: "rounded-md",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl"
  };
  shadow: Record<keyof SizeProps, string> = shadowClasses;
  px: Record<keyof SizeProps, string> = {xs: "px-2", sm: "px-2.5", md: "px-3.5", lg: "px-5", xl: "px-6"};
  py: Record<keyof SizeProps, string> = {xs: "py-1", sm: "py-1.5", md: "py-2", lg: "py-3", xl: "py-4"};
  gap: Record<keyof SizeProps, string> = commonGaps;

  constructor(
    bg: Record<keyof CommonAppearanceProps, string> = backgroundAppearanceClasses,
    textAppearance: Record<keyof TextAppearanceProps, string> = textAppearanceClasses,
    borderColor: Record<keyof CommonAppearanceProps, string> = borderAppearanceClasses,
  ) {
    this.background = bg;
    this.textAppearance = textAppearance;
    this.borderColor = borderColor;
  }
}

export class ButtonStyleClasses {
  base: ButtonBaseClasses;
  active: ButtonBaseClasses;
  hover: ButtonBaseClasses;

  constructor(
    base: ButtonBaseClasses = new ButtonBaseClasses(),
    active: ButtonBaseClasses = base,
    hover: ButtonBaseClasses = base,
  ) {
    this.base = base;
    this.active = active;
    this.hover = hover;
  }
}

export class ButtonClasses {
  baseClasses: string = "w-fit h-fit cursor-pointer inline-flex items-center justify-center border transition-all duration-300 whitespace-nowrap";
  style: Record<keyof ButtonStyleProps, ButtonStyleClasses>;

  constructor() {
    let outlineStyle = new ButtonStyleClasses();
    outlineStyle.hover.background = hoverBackgroundAppearanceClasses;
    outlineStyle.hover.shadow = hoverShadowClasses;
    outlineStyle.active.background = activeBackgroundAppearanceClasses;

    let filledBaseStyle = new ButtonBaseClasses(
      filledBackgroundAppearanceClasses, filledTextAppearanceClasses, filledBorderAppearanceClasses);
    let filledStyle = new ButtonStyleClasses(filledBaseStyle);
    filledStyle.hover.background = filledHoverBackgroundAppearanceClasses;
    filledStyle.hover.shadow = hoverShadowClasses;
    filledStyle.active.background = filledActiveBackgroundAppearanceClasses;

    this.style = {
      outline: outlineStyle,
      filled: filledStyle
    }
  }
}