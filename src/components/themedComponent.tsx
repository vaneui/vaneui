import React, { useMemo } from "react";
import { ComponentTheme } from "./ui/theme/common/ComponentTheme";
type ComponentProps = { className?: string; children?: React.ReactNode; tag?: React.ElementType; };

export type ThemedComponentProps<P extends ComponentProps, T extends object> = P & {
  theme: ComponentTheme<any, T>;
};

export function ThemedComponent<P extends ComponentProps, T extends object>(
  allProps: ThemedComponentProps<P, T>) {
  const { theme, ...props } = allProps;
  const {Tag, finalClasses, finalProps} = useMemo(() => {
    // Pass the full allProps and let getComponentConfig handle filtering
    return theme.getComponentConfig(allProps);
  }, [theme, allProps]);

  return (
    <Tag className={finalClasses} {...finalProps}>
      {props.children}
    </Tag>
  );
}