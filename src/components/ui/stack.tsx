import { JSX } from 'react';
import { StackProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { layoutBackgroundAppearanceClasses } from "./classes/appearanceClasses";
import {
  itemsClasses,
  justifyClasses,
  rowToColumnBreakpointClasses,
  directionClasses,
  wrapClasses
} from "./classes/layoutClasses";
import {
  commonGaps, pxClasses, pyClasses
} from "./classes/spacingClasses";

export const Stack = (props: StackProps): JSX.Element => {
  const defaultDirection = !props.row && !props.column ? {column: true} : {};
  const directionProps = {...defaultDirection, ...props};

  return componentBuilder(directionProps, "div", "flex")
    .withGaps(commonGaps)
    .withClasses({
      reverse: props.row ? "flex-row-reverse" : "flex-col-reverse"
    })
    .withClasses(itemsClasses)
    .withClasses(rowToColumnBreakpointClasses)
    .withPadding(pxClasses, pyClasses)
    .withClasses(justifyClasses)
    .withClasses(directionClasses, {column: true})
    .withAppearance(layoutBackgroundAppearanceClasses, {transparent: true})
    .withClasses(wrapClasses)
    .build();
};
