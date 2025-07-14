import { JSX } from 'react';
import { TypographyProps } from './props/props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";
import { TYPOGRAPHY_KEYS } from "./props/keys";

export const PageTitle = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.pageTitle} propsToOmit={TYPOGRAPHY_KEYS} {...props} />
};

export const SectionTitle = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.sectionTitle} propsToOmit={TYPOGRAPHY_KEYS} {...props} />
};

export const Title = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.title} propsToOmit={TYPOGRAPHY_KEYS} {...props} />
};

export const Text = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.text} propsToOmit={TYPOGRAPHY_KEYS} {...props} />
};

export const Link = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.link} propsToOmit={TYPOGRAPHY_KEYS} {...props} />
};

export const ListItem = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.listItem} propsToOmit={TYPOGRAPHY_KEYS} {...props} />
};

export const List = (props: TypographyProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.list} propsToOmit={TYPOGRAPHY_KEYS} {...props} />
};
