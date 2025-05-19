import { twMerge } from "tailwind-merge";
import { TypographyComponentProps } from "../ui/props/props";
import React, { useMemo } from "react";
import { BaseComponentTheme } from '../ui/theme/common/baseComponentTheme';
import { StyleVariantComponentTheme } from "../ui/theme/common/styleVariantComponentTheme";
import { SimpleComponentTheme } from "../ui/theme/common/simpleComponentTheme";


export function buildComponent<P extends Partial<TypographyComponentProps>>(
  props: P,
  theme: BaseComponentTheme<P> | StyleVariantComponentTheme<P> | SimpleComponentTheme<P>,
  propsToOmit: readonly string[] = []
): React.ReactElement {
  const cleanProps = {...props};
  for (const k of propsToOmit) {
    if (k in cleanProps) {
      delete (cleanProps as any)[k];
    }
  }
  const {className, children, ...other} = cleanProps;
  const tag: string = props.tag ?? "div";
  const themeClasses = useMemo(() => {
    return theme.getClasses(props as Partial<Record<keyof P, boolean>>);
  }, [props, theme]);
  const Tag = tag;
  const merged = twMerge(...themeClasses, className);

  return (
    <Tag className={merged} {...other}>
      {children}
    </Tag>
  );
}
