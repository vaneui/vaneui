import { forwardRef } from 'react';
import type { TypographyProps } from "../common";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";
import { defaultTitleTheme } from "./defaultTitleTheme";

export const Title = forwardRef<HTMLHeadingElement, TypographyProps>(
  function Title(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme?.title ?? defaultTitleTheme} {...props} />
  }
);

Title.displayName = 'Title';
