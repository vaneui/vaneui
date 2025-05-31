import { JSX } from 'react';
import { TypographyComponentProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { CHIP_KEYS } from './props/keys';

export const Chip = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  const chipTheme = theme.chip;
  return buildComponent(props, chipTheme, CHIP_KEYS);
};
