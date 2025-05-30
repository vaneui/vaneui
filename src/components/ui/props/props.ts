import React from "react";
import {
  SizeKey,
  TextAppearanceKey,
  BreakpointKey,
  HideKey,
  PositionKey,
  DirectionKey,
  ItemsKey,
  JustifyKey,
  WrapKey,
  BadgeKey,
  ButtonKey,
  GridKey,
  RowKey,
  ColKey,
  CardKey,
  StackKey,
  ChipKey,
  DividerKey,
  ContainerKey,
  SectionKey, TypographyComponentKey,
} from "./keys";

export type SizeProps = { [K in SizeKey]?: boolean; }
export type TextAppearanceProps = { [K in TextAppearanceKey]?: boolean; }
export type BreakpointProps = { [K in BreakpointKey]?: boolean; }
export type HideProps = { [K in HideKey]?: boolean; }
export type PositionProps = { [K in PositionKey]?: boolean; }
export type DirectionProps = { [K in DirectionKey]?: boolean; }
export type ItemsProps = { [K in ItemsKey]?: boolean; }
export type JustifyProps = { [K in JustifyKey]?: boolean; }
export type WrapProps = { [K in WrapKey]?: boolean; }

export interface TagProps {
  tag?: React.ReactNode | string | any;
}

export type ComponentProps = TagProps & React.HTMLProps<HTMLElement>;

export type TypographyComponentProps = { [K in TypographyComponentKey]?: boolean; } & ComponentProps;
export type ButtonProps = { [K in ButtonKey]?: boolean; } & ComponentProps;
export type BadgeProps = { [K in BadgeKey]?: boolean; } & ComponentProps;
export type ChipProps = { [K in ChipKey]?: boolean; } & ComponentProps;
export type GridProps = { [K in GridKey]?: boolean; } & ComponentProps;
export type RowProps = { [K in RowKey]?: boolean; } & ComponentProps;
export type ColProps = { [K in ColKey]?: boolean; } & ComponentProps;
export type CardProps = { [K in CardKey]?: boolean; } & ComponentProps;
export type StackProps = { [K in StackKey]?: boolean; } & ComponentProps;
export type SectionProps = { [K in SectionKey]?: boolean; } & ComponentProps;
export type DividerProps = { [K in DividerKey]?: boolean; } & ComponentProps;
export type ContainerProps = { [K in ContainerKey]?: boolean; } & ComponentProps;
