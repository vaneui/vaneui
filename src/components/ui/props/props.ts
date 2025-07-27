import React from "react";

export type ComponentProps = {
  tag?: React.ReactNode | string | any;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLProps<HTMLElement>;

export interface TypographyProps extends ComponentProps, ComponentBooleanProps {}
export interface ListProps extends ComponentProps, ComponentBooleanProps {}
export interface ButtonProps extends ComponentProps {
  // Size props
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  
  // Layout props
  xsHide?: boolean;
  smHide?: boolean;
  mdHide?: boolean;
  lgHide?: boolean;
  xlHide?: boolean;
  itemsStart?: boolean;
  itemsEnd?: boolean;
  itemsCenter?: boolean;
  itemsBaseline?: boolean;
  itemsStretch?: boolean;
  justifyStart?: boolean;
  justifyEnd?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  justifyAround?: boolean;
  justifyEvenly?: boolean;
  justifyStretch?: boolean;
  justifyBaseline?: boolean;
  relative?: boolean;
  absolute?: boolean;
  fixed?: boolean;
  sticky?: boolean;
  static?: boolean;
  inline?: boolean;
  block?: boolean;
  inlineBlock?: boolean;
  flex?: boolean;
  inlineFlex?: boolean;
  grid?: boolean;
  inlineGrid?: boolean;
  contents?: boolean;
  table?: boolean;
  tableCell?: boolean;
  hidden?: boolean;
  overflowAuto?: boolean;
  overflowHidden?: boolean;
  overflowClip?: boolean;
  overflowVisible?: boolean;
  overflowScroll?: boolean;
  overflowXAuto?: boolean;
  overflowYAuto?: boolean;
  overflowXHidden?: boolean;
  overflowYHidden?: boolean;
  overflowXClip?: boolean;
  overflowYClip?: boolean;
  overflowXVisible?: boolean;
  overflowYVisible?: boolean;
  overflowXScroll?: boolean;
  overflowYScroll?: boolean;
  
  // Typography props
  thin?: boolean;
  extralight?: boolean;
  light?: boolean;
  normal?: boolean;
  medium?: boolean;
  semibold?: boolean;
  bold?: boolean;
  extrabold?: boolean;
  black?: boolean;
  italic?: boolean;
  notItalic?: boolean;
  underline?: boolean;
  lineThrough?: boolean;
  noUnderline?: boolean;
  overline?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  normalCase?: boolean;
  sans?: boolean;
  serif?: boolean;
  mono?: boolean;
  textLeft?: boolean;
  textCenter?: boolean;
  textRight?: boolean;
  textJustify?: boolean;
  
  // Appearance props
  default?: boolean;
  accent?: boolean;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  success?: boolean;
  danger?: boolean;
  warning?: boolean;
  info?: boolean;
  
  // Style props
  pill?: boolean;
  sharp?: boolean;
  rounded?: boolean;
  border?: boolean;
  noBorder?: boolean;
  shadow?: boolean;
  noShadow?: boolean;
  ring?: boolean;
  noRing?: boolean;
  gap?: boolean;
  noGap?: boolean;
  padding?: boolean;
  noPadding?: boolean;
  filled?: boolean;
  outline?: boolean;
}
// Create a utility type that works with explicit keys
type ComponentBooleanProps = {
  // Size props
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  
  // Hide props
  xsHide?: boolean;
  smHide?: boolean;
  mdHide?: boolean;
  lgHide?: boolean;
  xlHide?: boolean;
  
  // Layout props
  itemsStart?: boolean;
  itemsEnd?: boolean;
  itemsCenter?: boolean;
  itemsBaseline?: boolean;
  itemsStretch?: boolean;
  justifyStart?: boolean;
  justifyEnd?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  justifyAround?: boolean;
  justifyEvenly?: boolean;
  justifyStretch?: boolean;
  justifyBaseline?: boolean;
  relative?: boolean;
  absolute?: boolean;
  fixed?: boolean;
  sticky?: boolean;
  static?: boolean;
  inline?: boolean;
  block?: boolean;
  inlineBlock?: boolean;
  flex?: boolean;
  inlineFlex?: boolean;
  grid?: boolean;
  inlineGrid?: boolean;
  contents?: boolean;
  table?: boolean;
  tableCell?: boolean;
  hidden?: boolean;
  overflowAuto?: boolean;
  overflowHidden?: boolean;
  overflowClip?: boolean;
  overflowVisible?: boolean;
  overflowScroll?: boolean;
  overflowXAuto?: boolean;
  overflowYAuto?: boolean;
  overflowXHidden?: boolean;
  overflowYHidden?: boolean;
  overflowXClip?: boolean;
  overflowYClip?: boolean;
  overflowXVisible?: boolean;
  overflowYVisible?: boolean;
  overflowXScroll?: boolean;
  overflowYScroll?: boolean;
  
  // Typography props
  thin?: boolean;
  extralight?: boolean;
  light?: boolean;
  normal?: boolean;
  medium?: boolean;
  semibold?: boolean;
  bold?: boolean;
  extrabold?: boolean;
  black?: boolean;
  italic?: boolean;
  notItalic?: boolean;
  underline?: boolean;
  lineThrough?: boolean;
  noUnderline?: boolean;
  overline?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  normalCase?: boolean;
  sans?: boolean;
  serif?: boolean;
  mono?: boolean;
  textLeft?: boolean;
  textCenter?: boolean;
  textRight?: boolean;
  textJustify?: boolean;
  
  // Appearance props
  default?: boolean;
  accent?: boolean;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  success?: boolean;
  danger?: boolean;
  warning?: boolean;
  info?: boolean;
  transparent?: boolean;
  link?: boolean;
  
  // Style props
  pill?: boolean;
  sharp?: boolean;
  rounded?: boolean;
  filled?: boolean;
  outline?: boolean;
  shadow?: boolean;
  noShadow?: boolean;
  border?: boolean;
  noBorder?: boolean;
  ring?: boolean;
  noRing?: boolean;
  gap?: boolean;
  noGap?: boolean;
  padding?: boolean;
  noPadding?: boolean;
  
  // Direction and wrap props
  row?: boolean;
  column?: boolean;
  rowReverse?: boolean;
  columnReverse?: boolean;
  reverse?: boolean;
  flexWrap?: boolean;
  flexNoWrap?: boolean;
  flexWrapReverse?: boolean;
  
  // Breakpoint props
  xsCol?: boolean;
  smCol?: boolean;
  mdCol?: boolean;
  lgCol?: boolean;
  xlCol?: boolean;
};

export interface BadgeProps extends ComponentProps, ComponentBooleanProps {}
export interface ChipProps extends ComponentProps, ComponentBooleanProps {}
export interface GridProps extends ComponentProps, ComponentBooleanProps {}
export interface RowProps extends ComponentProps, ComponentBooleanProps {}
export interface ColProps extends ComponentProps, ComponentBooleanProps {}
export interface CardProps extends ComponentProps, ComponentBooleanProps {}
export interface StackProps extends ComponentProps, ComponentBooleanProps {}
export interface SectionProps extends ComponentProps, ComponentBooleanProps {}
export interface DividerProps extends ComponentProps, ComponentBooleanProps {}
export interface ContainerProps extends ComponentProps, ComponentBooleanProps {}
