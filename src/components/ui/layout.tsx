import React from 'react';
import { GridProps, LayoutComponentProps, ColProps, RowProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";

const centeredClasses = {
  centered: "items-center justify-center",
  vCentered: "items-center",
  hCentered: "justify-center"
}

export const Section: React.FC<LayoutComponentProps> = (props) =>
  componentBuilder(props, "section", "w-full flex flex-col items-start")
    .withCentered(centeredClasses)
    .withSizes({
      xs: "py-6  max-lg:py-4  max-md:py-2",
      sm: "py-8  max-lg:py-6  max-md:py-4",
      md: "py-10 max-lg:py-8  max-md:py-6",
      lg: "py-12 max-lg:py-10 max-md:py-8",
      xl: "py-14 max-lg:py-12 max-md:py-10",
    })
    .withSizes({
      xs: "px-4  max-lg:px-2  max-md:px-0",
      sm: "px-6  max-lg:px-6  max-md:px-2",
      md: "px-8  max-lg:px-6  max-md:px-4",
      lg: "px-10 max-lg:px-8  max-md:px-6",
      xl: "px-12 max-lg:px-10 max-md:px-8",
    })
    .build();

export const Container: React.FC<LayoutComponentProps> = (props) =>
  componentBuilder(props, "div", "flex flex-col mx-auto w-full")
    .withCentered(centeredClasses)
    .withSizes({
      xs: "max-w-3xl gap-2  max-lg:gap-1",
      sm: "max-w-4xl gap-4  max-lg:gap-3 max-md:gap-2",
      md: "max-w-5xl gap-6  max-lg:gap-5 max-md:gap-4",
      lg: "max-w-6xl gap-8  max-lg:gap-7 max-md:gap-6",
      xl: "max-w-7xl gap-10 max-lg:gap-9 max-md:gap-8",
    })
    .build();

const commonGaps = {
  xs: "gap-1",
  sm: "gap-2 max-lg:gap-1",
  md: "gap-4 max-lg:gap-3 max-md:gap-2",
  lg: "gap-6 max-lg:gap-5 max-md:gap-4",
  xl: "gap-8 max-lg:gap-7 max-md:gap-6",
}

export const Col: React.FC<ColProps> = (props) =>
  componentBuilder(props, "div", "flex flex-col")
    .withGaps({ noGap: "gap-0" }, commonGaps)
    .withReverse({
      reverse: "flex-col-reverse"
    })
    .withCentered(centeredClasses)
    .build();

export const Row: React.FC<RowProps> = (props) =>
  componentBuilder(props, "div", "flex flex-row")
    .withGaps({ noGap: "gap-0" }, commonGaps)
    .withReverse({
      reverse: "flex-row-reverse"
    })
    .withCentered(centeredClasses)
    .withBreakpoints({
      xsCol: "max-xs:flex-col",
      smCol: "max-sm:flex-col",
      mdCol: "max-md:flex-col",
      lgCol: "max-lg:flex-col",
      xlCol: "max-xl:flex-col"
    })
    .withBooleanProps({
      justifyStart: "justify-start",
      justifyEnd: "justify-end",
      justifyCenter: "justify-center",
      justifyBetween: "justify-between",
      justifyAround: "justify-around",
      justifyEvenly: "justify-evenly",
      justifyStretch: "justify-stretch",
      justifyBaseline: "justify-baseline",
    })
    .build();

const gridGaps = {
  xs: "gap-2",
  sm: "gap-4  max-lg:gap-2",
  md: "gap-6  max-lg:gap-4",
  lg: "gap-8  max-lg:gap-6 max-md:gap-4",
  xl: "gap-10 max-lg:gap-8 max-md:gap-6",
}

export const Grid3: React.FC<GridProps> = (props) =>
  componentBuilder(props, "div", "w-full grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1")
    .withGaps({ noGap: "gap-0" }, gridGaps)
    .build();

export const Grid4: React.FC<GridProps> = (props) =>
  componentBuilder(props, "div", "w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1")
    .withGaps({ noGap: "gap-0" }, gridGaps)
    .build();

