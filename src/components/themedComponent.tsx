import React, { useMemo, forwardRef } from "react";
import { ComponentTheme } from "./ui/theme/common/ComponentTheme";
type ComponentProps = { className?: string; children?: React.ReactNode; tag?: React.ElementType; };

export type ThemedComponentProps<P extends ComponentProps, T extends object> = P & {
  theme: ComponentTheme<any, T>;
};

export const ThemedComponent = forwardRef<any, ThemedComponentProps<any, any>>(
  function ThemedComponent(allProps, ref) {
    const { theme, ...props } = allProps;
    const {Tag, finalClasses, finalProps} = useMemo(() => {
      // Pass the full allProps and let getComponentConfig handle filtering
      return theme.getComponentConfig(allProps);
    }, [theme, allProps]);

    return (
      <Tag ref={ref} className={finalClasses} {...finalProps}>
        {props.children}
      </Tag>
    );
  }
);