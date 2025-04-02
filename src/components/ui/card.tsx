import { JSX } from 'react';
import { CardProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { borderAppearanceClasses, layoutBackgroundAppearanceClasses } from "./classes/appearanceValues";
import { itemsClasses, roundedClasses } from "./classes/layoutClasses";
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

export const Card = (props: CardProps): JSX.Element =>
  componentBuilder(props, "div", "flex flex-col border overflow-hidden")
    .withClasses(itemsClasses)
    .withPadding()
    .withGaps()
    .withAppearance(layoutBackgroundAppearanceClasses, {default: true})
    .withBorder(borderAppearanceClasses, roundedClasses, cardBorderSettings)
    .withShadow()
    .build();
