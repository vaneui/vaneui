import React, { forwardRef } from 'react';
import type {
  BaseProps,
  SizeProps,
  HideProps,
  ItemsProps,
  JustifyProps,
  PositionProps,
  DisplayProps,
  OverflowProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  FocusVisibleProps,
  ShapeProps,
  VariantProps
} from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

/** Checkbox component props */
export type CheckboxProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  FocusVisibleProps &
  ShapeProps &
  VariantProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * A styled checkbox component for forms and selections.
 *
 * Provides a custom-styled checkbox with checkmark visualization. Supports
 * all standard HTML checkbox attributes (checked, onChange, disabled, etc.)
 * and can be customized with appearances, sizes, and variants.
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
      // Extract input HTML attributes
      checked, defaultChecked, disabled, name, value, onChange, onBlur, onFocus, required, readOnly,
      // Other HTML attributes
      id, className, tabIndex, 'aria-label': ariaLabel,
      ...remainingProps
    } = props;

    const themeProps = {
      xs, sm, md, lg, xl,
      primary, brand, accent, secondary, tertiary, success, danger, warning, info,
      filled, outline,
      pill, sharp, rounded
    };

    const inputProps = {
      type: "checkbox" as const,
      checked, defaultChecked, disabled, name, value, onChange, onBlur, onFocus, required, readOnly,
      id, tabIndex, 'aria-label': ariaLabel,
      className, // Apply className to the input element
      ...remainingProps,
      ...themeProps
    };

    return (
      <ThemedComponent theme={theme.checkbox.wrapper} ref={ref} {...themeProps}>
        <ThemedComponent theme={theme.checkbox.input} {...inputProps} />
        <ThemedComponent theme={theme.checkbox.check} {...themeProps}>
          {theme.checkbox.check.themes.checkElement()}
        </ThemedComponent>
      </ThemedComponent>
    );
  }
);

Checkbox.displayName = 'Checkbox';