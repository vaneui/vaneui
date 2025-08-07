import React from "react";
import { 
  ComponentKeys,
  ComponentCategoryKey,
  BUTTON_CATEGORIES,
  BADGE_CATEGORIES,
  CHIP_CATEGORIES,
  CODE_CATEGORIES,
  GRID_CATEGORIES,
  ROW_CATEGORIES,
  COL_CATEGORIES,
  CARD_CATEGORIES,
  STACK_CATEGORIES,
  SECTION_CATEGORIES,
  DIVIDER_CATEGORIES,
  CONTAINER_CATEGORIES,
  TYPOGRAPHY_CATEGORIES,
  LIST_CATEGORIES,
  CHECKBOX_CATEGORIES,
  LABEL_CATEGORIES,
  IMG_CATEGORIES,
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

// Base component props for different HTML elements
export type BaseComponentProps = {
  tag?: React.ReactNode | string | any;
  className?: string;
  children?: React.ReactNode;
};

// Specific component props for different HTML element types
export type ButtonComponentProps = BaseComponentProps & React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;
export type SpanComponentProps = BaseComponentProps & React.HTMLAttributes<HTMLSpanElement>;
export type DivComponentProps = BaseComponentProps & React.HTMLAttributes<HTMLDivElement>;
export type AnchorComponentProps = BaseComponentProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
export type CheckboxComponentProps = BaseComponentProps & React.InputHTMLAttributes<HTMLInputElement>;
export type LabelComponentProps = BaseComponentProps & React.LabelHTMLAttributes<HTMLLabelElement>;
export type ImgComponentProps = BaseComponentProps & React.ImgHTMLAttributes<HTMLImageElement>;

// Linkable component props - can render as div or anchor based on href presence
export type LinkableDivComponentProps = BaseComponentProps & React.HTMLAttributes<HTMLDivElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;
export type LinkableSpanComponentProps = BaseComponentProps & React.HTMLAttributes<HTMLSpanElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;

// Generic component props for ThemedComponent, ComponentTheme, and Code elements
export type ComponentProps = BaseComponentProps & React.HTMLAttributes<HTMLElement>;

// Component-specific prop interfaces with proper HTML element typing
export interface ButtonProps extends ButtonComponentProps, ComponentPropsFromCategories<typeof BUTTON_CATEGORIES> {}
export interface BadgeProps extends LinkableSpanComponentProps, ComponentPropsFromCategories<typeof BADGE_CATEGORIES> {}
export interface ChipProps extends LinkableSpanComponentProps, ComponentPropsFromCategories<typeof CHIP_CATEGORIES> {}
export interface CodeProps extends ComponentProps, ComponentPropsFromCategories<typeof CODE_CATEGORIES> {}
export interface GridProps extends LinkableDivComponentProps, ComponentPropsFromCategories<typeof GRID_CATEGORIES> {}
export interface RowProps extends LinkableDivComponentProps, ComponentPropsFromCategories<typeof ROW_CATEGORIES> {}
export interface ColProps extends LinkableDivComponentProps, ComponentPropsFromCategories<typeof COL_CATEGORIES> {}
export interface CardProps extends LinkableDivComponentProps, ComponentPropsFromCategories<typeof CARD_CATEGORIES> {}
export interface StackProps extends LinkableDivComponentProps, ComponentPropsFromCategories<typeof STACK_CATEGORIES> {}
export interface SectionProps extends LinkableDivComponentProps, ComponentPropsFromCategories<typeof SECTION_CATEGORIES> {}
export interface DividerProps extends DivComponentProps, ComponentPropsFromCategories<typeof DIVIDER_CATEGORIES> {}
export interface ContainerProps extends LinkableDivComponentProps, ComponentPropsFromCategories<typeof CONTAINER_CATEGORIES> {}
export interface TypographyProps extends ComponentProps, ComponentPropsFromCategories<typeof TYPOGRAPHY_CATEGORIES> {}
export interface LinkProps extends AnchorComponentProps, ComponentPropsFromCategories<typeof TYPOGRAPHY_CATEGORIES> {}
export interface ListProps extends ComponentProps, ComponentPropsFromCategories<typeof LIST_CATEGORIES> {}
export interface CheckboxProps extends CheckboxComponentProps, ComponentPropsFromCategories<typeof CHECKBOX_CATEGORIES> {}
export interface LabelProps extends LabelComponentProps, ComponentPropsFromCategories<typeof LABEL_CATEGORIES> {}
export interface ImgProps extends ImgComponentProps, ComponentPropsFromCategories<typeof IMG_CATEGORIES> {}
