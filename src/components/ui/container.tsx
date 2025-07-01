import { JSX } from 'react';
import { ContainerProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";
import { CONTAINER_KEYS } from './props/keys';

export const Container = (props: ContainerProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.container} propsToOmit={CONTAINER_KEYS} {...props} />
};
