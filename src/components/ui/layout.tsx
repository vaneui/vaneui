import React, { JSX } from 'react';
import { GridProps, LayoutComponentProps, ColProps, RowProps, CardProps, StackProps, StackDirectionProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { borderAppearanceClasses, layoutBackgroundAppearanceClasses } from "./props/commonValues";

const itemsClasses = {
  itemsStart: "items-start",
  itemsEnd: "items-end",
  itemsCenter: "items-center",
  itemsBaseline: "items-baseline",
  itemsStretch: "items-stretch",
}

export const Section = (props: LayoutComponentProps): JSX.Element =>
  componentBuilder(props, "section", "w-full flex flex-col mx-auto")
    .withItems(itemsClasses)
    .withSizes({
      xs: "py-4  max-lg:py-2  max-md:py-0",
      sm: "py-6  max-lg:py-6  max-md:py-2",
      md: "py-8  max-lg:py-6  max-md:py-4",
      lg: "py-10 max-lg:py-8  max-md:py-6",
      xl: "py-12 max-lg:py-10 max-md:py-8",
    })
    .withSizes({
      xs: "px-4  max-lg:px-2  max-md:px-0",
      sm: "px-6  max-lg:px-6  max-md:px-2",
      md: "px-8  max-lg:px-6  max-md:px-4",
      lg: "px-10 max-lg:px-8  max-md:px-6",
      xl: "px-12 max-lg:px-10 max-md:px-8",
    })
    .withAppearance(layoutBackgroundAppearanceClasses, { default: true })
    .build();

export const Container = (props: LayoutComponentProps): JSX.Element =>
  componentBuilder(props, "div", "flex flex-col mx-auto w-full")
    .withItems(itemsClasses)
    .withSizes({
      xs: "max-w-3xl gap-2  max-lg:gap-1",
      sm: "max-w-4xl gap-4  max-lg:gap-3 max-md:gap-2",
      md: "max-w-5xl gap-6  max-lg:gap-5 max-md:gap-4",
      lg: "max-w-6xl gap-8  max-lg:gap-7 max-md:gap-6",
      xl: "max-w-7xl gap-10 max-lg:gap-9 max-md:gap-8",
    })
    .withAppearance(layoutBackgroundAppearanceClasses, { transparent: true })
    .build();

const commonGaps = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
}

const justifyClasses = {
  justifyStart: "justify-start",
  justifyEnd: "justify-end",
  justifyCenter: "justify-center",
  justifyBetween: "justify-between",
  justifyAround: "justify-around",
  justifyEvenly: "justify-evenly",
  justifyStretch: "justify-stretch",
  justifyBaseline: "justify-baseline",
}

export const Col = (props: ColProps): JSX.Element =>
  componentBuilder(props, "div", "flex flex-col")
    .withGaps({ noGap: "gap-0" }, commonGaps)
    .withReverse({
      reverse: "flex-col-reverse"
    })
    .withItems(itemsClasses)
    .withAppearance(layoutBackgroundAppearanceClasses, { transparent: true })
    .withBooleanProps(justifyClasses)
    .build();

export const Row = (props: RowProps): JSX.Element =>
  componentBuilder(props, "div", "flex flex-row")
    .withGaps({ noGap: "gap-0" }, commonGaps)
    .withReverse({
      reverse: "flex-row-reverse"
    })
    .withItems(itemsClasses, { itemsCenter: true })
    .withBreakpoints({
      xsCol: "max-xs:flex-col",
      smCol: "max-sm:flex-col",
      mdCol: "max-md:flex-col",
      lgCol: "max-lg:flex-col",
      xlCol: "max-xl:flex-col"
    })
    .withBooleanProps(justifyClasses)
    .withAppearance(layoutBackgroundAppearanceClasses, { transparent: true })
    .build();

const gridGaps = {
  xs: "gap-2",
  sm: "gap-4  max-lg:gap-2",
  md: "gap-6  max-lg:gap-4",
  lg: "gap-8  max-lg:gap-6 max-md:gap-4",
  xl: "gap-10 max-lg:gap-8 max-md:gap-6",
}

export const Grid3 = (props: GridProps): JSX.Element =>
  componentBuilder(props, "div", "w-full grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1")
    .withGaps({ noGap: "gap-0" }, gridGaps)
    .withAppearance(layoutBackgroundAppearanceClasses, { default: true })
    .build();

export const Grid4 = (props: GridProps): JSX.Element =>
  componentBuilder(props, "div", "w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1")
    .withGaps({ noGap: "gap-0" }, gridGaps)
    .withAppearance(layoutBackgroundAppearanceClasses, { default: true })
    .build();

export const Card = (props: CardProps): JSX.Element =>
  componentBuilder(props, "div", "flex flex-col border shadow-sm overflow-hidden")
    .withItems(itemsClasses)
    .withGaps({ noGap: "gap-0" }, commonGaps)
    .withSizes({
      xs: "rounded-md",
      sm: "rounded-lg",
      md: "rounded-xl",
      lg: "rounded-2xl",
      xl: "rounded-3xl"
    })
    .withSizes({
      xs: "gap-2",
      sm: "gap-3",
      md: "gap-4",
      lg: "gap-5",
      xl: "gap-6"
    })
    .withAppearance(layoutBackgroundAppearanceClasses, { default: true })
    .withBooleanProps(borderAppearanceClasses, undefined, { default: true })
    .build();

const stackDirectionClasses: Record<keyof StackDirectionProps, string> = {
  row: "flex-row",
  column: "flex-col"
};

export const Stack = (props: StackProps): JSX.Element => {
  const defaultDirection = !props.row && !props.column ? { column: true } : {};
  const directionProps = { ...defaultDirection, ...props };
  
  return componentBuilder(directionProps, "div", "flex")
    .withGaps({ noGap: "gap-0" }, commonGaps)
    .withReverse({
      reverse: props.row ? "flex-row-reverse" : "flex-col-reverse"
    })
    .withItems(itemsClasses)
    .withBreakpoints({
      xsCol: "max-xs:flex-col",
      smCol: "max-sm:flex-col",
      mdCol: "max-md:flex-col",
      lgCol: "max-lg:flex-col",
      xlCol: "max-xl:flex-col"
    })
    .withSizes({
      xs: "p-2",
      sm: "p-3",
      md: "p-4",
      lg: "p-5",
      xl: "p-6"
    })
    .withBooleanProps(justifyClasses)
    .withBooleanProps(stackDirectionClasses)
    .withAppearance(layoutBackgroundAppearanceClasses, { transparent: true })
    .build();
};
