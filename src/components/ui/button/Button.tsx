import { forwardRef } from 'react';
import type { ButtonProps } from "./ButtonProps";
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { resolveDisabledLink } from "../../utils/disabledLink";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";
import { wrapTextRuns } from "../../utils/textRuns";
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
    // text gets a span of its own, so the stylesheet can center it by the capital height
    const label = wrapTextRuns(resolvedProps.children);

    // The children keep their place in both states, so flipping `loading` neither remounts them nor
    // resets their state. While loading they turn transparent (rules.css) under the spinner, which
    // keeps the button's size, layout and accessible name.
    const loadingProps = loading
      ? { disabled: true as const, 'data-loading': 'true', 'aria-busy': true as const }
      : undefined;
    // the Spinner would otherwise fall back to its own md default
    const size = loading
      ? pickFirstTruthyKeyByCategory(
        resolvedProps as unknown as Record<string, unknown>,
        buttonTheme.defaults as unknown as Record<string, unknown>,
        'size'
      )
      : undefined;

    return (
      <ThemedComponent ref={ref} theme={buttonTheme} {...resolvedProps} {...loadingProps}>
        {label}
        {loading && (
          <ThemedComponent theme={spinnerTheme} aria-hidden="true">
            {/* decorative — aria-busy on the button already conveys the loading state,
                so the Spinner's own role=status is suppressed rather than hidden twice */}
            <Spinner role={undefined} {...(size ? { [size]: true } : {})} />
          </ThemedComponent>
        )}
      </ThemedComponent>
    );
  }
);

Button.displayName = 'Button';
