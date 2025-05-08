import { JSX } from 'react';
import { CardProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { useTheme } from '../theme';
import { CARD_KEYS } from './props/propKeys';

export const Card = (props: CardProps): JSX.Element => {
  const theme = useTheme();
  const cardTheme = theme.card;

  return componentBuilder(props, cardTheme, CARD_KEYS).build();
};
