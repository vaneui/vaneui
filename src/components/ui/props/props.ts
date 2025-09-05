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
type Base = { className?: string; children?: React.ReactNode };
type Cats<T extends ReadonlyArray<ComponentCategoryKey>> = ComponentPropsFromCategories<T>;

type ElementOf<E extends React.ElementType> = React.ComponentPropsWithoutRef<E>;

// Mode A: tag-polymorphic (no href allowed)
type WithTag<E extends React.ElementType, Own> =
  Own &
  Omit<ElementOf<E>, keyof Own | "tag" | "href"> & {
    tag?: React.ElementType;
    href?: never;
  };

// Mode B: link mode (href required; tag limited to anchor-like)
type LinkLikeProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type LinkLikeComponent = React.ComponentType<LinkLikeProps>; // e.g. Next.js Link

type LinkBranch<Own> =
  Own &
  Omit<LinkLikeProps, keyof Own | "tag"> & {
    href: string;
    tag?: "a" | LinkLikeComponent;
  };

// Union of the two modes
type TagOrHref<E extends React.ElementType, Own> = WithTag<E, Own> | LinkBranch<Own>;

// Component-specific prop interfaces using TagOrHref pattern
// Components with both tag polymorphism and link mode
export type ButtonProps<E extends React.ElementType = "button"> = 
  TagOrHref<E, Base & Cats<typeof BUTTON_CATEGORIES>>;

export type BadgeProps<E extends React.ElementType = "span"> = 
  TagOrHref<E, Base & Cats<typeof BADGE_CATEGORIES>>;

export type ChipProps<E extends React.ElementType = "span"> = 
  TagOrHref<E, Base & Cats<typeof CHIP_CATEGORIES>>;

export type GridProps<E extends React.ElementType = "div"> = 
  TagOrHref<E, Base & Cats<typeof GRID_CATEGORIES>>;

export type RowProps<E extends React.ElementType = "div"> = 
  TagOrHref<E, Base & Cats<typeof ROW_CATEGORIES>>;

export type ColProps<E extends React.ElementType = "div"> = 
  TagOrHref<E, Base & Cats<typeof COL_CATEGORIES>>;

export type CardProps<E extends React.ElementType = "div"> = 
  TagOrHref<E, Base & Cats<typeof CARD_CATEGORIES>>;

export type StackProps<E extends React.ElementType = "div"> = 
  TagOrHref<E, Base & Cats<typeof STACK_CATEGORIES>>;

export type SectionProps<E extends React.ElementType = "div"> = 
  TagOrHref<E, Base & Cats<typeof SECTION_CATEGORIES>>;

export type ContainerProps<E extends React.ElementType = "div"> = 
  TagOrHref<E, Base & Cats<typeof CONTAINER_CATEGORIES>>;

export type TypographyProps<E extends React.ElementType = "span"> = 
  TagOrHref<E, Base & Cats<typeof TYPOGRAPHY_CATEGORIES>>;

// Pure (non-linkable) components with tag support
export type DividerProps = (Base & React.HTMLAttributes<HTMLDivElement>) & Cats<typeof DIVIDER_CATEGORIES> & { tag?: React.ElementType };
export type CodeProps = (Base & React.HTMLAttributes<HTMLElement>) & Cats<typeof CODE_CATEGORIES> & { tag?: React.ElementType };
export type ListProps = (Base & React.HTMLAttributes<HTMLElement>) & Cats<typeof LIST_CATEGORIES> & { tag?: React.ElementType };
export type CheckboxProps = (Base & React.InputHTMLAttributes<HTMLInputElement>) & Cats<typeof CHECKBOX_CATEGORIES> & { tag?: React.ElementType };
export type LabelProps = (Base & React.LabelHTMLAttributes<HTMLLabelElement>) & Cats<typeof LABEL_CATEGORIES> & { tag?: React.ElementType };
export type ImgProps = (Base & React.ImgHTMLAttributes<HTMLImageElement>) & Cats<typeof IMG_CATEGORIES> & { tag?: React.ElementType };

