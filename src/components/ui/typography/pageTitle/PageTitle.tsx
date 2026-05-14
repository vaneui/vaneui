import { forwardRef } from 'react';
import type { TypographyProps } from "../common";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";

export const PageTitle = forwardRef<HTMLHeadingElement, TypographyProps>(
  function PageTitle(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.pageTitle} {...props} />
  }
);

PageTitle.displayName = 'PageTitle';
