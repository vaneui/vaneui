import { JSX } from 'react';
import { TypographyProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";
import { CHIP_KEYS } from './props/keys';

export const Chip = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.chip} propsToOmit={CHIP_KEYS} {...props} />
};
