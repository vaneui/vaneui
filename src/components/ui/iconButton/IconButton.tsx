import { forwardRef, useEffect } from 'react';
import type { IconButtonProps } from "./IconButtonProps";
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { resolveDisabledLink } from "../../utils/disabledLink";
import { defaultIconButtonTheme } from "./defaultIconButtonTheme";
import { defaultButtonSpinnerTheme } from "../button/defaultButtonSpinnerTheme";

/**
 * Icon-only button with a square aspect ratio.
 *
 * Accessibility: icon-only content gives the button no accessible name —
 * always pass `aria-label`, `aria-labelledby`, or `title` so screen readers
 * can announce it. Dev builds log a console warning when none is set.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    const { loading, ...rest } = props;
    const theme = useTheme();
    const iconButtonTheme = theme?.iconButton ?? defaultIconButtonTheme;
    // IconButton shares Button's spinner sub-theme by design
    const spinnerTheme = theme?.button.spinner ?? defaultButtonSpinnerTheme;

    // dev-only: an icon-only button without aria-label/aria-labelledby/title
    // has no accessible name, so screen readers announce nothing
    const hasAccessibleName = Boolean(rest['aria-label'] || rest['aria-labelledby'] || rest.title);
    useEffect(() => {
      if (process.env.NODE_ENV !== 'production' && !hasAccessibleName) {
        console.warn(
          'VaneUI: IconButton has no accessible name — pass aria-label, aria-labelledby, or title so screen readers can announce it.'
        );
      }
    }, [hasAccessibleName]);

    const isDisabled = rest.disabled || loading;
    const resolvedProps = resolveDisabledLink(rest, !!isDisabled);

    if (loading) {
      const loadingProps = { ...resolvedProps, disabled: true as const, 'data-loading': 'true', 'aria-busy': true as const };
      return (
        <ThemedComponent ref={ref} theme={iconButtonTheme} {...loadingProps}>
          {/* decorative spinner — aria-busy on the button already conveys the loading state */}
          <ThemedComponent theme={spinnerTheme} aria-hidden="true">
            {spinnerTheme.themes.spinnerElement()}
          </ThemedComponent>
          {/* opacity-0 (not invisible) — keeps the children in the accessibility
              tree so the button retains its accessible name while loading */}
          <span className="opacity-0">{resolvedProps.children}</span>
        </ThemedComponent>
      );
    }

    return <ThemedComponent ref={ref} theme={iconButtonTheme} {...resolvedProps} />;
  }
);

IconButton.displayName = 'IconButton';
