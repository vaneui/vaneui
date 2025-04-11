import { JSX } from 'react';
import { CardProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { borderAppearanceClasses, layoutBackgroundAppearanceClasses } from "./classes/appearanceClasses";
import {
  itemsClasses,
  roundedClasses,
  directionClasses,
  rowToColumnBreakpointClasses,
  shadowClasses
} from "./classes/layoutClasses";
import { commonGaps, pxClasses, pyClasses } from "./classes/spacingClasses";
import { BorderSettings } from './settings/borderSettings';

// Border settings for Card
const cardBorderSettings: BorderSettings = {
  color: {default: true},
  radius: {
    rounded: {md: true},
    pill: false,
    sharp: false
  },
  noBorder: false
};

export const Card = (props: CardProps): JSX.Element => {
  const defaultDirection = !props.row && !props.column ? {column: true} : {};
  const directionProps = {...defaultDirection, ...props};

  return componentBuilder(directionProps, "div", "flex overflow-hidden")
    .withClasses(itemsClasses)
    .withPadding(pxClasses, pyClasses)
    .withGaps(commonGaps)
    .withAppearance(layoutBackgroundAppearanceClasses, {default: true})
    .withBorder(borderAppearanceClasses, roundedClasses, cardBorderSettings, 'base', 'border')
    .withShadow(shadowClasses)
    .withClasses(rowToColumnBreakpointClasses)
    .withClasses(directionClasses, {column: true})
    .build();
};
