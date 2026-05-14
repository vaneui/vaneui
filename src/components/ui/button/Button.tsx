import { forwardRef } from 'react';
import type { ButtonProps } from "./ButtonProps";
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { resolveDisabledLink } from "../../utils/disabledLink";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, ...rest } = props;
    const theme = useTheme();

    const isDisabled = rest.disabled || loading;
    const resolvedProps = resolveDisabledLink(rest, !!isDisabled);

    if (loading) {
      const loadingProps = { ...resolvedProps, disabled: true as const, 'data-loading': 'true' };
      return (
        <ThemedComponent ref={ref} theme={theme.button.main} {...loadingProps}>
          <ThemedComponent theme={theme.button.spinner}>
            {theme.button.spinner.themes.spinnerElement()}
          </ThemedComponent>
          <span className="invisible">{resolvedProps.children}</span>
        </ThemedComponent>
      );
    }

    return <ThemedComponent ref={ref} theme={theme.button.main} {...resolvedProps} />;
  }
);

Button.displayName = 'Button';
