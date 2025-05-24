import { JSX } from 'react';
import { TypographyComponentProps } from './props/props';
import { useTheme } from '../theme';
import { ComponentTheme } from "./theme/common/ComponentTheme";

const buildTypographyComponent = (
  props: TypographyComponentProps,
  theme: ComponentTheme<TypographyComponentProps>,
  defaultTag: string
): JSX.Element => {
  const propsWithDefaultTag = {...props, tag: props.tag ?? defaultTag};
  return theme.createElement(propsWithDefaultTag);
};

export const PageTitle = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return buildTypographyComponent(props, theme.pageTitle, "h1");
};

export const SectionTitle = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return buildTypographyComponent(props, theme.sectionTitle, "h2");
};

export const Title = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return buildTypographyComponent(props, theme.title, "h3");
};

export const Text = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return buildTypographyComponent(props, theme.text, "p");
};

export const Link = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return buildTypographyComponent(props, theme.link, "a");
};

export const ListItem = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return buildTypographyComponent(props, theme.listItem, "li");
};

export const List = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return buildTypographyComponent(props, theme.list, "ul");
};
