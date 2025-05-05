import { JSX } from 'react';
import { GridProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';
import { GRID_KEYS } from './props/propKeys';

export const Grid4 = (props: GridProps): JSX.Element => {
  const theme = useTheme();
  const grid4Theme = theme.grid4;

  // Use the common component classes hook with grid4-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    grid4Theme,
    GRID_KEYS
  );

  // Override the default tag to be "div" for grid4
  const tag = props.tag ?? "div";

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};
