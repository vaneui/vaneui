import React, { useMemo, forwardRef } from "react";
import { ComponentTheme } from "./ui/theme/common/ComponentTheme";
type ComponentProps = { className?: string; children?: React.ReactNode; tag?: React.ElementType; };

export type ThemedComponentProps<P extends ComponentProps, T extends object> = P & {
  theme: ComponentTheme<P, T>;
};

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

export const ThemedComponent = forwardRef<HTMLElement, ThemedComponentProps<ComponentProps, object>>(
  function ThemedComponent(allProps, ref) {
    const { theme, ...props } = allProps;
    const {Tag, finalClasses, finalProps} = useMemo(() => {
      // Pass the full allProps and let getComponentConfig handle filtering
      return theme.getComponentConfig(allProps);
    }, [theme, allProps]);

    const isVoid = typeof Tag === 'string' && VOID_ELEMENTS.has(Tag);

    return (
      <Tag ref={ref} className={finalClasses} {...finalProps}>
        {isVoid ? undefined : props.children}
      </Tag>
    );
  }
);