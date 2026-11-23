import React, { forwardRef } from "react";
import { ComponentTheme } from "./ui/theme/common";
type ComponentProps = { className?: string; children?: React.ReactNode; tag?: React.ElementType; };

export type ThemedComponentProps<P extends ComponentProps, T extends object> = P & {
  theme: ComponentTheme<P, T>;
};

// React 19 renders `inert={true}` as the attribute; React 18 does not know the prop and passes
// a string through instead (and would drop `true` with a warning).
const INERT_VALUE = (React.version.startsWith('18.') ? '' : true) as unknown as boolean;

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

export const ThemedComponent = forwardRef<HTMLElement, ThemedComponentProps<ComponentProps, object>>(
  function ThemedComponent(allProps, ref) {
    const { theme, ...props } = allProps;
    // Computed inline — allProps is a new reference every render so useMemo
    // would never cache, adding overhead with no benefit.
    const { Tag, finalClasses, finalProps } = theme.getComponentConfig(allProps);

    const isVoid = typeof Tag === 'string' && VOID_ELEMENTS.has(Tag);
    // A loading placeholder takes no focus, clicks or screen reader reading, and neither does
    // anything inside it. An explicit `inert` passed by the consumer wins.
    const inert = 'data-skeleton' in finalProps && !('inert' in finalProps) ? { inert: INERT_VALUE } : undefined;

    return (
      <Tag ref={ref} className={finalClasses} {...finalProps} {...inert}>
        {isVoid ? undefined : props.children}
      </Tag>
    );
  }
);