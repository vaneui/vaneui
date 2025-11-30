import { forwardRef } from 'react';
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
  TransparentProps,
  VariantProps,
  ListStyleProps,
  PaddingProps
} from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

/** Typography component props (for Text, PageTitle, SectionTitle, Title, Link, ListItem) */
export type TypographyProps = BaseProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  TextAlignProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  AppearanceProps &
  TransparentProps &
  VariantProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'children'> &
  Partial<Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>> & {
  /** URL to navigate to (renders component as anchor tag) */
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
  ListStyleProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  AppearanceProps &
  TransparentProps &
  PaddingProps &
  VariantProps &
  Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

export const PageTitle = forwardRef<HTMLHeadingElement, TypographyProps>(
  function PageTitle(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.pageTitle} {...props} />
  }
);

export const SectionTitle = forwardRef<HTMLHeadingElement, TypographyProps>(
  function SectionTitle(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.sectionTitle} {...props} />
  }
);

export const Title = forwardRef<HTMLHeadingElement, TypographyProps>(
  function Title(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.title} {...props} />
  }
);

export const Text = forwardRef<HTMLParagraphElement, TypographyProps>(
  function Text(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.text} {...props} />
  }
);

export const Link = forwardRef<HTMLAnchorElement, TypographyProps>(
  function Link(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.link} {...props} />
  }
);

export const ListItem = forwardRef<HTMLLIElement, TypographyProps>(
  function ListItem(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.listItem} {...props} />
  }
);

export const List = forwardRef<HTMLUListElement, ListProps>(
  function List(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.list} {...props} />
  }
);
