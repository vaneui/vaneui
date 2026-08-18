import { forwardRef, useCallback, useMemo, type MouseEvent } from 'react';
import type { SwitchProps } from './SwitchProps';
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { useLabelSizeContext, withLabelSizeDefault } from "../label/LabelSizeContext";
import { defaultSwitchTheme } from "./defaultSwitchTheme";
import { defaultSwitchThumbTheme } from "./defaultSwitchThumbTheme";
import { defaultSwitchWrapperTheme } from "./defaultSwitchWrapperTheme";

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(props, ref) {
    const theme = useTheme();
    const wrapperThemeBase = theme?.switch.wrapper ?? defaultSwitchWrapperTheme;
    const inputThemeBase = theme?.switch.input ?? defaultSwitchTheme;
    const thumbTheme = theme?.switch.thumb ?? defaultSwitchThumbTheme;

    // inside a Label, the Label's resolved size becomes the size default for the
    // sized sub-themes (wrapper + input; the thumb has no size category — it
    // scales via CSS variables). Explicit size props still win.
    const labelSize = useLabelSizeContext();
    const wrapperTheme = useMemo(
      () => withLabelSizeDefault(wrapperThemeBase, labelSize),
      [wrapperThemeBase, labelSize]
    );
    const switchInputTheme = useMemo(
      () => withLabelSizeDefault(inputThemeBase, labelSize),
      [inputThemeBase, labelSize]
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

    // native readOnly is inert on checkbox inputs — cancel activation so aria-readonly stays truthful
    const handleClick = useCallback((event: MouseEvent<HTMLInputElement>) => {
      if (readOnly) event.preventDefault();
      onClick?.(event);
    }, [readOnly, onClick]);

    const themeProps = {
      xs, sm, md, lg, xl,
      primary, accent, secondary, tertiary, success, danger, warning, info,
      // ghost must reach the wrapper too: the thumb reads --text-color from it
      filled, outline, ghost,
      pill, sharp, rounded,
      disabled,
    };

    const inputProps = {
      type: "checkbox" as const,
      role: "switch",
      checked, defaultChecked, name, value, onChange, onBlur, onFocus, required, readOnly,
      onClick: handleClick,
      id, tabIndex, 'aria-label': ariaLabel,
      ...remainingProps,
      ...themeProps,
      // validity belongs on the input only, never duplicated onto the wrapper
      invalid,
    };

    return (
      <ThemedComponent theme={wrapperTheme} className={className} {...themeProps}>
        <ThemedComponent theme={switchInputTheme} ref={ref} {...inputProps} />
        {/* decorative knob — the real state lives on the <input>; hide it from AT */}
        <ThemedComponent theme={thumbTheme} aria-hidden="true" />
      </ThemedComponent>
    );
  }
);

Switch.displayName = 'Switch';
