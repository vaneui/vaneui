import { JSX } from 'react';
import { CheckProps } from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

export const Check = (props: CheckProps): JSX.Element => {
  const theme = useTheme();

  return (
    <ThemedComponent theme={theme.check} {...props}>
      {theme.check.themes.element}
    </ThemedComponent>
  );
};