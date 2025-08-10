import { JSX } from 'react';
import { TypographyProps, ListProps } from './props/props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

export const PageTitle = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.pageTitle} {...props} />
};

export const SectionTitle = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.sectionTitle} {...props} />
};

export const Title = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.title} {...props} />
};

export const Text = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.text} {...props} />
};

export const Link = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.link} {...props} />
};

export const ListItem = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.listItem} {...props} />
};

export const List = (props: ListProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.list} {...props} />
};
