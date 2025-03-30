import { JSX } from 'react';
import { StackProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { layoutBackgroundAppearanceClasses } from "./props/appearanceValues";
import {
  commonGaps, itemsClasses,
  justifyClasses,
  rowToColumnBreakpointClasses,
  stackDirectionClasses,
  wrapClasses
} from "./props/layoutValues";

export const Stack = (props: StackProps): JSX.Element => {
  const defaultDirection = !props.row && !props.column ? {column: true} : {};
  const directionProps = {...defaultDirection, ...props};

  return componentBuilder(directionProps, "div", "flex")
    .withGaps(commonGaps, {md: true})
    .withClasses({
      reverse: props.row ? "flex-row-reverse" : "flex-col-reverse"
    })
    .withClasses(itemsClasses)
    .withClasses(rowToColumnBreakpointClasses)
    .withPadding()
    .withClasses(justifyClasses)
    .withClasses(stackDirectionClasses, {column: true})
    .withAppearance(layoutBackgroundAppearanceClasses, {transparent: true})
    .withClasses(wrapClasses)
    .build();
};