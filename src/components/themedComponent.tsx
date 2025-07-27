import React, { useMemo } from "react";
import { ComponentTheme } from "./ui/theme/common/ComponentTheme";
import { ComponentProps } from "./ui/props/props";

export type ThemedComponentProps<P extends ComponentProps, T extends object> = P & {
  theme: ComponentTheme<any, T>;
  propsToOmit?: readonly string[];
};

export function ThemedComponent<P extends ComponentProps, T extends object>(
  allProps: ThemedComponentProps<P, T>) {
  const { theme, propsToOmit, ...props } = allProps;
  const {Tag, finalClasses, finalProps} = useMemo(() => {
    // Pass the full allProps and let getComponentConfig handle filtering
    return theme.getComponentConfig(allProps, propsToOmit);
  }, [theme, allProps, propsToOmit]);

  return (
    <Tag className={finalClasses} {...finalProps}>
      {props.children}
    </Tag>
  );
}