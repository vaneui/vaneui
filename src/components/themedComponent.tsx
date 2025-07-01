import React, { useMemo } from "react";
import { ComponentTheme } from "./ui/theme/common/ComponentTheme";
import { ComponentProps } from "./ui/props/props";

export type ThemedComponentProps<P extends ComponentProps, T extends object> = P & {
  theme: ComponentTheme<P, T>;
  propsToOmit?: readonly string[];
};

export function ThemedComponent<P extends ComponentProps, T extends object>(
  {
    theme,
    propsToOmit,
    ...props
  }: ThemedComponentProps<P, T>) {
  const {Tag, finalClasses, finalProps} = useMemo(() => {
    return theme.getComponentConfig(props as unknown as P, propsToOmit);
  }, [theme, props, propsToOmit]);

  return (
    <Tag className={finalClasses} {...finalProps}>
      {props.children}
    </Tag>
  );
}