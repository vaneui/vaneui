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
import type { InputErrorIconTheme } from './ui/input/InputErrorIconTheme';
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
import type { InputProps, InputErrorIconProps } from "./ui/input";
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
// type-only import: ComponentKeys is referenced exclusively in `typeof` type
// queries below, so nothing is emitted at runtime
import type { ComponentKeys, ComponentCategoryKey } from "./ui/props/keys";

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
  inputErrorIcon: ComponentTheme<InputErrorIconProps, InputErrorIconTheme>;
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

// ---------------------------------------------------------------------------
// Derived customization types
//
// ThemeProps above is the single source of truth for the theme tree shape.
// ThemeDefaults and ThemeExtraClasses are DERIVED from it with the recursive
// mapped types below: every ComponentTheme<P, T> leaf maps to its
// customization payload, and nested sub-theme records (button.main,
// modal.content, ...) recurse. A component or sub-theme added to (or removed
// from) ThemeProps is reflected in both types by construction — there is no
// hand-written mirror left to drift out of sync.
// ---------------------------------------------------------------------------

/** Boolean prop flags of a component's props type, as an all-boolean bag. */
type BooleanKeys<T> = {
  [K in keyof T as T[K] extends boolean | undefined ? K : never]: boolean;
};

/**
 * Every flag the category engine can extract: the union of all values of all
 * categories in ComponentKeys ('primary', 'md', 'filled', 'disabled', ...).
 */
type CategoryFlagKey = (typeof ComponentKeys)[ComponentCategoryKey][number];

/**
 * themeDefaults payload for one component: any of its boolean props. This is
 * intentionally the full boolean key space of P (category flags plus boolean
 * props like Button's `loading`) — defaults merge into
 * ComponentTheme.defaults, which is consulted by the category extractor and
 * passed to tagFunction.
 */
type ThemeDefaultsLeaf<P> = Partial<BooleanKeys<P>>;

/**
 * extraClasses payload for one component: extra CSS classes keyed by prop
 * flag. Keys are narrowed to the component's boolean props that some category
 * can actually extract, because the runtime applies extraClasses only to
 * extracted category values (see ComponentTheme.getClasses) — a key no
 * category can produce (e.g. Button's `loading`, NavLink's `active`) is dead
 * configuration, so it is rejected at compile time.
 *
 * Precision note: this narrows to `keys of P ∩ global category-flag union`,
 * not to the flags of the component's exact categories array. ComponentTheme's
 * type parameters do not carry the categories tuple (the constructor argument
 * is widened to `readonly ComponentCategoryKey[]` and stored privately), so
 * per-component category narrowing would require either a third ComponentTheme
 * type parameter threaded through every theme file or a hand-written
 * path→categories type map — the kind of mirror this derivation exists to
 * delete. In practice each Props type mirrors its categories array (the
 * categories⊆props direction is compile-time enforced by
 * propsCategoriesAlignment.test.ts), so the residual over-acceptance is
 * limited to flags whose prop interface is on P while the category is absent
 * from the component's categories array.
 */
type ThemeExtraClassesLeaf<P> = Partial<Record<Extract<keyof BooleanKeys<P>, CategoryFlagKey>, string>>;

/** Recursive walk of a ThemeProps subtree mapping every theme leaf to its themeDefaults payload. */
type DeriveThemeDefaults<T> = {
  [K in keyof T]?: T[K] extends ComponentTheme<infer P, object>
    ? ThemeDefaultsLeaf<P>
    : DeriveThemeDefaults<T[K]>;
};

/** Recursive walk of a ThemeProps subtree mapping every theme leaf to its extraClasses payload. */
type DeriveThemeExtraClasses<T> = {
  [K in keyof T]?: T[K] extends ComponentTheme<infer P, object>
    ? ThemeExtraClassesLeaf<P>
    : DeriveThemeExtraClasses<T[K]>;
};

/**
 * Per-component default boolean props, applied via ThemeProvider's
 * `themeDefaults` prop. Derived from ThemeProps (see above).
 */
export type ThemeDefaults = DeriveThemeDefaults<ThemeProps>;

/**
 * Per-component extra CSS classes keyed by category flag, applied via
 * ThemeProvider's `extraClasses` prop. Derived from ThemeProps (see above).
 */
export type ThemeExtraClasses = DeriveThemeExtraClasses<ThemeProps>;

export type MergeStrategy = 'merge' | 'replace';

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: PartialTheme;
  themeDefaults?: ThemeDefaults;
  extraClasses?: ThemeExtraClasses;
  themeOverride?: (theme: ThemeProps) => ThemeProps;
  mergeStrategy?: MergeStrategy;
}
