import { JSX } from 'react';
import { GridProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';
import { GRID_KEYS } from './props/propKeys';

export const Grid3 = (props: GridProps): JSX.Element => {
  const theme = useTheme();
  const grid3Theme = theme.grid3;

  // Use the common component classes hook with grid3-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    grid3Theme,
    GRID_KEYS
  );

  // Override the default tag to be "div" for grid3
  const tag = props.tag ?? "div";

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};
