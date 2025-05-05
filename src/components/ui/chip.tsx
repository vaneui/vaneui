import { JSX } from 'react';
import { TypographyComponentProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';
import { CHIP_KEYS } from './props/propKeys';

export const Chip = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  const chipTheme = theme.chip;

  // Use the common component classes hook with chip-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    chipTheme,
    CHIP_KEYS
  );

  // Override the default tag to be "span" for chips
  const tag = props.tag ?? "span";

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};
