import React from "react";
import {
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

export type ComponentProps = {
  tag?: React.ReactNode | string | any;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLProps<HTMLElement>;

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
