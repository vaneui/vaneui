import { JSX } from 'react';
import { TypographyComponentProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";
import { CHIP_KEYS } from './props/keys';

export const Chip = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.chip} propsToOmit={CHIP_KEYS} {...props} />
};
