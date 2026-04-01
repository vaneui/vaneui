import type React from 'react';
import type { ComponentTheme } from "./ui/theme/common/ComponentTheme";
import type { ButtonTheme } from './ui/button/ButtonTheme';
import type { ButtonSpinnerTheme } from './ui/button/ButtonSpinnerTheme';
import type { BadgeTheme } from './ui/badge/BadgeTheme';
import type { ChipTheme } from './ui/chip/ChipTheme';
import type { CodeTheme } from './ui/code/CodeTheme';
import type { TypographyTheme } from './ui/typography/common/TypographyTheme';
import type { LinkTheme } from './ui/typography/link/LinkTheme';
import type { ListTheme } from './ui/typography/list/ListTheme';
import type { ListItemTheme } from './ui/typography/listItem/ListItemTheme';
import type { CardTheme } from "./ui/card/CardTheme";
import type { CardHeaderTheme } from './ui/card/CardHeaderTheme';
import type { CardBodyTheme } from './ui/card/CardBodyTheme';
import type { CardFooterTheme } from './ui/card/CardFooterTheme';
import type { RowTheme } from "./ui/row/RowTheme";
import type { DividerTheme } from './ui/divider/DividerTheme';
import type { ContainerTheme } from './ui/container/ContainerTheme';
import type { ColTheme } from './ui/col/ColTheme';
import type { StackTheme } from './ui/stack/StackTheme';
import type { SectionTheme } from "./ui/section/SectionTheme";
import type { GridTheme } from "./ui/grid/GridTheme";
import type { CheckboxTheme } from './ui/checkbox/CheckboxTheme';
import type { CheckboxCheckTheme } from './ui/checkbox/CheckboxCheckTheme';
import type { CheckboxIndeterminateTheme } from './ui/checkbox/CheckboxIndeterminateTheme';
import type { CheckboxWrapperTheme } from './ui/checkbox/CheckboxWrapperTheme';
import type { LabelTheme } from './ui/label/LabelTheme';
import type { ImgTheme } from './ui/img/ImgTheme';
import type { InputTheme } from './ui/input/InputTheme';
import type { OverlayTheme } from './ui/overlay/OverlayTheme';
import type { ModalContentTheme } from './ui/modal/ModalContentTheme';
import type { ModalHeaderTheme } from './ui/modal/ModalHeaderTheme';
import type { ModalBodyTheme } from './ui/modal/ModalBodyTheme';
import type { ModalFooterTheme } from './ui/modal/ModalFooterTheme';
import type { ModalCloseButtonTheme } from './ui/modal/ModalCloseButtonTheme';
import type { PopupTheme } from './ui/popup/PopupTheme';
import type { IconButtonTheme } from './ui/iconButton/IconButtonTheme';
import type { IconTheme } from './ui/icon/IconTheme';
import type { KbdTheme } from './ui/kbd/KbdTheme';
import type { MarkTheme } from './ui/mark/MarkTheme';
import type { MenuItemTheme } from './ui/menu/MenuItemTheme';
import type { MenuLabelTheme } from './ui/menu/MenuLabelTheme';
import type { NavLinkTheme } from './ui/navLink/NavLinkTheme';
import type { NavLinkLabelTheme } from './ui/navLink/NavLinkLabelTheme';
import type { BadgeProps } from "./ui/badge/BadgeProps";
import type { ButtonProps } from "./ui/button/ButtonProps";
import type { ButtonSpinnerProps } from "./ui/button/ButtonSpinnerProps";
import type { CardProps } from "./ui/card/CardProps";
import type { CardHeaderProps } from "./ui/card/CardHeaderProps";
import type { CardBodyProps } from "./ui/card/CardBodyProps";
import type { CardFooterProps } from "./ui/card/CardFooterProps";
import type { ChipProps } from "./ui/chip/ChipProps";
import type { CodeProps } from "./ui/code/CodeProps";
import type { ColProps } from "./ui/col";
import type { ContainerProps } from "./ui/container";
import type { DividerProps } from "./ui/divider";
import type { GridProps } from "./ui/grid";
import type { ListProps, TypographyProps } from "./ui/typography";
import type { RowProps } from "./ui/row/RowProps";
import type { SectionProps } from "./ui/section";
import type { StackProps } from "./ui/stack";
import type { CheckboxProps } from "./ui/checkbox";
import type { CheckboxCheckProps } from "./ui/checkbox/CheckboxCheckProps";
import type { CheckboxIndeterminateProps } from "./ui/checkbox/CheckboxIndeterminateProps";
import type { LabelProps } from "./ui/label";
import type { ImgProps } from "./ui/img";
import type { InputProps } from "./ui/input";
import type { OverlayProps } from "./ui/overlay";
import type { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps } from "./ui/modal";
import type { ModalCloseButtonProps } from "./ui/modal/ModalCloseButtonProps";
import type { PopupProps } from "./ui/popup";
import type { IconButtonProps } from "./ui/iconButton/IconButtonProps";
import type { IconProps } from "./ui/icon/IconProps";
import type { KbdProps } from "./ui/kbd/KbdProps";
import type { MarkProps } from "./ui/mark/MarkProps";
import type { MenuItemProps } from "./ui/menu/MenuItemProps";
import type { MenuLabelProps } from './ui/menu/MenuLabelProps';
import type { NavLinkProps } from './ui/navLink/NavLinkProps';
import type { NavLinkLabelProps } from './ui/navLink/NavLinkLabelProps';
import type { DeepPartial } from "./utils/deepPartial";

export interface ThemeProps {
  button: {
    main: ComponentTheme<ButtonProps, ButtonTheme>;
    spinner: ComponentTheme<ButtonSpinnerProps, ButtonSpinnerTheme>;
  };
  iconButton: ComponentTheme<IconButtonProps, IconButtonTheme>;
  badge: ComponentTheme<BadgeProps, BadgeTheme>;
  icon: ComponentTheme<IconProps, IconTheme>;
  chip: ComponentTheme<ChipProps, ChipTheme>;
  code: ComponentTheme<CodeProps, CodeTheme>;
  kbd: ComponentTheme<KbdProps, KbdTheme>;
  mark: ComponentTheme<MarkProps, MarkTheme>;
  card: {
    main: ComponentTheme<CardProps, CardTheme>;
    header: ComponentTheme<CardHeaderProps, CardHeaderTheme>;
    body: ComponentTheme<CardBodyProps, CardBodyTheme>;
    footer: ComponentTheme<CardFooterProps, CardFooterTheme>;
  };
  divider: ComponentTheme<DividerProps, DividerTheme>;
  container: ComponentTheme<ContainerProps, ContainerTheme>;
  row: ComponentTheme<RowProps, RowTheme>;
  col: ComponentTheme<ColProps, ColTheme>;
  stack: ComponentTheme<StackProps, StackTheme>;
  section: ComponentTheme<SectionProps, SectionTheme>;
  grid2: ComponentTheme<GridProps, GridTheme>;
  grid3: ComponentTheme<GridProps, GridTheme>;
  grid4: ComponentTheme<GridProps, GridTheme>;
  grid5: ComponentTheme<GridProps, GridTheme>;
  grid6: ComponentTheme<GridProps, GridTheme>;
  pageTitle: ComponentTheme<TypographyProps, TypographyTheme>;
  sectionTitle: ComponentTheme<TypographyProps, TypographyTheme>;
  title: ComponentTheme<TypographyProps, TypographyTheme>;
  text: ComponentTheme<TypographyProps, TypographyTheme>;
  blockquote: ComponentTheme<TypographyProps, TypographyTheme>;
  link: ComponentTheme<TypographyProps, LinkTheme>;
  listItem: ComponentTheme<TypographyProps, ListItemTheme>;
  list: ComponentTheme<ListProps, ListTheme>;
  checkbox: {
    input: ComponentTheme<CheckboxProps, CheckboxTheme>;
    check: ComponentTheme<CheckboxCheckProps, CheckboxCheckTheme>;
    indeterminate: ComponentTheme<CheckboxIndeterminateProps, CheckboxIndeterminateTheme>;
    wrapper: ComponentTheme<CheckboxProps, CheckboxWrapperTheme>;
  };
  label: ComponentTheme<LabelProps, LabelTheme>;
  img: ComponentTheme<ImgProps, ImgTheme>;
  input: ComponentTheme<InputProps, InputTheme>;
  overlay: ComponentTheme<OverlayProps, OverlayTheme>;
  modal: {
    content: ComponentTheme<ModalProps, ModalContentTheme>;
    overlay: ComponentTheme<OverlayProps, OverlayTheme>;
    header: ComponentTheme<ModalHeaderProps, ModalHeaderTheme>;
    body: ComponentTheme<ModalBodyProps, ModalBodyTheme>;
    footer: ComponentTheme<ModalFooterProps, ModalFooterTheme>;
    closeButton: ComponentTheme<ModalCloseButtonProps, ModalCloseButtonTheme>;
  };
  popup: ComponentTheme<PopupProps, PopupTheme>;
  menu: {
    item: ComponentTheme<MenuItemProps, MenuItemTheme>;
    popup: ComponentTheme<PopupProps, PopupTheme>;
    divider: ComponentTheme<DividerProps, DividerTheme>;
    label: ComponentTheme<MenuLabelProps, MenuLabelTheme>;
  };
  navLink: {
    root: ComponentTheme<NavLinkProps, NavLinkTheme>;
    label: ComponentTheme<NavLinkLabelProps, NavLinkLabelTheme>;
  };
}

export type PartialTheme = DeepPartial<ThemeProps>;

/**
 * Helper type to extract boolean keys from component props.
 * This ensures only valid component prop keys can be used in ThemeDefaults.
 */
type BooleanKeys<T> = {
  [K in keyof T as T[K] extends boolean | undefined ? K : never]: boolean;
};

/**
 * Helper type to get all boolean keys from component props as string-valued keys.
 * This ensures only valid component prop keys can be used in ThemeExtraClasses.
 */
type StringValueKeys<T> = {
  [K in keyof T as T[K] extends boolean | undefined ? K : never]: string;
};

/**
 * Helper types for composite (multi-sub-theme) components.
 * Use these to reduce type repetition when defining components with sub-themes.
 *
 * Example:
 *   type CardSubs = {
 *     main: { props: CardProps; theme: CardTheme };
 *     header: { props: CardHeaderProps; theme: CardHeaderTheme };
 *   };
 *   // In ThemeProps:     card: CompositeTheme<CardSubs>;
 *   // In ThemeDefaults:  card?: CompositeDefaults<CardSubs>;
 *   // In ThemeExtraClasses: card?: CompositeExtraClasses<CardSubs>;
 */
export type CompositeTheme<T extends Record<string, { props: { className?: string; children?: React.ReactNode; tag?: React.ElementType }; theme: object }>> = {
  [K in keyof T]: ComponentTheme<T[K]['props'], T[K]['theme']>;
};

export type CompositeDefaults<T extends Record<string, { props: object; theme: object }>> = {
  [K in keyof T]?: Partial<BooleanKeys<T[K]['props']>>;
};

export type CompositeExtraClasses<T extends Record<string, { props: object; theme: object }>> = {
  [K in keyof T]?: Partial<StringValueKeys<T[K]['props']>>;
};

export type ThemeDefaults = {
  button?: {
    main?: Partial<BooleanKeys<ButtonProps>>;
    spinner?: Partial<BooleanKeys<ButtonSpinnerProps>>;
  };
  iconButton?: Partial<BooleanKeys<IconButtonProps>>;
  badge?: Partial<BooleanKeys<BadgeProps>>;
  icon?: Partial<BooleanKeys<IconProps>>;
  chip?: Partial<BooleanKeys<ChipProps>>;
  code?: Partial<BooleanKeys<CodeProps>>;
  kbd?: Partial<BooleanKeys<KbdProps>>;
  mark?: Partial<BooleanKeys<MarkProps>>;
  card?: {
    main?: Partial<BooleanKeys<CardProps>>;
    header?: Partial<BooleanKeys<CardHeaderProps>>;
    body?: Partial<BooleanKeys<CardBodyProps>>;
    footer?: Partial<BooleanKeys<CardFooterProps>>;
  };
  divider?: Partial<BooleanKeys<DividerProps>>;
  container?: Partial<BooleanKeys<ContainerProps>>;
  row?: Partial<BooleanKeys<RowProps>>;
  col?: Partial<BooleanKeys<ColProps>>;
  stack?: Partial<BooleanKeys<StackProps>>;
  section?: Partial<BooleanKeys<SectionProps>>;
  grid2?: Partial<BooleanKeys<GridProps>>;
  grid3?: Partial<BooleanKeys<GridProps>>;
  grid4?: Partial<BooleanKeys<GridProps>>;
  grid5?: Partial<BooleanKeys<GridProps>>;
  grid6?: Partial<BooleanKeys<GridProps>>;
  pageTitle?: Partial<BooleanKeys<TypographyProps>>;
  sectionTitle?: Partial<BooleanKeys<TypographyProps>>;
  title?: Partial<BooleanKeys<TypographyProps>>;
  text?: Partial<BooleanKeys<TypographyProps>>;
  blockquote?: Partial<BooleanKeys<TypographyProps>>;
  link?: Partial<BooleanKeys<TypographyProps>>;
  list?: Partial<BooleanKeys<ListProps>>;
  listItem?: Partial<BooleanKeys<TypographyProps>>;
  checkbox?: {
    input?: Partial<BooleanKeys<CheckboxProps>>;
    check?: Partial<BooleanKeys<CheckboxCheckProps>>;
    indeterminate?: Partial<BooleanKeys<CheckboxIndeterminateProps>>;
    wrapper?: Partial<BooleanKeys<CheckboxProps>>;
  };
  label?: Partial<BooleanKeys<LabelProps>>;
  img?: Partial<BooleanKeys<ImgProps>>;
  input?: Partial<BooleanKeys<InputProps>>;
  overlay?: Partial<BooleanKeys<OverlayProps>>;
  modal?: {
    content?: Partial<BooleanKeys<ModalProps>>;
    overlay?: Partial<BooleanKeys<OverlayProps>>;
    header?: Partial<BooleanKeys<ModalHeaderProps>>;
    body?: Partial<BooleanKeys<ModalBodyProps>>;
    footer?: Partial<BooleanKeys<ModalFooterProps>>;
    closeButton?: Partial<BooleanKeys<ModalCloseButtonProps>>;
  };
  popup?: Partial<BooleanKeys<PopupProps>>;
  menu?: {
    item?: Partial<BooleanKeys<MenuItemProps>>;
    popup?: Partial<BooleanKeys<PopupProps>>;
    divider?: Partial<BooleanKeys<DividerProps>>;
    label?: Partial<BooleanKeys<MenuLabelProps>>;
  };
  navLink?: {
    root?: Partial<BooleanKeys<NavLinkProps>>;
    label?: Partial<BooleanKeys<NavLinkLabelProps>>;
  };
};

export type ThemeExtraClasses = {
  button?: {
    main?: Partial<StringValueKeys<ButtonProps>>;
    spinner?: Partial<StringValueKeys<ButtonSpinnerProps>>;
  };
  iconButton?: Partial<StringValueKeys<IconButtonProps>>;
  badge?: Partial<StringValueKeys<BadgeProps>>;
  icon?: Partial<StringValueKeys<IconProps>>;
  chip?: Partial<StringValueKeys<ChipProps>>;
  code?: Partial<StringValueKeys<CodeProps>>;
  kbd?: Partial<StringValueKeys<KbdProps>>;
  mark?: Partial<StringValueKeys<MarkProps>>;
  card?: {
    main?: Partial<StringValueKeys<CardProps>>;
    header?: Partial<StringValueKeys<CardHeaderProps>>;
    body?: Partial<StringValueKeys<CardBodyProps>>;
    footer?: Partial<StringValueKeys<CardFooterProps>>;
  };
  divider?: Partial<StringValueKeys<DividerProps>>;
  container?: Partial<StringValueKeys<ContainerProps>>;
  row?: Partial<StringValueKeys<RowProps>>;
  col?: Partial<StringValueKeys<ColProps>>;
  stack?: Partial<StringValueKeys<StackProps>>;
  section?: Partial<StringValueKeys<SectionProps>>;
  grid2?: Partial<StringValueKeys<GridProps>>;
  grid3?: Partial<StringValueKeys<GridProps>>;
  grid4?: Partial<StringValueKeys<GridProps>>;
  grid5?: Partial<StringValueKeys<GridProps>>;
  grid6?: Partial<StringValueKeys<GridProps>>;
  pageTitle?: Partial<StringValueKeys<TypographyProps>>;
  sectionTitle?: Partial<StringValueKeys<TypographyProps>>;
  title?: Partial<StringValueKeys<TypographyProps>>;
  text?: Partial<StringValueKeys<TypographyProps>>;
  blockquote?: Partial<StringValueKeys<TypographyProps>>;
  link?: Partial<StringValueKeys<TypographyProps>>;
  list?: Partial<StringValueKeys<ListProps>>;
  listItem?: Partial<StringValueKeys<TypographyProps>>;
  checkbox?: {
    input?: Partial<StringValueKeys<CheckboxProps>>;
    check?: Partial<StringValueKeys<CheckboxCheckProps>>;
    indeterminate?: Partial<StringValueKeys<CheckboxIndeterminateProps>>;
    wrapper?: Partial<StringValueKeys<CheckboxProps>>;
  };
  label?: Partial<StringValueKeys<LabelProps>>;
  img?: Partial<StringValueKeys<ImgProps>>;
  input?: Partial<StringValueKeys<InputProps>>;
  overlay?: Partial<StringValueKeys<OverlayProps>>;
  modal?: {
    content?: Partial<StringValueKeys<ModalProps>>;
    overlay?: Partial<StringValueKeys<OverlayProps>>;
    header?: Partial<StringValueKeys<ModalHeaderProps>>;
    body?: Partial<StringValueKeys<ModalBodyProps>>;
    footer?: Partial<StringValueKeys<ModalFooterProps>>;
    closeButton?: Partial<StringValueKeys<ModalCloseButtonProps>>;
  };
  popup?: Partial<StringValueKeys<PopupProps>>;
  menu?: {
    item?: Partial<StringValueKeys<MenuItemProps>>;
    popup?: Partial<StringValueKeys<PopupProps>>;
    divider?: Partial<StringValueKeys<DividerProps>>;
    label?: Partial<StringValueKeys<MenuLabelProps>>;
  };
  navLink?: {
    root?: Partial<StringValueKeys<NavLinkProps>>;
    label?: Partial<StringValueKeys<NavLinkLabelProps>>;
  };
};

export type MergeStrategy = 'merge' | 'replace';

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: PartialTheme;
  themeDefaults?: ThemeDefaults;
  extraClasses?: ThemeExtraClasses;
  themeOverride?: (theme: ThemeProps) => ThemeProps;
  mergeStrategy?: MergeStrategy;
}
