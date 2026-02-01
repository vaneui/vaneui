import React, { forwardRef } from 'react';
import type {
  BaseProps,
  FontWeightProps,
  FontStyleProps,
  TextDecorationProps,
  TextTransformProps,
  FontFamilyProps,
  TextAlignProps,
  SizeProps,
  HideProps,
  ItemsProps,
  JustifyProps,
  PositionProps,
  DisplayProps,
  OverflowProps,
  AppearanceProps,
  VariantProps,
  ListStyleProps,
  PaddingProps,
  TransparentProps,
  ResponsiveProps,
  TruncateProps
} from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

/** Typography component props (for Text, PageTitle, SectionTitle, Title, ListItem) */
export type TypographyProps = BaseProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  TextAlignProps &
  TruncateProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  AppearanceProps &
  VariantProps &
  TransparentProps &
  ResponsiveProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'children'> &
  Partial<Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>> & {
  /** URL to navigate to (renders component as anchor tag) */
  href?: string;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/** Link component props */
export type LinkProps = BaseProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  TextAlignProps &
  TruncateProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  AppearanceProps &
  VariantProps &
  TransparentProps &
  ResponsiveProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'children'> &
  Partial<Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>> & {
  /** URL to navigate to */
  href?: string;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/** List component props */
export type ListProps = BaseProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  TextAlignProps &
  TruncateProps &
  ListStyleProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  AppearanceProps &
  PaddingProps &
  VariantProps &
  Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * A top-level page heading component (h1).
 *
 * Renders the main heading for a page with large, bold typography.
 * Automatically scales down on smaller screens for responsive design.
 * Can be rendered as a link when href prop is provided.
 *
 * @example
 * ```tsx
 * // Basic page title
 * <PageTitle>Welcome to My Site</PageTitle>
 * ```
 *
 * @example
 * ```tsx
 * // Page title with custom styling
 * <PageTitle primary xl>Product Launch</PageTitle>
 * ```
 *
 * @example
 * ```tsx
 * // Page title as a link
 * <PageTitle href="/">Home Page</PageTitle>
 * ```
 *
 * @see {@link TypographyProps} for all available props
 */
export const PageTitle = forwardRef<HTMLHeadingElement, TypographyProps>(
  function PageTitle(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.pageTitle} {...props} />
  }
);

PageTitle.displayName = 'PageTitle';

/**
 * A section heading component (h2).
 *
 * Renders a heading for major sections of content. Medium-large size with
 * responsive scaling on smaller screens. Typically used to divide page
 * content into logical sections.
 *
 * @example
 * ```tsx
 * // Basic section title
 * <SectionTitle>Features</SectionTitle>
 * ```
 *
 * @example
 * ```tsx
 * // Section title with styling
 * <SectionTitle secondary bold>About Us</SectionTitle>
 * ```
 *
 * @example
 * ```tsx
 * // Section title as a link
 * <SectionTitle href="#features">Jump to Features</SectionTitle>
 * ```
 *
 * @see {@link TypographyProps} for all available props
 */
export const SectionTitle = forwardRef<HTMLHeadingElement, TypographyProps>(
  function SectionTitle(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.sectionTitle} {...props} />
  }
);

SectionTitle.displayName = 'SectionTitle';

/**
 * A subsection heading component (h3).
 *
 * Renders a heading for subsections or cards. Medium size with subtle
 * responsive scaling. Use for content organization below section titles.
 *
 * @example
 * ```tsx
 * // Basic title
 * <Title>Getting Started</Title>
 * ```
 *
 * @example
 * ```tsx
 * // Title with custom appearance
 * <Title primary semibold>Installation</Title>
 * ```
 *
 * @example
 * ```tsx
 * // Title as a link
 * <Title href="/docs/intro">Documentation</Title>
 * ```
 *
 * @see {@link TypographyProps} for all available props
 */
export const Title = forwardRef<HTMLHeadingElement, TypographyProps>(
  function Title(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.title} {...props} />
  }
);

Title.displayName = 'Title';

/**
 * A body text component (p).
 *
 * Renders paragraph text with automatic URL detection and link conversion.
 * Use for main content, descriptions, and body copy. Can be rendered as
 * a link when href prop is provided.
 *
 * @example
 * ```tsx
 * // Basic paragraph
 * <Text>This is a paragraph of body text.</Text>
 * ```
 *
 * @example
 * ```tsx
 * // Text with custom styling
 * <Text secondary lg>Large secondary text content.</Text>
 * ```
 *
 * @example
 * ```tsx
 * // Text as a link
 * <Text href="/about">Learn more</Text>
 * ```
 *
 * @example
 * ```tsx
 * // Text with typography props
 * <Text mono semibold>Monospace bold text</Text>
 * ```
 *
 * @see {@link TypographyProps} for all available props
 */
export const Text = forwardRef<HTMLParagraphElement, TypographyProps>(
  function Text(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.text} {...props} />
  }
);

Text.displayName = 'Text';

/**
 * An anchor link component (a).
 *
 * Renders a hyperlink with hover underline effect. Supports appearance props
 * for custom color styling. Use for navigation links and clickable text.
 *
 * @example
 * ```tsx
 * // Basic link
 * <Link href="/about">About Us</Link>
 * ```
 *
 * @example
 * ```tsx
 * // Styled link with size and font weight
 * <Link href="/contact" lg semibold>Contact</Link>
 * ```
 *
 * @example
 * ```tsx
 * // External link
 * <Link href="https://example.com" target="_blank" rel="noopener">
 *   Visit Example
 * </Link>
 * ```
 *
 * @see {@link LinkProps} for all available props
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.link} {...props} />
  }
);

Link.displayName = 'Link';

/**
 * A list item component (li).
 *
 * Renders an individual list item within a List component. Supports
 * typography styling and can be rendered as a link when href is provided.
 * Use within List for bullet points or numbered lists.
 *
 * @example
 * ```tsx
 * // Basic list item
 * <List>
 *   <ListItem>First item</ListItem>
 *   <ListItem>Second item</ListItem>
 * </List>
 * ```
 *
 * @example
 * ```tsx
 * // Styled list item
 * <ListItem primary semibold>Important item</ListItem>
 * ```
 *
 * @example
 * ```tsx
 * // List item as a link
 * <ListItem href="/item/1">Click to view details</ListItem>
 * ```
 *
 * @see {@link TypographyProps} for all available props
 */
export const ListItem = forwardRef<HTMLLIElement, TypographyProps>(
  function ListItem(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.listItem} {...props} />
  }
);

ListItem.displayName = 'ListItem';

/**
 * A list container component (ul or ol).
 *
 * Renders an unordered (bullets) or ordered (numbers) list. Automatically
 * switches between ul and ol based on the `decimal` prop. Use with ListItem
 * components for structured lists.
 *
 * @example
 * ```tsx
 * // Unordered list (bullets)
 * <List>
 *   <ListItem>Item one</ListItem>
 *   <ListItem>Item two</ListItem>
 * </List>
 * ```
 *
 * @example
 * ```tsx
 * // Ordered list (numbers)
 * <List decimal>
 *   <ListItem>First step</ListItem>
 *   <ListItem>Second step</ListItem>
 * </List>
 * ```
 *
 * @example
 * ```tsx
 * // Styled list
 * <List primary lg padding>
 *   <ListItem>Feature A</ListItem>
 *   <ListItem>Feature B</ListItem>
 * </List>
 * ```
 *
 * @see {@link ListProps} for all available props
 */
export const List = forwardRef<HTMLUListElement, ListProps>(
  function List(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.list} {...props} />
  }
);

List.displayName = 'List';
