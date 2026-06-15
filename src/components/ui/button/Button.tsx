import { forwardRef } from 'react';
import type { ButtonProps } from "./ButtonProps";
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { resolveDisabledLink } from "../../utils/disabledLink";
import { defaultButtonTheme } from "./defaultButtonTheme";
import { defaultButtonSpinnerTheme } from "./defaultButtonSpinnerTheme";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, ...rest } = props;
    const theme = useTheme();
    const buttonTheme = theme?.button.main ?? defaultButtonTheme;
    const spinnerTheme = theme?.button.spinner ?? defaultButtonSpinnerTheme;

    const isDisabled = rest.disabled || loading;
    const resolvedProps = resolveDisabledLink(rest, !!isDisabled);

    if (loading) {
      const loadingProps = { ...resolvedProps, disabled: true as const, 'data-loading': 'true', 'aria-busy': true as const };
      return (
        <ThemedComponent ref={ref} theme={buttonTheme} {...loadingProps}>
          <ThemedComponent theme={spinnerTheme}>
            {spinnerTheme.themes.spinnerElement()}
          </ThemedComponent>
          {/* opacity-0 (not invisible) — keeps the children in the accessibility
              tree so the button retains its accessible name while loading */}
          <span className="opacity-0">{resolvedProps.children}</span>
        </ThemedComponent>
      );
    }

    return <ThemedComponent ref={ref} theme={buttonTheme} {...resolvedProps} />;
  }
);

Button.displayName = 'Button';
