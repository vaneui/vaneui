import { JSX } from 'react';
import { TypographyComponentProps } from './props/props';
import { useTheme } from '../theme';
import { ComponentTheme } from "./theme/common/ComponentTheme";
import { buildComponent } from "../utils/buildComponent";
import { STACK_KEYS, TYPOGRAPHY_COMPONENT_KEYS } from "./props/keys";

export const PageTitle = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return buildComponent(props, theme.pageTitle, TYPOGRAPHY_COMPONENT_KEYS);
};

export const SectionTitle = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return buildComponent(props, theme.sectionTitle, TYPOGRAPHY_COMPONENT_KEYS);
};

export const Title = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return buildComponent(props, theme.title, TYPOGRAPHY_COMPONENT_KEYS);
};

export const Text = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return buildComponent(props, theme.text, TYPOGRAPHY_COMPONENT_KEYS);
};

export const Link = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return buildComponent(props, theme.link, TYPOGRAPHY_COMPONENT_KEYS);
};

export const ListItem = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return buildComponent(props, theme.listItem, TYPOGRAPHY_COMPONENT_KEYS);
};

export const List = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  return buildComponent(props, theme.list, TYPOGRAPHY_COMPONENT_KEYS);
};
