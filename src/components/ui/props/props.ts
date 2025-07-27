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
} & Omit<React.HTMLProps<HTMLElement>, 
  'size' | 'shape' | 'hidden' | 'translate' | 'content' | 'wrap' | 
  'border' | 'color' | 'display' | 'height' | 'width' | 'position' |
  'start' | 'span' | 'slot'
>;

// Component-specific prop interfaces generated from ComponentKeys
type ButtonKey = FlattenKeysFromCategories<typeof BUTTON_CATEGORIES>;
export interface ButtonProps extends ComponentProps, CreateBooleanProps<ButtonKey> {}

type BadgeKey = FlattenKeysFromCategories<typeof BADGE_CATEGORIES>;
export interface BadgeProps extends ComponentProps, CreateBooleanProps<BadgeKey> {}

type ChipKey = FlattenKeysFromCategories<typeof CHIP_CATEGORIES>;
export interface ChipProps extends ComponentProps, CreateBooleanProps<ChipKey> {}

type GridKey = FlattenKeysFromCategories<typeof GRID_CATEGORIES>;
export interface GridProps extends ComponentProps, CreateBooleanProps<GridKey> {}

type RowKey = FlattenKeysFromCategories<typeof ROW_CATEGORIES>;
export interface RowProps extends ComponentProps, CreateBooleanProps<RowKey> {}

type ColKey = FlattenKeysFromCategories<typeof COL_CATEGORIES>;
export interface ColProps extends ComponentProps, CreateBooleanProps<ColKey> {}

type CardKey = FlattenKeysFromCategories<typeof CARD_CATEGORIES>;
export interface CardProps extends ComponentProps, CreateBooleanProps<CardKey> {}

type StackKey = FlattenKeysFromCategories<typeof STACK_CATEGORIES>;
export interface StackProps extends ComponentProps, CreateBooleanProps<StackKey> {}

type SectionKey = FlattenKeysFromCategories<typeof SECTION_CATEGORIES>;
export interface SectionProps extends ComponentProps, CreateBooleanProps<SectionKey> {}

type DividerKey = FlattenKeysFromCategories<typeof DIVIDER_CATEGORIES>;
export interface DividerProps extends ComponentProps, CreateBooleanProps<DividerKey> {}

type ContainerKey = FlattenKeysFromCategories<typeof CONTAINER_CATEGORIES>;
export interface ContainerProps extends ComponentProps, CreateBooleanProps<ContainerKey> {}

type TypographyKey = FlattenKeysFromCategories<typeof TYPOGRAPHY_CATEGORIES>;
export interface TypographyProps extends ComponentProps, CreateBooleanProps<TypographyKey> {}

type ListKey = FlattenKeysFromCategories<typeof LIST_CATEGORIES>;
export interface ListProps extends ComponentProps, CreateBooleanProps<ListKey> {}