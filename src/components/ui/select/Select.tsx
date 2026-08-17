import { forwardRef, useMemo } from 'react';
import type { SelectProps } from "./SelectProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useLabelSizeContext, withLabelSizeDefault } from "../label/LabelSizeContext";
import { defaultSelectTheme } from "./defaultSelectTheme";
import { defaultSelectChevronTheme } from "./defaultSelectChevronTheme";
import { defaultSelectWrapperTheme } from "./defaultSelectWrapperTheme";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(props, ref) {
    const theme = useTheme();
    const selectThemeBase = theme?.select ?? defaultSelectTheme;
    const chevronThemeBase = theme?.selectChevron ?? defaultSelectChevronTheme;
    const wrapperTheme = theme?.selectWrapper ?? defaultSelectWrapperTheme;
    // inside a Label, the Label's size becomes this control's size default; an explicit prop wins
    const labelSize = useLabelSizeContext();
    const selectTheme = useMemo(
      () => withLabelSizeDefault(selectThemeBase, labelSize),
      [selectThemeBase, labelSize]
    );
    // the chevron resolves the same size as the field, so its --fs/--gap scale tracks it
    const chevronTheme = useMemo(
      () => withLabelSizeDefault(chevronThemeBase, labelSize),
      [chevronThemeBase, labelSize]
    );

    // the chevron always shows, so the field is always wrapped and the icon overlays its end edge
    const { xs, sm, md, lg, xl } = props;
    const chevronSize = { xs, sm, md, lg, xl };

    return (
      <ThemedComponent theme={wrapperTheme}>
        <ThemedComponent ref={ref} theme={selectTheme} {...props} />
        <ThemedComponent theme={chevronTheme} aria-hidden="true" {...chevronSize}>
          {chevronTheme.themes.chevronElement()}
        </ThemedComponent>
      </ThemedComponent>
    );
  }
);

Select.displayName = 'Select';
