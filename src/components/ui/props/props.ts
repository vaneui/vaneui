import React from "react";
import {
  SizeKey,
  AppearanceKey,
  TextAppearanceKey,
  FontFamilyKey,
  FontWeightKey,
  FontStyleKey,
  TextDecorationKey,
  TextTransformKey,
  TextAlignKey,
  NoBorderKey,
  NoShadowKey,
  NoPaddingKey,
  BreakpointKey,
  HideKey,
  PositionKey,
  DirectionReverseKey,
  NoGapKey,
  PillKey,
  SharpKey,
  ShapeKey,
  StyleKey,
  DirectionKey,
  ItemsKey,
  JustifyKey,
  WrapKey,
  NoRingKey,
} from "./propKeys";

export type SizeProps = { [K in SizeKey]?: boolean; }
export type CommonAppearanceProps = { [K in AppearanceKey]?: boolean; }
export type FontFamilyProps = { [K in FontFamilyKey]?: boolean; }
export type FontWeightProps = { [K in FontWeightKey]?: boolean; }
export type FontStyleProps = { [K in FontStyleKey]?: boolean; }
export type TextDecorationProps = { [K in TextDecorationKey]?: boolean; }
export type TextTransformProps = { [K in TextTransformKey]?: boolean; }
export type TextAlignProps = { [K in TextAlignKey]?: boolean; }
export type TextAppearanceProps = { [K in TextAppearanceKey]?: boolean; }
export type NoBorderProps = { [K in NoBorderKey]?: boolean; }
export type NoShadowProps = { [K in NoShadowKey]?: boolean; }
export type NoRingProps = { [K in NoRingKey]?: boolean; }
export type NoPaddingProps = { [K in NoPaddingKey]?: boolean; }
export type BreakpointProps = { [K in BreakpointKey]?: boolean; }
export type HideProps = { [K in HideKey]?: boolean; }
export type PositionProps = { [K in PositionKey]?: boolean; }
export type ReverseProps = { [K in DirectionReverseKey]?: boolean; }
export type NoGapProps = { [K in NoGapKey]?: boolean; }
export type PillProps = { [K in PillKey]?: boolean; }
export type SharpProps = { [K in SharpKey]?: boolean; }
export type ShapeProps = { [K in ShapeKey]?: boolean; }
export type ButtonStyleProps = { [K in StyleKey]?: boolean; }
export type DirectionProps = { [K in DirectionKey]?: boolean; }
export type ItemsProps = { [K in ItemsKey]?: boolean; }
export type JustifyProps = { [K in JustifyKey]?: boolean; }
export type WrapProps = { [K in WrapKey]?: boolean; }

export interface TagProps {
  tag?: React.ReactNode | string | any;
}

export type BaseComponentProps = TagProps & SizeProps & HideProps & PositionProps & React.HTMLProps<HTMLElement>;

export type LayoutComponentProps = BaseComponentProps & ReverseProps & ItemsProps & CommonAppearanceProps;

export type FontProps =
  FontWeightProps
  & FontStyleProps
  & TextDecorationProps
  & TextTransformProps
  & FontFamilyProps
  & TextAppearanceProps
  & CommonAppearanceProps
  & TextAlignProps;

export type TypographyComponentProps = BaseComponentProps & FontProps;

export type ButtonProps =
  TypographyComponentProps
  & SizeProps
  & ShapeProps
  & CommonAppearanceProps
  & NoBorderProps
  & NoShadowProps
  & NoRingProps
  & ButtonStyleProps;

export type GridProps = BaseComponentProps & SizeProps & NoGapProps & CommonAppearanceProps;

export type RowProps =
  BaseComponentProps
  & WrapProps
  & SizeProps
  & NoGapProps
  & ReverseProps
  & ItemsProps
  & BreakpointProps
  & JustifyProps
  & CommonAppearanceProps;

export type ColProps =
  BaseComponentProps
  & WrapProps
  & SizeProps
  & NoGapProps
  & ReverseProps
  & ItemsProps
  & JustifyProps
  & CommonAppearanceProps;

export type CardProps =
  BaseComponentProps
  & SizeProps
  & NoGapProps
  & ItemsProps
  & SharpProps
  & BreakpointProps
  & TypographyComponentProps
  & NoBorderProps
  & NoShadowProps
  & NoPaddingProps
  & DirectionProps;

export type StackProps =
  BaseComponentProps
  & WrapProps
  & SizeProps
  & NoGapProps
  & ReverseProps
  & ItemsProps
  & BreakpointProps
  & JustifyProps
  & CommonAppearanceProps
  & DirectionProps
  & NoPaddingProps;
