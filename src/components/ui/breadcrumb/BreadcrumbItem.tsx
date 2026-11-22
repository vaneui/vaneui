import { forwardRef } from 'react';
import type { BreadcrumbItemProps } from "./BreadcrumbItemProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useBreadcrumbItemContext } from "./BreadcrumbContext";
import { defaultBreadcrumbItemTheme } from "./defaultBreadcrumbItemTheme";
import { defaultBreadcrumbSeparatorTheme } from "./defaultBreadcrumbSeparatorTheme";

export const BreadcrumbItem = forwardRef<HTMLElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ current, children, ...props }, ref) {
    const theme = useTheme();
    const itemTheme = theme?.breadcrumb?.item ?? defaultBreadcrumbItemTheme;
    const separatorTheme = theme?.breadcrumb?.separator ?? defaultBreadcrumbSeparatorTheme;
    const trail = useBreadcrumbItemContext();
    const isCurrent = current ?? (trail ? !trail.explicitCurrent && trail.last : false);
    const separator = trail && trail.index > 0
      ? trail.separator ?? separatorTheme.themes.separatorElement()
      : null;

    // the <li> is structure only (its layout comes from the list theme); className, ref and
    // the rest of the props go to the link or text
    return (
      <li>
        {separator !== null ? (
          <ThemedComponent theme={separatorTheme} aria-hidden="true">{separator}</ThemedComponent>
        ) : null}
        <ThemedComponent ref={ref} theme={itemTheme} aria-current={isCurrent ? 'page' : undefined} {...props}>
          {children}
        </ThemedComponent>
      </li>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';
