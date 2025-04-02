import { ButtonStyleProps, CommonAppearanceProps, SizeProps, TextAppearanceProps } from "../props/props";

export type ButtonStyleClasses = {
  background: Record<keyof CommonAppearanceProps, string>;
  hoverBackground: Record<keyof CommonAppearanceProps, string>;
  activeBackground: Record<keyof CommonAppearanceProps, string>;
  textAppearance: Record<keyof TextAppearanceProps, string>;
  borderColor: Record<keyof CommonAppearanceProps, string>;
};

export type ButtonClasses = {
  baseClasses: string;

  style: Record<keyof ButtonStyleProps, ButtonStyleClasses>

  textSize: Record<keyof SizeProps, string>;
  rounded: Record<keyof SizeProps, string>;
  shadow: Record<keyof SizeProps, string>;
  px: Record<keyof SizeProps, string>;
  py: Record<keyof SizeProps, string>;
};