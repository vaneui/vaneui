import { JSX } from 'react';
import { CardProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { borderAppearanceClasses, layoutBackgroundAppearanceClasses } from "./classes/appearanceClasses";
import { itemsClasses, roundedClasses, directionClasses, rowToColumnBreakpointClasses } from "./classes/layoutClasses";
import { commonGaps } from "./classes/spacingClasses";
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

  return componentBuilder(directionProps, "div", "flex border overflow-hidden")
    .withClasses(itemsClasses)
    .withPadding()
    .withGaps()
    .withAppearance(layoutBackgroundAppearanceClasses, {default: true})
    .withBorder(borderAppearanceClasses, roundedClasses, cardBorderSettings)
    .withShadow()
    .withClasses(rowToColumnBreakpointClasses)
    .withClasses(directionClasses, {column: true})
    .build();
};
