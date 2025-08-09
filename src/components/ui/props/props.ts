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

// Helper types
type NativeProps<E extends React.ElementType> = React.ComponentPropsWithoutRef<E>;
type Base = { className?: string; children?: React.ReactNode; tag?: React.ReactNode | string | any };
type Cats<T extends ReadonlyArray<ComponentCategoryKey>> = ComponentPropsFromCategories<T>;

// Linkable helper type - component can be either native element or anchor with href
export type Linkable<E extends React.ElementType, Own = {}> =
  | (Own & Omit<NativeProps<E>, keyof Own | "href"> & { href?: never })
  | (Own & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof Own> & { href: string });

// Component-specific prop interfaces using new pattern
// Linkable components (can render as native element or anchor with href)
export type ButtonProps = Linkable<"button", Base> & Cats<typeof BUTTON_CATEGORIES>;
export type BadgeProps = Linkable<"span", Base> & Cats<typeof BADGE_CATEGORIES>;
export type ChipProps = Linkable<"span", Base> & Cats<typeof CHIP_CATEGORIES>;
export type GridProps = Linkable<"div", Base> & Cats<typeof GRID_CATEGORIES>;
export type RowProps = Linkable<"div", Base> & Cats<typeof ROW_CATEGORIES>;
export type ColProps = Linkable<"div", Base> & Cats<typeof COL_CATEGORIES>;
export type CardProps = Linkable<"div", Base> & Cats<typeof CARD_CATEGORIES>;
export type StackProps = Linkable<"div", Base> & Cats<typeof STACK_CATEGORIES>;
export type SectionProps = Linkable<"div", Base> & Cats<typeof SECTION_CATEGORIES>;
export type ContainerProps = Linkable<"div", Base> & Cats<typeof CONTAINER_CATEGORIES>;
export type TypographyProps = Linkable<"span", Base> & Cats<typeof TYPOGRAPHY_CATEGORIES>;

// Pure (non-linkable) components
export type DividerProps = (Base & React.HTMLAttributes<HTMLDivElement>) & Cats<typeof DIVIDER_CATEGORIES>;
export type CodeProps = (Base & React.HTMLAttributes<HTMLElement>) & Cats<typeof CODE_CATEGORIES>;
export type ListProps = (Base & React.HTMLAttributes<HTMLElement>) & Cats<typeof LIST_CATEGORIES>;
export type CheckboxProps = (Base & React.InputHTMLAttributes<HTMLInputElement>) & Cats<typeof CHECKBOX_CATEGORIES>;
export type LabelProps = (Base & React.LabelHTMLAttributes<HTMLLabelElement>) & Cats<typeof LABEL_CATEGORIES>;
export type ImgProps = (Base & React.ImgHTMLAttributes<HTMLImageElement>) & Cats<typeof IMG_CATEGORIES>;

// Legacy types for backward compatibility
export type LinkProps = TypographyProps;
export type ComponentProps = Base & React.HTMLAttributes<HTMLElement>;
