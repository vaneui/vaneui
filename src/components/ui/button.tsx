import { JSX } from 'react';
import { ButtonProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';
import { BUTTON_KEYS } from './props/propKeys';

export const Button = (props: ButtonProps): JSX.Element => {
  const theme = useTheme();
  const buttonTheme = theme.button;

  // Use the common component classes hook with button-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    buttonTheme,
    BUTTON_KEYS
  );

  // Override the default tag to be "button" for buttons
  const tag = props.tag ?? "button";

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};
