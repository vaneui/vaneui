import { JSX } from 'react';
import { componentBuilder } from '../utils/componentBuilder';
import { TypographyComponentProps } from './props/props';
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';
import { TYPOGRAPHY_COMPONENT_KEYS } from './props/propKeys';
import { TypographyComponentTheme } from "./theme/typographyComponentTheme";

const buildTypographyComponent = (props: TypographyComponentProps, theme: TypographyComponentTheme, defaultTag: string): JSX.Element => {
  const { cleanProps, tag, baseClasses, modeClasses } = useComponentClasses(
    props,
    theme,
    TYPOGRAPHY_COMPONENT_KEYS
  );
  return componentBuilder(cleanProps, tag ?? defaultTag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
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
