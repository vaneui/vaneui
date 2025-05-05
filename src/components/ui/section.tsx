import { JSX } from 'react';
import { LayoutComponentProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';
import { SECTION_KEYS } from './props/propKeys';

export const Section = (props: LayoutComponentProps): JSX.Element => {
  const theme = useTheme();
  const sectionTheme = theme.section;

  // Use the common component classes hook with section-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    sectionTheme,
    SECTION_KEYS
  );

  // Override the default tag to be "section" for sections
  const tag = props.tag ?? "section";

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};
