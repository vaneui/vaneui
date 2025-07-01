import { JSX } from 'react';
import { SectionProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";
import { SECTION_KEYS } from './props/keys';

export const Section = (props: SectionProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.section} propsToOmit={SECTION_KEYS} {...props} />
};
