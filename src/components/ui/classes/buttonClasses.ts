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
} from "./appearanceClasses";
import { filledTextAppearanceClasses, textAppearanceClasses } from "./typographyClasses";

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
  gap: Record<keyof SizeProps, string> = {xs: "gap-1.5", sm: "gap-2", md: "gap-3", lg: "gap-4", xl: "gap-5"};

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
    active: ButtonBaseClasses = new ButtonBaseClasses(activeBackgroundAppearanceClasses, textAppearanceClasses, borderAppearanceClasses),
    hover: ButtonBaseClasses = new ButtonBaseClasses(hoverBackgroundAppearanceClasses, textAppearanceClasses, borderAppearanceClasses),
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
    let outlineBaseStyle = new ButtonBaseClasses(
      backgroundAppearanceClasses, textAppearanceClasses, borderAppearanceClasses);
    let outlineHoverStyle = new ButtonBaseClasses(
      hoverBackgroundAppearanceClasses, textAppearanceClasses, borderAppearanceClasses);
    outlineHoverStyle.shadow = hoverShadowClasses;
    let outlineActiveStyle = new ButtonBaseClasses(
      activeBackgroundAppearanceClasses, textAppearanceClasses, borderAppearanceClasses);
    let outlineStyle = new ButtonStyleClasses(outlineBaseStyle, outlineActiveStyle, outlineHoverStyle);

    let filledBaseStyle = new ButtonBaseClasses(
      filledBackgroundAppearanceClasses, filledTextAppearanceClasses, filledBorderAppearanceClasses);
    let filledHoverStyle = new ButtonBaseClasses(
      filledHoverBackgroundAppearanceClasses, filledTextAppearanceClasses, filledBorderAppearanceClasses);
    filledHoverStyle.shadow = hoverShadowClasses;
    let filledActiveStyle = new ButtonBaseClasses(
      filledActiveBackgroundAppearanceClasses, filledTextAppearanceClasses, filledBorderAppearanceClasses);
    let filledStyle = new ButtonStyleClasses(filledBaseStyle, filledActiveStyle, filledHoverStyle);

    this.style = {
      outline: outlineStyle,
      filled: filledStyle
    }
  }
}
