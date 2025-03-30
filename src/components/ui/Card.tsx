import { JSX } from 'react';
import { CardProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { borderAppearanceClasses, layoutBackgroundAppearanceClasses } from "./props/appearanceValues";
import { commonGaps, roundedClasses } from "./props/layoutValues";
import { BorderSettings } from './settings/settings';

// Border settings for Card
const cardBorderSettings: BorderSettings = {
  color: { default: true },
  radius: {
    rounded: { md: true },
    pill: false,
    sharp: false
  }
};

export const Card = (props: CardProps): JSX.Element =>
  componentBuilder(props, "div", "flex flex-col border shadow-sm overflow-hidden")
    .withItems()
    .withPadding()
    .withGaps(commonGaps, { md: true })
    .withAppearance(layoutBackgroundAppearanceClasses, { default: true })
    .withBorder(borderAppearanceClasses, roundedClasses, cardBorderSettings)
    .withNoShadow()
    .withNoPadding()
    .build();
