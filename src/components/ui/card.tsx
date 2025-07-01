import { JSX } from 'react';
import { CardProps } from "./props/props";
import { ThemedComponent } from "../utils/buildComponent";
import { useTheme } from '../theme';
import { CARD_KEYS } from './props/keys';

export const Card = (props: CardProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.card} propsToOmit={CARD_KEYS} {...props} />
};
