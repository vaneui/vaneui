import { JSX } from 'react';
import { ColProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { layoutBackgroundAppearanceClasses } from "./props/appearanceValues";
import { commonGaps } from "./props/layoutValues";

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
    .withReverse({
      reverse: "flex-col-reverse"
    })
    .withItems()
    .withAppearance(layoutBackgroundAppearanceClasses, { transparent: true })
    .withJustifyContent()
    .withWrap()
    .build();