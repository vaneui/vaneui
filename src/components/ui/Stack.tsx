import { JSX } from 'react';
import { StackProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { layoutBackgroundAppearanceClasses } from "./props/appearanceValues";
import { commonGaps, rowToColumnBreakpointClasses, stackDirectionClasses } from "./props/layoutValues";

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