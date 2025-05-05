import { JSX } from 'react';
import { LayoutComponentProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';
import { CONTAINER_KEYS } from './props/propKeys';

export const Container = (props: LayoutComponentProps): JSX.Element => {
  const theme = useTheme();
  const containerTheme = theme.container;

  // Use the common component classes hook with container-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    containerTheme,
    CONTAINER_KEYS
  );

  // Override the default tag to be "div" for containers
  const tag = props.tag ?? "div";

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};
