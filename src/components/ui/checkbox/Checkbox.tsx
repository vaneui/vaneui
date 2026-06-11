import { forwardRef, useRef, useEffect, useMemo } from 'react';
import type { CheckboxProps } from './CheckboxProps';
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { useLabelSizeContext, withLabelSizeDefault } from "../label/LabelSizeContext";

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const theme = useTheme();
    const inputRef = useRef<HTMLInputElement>(null);

    // inside a Label, the Label's resolved size becomes the size default for
    // the sized sub-themes (wrapper + input; check/indeterminate have no size
    // category — they scale via CSS variables). Explicit size props still win.
    const labelSize = useLabelSizeContext();
    const wrapperTheme = useMemo(
      () => withLabelSizeDefault(theme.checkbox.wrapper, labelSize),
      [theme.checkbox.wrapper, labelSize]
    );
    const checkboxInputTheme = useMemo(
      () => withLabelSizeDefault(theme.checkbox.input, labelSize),
      [theme.checkbox.input, labelSize]
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
        <ThemedComponent theme={theme.checkbox.check}>
          {theme.checkbox.check.themes.checkElement()}
        </ThemedComponent>
        <ThemedComponent theme={theme.checkbox.indeterminate}>
          {theme.checkbox.indeterminate.themes.indeterminateElement()}
        </ThemedComponent>
      </ThemedComponent>
    );
  }
);

Checkbox.displayName = 'Checkbox';
