import { JSX } from 'react';
import { TypographyComponentProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { CHIP_KEYS } from './props/propKeys';

export const Chip = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  const chipTheme = theme.chip;

  // Override the default tag to be "span" for chips
  const propsWithDefaultTag = { ...props, tag: props.tag ?? "span" };

  return componentBuilder(propsWithDefaultTag, chipTheme, CHIP_KEYS).build();
};
