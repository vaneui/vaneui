import { JSX } from 'react';
import { ColProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { layoutBackgroundAppearanceClasses } from "./classes/appearanceClasses";
import { itemsClasses, justifyClasses, wrapClasses } from "./classes/layoutClasses";
import { commonGaps } from "./classes/spacingClasses";

/**
 * Column component for vertical layouts.
 * Supports flex-wrap properties for controlling how items wrap.
 * @param props.wrap - Allows items to wrap (flex-wrap)
 * @param props.nowrap - Prevents items from wrapping (flex-nowrap)
 * @param props.wrapReverse - Wraps items onto multiple lines in reverse (flex-wrap-reverse)
 */
export const Col = (props: ColProps): JSX.Element =>
  componentBuilder(props, "div", "flex flex-col")
    .withGaps()
    .withClasses({
      reverse: "flex-col-reverse"
    })
    .withClasses(itemsClasses)
    .withAppearance(layoutBackgroundAppearanceClasses, { transparent: true })
    .withClasses(justifyClasses)
    .withClasses(wrapClasses)
    .build();
