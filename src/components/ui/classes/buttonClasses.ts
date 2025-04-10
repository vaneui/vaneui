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
  background: Record<keyof CommonAppearanceProps, string> = backgroundAppearanceClasses;
  textAppearance: Record<keyof TextAppearanceProps, string> = textAppearanceClasses;
  borderColor: Record<keyof CommonAppearanceProps, string> = borderAppearanceClasses;
  textSize: Record<keyof SizeProps, string> = buttonTextSizeClasses;
  rounded: Record<keyof SizeProps, string> = buttonRoundedClasses;
  shadow: Record<keyof SizeProps, string> = shadowClasses;
  px: Record<keyof SizeProps, string> = {xs: "px-2", sm: "px-2.5", md: "px-3.5", lg: "px-5", xl: "px-6"};
  py: Record<keyof SizeProps, string> = {xs: "py-1", sm: "py-1.5", md: "py-2", lg: "py-3", xl: "py-4"};
  gap: Record<keyof SizeProps, string> = {xs: "gap-1.5", sm: "gap-2", md: "gap-3", lg: "gap-4", xl: "gap-5"};
}

export class ButtonClasses {
  baseClasses: string = "w-fit h-fit cursor-pointer inline-flex items-center justify-center border transition-all duration-300 whitespace-nowrap";

  style: Record<keyof ButtonStyleProps, Record<Mode, Partial<ButtonBaseClasses>>> = {
    outline: {
      base: new ButtonBaseClasses,
      active: {
        background: activeBackgroundAppearanceClasses
      },
      hover: {
        shadow: hoverShadowClasses,
        background: hoverBackgroundAppearanceClasses
      }
    },
    filled: {
      base: deepMerge(new ButtonBaseClasses, {
        background: filledBackgroundAppearanceClasses,
        textAppearance: filledTextAppearanceClasses,
        borderColor: filledBorderAppearanceClasses
      }),
      active: {
        background: filledActiveBackgroundAppearanceClasses
      },
      hover: {
        shadow: hoverShadowClasses,
        background: filledHoverBackgroundAppearanceClasses
      }
    },
  };
}
