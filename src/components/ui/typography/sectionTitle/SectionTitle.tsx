import { forwardRef } from 'react';
import type { TypographyProps } from "../common";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";
import { defaultSectionTitleTheme } from "./defaultSectionTitleTheme";

export const SectionTitle = forwardRef<HTMLHeadingElement, TypographyProps>(
  function SectionTitle(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme?.sectionTitle ?? defaultSectionTitleTheme} {...props} />
  }
);

SectionTitle.displayName = 'SectionTitle';
