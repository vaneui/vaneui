import { JSX } from 'react';
import { SectionProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { SECTION_KEYS } from './props/keys';

export const Section = (props: SectionProps): JSX.Element => {
  const theme = useTheme();
  const sectionTheme = theme.section;
  return buildComponent(props, sectionTheme, SECTION_KEYS);
};
