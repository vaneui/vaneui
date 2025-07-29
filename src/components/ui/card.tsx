import { JSX } from 'react';
import { CardProps } from "./props/props";
import { ThemedComponent } from "../themedComponent";
import { useTheme } from "../themeContext";

export const Card = (props: CardProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.card} {...props} />
};
