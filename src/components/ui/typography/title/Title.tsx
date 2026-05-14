import { forwardRef } from 'react';
import type { TypographyProps } from "../common";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";

export const Title = forwardRef<HTMLHeadingElement, TypographyProps>(
  function Title(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.title} {...props} />
  }
);

Title.displayName = 'Title';
