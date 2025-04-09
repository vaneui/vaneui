import { JSX } from 'react';
import { RowProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { layoutBackgroundAppearanceClasses } from "./classes/appearanceClasses";
import {
  itemsClasses,
  justifyClasses,
  rowToColumnBreakpointClasses,
  wrapClasses
} from "./classes/layoutClasses";
import {
  commonGaps
} from "./classes/spacingClasses";

/**
 * Row component for horizontal layouts.
 * Uses flex-wrap by default and centers items vertically.
 * @param props.wrap - Allows items to wrap (flex-wrap) - default
 * @param props.nowrap - Prevents items from wrapping (flex-nowrap)
 * @param props.wrapReverse - Wraps items onto multiple lines in reverse (flex-wrap-reverse)
 */
export const Row = (props: RowProps): JSX.Element =>
  componentBuilder(props, "div", "flex flex-row")
    .withGaps(commonGaps)
    .withClasses({
      reverse: "flex-row-reverse"
    })
    .withClasses(itemsClasses, { itemsCenter: true })
    .withClasses(rowToColumnBreakpointClasses)
    .withClasses(justifyClasses)
    .withAppearance(layoutBackgroundAppearanceClasses, { transparent: true })
    .withClasses(wrapClasses)
    .build();
