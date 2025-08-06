import { JSX } from 'react';
import { CheckboxProps } from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";
import { Check } from './check';

export const Checkbox = (props: CheckboxProps): JSX.Element => {
  const theme = useTheme();
  return (
    <span className="grid items-center justify-center h-6">
      <ThemedComponent theme={theme.checkbox} {...props} type="checkbox"/>
      <ThemedComponent theme={theme.check} {...props}>
        {theme.check.themes.element}
      </ThemedComponent>
    </span>
  );
};