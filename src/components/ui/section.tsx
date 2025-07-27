import { JSX } from 'react';
import { SectionProps, SECTION_PROPS_TO_OMIT } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Section = (props: SectionProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.section} propsToOmit={SECTION_PROPS_TO_OMIT} {...props} />
};
