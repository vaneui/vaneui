import { forwardRef } from 'react';
import { TypographyProps, ListProps } from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

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
