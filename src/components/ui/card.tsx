import { JSX } from 'react';
import { CardProps } from "./props/props";
import { buildComponent } from "../utils/buildComponent";
import { useTheme } from '../theme';
import { CARD_KEYS } from './props/keys';

export const Card = (props: CardProps): JSX.Element => {
  const theme = useTheme();
  const cardTheme = theme.card;

  return buildComponent(props, cardTheme, CARD_KEYS);
};
