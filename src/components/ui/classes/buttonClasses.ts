import { ButtonStyleProps, CommonAppearanceProps, SizeProps, TextAppearanceProps } from "../props/props";
import { hoverShadowClasses, shadowClasses } from "./layoutClasses";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses,
  borderAppearanceClasses,
  filledActiveBackgroundAppearanceClasses,
  filledBackgroundAppearanceClasses, filledBorderAppearanceClasses,
  filledHoverBackgroundAppearanceClasses, filledRingAppearanceClasses,
  hoverBackgroundAppearanceClasses, ringAppearanceClasses
} from "./appearanceClasses";
import { filledTextAppearanceClasses, textAppearanceClasses } from "./typographyClasses";
import { deepMerge } from "../../utils/deepMerge";
import { Mode } from "../settings/mode";

const buttonTextSizeClasses: Record<keyof SizeProps, string> = {
  xs: "text-xs/5",
  sm: "text-sm/5",
  md: "text-base",
  lg: "text-lg/6",
  xl: "text-xl/6",
};

const buttonRoundedClasses: Record<keyof SizeProps, string> = {
  xs: "rounded-sm",
  sm: "rounded-md",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl"
};

export class ButtonBaseClasses {
  background: Partial<Record<keyof CommonAppearanceProps, string>> = {};
  textAppearance: Partial<Record<keyof TextAppearanceProps, string>> = {};
  borderColor: Partial<Record<keyof CommonAppearanceProps, string>> = {};
  textSize: Partial<Record<keyof SizeProps, string>> = {};
  rounded: Partial<Record<keyof SizeProps, string>> = {};
  shadow: Partial<Record<keyof SizeProps, string>> = {};
  px: Partial<Record<keyof SizeProps, string>> = {};
  py: Partial<Record<keyof SizeProps, string>> = {};
  gap: Partial<Record<keyof SizeProps, string>> = {};
}

const defaultBtnClasses = (): ButtonBaseClasses => { return {
  background: backgroundAppearanceClasses,
  textAppearance: textAppearanceClasses,
  borderColor: ringAppearanceClasses,
  textSize: buttonTextSizeClasses,
  rounded: buttonRoundedClasses,
  shadow: shadowClasses,
  px: {xs: "px-2", sm: "px-2.5", md: "px-3.5", lg: "px-5", xl: "px-6"},
  py: {xs: "py-1", sm: "py-1.5", md: "py-2", lg: "py-3", xl: "py-4"},
  gap: {xs: "gap-1.5", sm: "gap-2", md: "gap-3", lg: "gap-4", xl: "gap-5"},
}}

export class ButtonClasses {

  constructor(init: Partial<ButtonClasses> = {}) {
    this.baseClasses = init.baseClasses ?? this.baseClasses;
    this.extraClasses = init.extraClasses ?? this.extraClasses;
    this.style = deepMerge(this.style, init.style);
  }

  baseClasses: string = "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap";
  extraClasses: string = "";

  style: Record<keyof ButtonStyleProps, Record<Mode, ButtonBaseClasses>> = {
    outline: {
      base: defaultBtnClasses(),
      active: deepMerge(new ButtonBaseClasses, {
        background: activeBackgroundAppearanceClasses,
      }),
      hover: deepMerge(new ButtonBaseClasses, {
        shadow: hoverShadowClasses,
        background: hoverBackgroundAppearanceClasses
      }),
    },
    filled: {
      base: deepMerge(defaultBtnClasses(), {
        background: filledBackgroundAppearanceClasses,
        textAppearance: filledTextAppearanceClasses,
        borderColor: filledRingAppearanceClasses
      }),
      active: deepMerge(new ButtonBaseClasses, {
        background: filledActiveBackgroundAppearanceClasses
      }),
      hover: deepMerge(new ButtonBaseClasses, {
        shadow: hoverShadowClasses,
        background: filledHoverBackgroundAppearanceClasses
      }),
    },
  };
}
