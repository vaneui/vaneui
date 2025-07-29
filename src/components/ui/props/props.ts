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
 * Creates component props by extracting keys from categories and making them optional boolean properties.
 * Combines the functionality of FlattenKeysFromCategories and BooleanProps.
 * @template T - A readonly array of keys from COMPONENT_PROPS_CATEGORY.
 */
type ComponentPropsFromCategories<T extends ReadonlyArray<ComponentCategoryKey>> = {
  [K in {
    [Cat in T[number]]: (typeof ComponentKeys)[Cat][number]
  }[T[number]]]?: boolean;
};

export type ComponentProps = {
  tag?: React.ReactNode | string | any;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLProps<HTMLElement>;

// Component-specific prop interfaces generated from ComponentKeys
export interface ButtonProps extends ComponentProps, ComponentPropsFromCategories<typeof BUTTON_CATEGORIES> {}
export interface BadgeProps extends ComponentProps, ComponentPropsFromCategories<typeof BADGE_CATEGORIES> {}
export interface ChipProps extends ComponentProps, ComponentPropsFromCategories<typeof CHIP_CATEGORIES> {}
export interface GridProps extends ComponentProps, ComponentPropsFromCategories<typeof GRID_CATEGORIES> {}
export interface RowProps extends ComponentProps, ComponentPropsFromCategories<typeof ROW_CATEGORIES> {}
export interface ColProps extends ComponentProps, ComponentPropsFromCategories<typeof COL_CATEGORIES> {}
export interface CardProps extends ComponentProps, ComponentPropsFromCategories<typeof CARD_CATEGORIES> {}
export interface StackProps extends ComponentProps, ComponentPropsFromCategories<typeof STACK_CATEGORIES> {}
export interface SectionProps extends ComponentProps, ComponentPropsFromCategories<typeof SECTION_CATEGORIES> {}
export interface DividerProps extends ComponentProps, ComponentPropsFromCategories<typeof DIVIDER_CATEGORIES> {}
export interface ContainerProps extends ComponentProps, ComponentPropsFromCategories<typeof CONTAINER_CATEGORIES> {}
export interface TypographyProps extends ComponentProps, ComponentPropsFromCategories<typeof TYPOGRAPHY_CATEGORIES> {}
export interface ListProps extends ComponentProps, ComponentPropsFromCategories<typeof LIST_CATEGORIES> {}