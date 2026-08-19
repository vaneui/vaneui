import { forwardRef } from 'react';
import type { ButtonProps } from "./ButtonProps";
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { resolveDisabledLink } from "../../utils/disabledLink";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";
// file path, not the barrel: the barrel would pull the whole ui index into this module
import { Spinner } from "../spinner/Spinner";
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
      // the Spinner would otherwise fall back to its own md default
      const size = pickFirstTruthyKeyByCategory(
        resolvedProps as unknown as Record<string, unknown>,
        buttonTheme.defaults as unknown as Record<string, unknown>,
        'size'
      );
      return (
        <ThemedComponent ref={ref} theme={buttonTheme} {...loadingProps}>
          {/* decorative — aria-busy on the button already conveys the loading state,
              so the Spinner's own role=status is suppressed rather than hidden twice */}
          <ThemedComponent theme={spinnerTheme} aria-hidden="true">
            <Spinner role={undefined} {...(size ? { [size]: true } : {})} />
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
