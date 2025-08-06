import { JSX } from 'react';
import { LabelProps } from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

export const Label = (props: LabelProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.label} {...props} />;
};