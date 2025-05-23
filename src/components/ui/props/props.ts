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
  VariantKey,
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
export type VariantProps = { [K in VariantKey]?: boolean; }
export type DirectionProps = { [K in DirectionKey]?: boolean; }
export type ItemsProps = { [K in ItemsKey]?: boolean; }
export type JustifyProps = { [K in JustifyKey]?: boolean; }
export type WrapProps = { [K in WrapKey]?: boolean; }

export interface TagProps {
  tag?: React.ReactNode | string | any;
}

export type BaseComponentProps = TagProps & SizeProps & HideProps & PositionProps & React.HTMLProps<HTMLElement>;

export type FontProps =
  FontWeightProps
  & FontStyleProps
  & TextDecorationProps
  & TextTransformProps
  & FontFamilyProps
  & TextAlignProps;

export type TypographyComponentProps =
  BaseComponentProps
  & FontProps
  & TextAppearanceProps
  & CommonAppearanceProps;

export type ButtonProps =
  TypographyComponentProps
  & ShapeProps
  & CommonAppearanceProps
  & NoBorderProps
  & NoShadowProps
  & NoRingProps
  & VariantProps;

export type BadgeProps =
  TypographyComponentProps
  & ShapeProps
  & CommonAppearanceProps
  & NoBorderProps
  & NoShadowProps
  & NoRingProps
  & VariantProps;

export type ChipProps =
  TypographyComponentProps
  & ShapeProps
  & CommonAppearanceProps
  & NoBorderProps
  & NoShadowProps
  & NoRingProps
  & VariantProps;

export type GridProps = BaseComponentProps & NoGapProps & CommonAppearanceProps;

export type LayoutComponentProps =
  TypographyComponentProps
  & ReverseProps
  & ItemsProps
  & NoGapProps
  & CommonAppearanceProps
  & JustifyProps
  & WrapProps;

export type RowProps =
  LayoutComponentProps
  & BreakpointProps;

export type ColProps =
  LayoutComponentProps;

export type CardProps =
  LayoutComponentProps
  & SharpProps
  & BreakpointProps
  & NoBorderProps
  & NoShadowProps
  & NoPaddingProps
  & DirectionProps;

export type StackProps =
  LayoutComponentProps
  & BreakpointProps
  & DirectionProps
  & NoBorderProps
  & NoShadowProps
  & NoRingProps
  & NoPaddingProps;
