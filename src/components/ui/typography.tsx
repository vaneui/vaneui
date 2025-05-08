import { JSX } from 'react';
import { componentBuilder } from '../utils/componentBuilder';
import { TypographyComponentProps } from './props/props';
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';
import { TYPOGRAPHY_COMPONENT_KEYS } from './props/propKeys';

export const PageTitle = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  const pageTitleTheme = theme.pageTitle;

  // Use the common component classes hook with page title-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    pageTitleTheme,
    TYPOGRAPHY_COMPONENT_KEYS
  );

  // Override the default tag to be "h1" for page titles
  const tag = props.tag ?? "h1";

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};

export const SectionTitle = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  const sectionTitleTheme = theme.sectionTitle;

  // Use the common component classes hook with section title-specific defaults
  const { cleanProps, tag, baseClasses, modeClasses } = useComponentClasses(
    props,
    sectionTitleTheme,
    TYPOGRAPHY_COMPONENT_KEYS
  );

  return componentBuilder(cleanProps, tag ?? "h2")
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};

export const Title = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  const titleTheme = theme.title;

  // Use the common component classes hook with title-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    titleTheme,
    TYPOGRAPHY_COMPONENT_KEYS
  );

  // Override the default tag to be "h3" for titles
  const tag = props.tag ?? "h3";

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};

export const Text = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  const textTheme = theme.text;

  // Use the common component classes hook with text-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    textTheme,
    TYPOGRAPHY_COMPONENT_KEYS
  );

  // Override the default tag to be "p" for text
  const tag = props.tag ?? "p";

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};

export const Link = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  const linkTheme = theme.link;

  // Use the common component classes hook with link-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    linkTheme,
    TYPOGRAPHY_COMPONENT_KEYS
  );

  // Override the default tag to be "a" for links
  const tag = props.tag ?? "a";

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};

export const ListItem = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  const listItemTheme = theme.listItem;

  // Use the common component classes hook with list item-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    listItemTheme,
    TYPOGRAPHY_COMPONENT_KEYS
  );

  // Override the default tag to be "li" for list items
  const tag = props.tag ?? "li";

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};

export const List = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  const listTheme = theme.list;

  // Use the common component classes hook with list-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    listTheme,
    TYPOGRAPHY_COMPONENT_KEYS
  );

  // Override the default tag to be "ul" for lists
  const tag = props.tag ?? "ul";

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};
