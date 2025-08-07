import { JSX } from 'react';
import { CheckboxProps } from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

export const Checkbox = (props: CheckboxProps): JSX.Element => {
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
    // Custom props
    className,
    ...inputProps 
  } = props;

  const themeProps = {
    xs, sm, md, lg, xl,
    default: defaultProp, accent, primary, secondary, tertiary, success, danger, warning, info, transparent,
    filled, outline,
    pill, sharp, rounded
  };
  
  return (
    <ThemedComponent theme={theme.checkbox.wrapper} {...themeProps}>
      <ThemedComponent theme={theme.checkbox.input} {...props} type="checkbox"/>
      <ThemedComponent theme={theme.checkbox.check} {...themeProps}>
        {theme.checkbox.check.themes.checkElement()}
      </ThemedComponent>
    </ThemedComponent>
  );
};