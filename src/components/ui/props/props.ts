import React from "react";
import { 
  ComponentKeys,
  ComponentCategoryKey,
  BUTTON_CATEGORIES,
  BADGE_CATEGORIES,
  CHIP_CATEGORIES,
  GRID_CATEGORIES,
  ROW_CATEGORIES,
  COL_CATEGORIES,
  CARD_CATEGORIES,
  STACK_CATEGORIES,
  SECTION_CATEGORIES,
  DIVIDER_CATEGORIES,
  CONTAINER_CATEGORIES,
  TYPOGRAPHY_CATEGORIES,
  LIST_CATEGORIES
} from './keys';

/**
 * Extracts a union of all string literals from a given set of component categories.
 * @template T - A readonly array of keys from COMPONENT_PROPS_CATEGORY.
 */
type FlattenKeysFromCategories<T extends ReadonlyArray<ComponentCategoryKey>> = {
  // 1. Map over the input categories `T` (e.g., ['size', 'hide']).
  [K in T[number]]: 
    // 2. For each category, look up its corresponding array of keys in `ComponentKeys`.
    (typeof ComponentKeys)[K][number] 
    // 3. Extract the union of all values from the resulting object.
}[T[number]];

/**
 * Creates a type with optional boolean properties from a union of string literals.
 * @template T - A union of string literals.
 */
type CreateBooleanProps<T extends string> = {
  [K in T]?: boolean;
};

export type ComponentProps = {
  tag?: React.ReactNode | string | any;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLProps<HTMLElement>;

// Component-specific prop interfaces generated from ComponentKeys
type ButtonKey = FlattenKeysFromCategories<typeof BUTTON_CATEGORIES>;
export interface ButtonProps extends ComponentProps, CreateBooleanProps<ButtonKey> {}
export const BUTTON_PROPS_TO_OMIT: readonly ButtonKey[] = BUTTON_CATEGORIES.flatMap(category => ComponentKeys[category]) as readonly ButtonKey[];

type BadgeKey = FlattenKeysFromCategories<typeof BADGE_CATEGORIES>;
export interface BadgeProps extends ComponentProps, CreateBooleanProps<BadgeKey> {}
export const BADGE_PROPS_TO_OMIT: readonly BadgeKey[] = BADGE_CATEGORIES.flatMap(category => ComponentKeys[category]) as readonly BadgeKey[];

type ChipKey = FlattenKeysFromCategories<typeof CHIP_CATEGORIES>;
export interface ChipProps extends ComponentProps, CreateBooleanProps<ChipKey> {}
export const CHIP_PROPS_TO_OMIT: readonly ChipKey[] = CHIP_CATEGORIES.flatMap(category => ComponentKeys[category]) as readonly ChipKey[];

type GridKey = FlattenKeysFromCategories<typeof GRID_CATEGORIES>;
export interface GridProps extends ComponentProps, CreateBooleanProps<GridKey> {}
export const GRID_PROPS_TO_OMIT: readonly GridKey[] = GRID_CATEGORIES.flatMap(category => ComponentKeys[category]) as readonly GridKey[];

type RowKey = FlattenKeysFromCategories<typeof ROW_CATEGORIES>;
export interface RowProps extends ComponentProps, CreateBooleanProps<RowKey> {}
export const ROW_PROPS_TO_OMIT: readonly RowKey[] = ROW_CATEGORIES.flatMap(category => ComponentKeys[category]) as readonly RowKey[];

type ColKey = FlattenKeysFromCategories<typeof COL_CATEGORIES>;
export interface ColProps extends ComponentProps, CreateBooleanProps<ColKey> {}
export const COL_PROPS_TO_OMIT: readonly ColKey[] = COL_CATEGORIES.flatMap(category => ComponentKeys[category]) as readonly ColKey[];

type CardKey = FlattenKeysFromCategories<typeof CARD_CATEGORIES>;
export interface CardProps extends ComponentProps, CreateBooleanProps<CardKey> {}
export const CARD_PROPS_TO_OMIT: readonly CardKey[] = CARD_CATEGORIES.flatMap(category => ComponentKeys[category]) as readonly CardKey[];

type StackKey = FlattenKeysFromCategories<typeof STACK_CATEGORIES>;
export interface StackProps extends ComponentProps, CreateBooleanProps<StackKey> {}
export const STACK_PROPS_TO_OMIT: readonly StackKey[] = STACK_CATEGORIES.flatMap(category => ComponentKeys[category]) as readonly StackKey[];

type SectionKey = FlattenKeysFromCategories<typeof SECTION_CATEGORIES>;
export interface SectionProps extends ComponentProps, CreateBooleanProps<SectionKey> {}
export const SECTION_PROPS_TO_OMIT: readonly SectionKey[] = SECTION_CATEGORIES.flatMap(category => ComponentKeys[category]) as readonly SectionKey[];

type DividerKey = FlattenKeysFromCategories<typeof DIVIDER_CATEGORIES>;
export interface DividerProps extends ComponentProps, CreateBooleanProps<DividerKey> {}
export const DIVIDER_PROPS_TO_OMIT: readonly DividerKey[] = DIVIDER_CATEGORIES.flatMap(category => ComponentKeys[category]) as readonly DividerKey[];

type ContainerKey = FlattenKeysFromCategories<typeof CONTAINER_CATEGORIES>;
export interface ContainerProps extends ComponentProps, CreateBooleanProps<ContainerKey> {}
export const CONTAINER_PROPS_TO_OMIT: readonly ContainerKey[] = CONTAINER_CATEGORIES.flatMap(category => ComponentKeys[category]) as readonly ContainerKey[];

type TypographyKey = FlattenKeysFromCategories<typeof TYPOGRAPHY_CATEGORIES>;
export interface TypographyProps extends ComponentProps, CreateBooleanProps<TypographyKey> {}
export const TYPOGRAPHY_PROPS_TO_OMIT: readonly TypographyKey[] = TYPOGRAPHY_CATEGORIES.flatMap(category => ComponentKeys[category]) as readonly TypographyKey[];

type ListKey = FlattenKeysFromCategories<typeof LIST_CATEGORIES>;
export interface ListProps extends ComponentProps, CreateBooleanProps<ListKey> {}
export const LIST_PROPS_TO_OMIT: readonly ListKey[] = LIST_CATEGORIES.flatMap(category => ComponentKeys[category]) as readonly ListKey[];