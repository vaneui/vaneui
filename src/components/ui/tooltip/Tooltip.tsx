import { useMemo } from 'react';
import type { TooltipProps } from "./TooltipProps";
import { PopupTrigger } from "../popup/PopupTrigger";
import { useTheme } from "../../themeContext";
import { ThemeProvider } from "../../ThemeProvider";
import { defaultTooltipTheme } from "./defaultTooltipTheme";

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  openDelay = 300,
  closeDelay = 100,
  popupProps,
  popupId,
  disabled,
  ...directPopupProps
}: TooltipProps) {
  const theme = useTheme();
  const tooltipTheme = theme?.tooltip ?? defaultTooltipTheme;
  // pushed as defaults rather than props so every visual aspect stays themeable
  const childThemeDefaults = useMemo(() => ({ popup: tooltipTheme.defaults }), [tooltipTheme]);
  // role=tooltip switches PopupTrigger to describedby semantics: no haspopup/expanded;
  // data-tooltip opts the popup into the label-sized rules in rules.css
  const tooltipPopupProps = { role: 'tooltip' as const, 'data-tooltip': '', ...directPopupProps, ...popupProps };

  return (
    <ThemeProvider themeDefaults={childThemeDefaults}>
      <PopupTrigger
        popup={content}
        triggerOnHover
        triggerOnFocus
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        openDelay={openDelay}
        closeDelay={closeDelay}
        popupProps={tooltipPopupProps}
        popupId={popupId}
        disabled={disabled}
      >
        {children}
      </PopupTrigger>
    </ThemeProvider>
  );
}

Tooltip.displayName = 'Tooltip';
