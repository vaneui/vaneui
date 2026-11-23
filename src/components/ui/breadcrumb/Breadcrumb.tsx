import { Children, forwardRef, isValidElement } from 'react';
import type { BreadcrumbProps } from "./BreadcrumbProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { BreadcrumbItemContext } from "./BreadcrumbContext";
import { defaultBreadcrumbTheme } from "./defaultBreadcrumbTheme";
import { defaultBreadcrumbListTheme } from "./defaultBreadcrumbListTheme";

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb({ separator, children, ...props }, ref) {
    const theme = useTheme();
    const mainTheme = theme?.breadcrumb?.main ?? defaultBreadcrumbTheme;
    const listTheme = theme?.breadcrumb?.list ?? defaultBreadcrumbListTheme;

    // each item learns its place in the trail: the first has no separator before it, and the
    // last is the current page unless some item sets `current` itself
    const items = Children.toArray(children).filter(isValidElement);
    const explicitCurrent = items.some(item => (item.props as { current?: unknown }).current !== undefined);

    return (
      <ThemedComponent ref={ref} theme={mainTheme} aria-label="Breadcrumb" {...props}>
        <ThemedComponent theme={listTheme}>
          {items.map((item, index) => (
            <BreadcrumbItemContext.Provider
              key={item.key ?? index}
              value={{ index, last: index === items.length - 1, explicitCurrent, separator }}
            >
              {item}
            </BreadcrumbItemContext.Provider>
          ))}
        </ThemedComponent>
      </ThemedComponent>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';
