import { forwardRef, type ReactNode } from 'react';
import type { LinkProps } from "./LinkProps";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";
import { resolveDisabledLink } from "../../../utils/disabledLink";
import { defaultLinkTheme } from "./defaultLinkTheme";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const { external, ...rest } = props;
    const theme = useTheme();

    const finalTarget = rest.target ?? (external ? '_blank' : undefined);
    const finalRel = rest.rel ?? (finalTarget === '_blank' ? 'noopener noreferrer' : undefined);

    const derivedProps = {
      ...rest,
      ...(finalTarget !== undefined && { target: finalTarget }),
      ...(finalRel !== undefined && { rel: finalRel }),
    };

    // disabled <a>: drop href + block activation while staying focusable
    // (aria-disabled pattern); a no-op when not disabled
    const resolvedProps = resolveDisabledLink(derivedProps, !!rest.disabled);

    // a link opening a new tab needs a programmatically-available advisory
    // (SC 3.2.2). Append a visually-hidden note so AT announces it with no
    // visual change; skipped for disabled links (no navigation happens) and
    // when the consumer already provided an aria-label.
    const opensNewWindow =
      finalTarget === '_blank' && !rest.disabled && !(rest as { 'aria-label'?: string })['aria-label'];
    const { children, ...linkProps } = resolvedProps as typeof resolvedProps & { children?: ReactNode };

    return (
      <ThemedComponent ref={ref} theme={theme?.link ?? defaultLinkTheme} {...linkProps}>
        {children}
        {opensNewWindow && <span className="sr-only"> (opens in new window)</span>}
      </ThemedComponent>
    );
  }
);

Link.displayName = 'Link';
