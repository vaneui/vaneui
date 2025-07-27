import { JSX } from 'react';
import { TypographyProps, ListProps, TYPOGRAPHY_PROPS_TO_OMIT, LIST_PROPS_TO_OMIT } from './props/props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

export const PageTitle = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.pageTitle} propsToOmit={TYPOGRAPHY_PROPS_TO_OMIT} {...props} />
};

export const SectionTitle = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.sectionTitle} propsToOmit={TYPOGRAPHY_PROPS_TO_OMIT} {...props} />
};

export const Title = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.title} propsToOmit={TYPOGRAPHY_PROPS_TO_OMIT} {...props} />
};

export const Text = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.text} propsToOmit={TYPOGRAPHY_PROPS_TO_OMIT} {...props} />
};

export const Link = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.link} propsToOmit={TYPOGRAPHY_PROPS_TO_OMIT} {...props} />
};

export const ListItem = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.listItem} propsToOmit={TYPOGRAPHY_PROPS_TO_OMIT} {...props} />
};

export const List = (props: ListProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.list} propsToOmit={LIST_PROPS_TO_OMIT} {...props} />
};
