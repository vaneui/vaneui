import { JSX } from 'react';
import { ChipProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Chip = (props: ChipProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.chip} {...props} />
};
