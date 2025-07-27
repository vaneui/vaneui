import { JSX } from 'react';
import { ContainerProps, CONTAINER_PROPS_TO_OMIT } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Container = (props: ContainerProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.container} propsToOmit={CONTAINER_PROPS_TO_OMIT} {...props} />
};
