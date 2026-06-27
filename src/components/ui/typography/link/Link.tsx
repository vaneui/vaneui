import { forwardRef } from 'react';
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

    return <ThemedComponent ref={ref} theme={theme?.link ?? defaultLinkTheme} {...resolvedProps} />;
  }
);

Link.displayName = 'Link';
