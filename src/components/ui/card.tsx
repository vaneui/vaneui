import { JSX } from 'react';
import { CardProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { borderAppearanceClasses, layoutBackgroundAppearanceClasses } from "./props/appearanceValues";
import { commonGaps, itemsClasses, roundedClasses } from "./props/layoutValues";
import { BorderSettings } from './settings/settings';

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
