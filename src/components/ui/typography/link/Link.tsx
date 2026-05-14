import { forwardRef } from 'react';
import type { LinkProps } from "./LinkProps";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";

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

    return <ThemedComponent ref={ref} theme={theme.link} {...derivedProps} />;
  }
);

Link.displayName = 'Link';
