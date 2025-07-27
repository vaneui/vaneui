import { JSX } from 'react';
import { CardProps, CARD_PROPS_TO_OMIT } from "./props/props";
import { ThemedComponent } from "../themedComponent";
import { useTheme } from "../themeContext";

export const Card = (props: CardProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.card} propsToOmit={CARD_PROPS_TO_OMIT} {...props} />
};
