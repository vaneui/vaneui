import { forwardRef } from 'react';
import type { SectionProps } from "./SectionProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultSectionTheme } from "./defaultSectionTheme";

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  function Section(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.section ?? defaultSectionTheme} ref={ref} {...props} />
  }
);

Section.displayName = 'Section';
