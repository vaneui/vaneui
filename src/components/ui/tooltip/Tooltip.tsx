import { useMemo } from 'react';
import type { TooltipProps } from "./TooltipProps";
import { PopupTrigger } from "../popup/PopupTrigger";
import { useTheme } from "../../themeContext";
import { ThemeProvider } from "../../ThemeProvider";
import { defaultTooltipTheme } from "./defaultTooltipTheme";

export function Tooltip({
  children,
  content,
  openDelay = 300,
  closeDelay = 100,
  popupProps,
  ...rest
}: TooltipProps) {
  const theme = useTheme();
  const tooltipTheme = theme?.tooltip ?? defaultTooltipTheme;
  // pushed as defaults rather than props so every visual aspect stays themeable
  const childThemeDefaults = useMemo(() => ({ popup: tooltipTheme.defaults }), [tooltipTheme]);
  // role=tooltip switches PopupTrigger to describedby semantics: no haspopup/expanded
  const tooltipPopupProps = useMemo(
    () => ({ role: 'tooltip' as const, ...popupProps }),
    [popupProps]
  );

  return (
    <ThemeProvider themeDefaults={childThemeDefaults}>
      <PopupTrigger
        popup={content}
        triggerOnHover
        triggerOnFocus
        openDelay={openDelay}
        closeDelay={closeDelay}
        popupProps={tooltipPopupProps}
        {...rest}
      >
        {children}
      </PopupTrigger>
    </ThemeProvider>
  );
}

Tooltip.displayName = 'Tooltip';
