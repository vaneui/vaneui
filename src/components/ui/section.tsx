import { JSX } from 'react';
import { SectionProps } from './props/props';
import { ThemedComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { SECTION_KEYS } from './props/keys';

export const Section = (props: SectionProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.section} propsToOmit={SECTION_KEYS} {...props} />
};
