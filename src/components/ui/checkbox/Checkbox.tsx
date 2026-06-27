import { forwardRef, useRef, useEffect, useMemo } from 'react';
import type { CheckboxProps } from './CheckboxProps';
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { useLabelSizeContext, withLabelSizeDefault } from "../label/LabelSizeContext";
import { defaultCheckboxTheme } from "./defaultCheckboxTheme";
import { defaultCheckboxCheckTheme } from "./defaultCheckboxCheckTheme";
import { defaultCheckboxIndeterminateTheme } from "./defaultCheckboxIndeterminateTheme";
import { defaultCheckboxWrapperTheme } from "./defaultCheckboxWrapperTheme";

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const theme = useTheme();
    const wrapperThemeBase = theme?.checkbox.wrapper ?? defaultCheckboxWrapperTheme;
    const inputThemeBase = theme?.checkbox.input ?? defaultCheckboxTheme;
    const checkTheme = theme?.checkbox.check ?? defaultCheckboxCheckTheme;
    const indeterminateTheme = theme?.checkbox.indeterminate ?? defaultCheckboxIndeterminateTheme;
    const inputRef = useRef<HTMLInputElement>(null);

    // inside a Label, the Label's resolved size becomes the size default for
    // the sized sub-themes (wrapper + input; check/indeterminate have no size
    // category — they scale via CSS variables). Explicit size props still win.
    const labelSize = useLabelSizeContext();
    const wrapperTheme = useMemo(
      () => withLabelSizeDefault(wrapperThemeBase, labelSize),
      [wrapperThemeBase, labelSize]
    );
    const checkboxInputTheme = useMemo(
      () => withLabelSizeDefault(inputThemeBase, labelSize),
      [inputThemeBase, labelSize]
    );

    const {
      xs, sm, md, lg, xl,
      primary, brand, accent, secondary, tertiary, success, danger, warning, info,
      filled, outline,
      pill, sharp, rounded,
      error,
      indeterminate,
      checked, defaultChecked, disabled, name, value, onChange, onBlur, onFocus, required, readOnly,
      id, className, tabIndex, 'aria-label': ariaLabel,
      ...remainingProps
    } = props;

    // indeterminate can only be set via JS, not as an HTML attribute
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    const themeProps = {
      xs, sm, md, lg, xl,
      primary, brand, accent, secondary, tertiary, success, danger, warning, info,
      filled, outline,
      pill, sharp, rounded,
      error,
      disabled,
    };

    const inputProps = {
      type: "checkbox" as const,
      checked, defaultChecked, name, value, onChange, onBlur, onFocus, required, readOnly,
      id, tabIndex, 'aria-label': ariaLabel,
      ...remainingProps,
      ...themeProps
    };

    return (
      <ThemedComponent theme={wrapperTheme} ref={ref} className={className} {...themeProps}>
        <ThemedComponent theme={checkboxInputTheme} ref={inputRef} {...inputProps} />
        {/* decorative overlays — the real state lives on the <input>; hide them from AT */}
        <ThemedComponent theme={checkTheme} aria-hidden="true">
          {checkTheme.themes.checkElement()}
        </ThemedComponent>
        <ThemedComponent theme={indeterminateTheme} aria-hidden="true">
          {indeterminateTheme.themes.indeterminateElement()}
        </ThemedComponent>
      </ThemedComponent>
    );
  }
);

Checkbox.displayName = 'Checkbox';
