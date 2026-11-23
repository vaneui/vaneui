import { forwardRef } from 'react';
import type { BadgeProps } from "./BadgeProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { resolveDisabledLink } from "../../utils/disabledLink";
import { wrapTextRuns } from "../../utils/textRuns";
import { defaultBadgeTheme } from "./defaultBadgeTheme";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(props, ref) {
    const theme = useTheme();
    // Focus ring only when href turns the rendered tag into <a>; skip when
    // user opts out with noFocusVisible.
    const focusInjection = props.href && !props.noFocusVisible ? { focusVisible: true as const } : undefined;
    // disabled + href: a placeholder link (no href, aria-disabled, still focusable, activation
    // blocked), as Button and Link render it; the props pass through untouched otherwise
    const resolvedProps = resolveDisabledLink({ ...props }, !!props.disabled);
    // a dot with no text is a picture of a status: with a label, it is announced as one
    const dotOnly = props.dot && (props.children === undefined || props.children === null || props.children === false || props.children === '');
    const dotRole = dotOnly && !props.role && (props['aria-label'] || props['aria-labelledby'])
      ? { role: 'img' as const } : undefined;
    return (
      <ThemedComponent theme={theme?.badge ?? defaultBadgeTheme} ref={ref} {...focusInjection} {...dotRole} {...resolvedProps}>
        {/* text gets a span of its own, so the stylesheet can center it by the capital height */}
        {wrapTextRuns(resolvedProps.children)}
      </ThemedComponent>
    );
  }
);

Badge.displayName = 'Badge';
