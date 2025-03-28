import React, { JSX } from 'react';
import { GridProps, LayoutComponentProps, ColProps, RowProps, CardProps, StackProps, StackDirectionProps, GapProps, BreakpointProps, JustifyProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { borderAppearanceClasses, layoutBackgroundAppearanceClasses } from "./props/appearanceValues";
import { commonGaps, gridGaps, itemsClasses, justifyClasses, rowToColumnBreakpointClasses, stackDirectionClasses, roundedClasses, pillClasses, sharpClasses, wrapClasses } from "./props/layoutValues";

export const Section = (props: LayoutComponentProps): JSX.Element =>
  componentBuilder(props, "section", "w-full flex flex-col")
    .withItems()
    .withSizes({
      xs: "py-3",
      sm: "py-5",
      md: "py-8  max-md:py-5",
      lg: "py-16 max-lg:py-14 max-md:py-12",
      xl: "py-20 max-lg:py-16 max-md:py-12",
    })
    .withSizes({
      xs: "px-5  max-lg:px-4 max-md:px-3",
      sm: "px-6  max-lg:px-5 max-md:px-4",
      md: "px-7  max-lg:px-6 max-md:px-5",
      lg: "px-8  max-lg:px-7 max-md:px-6",
      xl: "px-9  max-lg:px-8 max-md:px-7",
    })
    .withGap()
    .withAppearance(layoutBackgroundAppearanceClasses, { default: true })
    .build();

export const Container = (props: LayoutComponentProps): JSX.Element =>
  componentBuilder(props, "div", "flex flex-col mx-auto w-full")
    .withItems()
    .withSizes({
      xs: "max-w-3xl gap-2  max-lg:gap-1",
      sm: "max-w-4xl gap-4  max-lg:gap-3 max-md:gap-2",
      md: "max-w-5xl gap-6  max-lg:gap-5 max-md:gap-4",
      lg: "max-w-6xl gap-8  max-lg:gap-7 max-md:gap-6",
      xl: "max-w-7xl gap-10 max-lg:gap-9 max-md:gap-8",
    })
    .withAppearance(layoutBackgroundAppearanceClasses, { transparent: true })
    .build();

/**
 * Column component for vertical layouts.
 * Supports flex-wrap properties for controlling how items wrap.
 * @param props.wrap - Allows items to wrap (flex-wrap)
 * @param props.nowrap - Prevents items from wrapping (flex-nowrap)
 * @param props.wrapReverse - Wraps items onto multiple lines in reverse (flex-wrap-reverse)
 */
export const Col = (props: ColProps): JSX.Element =>
  componentBuilder(props, "div", "flex flex-col")
    .withGaps(commonGaps, { md: true })
    .withNoGap()
    .withReverse({
      reverse: "flex-col-reverse"
    })
    .withItems()
    .withAppearance(layoutBackgroundAppearanceClasses, { transparent: true })
    .withJustifyContent()
    .withWrap()
    .build();

/**
 * Row component for horizontal layouts.
 * Uses flex-wrap by default and centers items vertically.
 * @param props.wrap - Allows items to wrap (flex-wrap) - default
 * @param props.nowrap - Prevents items from wrapping (flex-nowrap)
 * @param props.wrapReverse - Wraps items onto multiple lines in reverse (flex-wrap-reverse)
 */
export const Row = (props: RowProps): JSX.Element =>
  componentBuilder(props, "div", "flex flex-row")
    .withGaps(commonGaps, { md: true })
    .withNoGap()
    .withReverse({
      reverse: "flex-row-reverse"
    })
    .withItems({ itemsCenter: true })
    .withBreakpoints(rowToColumnBreakpointClasses)
    .withJustifyContent()
    .withAppearance(layoutBackgroundAppearanceClasses, { transparent: true })
    .withWrap()
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
    .withItems()
    .withPadding()
    .withGaps(commonGaps, { md: true })
    .withNoGap()
    .withRounded(roundedClasses, { md: true })
    .withAppearance(layoutBackgroundAppearanceClasses, { default: true })
    .withBorderColor(borderAppearanceClasses, { default: true })
    .withNoBorder()
    .withNoShadow()
    .withNoPadding()
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
    .withItems()
    .withBreakpoints(rowToColumnBreakpointClasses)
    .withPadding()
    .withJustifyContent()
    .withStackDirection(stackDirectionClasses, { column: true })
    .withAppearance(layoutBackgroundAppearanceClasses, { transparent: true })
    .withNoPadding()
    .withWrap()
    .build();
};
