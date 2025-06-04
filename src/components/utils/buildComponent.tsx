import { twMerge } from "tailwind-merge";
import React, { useMemo } from "react";
import { ComponentTheme, ThemeMap } from "../ui/theme/common/ComponentTheme";
import { TagProps } from "../ui/props/props";

export interface BuildableComponentProps extends TagProps {
  className?: string;
  children?: React.ReactNode;
}

export function buildComponent<
  P extends BuildableComponentProps,
  TThemes extends ThemeMap<P>
>(
  props: P,
  theme: ComponentTheme<P, TThemes>,
  propsToOmit: readonly string[] = []
): React.ReactElement {
  const cleanProps: Record<string, any> = { ...props };

  for (const k of propsToOmit) {
    if (k in cleanProps) {
      delete cleanProps[k];
    }
  }

  const {
    className,
    children,
    tag,
    ...other
  } = cleanProps as P;

  const componentTag: React.ElementType = tag ?? theme.tag ?? "div";

  const themeGeneratedClasses = useMemo(() => {
    return theme.getClasses(props);
  }, [props, theme]);

  const mergedClasses = twMerge(...themeGeneratedClasses, className);

  const TagToRender = componentTag as React.ElementType;

  return (
    <TagToRender className={mergedClasses} {...other}>
      {children}
    </TagToRender>
  );
}