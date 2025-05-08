import { JSX } from 'react';
import { LayoutComponentProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { SECTION_KEYS } from './props/propKeys';

export const Section = (props: LayoutComponentProps): JSX.Element => {
  const theme = useTheme();
  const sectionTheme = theme.section;

  // Override the default tag to be "section" for sections
  const propsWithDefaultTag = { ...props, tag: props.tag ?? "section" };

  return componentBuilder(propsWithDefaultTag, sectionTheme, SECTION_KEYS).build();
};
