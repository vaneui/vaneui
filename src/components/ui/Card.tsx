import { JSX } from 'react';
import { CardProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { borderAppearanceClasses, layoutBackgroundAppearanceClasses } from "./props/appearanceValues";
import { commonGaps, roundedClasses } from "./props/layoutValues";

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