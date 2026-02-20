import { forwardRef, useRef, useEffect } from 'react';
import type { CheckboxProps } from './CheckboxProps';
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";

/**
 * A styled checkbox component for forms and selections.
 *
 * Provides a custom-styled checkbox with checkmark visualization. Supports
 * all standard HTML checkbox attributes (checked, onChange, disabled, etc.)
 * and can be customized with appearances, sizes, and variants. Also supports
 * indeterminate state for "select all" scenarios.
 *
 * @example
 * ```tsx
 * // Basic checkbox
 * <Checkbox />
 * ```
 *
 * @example
 * ```tsx
 * // Controlled checkbox with label
 * <Label>
 *   <Checkbox checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
 *   I accept the terms
 * </Label>
 * ```
 *
 * @example
 * ```tsx
 * // Indeterminate state (for "select all" when partially selected)
 * <Checkbox indeterminate />
 * ```
 *
 * @example
 * ```tsx
 * // Primary checkbox with custom size
 * <Checkbox primary lg defaultChecked />
 * ```
 *
 * @example
 * ```tsx
 * // Disabled checkbox
 * <Checkbox disabled checked />
 * ```
 *
 * @see {@link CheckboxProps} for all available props
 */
export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const theme = useTheme();
    const inputRef = useRef<HTMLInputElement>(null);

    // Extract only theme-relevant props for wrapper and check components
    const {
      // Size props
      xs, sm, md, lg, xl,
      // Appearance props
      primary, brand, accent, secondary, tertiary, success, danger, warning, info,
      // Variant props
      filled, outline,
      // Shape props
      pill, sharp, rounded,
      // Status props (for validation)
      error,
      // Indeterminate state
      indeterminate,
      // Extract input HTML attributes
      checked, defaultChecked, disabled, name, value, onChange, onBlur, onFocus, required, readOnly,
      // Other HTML attributes
      id, className, tabIndex, 'aria-label': ariaLabel,
      ...remainingProps
    } = props;

    // Set the indeterminate property on the input element (can only be done via JS)
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
      disabled
    };

    const inputProps = {
      type: "checkbox" as const,
      checked, defaultChecked, name, value, onChange, onBlur, onFocus, required, readOnly,
      id, tabIndex, 'aria-label': ariaLabel,
      className, // Apply className to the input element
      ...remainingProps,
      ...themeProps
    };

    return (
      <ThemedComponent theme={theme.checkbox.wrapper} ref={ref} {...themeProps}>
        <ThemedComponent theme={theme.checkbox.input} ref={inputRef} {...inputProps} />
        <ThemedComponent theme={theme.checkbox.check} {...themeProps}>
          {theme.checkbox.check.themes.checkElement()}
        </ThemedComponent>
        <ThemedComponent theme={theme.checkbox.indeterminate} {...themeProps}>
          {theme.checkbox.indeterminate.themes.indeterminateElement()}
        </ThemedComponent>
      </ThemedComponent>
    );
  }
);

Checkbox.displayName = 'Checkbox';
