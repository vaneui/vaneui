import { forwardRef, useCallback, useMemo, type ChangeEvent } from 'react';
import type { RadioProps } from './RadioProps';
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { useLabelSizeContext, withLabelSizeDefault } from "../label/LabelSizeContext";
import { useRadioGroupContext } from "./RadioGroupContext";
import { defaultRadioTheme } from "./defaultRadioTheme";
import { defaultRadioDotTheme } from "./defaultRadioDotTheme";
import { defaultRadioWrapperTheme } from "./defaultRadioWrapperTheme";

export const Radio = forwardRef<HTMLSpanElement, RadioProps>(
  function Radio(props, ref) {
    const theme = useTheme();
    const wrapperThemeBase = theme?.radio.wrapper ?? defaultRadioWrapperTheme;
    const inputThemeBase = theme?.radio.input ?? defaultRadioTheme;
    const dotTheme = theme?.radio.dot ?? defaultRadioDotTheme;

    // inside a Label, the Label's resolved size becomes the size default for the
    // sized sub-themes (wrapper + input; the dot has no size category — it scales
    // via CSS variables). Explicit size props still win.
    const labelSize = useLabelSizeContext();
    const wrapperTheme = useMemo(
      () => withLabelSizeDefault(wrapperThemeBase, labelSize),
      [wrapperThemeBase, labelSize]
    );
    const radioInputTheme = useMemo(
      () => withLabelSizeDefault(inputThemeBase, labelSize),
      [inputThemeBase, labelSize]
    );

    const {
      xs, sm, md, lg, xl,
      primary, accent, secondary, tertiary, success, danger, warning, info,
      filled, outline, ghost,
      pill, sharp, rounded,
      invalid,
      checked, defaultChecked, disabled, name, value, onChange, onBlur, onFocus, required, readOnly,
      id, className, tabIndex, 'aria-label': ariaLabel,
      ...remainingProps
    } = props;

    const group = useRadioGroupContext();
    const groupOnChange = group?.onChange;
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      groupOnChange?.(event);
    }, [onChange, groupOnChange]);

    // a group `value` makes every Radio controlled; `defaultValue` only seeds the uncontrolled one
    const resolvedChecked = checked ?? (group?.value !== undefined ? group.value === value : undefined);
    const resolvedDefaultChecked = resolvedChecked !== undefined
      ? undefined
      : defaultChecked ?? (group?.defaultValue !== undefined ? group.defaultValue === value : undefined);

    const themeProps = {
      xs, sm, md, lg, xl,
      primary, accent, secondary, tertiary, success, danger, warning, info,
      filled, outline, ghost,
      pill, sharp, rounded,
      invalid,
      disabled,
    };

    const inputProps = {
      type: "radio" as const,
      checked: resolvedChecked,
      defaultChecked: resolvedDefaultChecked,
      name: name ?? group?.name,
      value, onBlur, onFocus, required, readOnly,
      onChange: onChange || groupOnChange ? handleChange : undefined,
      id, tabIndex, 'aria-label': ariaLabel,
      ...remainingProps,
      ...themeProps
    };

    return (
      <ThemedComponent theme={wrapperTheme} ref={ref} className={className} {...themeProps}>
        <ThemedComponent theme={radioInputTheme} {...inputProps} />
        {/* decorative dot — the real state lives on the <input>; hide it from AT */}
        <ThemedComponent theme={dotTheme} aria-hidden="true">
          {dotTheme.themes.dotElement()}
        </ThemedComponent>
      </ThemedComponent>
    );
  }
);

Radio.displayName = 'Radio';
