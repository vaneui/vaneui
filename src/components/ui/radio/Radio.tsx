import { forwardRef, useCallback, useMemo, type ChangeEvent, type MouseEvent } from 'react';
import type { RadioProps } from './RadioProps';
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { useLabelSizeContext, withLabelSizeDefault } from "../label/LabelSizeContext";
import { useRadioGroupContext } from "./RadioGroupContext";
import { defaultRadioTheme } from "./defaultRadioTheme";
import { defaultRadioDotTheme } from "./defaultRadioDotTheme";
import { defaultRadioWrapperTheme } from "./defaultRadioWrapperTheme";

/* RadioProps['value'] widens to string | number | readonly string[], so compare as strings. */
const matchesGroupValue = (groupValue: string, value: RadioProps['value']): boolean =>
  value !== undefined && String(value) === groupValue;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  function Radio(props, ref) {
    const theme = useTheme();
    const wrapperThemeBase = theme?.radio.wrapper ?? defaultRadioWrapperTheme;
    const inputThemeBase = theme?.radio.input ?? defaultRadioTheme;
    const dotTheme = theme?.radio.dot ?? defaultRadioDotTheme;

    const group = useRadioGroupContext();
    // a RadioGroup's explicit size, else the enclosing Label's, seeds the sized sub-themes; own size prop wins
    const labelSize = useLabelSizeContext();
    const inheritedSize = group?.size ?? labelSize;
    const wrapperTheme = useMemo(
      () => withLabelSizeDefault(wrapperThemeBase, inheritedSize),
      [wrapperThemeBase, inheritedSize]
    );
    const radioInputTheme = useMemo(
      () => withLabelSizeDefault(inputThemeBase, inheritedSize),
      [inputThemeBase, inheritedSize]
    );

    const {
      xs, sm, md, lg, xl,
      primary, accent, secondary, tertiary, success, danger, warning, info,
      filled, outline, ghost,
      pill, sharp, rounded,
      invalid,
      checked, defaultChecked, disabled, name, value, onChange, onBlur, onFocus, onClick, required, readOnly,
      id, className, tabIndex, 'aria-label': ariaLabel,
      ...remainingProps
    } = props;

    const groupOnChange = group?.onChange;
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      groupOnChange?.(event);
    }, [onChange, groupOnChange]);

    // native readOnly is inert on radio inputs — cancel activation so aria-readonly stays truthful
    const handleClick = useCallback((event: MouseEvent<HTMLInputElement>) => {
      if (readOnly) event.preventDefault();
      onClick?.(event);
    }, [readOnly, onClick]);

    // a group `value` makes every Radio controlled; `defaultValue` only seeds the uncontrolled one
    const resolvedChecked = checked ?? (group?.value !== undefined ? matchesGroupValue(group.value, value) : undefined);
    const resolvedDefaultChecked = resolvedChecked !== undefined
      ? undefined
      : defaultChecked ?? (group?.defaultValue !== undefined ? matchesGroupValue(group.defaultValue, value) : undefined);

    const themeProps = {
      xs, sm, md, lg, xl,
      primary, accent, secondary, tertiary, success, danger, warning, info,
      filled, outline, ghost,
      pill, sharp, rounded,
      disabled,
    };

    const inputProps = {
      type: "radio" as const,
      checked: resolvedChecked,
      defaultChecked: resolvedDefaultChecked,
      name: name ?? group?.name,
      value, onBlur, onFocus, required, readOnly,
      onChange: onChange || groupOnChange ? handleChange : undefined,
      onClick: handleClick,
      id, tabIndex, 'aria-label': ariaLabel,
      ...remainingProps,
      ...themeProps,
      // validity belongs on the input only, never duplicated onto the wrapper
      invalid,
    };

    return (
      <ThemedComponent theme={wrapperTheme} className={className} {...themeProps}>
        <ThemedComponent theme={radioInputTheme} ref={ref} {...inputProps} />
        {/* decorative dot — the real state lives on the <input>; hide it from AT */}
        <ThemedComponent theme={dotTheme} aria-hidden="true">
          {dotTheme.themes.dotElement()}
        </ThemedComponent>
      </ThemedComponent>
    );
  }
);

Radio.displayName = 'Radio';
