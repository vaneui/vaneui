import { JSX } from 'react';
import { SectionProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Section = (props: SectionProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.section} {...props} />
};
