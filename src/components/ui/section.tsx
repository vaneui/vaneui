import { JSX } from 'react';
import { LayoutComponentProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { SECTION_KEYS } from './props/propKeys';

export const Section = (props: LayoutComponentProps): JSX.Element => {
  const theme = useTheme();
  const sectionTheme = theme.section;

  // Override the default tag to be "section" for sections
  const propsWithDefaultTag = { ...props, tag: props.tag ?? "section" };

  return buildComponent(propsWithDefaultTag, sectionTheme, SECTION_KEYS);
};
