import { forwardRef } from 'react';
import type { LabelProps } from "./LabelProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";
import { LabelSizeContext } from "./LabelSizeContext";
import { defaultLabelTheme } from "./defaultLabelTheme";

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  function Label(props, ref) {
    const theme = useTheme();
    const labelTheme = theme?.label ?? defaultLabelTheme;

    // propagate resolved size to nested Input/Checkbox via LabelSizeContext —
    // a scalar value, so no theme fork and no memo needed (context compares
    // the string by value)
    const resolvedSize = pickFirstTruthyKeyByCategory(
      props as Record<string, unknown>,
      labelTheme.defaults as Record<string, unknown>,
      'size'
    ) ?? 'md';

    return (
      <ThemedComponent theme={labelTheme} ref={ref} {...props}>
        <LabelSizeContext.Provider value={resolvedSize}>
          {props.children}
        </LabelSizeContext.Provider>
      </ThemedComponent>
    );
  }
);

Label.displayName = 'Label';
