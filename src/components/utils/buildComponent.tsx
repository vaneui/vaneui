import { twMerge } from "tailwind-merge";
import { TypographyComponentProps } from "../ui/props/props";
import React, { useMemo } from "react";
import { ComponentTheme } from "../ui/theme/common/ComponentTheme";


export function buildComponent<P extends Partial<TypographyComponentProps>>(
  props: P,
  theme: ComponentTheme<P>,
  propsToOmit: readonly string[] = []
): React.ReactElement {
  const cleanProps = {...props};
  for (const k of propsToOmit) {
    if (k in cleanProps) {
      delete (cleanProps as any)[k];
    }
  }
  const {className, children, tag, ...other} = cleanProps;
  const componentTag: string = tag ?? theme.tag ?? "div";
  const themeClasses = useMemo(() => {
    // Use a type assertion to tell TypeScript that theme has a getClasses method
    // that returns an array of strings, regardless of its specific type
    return theme.getClasses(props);
  }, [props, theme]);
  const Tag = componentTag;
  const merged = twMerge(...themeClasses, className);

  return (
    <Tag className={merged} {...other}>
      {children}
    </Tag>
  );
}
