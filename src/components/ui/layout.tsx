import React, { JSX } from 'react';
import { GridProps, LayoutComponentProps, ColProps, RowProps, CardProps, StackProps, StackDirectionProps, GapProps, BreakpointProps, JustifyProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { borderAppearanceClasses, layoutBackgroundAppearanceClasses } from "./props/appearanceValues";
import { commonGaps, gridGaps, itemsClasses, justifyClasses, rowToColumnBreakpointClasses, stackDirectionClasses, roundedClasses, pillClasses, sharpClasses } from "./props/layoutValues";

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

export const Col = (props: ColProps): JSX.Element =>
  componentBuilder(props, "div", "flex flex-col")
    .withGaps(commonGaps, { md: true })
    .withNoGap()
    .withReverse({
      reverse: "flex-col-reverse"
    })
    .withItems(itemsClasses)
    .withAppearance(layoutBackgroundAppearanceClasses, { transparent: true })
    .withJustifyContent(justifyClasses, {})
    .build();

export const Row = (props: RowProps): JSX.Element =>
  componentBuilder(props, "div", "flex flex-row")
    .withGaps(commonGaps, { md: true })
    .withNoGap()
    .withReverse({
      reverse: "flex-row-reverse"
    })
    .withItems(itemsClasses, { itemsCenter: true })
    .withBreakpoints(rowToColumnBreakpointClasses)
    .withJustifyContent(justifyClasses, {})
    .withAppearance(layoutBackgroundAppearanceClasses, { transparent: true })
    .build();

export const Grid3 = (props: GridProps): JSX.Element =>
  componentBuilder(props, "div", "w-full grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1")
    .withGaps(gridGaps, { md: true })
    .withNoGap()
    .withAppearance(layoutBackgroundAppearanceClasses, { default: true })
    .build();

export const Grid4 = (props: GridProps): JSX.Element =>
  componentBuilder(props, "div", "w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1")
    .withGaps(gridGaps, { md: true })
    .withNoGap()
    .withAppearance(layoutBackgroundAppearanceClasses, { default: true })
    .build();

export const Card = (props: CardProps): JSX.Element =>
  componentBuilder(props, "div", "flex flex-col border shadow-sm overflow-hidden")
    .withItems(itemsClasses)
    .withGaps(commonGaps, { md: true })
    .withNoGap()
    .withRounded(roundedClasses, { md: true })
    .withAppearance(layoutBackgroundAppearanceClasses, { default: true })
    .withBorderColor(borderAppearanceClasses, { default: true })
    .withNoBorder()
    .withSharp()
    .build();

export const Stack = (props: StackProps): JSX.Element => {
  const defaultDirection = !props.row && !props.column ? { column: true } : {};
  const directionProps = { ...defaultDirection, ...props };

  return componentBuilder(directionProps, "div", "flex")
    .withGaps(commonGaps, { md: true })
    .withNoGap()
    .withReverse({
      reverse: props.row ? "flex-row-reverse" : "flex-col-reverse"
    })
    .withItems(itemsClasses)
    .withBreakpoints(rowToColumnBreakpointClasses)
    .withSizes({
      xs: "p-2",
      sm: "p-3",
      md: "p-4",
      lg: "p-5",
      xl: "p-6"
    })
    .withJustifyContent(justifyClasses, {})
    .withStackDirection(stackDirectionClasses, { column: true })
    .withAppearance(layoutBackgroundAppearanceClasses, { transparent: true })
    .build();
};
