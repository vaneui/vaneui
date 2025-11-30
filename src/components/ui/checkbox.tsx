import { forwardRef } from 'react';
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
  TransparentProps,
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
  TransparentProps &
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

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const theme = useTheme();
    
    // Extract only theme-relevant props for wrapper and check components
    const { 
      // Size props
      xs, sm, md, lg, xl,
      // Appearance props  
      default: defaultProp, accent, primary, secondary, tertiary, success, danger, warning, info, transparent,
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
      default: defaultProp, accent, primary, secondary, tertiary, success, danger, warning, info, transparent,
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