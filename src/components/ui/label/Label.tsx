import { forwardRef, useMemo } from 'react';
import type { LabelProps } from "./LabelProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme, ThemeProvider } from "../../themeContext";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  function Label(props, ref) {
    const theme = useTheme();

    // propagate resolved size to nested Input/Checkbox via ThemeProvider; mergeDefaults zeroes other size keys
    const resolvedSize = pickFirstTruthyKeyByCategory(
      props as Record<string, unknown>,
      theme.label.defaults as Record<string, unknown>,
      'size'
    ) ?? 'md';

    // memoized so the nested ThemeProvider's memo stays valid across
    // re-renders — an inline literal here would re-clone the theme tree on
    // every render of every Label
    const childThemeDefaults = useMemo(() => ({
      input: { [resolvedSize]: true },
      checkbox: {
        wrapper: { [resolvedSize]: true },
        input: { [resolvedSize]: true },
      },
    }), [resolvedSize]);

    return (
      <ThemedComponent theme={theme.label} ref={ref} {...props}>
        <ThemeProvider themeDefaults={childThemeDefaults}>
          {props.children}
        </ThemeProvider>
      </ThemedComponent>
    );
  }
);

Label.displayName = 'Label';
