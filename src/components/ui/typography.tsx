import { JSX } from 'react';
import { TypographyComponentProps } from './props/props';
import { useTheme } from '../theme';
import { ThemedComponent } from "../utils/buildComponent";
import { TYPOGRAPHY_COMPONENT_KEYS } from "./props/keys";

export const PageTitle = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.pageTitle} propsToOmit={TYPOGRAPHY_COMPONENT_KEYS} {...props} />
};

export const SectionTitle = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.sectionTitle} propsToOmit={TYPOGRAPHY_COMPONENT_KEYS} {...props} />
};

export const Title = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.title} propsToOmit={TYPOGRAPHY_COMPONENT_KEYS} {...props} />
};

export const Text = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.text} propsToOmit={TYPOGRAPHY_COMPONENT_KEYS} {...props} />
};

export const Link = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.link} propsToOmit={TYPOGRAPHY_COMPONENT_KEYS} {...props} />
};

export const ListItem = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.listItem} propsToOmit={TYPOGRAPHY_COMPONENT_KEYS} {...props} />
};

export const List = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.list} propsToOmit={TYPOGRAPHY_COMPONENT_KEYS} {...props} />
};
