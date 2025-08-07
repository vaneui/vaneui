import { JSX } from 'react';
import { CheckboxProps } from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

export const Checkbox = (props: CheckboxProps): JSX.Element => {
  const theme = useTheme();
  
  return (
    <span className="grid items-center justify-center h-6">
      <ThemedComponent theme={theme.checkbox.input} {...props} type="checkbox"/>
      <ThemedComponent theme={theme.checkbox.wrapper} {...props}>
        {theme.checkbox.wrapper.themes.checkElement()}
      </ThemedComponent>
    </span>
  );
};