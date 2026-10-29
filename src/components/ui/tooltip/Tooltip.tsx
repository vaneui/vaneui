import { cloneElement, forwardRef, useMemo } from 'react';
import type React from 'react';
import type { TooltipProps } from "./TooltipProps";
import { PopupTrigger } from "../popup/PopupTrigger";
import { useTheme } from "../../themeContext";
import { ThemeProvider } from "../../ThemeProvider";
import { composeRefs, getElementRef } from "../../utils/composeRefs";
import { defaultTooltipTheme } from "./defaultTooltipTheme";

// Popup lifecycle callbacks stay on the tooltip; every other handler belongs to the trigger.
const POPUP_CALLBACKS = new Set(['onEnterComplete', 'onExitComplete']);
const isHandler = (key: string) => /^on[A-Z]/.test(key);

/* A Menu or PopupTrigger that uses <Tooltip> as its trigger clones its ref, handlers and aria
   attributes onto the Tooltip element; they describe the trigger, so they pass through to the child. */
const isTriggerProp = (key: string) =>
  key.startsWith('aria-') || key === 'closeMenuOnClick' || (isHandler(key) && !POPUP_CALLBACKS.has(key));

export const Tooltip = forwardRef<HTMLElement, TooltipProps>(
  function Tooltip({
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
    ...directProps
  }, ref) {
    const theme = useTheme();
    const tooltipTheme = theme?.tooltip ?? defaultTooltipTheme;
    // pushed as defaults rather than props so every visual aspect stays themeable
    const childThemeDefaults = useMemo(() => ({ popup: tooltipTheme.defaults }), [tooltipTheme]);

    const directPopupProps: Record<string, unknown> = {};
    const triggerProps: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(directProps)) {
      if (isTriggerProp(key)) triggerProps[key] = value;
      else directPopupProps[key] = value;
    }

    // role=tooltip switches PopupTrigger to describedby semantics: no haspopup/expanded;
    // data-tooltip opts the popup into the label-sized rules in rules.css
    const tooltipPopupProps = { role: 'tooltip' as const, 'data-tooltip': '', ...directPopupProps, ...popupProps };

    // compose forwarded handlers with the child's own, so neither replaces the other
    const childProps = children.props as Record<string, unknown>;
    for (const [key, handler] of Object.entries(triggerProps)) {
      const own = childProps[key];
      if (isHandler(key) && typeof handler === 'function' && typeof own === 'function') {
        triggerProps[key] = (...args: unknown[]) => {
          (own as (...a: unknown[]) => void)(...args);
          (handler as (...a: unknown[]) => void)(...args);
        };
      }
    }
    const trigger = ref || Object.keys(triggerProps).length > 0
      ? cloneElement(children, {
          ...triggerProps,
          ...(ref ? { ref: composeRefs(getElementRef(children), ref) } : {}),
        } as Record<string, unknown>)
      : children;

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
          {trigger as React.ReactElement}
        </PopupTrigger>
      </ThemeProvider>
    );
  }
);

Tooltip.displayName = 'Tooltip';
