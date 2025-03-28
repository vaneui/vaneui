import { JSX } from 'react';
import { RowProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { layoutBackgroundAppearanceClasses } from "./props/appearanceValues";
import { commonGaps, rowToColumnBreakpointClasses } from "./props/layoutValues";

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