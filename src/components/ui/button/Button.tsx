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
      const loadingProps = { ...resolvedProps, disabled: true as const, 'data-loading': 'true', 'aria-busy': true as const };
      return (
        <ThemedComponent ref={ref} theme={theme.button.main} {...loadingProps}>
          <ThemedComponent theme={theme.button.spinner}>
            {theme.button.spinner.themes.spinnerElement()}
          </ThemedComponent>
          {/* opacity-0 (not invisible) — keeps the children in the accessibility
              tree so the button retains its accessible name while loading */}
          <span className="opacity-0">{resolvedProps.children}</span>
        </ThemedComponent>
      );
    }

    return <ThemedComponent ref={ref} theme={theme.button.main} {...resolvedProps} />;
  }
);

Button.displayName = 'Button';
